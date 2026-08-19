import { useEffect, useRef, useState, type ReactNode } from 'react';

interface BlurTitleProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  maxBlur?: number;
  maxSpacing?: number;
}

/**
 * Scroll-linked blur/letter-spacing reveal that resolves fully while the
 * title is still entering the viewport, then latches sharp — it never sits
 * half-blurred while the section is being read.
 */
export default function BlurTitle({
  children,
  className,
  as: Tag = 'h3',
  maxBlur = 14,
  maxSpacing = 10,
}: BlurTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [progress, setProgress] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    const update = () => {
      if (done.current) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts as the title crosses 98% of the viewport, fully sharp by 43% —
      // a long, gradual resolve so the text drifts into focus as you scroll.
      const p = Math.max(0, Math.min(1, (vh * 0.98 - rect.top) / (vh * 0.55)));
      setProgress(p);
      if (p >= 1) {
        done.current = true;
        window.removeEventListener('scroll', onScroll);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Smoothstep — eases in and out, so the title neither snaps sharp early
  // nor lands abruptly at the end.
  const ease = progress * progress * (3 - 2 * progress);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        filter: ease >= 0.99 ? 'none' : `blur(${maxBlur * (1 - ease)}px)`,
        letterSpacing: `${maxSpacing * (1 - ease)}px`,
        opacity: 0.25 + ease * 0.75,
        transition:
          'filter 0.45s ease-out, letter-spacing 0.45s ease-out, opacity 0.45s ease-out',
        willChange: 'filter, letter-spacing',
      }}
    >
      {children}
    </Tag>
  );
}
