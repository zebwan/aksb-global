import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/site/PageHero';
import Reveal from '../components/site/Reveal';
import BlurTitle from '../components/site/BlurTitle';
import MaskImage from '../components/site/MaskImage';
import { SERVICES, WHY_AKSB } from '../data/site';

function ScopeBlock({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const flipped = index % 2 === 1;
  const gallery = 'gallery' in service ? (service.gallery as readonly string[]) : [];

  return (
    <div id={service.slug} className="scroll-mt-28 border-t border-aksb-text/10 py-16 lg:py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        {/* Text */}
        <div className={flipped ? 'lg:order-2' : ''}>
          <Reveal>
            <p className="mb-3 text-xs font-body font-medium uppercase tracking-[0.15em] text-aksb-oxidized">
              0{index + 1} / {service.short}
            </p>
          </Reveal>
          <BlurTitle
            as="h2"
            className="font-display text-4xl font-medium uppercase leading-[1.08] tracking-[0.02em] text-aksb-text md:text-5xl"
          >
            {service.title}
          </BlurTitle>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-lg text-base font-body leading-relaxed text-aksb-muted">
              {service.body}
            </p>
            <ul className="mt-7 max-w-lg divide-y divide-aksb-text/10 border-y border-aksb-text/10">
              {service.details.map((detail) => (
                <li
                  key={detail}
                  className="group flex items-center justify-between py-3 transition-colors duration-300 hover:bg-aksb-dark/[0.03]"
                >
                  <span className="text-sm font-body font-medium text-aksb-text/80">{detail}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-aksb-oxidized/50 transition-all duration-300 group-hover:scale-150 group-hover:bg-aksb-oxidized" />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Images — big mask-reveal plus smaller real-site photos */}
        <div className={flipped ? 'lg:order-1' : ''}>
          <MaskImage
            src={service.image}
            alt={service.title}
            direction={flipped ? 'right' : 'left'}
            className="h-[260px] rounded-xl sm:h-[340px] lg:h-[400px]"
          />
          {gallery.length > 0 && (
            <div className={`mt-4 grid gap-4 ${gallery.length > 1 ? 'grid-cols-2' : 'grid-cols-[1.4fr_1fr]'}`}>
              {gallery.map((src, gi) => (
                <MaskImage
                  key={src}
                  src={src}
                  alt={`${service.title} — site photo`}
                  direction="up"
                  delay={0.15 + gi * 0.12}
                  className={`rounded-lg ${gi === 0 ? 'h-[150px] sm:h-[190px]' : 'h-[150px] sm:h-[190px]'}`}
                />
              ))}
              {gallery.length === 1 && (
                <div className="flex items-center rounded-lg border border-aksb-text/10 bg-white/60 p-5">
                  <p className="text-xs font-body leading-relaxed text-aksb-muted">
                    Actual AKSB site work — photographed on a live carriageway.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExpertisePage() {
  return (
    <>
      <PageHero
        label="Core Business"
        title={
          <>
            Four Scopes,
            <br />
            <span className="text-aksb-oxidized">Done Properly</span>
          </>
        }
        lede="Comprehensive road maintenance and infrastructure solutions for highways and federal / state roads — the same four scopes since 2018, sharpened project after project."
      >
        {/* quick anchor nav — plain text, reads like a table of contents */}
        <Reveal delay={0.24}>
          <div className="mt-12 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-white/10 pt-6">
            <span className="text-xs font-body text-aksb-light/35">On this page</span>
            {SERVICES.map((s) => (
              <a
                key={s.slug}
                href="#/expertise"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(s.slug)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative text-sm font-body font-medium text-aksb-light/75 transition-colors duration-300 hover:text-aksb-light"
              >
                {s.title}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-aksb-oxidized transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </Reveal>
      </PageHero>

      {/* Scope blocks */}
      <section className="w-full bg-aksb-light">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          {SERVICES.map((service, i) => (
            <ScopeBlock key={service.slug} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* Why AKSB */}
      <section className="w-full bg-aksb-dark">
        <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <p className="mb-4 text-xs font-body font-medium uppercase tracking-[0.2em] text-aksb-oxidized">
              Why Choose AKSB
            </p>
            <h2 className="max-w-2xl font-display text-4xl font-medium uppercase leading-[1.1] text-aksb-light md:text-5xl">
              Your trusted partner in road infrastructure
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_AKSB.map((item, i) => (
              <Reveal key={item.title} delay={0.05 * i} className="h-full">
                <div className="group h-full bg-aksb-dark p-7 transition-colors duration-500 hover:bg-[#151210] md:p-8">
                  <h3 className="font-display text-xl font-medium uppercase tracking-[0.02em] text-aksb-light">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm font-body leading-relaxed text-aksb-light/50 transition-colors duration-500 group-hover:text-aksb-light/70">
                    {item.desc}
                  </p>
                  <div className="mt-5 h-px w-8 bg-aksb-oxidized/40 transition-all duration-500 group-hover:w-16 group-hover:bg-aksb-oxidized" />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-14 flex flex-col items-center gap-4 text-center">
              <p className="max-w-md text-sm font-body text-aksb-light/50">
                CIDB G4 registered contractor with Bumiputera status, based in Puncak Alam, Selangor.
              </p>
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-xs font-body font-semibold uppercase tracking-[0.14em] text-aksb-light transition-all duration-400 hover:border-aksb-oxidized hover:bg-aksb-oxidized"
              >
                See the work
                <ArrowUpRight size={14} className="transition-transform duration-400 group-hover:rotate-45" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
