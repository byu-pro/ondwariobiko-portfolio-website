import { useEffect, useRef, useState } from "react";
import { seoHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteFooter";
import { LogoAnimation } from "@/components/LogoAnimation";

export const Route = createFileRoute("/about")({
  head: () =>
    seoHead(
      "about",
      "About John Obiko | Freelance Graphic Designer & Custom Logo Designer",
      "Meet John Obiko: an independent graphic designer, custom logo designer, and brand identity specialist with 10+ years of experience working remotely for clients worldwide.",
      "assets/johnobiko_profilepic.webp",
      [],
      "about John Obiko, freelance graphic designer, logo designer bio, brand identity developer, Nairobi graphic designer"
    ),
  component: AboutPage,
});

/* ── data ───────────────────────────────────────────────── */
const pillars = [
  {
    n: "01",
    title: "Hand-drawn, not templated",
    body: "I draw letterforms and symbols manually with the pen tool rather than leaning on existing fonts. Every mark is genuinely custom — built from scratch for your brand alone, not assembled from someone else's shapes.",
  },
  {
    n: "02",
    title: "Designed and built by the same person",
    body: "When I also handle your website, there's no gap between what you approve in design and what actually ships in code. What you see in Figma is what your visitors see live — pixel for pixel.",
  },
  {
    n: "03",
    title: "Built for everyday use",
    body: "Every identity is considered across the places your customers encounter it — from a small screen to signage and print. You receive practical files and guidance to keep the brand consistent.",
  },
];

const markers = [
  { value: new Date().getFullYear() - 2016, label: "Years designing · since 2016" },
  { value: 350, suffix: "+", label: "Projects completed" },
  { value: 3, label: "Core disciplines · brand, graphic & web" },
  { value: 1, label: "Designer · your direct creative partner" },
];

const skills = [
  { name: "Custom design work", detail: "Bespoke artwork and design solutions shaped around your brief" },
  { name: "Custom logo design", detail: "Original symbols and hand-drawn letterforms" },
  { name: "Brand identity", detail: "Colour, typography and consistent visual systems" },
  { name: "Mascot illustration", detail: "Expressive characters and vector artwork" },
  { name: "Graphic design", detail: "Print, packaging and digital brand applications" },
  { name: "UI/UX design", detail: "Clear, considered interfaces for web and mobile" },
  { name: "Front-end development", detail: "Responsive websites brought to life in code" },
];

const tools = ["Illustrator", "Photoshop", "InDesign", "Affinity", "Figma", "VS Code", "GitHub", "After Effects", "Canva", "Pen tool", "React", "CSS", "TypeScript", "Tailwind CSS", "Framer"];

function AnimatedStat({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1400, 1);
        setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      setDisplay(0);
      frame = requestAnimationFrame(tick);
    }, { threshold: .5 });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return (
    <div ref={root} className="min-w-0 text-center flex flex-col items-center">
      <div className="font-display font-black text-5xl sm:text-6xl md:text-7xl tracking-tighter text-accent-ink tabular-nums" aria-label={`${value}${suffix}`}>
        <span aria-hidden="true">{display}{suffix}</span>
      </div>
      <p className="font-mono text-xs uppercase tracking-wider mt-4 text-ink/70 leading-relaxed max-w-[26ch]">{label}</p>
    </div>
  );
}

const profileImages = [
  `${import.meta.env.BASE_URL}assets/johnobiko_profilepic.webp`,
  `${import.meta.env.BASE_URL}assets/profileimage_2.webp`,
  `${import.meta.env.BASE_URL}assets/profileimage_3.webp`,
  `${import.meta.env.BASE_URL}assets/profileimage_4.webp`,
];

function ProfileImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % profileImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative aspect-[4/5] bg-neutral-900 border border-ink/10 overflow-hidden group">
      {profileImages.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt={`John Obiko — brand designer and front-end developer photo ${idx + 1}`}
          sizes="(min-width: 768px) 42vw, 100vw"
          width={1200}
          height={1500}
          loading={idx === 0 ? "eager" : "lazy"}
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 ring-1 ring-inset ring-neon/20 pointer-events-none z-20" />

      {/* Slide indicators */}
      <div className="hidden">
        {profileImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to photo ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              idx === currentIndex ? "w-5 bg-neon" : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20 pointer-events-none">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/80">
          John Obiko · Nairobi, Kenya · Working worldwide
        </p>
      </div>
    </div>
  );
}

