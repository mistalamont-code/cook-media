import Link from "next/link";
import Image from "next/image";

const services = [
  {
    title: "Weddings",
    description:
      "Photography, videography, and livestreaming for your special day.",
    image: "/images/hero-couple.jpg",
    href: "/inquiry?service=WEDDING",
  },
  {
    title: "Event Photography & Video",
    description:
      "From corporate galas to community celebrations, we capture the energy and essence of your event.",
    image: "/images/service-events.jpg",
    href: "/inquiry?service=EVENT",
  },
  {
    title: "Live Sound & AV",
    description:
      "Professional sound, AV production, and live band performances for events and private parties.",
    image: "/images/portfolio.jpg",
    href: "/inquiry?service=LIVE_SOUND",
  },
];

const steps = [
  {
    number: "01",
    title: "Inquire",
    description: "Tell us about your event through our simple inquiry form.",
  },
  {
    number: "02",
    title: "Proposal",
    description:
      "We'll send you a custom proposal tailored to your needs and budget.",
  },
  {
    number: "03",
    title: "Book",
    description:
      "Approve your proposal, pay your retainer, and your date is locked in.",
  },
];

const commitments = [
  {
    icon: "\u2726",
    title: "Quality & Creativity",
    description:
      "We deliver top-notch quality with a creative touch that makes each project unique.",
  },
  {
    icon: "\u25C9",
    title: "Customer-Centric",
    description:
      "Your vision is our priority. We collaborate closely to meet and exceed your expectations.",
  },
  {
    icon: "\u25C8",
    title: "Flexibility & Reach",
    description:
      "Rooted in Erie, PA \u2014 our passion takes us wherever your story needs to be told.",
  },
];

const testimonials = [
  {
    quote: "Review coming soon",
    name: "Client Name",
    eventType: "Wedding",
  },
  {
    quote: "Review coming soon",
    name: "Client Name",
    eventType: "Corporate Event",
  },
  {
    quote: "Review coming soon",
    name: "Client Name",
    eventType: "Community Event",
  },
];

