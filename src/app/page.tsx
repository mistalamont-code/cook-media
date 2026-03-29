import Link from "next/link";

const services = [
  {
    title: "Corporate Services",
    description:
      "Elevate Your Brand's Story: In the corporate world, your story is your strength. Our team of skilled photographers and videographers are experts in capturing the essence of your brand. From corporate events to promotional videos, we bring a blend of creativity and professionalism that sets your business apart.",
    cta: "Schedule Here",
    href: "/inquiry?service=LIVE_SOUND",
  },
  {
    title: "Weddings",
    description:
      "Your Special Day, Forever Remembered: Your wedding day is a story waiting to be told. At CookMediaLLC, we capture the laughter, tears, and joy, immortalizing them in stunning photographs and videos. Our personalized approach ensures that your wedding memories are as unique as your love story.",
    cta: "Schedule Here",
    href: "/inquiry?service=WEDDING",
  },
  {
    title: "Lifethrumusic Band",
    description:
      "Live Music that Resonates: Elevate your event with the soulful sounds of the Lifethrumusic Band. Our band brings a vibrant energy to any occasion, be it a corporate event, wedding, or private party. Let us set the perfect tone for your event with live music that echoes the essence of your celebration.",
    cta: "Schedule Here",
    href: "/inquiry?service=LIVE_SOUND",
  },
];

const commitments = [
  {
    title: "Quality and Creativity",
    description:
      "We believe in delivering top-notch quality with a creative touch that makes each project unique.",
  },
  {
    title: "Customer-Centric Approach",
    description:
      "Your vision is our priority. We collaborate closely with you to ensure that our services meet and exceed your expectations.",
  },
  {
    title: "Flexibility and Reach",
    description:
      "While we're rooted in Erie, PA, our passion for storytelling takes us wherever your story needs to be told. We're ready to travel to bring your vision to life.",
  },
];

