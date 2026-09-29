import sharp from 'sharp';
import fs from 'node:fs/promises';

// Keep copy editable and render it at export resolution; never upscale flattened text.
const folder = 'public/assets/soundcurves';
const source = `${folder}/Home Page.jpg`;
const parts = [];
const esc = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
function rect(x, y, w, h, fill, radius = 0) {
  parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}"/>`);
}
function text(lines, x, y, { size = 15, line = 24, fill = '#fff', weight = 400, anchor = 'start', font = 'Arial, sans-serif' } = {}) {
  parts.push(`<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${lines.map((s, i) => `<tspan x="${x}" dy="${i ? line : 0}">${esc(s)}</tspan>`).join('')}</text>`);
}
async function photo(box, x, y, w, h, radius = 0) {
  const bytes = await sharp(source).extract(box).png().toBuffer();
  const id = `clip${parts.length}`;
  parts.push(`<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}"/></clipPath><image x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})" href="data:image/png;base64,${bytes.toString('base64')}"/>`);
}
function button(label, x, y, w, { light = false, primary = false } = {}) {
  parts.push(`<rect x="${x}" y="${y}" width="${w}" height="42" rx="21" fill="${primary ? '#5b4e72' : 'none'}" stroke="${primary ? '#5b4e72' : light ? '#777' : '#aaa'}" stroke-width="0.8"/>`);
  text([label], x + w / 2, y + 26, { size: 11, weight: primary ? 700 : 400, anchor: 'middle', fill: light ? '#222' : '#fff' });
}
async function logo(x, y, w, inverted = false) {
  let pipeline = sharp(source).extract({ left: 135, top: 5397, width: 295, height: 85 });
  if (inverted) pipeline = pipeline.negate();
  const bytes = await pipeline.png().toBuffer();
  parts.push(`<image x="${x}" y="${y}" width="${w}" height="${w * 85 / 295}" href="data:image/png;base64,${bytes.toString('base64')}"/>`);
}

parts.push('<defs><linearGradient id="dark" x2="0" y2="1"><stop stop-color="#242424"/><stop offset="1" stop-color="#000"/></linearGradient><linearGradient id="paper" x2="1" y2="1"><stop stop-color="#fff"/><stop offset="1" stop-color="#ececec"/></linearGradient><filter id="shadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="4" stdDeviation="5" flood-opacity="0.14"/></filter></defs>');
rect(0, 0, 390, 4440, '#fff');
rect(0, 0, 390, 510, '#000');
parts.push('<path d="M22 26h18 M22 32h18 M22 38h18" stroke="white" stroke-width="1.5"/><path d="M351 28h16v17h-16z M355 28v-4a4 4 0 0 1 8 0v4" stroke="white" fill="none" stroke-width="1.3"/>');
await logo(105, 7, 180, true);
await photo({ left: 166, top: 173, width: 1107, height: 533 }, 0, 70, 390, 205);
text(['Your'], 195, 312, { size: 30, weight: 700, anchor: 'middle' });
text(['favorite songs'], 195, 348, { size: 30, weight: 700, fill: '#79668e', anchor: 'middle' });
text(['have never sounded', 'this good'], 195, 384, { size: 30, line: 36, weight: 700, anchor: 'middle' });
button('Explore the Earphones', 24, 449, 196);
button('BUY NOW', 236, 449, 130, { primary: true });

rect(0, 510, 390, 650, 'url(#dark)');
text(['Superior', 'Sound Quality'], 24, 564, { size: 32, line: 37, weight: 700 });
text(['When you close your eyes, it will feel like', 'you’re in the studio with your favorite artist.', 'Every note, every beat, just for you—', 'captured with unparalleled clarity and depth.'], 24, 641, { size: 15, line: 25, fill: '#ddd' });
await photo({ left: 0, top: 1590, width: 1440, height: 110 }, 0, 1070, 390, 90);
await photo({ left: 815, top: 1158, width: 490, height: 432 }, 24, 762, 342, 302, 22);

rect(0, 1160, 390, 1730, '#fff');
rect(0, 1640, 390, 1210, 'url(#paper)');
await photo({ left: 60, top: 1706, width: 395, height: 512 }, 25, 1175, 205, 266);
rect(195, 1290, 36, 45, '#fff');
text(['Pristine sound'], 230, 1294, { size: 14, fill: '#222', font: 'Segoe Print, cursive' });
parts.push('<path d="M235 1305q-29-18-40 8m0 0 1-9m-1 9 9-3" fill="none" stroke="#333" stroke-width="1.3"/>');
text(['Elevate Your Style'], 24, 1494, { size: 30, weight: 700, fill: '#111' });
text(['Why settle for ordinary? Your earphones', 'should look as pristine as they sound.', 'With SoundCurves, style and sound', 'go hand in hand.'], 24, 1535, { size: 15, line: 25, fill: '#444' });
text(['All-Day Comfort'], 195, 1682, { size: 30, weight: 700, fill: '#111', anchor: 'middle' });
text(['Experience comfort that lasts. With 5 sizes', 'of ear tips, our universal earphones ensure', 'a perfect fit that keeps your ears happy,', 'no matter how long you listen.'], 195, 1725, { size: 15, line: 25, fill: '#444', anchor: 'middle' });

