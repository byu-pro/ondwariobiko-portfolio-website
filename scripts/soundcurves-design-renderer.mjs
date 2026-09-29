import sharp from 'sharp';
import fs from 'node:fs/promises';

export const folder = 'public/assets/soundcurves';
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
export function wrap(copy, max = 43) {
  const lines = [];
  for (const word of copy.split(/\s+/)) {
    if (!lines.length || `${lines.at(-1)} ${word}`.length > max) lines.push(word);
    else lines[lines.length - 1] += ` ${word}`;
  }
  return lines;
}

export class MobileDesign {
  constructor(source) {
    this.source = `${folder}/${source}`;
    this.parts = ['<defs><linearGradient id="dark" x2="0%" y2="100%"><stop stop-color="#242424"/><stop offset="1" stop-color="#000"/></linearGradient></defs>'];
    this.y = 0;
  }
  rect(x, y, w, h, fill, radius = 0, stroke = null) {
    this.parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="0.8"` : ''}/>`);
  }
  text(lines, x, y, { size = 15, line = 24, fill = '#fff', weight = 400, anchor = 'start', font = 'Arial, sans-serif' } = {}) {
    this.parts.push(`<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${lines.map((s, i) => `<tspan x="${x}" dy="${i ? line : 0}">${escape(s)}</tspan>`).join('')}</text>`);
    return lines.length * line;
  }
  async photo(box, x, y, w, h, { radius = 0, source = this.source } = {}) {
    const bytes = await sharp(source).extract(box).png().toBuffer();
    const id = `clip${this.parts.length}`;
    this.parts.push(`<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}"/></clipPath><image x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})" href="data:image/png;base64,${bytes.toString('base64')}"/>`);
  }
  button(label, x, y, w, { light = false, primary = false } = {}) {
    this.rect(x, y, w, 42, primary ? '#5b4e72' : 'none', 21, primary ? '#5b4e72' : light ? '#777' : '#aaa');
    this.text([label], x + w / 2, y + 26, { size: 11, weight: primary ? 700 : 400, anchor: 'middle', fill: light ? '#222' : '#fff' });
  }
  async logo(x, y, w, inverted = false) {
    let pipeline = sharp(`${folder}/Home Page.jpg`).extract({ left: 135, top: 5397, width: 295, height: 85 });
    if (inverted) pipeline = pipeline.negate();
    const data = await pipeline.png().toBuffer();
    this.parts.push(`<image x="${x}" y="${y}" width="${w}" height="${w * 85 / 295}" href="data:image/png;base64,${data.toString('base64')}"/>`);
  }
  async header() {
    this.rect(0, 0, 390, 65, '#000');
    this.parts.push('<path d="M22 26h18 M22 32h18 M22 38h18" stroke="white" stroke-width="1.5"/><path d="M351 28h16v17h-16z M355 28v-4a4 4 0 0 1 8 0v4" stroke="white" fill="none" stroke-width="1.3"/>');
    await this.logo(105, 7, 180, true);
    this.y = 65;
  }
  async section({ title, copy, bullets = [], image, dark = false, button, center = false, imageFirst = true }) {
    const start = this.y;
    const background = this.parts.length;
    this.parts.push('');
    this.y += 32;
    const drawImage = async () => {
      if (!image) return;
      const w = image.width ?? 342;
      const h = image.height ?? Math.round(w * image.box.height / image.box.width);
      await this.photo(image.box, (390 - w) / 2, this.y, w, h, { radius: image.radius ?? 0, source: image.source ?? this.source });
      this.y += h + 34;
    };
    if (imageFirst) await drawImage();
    this.y += 29;
    this.text(title, center ? 195 : 24, this.y, { size: 30, line: 36, fill: dark ? '#fff' : '#111', weight: 700, anchor: center ? 'middle' : 'start' });
    this.y += (title.length - 1) * 36 + 38;
    const lines = wrap(copy, 43);
    this.text(lines, center ? 195 : 24, this.y, { size: 15, line: 24, fill: dark ? '#ccc' : '#444', anchor: center ? 'middle' : 'start' });
    this.y += lines.length * 24 + 4;
    if (bullets.length) {
      this.y += 16;
      for (const bullet of bullets) {
        const lines = wrap(bullet, 40);
        this.text(['•'], 24, this.y, { fill: dark ? '#fff' : '#222' });
        this.text(lines, 38, this.y, { size: 14, line: 23, weight: 700, fill: dark ? '#eee' : '#222' });
        this.y += lines.length * 23 + 10;
      }
    }
    if (button) {
      this.y += 16;
      this.button(button.label, center ? (390 - button.width) / 2 : 24, this.y, button.width, { light: !dark, primary: button.primary });
      this.y += 42;
    }
    if (!imageFirst) { this.y += 24; await drawImage(); }
    this.y += 36;
    this.parts[background] = `<rect x="0" y="${start}" width="390" height="${this.y - start}" fill="${dark ? 'url(#dark)' : '#fff'}"/>`;
  }
  async video(box, height, fill = '#111') {
    const top = this.y;
    await this.photo(box, 0, top, 390, height);
    this.parts.push(`<circle cx="195" cy="${top + height / 2}" r="19" fill="${fill}" stroke="white" stroke-width="2.5"/><path d="m190 ${top + height / 2 - 10} 15 10-15 10z" fill="white"/>`);
    this.y += height;
  }
  async footer() {
    const y = this.y;
    const source = `${folder}/Home Page.jpg`;
    this.rect(0, y, 390, 590, '#fff');
    await this.logo(24, y + 26, 170);
    this.text(['SoundCurves delivers premium, precision-', 'engineered earphones designed for audiophiles', 'and everyday listeners alike, offering unmatched', 'sound quality, comfort, and style.'], 24, y + 103, { size: 12, line: 20, fill: '#666' });
    this.button('Buy Now', 24, y + 191, 106, { light: true });
    await this.photo({ left: 139, top: 5663, width: 157, height: 38 }, 24, y + 251, 132, 32, { source });
    const columns = [
      { x: 24, title: 'COMPANY', links: ['Home', 'Earphones', 'Technology', 'About'] },
      { x: 142, title: 'HELP', links: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'] },
      { x: 278, title: 'FAQ', links: ['Account', 'Manage Deliveries', 'Orders', 'Payments'] },
    ];
    for (const col of columns) {
      this.text([col.title], col.x, y + 332, { size: 10, weight: 700, fill: '#333' });
      this.text(col.links, col.x, y + 362, { size: 10, line: 26, fill: '#666' });
    }
    this.parts.push(`<path d="M24 ${y + 471}h342" stroke="#bbb" stroke-width="0.7"/>`);
    this.text(['© 2024 SOUNDCURVES, All Rights Reserved'], 24, y + 501, { size: 9, fill: '#666' });
    await this.photo({ left: 1025, top: 5768, width: 290, height: 40 }, 24, y + 526, 232, 32, { source });
    this.y += 590;
  }
  async save(name) {
    const height = Math.ceil(this.y);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="390" height="${height}" viewBox="0 0 390 ${height}">${this.parts.join('')}</svg>`;
    const base = `${folder}/soundcurves-${name}-mobile`;
    await fs.writeFile(`${base}.svg`, svg);
    // Rasterize tall pages in bands to avoid the SVG renderer's 32767px edge limit.
    const tiles = [];
    for (let top = 0; top < height; top += 1800) {
      const bandHeight = Math.min(1800, height - top);
      const band = `<svg xmlns="http://www.w3.org/2000/svg" width="390" height="${bandHeight}" viewBox="0 ${top} 390 ${bandHeight}">${this.parts.join('')}</svg>`;
      const input = await sharp(Buffer.from(band), { density: 432, limitInputPixels: false }).png().toBuffer();
      tiles.push({ input, left: 0, top: top * 6 });
    }
    const png = await sharp({ create: { width: 2340, height: height * 6, channels: 3, background: '#fff' } })
      .composite(tiles).withMetadata({ density: 600 }).png({ compressionLevel: 9 }).toBuffer();
    await fs.writeFile(`${base}.png`, png);
    const m = await sharp(`${base}.png`).metadata();
    console.log(JSON.stringify({ file: `${base}.png`, width: m.width, height: m.height, dpi: m.density }));
  }
}
