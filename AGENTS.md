<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Design system
- Portfolio is a multi-page site: /, /work, /services, /about, /contact with shared SiteNav + SiteFooter in __root.
- Brand tokens live in src/styles.css: `--neon` (lime #A6FF00 (oklch 0.9 0.24 131) / oklch 0.93 0.26 110), `--font-display` (Syne), `--font-sans` (Inter), `--font-mono` (Space Grotesk). Fonts load via `<link>` in __root.tsx head, never @import in CSS.
- Original brand artwork is maintained in `public/assets` and referenced with stable `/assets/...` URLs so replacing a same-named file through GitHub updates every use; use `logoblack.png`, `logowhite.png`, and `favicon.png` as the canonical logo files.


## Local and GitHub workflow
- Make website updates in this local repository before pushing. After each push, verify local HEAD and origin/main match and report deployment status. Preserve the existing theme and brand style.


## Automatic image optimization
- Add/edit canonical originals in `public/assets` or `src/assets`. Vite automatically generates WebP on dev startup, file changes, and every build; GitHub uploads are converted during deployment.
- Reference generated `.webp` files in UI code, with `import.meta.env.BASE_URL` for public URLs. Keep originals and commit `scripts/image-manifest.json` when it changes. Do not manually edit generated WebP files belonging to originals.
- New/replaced originals use lossless compression at full resolution. Keep SVG vector and existing WebP as-is. `_thumbnail` and `_profilepic` originals also generate an aspect-preserving 600px responsive variant. Do not promise all lossless files will be smaller.
- Run `bun run test:images` when changing the image pipeline. `bun run images:optimize` processes assets without starting the site.
