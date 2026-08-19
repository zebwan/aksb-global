import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CONTACT } from '../data/site';
import { scrollToSection, scrollToTop } from '../lib/scrollToSection';

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Expertise', id: 'expertise' },
  { label: 'Projects', id: 'projects' },
  { label: 'Partners', id: 'partners' },
  { label: 'Contact', id: 'contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // highlight whichever section currently owns the upper third of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-15% 0px -70% 0px' }
    );
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const go = (id: string) => {
    setMobileOpen(false);
    // let the overlay close before the scroll starts
    requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled && !mobileOpen
            ? 'border-b border-white/5 bg-aksb-dark/80 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 lg:h-20 lg:px-10">
          <button
            onClick={scrollToTop}
            className="group relative z-50 flex items-center"
            aria-label="AKSB Global — back to top"
          >
            <img
              src="./images/logo-aksb-light.png"
              alt="AKSB Global"
              className="h-8 w-auto transition-transform duration-500 group-hover:scale-[1.04] lg:h-9"
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className={`group relative text-xs font-body font-medium uppercase tracking-[0.12em] transition-colors duration-300 ${
                  active === link.id ? 'text-aksb-light' : 'text-aksb-light/70 hover:text-aksb-light'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-aksb-oxidized transition-all duration-300 ${
                    active === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="relative z-50 p-2 text-aksb-light md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-aksb-dark/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.id}
              onClick={() => go(link.id)}
              className="font-display text-3xl font-medium uppercase tracking-[0.06em] text-aksb-light/80 transition-colors duration-300 hover:text-aksb-oxidized"
              style={{
                transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: mobileOpen ? 1 : 0,
                transition: `transform 0.4s ease ${i * 0.08}s, opacity 0.4s ease ${i * 0.08}s, color 0.3s ease`,
              }}
            >
              {link.label}
            </button>
          ))}
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 rounded-full border border-aksb-oxidized/50 px-6 py-2.5 text-xs font-body font-medium uppercase tracking-[0.14em] text-aksb-oxidized"
            style={{
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: mobileOpen ? 1 : 0,
              transition: `transform 0.4s ease 0.4s, opacity 0.4s ease 0.4s`,
            }}
          >
            WhatsApp Us
          </a>
        </nav>
      </div>
    </>
  );
}
