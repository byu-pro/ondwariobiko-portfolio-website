import sharp from 'sharp';
import fs from 'node:fs/promises';

// Brief-based portfolio visuals, explicitly labelled as design direction.
// Replace these same canonical assets when final project screenshots are supplied.
const dir = 'public/assets';
const c = { navy: '#1C2B39', slate: '#234046', teal: '#0B7484', paper: '#F4F8F9', white: '#FFFFFF', line: '#D5E1E4' };
const esc = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
const text = (s, x, y, size = 24, fill = c.navy, weight = 400) => `<text x="${x}" y="${y}" font-family="Arial, sans-serif" font-size="${size}" font-weight="${weight}" letter-spacing="${size >= 40 ? '-1.5' : '0'}" fill="${fill}">${esc(s)}</text>`;
const rect = (x, y, w, h, fill, r = 0, stroke = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="1"` : ''}/>`;
const line = (x, y, w) => `<path d="M${x} ${y}h${w}" stroke="${c.line}"/>`;
function browser(x, y, w, h, name) {
  return rect(x, y, w, h, c.white, 12, c.line) + rect(x + 1, y + 1, w - 2, 43, c.paper, 12) + line(x, y + 44, w)
    + [0, 1, 2].map((i) => `<circle cx="${x + 20 + i * 16}" cy="${y + 23}" r="4" fill="${c.line}"/>`).join('')
    + text(name, x + 88, y + 29, 14, c.slate);
}
function walkthrough(x, y, w = 1020) {
  const scale = w / 1020;
  return `<g transform="translate(${x} ${y}) scale(${scale})">` + browser(0, 0, 1020, 505, 'Steplight / Walkthrough editor')
    + rect(0, 45, 235, 460, c.paper, 12)
    + text('WALKTHROUGH', 24, 87, 13, c.slate, 700)
    + ['01   Workspace setup', '02   Product tour', '03   First task'].map((s, i) => rect(15, 107 + i * 58, 202, 44, i === 1 ? c.teal : c.white, 8, i === 1 ? '' : c.line) + text(s, 28, 135 + i * 58, 15, i === 1 ? c.white : c.navy)).join('')
    + text('Product screen', 268, 91, 21, c.navy, 700)
    + rect(265, 117, 726, 342, c.paper, 12, c.line)
    + rect(284, 140, 142, 297, c.white, 8, c.line)
    + ['Overview', 'Workspace', 'Settings'].map((s, i) => text(s, 301, 176 + i * 43, 14, i === 1 ? c.teal : c.slate)).join('')
    + text('Workspace', 451, 175, 26, c.navy, 700)
    + rect(450, 198, 514, 51, c.white, 8, c.line)
    + text('Workspace name', 468, 230, 16, c.slate)
    + rect(545, 273, 388, 139, c.white, 12, c.teal)
    + text('A clear next step', 569, 310, 22, c.navy, 700)
    + text('Guide customers inside your product.', 569, 342, 16, c.slate)
    + rect(568, 363, 120, 31, c.teal, 8)
    + text('Continue →', 585, 384, 14, c.white, 700)
    + '</g>';
}
function progress(x, y, w = 660) {
  return `<g transform="translate(${x} ${y}) scale(${w / 660})">` + browser(0, 0, 660, 330, 'Customer progress / Interface structure')
    + text('See where guidance is needed.', 24, 89, 24, c.navy, 700)
    + rect(24, 114, 612, 41, c.paper, 8)
    + text('Walkthrough', 38, 141, 14, c.slate, 700) + text('Status', 349, 141, 14, c.slate, 700) + text('Next step', 481, 141, 14, c.slate, 700)
    + ['Workspace setup', 'Product tour', 'First task'].map((s, i) => text(s, 38, 190 + i * 51, 16) + rect(350, 173 + i * 51, 80, 10, c.line, 5) + rect(483, 173 + i * 51, 125, 10, c.line, 5) + line(24, 208 + i * 51, 612)).join('') + '</g>';
}
async function save(name, width, height, content) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${content}</svg>`;
  await fs.writeFile(`${dir}/${name}.png`, await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer());
}

await save('steplight_thumbnail', 1200, 1500,
  rect(0, 0, 1200, 1500, c.navy)
  + text('WEBSITE DESIGN  /  B2B SAAS', 72, 103, 21, c.line)
  + text('Steplight', 66, 260, 130, c.white, 700)
  + text('Product-led clarity.', 72, 340, 48, c.white)
  + rect(72, 388, 310, 3, c.teal)
  + walkthrough(72, 493, 1056)
  + text('Two pages.', 72, 1178, 66, c.white, 700)
  + text('One clear direction.', 72, 1255, 66, c.white, 700)
  + text('HOMEPAGE + SERVICES', 72, 1366, 20, c.line)
  + text('DESIGN DIRECTION', 72, 1410, 17, c.line));

await save('steplight_cover', 1200, 1500,
  rect(0, 0, 1200, 1500, c.navy)
  + text('Steplight', 120, 745, 165, c.white, 700)
  + rect(126, 806, 944, 2, c.line)
  + text('SELF-SERVE PRODUCT ONBOARDING', 126, 862, 25, c.line)
  + text('WEBSITE DESIGN DIRECTION', 126, 1380, 18, c.line));

await save('steplight_herobanner', 1920, 1200,
  rect(0, 0, 1920, 1200, c.navy)
  + text('Steplight', 92, 140, 89, c.white, 700)
  + text('A product-first website for self-serve onboarding.', 96, 216, 36, c.line)
  + text('HOMEPAGE + SERVICES  /  DESIGN DIRECTION', 96, 1106, 20, c.line)
  + walkthrough(96, 325, 1230)
  + progress(1120, 710, 700));

const homepage = ['Sticky navigation + two dropdowns', 'Dark hero + product interface', 'Single-line context band', 'Problem + interface collage', 'Three-step how it works', 'Customer progress table', 'Three-column benefits', 'Three pricing cards', 'Five-question FAQ', 'Dark conversion section', 'Multi-column footer'];
const services = ['Hero + single-line rates band', 'Problem section', 'Six-card service grid', 'Four-row numbered list', 'Pricing table + four cards', 'Four-step process', 'Two-column note', 'Three supporting cards', 'FAQ', 'Final conversion section', 'Shared navigation + footer'];
let architecture = rect(0, 0, 1600, 900, c.paper) + text('Two journeys. One system.', 64, 98, 54, c.navy, 700)
  + text('Steplight / Page architecture from the brief', 64, 141, 23, c.slate);
for (const [i, name, rows] of [[0, '01  Homepage', homepage], [1, '02  Services', services]]) {
  const x = 64 + i * 760;
  architecture += rect(x, 188, 712, 627, c.white, 12, c.line) + text(name, x + 28, 242, 32, c.navy, 700);
  rows.forEach((s, j) => { architecture += text(String(j + 1).padStart(2, '0'), x + 28, 293 + j * 44, 17, c.teal, 700) + text(s, x + 78, 293 + j * 44, 20, c.slate); });
}
architecture += text('Shared components: navigation · buttons · cards · pricing · accordions · responsive layouts', 64, 861, 19, c.slate);
await save('steplight_architecture', 1600, 900, architecture);

await save('steplight_interface', 1600, 900,
  rect(0, 0, 1600, 900, c.paper)
  + text('Let the interface explain.', 64, 92, 52, c.navy, 700)
  + text('Illustrative UI direction / Not a shipped product screenshot', 64, 136, 22, c.slate)
  + walkthrough(64, 207, 950)
  + progress(898, 492, 638)
  + text('One accent. Hairline borders. Clear hierarchy.', 64, 797, 25, c.slate)
  + text('Product screens carry the visual story.', 64, 839, 21, c.slate));
console.log('Created five canonical Steplight PNG originals.');
