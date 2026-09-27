import { watch } from "node:fs";
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import type { Plugin } from "vite";

const raster = /\.(png|jpe?g|gif|tiff?|avif)$/i;
const folders = ["public/assets", "src/assets"];
const manifestName = "scripts/image-manifest.json";
type Entry = { hash: string; outputs: string[] };
type Manifest = Record<string, Entry>;
const digest = (data: Buffer) => createHash("sha256").update(data).digest("hex");
const exists = async (file: string) => stat(file).then(() => true, () => false);

async function sources(root: string, dir: string): Promise<string[]> {
  const entries = await readdir(path.join(root, dir), { withFileTypes: true }).catch((error) => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  const files: string[] = [];
  for (const entry of entries) {
    const relative = `${dir}/${entry.name}`;
    if (entry.isDirectory()) files.push(...await sources(root, relative));
    else if (entry.isFile() && raster.test(entry.name)) files.push(relative);
  }
  return files.sort();
}

/** Original artwork is never resized, overwritten or deleted. */
export async function optimizeImages(root: string): Promise<string[]> {
  const manifestPath = path.join(root, manifestName);
  const manifest: Manifest = await readFile(manifestPath, "utf8").then(JSON.parse).catch((error) => {
    if (error.code === "ENOENT") return {};
    throw error;
  });
  const files = (await Promise.all(folders.map((dir) => sources(root, dir)))).flat();
  const targets = new Set<string>();
  // Reject ambiguous names before writing any output.
  for (const file of files) {
    const target = file.replace(raster, ".webp").toLowerCase();
    if (targets.has(target)) throw new Error(`Images share a WebP filename: ${file}. Use unique base names.`);
    targets.add(target);
  }
  const changed: string[] = [];
  for (const file of files) {
    const input = await readFile(path.join(root, file));
    const hash = digest(input);
    const previous = manifest[file];
    if (previous?.hash === hash && (await Promise.all(previous.outputs.map((output) => exists(path.join(root, output))))).every(Boolean)) continue;
    const output = file.replace(raster, ".webp");
    if (!previous && await exists(path.join(root, output))) {
      throw new Error(`Unmanaged WebP already exists: ${output}. Rename it before converting ${file}.`);
    }
    const metadata = await sharp(input, { animated: true }).metadata();
    if ((metadata.depth && metadata.depth !== "uchar") || metadata.space === "cmyk") {
      throw new Error(`${file}: export an 8-bit RGB source first; WebP cannot preserve this source colour depth/space losslessly.`);
    }
    const pipeline = () => sharp(input, { animated: true }).rotate().keepIccProfile();
    const webp = await pipeline().webp({ lossless: true, exact: true, effort: 6 }).toBuffer();
    await writeFile(path.join(root, output), webp);
    const outputs = [output];
    // Optional responsive derivative; the main WebP retains full resolution.
    if ((file.includes("_thumbnail") || file.includes("_profilepic") || file.includes("_banner") || file.includes("banner")) && (metadata.pages ?? 1) === 1) {
      const small = file.replace(raster, "-600.webp");
      await pipeline().resize({ width: 600, withoutEnlargement: true }).webp({ lossless: true, exact: true, effort: 6 }).toFile(path.join(root, small));
      outputs.push(small);
    }
    manifest[file] = { hash, outputs };
    changed.push(file);
    console.info(`[images] ${file} -> ${output} (lossless, ${webp.length.toLocaleString()} bytes)`);
  }
  if (changed.length) {
    await mkdir(path.dirname(manifestPath), { recursive: true });
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  }
  return changed;
}

export function automaticImages(root: string): Plugin {
  return {
    name: "automatic-lossless-webp",
    async config() { await optimizeImages(root); },
    async configureServer(server) {
      const watched = folders.map((folder) => path.join(root, folder).replaceAll("\\", "/"));
      await Promise.all(watched.map((folder) => mkdir(folder, { recursive: true })));
      let timer: ReturnType<typeof setTimeout>;
      let queue = Promise.resolve();
      const onImage = (file: string) => {
        const relative = path.relative(root, file).replaceAll("\\", "/");
        if (!raster.test(relative) || !folders.some((folder) => relative.startsWith(folder + "/"))) return;
        clearTimeout(timer);
        timer = setTimeout(() => {
          queue = queue.then(async () => {
            if ((await optimizeImages(root)).length) server.ws.send({ type: "full-reload" });
          }).catch((error: Error) => {
            server.config.logger.error(error.message);
            server.ws.send({ type: "error", err: { message: error.message, stack: error.stack ?? "" } });
          });
        }, 300);
      };
      const watchers = watched.map((folder) => watch(folder, { recursive: true }, (_event, filename) => {
        if (filename) onImage(path.join(folder, filename.toString()));
      }));
      server.httpServer?.once("close", () => {
        clearTimeout(timer);
        for (const watcher of watchers) watcher.close();
      });
    },
  };
}