/* ── page ───────────────────────────────────────────────── */
function AboutPage() {
  return (
    <>
      <PageHero index="04" eyebrow="The designer" title="Designer" outline="Developer" />
      <LogoAnimation />

      {/* 1 — Opening hook: philosophy, not a bio dump */}
      <section className="px-5 md:px-8 pt-16 md:pt-28 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-ink mb-8">⟶ The philosophy</p>
          <h2 className="font-display font-black text-[8vw] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight max-w-[16ch]">
            Every logo I draw starts with a <span className="text-accent-ink">pencil</span>, not a font.
          </h2>
          <p className="mt-10 max-w-[52ch] text-lg sm:text-xl text-ink/70 leading-relaxed">
            For over ten years I've built brand identities and websites for clients around the world — combining
            hand-drawn craftsmanship with the technical precision of a front-end developer. No templates, no
            generators, no shortcuts. Just marks made deliberately, built to last.
          </p>
        </div>
      </section>

      {/* 2 + 7 — Who I am, with photo */}
      <section className="px-5 md:px-8 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Portrait */}
          <div className="md:col-span-5">
            <ProfileImageCarousel />
          </div>
          <div className="md:col-span-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-ink mb-6">⟶ Who I am</p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-light leading-snug">
              I'm <span className="text-accent-ink">John Obiko</span> — a graphic and web designer based in Nairobi, Kenya, working with
              clients worldwide. I specialise in flat vector logo design, mascot illustration and full brand identity
              systems — and I <span className="text-accent-ink font-display font-black">design and build</span> the websites
              that bring them to life.
            </p>
          </div>
        </div>
      </section>

      {/* 3 — What makes the work different: craft pillars */}
      <section className="px-5 md:px-8 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-ink mb-10">⟶ What makes it different</p>
          <div className="grid md:grid-cols-3 gap-px bg-ink/15 border border-ink/15">
            {pillars.map((p) => (
              <div
                key={p.n}
                className="group bg-surface p-8 md:p-10 min-h-[280px] flex flex-col transition-colors hover:bg-neon hover:text-black"
              >
                <span className="font-display text-5xl text-accent-ink group-hover:text-black transition-colors mb-6">
                  {p.n}
                </span>

                <h3 className="font-display font-bold text-xl mb-4 leading-tight">{p.title}</h3>
                <p className="text-sm text-ink/60 group-hover:text-black/80 leading-relaxed transition-colors">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Experience and skills */}
      <section className="px-5 md:px-8 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-ink mb-10">⟶ Track record</p>

          {/* stat band */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16 border-y border-ink/15 py-12">
            {markers.map((stat) => <AnimatedStat key={stat.label} {...stat} />)}
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-ink mb-8">⟶ Skills & expertise</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            {skills.map((skill) => (
              <div key={skill.name} className="border-t border-ink/20 pt-6">

                <h3 className="font-display font-bold text-2xl md:text-3xl mb-3">{skill.name}</h3>
                <p className="text-base text-ink/70 leading-relaxed">{skill.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Process teaser */}
      <section className="px-5 md:px-8 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto border-l-2 border-neon pl-8 md:pl-12">
          <p className="text-xl sm:text-2xl md:text-3xl font-light leading-snug max-w-[48ch]">
            I approach every project the same way — understanding the brief deeply, sketching multiple directions
            by hand, and refining until the result feels{" "}
            <span className="text-accent-ink font-display font-black">inevitable</span>, not arbitrary.
          </p>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 mt-8 font-mono text-xs uppercase tracking-[0.2em] text-accent-ink hover:gap-4 transition-all"
          >
            See it in the work ⟶
          </Link>
        </div>
      </section>

      {/* tools strip */}
      <section className="px-5 md:px-8 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/70 mb-8">⟶ Tools of the trade</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tools.map((t) => (
              <span
                key={t}
                className="font-display font-semibold text-xl sm:text-2xl md:text-3xl border border-ink/25 px-5 py-6 md:px-8 md:py-8 text-ink hover:border-neon hover:text-accent-ink transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Personal touch */}
      <section className="px-5 md:px-8 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-ink mb-6">⟶ On the detail</p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-light italic leading-snug max-w-[44ch] text-ink/80">
            "I care about getting the details right — for me, a good brand isn't just something that looks good,
            it's something that works hard for the business behind it."
          </p>
        </div>
      </section>

      {/* 8 — Closing CTA */}
      <section className="px-5 md:px-8 pb-28 md:pb-40">
        <div className="max-w-[1400px] mx-auto border-t border-ink/15 pt-16 text-center">
          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tight">
            Have a project<br />
            in <span className="text-accent-ink">mind?</span>
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-neon text-black font-mono text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:gap-4 transition-all"
            >
              Let's talk ⟶
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border border-ink/25 text-ink font-mono text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:border-neon hover:text-accent-ink transition-all"
            >
              See services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
