import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { CLIENTS, PARTNERS, STATS } from '../data/site';
import Reveal from '../components/site/Reveal';
import Marquee from '../components/site/Marquee';
import CountUp from '../components/site/CountUp';

export default function Partners() {
  return (
    <section id="partners" className="relative w-full bg-aksb-stone">
      <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-32">
        {/* Header */}
        <Reveal>
          <p className="mb-4 text-xs font-body font-medium uppercase tracking-[0.2em] text-aksb-oxidized">
            Our Network
          </p>
          <h2 className="font-display text-4xl font-medium uppercase leading-[1.1] tracking-[0.01em] text-aksb-text md:text-5xl lg:text-6xl">
            Trusted On The Road
          </h2>
          <p className="mt-4 max-w-xl text-base font-body leading-relaxed text-aksb-muted">
            Contracts secured with leading highway concessionaires and local municipalities, backed
            by international technology partners in Australia and the UK.
          </p>
        </Reveal>

        {/* Technology partners */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-16">
          {PARTNERS.map((partner, i) => (
            <Reveal key={partner.name} delay={0.1 + i * 0.08}>
              <Link
                to="/partners"
                className="group flex h-full flex-col justify-between rounded-lg border border-aksb-text/10 bg-white/50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-aksb-oxidized/40 hover:shadow-[0_12px_30px_rgba(166,75,41,0.12)] md:p-8"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display text-lg font-medium uppercase tracking-wider text-aksb-text md:text-xl">
                      {partner.name}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="flex-none text-aksb-text/30 transition-all duration-500 group-hover:rotate-45 group-hover:text-aksb-oxidized"
                    />
                  </div>
                  <p className="mt-2 text-sm font-body leading-relaxed text-aksb-muted">
                    {partner.field}
                  </p>
                </div>
                <span className="mt-5 text-[10px] font-body uppercase tracking-[0.15em] text-aksb-muted">
                  {partner.location}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Stats */}
        <Reveal delay={0.15}>
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-aksb-text/10 pt-12 md:grid-cols-4 lg:mt-20">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="font-display text-3xl font-medium text-aksb-oxidized md:text-4xl">
                  <CountUp
                    value={stat.value}
                    format={'format' in stat ? (stat.format as 'year') : 'number'}
                    suffix={'suffix' in stat ? (stat.suffix as string) : ''}
                  />
                </p>
                <p className="mt-1 text-xs font-body uppercase tracking-[0.12em] text-aksb-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Client marquee — full bleed */}
      <Reveal>
        <div className="border-t border-aksb-text/10 py-8">
          <Marquee duration={44}>
            {CLIENTS.map((client) => (
              <span key={client} className="flex items-center">
                <span className="whitespace-nowrap font-display text-xl font-medium uppercase tracking-wide text-aksb-text/50 transition-colors duration-300 hover:text-aksb-text md:text-2xl">
                  {client}
                </span>
                <span className="mx-6 h-1.5 w-1.5 flex-none rounded-full bg-aksb-oxidized/60 md:mx-8" />
              </span>
            ))}
          </Marquee>
          <div className="mt-6 flex justify-center">
            <Link
              to="/partners"
              className="group inline-flex items-center gap-2 text-xs font-body font-semibold uppercase tracking-[0.14em] text-aksb-text/70 transition-colors duration-300 hover:text-aksb-oxidized"
            >
              Meet our partners &amp; clients
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
