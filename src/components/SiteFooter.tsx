import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="px-5 md:px-8 pt-20 md:pt-32 pb-10 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 mb-6">Have a vision?</p>
        <Link to="/consultation" className="group block font-display uppercase tracking-tighter leading-[0.85] text-[clamp(2.5rem,11vw,10rem)]">
          <span className="block transition-all duration-500 group-hover:text-neon group-hover:translate-x-4">Let's build</span>
          <span className="block text-stroke group-hover:text-neon transition-all duration-700 group-hover:translate-x-10">something ✺</span>
        </Link>
        <div className="mt-16 md:mt-24 flex flex-col md:flex-row justify-between gap-6 font-mono text-xs uppercase tracking-widest text-white/50">
          <span>© 2026 ondwariobiko. All Rights Reserved.</span>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <a href="mailto:hello@ondwariobiko.com" className="hover:text-neon transition-colors">Email</a>
            <a href="https://wa.me/254702255575" className="hover:text-neon transition-colors">WhatsApp</a>
            <a href="https://www.linkedin.com/in/ondwariobiko/" target="_blank" rel="noopener noreferrer" className="hover:text-neon transition-colors">LinkedIn</a>
            <a href="https://www.behance.net/johnobiko" target="_blank" rel="noopener noreferrer" className="hover:text-neon transition-colors">Behance</a>
            <Link to="/faq" className="hover:text-neon transition-colors">FAQ</Link>
            <Link to="/testimonials" className="hover:text-neon transition-colors">Reviews</Link>
            <Link to="/journal" className="hover:text-neon transition-colors">Journal</Link>
            <Link to="/terms" className="hover:text-neon transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-neon transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ index, eyebrow, title, outline }: { index: string; eyebrow: string; title: string; outline: string }) {
  return (
    <section className="pt-32 md:pt-44 pb-12 md:pb-16 px-5 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-wrap gap-3 justify-between font-mono text-xs uppercase tracking-[0.25em] text-white/50 mb-8">
          <span><span className="text-neon">{index}</span> / {eyebrow}</span>
          <span>ondwariobiko®</span>
        </div>
        <h1 className="font-display uppercase tracking-tighter leading-[0.85] text-[clamp(3.5rem,13vw,12rem)]">
          <span className="block overflow-hidden"><span className="block animate-rise">{title}</span></span>
          <span className="block overflow-hidden"><span className="block animate-rise text-stroke [animation-delay:120ms]">{outline}<span className="text-neon">.</span></span></span>
        </h1>
      </div>
    </section>
  );
}