// The source card labels are masked before adding freshly rendered lettering.
const cards = [
  { x: 143, y: 2570, w: 352, h: 386, top: 1850, label: 'Precision Fit', cover: [8, 80, 155, 35], tx: 20, ty: 105 },
  { x: 545, y: 2568, w: 350, h: 386, top: 2178, label: 'Multiple Sizes', cover: [184, 112, 162, 47], tx: 184, ty: 145 },
  { x: 945, y: 2568, w: 351, h: 386, top: 2506, label: 'Universal Comfort', cover: [18, 66, 188, 41], tx: 20, ty: 98 },
];
for (const card of cards) {
  const w = 274;
  const s = w / card.w;
  rect(58, card.top + 3, 274, card.h * s, '#dedede', 26);
  await photo({ left: card.x, top: card.y, width: card.w, height: card.h }, 58, card.top, w, card.h * s, 26);
  const [cx, cy, cw, ch] = card.cover;
  rect(58 + cx * s, card.top + cy * s, cw * s, ch * s, '#fff');
  text([card.label], 58 + card.tx * s, card.top + card.ty * s, { size: card.label === 'Universal Comfort' ? 11 : 13, fill: '#222', font: 'Segoe Print, cursive' });
}

// Original product video still; its central play mark is rebuilt at export resolution.
await photo({ left: 0, top: 3076, width: 1440, height: 790 }, 0, 2850, 390, 240);
parts.push('<circle cx="195" cy="2970" r="19" fill="#222" stroke="white" stroke-width="2.5"/><path d="m190 2960 15 10-15 10z" fill="white"/>');
rect(0, 3090, 390, 759, 'url(#dark)');
text(['Discover Every Detail'], 195, 3144, { size: 29, weight: 700, anchor: 'middle' });
text(['Unlock the full potential of your music.', 'SoundCurves delivers crystal-clear,', 'detailed sound like you’ve never', 'heard before.'], 195, 3188, { size: 15, line: 24, fill: '#ddd', anchor: 'middle' });
// Preserve the original feature symbols, split into two comfortably spaced rows.
const icons = [155, 273, 389, 504, 617, 730, 845, 962, 1078, 1194];
for (let i = 0; i < icons.length; i++) {
  await photo({ left: icons[i], top: 4250, width: 80, height: 80 }, 44 + (i % 5) * 63, 3310 + Math.floor(i / 5) * 56, 40, 40, 6);
}

await photo({ left: 400, top: 4400, width: 820, height: 645 }, 0, 3420, 390, 307);
// Replace the entire flattened callout with an opaque, crisp vector callout.
rect(210, 3490, 174, 60, '#fff', 8);
text(['Impact resistant'], 220, 3511, { size: 12, weight: 700, fill: '#111' });
text(['Designed to handle', 'life on the go.'], 220, 3528, { size: 11, line: 15, fill: '#333' });
for (let i = 0; i < 5; i++) parts.push(`<circle cx="${155 + i * 20}" cy="3794" r="3.5" fill="${i ? '#666' : '#fff'}"/>`);

rect(0, 3849, 390, 591, '#fff');
await logo(24, 3875, 170);
text(['SoundCurves delivers premium, precision-', 'engineered earphones designed for audiophiles', 'and everyday listeners alike, offering unmatched', 'sound quality, comfort, and style.'], 24, 3952, { size: 12, line: 20, fill: '#666' });
button('Buy Now', 24, 4040, 106, { light: true });
await photo({ left: 139, top: 5663, width: 157, height: 38 }, 24, 4100, 132, 32);
const columns = [
  { x: 24, title: 'COMPANY', links: ['Home', 'Earphones', 'Technology', 'About'] },
  { x: 142, title: 'HELP', links: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'] },
  { x: 278, title: 'FAQ', links: ['Account', 'Manage Deliveries', 'Orders', 'Payments'] },
];
for (const col of columns) {
  text([col.title], col.x, 4181, { size: 10, weight: 700, fill: '#333' });
  text(col.links, col.x, 4211, { size: 10, line: 26, fill: '#666' });
}
parts.push('<path d="M24 4320h342" stroke="#bbb" stroke-width="0.7"/>');
text(['© 2024 SOUNDCURVES, All Rights Reserved'], 24, 4350, { size: 9, fill: '#666' });
await photo({ left: 1025, top: 5768, width: 290, height: 40 }, 24, 4375, 232, 32);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="390" height="4440" viewBox="0 0 390 4440">${parts.join('')}</svg>`;
await fs.writeFile(`${folder}/soundcurves-home-mobile.svg`, svg);
const png = await sharp(Buffer.from(svg), { density: 432, limitInputPixels: false })
  .withMetadata({ density: 600 }).png({ compressionLevel: 9 }).toBuffer();
// Preserve the existing requested filename so links and later revisions stay stable.
const output = `${folder}/soundcurves-home-mobile-390w-4x-300dpi.png`;
await fs.writeFile(output, png);
const metadata = await sharp(output).metadata();
console.log(JSON.stringify({ output, width: metadata.width, height: metadata.height, dpi: metadata.density }));
