import { MobileDesign } from './soundcurves-design-renderer.mjs';

const page = new MobileDesign('Technology Page.jpg');
await page.header();
await page.section({
  dark: true,
  image: { box: { left: 660, top: 145, width: 730, height: 670 }, width: 390, height: 350 },
  title: ['Step Into a New', 'World of Sound'],
  copy: 'Discover the advanced technology behind SoundCurves for an unmatched listening experience.',
  button: { label: 'LEARN MORE', width: 145, primary: true },
});
await page.section({
  image: { box: { left: 0, top: 825, width: 640, height: 750 }, height: 400 },
  title: ['Hybrid 5-Driver', 'Design: Precision', 'in Every Frequency'],
  copy: 'SoundCurves earphones have a carefully engineered five-driver setup, designed to cover the full audio spectrum with unparalleled clarity. Each driver is optimized for a specific frequency range—two tweeters for high frequencies, two mid-range drivers, and a bass driver for deep, powerful lows. This specialized combination ensures fuller, more precise sound reproduction for every type of music.',
  bullets: ['High-fidelity sound across all frequencies', 'Deep, powerful bass response', 'Crisp highs and accurate mid-range for true-to-life sound'],
});
await page.section({
  dark: true,
  image: { box: { left: 820, top: 1708, width: 610, height: 790 }, height: 443 },
  title: ['Flat Impedance:', 'Pure Sound Across', 'All Devices'],
  copy: 'Experience consistent, exceptional audio quality across all your devices. With SoundCurves’ flat impedance design, every note is delivered with precision. This is made possible by advanced acoustic waveguides and interference-reducing technology that channel sound directly to your ear, providing a distortion-free experience.',
  bullets: ['Consistent audio quality across smartphones, tablets, and PCs', 'No distortion or interference', 'Superior performance in all environments'],
});
await page.section({
  image: { box: { left: 30, top: 2940, width: 600, height: 300 } },
  title: ['Patented Minimal', 'Crossover: Cleaner', 'Signal, Purer Sound'],
  copy: 'While many earphones rely on complex crossovers that split frequencies between drivers, leading to distortion, SoundCurves’ patented minimal crossover ensures that each driver receives the cleanest signal possible. This means your music sounds just as the artists intended—pure and uncolored.',
  bullets: ['Clear, undistorted signal to every driver', 'Designed for true audiophiles', 'No loss of sound quality between frequencies'],
});
await page.section({
  dark: true,
  image: { box: { left: 90, top: 3670, width: 555, height: 660 } },
  title: ['Designed for the', 'Way Humans Hear'],
  copy: 'Humans instinctively respond to certain frequencies, from the cry of a baby to the distant rumble of thunder. At SoundCurves, we apply this understanding to every aspect of our earphone design. By finely tuning each frequency range, we create an immersive listening experience that connects emotionally and intellectually, allowing you to experience music the way it was meant to be heard.',
  bullets: ['Tuned to human auditory sensitivity', 'Immersive, natural listening experience', 'Fine-tuned for emotional and intellectual connection'],
});
await page.video({ left: 0, top: 4476, width: 1440, height: 782 }, 212);
await page.section({
  dark: true,
  image: { box: { left: 0, top: 5260, width: 690, height: 695 }, width: 390, height: 393 },
  title: ['Discover the', 'Difference'],
  copy: 'With SoundCurves’ cutting-edge technology, you can enjoy audio the way it was meant to be heard—clear, powerful, and immersive. From our hybrid driver design to our human-centric tuning, SoundCurves delivers a listening experience like no other.',
  button: { label: 'Experience SoundCurves Today', width: 254 },
});
await page.footer();
await page.save('technology');
