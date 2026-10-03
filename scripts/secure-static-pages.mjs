import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

// GitHub Pages cannot serve custom response headers. Hash the final prerendered
// scripts, including TanStack hydration, rather than allowing arbitrary inline JS.
export function secureHtml(html) {
  if (!/<head\b[^>]*>/i.test(html)) throw new Error("HTML document has no head");
  if (/http-equiv=["']Content-Security-Policy["']/i.test(html)) {
    throw new Error("HTML already has a CSP; rebuild before securing it again");
  }
  const hashes = new Set();
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
    if (/\bsrc\s*=/i.test(match[1])) continue;
    // HTML parsers normalize line endings and replace NUL (used in TanStack
    // match IDs) before checking script hashes.
    const script = match[2].replace(/\r\n?/g, "\n").replace(/\0/g, "\uFFFD");
    hashes.add(`'sha256-${createHash("sha256").update(script).digest("base64")}'`);
  }
  const policy = [
    "default-src 'self'",
    `script-src 'self' ${[...hashes].join(" ")}`.trim(),
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'none'",
    "frame-src 'none'",
  ].join("; ");
  // Must precede resource elements; frame-ancestors cannot be enforced in meta.
  return html.replace(/<head\b[^>]*>/i, `$&<meta http-equiv="Content-Security-Policy" content="${policy}">`);
}

export async function secureDirectory(directory) {
  let count = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) count += await secureDirectory(file);
    else if (entry.isFile() && entry.name.endsWith(".html")) {
      await writeFile(file, secureHtml(await readFile(file, "utf8")));
      count++;
    }
  }
  return count;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  // Dynamic SSR deployments need their own response-header/nonce integration.
  if (process.env.GITHUB_PAGES === "true") {
    const count = await secureDirectory(path.resolve("dist/client"));
    if (!count) throw new Error("No static HTML found to secure");
    console.info(`[security] Protected ${count} static HTML documents`);
  }
}
