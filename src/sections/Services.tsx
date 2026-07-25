import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../data/site';
import Reveal from '../components/site/Reveal';
import BlurTitle from '../components/site/BlurTitle';
import MaskImage from '../components/site/MaskImage';

function ServiceItem({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const flipped = index % 2 === 1;

  return (
    <div className="grid grid-cols-1 items-center gap-8 py-14 lg:grid-cols-2 lg:gap-16 lg:py-24">
      {/* Text side */}
      <Reveal className={flipped ? 'lg:order-2' : ''} y={24}>
        <p className="mb-3 text-xs font-body font-medium uppercase tracking-[0.15em] text-aksb-oxidized">
          0{index + 1} / {service.short}
        </p>
        <BlurTitle className="font-display text-4xl font-medium uppercase leading-[1.1] tracking-[0.02em] text-aksb-text md:text-5xl lg:text-6xl">
          {service.title}
        </BlurTitle>
        <p className="mt-5 max-w-md text-base font-body leading-relaxed text-aksb-muted">
          {service.description}
        </p>
        <ul className="mt-6 flex max-w-md flex-wrap gap-2">
          {service.details.map((detail) => (
            <li
              key={detail}
              className="rounded-full border border-aksb-dark/10 bg-aksb-dark/5 px-3 py-1.5 text-xs font-body font-medium uppercase tracking-wider text-aksb-text/70 transition-colors duration-300 hover:border-aksb-oxidized/40 hover:bg-aksb-oxidized/10"
            >
              {detail}
            </li>
          ))}
        </ul>
        <Link
          to="/expertise"
          state={{ anchor: service.slug }}
          className="group mt-7 inline-flex items-center gap-2 text-xs font-body font-semibold uppercase tracking-[0.14em] text-aksb-text transition-colors duration-300 hover:text-aksb-oxidized"
        >
          Explore {service.title}
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:rotate-45"
          />
        </Link>
      </Reveal>

      {/* Image side */}
      <Link
        to="/expertise"
        state={{ anchor: service.slug }}
        className={`group relative block ${flipped ? 'lg:order-1' : ''}`}
        aria-label={`Explore ${service.title}`}
      >
        <MaskImage
          src={service.image}
          alt={service.title}
          direction={flipped ? 'right' : 'left'}
          className="h-[260px] rounded-xl md:h-[400px]"
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-aksb-dark/10 transition-colors duration-500 group-hover:bg-aksb-dark/0" />
      </Link>
    </div>
  );
}

export default function Services() {
  return (
    <section id="expertise" className="relative w-full bg-aksb-light">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <Reveal className="pb-4 pt-24 lg:pt-32">
          <p className="mb-4 text-xs font-body font-medium uppercase tracking-[0.2em] text-aksb-oxidized">
            What We Do
          </p>
          <h2 className="font-display text-4xl font-medium uppercase leading-[1.1] tracking-[0.01em] text-aksb-text md:text-5xl lg:text-6xl">
            Core Expertise
          </h2>
          <p className="mt-4 max-w-xl text-base font-body leading-relaxed text-aksb-muted">
            As a road maintenance contractor, we are equipped to deliver numerous scopes of road
            maintenance work for both highway and federal / state roads.
          </p>
        </Reveal>

        <div className="pb-20 lg:pb-28">
          {SERVICES.map((service, i) => (
            <ServiceItem key={service.slug} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
