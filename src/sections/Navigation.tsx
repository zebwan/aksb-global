import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Projects', to: '/projects' },
  { label: 'Expertise', to: '/expertise' },
  { label: 'Partners', to: '/partners' },
  { label: 'Contact', to: '/contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close the overlay whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

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
          <Link
            to="/"
            className="group relative z-50 flex items-center gap-2.5 font-display text-lg font-semibold uppercase tracking-[0.08em] text-aksb-light lg:text-xl"
          >
            <span className="block h-2 w-2 rounded-full bg-aksb-oxidized transition-transform duration-500 group-hover:scale-125" />
            AKSB Global
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `group relative text-xs font-body font-medium uppercase tracking-[0.12em] transition-colors duration-300 ${
                    isActive ? 'text-aksb-light' : 'text-aksb-light/70 hover:text-aksb-light'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-aksb-oxidized transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
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
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-display text-3xl font-medium uppercase tracking-[0.06em] transition-colors duration-300 ${
                  isActive ? 'text-aksb-oxidized' : 'text-aksb-light/80 hover:text-aksb-oxidized'
                }`
              }
              style={{
                transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: mobileOpen ? 1 : 0,
                transition: `transform 0.4s ease ${i * 0.08}s, opacity 0.4s ease ${i * 0.08}s, color 0.3s ease`,
              }}
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href="https://wa.me/60193665892"
            target="_blank"
            rel="noreferrer"
            className="mt-4 rounded-full border border-aksb-oxidized/50 px-6 py-2.5 text-xs font-body font-medium uppercase tracking-[0.14em] text-aksb-oxidized"
            style={{
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: mobileOpen ? 1 : 0,
              transition: `transform 0.4s ease 0.32s, opacity 0.4s ease 0.32s`,
            }}
          >
            WhatsApp Us
          </a>
        </nav>
      </div>
    </>
  );
}
