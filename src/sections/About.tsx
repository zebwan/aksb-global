import { useEffect, useRef, useState } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId: number;
    let currentProgress = 0;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const windowH = window.innerHeight;
        const raw = (windowH - rect.top) / (windowH + rect.height);
        currentProgress = Math.max(0, Math.min(1, raw));
        setProgress(currentProgress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Fade in early, stay fully readable for most of the section, ease out late.
  const textOpacity = Math.max(
    0,
    Math.min(1, (progress - 0.16) * 6, (0.92 - progress) * 8)
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Dawn sky - pure CSS, GPU-accelerated */}
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          background: `linear-gradient(to bottom, 
            rgb(${1 + 10 * progress}, ${1 + 5 * progress}, ${2 + 8 * progress}) 0%, 
            rgb(${5 + 75 * progress}, ${5 + 30 * progress}, ${7 + 8 * progress}) 40%,
            rgb(${8 + 40 * progress}, ${4 + 20 * progress}, ${5 + 10 * progress}) 70%,
            rgb(${3 + 15 * progress}, ${2 + 8 * progress}, ${3 + 5 * progress}) 100%)`,
        }}
      />

      {/* Sun */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: `${80 + progress * 40}px`,
          height: `${80 + progress * 40}px`,
          left: '50%',
          top: `${45 - progress * 35}%`,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, 
            rgba(255, ${200 + 55 * (1 - progress)}, ${150 - 50 * progress}, ${0.9 * progress}) 0%, 
            rgba(255, ${150 + 50 * progress}, ${100 - 50 * progress}, ${0.5 * progress}) 40%, 
            transparent 70%)`,
          opacity: progress,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Fog layer */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '45%',
          background: `linear-gradient(to top, 
            rgba(210, 190, 165, ${0.75 * progress}) 0%,
            rgba(180, 160, 140, ${0.4 * progress}) 40%,
            transparent 100%)`,
          transition: 'all 0.5s ease',
        }}
      />

      {/* Noise texture overlay - subtle */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
        style={{
          opacity: textOpacity,
          transform: `translateY(${(1 - textOpacity) * 30}px)`,
          transition: 'opacity 0.2s ease-out',
        }}
      >
        <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-aksb-oxidized mb-6">
          About Us
        </p>
        <h2
          className="font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-[0.01em] text-aksb-light"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
        >
          We specialize in the critical details of national infrastructure
        </h2>
        <p
          className="mt-6 text-base md:text-lg font-body text-aksb-light/70 leading-relaxed max-w-2xl mx-auto"
          style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}
        >
          Established in 2018, AKSB Global has rapidly become a preferred contractor
          for leading highway concessionaires across Malaysia. Through smart partnerships
          with international organizations, we deliver quality workmanship that stands the test of time.
        </p>
      </div>
    </section>
  );
}
