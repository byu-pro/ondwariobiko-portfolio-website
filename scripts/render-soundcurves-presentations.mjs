import sharp from 'sharp';
import fs from 'node:fs/promises';

const folder = 'public/assets/soundcurves';
const scale = 2;
const margin = 120;
const gap = 120;
const desktopWidth = 1440;
const pages = [
  {
    name: 'home',
    desktop: 'Home Page.jpg',
    mobile: 'soundcurves-home-mobile.svg',
    mobileWidth: 540,
  },
  {
    name: 'landing-page-1',
    desktop: 'Landing Page 1.jpg',
    mobile: 'soundcurves-landing-page-1-mobile.svg',
    mobileWidth: 440,
  },
  {
    name: 'technology',
    desktop: 'Technology Page.jpg',
    mobile: 'soundcurves-technology-mobile.svg',
    mobileWidth: 390,
  },
  {
    name: 'product',
    desktop: 'Product Page.jpg',
    mobile: 'soundcurves-product-mobile.svg',
    mobileWidth: 600,
  },
];

const requested = process.argv.slice(2);
for (const page of pages.filter((page) => !requested.length || requested.includes(page.name))) {
  const desktop = await sharp(`${folder}/${page.desktop}`)
    .resize({ width: desktopWidth * scale }).png().toBuffer();
  const mobile = await sharp(`${folder}/${page.mobile}`, { density: Math.ceil(72 * page.mobileWidth * scale / 390) })
    .resize({ width: page.mobileWidth * scale }).png().toBuffer();
  const dm = await sharp(desktop).metadata();
  const mm = await sharp(mobile).metadata();
  const width = (margin * 2 + desktopWidth + gap + page.mobileWidth) * scale;
  const height = Math.max(dm.height, mm.height) + margin * 2 * scale;
  const output = `${folder}/soundcurves-${page.name}-desktop-mobile-presentation-600dpi.png`;
  const png = await sharp({ create: { width, height, channels: 3, background: '#ffffff' } })
    .composite([
      { input: desktop, left: margin * scale, top: margin * scale },
      { input: mobile, left: (margin + desktopWidth + gap) * scale, top: margin * scale },
    ])
    .withMetadata({ density: 600 })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await fs.writeFile(output, png);
  const verified = await sharp(output).metadata();
  console.log(JSON.stringify({ output, width: verified.width, height: verified.height, dpi: verified.density }));
}
