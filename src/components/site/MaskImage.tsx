import { useEffect, useRef, useState } from 'react';

interface MaskImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  direction?: 'left' | 'right' | 'up';
  delay?: number;
}

/**
 * Image that wipes in behind a clip-path mask on first view, with a settle-down zoom.
 * The observed wrapper stays unclipped — clipping the observed element itself would
 * zero its intersection area and the reveal would never trigger.
 */
export default function MaskImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  direction = 'left',
  delay = 0,
}: MaskImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hiddenClip =
    direction === 'left'
      ? 'inset(0 100% 0 0)'
      : direction === 'right'
      ? 'inset(0 0 0 100%)'
      : 'inset(100% 0 0 0)';

  return (
    <div ref={ref} className={className}>
      <div
        className="h-full w-full overflow-hidden rounded-[inherit]"
        style={{
          clipPath: shown ? 'inset(0 0 0 0)' : hiddenClip,
          transition: `clip-path 1.1s cubic-bezier(0.65, 0, 0.35, 1) ${delay}s`,
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`h-full w-full object-cover ${imgClassName}`}
          style={{
            transform: shown ? 'scale(1)' : 'scale(1.15)',
            transition: `transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
          }}
        />
      </div>
    </div>
  );
}
