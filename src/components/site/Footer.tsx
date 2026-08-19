import { CONTACT } from '../../data/site';
import { scrollToSection, scrollToTop } from '../../lib/scrollToSection';

const FOOTER_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Expertise', id: 'expertise' },
  { label: 'Projects', id: 'projects' },
  { label: 'Partners', id: 'partners' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Contact', id: 'contact' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-aksb-dark">
      <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-16 lg:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <button onClick={scrollToTop} className="block w-fit" aria-label="AKSB Global — back to top">
              <img src="./images/logo-aksb-light.png" alt="AKSB Global" className="h-10 w-auto" />
            </button>
            <p className="mt-4 max-w-xs text-sm font-body leading-relaxed text-aksb-light/40">
              Maintaining safer roads, delivering better infrastructure across Malaysia since 2018.
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            {FOOTER_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="w-fit text-left text-xs font-body font-medium uppercase tracking-[0.14em] text-aksb-light/60 transition-colors duration-300 hover:text-aksb-oxidized"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="max-w-xs text-sm font-body leading-relaxed text-aksb-light/40">
            <p className="text-[11px] uppercase tracking-[0.14em] text-aksb-light/30">Head office</p>
            <p className="mt-1">{CONTACT.address}</p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.14em] text-aksb-light/30">
              Johor branch
            </p>
            <p className="mt-1">{CONTACT.johorAddress}</p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-3 block w-fit text-aksb-light/70 transition-colors duration-300 hover:text-aksb-oxidized"
            >
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.officePhoneHref}
              className="mt-1 block w-fit text-aksb-light/70 transition-colors duration-300 hover:text-aksb-oxidized"
            >
              {CONTACT.officePhone}
            </a>
          </div>
        </div>

        {/* oversized wordmark */}
        <div aria-hidden="true" className="pointer-events-none mt-14 select-none overflow-hidden">
          <p className="whitespace-nowrap text-center font-display text-[18vw] font-semibold uppercase leading-[0.85] tracking-[0.02em] text-aksb-light/[0.045] lg:text-[13rem]">
            AKSB Global
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 md:flex-row">
          <p className="text-xs font-body text-aksb-light/30">
            © {new Date().getFullYear()} {CONTACT.company} ({CONTACT.regNo}). All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs font-body text-aksb-light/30">CIDB G4 Contractor</span>
            <span className="h-3 w-px bg-white/10" />
            <span className="text-xs font-body text-aksb-light/30">Bumiputera Status</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
