## Project ownership and workflow
- Manage all website work through Codex and this local repository, with GitHub as the source of truth and GitHub Pages for deployment.
- Do not use Lovable for editing, builds, or synchronization.
- Preserve published Git history: do not force-push or rewrite already-pushed commits. Keep `main` in a working state.

## Design system
- Portfolio is a multi-page site: /, /work, /services, /about, /contact with shared SiteNav + SiteFooter in __root.
- Brand tokens live in src/styles.css: `--neon` (lime #A6FF00 (oklch 0.9 0.24 131) / oklch 0.93 0.26 110), `--font-display` (Syne), `--font-sans` (Inter), `--font-mono` (Space Grotesk). Fonts load via `<link>` in __root.tsx head, never @import in CSS.
- Original brand artwork is maintained in `public/assets` and referenced with stable `/assets/...` URLs so replacing a same-named file through GitHub updates every use; use `logoblack.png`, `logowhite.png`, and `favicon.png` as the canonical logo files.


## Local and GitHub workflow
- Make website updates in this local repository before pushing. After each push, verify local HEAD and origin/main match and report deployment status. Preserve the existing theme and brand style.


## Automatic image optimization
- Add/edit canonical originals in `public/assets` or `src/assets`. Vite automatically generates WebP on dev startup, file changes, and every build; GitHub uploads are converted during deployment.
- Reference generated `.webp` files in UI code, with `import.meta.env.BASE_URL` for public URLs. Keep originals and commit `scripts/image-manifest.json` when it changes. Do not manually edit generated WebP files belonging to originals.
- New/replaced originals use lossless compression at full resolution. Keep SVG vector and existing WebP as-is. `_thumbnail`, `_profilepic`, and `_banner` originals also generate an aspect-preserving 600px responsive variant. Do not promise all lossless files will be smaller.
- Run `bun run test:images` when changing the image pipeline. `bun run images:optimize` processes assets without starting the site.
- Presentation originals exceeding WebP's 16,383px edge limit stay in their original format at full resolution. Their manifest entries have no generated outputs; use compatible website assets separately.

## SoundCurves design exports
- For mobile page designs, rebuild headings, body copy, buttons, captions, and footer links as editable SVG text and render them at export resolution. Use original artwork crops; do not generate or upscale flattened text to simulate clarity.
- Keep one stable PNG per mobile page and one white-background desktop/mobile presentation PNG. Replace these files on revision, update the corresponding SVG master, and regenerate the affected presentation. Do not create numbered duplicate exports.
- Export mobile masters at 6x logical size with 600 DPI metadata. DPI does not improve the resolution of original photographs.
- The homepage PNG retains its existing `soundcurves-home-mobile-390w-4x-300dpi.png` filename for compatibility, but its current renderer exports at 6x and 600 DPI. Presentation renderers should use the SVG master directly for crisp type.
