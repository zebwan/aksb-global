import { getLenis } from '../hooks/useLenis';

/** Smooth-scrolls to a section id, clearing the fixed header. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.6 });
  else window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
}

/** Smooth-scrolls back to the top of the page. */
export function scrollToTop() {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}