const faqs = [
  {
    q: "What services does COOK/Media offer?",
    a: "We specialize in wedding photography and videography, event photography and video, and live sound and AV production. Our services cover weddings, corporate events, community celebrations, and private parties.",
  },
  {
    q: "Do you travel for events and shoots?",
    a: "Absolutely! While we are based in Erie, PA, we are willing and equipped to travel. Travel expenses and accommodations will be discussed and included in your service package.",
  },
  {
    q: "How does pricing work?",
    a: "Our pricing varies depending on the type of service, duration, location, and specific requirements. Contact us for a detailed quote based on your individual needs.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Please notify us at least 30 days in advance. Deposits are non-refundable but may be applied to future bookings within a year, subject to availability.",
  },
  {
    q: "How can we book your services?",
    a: "Book through our website, email, or phone. We look forward to discussing how we can make your event unforgettable.",
  },
  {
    q: "How long until we receive our photos?",
    a: "Fully edited galleries are typically delivered within 4\u20136 weeks.",
  },
  {
    q: "Do you travel for destination weddings?",
    a: "Yes! We love destination work. Travel costs are included in your custom quote.",
  },
  {
    q: "Can we customize a package?",
    a: "Absolutely. Start with any package and add services a la carte to match your needs.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-deep">
      {/* Skip link */}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded focus:bg-brand-gold focus:px-4 focus:py-2 focus:text-white focus:text-sm">
        Skip to Main Content
      </a>

      {/* ═══ NAVIGATION ═══ */}
      <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(196,30,42,0.15)] bg-[rgba(10,10,10,0.95)] backdrop-blur-[20px]">
        <div className="mx-auto max-w-[800px] flex items-center justify-between px-6 h-[70px]">
          <Link href="/" aria-label="COOK/Media home" className="flex items-center gap-3">
            <Image src="/images/logo-light.png" alt="" width={36} height={36} className="rounded-sm" />
            <span className="text-xl font-black font-heading font-heading">
              COOK<span className="text-[var(--accent)]">/</span>Media
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {["Services", "Pricing", "About", "FAQ", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[0.85rem] font-medium uppercase tracking-[0.5px] text-brand-text-muted hover:text-brand-gold transition-colors duration-300">
                {item}
              </a>
            ))}
            <Link
              href="/inquiry"
              className="rounded bg-brand-gold px-6 py-2.5 text-[0.9rem] font-semibold uppercase tracking-[1px] text-white hover:bg-brand-gold-light hover:-translate-y-0.5 transition-all duration-300 shadow-[0_8px_30px_rgba(196,30,42,0.3)]"
            >
              Start Your Inquiry
            </Link>
          </div>
          <Link href="/inquiry" className="md:hidden rounded bg-brand-gold px-4 py-2 text-[0.85rem] font-semibold uppercase tracking-[1px] text-white">
            Inquire
          </Link>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="main" className="relative min-h-screen flex items-center justify-center scroll-mt-[70px]">
        <Image
          src="/images/hero-couple.jpg"
          alt="Wedding couple photographed by Cook Media"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.85)] via-[rgba(10,10,10,0.6)] to-[rgba(10,10,10,1)]" />

        <div className="relative text-center max-w-[800px] mx-auto px-8 py-[120px] space-y-8">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[3px] text-brand-gold">
            Erie, PA &amp; Beyond
          </p>
          <h1 className="text-[clamp(3rem,8vw,6rem)] font-black font-heading leading-[1.1]">
            Your Story,{" "}
            <span className="text-[var(--accent)]">Beautifully Told</span>
          </h1>
          <div className="w-[60px] h-[2px] bg-brand-gold mx-auto" aria-hidden="true" />
          <p className="text-[clamp(1rem,2.5vw,1.3rem)] font-light text-brand-text-muted leading-relaxed max-w-2xl mx-auto">
            Wedding photography, videography, and live sound production &mdash; based in Erie, PA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/inquiry"
              className="rounded bg-brand-gold px-9 py-[14px] text-[0.9rem] font-semibold uppercase tracking-[1px] text-white hover:bg-brand-gold-light hover:-translate-y-0.5 transition-all duration-300 shadow-[0_8px_30px_rgba(196,30,42,0.3)]"
            >
              Start Your Inquiry
            </Link>
            <a
              href="#services"
              className="rounded border border-brand-gold px-9 py-[14px] text-[0.9rem] font-semibold uppercase tracking-[1px] text-brand-gold hover:bg-[rgba(196,30,42,0.1)] hover:-translate-y-0.5 transition-all duration-300"
            >
              See Our Services
            </a>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="py-[100px] px-8 scroll-mt-[70px]">
        <div className="mx-auto max-w-[800px] grid gap-12 md:grid-cols-2 items-center">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <Image
              src="/images/about.jpg"
              alt="Cook Media behind the scenes"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/60 to-transparent" />
          </div>
          <div className="space-y-6">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[3px] text-brand-gold">
              Welcome
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold font-heading leading-tight">
              Welcome to COOK<span className="text-brand-gold">/</span>Media
            </h2>
            <div className="w-[60px] h-[2px] bg-brand-gold" aria-hidden="true" />
            <p className="text-[1.05rem] text-brand-text-muted leading-[1.8]">
              COOK/Media is a full-service media production company based in Erie, PA. We specialize
              in wedding photography and videography, event coverage, and live sound and AV production.
            </p>
            <p className="text-[1.05rem] text-brand-text-muted leading-[1.8]">
              Whether it&apos;s your wedding day, a corporate event, or a community celebration &mdash;
              we bring the vision, the energy, and the craft to make it unforgettable.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="py-[100px] px-8 scroll-mt-[70px] bg-gradient-to-b from-brand-deep via-brand-dark to-brand-deep">
        <div className="mx-auto max-w-[800px]">
          <div className="text-center space-y-4 mb-16">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[3px] text-brand-gold">
              What We Do
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold font-heading">Our Services</h2>
            <div className="w-[60px] h-[2px] bg-brand-gold mx-auto" aria-hidden="true" />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-lg border border-[rgba(196,30,42,0.1)] bg-brand-card overflow-hidden transition-all duration-300 hover:border-[rgba(196,30,42,0.3)] hover:-translate-y-0.5"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-card to-transparent" />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-[1rem] font-semibold group-hover:text-brand-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-[0.9rem] text-brand-text-muted leading-[1.6]">
                    {service.description}
                  </p>
                  <span className="inline-block text-[0.75rem] font-semibold uppercase tracking-[2px] text-brand-gold pt-1">
                    Learn More &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-[100px] px-8">
        <div className="mx-auto max-w-[800px]">
          <div className="text-center space-y-4 mb-16">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[3px] text-brand-gold">
              The Process
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold font-heading">How It Works</h2>
            <div className="w-[60px] h-[2px] bg-brand-gold mx-auto" aria-hidden="true" />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="text-center space-y-4 rounded-lg border border-[rgba(196,30,42,0.1)] bg-brand-card p-8 transition-all duration-300 hover:border-[rgba(196,30,42,0.3)] hover:-translate-y-0.5">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(196,30,42,0.1)] text-lg font-bold text-brand-gold font-heading">
                  {step.number}
                </span>
                <h3 className="text-[1rem] font-semibold">{step.title}</h3>
                <p className="text-[0.9rem] text-brand-text-muted leading-[1.6]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="py-[100px] px-8 scroll-mt-[70px] bg-gradient-to-b from-brand-deep via-brand-dark to-brand-deep">
        <div className="mx-auto max-w-[800px]">
          <div className="text-center space-y-4 mb-16">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[3px] text-brand-gold">
              Investment
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold font-heading">Service Pricing</h2>
            <div className="w-[60px] h-[2px] bg-brand-gold mx-auto" aria-hidden="true" />
          </div>

          {/* Wedding Packages */}
          <div className="mb-16">
            <h3 className="text-[0.75rem] font-semibold uppercase tracking-[3px] text-brand-gold mb-8">
              Wedding Photography
            </h3>
            <div className="grid gap-5 md:grid-cols-3">
              {/* Package 1 */}
              <div className="rounded-lg border-2 border-brand-gold bg-brand-card p-8 relative">
                <span className="absolute -top-3 left-6 bg-brand-gold text-white text-[0.65rem] font-semibold uppercase tracking-[1.5px] px-3 py-1 rounded-full">
                  Most Popular
                </span>
                <p className="text-[0.75rem] font-semibold uppercase tracking-[2px] text-brand-text-muted mb-2">Package 1</p>
                <p className="text-[2rem] font-bold font-heading text-brand-gold tabular-nums">$3,000</p>
                <div className="w-10 h-[2px] bg-brand-gold mt-4 mb-6" aria-hidden="true" />
                <ul className="space-y-2.5 text-[0.9rem] text-brand-text-muted leading-relaxed">
                  <li className="flex items-start gap-2"><span className="text-brand-gold mt-0.5" aria-hidden="true">&check;</span> All-day photography (2 photographers)</li>
                  <li className="flex items-start gap-2"><span className="text-brand-gold mt-0.5" aria-hidden="true">&check;</span> Highlight video with drone footage</li>
                  <li className="flex items-start gap-2"><span className="text-brand-gold mt-0.5" aria-hidden="true">&check;</span> Rehearsal dinner coverage</li>
                  <li className="flex items-start gap-2"><span className="text-brand-gold mt-0.5" aria-hidden="true">&check;</span> Ceremony livestream included</li>
                  <li className="flex items-start gap-2"><span className="text-brand-gold mt-0.5" aria-hidden="true">&check;</span> Engagement session</li>
                </ul>
                <Link href="/inquiry?service=WEDDING" className="block mt-8 rounded bg-brand-gold px-6 py-3 text-center text-[0.85rem] font-semibold uppercase tracking-[1px] text-white hover:bg-brand-gold-light hover:-translate-y-0.5 transition-all duration-300 shadow-[0_8px_30px_rgba(196,30,42,0.3)]">
                  Book Package 1
                </Link>
              </div>

              {/* Package 2 */}
              <div className="rounded-lg border border-[rgba(196,30,42,0.1)] bg-brand-card p-8">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[2px] text-brand-text-muted mb-2">Package 2</p>
                <p className="text-[2rem] font-bold font-heading text-brand-text tabular-nums">$2,000</p>
                <div className="w-10 h-[2px] bg-[rgba(196,30,42,0.2)] mt-4 mb-6" aria-hidden="true" />
                <ul className="space-y-2.5 text-[0.9rem] text-brand-text-muted leading-relaxed">
                  <li className="flex items-start gap-2"><span className="text-brand-gold mt-0.5" aria-hidden="true">&check;</span> All-day photography (2 photographers)</li>
                  <li className="flex items-start gap-2"><span className="text-brand-gold mt-0.5" aria-hidden="true">&check;</span> Engagement session</li>
                  <li className="flex items-start gap-2"><span className="text-brand-gold mt-0.5" aria-hidden="true">&check;</span> Highlight video</li>
                </ul>
                <Link href="/inquiry?service=WEDDING" className="block mt-8 rounded border border-brand-gold px-6 py-3 text-center text-[0.85rem] font-semibold uppercase tracking-[1px] text-brand-gold hover:bg-[rgba(196,30,42,0.1)] hover:-translate-y-0.5 transition-all duration-300">
                  Book Package 2
                </Link>
              </div>

              {/* Package 3 */}
              <div className="rounded-lg border border-[rgba(196,30,42,0.1)] bg-brand-card p-8">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[2px] text-brand-text-muted mb-2">Package 3</p>
                <p className="text-[2rem] font-bold font-heading text-brand-text tabular-nums">$1,500</p>
                <div className="w-10 h-[2px] bg-[rgba(196,30,42,0.2)] mt-4 mb-6" aria-hidden="true" />
                <ul className="space-y-2.5 text-[0.9rem] text-brand-text-muted leading-relaxed">
                  <li className="flex items-start gap-2"><span className="text-brand-gold mt-0.5" aria-hidden="true">&check;</span> 6-hour photography (1 photographer)</li>
                  <li className="flex items-start gap-2"><span className="text-brand-gold mt-0.5" aria-hidden="true">&check;</span> Engagement session</li>
                </ul>
                <Link href="/inquiry?service=WEDDING" className="block mt-8 rounded border border-brand-gold px-6 py-3 text-center text-[0.85rem] font-semibold uppercase tracking-[1px] text-brand-gold hover:bg-[rgba(196,30,42,0.1)] hover:-translate-y-0.5 transition-all duration-300">
                  Book Package 3
                </Link>
              </div>
            </div>

            <p className="text-[0.78rem] text-brand-text-muted/70 mt-6 text-center">
              All final images available for download with full copyrights. HD Livestreaming Add-On available for $350.
            </p>
          </div>

          {/* A La Carte + Event Photography */}
          <div className="grid gap-5 md:grid-cols-2 mb-16">
            <div>
              <h3 className="text-[0.75rem] font-semibold uppercase tracking-[3px] text-brand-gold mb-6">
                Wedding A La Carte
              </h3>
              <div className="space-y-3">
                {[
                  ["Family Portrait Session", "$200"],
                  ["Wedding Day Details Preparation", "$200"],
                  ["Rehearsal Coverage", "$200"],
                  ["Engagement Session", "$200"],
                  ["HD Livestreaming w/ Pro Sound", "$350"],
                ].map(([service, price]) => (
                  <div key={service} className="flex items-center justify-between rounded-lg border border-[rgba(196,30,42,0.1)] bg-brand-card px-5 py-3.5 hover:border-[rgba(196,30,42,0.3)] transition-colors duration-300">
                    <span className="text-[0.9rem] text-brand-text">{service}</span>
                    <span className="text-[0.9rem] font-semibold tabular-nums text-brand-gold">{price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[0.75rem] font-semibold uppercase tracking-[3px] text-brand-gold mb-6">
                Event Photography
              </h3>
              <div className="space-y-3">
                {[
                  ["Hourly Rate", "$75/hr"],
                  ["Additional Hours (overtime)", "$75/hr"],
                ].map(([service, price]) => (
                  <div key={service} className="flex items-center justify-between rounded-lg border border-[rgba(196,30,42,0.1)] bg-brand-card px-5 py-3.5 hover:border-[rgba(196,30,42,0.3)] transition-colors duration-300">
                    <span className="text-[0.9rem] text-brand-text">{service}</span>
                    <span className="text-[0.9rem] font-semibold tabular-nums text-brand-gold">{price}</span>
                  </div>
                ))}
              </div>
              <p className="text-[0.78rem] text-brand-text-muted/70 mt-4">
                Custom quotes available for multi-day events and large-scale productions.
              </p>
            </div>
          </div>

          {/* Live Sound & AV */}
          <div className="mb-16">
            <h3 className="text-[0.75rem] font-semibold uppercase tracking-[3px] text-brand-gold mb-6">
              Live Sound & AV
            </h3>
            <div className="rounded-lg border border-[rgba(196,30,42,0.1)] bg-brand-card p-8 text-center space-y-4">
              <p className="text-[1.05rem] text-brand-text-muted leading-[1.8] max-w-xl mx-auto">
                Custom quotes based on event type, venue size, and equipment requirements.
                Contact us for a tailored proposal.
              </p>
              <Link
                href="/inquiry?service=LIVE_SOUND"
                className="inline-block rounded bg-brand-gold px-7 py-3 text-[0.85rem] font-semibold uppercase tracking-[1px] text-white hover:bg-brand-gold-light hover:-translate-y-0.5 transition-all duration-300 shadow-[0_8px_30px_rgba(196,30,42,0.3)]"
              >
                Get a Quote
              </Link>
            </div>
          </div>

          {/* Booking policy */}
          <div className="rounded-lg border border-[rgba(196,30,42,0.1)] bg-brand-card p-8 text-center">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[3px] text-brand-gold mb-3">
              Booking Policy
            </p>
            <p className="text-[1.05rem] text-brand-text-muted leading-[1.8] max-w-xl mx-auto">
              50% of package due to reserve your date. All packages subject to applicable sales tax.
              Cash, check, and credit card accepted. All final images delivered by online gallery.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ OUR COMMITMENT ═══ */}
      <section className="relative py-[120px] px-8">
        <Image
          src="/images/commitment.jpg"
          alt="Cook Media portfolio showcase"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-deep/90 via-brand-deep/70 to-brand-deep/90" />
        <div className="relative mx-auto max-w-[800px]">
          <div className="text-center space-y-4 mb-16">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[3px] text-brand-gold">
              Why Us
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold font-heading">Our Commitment</h2>
            <div className="w-[60px] h-[2px] bg-brand-gold mx-auto" aria-hidden="true" />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {commitments.map((item) => (
              <div key={item.title} className="text-center space-y-4 rounded-lg border border-[rgba(196,30,42,0.1)] bg-brand-card/80 backdrop-blur-sm p-8 transition-all duration-300 hover:border-[rgba(196,30,42,0.3)] hover:-translate-y-0.5">
                <span className="text-brand-gold text-2xl" aria-hidden="true">{item.icon}</span>
                <h3 className="text-[1rem] font-semibold">{item.title}</h3>
                <p className="text-[0.9rem] text-brand-text-muted leading-[1.6]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-[100px] px-8">
        <div className="mx-auto max-w-[800px]">
          <div className="text-center space-y-4 mb-16">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[3px] text-brand-gold">
              What They Say
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold font-heading">Client Love</h2>
            <div className="w-[60px] h-[2px] bg-brand-gold mx-auto" aria-hidden="true" />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-lg border border-[rgba(196,30,42,0.1)] bg-brand-card p-8 space-y-4 transition-all duration-300 hover:border-[rgba(196,30,42,0.3)] hover:-translate-y-0.5">
                <p className="text-[1.05rem] text-brand-text-muted leading-[1.8] italic font-heading">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold text-brand-text">&mdash; {t.name}</p>
                  <p className="text-xs text-brand-text-muted">{t.eventType}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PORTFOLIO / OUR WORK ═══ */}
      <section className="py-[100px] px-8 bg-gradient-to-b from-brand-deep via-brand-dark to-brand-deep">
        <div className="mx-auto max-w-[700px] text-center space-y-6">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[3px] text-brand-gold">
            Our Work
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold font-heading">Recent Projects</h2>
          <div className="w-[60px] h-[2px] bg-brand-gold mx-auto" aria-hidden="true" />
          <p className="text-[1.05rem] text-brand-text-muted leading-[1.8]">
            Gallery coming soon. Follow us on Instagram for our latest work.
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded border border-brand-gold px-7 py-3 text-[0.85rem] font-semibold uppercase tracking-[1px] text-brand-gold hover:bg-[rgba(196,30,42,0.1)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Follow on Instagram
          </a>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="py-[100px] px-8 scroll-mt-[70px]">
        <div className="mx-auto max-w-[700px]">
          <div className="text-center space-y-4 mb-16">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[3px] text-brand-gold">
              Questions
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold font-heading">FAQ&apos;s</h2>
            <div className="w-[60px] h-[2px] bg-brand-gold mx-auto" aria-hidden="true" />
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-lg border border-[rgba(196,30,42,0.1)] bg-brand-card transition-[border-color] duration-300 hover:border-[rgba(196,30,42,0.3)]"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-[0.9rem] font-semibold list-none">
                  {faq.q}
                  <span aria-hidden="true" className="text-brand-gold text-lg ml-4 group-open:rotate-45 transition-transform duration-300">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-[0.9rem] text-brand-text-muted leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT CTA ═══ */}
      <section id="contact" className="py-[100px] px-8 scroll-mt-[70px] bg-gradient-to-b from-brand-deep via-brand-dark to-brand-deep">
        <div className="mx-auto max-w-[600px] text-center space-y-8">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[3px] text-brand-gold">
            Get in Touch
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold font-heading">
            Let&apos;s Create Something Together
          </h2>
          <div className="w-[60px] h-[2px] bg-brand-gold mx-auto" aria-hidden="true" />
          <p className="text-[1.05rem] text-brand-text-muted leading-[1.8]">
            Tell us about your event and we&apos;ll take it from there. We review your details,
            send a custom proposal tailored to your needs, and once you approve, we lock in your date.
          </p>
          <Link
            href="/inquiry"
            className="inline-block rounded bg-brand-gold px-9 py-[14px] text-[0.9rem] font-semibold uppercase tracking-[1px] text-white hover:bg-brand-gold-light hover:-translate-y-0.5 transition-all duration-300 shadow-[0_8px_30px_rgba(196,30,42,0.3)]"
          >
            Start Your Inquiry
          </Link>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4 text-sm text-brand-text-muted">
            <a href="mailto:corey@cook-media.com" className="hover:text-brand-gold transition-colors duration-300">
              corey@cook-media.com
            </a>
            <a href="tel:+18145662733" className="hover:text-brand-gold transition-colors duration-300">
              (814) 566-2733
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-[rgba(196,30,42,0.15)] bg-brand-deep py-16 px-8">
        <div className="mx-auto max-w-[800px] text-center space-y-6">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/images/logo-light.png" alt="" width={28} height={28} className="rounded-sm" />
            <span className="text-xl font-black font-heading font-heading">
              COOK<span className="text-[var(--accent)]">/</span>Media
            </span>
          </Link>
          <p className="text-[0.9rem] text-brand-text-muted leading-relaxed max-w-xl mx-auto">
            Your media partner for photography, videography, and live sound production.
            Based in Erie, PA &mdash; ready to bring our craft wherever your story unfolds.
          </p>
          <div className="w-[60px] h-[2px] bg-brand-gold mx-auto" aria-hidden="true" />
          <p className="text-[0.78rem] text-brand-text-muted/70 tracking-wide">
            Cook Media LLC &middot; Erie, PA &middot; corey@cook-media.com
          </p>
          <div className="flex justify-center gap-8 pt-2">
            <Link href="/inquiry" className="text-[0.78rem] font-medium uppercase tracking-[0.5px] text-brand-text-muted hover:text-brand-gold transition-colors duration-300 underline underline-offset-4">
              Start Your Inquiry
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
