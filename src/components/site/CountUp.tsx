import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  value: number;
  /** 'year' renders without thousands grouping (2018, not 2,018) */
  format?: 'number' | 'year';
  suffix?: string;
  className?: string;
  duration?: number;
}

/** Number that counts up the first time it scrolls into view. */
export default function CountUp({
  value,
  format = 'number',
  suffix = '',
  className,
  duration = 1100,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.unobserve(el);

        const from = format === 'year' ? Math.max(0, value - 60) : 0;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(from + (value - from) * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, format, duration]);

  const text = format === 'year' ? String(display) : display.toLocaleString('en-MY');

  return (
    <span ref={ref} className={className}>
      {text}
      {suffix}
    </span>
  );
}
