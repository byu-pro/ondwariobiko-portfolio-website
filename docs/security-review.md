# Security review — 3 October 2026

Reviewed the local source, dependency lockfile, GitHub Pages deployment workflow,
and live response headers at https://byu-pro.github.io/ondwariobiko-portfolio-website/.
Prepared for deployment to main. Deployment completion must be checked in GitHub
Actions and against the served website; this document is not a deployment receipt.

## Findings and fixes

| Finding | Assessment | Local fix |
| --- | --- | --- |
| Dependency advisories | The registry reported 12 advisories (10 high, 2 moderate) across three package names in build/lint tooling. This is not evidence of a remotely exploitable production website. | Updated brace-expansion 1.1.16 → 1.1.21 and 5.0.8 → 5.0.12, js-yaml 4.3.0 → 4.3.2, nanoid 3.3.16 → 3.3.18 within existing dependency ranges. |
| No content security policy | Live response had no CSP header; the original build had no CSP meta policy. | GitHub Pages production builds now hash each document's inline scripts and inject CSP before resource elements. Blocks unapproved inline scripts, event attributes, external scripts/connections, frames, plugins, base-tag changes, and native form submissions. React's WhatsApp handlers continue to work. |
| External window access | Home and services inquiry buttons used window.open without explicit opener isolation. | All four inquiry handlers now use noopener,noreferrer. |
| Deployment token exposure | Build job inherited Pages deployment and OIDC permissions; checkout persisted credentials. | Deployment permissions restricted to the deployment job; checkout credential persistence disabled. |
| Accidental environment-file commits | .env and .env.production were not ignored. | Ignore environment files while allowing example templates. This does not protect secrets deliberately placed in public files or bundled VITE_ variables. |
| Future regressions | No deployment dependency audit or CSP regression tests. | Deployment now runs security tests and blocks high/critical dependency advisories; Dependabot configuration checks GitHub Actions weekly. |

Added an explicit referrer policy and consistent escaping of `<` in root JSON-LD.
The latter is preventative: current identity data is hardcoded, not user input.

## Existing protections and scope

- GitHub Pages serves static files. No deployed application database, login,
  payment endpoint, file-upload handler, or server-side inquiry endpoint was
  found. Form values are URL-encoded into a WhatsApp destination.
- Live HTTPS response returned HSTS with max-age=31556952.
- The optional TanStack server entry already applies CSRF middleware to server
  functions and returns generic fallback error pages. GitHub Pages does not run it.
- Targeted current-tree searches found no matching common private-key, AWS access
  key, GitHub token, or Stripe live-secret patterns. No tracked environment/key
  files were found. This was not a full Git-history or credential-validity scan.
- No source maps were found in the generated public output.

## Validation

- `bun audit`: no known vulnerabilities reported across 471 checked packages
  after the update. This is a point-in-time advisory check, not a guarantee.
- `bun install --frozen-lockfile --ignore-scripts`: passed without lock changes.
- `bun run test:security`: all 4 tests passed, including browser normalization of
  NUL bytes used in TanStack hydration IDs.
- `bun run test:images`: all 7 existing image tests passed.
- Production GitHub Pages build completed; 21 HTML documents were secured.
- Local headless Edge browser checks passed for home, work, services, about,
  contact, consultation, and the Sound Curves project. No unexpected CSP
  violations or JavaScript runtime errors occurred. The hydrated contact form
  produced the correct isolated WhatsApp window request; navigation was
  intercepted so no inquiry was sent. Deliberately injected inline JavaScript
  and event handlers were blocked.
- External Google Fonts requests were denied by this execution environment's
  network controls. They are explicitly allowed by the policy; font download
  success was not verified in the browser run.
- Fixed the 6 existing TypeScript errors: guarded the next carousel slide and
  intersection-observer entry and made the mockup component's optional images
  prop accept explicit undefined, which its default value already handles.
  Deployment now checks TypeScript as well.

## Remaining limits and follow-up

1. **Publish and verify.** After deployment, inspect the
   served HTML policy and repeat functional checks on the public site.
2. **Hosting headers.** The live response lacks frame-ancestors/X-Frame-Options,
   X-Content-Type-Options, and Permissions-Policy. GitHub Pages does not offer
   repository-configured custom response headers. A header-capable host or proxy
   is needed to add them. In particular, frame-ancestors cannot be supplied in a
   meta tag, so this change does not claim clickjacking protection. See
   [MDN's frame-ancestors documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors).
3. **CSP tradeoffs.** Inline styles remain allowed for the site's existing React
   styling and animations. Same-origin scripts remain allowed; other content
   under the shared byu-pro.github.io origin is part of that trust boundary.
   [CSP reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy).
4. **Other deployments.** The hash policy runs only when GITHUB_PAGES=true.
   Future dynamic SSR deployments need separate header and
   per-response nonce integration; they were not certified by this review.
5. **Account controls.** GitHub account MFA, repository protection rules,
   collaborators, deployment environments, secret-scanning settings, and domain
   registrar controls were not inspected. Those require a separate account-level
   review. Workflow actions are now pinned to verified immutable commit SHAs;
   Dependabot can propose updates.
6. **Privacy accuracy.** Updated the policy to describe hosting and Google Fonts
   requests and the WhatsApp inquiry URL flow. Avoid requesting sensitive
   information through this flow.

The site's static architecture reduces exposure, but this review is not a
penetration test or a claim that security is airtight.
