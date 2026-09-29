import sharp from 'sharp';
import fs from 'node:fs/promises';

// Re-render in place: one editable master and one presentation PNG.
const folder = 'public/assets/soundcurves';
const source = `${folder}/Landing Page 1.jpg`;
const width = 390;
const parts = [];
const esc = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
function rect(x, y, w, h, fill, radius = 0) {
  parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}"/>`);
}
function text(lines, x, y, { size = 15, line = 24, fill = '#fff', weight = 400, anchor = 'start' } = {}) {
  parts.push(`<text x="${x}" y="${y}" font-family="Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${lines.map((s, i) => `<tspan x="${x}" dy="${i ? line : 0}">${esc(s)}</tspan>`).join('')}</text>`);
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
  let pipeline = sharp(source).extract({ left: 130, top: 4630, width: 310, height: 95 });
  if (inverted) pipeline = pipeline.negate();
  const bytes = await pipeline.png().toBuffer();
  parts.push(`<image x="${x}" y="${y}" width="${w}" height="${w * 95 / 310}" href="data:image/png;base64,${bytes.toString('base64')}"/>`);
}

rect(0, 0, width, 3700, '#fff');
rect(0, 0, width, 624, '#050506');
// Native artwork crops exclude all flattened desktop text.
await photo({ left: 600, top: 145, width: 650, height: 272 }, 0, 65, 390, 240);
rect(0, 0, 390, 65, '#000');
parts.push('<path d="M22 26h18 M22 32h18 M22 38h18" stroke="white" stroke-width="1.5"/><path d="M351 28h16v17h-16z M355 28v-4a4 4 0 0 1 8 0v4" stroke="white" fill="none" stroke-width="1.3"/>');
await logo(105, 5, 180, true);
text(['Upgrade Your', 'Listening Experience'], 195, 350, { size: 30, line: 37, weight: 700, anchor: 'middle' });
text(['Hear Music Exactly as Your', 'Favorite Artists Intended'], 195, 426, { anchor: 'middle', size: 14, line: 22, fill: '#ddd' });
button('TRY SOUNDCURVES TODAY', 26, 485, 204, { primary: true });
button('Learn More', 240, 485, 124);

rect(0, 560, 390, 590, '#030303');
await photo({ left: 90, top: 770, width: 1220, height: 360 }, 0, 560, 390, 175);
text(['Hear Every Nuance', 'and Detail'], 195, 784, { size: 29, line: 36, weight: 700, anchor: 'middle' });
text(['SoundCurves In-Ear Earphones deliver the', 'pristine, crystal-clear audio quality you’ve', 'been missing. It’s like being in the studio', 'with your favorite artist, hearing every', 'nuance and detail the way it was meant', 'to be heard. Traditional earphones simply', 'can’t match the clarity and precision', 'that SoundCurves offers.'], 195, 858, { anchor: 'middle', size: 14, line: 23, fill: '#c8c8c8' });
button('Shop Now', 131, 1068, 128);

await photo({ left: 87, top: 1617, width: 585, height: 553 }, 24, 1186, 342, 324, 22);
text(['Immerse Yourself,', 'Anytime, Anywhere'], 24, 1558, { size: 29, line: 36, weight: 700, fill: '#111' });
text(['Our precision-fit design creates a seal in', 'your ear that blocks outside noise and', 'enhances the richness of your music.', 'Whether you’re at home or on the go,', 'you’ll have a personal sound sanctuary', 'wherever you are.'], 24, 1639, { size: 15, line: 25, fill: '#555' });
button('Find Your Fit', 24, 1810, 142, { light: true });

rect(0, 1890, 390, 586, '#030303');
await photo({ left: 300, top: 2300, width: 820, height: 360 }, 0, 1890, 390, 200);
text(['All-Day Comfort', 'Without Compromise'], 195, 2143, { size: 29, line: 36, weight: 700, anchor: 'middle' });
text(['Designed for long listening sessions,', 'SoundCurves offers a secure fit with five', 'ear tip sizes to match your ear shape', 'perfectly. Enjoy your music without', 'discomfort, even during extended use.'], 195, 2224, { size: 14, line: 24, anchor: 'middle', fill: '#ccc' });
button('Learn More About Comfort', 85, 2377, 220);

await photo({ left: 0, top: 3098, width: 1440, height: 786 }, 0, 2476, 390, 300);
rect(0, 2776, 390, 702, '#030303');
await photo({ left: 0, top: 3886, width: 645, height: 634 }, 0, 2776, 390, 320);
text(['Try SoundCurves,', 'Risk-Free'], 24, 3135, { size: 30, line: 37, weight: 700 });
text(['We’re confident that SoundCurves will', 'elevate your music experience, but if it’s', 'not for you, returning them is easy. We', 'include a prepaid return shipping label', 'right in the box, so you can send them', 'back hassle-free. Try them for 30 days—', 'if you don’t fall in love with your music', 'all over again, we’ll refund you in full.'], 24, 3210, { size: 14, line: 22, fill: '#ccc' });
button('Start Your Trial', 24, 3412, 149);
rect(0, 3478, 390, 586, '#fff');
await logo(24, 3494, 170);
text(['SoundCurves delivers premium, precision-', 'engineered earphones designed for audiophiles', 'and everyday listeners alike, offering unmatched', 'sound quality, comfort, and style.'], 24, 3561, { size: 12, line: 20, fill: '#666' });
button('Buy Now', 24, 3646, 106, { light: true });
const columns = [
  { x: 24, title: 'COMPANY', links: ['Home', 'Earphones', 'Technology', 'About'] },
  { x: 142, title: 'HELP', links: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'] },
  { x: 278, title: 'FAQ', links: ['Account', 'Manage Deliveries', 'Orders', 'Payments'] },
];
for (const col of columns) {
  text([col.title], col.x, 3745, { size: 10, weight: 700, fill: '#333' });
  text(col.links, col.x, 3775, { size: 10, line: 26, fill: '#666' });
}
parts.push('<path d="M24 3893h342" stroke="#bbb" stroke-width="0.7"/>');
text(['© 2024 SOUNDCURVES. All Rights Reserved'], 24, 3922, { size: 9, fill: '#666' });
// Keep the original payment brand artwork instead of redrawing their marks.
await photo({ left: 1020, top: 4995, width: 290, height: 35 }, 24, 3947, 232, 28);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="390" height="4020" viewBox="0 0 390 4020">${parts.join('')}</svg>`;
await fs.writeFile(`${folder}/soundcurves-landing-page-1-mobile.svg`, svg);
const png = await sharp(Buffer.from(svg), { density: 432, limitInputPixels: false })
  .withMetadata({ density: 600 })
  .png({ compressionLevel: 9 })
  .toBuffer();
await fs.writeFile(`${folder}/soundcurves-landing-page-1-mobile.png`, png);
console.log(await sharp(`${folder}/soundcurves-landing-page-1-mobile.png`).metadata());
