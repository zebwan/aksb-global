import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/site/PageHero';
import Reveal from '../components/site/Reveal';
import Marquee from '../components/site/Marquee';
import CountUp from '../components/site/CountUp';
import MaskImage from '../components/site/MaskImage';
import { CLIENTS, PARTNERS, STATS } from '../data/site';

export default function PartnersPage() {
  return (
    <>
      <PageHero
        label="Partners & Clients"
        title={
          <>
            Experience That
            <br />
            <span className="text-aksb-oxidized">Builds Trust</span>
          </>
        }
        lede="AKSB adopts new technologies and techniques through strategic partnerships with established international organisations — and keeps earning repeat work from Malaysia's biggest road owners."
      />

      {/* Technology partners */}
      <section className="w-full bg-aksb-light">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <p className="mb-3 text-xs font-body font-medium uppercase tracking-[0.18em] text-aksb-oxidized">
              Technology Partners
            </p>
            <h2 className="font-display text-3xl font-medium uppercase text-aksb-text md:text-4xl">
              Techniques we bring home
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {PARTNERS.map((partner, i) => (
              <Reveal key={partner.name} delay={0.08 * i} className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-aksb-text/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_44px_rgba(166,75,41,0.14)] md:p-8">
                  <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-aksb-oxidized transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  <span className="font-display text-2xl font-medium uppercase tracking-wide text-aksb-text">
                    {partner.name}
                  </span>
                  <span className="mt-1 text-[10px] font-body uppercase tracking-[0.16em] text-aksb-muted">
                    {partner.location}
                  </span>
                  <p className="mt-4 text-sm font-body font-medium text-aksb-text/80">
                    {partner.field}
                  </p>
                  <p className="mt-2 flex-1 text-sm font-body leading-relaxed text-aksb-muted">
                    {partner.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Client wall */}
      <section className="w-full bg-aksb-stone">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <p className="mb-3 text-xs font-body font-medium uppercase tracking-[0.18em] text-aksb-oxidized">
              Our Clients
            </p>
            <h2 className="max-w-xl font-display text-3xl font-medium uppercase leading-[1.12] text-aksb-text md:text-4xl">
              Highway concessionaires, agencies &amp; municipalities
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-aksb-text/10 bg-aksb-text/10 sm:grid-cols-2 lg:grid-cols-3">
            {CLIENTS.map((client, i) => (
              <Reveal key={client} delay={0.04 * i} className="h-full">
                <div className="group flex h-full items-center justify-between gap-3 bg-aksb-stone px-6 py-5 transition-colors duration-400 hover:bg-white/70">
                  <span className="text-sm font-body font-medium text-aksb-text/80 transition-colors duration-400 group-hover:text-aksb-text">
                    {client}
                  </span>
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-aksb-oxidized/40 transition-all duration-400 group-hover:scale-150 group-hover:bg-aksb-oxidized" />
                </div>
              </Reveal>
            ))}
          </div>

          {/* Stats */}
          <Reveal delay={0.1}>
            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-aksb-text/10 pt-12 md:grid-cols-4">
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

        {/* marquee */}
        <div className="border-t border-aksb-text/10 py-8">
          <Marquee duration={44}>
            {CLIENTS.map((client) => (
              <span key={client} className="flex items-center">
                <span className="whitespace-nowrap font-display text-xl font-medium uppercase tracking-wide text-aksb-text/40 md:text-2xl">
                  {client}
                </span>
                <span className="mx-6 h-1.5 w-1.5 flex-none rounded-full bg-aksb-oxidized/60 md:mx-8" />
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Closing image + CTA */}
      <section className="relative w-full overflow-hidden bg-aksb-dark">
        <MaskImage
          src="/images/hero1.jpg"
          alt="AKSB highway works at dusk"
          direction="up"
          className="h-[320px] w-full md:h-[420px]"
          imgClassName="opacity-60"
        />
        <div className="pointer-events-none absolute inset-0 bg-aksb-dark/45" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-medium uppercase leading-[1.1] text-aksb-light md:text-5xl">
              Delivering quality projects with
              <br />
              <span className="text-aksb-oxidized">safety, precision &amp; on-time delivery</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-aksb-oxidized px-8 py-4 text-xs font-body font-semibold uppercase tracking-[0.14em] text-white transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(166,75,41,0.4)]"
            >
              Work with AKSB
              <ArrowUpRight size={15} className="transition-transform duration-400 group-hover:rotate-45" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
