import { Link } from 'react-router';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import Reveal from '../components/site/Reveal';
import { CONTACT } from '../data/site';

/** Homepage closing CTA — the full contact details live on /contact. */
export default function Contact() {
  return (
    <section className="relative w-full overflow-hidden bg-aksb-dark">
      <div className="h-24 bg-gradient-to-b from-aksb-stone to-aksb-dark" />
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.05]" />

      <div className="mx-auto max-w-[1280px] px-6 pb-24 pt-10 text-center lg:px-10 lg:pb-32">
        <Reveal>
          <p className="mb-5 text-xs font-body font-medium uppercase tracking-[0.2em] text-aksb-oxidized">
            Ready When You Are
          </p>
          <h2 className="font-display text-5xl font-medium uppercase leading-[1.08] tracking-[0.01em] text-aksb-light md:text-6xl lg:text-7xl">
            Let&apos;s Build
            <br />
            <span className="text-aksb-oxidized">Together</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base font-body leading-relaxed text-aksb-light/50">
            Quality, precision and efficiency are our commitment to customers. Tell us about your
            road, bridge or surfacing scope.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-aksb-oxidized px-8 py-4 text-xs font-body font-semibold uppercase tracking-[0.14em] text-white transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(166,75,41,0.35)]"
            >
              Contact AKSB
              <ArrowUpRight size={15} className="transition-transform duration-400 group-hover:rotate-45" />
            </Link>
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-xs font-body font-semibold uppercase tracking-[0.14em] text-aksb-light transition-all duration-400 hover:border-aksb-oxidized hover:text-aksb-oxidized"
            >
              <MessageCircle size={15} />
              WhatsApp {CONTACT.mobilePhone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
