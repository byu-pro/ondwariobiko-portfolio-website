import { MobileDesign, folder, wrap } from './soundcurves-design-renderer.mjs';

const page = new MobileDesign('Product Page.jpg');
await page.header();
page.rect(0, 65, 390, 871, 'url(#dark)');
await page.photo({ left: 110, top: 335, width: 640, height: 365 }, 0, 94, 390, 222);
// Preserve the original four gallery thumbnails while rebuilding their selection border.
const thumbXs = [225, 333, 438, 545];
for (let i = 0; i < 4; i++) {
  await page.photo({ left: thumbXs[i], top: 736, width: 67, height: 60 }, 74 + i * 63, 339, 48, 43, { radius: 8 });
}
page.rect(73, 338, 50, 45, 'none', 8, '#fff');
page.text(['Q by', 'SoundCurves'], 24, 435, { size: 34, line: 39, weight: 700 });
page.text(['Hear Every Detail. Feel Every Beat'], 24, 519, { size: 16, weight: 700 });
page.text(wrap('Q by SoundCurves offers the ultimate hybrid earphones featuring 5 precision drivers that deliver exceptional sound clarity and balance across all frequencies.', 43), 24, 554, { size: 15, line: 24, fill: '#ccc' });
page.text(['$799'], 24, 679, { size: 23, weight: 700 });
page.text(['Color: Black'], 24, 719, { size: 15, weight: 700 });
page.rect(24, 737, 40, 40, '#100c18', 3, '#fff');
page.rect(76, 737, 40, 40, '#555', 3);
page.rect(24, 801, 117, 38, 'none', 0, '#999');
page.parts.push('<path d="M63 801v38 M102 801v38" stroke="#999" stroke-width="0.8"/>');
page.text(['−'], 43.5, 827, { size: 20, anchor: 'middle' });
page.text(['1'], 82.5, 826, { size: 17, anchor: 'middle' });
page.text(['+'], 121.5, 827, { size: 20, anchor: 'middle' });
page.button('ADD TO BAG', 24, 866, 186, { primary: true });
page.parts.push('<path d="M49 881h12v14H49z M52 881v-3a3 3 0 0 1 6 0v3" stroke="white" fill="none" stroke-width="1.1"/>');
page.y = 936;

page.rect(0, page.y, 390, 473, '#fff');
page.text(['Why Choose Q', 'by soundcurves?'], 195, page.y + 56, { size: 30, line: 36, weight: 700, anchor: 'middle', fill: '#111' });
const features = [
  { x: 171, label: ['Hybrid Five-', 'Driver Design'] },
  { x: 367, label: ['Minimal', 'Crossover Design'] },
  { x: 575, label: ['Flat Impedance', 'Across Devices'] },
  { x: 782, label: ['Premium', 'Comfort'] },
  { x: 978, label: ['Detachable', 'Cables'] },
  { x: 1171, label: ['Engineered in', 'the USA'] },
];
for (let i = 0; i < features.length; i++) {
  const x = 44 + i % 3 * 128;
  const y = page.y + 144 + Math.floor(i / 3) * 153;
  page.rect(x, y, 46, 46, '#fff', 5, '#999');
  await page.photo({ left: features[i].x + 10, top: 1352, width: 78, height: 78 }, x + 5, y + 5, 36, 36);
  page.text(features[i].label, x + 23, y + 71, { size: 11, line: 17, weight: 700, anchor: 'middle', fill: '#222' });
}
page.y += 473;

const specTop = page.y;
page.rect(0, specTop, 390, 738, '#fff');
page.text(['Specifications'], 195, specTop + 39, { size: 30, weight: 700, anchor: 'middle', fill: '#111' });
// The same product artwork without flattened handwritten annotations.
await page.photo({ left: 30, top: 2940, width: 600, height: 300 }, 24, specTop + 78, 342, 171, { source: `${folder}/Technology Page.jpg` });
const specs = [
  ['Impedance', ['16 Ω']],
  ['Cable Length', ['1.2 m']],
  ['Frequency Response', ['20 Hz – 40 kHz']],
  ['Connector', ['3.5 mm Gold-', 'Plated Jack']],
  ['Weight', ['20 g']],
  ['Sensitivity', ['112 dB']],
];
for (let i = 0; i < specs.length; i++) {
  const x = 24 + i % 2 * 183;
  const y = specTop + 289 + Math.floor(i / 2) * 92;
  page.text([specs[i][0]], x, y, { size: 13, weight: 700, fill: '#111' });
  page.text(specs[i][1], x, y + 27, { size: 17, line: 23, fill: '#444', font: 'Segoe Print, cursive' });
}
page.text(['Driver Setup'], 24, specTop + 573, { size: 13, weight: 700, fill: '#111' });
page.text(['5-Driver Hybrid', '(2 Balanced Armature + 3 Dynamic Drivers)'], 24, specTop + 602, { size: 14, line: 23, fill: '#444' });
page.button('See Full Specifications', 90, specTop + 664, 210, { light: true });
page.y += 738;

await page.photo({ left: 0, top: 2658, width: 1440, height: 1080 }, 0, page.y, 390, 390);
page.y += 390;
await page.section({
  dark: true,
  imageFirst: false,
  center: true,
  title: ['What’s Included', 'in the Box?'],
  copy: 'Q by SoundCurves Earphones, Detachable Cable, 5 Pairs of Ear Tips (various sizes), Carrying Case, Cleaning Tool and a Warranty Card.',
  image: { box: { left: 170, top: 4100, width: 1140, height: 655 }, width: 390, height: 224 },
});
await page.video({ left: 0, top: 4767, width: 1440, height: 850 }, 230, '#100c18');
await page.footer();
await page.save('product');
