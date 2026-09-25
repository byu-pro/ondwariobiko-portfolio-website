import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="px-5 md:px-8 pt-32 pb-10 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 mb-6">Have a vision?</p>
        <Link to="/contact" className="group block font-display uppercase tracking-tighter leading-[0.85] text-[clamp(3rem,11vw,10rem)]">
          <span className="block transition-colors group-hover:text-neon">Let's build</span>
          <span className="block text-stroke group-hover:text-neon transition-colors">something ✺</span>
        </Link>
        <div className="mt-24 flex flex-col md:flex-row justify-between gap-6 font-mono text-xs uppercase tracking-widest text-white/50">
          <span>© 2026 ondwariobiko — Remote Worldwide</span>
          <div className="flex gap-8">
            <a href="mailto:hello@ondwariobiko.com" className="hover:text-neon transition-colors">Email</a>
            <a href="https://wa.me/254702255575" className="hover:text-neon transition-colors">WhatsApp</a>
            {["Instagram", "LinkedIn"].map((s) => (
              <a key={s} href="#" className="hover:text-neon transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ index, eyebrow, title, outline }: { index: string; eyebrow: string; title: string; outline: string }) {
  return (
    <section className="pt-44 pb-16 px-5 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between font-mono text-xs uppercase tracking-[0.25em] text-white/50 mb-8">
          <span><span className="text-neon">{index}</span> / {eyebrow}</span>
          <span>ondwariobiko®</span>
        </div>
        <h1 className="font-display uppercase tracking-tighter leading-[0.85] text-[clamp(3.5rem,13vw,12rem)]">
          {title}
          <br />
          <span className="text-stroke">{outline}</span>
          <span className="text-neon">.</span>
        </h1>
      </div>
    </section>
  );
}
