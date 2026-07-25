import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/site';

const FEATURED = PROJECTS.slice(0, 4);

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [maxShift, setMaxShift] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let rafId = 0;

    const measure = () => {
      setMaxShift(Math.max(0, track.scrollWidth - window.innerWidth + 48));
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        const p = scrollable > 0 ? Math.max(0, Math.min(1, -rect.top / scrollable)) : 0;
        setProgress(p);
      });
    };

    measure();
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', measure);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-aksb-dark"
      style={{ height: '280vh' }}
    >
      <div className="sticky top-0 flex h-[100dvh] w-full flex-col overflow-hidden">
        {/* Section label */}
        <div className="z-20 flex items-end justify-between px-6 pb-4 pt-24 lg:px-10">
          <div>
            <p className="text-xs font-body uppercase tracking-[0.2em] text-aksb-oxidized">
              Featured Works
            </p>
            <h2 className="mt-1 font-display text-2xl font-medium uppercase text-aksb-light md:text-3xl">
              Infrastructure Portfolio
            </h2>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <div className="relative h-px w-32 overflow-hidden bg-aksb-light/20">
              <div
                className="absolute left-0 top-0 h-full bg-aksb-oxidized"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-xs font-body font-medium uppercase tracking-[0.14em] text-aksb-light/70 transition-colors duration-300 hover:text-aksb-oxidized"
            >
              All projects
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Horizontal scrolling project cards */}
        <div className="flex flex-1 items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 pl-6 pr-6 lg:pl-10"
            style={{
              transform: `translateX(${-progress * maxShift}px)`,
              willChange: 'transform',
            }}
          >
            {FEATURED.map((project, i) => (
              <Link
                key={`${project.year}-${i}`}
                to="/projects"
                className="group relative w-[78vw] flex-shrink-0 cursor-pointer sm:w-[420px] md:w-[380px]"
              >
                <div className="relative h-[42vh] overflow-hidden rounded-xl md:h-[50vh]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-aksb-dark/40 transition-colors duration-500 group-hover:bg-aksb-dark/20" />
                  <span
                    className="absolute right-4 top-3 font-display text-xl font-medium text-aksb-light"
                    style={{ textShadow: '0 1px 12px rgba(0,0,0,0.7)' }}
                  >
                    {project.year}
                  </span>
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-aksb-oxidized transition-all duration-500 ease-out group-hover:w-full" />
                </div>
                <div className="mt-5 px-1">
                  <p className="mb-1.5 text-[10px] font-body uppercase tracking-[0.15em] text-aksb-oxidized">
                    {project.client}
                  </p>
                  <h3 className="font-display text-xl font-medium text-aksb-light transition-colors duration-300 group-hover:text-aksb-oxidized">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm font-body leading-relaxed text-aksb-light/50">
                    {project.desc}
                  </p>
                </div>
              </Link>
            ))}

            {/* End card linking to the full list */}
            <Link
              to="/projects"
              className="group relative flex w-[60vw] flex-shrink-0 items-center justify-center sm:w-[320px]"
            >
              <div className="flex h-[42vh] w-full flex-col items-center justify-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] transition-colors duration-500 group-hover:border-aksb-oxidized/50 group-hover:bg-aksb-oxidized/10 md:h-[50vh]">
                <span className="font-display text-2xl font-medium uppercase text-aksb-light">
                  View all
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-aksb-light/20 text-aksb-light transition-all duration-500 group-hover:rotate-45 group-hover:border-aksb-oxidized group-hover:bg-aksb-oxidized">
                  <ArrowRight size={18} />
                </span>
                <span className="text-xs font-body uppercase tracking-[0.15em] text-aksb-light/40">
                  {PROJECTS.length} major projects
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom instruction */}
        <div className="z-20 flex items-center gap-3 px-6 pb-6 lg:px-10">
          <div className="h-px w-8 bg-aksb-light/20" />
          <p className="text-[10px] font-body uppercase tracking-[0.15em] text-aksb-light/40">
            Keep scrolling — the row follows you
          </p>
        </div>
      </div>
    </section>
  );
}
