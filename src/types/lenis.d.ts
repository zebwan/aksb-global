declare module 'lenis' {
  interface LenisOptions {
    duration?: number;
    easing?: (t: number) => number;
    orientation?: string;
    gestureOrientation?: string;
    smoothWheel?: boolean;
    touchMultiplier?: number;
    wheelMultiplier?: number;
  }

  export default class Lenis {
    constructor(options?: LenisOptions);
    raf(time: number): void;
    scrollTo(target: string | number | HTMLElement, options?: Record<string, unknown>): void;
    on(event: string, callback: (...args: unknown[]) => void): void;
    destroy(): void;
  }
}
