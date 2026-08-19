import { CERTIFICATIONS } from '../data/site';
import Reveal from '../components/site/Reveal';
import BlurTitle from '../components/site/BlurTitle';

export default function Certifications() {
  return (
    <section id="certifications" className="w-full scroll-mt-16 bg-aksb-light">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <p className="mb-3 text-xs font-body font-medium uppercase tracking-[0.18em] text-aksb-oxidized">
            Our Certifications
          </p>
        </Reveal>
        <BlurTitle
          as="h2"
          className="max-w-xl font-display text-3xl font-medium uppercase leading-[1.12] text-aksb-text md:text-4xl"
        >
          Registered, certified &amp; audited
        </BlurTitle>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base font-body leading-relaxed text-aksb-muted">
            Our certifications reflect a commitment to quality, safety, environment and industry
            standards, upheld on every project we deliver.
          </p>
        </Reveal>

        <div className="mt-10 divide-y divide-aksb-text/10 border-y border-aksb-text/10">
          {CERTIFICATIONS.map((cert, i) => (
            <Reveal key={cert.title + cert.body} delay={0.05 * i}>
              <div className="group grid grid-cols-1 gap-2 py-5 transition-colors duration-400 hover:bg-white/60 sm:grid-cols-[minmax(0,15rem)_1fr] sm:items-baseline sm:gap-8">
                <p className="font-body text-sm font-semibold text-aksb-text">{cert.body}</p>
                <div>
                  <p className="font-body text-sm font-medium text-aksb-text/80">{cert.title}</p>
                  <p className="mt-1 font-body text-sm leading-relaxed text-aksb-muted">
                    {cert.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
