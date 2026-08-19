import { SERVICES } from '../data/site';
import Reveal from '../components/site/Reveal';
import BlurTitle from '../components/site/BlurTitle';
import MaskImage from '../components/site/MaskImage';
import { scrollToSection } from '../lib/scrollToSection';

function ScopeBlock({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const flipped = index % 2 === 1;
  const gallery = 'gallery' in service ? (service.gallery as readonly string[]) : [];
  const image = 'image' in service ? (service.image as string) : null;

  return (
    <div id={service.slug} className="scroll-mt-24 border-t border-aksb-text/10 py-16 lg:py-24">
      <div className={`grid grid-cols-1 gap-10 lg:gap-16 ${image ? 'lg:grid-cols-[1fr_1.1fr]' : ''}`}>
        {/* Text */}
        <div className={image && flipped ? 'lg:order-2' : ''}>
          <Reveal>
            <p className="mb-3 text-xs font-body font-medium uppercase tracking-[0.15em] text-aksb-oxidized">
              0{index + 1} / {service.short}
            </p>
          </Reveal>
          <BlurTitle
            as="h3"
            className="font-display text-4xl font-medium uppercase leading-[1.08] tracking-[0.02em] text-aksb-text md:text-5xl"
          >
            {service.title}
          </BlurTitle>
          <Reveal delay={0.08}>
            {/* with no photo the body and the scope list sit side by side instead */}
            <div className={image ? '' : 'grid gap-x-16 lg:grid-cols-2'}>
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
            </div>
          </Reveal>
        </div>

        {/* Images — big mask-reveal plus smaller real-site photos */}
        <div className={image ? (flipped ? 'lg:order-1' : '') : 'hidden'}>
          {image && (
            <MaskImage
              src={image}
              alt={service.title}
              direction={flipped ? 'right' : 'left'}
              className="h-[260px] rounded-xl sm:h-[340px] lg:h-[400px]"
            />
          )}
          {gallery.length > 0 && (
            <div className={`mt-4 grid gap-4 ${gallery.length > 1 ? 'grid-cols-2' : 'grid-cols-[1.4fr_1fr]'}`}>
              {gallery.map((src, gi) => (
                <MaskImage
                  key={src}
                  src={src}
                  alt={`${service.title} — site photo`}
                  direction="up"
                  delay={0.15 + gi * 0.12}
                  className="h-[150px] rounded-lg sm:h-[190px]"
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

export default function Expertise() {
  return (
    <section id="expertise" className="relative w-full scroll-mt-16 bg-aksb-light">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <Reveal className="pt-24 lg:pt-32">
          <p className="mb-4 text-xs font-body font-medium uppercase tracking-[0.2em] text-aksb-oxidized">
            Core Business
          </p>
          <h2 className="font-display text-4xl font-medium uppercase leading-[1.1] tracking-[0.01em] text-aksb-text md:text-5xl lg:text-6xl">
            Five Scopes, Done Properly
          </h2>
          <p className="mt-4 max-w-xl text-base font-body leading-relaxed text-aksb-muted">
            Comprehensive road maintenance and infrastructure solutions for highways and federal /
            state roads. Five scopes, sharpened project after project since 2018.
          </p>
        </Reveal>

        {/* quick anchor nav — plain text, reads like a table of contents */}
        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-aksb-text/10 pt-6">
            <span className="text-xs font-body text-aksb-muted/70">On this page</span>
            {SERVICES.map((s) => (
              <button
                key={s.slug}
                onClick={() => scrollToSection(s.slug)}
                className="group relative text-sm font-body font-medium text-aksb-text/75 transition-colors duration-300 hover:text-aksb-text"
              >
                {s.title}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-aksb-oxidized transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>
        </Reveal>

        <div className="pb-20 lg:pb-28">
          {SERVICES.map((service, i) => (
            <ScopeBlock key={service.slug} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
