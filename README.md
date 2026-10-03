# ondwariobiko portfolio website

I am a graphic and web designer from Nairobi Kenya with 10 years experience, I speacialize in logo and brand design but I am also a front end developer  as well as UI/UX DESIGNER. I need a creative, very creative unique one of a kind website that uses bold beautiful typography and images. Needs to look premium and modern but most especiay visually appealinga nd creative .

## Development and deployment

Manage website changes through Codex in this local repository. GitHub is the source of truth; pushes to main run the checks and publish to GitHub Pages.

Use Node.js 24 and Bun 1.4.2:

```sh
bun install --frozen-lockfile
bun run dev
```

Run the production build with GITHUB_PAGES=true for the GitHub Pages base path. Static files are generated in dist/client.

## Automatic image delivery

Add PNG, JPEG, GIF, TIFF or AVIF originals to `public/assets` or `src/assets` (nested folders work). The Vite pipeline generates a same-named `.webp` automatically:

- At startup and whenever originals are added/replaced while `bun run dev` is running.
- Before every production build, including GitHub Pages builds.
- On demand with `bun run images:optimize`.

Use the generated `.webp` in page code. Public URLs must use `import.meta.env.BASE_URL` so GitHub Pages works. Replacing the original under the same name regenerates the WebP; the original file is never altered. Commit `scripts/image-manifest.json` alongside local artwork changes. GitHub-only uploads are converted during the deployment build; generated files are included in the deployed site without a second Git commit.

New/replaced originals use **lossless WebP at full resolution**, preserving transparency and colour profiles. Existing optimized images from the earlier conversion are registered in the manifest and retained until their originals change. `_thumbnail` and `_profilepic` files also receive a separate `-600.webp` responsive version; only this optional derivative is resized, preserving aspect ratio. Use `srcSet` to let browsers select the appropriate size.

WebP inputs already have the delivery format and SVGs stay vector for sharpness at every size. Unsupported colour depths/spaces or conflicting filenames fail explicitly rather than silently reducing quality or overwriting artwork. Give each original a unique base name. Conversion alone cannot guarantee a smaller file (particularly for JPEGs) or a zero-impact page load; responsive sizing and lazy loading remain important. Lossless format documentation: https://sharp.pixelplumbing.com/api-output/#webp

`bun run test:images` verifies conversion and replacement behavior and runs in deployment CI.
