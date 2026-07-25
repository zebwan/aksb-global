import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';

const HERO_TILES = [
  {
    src: '/images/hero1.jpg',
    label: 'Highway Projects',
    caption: 'Live works for concessionaires',
    to: '/projects',
  },
  {
    src: '/images/hero2.jpg',
    label: 'Bridge Expansion Joints',
    caption: 'Supply, replace & repair',
    to: '/expertise',
    anchor: 'bridge-expansion-joint',
  },
  {
    src: '/images/hero3.jpg',
    label: 'Colour Surface Treatment',
    caption: 'CST for lanes that need reading',
    to: '/expertise',
    anchor: 'pavement',
  },
  {
    src: '/images/hero4.jpg',
    label: 'Technology Partners',
    caption: 'HFST with Omnigrip Direct',
    to: '/partners',
  },
  {
    src: '/images/hero5.jpg',
    label: 'Civil & Structure',
    caption: 'Slope protection & fencing',
    to: '/expertise',
    anchor: 'civil-structure',
  },
  {
    src: '/images/hero6.jpg',
    label: 'Road Furniture',
    caption: 'Marking, signage & studs',
    to: '/expertise',
    anchor: 'road-furniture',
  },
];

function HeroTile({
  tile,
  index,
  loaded,
  hoveredIndex,
  setHoveredIndex,
}: {
  tile: (typeof HERO_TILES)[number];
  index: number;
  loaded: boolean;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) {
  return (
    <Link
      to={tile.to}
      state={tile.anchor ? { anchor: tile.anchor } : undefined}
      aria-label={tile.label}
      className="group relative block aspect-[4/3] overflow-hidden rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-aksb-oxidized md:aspect-auto md:h-full"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      style={{
        transform:
          hoveredIndex === index
            ? 'scale(1.03)'
            : hoveredIndex !== null
            ? 'scale(0.985)'
            : 'scale(1)',
        opacity: loaded ? 1 : 0,
        transitionProperty: 'transform, opacity',
        transitionDuration: '0.5s, 0.8s',
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transitionDelay: loaded ? `0s, ${index * 0.1}s` : '0s, 0s',
      }}
    >
      <img
        src={tile.src}
        alt={tile.label}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="eager"
      />
      {/* readability overlay, lifts on hover */}
      <div className="absolute inset-0 bg-aksb-dark/40 transition-colors duration-500 group-hover:bg-aksb-dark/20" />
      {/* bottom gradient keeps the chip readable over any photo */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-aksb-dark/80 to-transparent md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100" />
      {/* gloss sweep on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 50%, rgba(0,0,0,0.25) 100%)',
        }}
      />
      {/* label chip — always visible on touch, slides up on desktop hover */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:translate-y-2 md:p-4 md:opacity-0 md:transition-all md:duration-500 md:group-hover:translate-y-0 md:group-hover:opacity-100">
        <div className="flex items-end justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-body font-semibold uppercase leading-tight tracking-[0.13em] text-aksb-light md:text-xs">
              {tile.label}
            </p>
            <p className="mt-0.5 hidden text-[11px] font-body text-aksb-light/60 md:block">
              {tile.caption}
            </p>
          </div>
          <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-aksb-oxidized/90 text-aksb-light transition-transform duration-500 group-hover:rotate-45 md:h-8 md:w-8">
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Hero() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-aksb-dark md:min-h-[100dvh] md:items-center md:justify-center">
      {/* Desktop: clickable image grid as full-bleed background */}
      <div className="absolute inset-0 hidden grid-cols-3 gap-1 p-1 md:grid">
        {HERO_TILES.map((tile, i) => (
          <HeroTile
            key={tile.src}
            tile={tile}
            index={i}
            loaded={loaded}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
      </div>

      {/* Hero text — overlays the grid on desktop, flows above it on mobile */}
      <div className="pointer-events-none relative z-10 mx-auto max-w-4xl px-6 pt-32 text-center md:pt-0">
        <p
          className="mb-4 text-xs font-body font-medium uppercase tracking-[0.2em] text-aksb-oxidized md:mb-6 md:text-sm"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 0.3s',
            textShadow: '0 1px 12px rgba(0,0,0,0.7)',
          }}
        >
          Building Malaysia&apos;s Infrastructure
        </p>

        <h1
          className="font-display text-5xl font-medium uppercase leading-[1.05] tracking-[0.02em] text-aksb-light sm:text-6xl md:text-7xl lg:text-8xl"
          style={{
            textShadow: '0 2px 20px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.3)',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
          }}
        >
          Precision
          <br />
          Engineering
        </h1>

        <h2
          className="mt-1 font-display text-4xl font-medium uppercase leading-[1.05] tracking-[0.02em] text-aksb-light/50 sm:text-5xl md:mt-2 md:text-6xl lg:text-7xl"
          style={{
            textShadow: '0 2px 15px rgba(0,0,0,0.5)',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
          }}
        >
          Lasting Impact
        </h2>

        <p
          className="mx-auto mt-5 max-w-lg text-sm font-body leading-relaxed text-aksb-light/60 md:mt-8 md:text-base"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 0.9s',
            textShadow: '0 1px 10px rgba(0,0,0,0.7)',
          }}
        >
          Road furniture, bridge expansion joints &amp; road safety surfacing since 2018
        </p>

        <div
          className="pointer-events-auto mt-7 inline-flex md:mt-8"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 1.05s',
          }}
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-aksb-light/25 bg-aksb-dark/40 px-6 py-3 text-xs font-body font-medium uppercase tracking-[0.14em] text-aksb-light backdrop-blur-sm transition-all duration-400 hover:border-aksb-oxidized hover:bg-aksb-oxidized"
          >
            Start a project
            <ArrowUpRight
              size={14}
              className="transition-transform duration-400 group-hover:rotate-45"
            />
          </Link>
        </div>
      </div>

      {/* Mobile: tappable tile grid flows below the text */}
      <div className="relative z-10 mt-9 grid grid-cols-2 gap-1.5 px-1.5 pb-14 md:hidden">
        {HERO_TILES.map((tile, i) => (
          <HeroTile
            key={tile.src}
            tile={tile}
            index={i}
            loaded={loaded}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
      </div>

      {/* Scroll indicator — desktop only (the mobile hero ends at the grid) */}
      <div
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1s ease 1.2s' }}
      >
        <span className="text-[10px] font-body uppercase tracking-[0.2em] text-aksb-light/40">
          Scroll
        </span>
        <div className="relative h-8 w-px overflow-hidden bg-aksb-light/20">
          <div
            className="absolute left-0 top-0 w-full bg-aksb-oxidized"
            style={{ height: '40%', animation: 'scrollPulse 2s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
}
