import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/site/PageHero';
import Reveal from '../components/site/Reveal';
import { CONTACT, PROJECTS } from '../data/site';

const STICKY_TOP = 96;

/**
 * Stacking-card list: every card is sticky, the incoming card slides over the
 * previous one while the covered card eases back and dims.
 */
function ProjectStack() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [covered, setCovered] = useState<number[]>(() => PROJECTS.map(() => 0));

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        const next = PROJECTS.map((_, i) => {
          const nextCard = cardRefs.current[i + 1];
          if (!nextCard) return 0;
          const rect = nextCard.getBoundingClientRect();
          // 0 → next card below the fold, 1 → next card fully arrived
          return Math.max(0, Math.min(1, (vh - rect.top) / (vh - STICKY_TOP)));
        });
        setCovered(next);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-10">
      {PROJECTS.map((project, i) => {
        const c = covered[i];
        const dark = i % 2 === 0;
        return (
          <div
            key={`${project.year}-${project.title}`}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="sticky mb-10"
            style={{ top: STICKY_TOP, zIndex: i + 1 }}
          >
            <article
              className={`group overflow-hidden rounded-2xl border shadow-[0_20px_60px_rgba(13,13,13,0.18)] ${
                dark
                  ? 'border-white/10 bg-aksb-dark text-aksb-light'
                  : 'border-aksb-text/10 bg-white text-aksb-text'
              }`}
              style={{
                transform: `scale(${1 - c * 0.05}) translateY(${-c * 14}px)`,
                filter: `brightness(${1 - c * 0.25})`,
                transition: 'transform 0.08s linear, filter 0.08s linear',
                willChange: 'transform, filter',
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr]">
                <div className="relative h-[240px] overflow-hidden sm:h-[300px] md:h-[440px]">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-aksb-dark/15" />
                  <div className="absolute left-4 top-4 rounded-full bg-aksb-dark/70 px-3 py-1 backdrop-blur-sm">
                    <span className="text-[10px] font-body font-semibold uppercase tracking-[0.14em] text-aksb-light">
                      {project.scope}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-6 md:p-9">
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-display text-4xl font-medium text-aksb-oxidized md:text-5xl">
                        {project.year}
                      </span>
                      <span
                        className={`text-right text-[10px] font-body uppercase tracking-[0.15em] ${
                          dark ? 'text-aksb-light/40' : 'text-aksb-muted'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-medium uppercase leading-[1.12] tracking-[0.01em] md:text-3xl">
                      {project.title}
                    </h3>
                    <p
                      className={`mt-4 text-sm font-body leading-relaxed md:text-base ${
                        dark ? 'text-aksb-light/60' : 'text-aksb-muted'
                      }`}
                    >
                      {project.desc}
                    </p>
                  </div>
                  <div
                    className={`mt-6 border-t pt-4 ${
                      dark ? 'border-white/10' : 'border-aksb-text/10'
                    }`}
                  >
                    <p className="text-[10px] font-body uppercase tracking-[0.15em] text-aksb-oxidized">
                      Client
                    </p>
                    <p
                      className={`mt-1 text-sm font-body font-medium ${
                        dark ? 'text-aksb-light/90' : 'text-aksb-text'
                      }`}
                    >
                      {project.client}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        label={`Selected Works 2024 – 2026`}
        title={
          <>
            Major
            <br />
            <span className="text-aksb-oxidized">Projects</span>
          </>
        }
        lede="Bridge joint replacements, expansion joint works and road maintenance scopes delivered for Malaysia's highway concessionaires and public authorities. Scroll — the cards stack as you go."
      />

      <section className="relative w-full bg-aksb-stone pb-24 pt-16 lg:pb-32">
        <ProjectStack />

        <Reveal className="mt-20 px-6 text-center">
          <p className="text-sm font-body text-aksb-muted">
            Every listed scope is drawn from the {CONTACT.company} company profile.
          </p>
          <Link
            to="/contact"
            className="group mt-5 inline-flex items-center gap-2 rounded-full bg-aksb-dark px-8 py-4 text-xs font-body font-semibold uppercase tracking-[0.14em] text-aksb-light transition-all duration-400 hover:-translate-y-0.5 hover:bg-aksb-oxidized"
          >
            Discuss a similar scope
            <ArrowUpRight size={15} className="transition-transform duration-400 group-hover:rotate-45" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
