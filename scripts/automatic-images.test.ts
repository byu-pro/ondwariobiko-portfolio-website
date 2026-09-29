import { afterEach, test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";
import { optimizeImages } from "./automatic-images.ts";
const roots: string[] = [];
async function fixture() {
  const root = await mkdtemp(path.join(tmpdir(), "portfolio-image-test-"));
  roots.push(root);
  await mkdir(path.join(root, "public/assets/nested"), { recursive: true });
  return root;
}
afterEach(async () => {
  for (const root of roots.splice(0)) {
    const absolute = path.resolve(root);
    if (path.dirname(absolute) !== path.resolve(tmpdir()) || !path.basename(absolute).startsWith("portfolio-image-test-")) throw Error("Unsafe test cleanup path");
    await rm(absolute, { recursive: true, force: true });
  }
});

test("new nested PNG is lossless, originals survive, unchanged images skip, replacements regenerate", async () => {
  const root = await fixture();
  const source = path.join(root, "public/assets/nested/brand.png");
  const pixels = Buffer.from([255, 0, 0, 255, 0, 255, 0, 128, 0, 0, 255, 0, 124, 125, 126, 255]);
  const input = await sharp(pixels, { raw: { width: 2, height: 2, channels: 4 } }).png().toBuffer();
  await writeFile(source, input);
  assert.equal((await optimizeImages(root)).length, 1);
  const output = source.replace('.png', '.webp');
  assert.deepEqual(await sharp(await readFile(output)).raw().toBuffer(), pixels);
  assert.deepEqual(await readFile(source), input);
  assert.equal((await optimizeImages(root)).length, 0);
  await sharp({ create: { width: 3, height: 4, channels: 4, background: '#00ff00' } }).png().toFile(source);
  assert.equal((await optimizeImages(root)).length, 1);
  const metadata = await sharp(await readFile(output)).metadata();
  assert.deepEqual([metadata.width, metadata.height], [3,4]);
});

test("thumbnail keeps full resolution and responsive image preserves aspect ratio", async () => {
  const root = await fixture();
  const source = path.join(root, 'public/assets/new_thumbnail.png');
  await sharp({ create: { width: 1200, height: 800, channels: 3, background: '#a6ff00' } }).png().toFile(source);
  await optimizeImages(root);
  const full = await sharp(await readFile(source.replace('.png','.webp'))).metadata();
  const small = await sharp(await readFile(source.replace('.png','-600.webp'))).metadata();
  assert.deepEqual([full.width, full.height], [1200,800]);
  assert.deepEqual([small.width, small.height], [600,400]);
});

test("ambiguous filenames fail rather than overwriting artwork", async () => {
  const root = await fixture();
  await writeFile(path.join(root,'public/assets/logo.png'), 'one');
  await writeFile(path.join(root,'public/assets/logo.jpg'), 'two');
  await assert.rejects(optimizeImages(root), /share a WebP filename/);
});

test("existing standalone WebP is never overwritten", async () => {
  const root = await fixture();
  await writeFile(path.join(root,'public/assets/logo.png'), 'one');
  await writeFile(path.join(root,'public/assets/logo.webp'), 'original artwork');
  await assert.rejects(optimizeImages(root), /Unmanaged WebP/);
});

test("oversized presentation masters stay unchanged and do not block compatible assets", async () => {
  const root = await fixture();
  const source = path.join(root, 'public/assets/tall.png');
  const original = await sharp({ create: { width: 1, height: 16384, channels: 3, background: '#ffffff' } }).png().toBuffer();
  await writeFile(source, original);
  await sharp({ create: { width: 8, height: 8, channels: 3, background: '#0b7484' } }).png().toFile(path.join(root, 'public/assets/valid.png'));
  assert.equal((await optimizeImages(root)).length, 2);
  assert.deepEqual(await readFile(source), original);
  await assert.rejects(readFile(source.replace('.png', '.webp')), { code: 'ENOENT' });
  assert.equal((await sharp(await readFile(path.join(root, 'public/assets/valid.webp'))).metadata()).width, 8);
  assert.equal((await optimizeImages(root)).length, 0);
});

test("a later failure preserves the manifest for completed conversions", async () => {
  const root = await fixture();
  await sharp({ create: { width: 4, height: 4, channels: 3, background: '#0b7484' } }).png().toFile(path.join(root, 'public/assets/a.png'));
  const broken = path.join(root, 'public/assets/z.png');
  await writeFile(broken, 'not an image');
  await assert.rejects(optimizeImages(root));
  const manifest = JSON.parse(await readFile(path.join(root, 'scripts/image-manifest.json'), 'utf8'));
  assert.deepEqual(manifest['public/assets/a.png'].outputs, ['public/assets/a.webp']);
  await sharp({ create: { width: 4, height: 4, channels: 3, background: '#ffffff' } }).png().toFile(broken);
  assert.deepEqual(await optimizeImages(root), ['public/assets/z.png']);
});

test("dev server converts files added after startup", async () => {
  const { createServer } = await import('vite');
  const { automaticImages } = await import('./automatic-images.ts');
  const root = await fixture();
  const server = await createServer({ root, configFile: false, plugins: [automaticImages(root)], server: { port: 0, watch: { usePolling: true, interval: 50 } } });
  await server.listen();
  try {
    const source = path.join(root, 'public/assets/added.png');
    await sharp({ create: { width: 8, height: 6, channels: 3, background: '#a6ff00' } }).png().toFile(source);
    const output = source.replace('.png','.webp');
    let result: Buffer | undefined;
    for (let i=0; i<40; i++) {
      result = await readFile(output).catch(() => undefined);
      if (result) break;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    assert.ok(result);
    assert.equal((await sharp(result!).metadata()).width, 8);
  } finally { await server.close(); }
});
