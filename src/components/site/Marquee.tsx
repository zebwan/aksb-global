import type { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  className?: string;
}

/** Infinite horizontal marquee; content is duplicated for a seamless loop. */
export default function Marquee({ children, duration = 36, className = '' }: MarqueeProps) {
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <div
        className="flex w-max items-center gap-0 group-hover:[animation-play-state:paused]"
        style={{ animation: `marquee ${duration}s linear infinite` }}
      >
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
