import { ArrowUpRight } from 'lucide-react';
import { WHY_AKSB } from '../data/site';
import Reveal from '../components/site/Reveal';
import { scrollToSection } from '../lib/scrollToSection';

export default function WhyAksb() {
  return (
    <section id="why" className="w-full scroll-mt-16 bg-aksb-dark">
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
              CIDB G4 registered contractor with Bumiputera status, based in Puncak Alam, Selangor,
              with a branch office in Yong Peng, Johor.
            </p>
            <button
              onClick={() => scrollToSection('projects')}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-xs font-body font-semibold uppercase tracking-[0.14em] text-aksb-light transition-all duration-400 hover:border-aksb-oxidized hover:bg-aksb-oxidized"
            >
              See the work
              <ArrowUpRight size={14} className="transition-transform duration-400 group-hover:rotate-45" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
