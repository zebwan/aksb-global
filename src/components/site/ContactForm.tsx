import { useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CONTACT, SERVICES } from '../../data/site';

const inputClass =
  'w-full border-b border-aksb-text/20 bg-transparent pb-3 pt-2 text-base font-body text-aksb-text placeholder:text-aksb-text/35 outline-none transition-colors duration-300 focus:border-aksb-oxidized';

const labelClass =
  'block text-[11px] font-body font-medium uppercase tracking-[0.15em] text-aksb-muted';

/**
 * Static-host friendly enquiry form — composes a prefilled email in the
 * visitor's mail app on submit. No backend required.
 */
export default function ContactForm() {
  const [scope, setScope] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '');
    const company = String(data.get('company') ?? '');
    const phone = String(data.get('phone') ?? '');
    const email = String(data.get('email') ?? '');
    const message = String(data.get('message') ?? '');

    const subject = `Enquiry — ${scope || 'road works'} (${company || name})`;
    const body = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Scope: ${scope}`,
      '',
      message,
    ].join('\n');

    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            Your name
          </label>
          <input id="cf-name" name="name" required autoComplete="name" className={inputClass} placeholder="Ahmad bin Abdullah" />
        </div>
        <div>
          <label htmlFor="cf-company" className={labelClass}>
            Company
          </label>
          <input id="cf-company" name="company" autoComplete="organization" className={inputClass} placeholder="Company / agency" />
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelClass}>
            Phone
          </label>
          <input id="cf-phone" name="phone" type="tel" required autoComplete="tel" className={inputClass} placeholder="+60 12 345 6789" />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            Email
          </label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" className={inputClass} placeholder="you@company.com" />
        </div>
      </div>

      <fieldset className="mt-9">
        <legend className={labelClass}>What is the work about?</legend>
        <div className="mt-4 grid grid-cols-1 gap-1 sm:grid-cols-2">
          {[...SERVICES.map((s) => s.title), 'Something else'].map((option) => (
            <label
              key={option}
              className={`flex cursor-pointer items-center gap-3 border-b border-aksb-text/10 py-3 transition-colors duration-300 ${
                scope === option ? 'text-aksb-text' : 'text-aksb-muted hover:text-aksb-text'
              }`}
            >
              <input
                type="radio"
                name="scope"
                value={option}
                checked={scope === option}
                onChange={() => setScope(option)}
                className="peer sr-only"
              />
              <span
                className={`h-2 w-2 flex-none transition-all duration-300 ${
                  scope === option ? 'rotate-45 scale-125 bg-aksb-oxidized' : 'bg-aksb-text/25'
                }`}
              />
              <span className="text-sm font-body font-medium">{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-9">
        <label htmlFor="cf-message" className={labelClass}>
          Tell us about the site
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          className={`${inputClass} resize-none leading-relaxed`}
          placeholder="Location, scope, quantities if you have them, and when the work needs to happen."
        />
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="group inline-flex w-fit items-center gap-2 rounded-full bg-aksb-dark px-8 py-4 text-xs font-body font-semibold uppercase tracking-[0.14em] text-aksb-light transition-all duration-400 hover:-translate-y-0.5 hover:bg-aksb-oxidized"
        >
          Send enquiry
          <ArrowUpRight size={15} className="transition-transform duration-400 group-hover:rotate-45" />
        </button>
        <p className="text-xs font-body leading-relaxed text-aksb-muted">
          Opens your mail app addressed to {CONTACT.email} —<br className="hidden sm:block" />
          or WhatsApp us at{' '}
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-aksb-text underline decoration-aksb-oxidized/50 underline-offset-4 transition-colors duration-300 hover:text-aksb-oxidized"
          >
            {CONTACT.mobilePhone}
          </a>
          .
        </p>
      </div>
    </form>
  );
}
