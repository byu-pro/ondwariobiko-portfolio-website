# Brand case-study mockups

Six slots are available in each brand/logo case study: Pelican Social, Ikon Trailers, Iron Acre, Friends of Unionville, and Green Essentials. The opening hero image spans the viewport width. Digital case studies keep their existing layout and do not use these slots.

| Slot ID | Placement | Export size | Ratio |
| --- | --- | --- | --- |
| `brand-scene` | After the brief, before the insight | 2400 × 1350 px | Landscape 16:9 |
| `application-portrait-1` | After colour and typography | 1800 × 2400 px | Portrait 3:4 |
| `application-portrait-2` | Beside the first portrait | 1800 × 2400 px | Portrait 3:4 |
| `application-landscape-1` | Below the portrait pair | 2400 × 1600 px | Landscape 3:2 |
| `application-landscape-2` | Beside the first landscape | 2400 × 1600 px | Landscape 3:2 |
| `full-width-scene` | After applications, before impact; edge to edge | 3200 × 1800 px | Landscape 16:9 |

These are image export dimensions, not fixed screen sizes. Tiles scale to the available width and stack on small screens. Keep important artwork inside the frame; images fill the tile using the indicated aspect ratio.

To populate a slot, save a canonical PNG or JPG in `public/assets`, run the existing image optimizer, and add a `mockups` entry to that project in `src/lib/projects.ts`. Use the generated WebP URL and a descriptive alt text. The dimension guide disappears when an image is supplied.

```ts
mockups: [
  {
    id: "brand-scene",
    src: `${import.meta.env.BASE_URL}assets/pelicansocial_mockup_scene.webp`,
    alt: "Pelican Social identity applied to exterior bar signage.",
  },
],
```

Use a stable asset filename for each mockup and replace it when revising the artwork.
