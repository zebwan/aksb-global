import { CLIENTS, PARTNERS, STATS } from '../data/site';
import Reveal from '../components/site/Reveal';
import Marquee from '../components/site/Marquee';
import CountUp from '../components/site/CountUp';
import BlurTitle from '../components/site/BlurTitle';

export default function Partners() {
  return (
    <section id="partners" className="relative w-full scroll-mt-16 bg-aksb-stone">
      <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-32">
        {/* Header */}
        <Reveal>
          <p className="mb-4 text-xs font-body font-medium uppercase tracking-[0.2em] text-aksb-oxidized">
            Partners &amp; Clients
          </p>
        </Reveal>
        <BlurTitle
          as="h2"
          className="font-display text-4xl font-medium uppercase leading-[1.1] tracking-[0.01em] text-aksb-text md:text-5xl lg:text-6xl"
        >
          Experience That Builds Trust
        </BlurTitle>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base font-body leading-relaxed text-aksb-muted">
            AKSB adopts new technologies and techniques through strategic partnerships with
            established international organisations, and keeps earning repeat work from Malaysia&apos;s
            biggest road owners.
          </p>
        </Reveal>

        {/* Technology partners */}
        <Reveal delay={0.12}>
          <p className="mt-14 text-xs font-body font-medium uppercase tracking-[0.18em] text-aksb-oxidized">
            Technology partners
          </p>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNERS.map((partner, i) => (
            <Reveal key={partner.name} delay={0.08 * i} className="h-full">
              <div className="group flex h-full flex-col rounded-xl border border-aksb-text/10 bg-white/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-aksb-oxidized/40 hover:shadow-[0_14px_34px_rgba(166,75,41,0.12)] md:p-7">
                <div className="flex h-11 items-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-10 w-auto max-w-[170px] object-contain object-left"
                    loading="lazy"
                  />
                </div>
                <span className="mt-4 text-[10px] font-body uppercase tracking-[0.16em] text-aksb-muted">
                  {partner.location}
                </span>
                <p className="mt-3 text-sm font-body font-medium text-aksb-text/80">
                  {partner.field}
                </p>
                <p className="mt-2 flex-1 text-sm font-body leading-relaxed text-aksb-muted">
                  {partner.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Client logo wall */}
        <Reveal delay={0.1}>
          <p className="mt-16 text-xs font-body font-medium uppercase tracking-[0.18em] text-aksb-oxidized">
            Our clients
          </p>
          <p className="mt-2 max-w-xl font-display text-2xl font-medium uppercase leading-[1.15] text-aksb-text md:text-3xl">
            Highway concessionaires, agencies &amp; municipalities
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-aksb-text/10 bg-aksb-text/10 sm:grid-cols-3">
          {CLIENTS.map((client, i) => (
            <Reveal key={client.name} delay={0.04 * i} className="h-full">
              <div className="group flex h-full min-h-[7.5rem] items-center justify-center bg-aksb-stone px-6 py-7 transition-colors duration-400 hover:bg-white/70">
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.name}
                    className={`w-auto max-w-full object-contain opacity-85 transition-opacity duration-400 group-hover:opacity-100 ${
                      'tall' in client ? 'max-h-24' : 'max-h-14'
                    }`}
                    loading="lazy"
                  />
                ) : (
                  <span className="text-center font-display text-lg font-medium uppercase leading-tight tracking-wide text-aksb-text/70 transition-colors duration-400 group-hover:text-aksb-text">
                    {client.name}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Achievements */}
        <Reveal delay={0.15}>
          <div className="mt-16 border-t border-aksb-text/10 pt-12">
            <p className="mb-8 text-xs font-body font-medium uppercase tracking-[0.18em] text-aksb-oxidized">
              Our achievement to date
            </p>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <p className="font-display text-3xl font-medium text-aksb-oxidized md:text-4xl">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-xs font-body uppercase tracking-[0.12em] text-aksb-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Client marquee — full bleed */}
      <Reveal>
        <div className="border-t border-aksb-text/10 py-8">
          <Marquee duration={44}>
            {CLIENTS.map((client) => (
              <span key={client.name} className="flex items-center">
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.name}
                    className={`w-auto flex-none object-contain ${
                      'tall' in client ? 'h-14 md:h-16' : 'h-9 max-w-[170px] md:h-11'
                    }`}
                    loading="lazy"
                  />
                ) : (
                  <span className="whitespace-nowrap font-display text-xl font-medium uppercase tracking-wide text-aksb-text/50 md:text-2xl">
                    {client.name}
                  </span>
                )}
                <span className="mx-8 h-1.5 w-1.5 flex-none rounded-full bg-aksb-oxidized/60 md:mx-10" />
              </span>
            ))}
          </Marquee>
        </div>
      </Reveal>
    </section>
  );
}
