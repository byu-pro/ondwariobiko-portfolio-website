/** Recommended export dimensions; rendered tiles scale responsively. */
export const brandMockupSlots = [
  { id: "brand-scene", title: "Brand in context", width: 2400, height: 1350, placement: "intro" },
  {
    id: "application-portrait-1",
    title: "Primary application",
    width: 1800,
    height: 2400,
    placement: "applications",
  },
  {
    id: "application-portrait-2",
    title: "Identity detail",
    width: 1800,
    height: 2400,
    placement: "applications",
  },
  {
    id: "application-landscape-1",
    title: "Brand across touchpoints",
    width: 2400,
    height: 1600,
    placement: "applications",
  },
  {
    id: "application-landscape-2",
    title: "Material & finish",
    width: 2400,
    height: 1600,
    placement: "applications",
  },
  {
    id: "full-width-scene",
    title: "The complete brand experience",
    width: 3200,
    height: 1800,
    placement: "full-width",
  },
] as const;

export type BrandMockupImage = {
  id: (typeof brandMockupSlots)[number]["id"];
  src: string;
  alt: string;
};
