# Effects performance review — 3 October 2026

The glass finish remains, with less rendering and network work. This review
targets decorative effects rather than promising a score on every connection.

Changes:
- Removed the initial full-screen preloader (2,450 ms interaction delay after
  hydration) and the 1,100 ms route-change overlay from the shared shell.
- Removed the main content entrance animation so navigation content appears
  immediately. Existing small, local reveal animations remain.
- Replaced card, gallery, menu, badge, and floating-control backdrop blurs with
  painted glass gradients and rims. Only the small desktop navigation bar retains
  a 10 px blur; phone layouts have no live backdrop blurs.
- Removed animated shadow interpolation on cards.
- The logo carousel initially mounts just its current image, with no duplicate
  backdrop picture or hidden neighbour downloads. A requested next slide is
  decoded before switching. Autoplay respects reduced motion and Save-Data.
- Offscreen/hidden-tab marquees, logo loops, and portrait animations pause.
  Headline rotation pauses offscreen, in hidden tabs, and with reduced motion.
- Batched geometry reads before writes in reveal and parallax handling, cached
  parallax targets, skipped offscreen parallax, and removed a delayed scroll-to-top
  that competed with the router's scroll restoration.
- The custom cursor no longer starts for reduced-motion users.

## Local measurements

Production static build, headless Edge, fresh pages, normal motion, 4× CPU
slowdown, 900 px viewport height. After load and a 3.2-second settling period,
scroll 35 px per animation frame for 150 frames. One sample per width and build.
These are lab observations, not field Core Web Vitals or physical-phone results.

| Observation | Before | After |
| --- | ---: | ---: |
| Desktop (1440 px) live-blur elements | 10 | 1 |
| Phone-width (390 px) live-blur elements | 4 | 0 |
| Desktop p95 animation-frame interval | 99.7 ms | 33.2 ms |
| Phone-width p95 animation-frame interval | 33.3 ms | 17.4 ms |
| Desktop intervals above 33.4 ms / 150 | 48 | 6 |
| Phone-width intervals above 33.4 ms / 150 | 6 | 0 |

The old initial carousel fetched a hidden 1,349,076-byte mobile image (and its
1,389,326-byte desktop alternative at desktop width). Neither is requested on
initial load now. Full-resolution originals are unchanged.

Load-time measurements did not establish a reliable across-the-board LCP gain:
the environment restricted external font requests, timings were noisy, and the
phone-width LCP was approximately unchanged. Do not present these results as a
Lighthouse score or claim the site is universally instant. Large artwork and
network conditions remain relevant to loading performance.

## Validation

- Production build, TypeScript, and CSP regression tests passed.
- Browser checks cover no blocking overlays, no mobile backdrop blurs, paused
  reduced-motion autoplay, manual carousel navigation, offscreen animation
  pausing, internal navigation, and contact form interaction without sending.
- Existing desktop/phone layout checks cover six routes, menu operation, runtime
  errors, overflow, and unexpected CSP violations.