const faqs = [
  {
    q: "What services does CookMediaLLC offer?",
    a: "CookMediaLLC specializes in professional photography, videography, and live music performances. Our services are ideal for corporate events, weddings, and other special occasions. We strive to capture your important moments with creativity and excellence.",
  },
  {
    q: "Do you travel for events and shoots?",
    a: "Absolutely! While we are based in Erie, PA, we are willing and equipped to travel for events and shoots. Travel expenses and accommodations will be discussed and included in your service package.",
  },
  {
    q: "How does pricing work for your services?",
    a: "Our pricing varies depending on the type of service, duration, location, and specific requirements of your event. Please contact us for a detailed quote based on your individual needs.",
  },
  {
    q: "What is your cancellation policy?",
    a: "For cancellations, please notify us at least 30 days in advance. Deposits are non-refundable but may be applied to future bookings within a year, subject to our availability.",
  },
  {
    q: "How can we book your services or get more information?",
    a: "You can book our services or get more information by contacting us through our website, email, or phone. We look forward to discussing how we can make your event unforgettable.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-deep">
      {/* Skip to main content */}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded focus:bg-brand-red focus:px-4 focus:py-2 focus:text-white focus:text-sm">
        Skip to Main Content
      </a>

      {/* Navigation */}
      <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-brand-deep/95 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 h-[70px]">
          <Link href="/" aria-label="COOK/Media home" className="text-2xl font-black font-heading">
            COOK<span className="text-brand-red" aria-hidden="true">/</span>Media
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-xs font-medium uppercase tracking-widest text-brand-text-muted hover:text-brand-red transition-colors duration-300">
              Services
            </a>
            <a href="#about" className="text-xs font-medium uppercase tracking-widest text-brand-text-muted hover:text-brand-red transition-colors duration-300">
              About
            </a>
            <a href="#faq" className="text-xs font-medium uppercase tracking-widest text-brand-text-muted hover:text-brand-red transition-colors duration-300">
              FAQ
            </a>
            <a href="#contact" className="text-xs font-medium uppercase tracking-widest text-brand-text-muted hover:text-brand-red transition-colors duration-300">
              Contact
            </a>
            <Link
              href="/inquiry"
              className="rounded bg-brand-red px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-brand-red-light hover:-translate-y-0.5 transition-[color,background-color,transform,box-shadow] duration-300 shadow-[0_4px_20px_rgba(196,30,42,0.3)]"
            >
              Book Here
            </Link>
          </div>
          <Link
            href="/inquiry"
            className="md:hidden rounded bg-brand-red px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white"
          >
            Book Here
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section id="main" className="relative flex items-center justify-center min-h-screen pt-[70px] px-6 scroll-mt-[70px]">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-deep via-brand-dark to-brand-deep" />
        <div className="relative text-center max-w-3xl mx-auto space-y-8">
          <p className="text-xs font-semibold uppercase tracking-[4px] text-brand-red">
            Erie, PA & Beyond
          </p>
          <h1 className="text-5xl sm:text-7xl font-black font-heading leading-tight">
            Your Vision,{" "}
            <span className="text-brand-red">Our Lens</span>
          </h1>
          <div className="w-16 h-0.5 bg-brand-red mx-auto" />
          <p className="text-lg text-brand-text-muted leading-relaxed max-w-2xl mx-auto">
            Bringing Stories to Life. We&apos;re storytellers, artists, and your partners
            in capturing life&apos;s most precious moments through photography,
            videography, and live performances.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/inquiry"
              className="rounded bg-brand-red px-10 py-4 text-sm font-semibold uppercase tracking-widest text-white hover:bg-brand-red-light hover:-translate-y-0.5 transition-all duration-300 shadow-[0_4px_20px_rgba(196,30,42,0.3)]"
            >
              Book Here
            </Link>
            <a
              href="#services"
              className="rounded border border-white/15 px-10 py-4 text-sm font-semibold uppercase tracking-widest text-brand-text hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-300"
            >
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Welcome / About */}
      <section id="about" className="py-24 px-6 scroll-mt-[70px]">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[4px] text-brand-red">
            Welcome
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading">
            Welcome to COOK<span className="text-brand-red">/</span>Media
          </h2>
          <div className="w-16 h-0.5 bg-brand-red mx-auto" />
          <p className="text-brand-text-muted leading-relaxed">
            Where we craft not just images, but the stories that will echo through your lifetime.
            Nestled in the heart of Erie, PA, our passion lies in immortalizing the pivotal chapters
            of your journey — be it the decisive moments of corporate success or the intimate whispers
            of &quot;I do&quot;. With our expert photography, cinematic videography, and the soul-stirring
            performances of the Lifethrumusic Band, we ensure that your memories are not only captured
            but also felt deeply.
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6 scroll-mt-[70px] bg-gradient-to-b from-brand-deep via-brand-dark to-brand-deep">
        <div className="mx-auto max-w-5xl">
          <div className="text-center space-y-4 mb-16">
            <p className="text-xs font-semibold uppercase tracking-[4px] text-brand-red">
              What We Do
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading">Our Services</h2>
            <div className="w-16 h-0.5 bg-brand-red mx-auto" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-lg border border-white/8 bg-brand-card p-8 transition-all duration-300 hover:border-brand-red/30 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(196,30,42,0.1)] group"
              >
                <h3 className="text-xl font-bold font-heading mb-4 group-hover:text-brand-red transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-brand-text-muted leading-relaxed mb-6">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="inline-block rounded border border-brand-red/40 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-brand-red hover:bg-brand-red hover:text-white transition-all duration-300"
                >
                  {service.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center space-y-4 mb-16">
            <p className="text-xs font-semibold uppercase tracking-[4px] text-brand-red">
              Why Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading">Our Commitment</h2>
            <div className="w-16 h-0.5 bg-brand-red mx-auto" />
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {commitments.map((item) => (
              <div key={item.title} className="text-center space-y-4">
                <h3 className="text-lg font-bold font-heading">{item.title}</h3>
                <p className="text-sm text-brand-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 scroll-mt-[70px] bg-gradient-to-b from-brand-deep via-brand-dark to-brand-deep">
        <div className="mx-auto max-w-3xl">
          <div className="text-center space-y-4 mb-16">
            <p className="text-xs font-semibold uppercase tracking-[4px] text-brand-red">
              Questions
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading">FAQ&apos;s</h2>
            <div className="w-16 h-0.5 bg-brand-red mx-auto" />
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-lg border border-white/8 bg-brand-card transition-all duration-300 hover:border-brand-red/20"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-sm font-semibold list-none">
                  {faq.q}
                  <span aria-hidden="true" className="text-brand-red text-lg ml-4 group-open:rotate-45 transition-transform duration-300">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-sm text-brand-text-muted leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 scroll-mt-[70px]">
        <div className="mx-auto max-w-xl">
          <div className="text-center space-y-4 mb-12">
            <p className="text-xs font-semibold uppercase tracking-[4px] text-brand-red">
              Get in Touch
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading">Contact Us</h2>
            <div className="w-16 h-0.5 bg-brand-red mx-auto" />
            <div className="space-y-2">
              <p className="text-sm text-brand-text-muted">
                <a href="mailto:corey@cook-media.com" className="hover:text-brand-red transition-colors">corey@cook-media.com</a>
              </p>
              <p className="text-sm text-brand-text-muted">
                <a href="tel:+18145662733" className="hover:text-brand-red transition-colors">(814) 566-2733</a>
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-white/8 bg-brand-card p-10 text-center space-y-6">
            <h3 className="text-2xl font-bold font-heading">Ready to Get Started?</h3>
            <p className="text-sm text-brand-text-muted leading-relaxed max-w-md mx-auto">
              Tell us about your event and we&apos;ll take it from there. We review your details,
              send a custom proposal tailored to your needs, and once you approve, we lock in your date.
            </p>
            <Link
              href="/inquiry"
              className="inline-block rounded bg-brand-red px-10 py-4 text-sm font-semibold uppercase tracking-widest text-white hover:bg-brand-red-light hover:-translate-y-0.5 transition-all duration-300 shadow-[0_4px_20px_rgba(196,30,42,0.3)]"
            >
              Book Here
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 bg-black py-16 px-6">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <Link href="/" className="text-2xl font-black font-heading">
            COOK<span className="text-brand-red">/</span>Media
          </Link>
          <p className="text-sm text-brand-text-muted leading-relaxed">
            Your all-encompassing media partner, dedicated to encapsulating the essence of your most
            cherished moments. From the intricate emotions of a corporate event to the intimate glances
            at a wedding, our photography, videography, and the melodic backdrop provided by the
            Lifethrumusic Band elevate your experiences into everlasting memories.
          </p>
          <div className="w-16 h-0.5 bg-brand-red mx-auto" />
          <p className="text-xs text-brand-text-muted/70">
            Cook Media LLC &bull; Erie, PA &bull; corey@cook-media.com
          </p>
          <div className="flex justify-center gap-6 pt-2">
            <Link href="/inquiry" className="text-xs font-medium uppercase tracking-widest text-brand-text-muted hover:text-brand-red transition-colors">
              Book a Service
            </Link>
            <Link href="/admin" className="text-xs font-medium uppercase tracking-widest text-brand-text-muted hover:text-brand-red transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
