import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Reveal from '../components/site/Reveal';
import BlurTitle from '../components/site/BlurTitle';
import MaskImage from '../components/site/MaskImage';
import ContactForm from '../components/site/ContactForm';
import { CONTACT } from '../data/site';

const DETAILS = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: CONTACT.mobilePhone,
    href: CONTACT.whatsappUrl,
    external: true,
  },
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: Phone,
    label: 'Office',
    value: CONTACT.officePhone,
    href: CONTACT.officePhoneHref,
  },
  {
    icon: MapPin,
    label: 'Head office',
    value: CONTACT.address,
    href: CONTACT.mapsUrl,
    external: true,
  },
  {
    icon: MapPin,
    label: 'Johor branch',
    value: CONTACT.johorAddress,
    href: CONTACT.johorMapsUrl,
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="w-full scroll-mt-16 bg-aksb-light">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <p className="mb-3 text-xs font-body font-medium uppercase tracking-[0.2em] text-aksb-oxidized">
            Contact Us
          </p>
        </Reveal>
        <BlurTitle
          as="h2"
          className="font-display text-4xl font-medium uppercase leading-[1.08] text-aksb-text md:text-5xl lg:text-6xl"
        >
          Your Vision. Our Commitment.
        </BlurTitle>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-2xl text-base font-body leading-relaxed text-aksb-muted md:text-lg">
            Tell us about the road, bridge or surfacing scope you are pricing. We will come back
            with the most practical method for the site.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          {/* Enquiry form */}
          <Reveal>
            <h3 className="font-display text-2xl font-medium uppercase text-aksb-text md:text-3xl">
              Start the conversation
            </h3>
            <p className="mt-3 max-w-md text-sm font-body leading-relaxed text-aksb-muted">
              A few details are enough. Drawings and BQs can follow by email once we know what we
              are looking at.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          {/* Direct lines + proof */}
          <div>
            <Reveal delay={0.1}>
              <div className="border-t border-aksb-text/10">
                {DETAILS.map((d) => (
                  <a
                    key={d.label}
                    href={d.href}
                    target={d.external ? '_blank' : undefined}
                    rel={d.external ? 'noreferrer' : undefined}
                    className="group flex items-start gap-4 border-b border-aksb-text/10 py-5 transition-colors duration-300"
                  >
                    <d.icon
                      size={17}
                      className="mt-0.5 flex-none text-aksb-oxidized transition-transform duration-300 group-hover:-translate-y-0.5"
                    />
                    <span>
                      <span className="block text-[10px] font-body font-medium uppercase tracking-[0.15em] text-aksb-muted">
                        {d.label}
                      </span>
                      <span className="mt-1 block text-sm font-body font-medium leading-relaxed text-aksb-text transition-colors duration-300 group-hover:text-aksb-oxidized">
                        {d.value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-6 space-y-1.5 text-sm font-body leading-relaxed text-aksb-muted">
                <p>
                  {CONTACT.company} · {CONTACT.regNo}
                </p>
                <p>Contact person: {CONTACT.person}</p>
                <p>CIDB G4 · Bumiputera status · Est. 2018</p>
              </div>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <MaskImage
                src="./images/cst-carriageway.jpg"
                alt="Colour surface treatment site photo"
                direction="up"
                className="h-[150px] rounded-lg sm:h-[180px]"
              />
              <MaskImage
                src="./images/joint-elastomeric.jpg"
                alt="Elastomeric bridge joint site photo"
                direction="up"
                delay={0.12}
                className="h-[150px] rounded-lg sm:h-[180px]"
              />
            </div>
            <Reveal delay={0.15}>
              <div className="mt-4 rounded-xl bg-aksb-dark p-7">
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
  );
}
