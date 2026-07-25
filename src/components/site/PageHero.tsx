import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface PageHeroProps {
  label: string;
  title: ReactNode;
  lede?: string;
  children?: ReactNode;
}

/** Shared editorial header for inner pages. */
export default function PageHero({ label, title, lede, children }: PageHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-aksb-dark">
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.05]" />
      {/* faint oxidized glow, echoes the dawn section on the homepage */}
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full opacity-25"
        style={{ background: 'radial-gradient(circle, rgba(166,75,41,0.55) 0%, transparent 65%)' }}
      />
      <div className="mx-auto max-w-[1280px] px-6 pb-16 pt-32 lg:px-10 lg:pb-24 lg:pt-44">
        <Reveal>
          <p className="mb-5 text-xs font-body font-medium uppercase tracking-[0.2em] text-aksb-oxidized">
            {label}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="max-w-4xl font-display text-5xl font-medium uppercase leading-[1.04] tracking-[0.01em] text-aksb-light sm:text-6xl lg:text-7xl">
            {title}
          </h1>
        </Reveal>
        {lede && (
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-base font-body leading-relaxed text-aksb-light/60 md:text-lg">
              {lede}
            </p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
