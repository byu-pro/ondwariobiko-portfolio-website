import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { secureDirectory, secureHtml } from "./secure-static-pages.mjs";

test("allows exact hydration scripts but not injected scripts or event handlers", () => {
  const script = "window.hydrated = true;\n";
  const html = `<html><head><script>${script}</script></head><body></body></html>`;
  const result = secureHtml(html);
  const hash = createHash("sha256").update(script).digest("base64");
  assert.ok(result.includes(`'sha256-${hash}'`));
  assert.ok(result.indexOf("Content-Security-Policy") < result.indexOf("<script>"));
  const scripts = result.match(/script-src ([^;]+)/)[1];
  assert.ok(!scripts.includes("unsafe-inline"));
  assert.ok(!scripts.includes("unsafe-eval"));
  const injectedHash = createHash("sha256").update("alert(document.cookie)").digest("base64");
  assert.ok(!scripts.includes(injectedHash));
  for (const directive of ["script-src-attr 'none'", "object-src 'none'", "base-uri 'none'", "form-action 'none'"]) {
    assert.ok(result.includes(directive));
  }
  assert.throws(() => secureHtml(result), /already has a CSP/);
  assert.throws(() => secureHtml("<body>broken</body>"), /no head/);
});

test("normalizes CRLF as browsers do, deduplicates hashes, and skips external script bodies", () => {
  const result = secureHtml('<head><script>a\r\nb</script><script>a\nb</script><script src="/app.js">ignored</script></head>');
  const hash = createHash("sha256").update("a\nb").digest("base64");
  assert.equal(result.split(hash).length - 1, 1);
  assert.equal((result.match(/sha256-/g) ?? []).length, 1);
});

test("hashes TanStack NUL match IDs as parsed by the browser", () => {
  const script = 'window.matchId="__root__\0"';
  const result = secureHtml(`<head><script>${script}</script></head>`);
  const hash = createHash("sha256").update(script.replace(/\0/g, "\uFFFD")).digest("base64");
  assert.ok(result.includes(`'sha256-${hash}'`));
});

test("secures nested routes and exported HTML without changing artwork", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "portfolio-security-"));
  try {
    await mkdir(path.join(root, "contact"));
    await writeFile(path.join(root, "index.html"), "<head></head>");
    await writeFile(path.join(root, "contact", "index.html"), "<head></head>");
    await writeFile(path.join(root, "art.svg"), "<svg></svg>");
    assert.equal(await secureDirectory(root), 2);
    assert.match(await readFile(path.join(root, "contact", "index.html"), "utf8"), /Content-Security-Policy/);
    assert.equal(await readFile(path.join(root, "art.svg"), "utf8"), "<svg></svg>");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
