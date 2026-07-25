import { Building2, Mail, MapPin, MessageCircle, Phone, User } from 'lucide-react';
import PageHero from '../components/site/PageHero';
import Reveal from '../components/site/Reveal';
import MaskImage from '../components/site/MaskImage';
import { CONTACT } from '../data/site';

const CHANNELS = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: CONTACT.mobilePhone,
    hint: 'Fastest response for site enquiries',
    href: CONTACT.whatsappUrl,
    external: true,
    featured: true,
  },
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT.email,
    hint: 'Send drawings, BQs and tender documents',
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: Phone,
    label: 'Office',
    value: CONTACT.officePhone,
    hint: 'Puncak Alam office, working hours',
    href: CONTACT.officePhoneHref,
  },
  {
    icon: MapPin,
    label: 'Address',
    value: CONTACT.address,
    hint: 'Open in Google Maps',
    href: CONTACT.mapsUrl,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact Us"
        title={
          <>
            Your Vision.
            <br />
            <span className="text-aksb-oxidized">Our Commitment.</span>
          </>
        }
        lede="We are ready to discuss your project and propose the most practical solution — constructing a safer and better tomorrow, one carriageway at a time."
      />

      <section className="w-full bg-aksb-light">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            {/* Channels */}
            <div>
              <Reveal>
                <h2 className="font-display text-3xl font-medium uppercase text-aksb-text md:text-4xl">
                  Speak to the team
                </h2>
                <p className="mt-3 max-w-md text-sm font-body leading-relaxed text-aksb-muted">
                  Road furniture, pavement treatment, civil works or bridge joint scopes — reach us
                  on whichever channel suits you.
                </p>
              </Reveal>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {CHANNELS.map((ch, i) => (
                  <Reveal key={ch.label} delay={0.06 * i} className={ch.featured ? 'sm:col-span-2' : ''}>
                    <a
                      href={ch.href}
                      target={ch.external ? '_blank' : undefined}
                      rel={ch.external ? 'noreferrer' : undefined}
                      className={`group flex h-full items-start gap-4 rounded-xl border p-6 transition-all duration-400 hover:-translate-y-1 ${
                        ch.featured
                          ? 'border-aksb-oxidized/30 bg-aksb-oxidized/[0.06] hover:border-aksb-oxidized hover:shadow-[0_16px_36px_rgba(166,75,41,0.18)]'
                          : 'border-aksb-text/10 bg-white hover:border-aksb-oxidized/40 hover:shadow-[0_14px_30px_rgba(13,13,13,0.08)]'
                      }`}
                    >
                      <span
                        className={`flex h-11 w-11 flex-none items-center justify-center rounded-full transition-colors duration-400 ${
                          ch.featured
                            ? 'bg-aksb-oxidized text-white'
                            : 'bg-aksb-oxidized/10 text-aksb-oxidized group-hover:bg-aksb-oxidized group-hover:text-white'
                        }`}
                      >
                        <ch.icon size={18} />
                      </span>
                      <span>
                        <span className="block text-[10px] font-body font-medium uppercase tracking-[0.15em] text-aksb-muted">
                          {ch.label}
                        </span>
                        <span className="mt-1 block text-sm font-body font-semibold leading-snug text-aksb-text">
                          {ch.value}
                        </span>
                        <span className="mt-1 block text-xs font-body text-aksb-muted">
                          {ch.hint}
                        </span>
                      </span>
                    </a>
                  </Reveal>
                ))}
              </div>

              {/* Company facts */}
              <Reveal delay={0.2}>
                <div className="mt-8 grid grid-cols-1 gap-4 rounded-xl border border-aksb-text/10 bg-white p-6 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <Building2 size={18} className="flex-none text-aksb-oxidized" />
                    <div>
                      <p className="text-[10px] font-body uppercase tracking-[0.15em] text-aksb-muted">
                        Company Registration
                      </p>
                      <p className="text-sm font-body font-semibold text-aksb-text">
                        {CONTACT.company} ({CONTACT.regNo})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User size={18} className="flex-none text-aksb-oxidized" />
                    <div>
                      <p className="text-[10px] font-body uppercase tracking-[0.15em] text-aksb-muted">
                        Contact Person
                      </p>
                      <p className="text-sm font-body font-semibold text-aksb-text">
                        {CONTACT.person}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Visual side */}
            <div className="flex flex-col gap-4">
              <MaskImage
                src="/images/hero1.jpg"
                alt="AKSB works at golden hour"
                direction="right"
                className="h-[240px] rounded-xl sm:h-[300px]"
              />
              <div className="grid grid-cols-2 gap-4">
                <MaskImage
                  src="/images/work-cst.jpg"
                  alt="Colour surface treatment site photo"
                  direction="up"
                  delay={0.15}
                  className="h-[150px] rounded-lg sm:h-[190px]"
                />
                <MaskImage
                  src="/images/work-sealant.jpg"
                  alt="Sealant joint application site photo"
                  direction="up"
                  delay={0.25}
                  className="h-[150px] rounded-lg sm:h-[190px]"
                />
              </div>
              <Reveal delay={0.2}>
                <div className="rounded-xl bg-aksb-dark p-7">
                  <p className="font-display text-xl font-medium uppercase leading-snug text-aksb-light">
                    Building connections.
                    <br />
                    <span className="text-aksb-oxidized">Delivering excellence.</span>
                  </p>
                  <p className="mt-3 text-sm font-body leading-relaxed text-aksb-light/50">
                    Partner with us for safe, reliable and high-quality infrastructure solutions.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
