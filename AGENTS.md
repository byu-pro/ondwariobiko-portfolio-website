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
- The three JO monogram logos are lovable-assets pointers under src/assets (jo-logo-black/white/neon.png.asset.json) — import the JSON, use `.url`. The favicon is a real public/favicon.png derived from the logo.

