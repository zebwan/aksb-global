import { useState } from 'react';
import { Plus } from 'lucide-react';
import { FAQS } from '../../data/site';
import Reveal from './Reveal';

interface FAQProps {
  /** 'light' = warm paper background, 'stone' = beige */
  tone?: 'light' | 'stone';
}

function FAQItem({
  item,
  open,
  onToggle,
}: {
  item: (typeof FAQS)[number];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-t border-aksb-text/10">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-baseline justify-between gap-6 py-6 text-left"
      >
        <span
          className={`font-display text-xl font-medium leading-snug transition-colors duration-300 md:text-2xl ${
            open ? 'text-aksb-oxidized' : 'text-aksb-text group-hover:text-aksb-oxidized'
          }`}
        >
          {item.q}
        </span>
        <Plus
          size={20}
          className={`mt-1 flex-none self-start text-aksb-text/40 transition-transform duration-400 ${
            open ? 'rotate-45 text-aksb-oxidized' : 'group-hover:text-aksb-oxidized'
          }`}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-7 text-sm font-body leading-relaxed text-aksb-muted md:text-base">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ({ tone = 'light' }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={`w-full ${tone === 'light' ? 'bg-aksb-light' : 'bg-aksb-stone'}`}>
      <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <Reveal>
            <p className="mb-4 text-xs font-body font-medium uppercase tracking-[0.2em] text-aksb-oxidized">
              Common Questions
            </p>
            <h2 className="font-display text-4xl font-medium uppercase leading-[1.1] text-aksb-text md:text-5xl">
              Before you
              <br />
              pick up the phone
            </h2>
            <p className="mt-4 max-w-sm text-sm font-body leading-relaxed text-aksb-muted">
              The things clients usually ask first. Anything else — the team answers WhatsApp
              quicker than you would expect.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border-b border-aksb-text/10">
              {FAQS.map((item, i) => (
                <FAQItem
                  key={item.q}
                  item={item}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
