import Link from "next/link";
import Image from "next/image";

const services = [
  {
    title: "Events",
    description:
      "From corporate galas to community celebrations, we capture the energy and essence of your event with a blend of creativity and professionalism.",
    image: "/images/service-events.jpg",
    href: "/inquiry?service=LIVE_SOUND",
  },
  {
    title: "Weddings",
    description:
      "Your wedding day is a story waiting to be told. We capture the laughter, tears, and joy, immortalizing them in stunning photographs and videos.",
    image: "/images/hero-couple.jpg",
    href: "/inquiry?service=WEDDING",
  },
  {
    title: "Lifethrumusic Band",
    description:
      "Elevate your event with soulful live sounds. Our band brings vibrant energy to any occasion — corporate events, weddings, or private parties.",
    image: "/images/portfolio.jpg",
    href: "/inquiry?service=LIVE_SOUND",
  },
];

const commitments = [
  {
    icon: "✦",
    title: "Quality & Creativity",
    description:
      "We deliver top-notch quality with a creative touch that makes each project unique.",
  },
  {
    icon: "◉",
    title: "Customer-Centric",
    description:
      "Your vision is our priority. We collaborate closely to meet and exceed your expectations.",
  },
  {
    icon: "◈",
    title: "Flexibility & Reach",
    description:
      "Rooted in Erie, PA — our passion takes us wherever your story needs to be told.",
  },
];

const faqs = [
  {
    q: "What services does COOK/Media offer?",
    a: "We specialize in professional photography, videography, and live music performances. Our services are ideal for corporate events, weddings, and other special occasions.",
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
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-deep">
      {/* Skip link */}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded focus:bg-brand-red focus:px-4 focus:py-2 focus:text-white focus:text-sm">
        Skip to Main Content
      </a>

      {/* ═══ NAVIGATION ═══ */}
      <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[rgba(10,10,10,0.95)] backdrop-blur-2xl">
        <div className="mx-auto max-w-[1000px] flex items-center justify-between px-6 h-[70px]">
          <Link href="/" aria-label="COOK/Media home" className="flex items-center gap-3">
            <Image src="/images/logo-light.png" alt="" width={36} height={36} className="rounded-sm" />
            <span className="text-xl font-black font-heading tracking-tight">
              COOK<span className="text-brand-red" aria-hidden="true">/</span>Media
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {["Services", "About", "FAQ", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[0.7rem] font-medium uppercase tracking-[2px] text-brand-text-muted hover:text-brand-red transition-colors duration-300">
                {item}
              </a>
            ))}
            <Link
              href="/inquiry"
              className="rounded bg-brand-red px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[1.5px] text-white hover:bg-brand-red-light hover:-translate-y-0.5 transition-[color,background-color,transform,box-shadow] duration-300 shadow-[0_4px_20px_rgba(196,30,42,0.25)]"
            >
              Book Here
            </Link>
          </div>
          <Link href="/inquiry" className="md:hidden rounded bg-brand-red px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[1.5px] text-white">
            Book Here
          </Link>
        </div>
      </nav>

      {/* ═══ HERO — Full-bleed image with gradient overlay ═══ */}
      <section id="main" className="relative min-h-screen flex items-center justify-center scroll-mt-[70px]">
        {/* Background image */}
        <Image
          src="/images/hero-couple.jpg"
          alt="Wedding couple photographed by Cook Media"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay (brand guide pattern — adapted for black) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.85)] via-[rgba(10,10,10,0.55)] to-[rgba(10,10,10,1)]" />

        <div className="relative text-center max-w-[800px] mx-auto px-6 py-32 space-y-8">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[4px] text-brand-red">
            Erie, PA &amp; Beyond
          </p>
          <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black font-heading leading-[1.1]">
            Your Vision,{" "}
            <span className="bg-gradient-to-r from-brand-red via-[#ff4d5a] to-brand-red bg-clip-text text-transparent">
              Our Lens
            </span>
          </h1>
          <div className="w-[60px] h-[2px] bg-brand-red mx-auto" aria-hidden="true" />
          <p className="text-[clamp(1rem,2.5vw,1.15rem)] font-light text-white/70 leading-relaxed max-w-2xl mx-auto">
            We&apos;re storytellers, artists, and your partners in capturing
            life&apos;s most precious moments through photography, videography,
            and live performances.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/inquiry"
              className="rounded bg-brand-red px-9 py-[14px] text-[0.8rem] font-semibold uppercase tracking-[1.5px] text-white hover:bg-brand-red-light hover:-translate-y-0.5 transition-[color,background-color,transform,box-shadow] duration-300 shadow-[0_4px_20px_rgba(196,30,42,0.3)]"
            >
              Book Here
            </Link>
            <a
              href="#services"
              className="rounded border border-white/20 px-9 py-[14px] text-[0.8rem] font-semibold uppercase tracking-[1.5px] text-white/90 hover:bg-white/5 hover:-translate-y-0.5 transition-[color,background-color,transform] duration-300"
            >
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT — Photo + text side by side ═══ */}
      <section id="about" className="py-[100px] px-6 scroll-mt-[70px]">
        <div className="mx-auto max-w-[1000px] grid gap-12 md:grid-cols-2 items-center">
          {/* Photo */}
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <Image
              src="/images/about.jpg"
              alt="Cook Media behind the scenes"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/60 to-transparent" />
          </div>
          {/* Text */}
          <div className="space-y-6">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[4px] text-brand-red">
              Welcome
            </p>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold font-heading leading-tight">
              Welcome to COOK<span className="text-brand-red">/</span>Media
            </h2>
            <div className="w-[60px] h-[2px] bg-brand-red" aria-hidden="true" />
            <p className="text-[1.05rem] text-brand-text-muted leading-[1.8]">
              Where we craft not just images, but the stories that will echo through your lifetime.
              Nestled in the heart of Erie, PA, our passion lies in immortalizing the pivotal chapters
              of your journey — be it the decisive moments of corporate success or the intimate whispers
              of &ldquo;I do.&rdquo;
            </p>
            <p className="text-[1.05rem] text-brand-text-muted leading-[1.8]">
              With our expert photography, cinematic videography, and the soul-stirring
              performances of the Lifethrumusic Band, we ensure that your memories are not only captured
              but also felt deeply.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES — Cards with images ═══ */}
      <section id="services" className="py-[100px] px-6 scroll-mt-[70px] bg-gradient-to-b from-brand-deep via-brand-dark to-brand-deep">
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center space-y-4 mb-16">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[4px] text-brand-red">
              What We Do
            </p>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold font-heading">Our Services</h2>
            <div className="w-[60px] h-[2px] bg-brand-red mx-auto" aria-hidden="true" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-lg border border-white/[0.06] bg-brand-card overflow-hidden transition-[border-color,transform,box-shadow] duration-300 hover:border-brand-red/30 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(196,30,42,0.1)]"
              >
                {/* Card image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-card to-transparent" />
                </div>
                {/* Card body */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold font-heading group-hover:text-brand-red transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-[0.85rem] text-brand-text-muted leading-relaxed">
                    {service.description}
                  </p>
                  <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-[1.5px] text-brand-red pt-1">
                    Learn More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PORTFOLIO — Full-bleed image with overlay ═══ */}
      <section className="relative py-[120px] px-6">
        <Image
          src="/images/commitment.jpg"
          alt="Cook Media portfolio showcase"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-deep/90 via-brand-deep/70 to-brand-deep/90" />
        <div className="relative mx-auto max-w-[1000px]">
          <div className="text-center space-y-4 mb-16">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[4px] text-brand-red">
              Why Us
            </p>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold font-heading">Our Commitment</h2>
            <div className="w-[60px] h-[2px] bg-brand-red mx-auto" aria-hidden="true" />
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {commitments.map((item) => (
              <div key={item.title} className="text-center space-y-4 rounded-lg border border-white/[0.06] bg-brand-card/80 backdrop-blur-sm p-8 transition-[border-color,transform] duration-300 hover:border-brand-red/20 hover:-translate-y-0.5">
                <span className="text-brand-red text-2xl" aria-hidden="true">{item.icon}</span>
                <h3 className="text-base font-bold font-heading">{item.title}</h3>
                <p className="text-[0.85rem] text-brand-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GALLERY — Photo strip ═══ */}
      <section className="py-[100px] px-6 bg-gradient-to-b from-brand-deep via-brand-dark to-brand-deep">
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center space-y-4 mb-16">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[4px] text-brand-red">
              Our Work
            </p>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold font-heading">Recent Projects</h2>
            <div className="w-[60px] h-[2px] bg-brand-red mx-auto" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: "/images/hero-couple.jpg", alt: "Jamale and Autumn wedding" },
              { src: "/images/service-events.jpg", alt: "Event photography" },
              { src: "/images/about.jpg", alt: "Behind the scenes" },
              { src: "/images/portfolio.jpg", alt: "Live performance" },
            ].map((img) => (
              <div key={img.src} className="relative aspect-square rounded-lg overflow-hidden group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="py-[100px] px-6 scroll-mt-[70px]">
        <div className="mx-auto max-w-[700px]">
          <div className="text-center space-y-4 mb-16">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[4px] text-brand-red">
              Questions
            </p>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold font-heading">FAQ&apos;s</h2>
            <div className="w-[60px] h-[2px] bg-brand-red mx-auto" aria-hidden="true" />
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-lg border border-white/[0.06] bg-brand-card transition-[border-color] duration-300 hover:border-brand-red/20"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-[0.9rem] font-semibold list-none">
                  {faq.q}
                  <span aria-hidden="true" className="text-brand-red text-lg ml-4 group-open:rotate-45 transition-transform duration-300">
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
      <section id="contact" className="py-[100px] px-6 scroll-mt-[70px] bg-gradient-to-b from-brand-deep via-brand-dark to-brand-deep">
        <div className="mx-auto max-w-[600px] text-center space-y-8">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[4px] text-brand-red">
            Get in Touch
          </p>
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold font-heading">
            Let&apos;s Create Something Together
          </h2>
          <div className="w-[60px] h-[2px] bg-brand-red mx-auto" aria-hidden="true" />
          <p className="text-[1.05rem] text-brand-text-muted leading-[1.8]">
            Tell us about your event and we&apos;ll take it from there. We review your details,
            send a custom proposal tailored to your needs, and once you approve, we lock in your date.
          </p>
          <Link
            href="/inquiry"
            className="inline-block rounded bg-brand-red px-9 py-[14px] text-[0.8rem] font-semibold uppercase tracking-[1.5px] text-white hover:bg-brand-red-light hover:-translate-y-0.5 transition-[color,background-color,transform,box-shadow] duration-300 shadow-[0_4px_20px_rgba(196,30,42,0.3)]"
          >
            Book Here
          </Link>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4 text-sm text-brand-text-muted">
            <a href="mailto:corey@cook-media.com" className="hover:text-brand-red transition-colors duration-300">
              corey@cook-media.com
            </a>
            <a href="tel:+18145662733" className="hover:text-brand-red transition-colors duration-300">
              (814) 566-2733
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-white/[0.06] bg-black py-16 px-6">
        <div className="mx-auto max-w-[800px] text-center space-y-6">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/images/logo-light.png" alt="" width={28} height={28} className="rounded-sm" />
            <span className="text-xl font-black font-heading tracking-tight">
              COOK<span className="text-brand-red">/</span>Media
            </span>
          </Link>
          <p className="text-[0.9rem] text-brand-text-muted leading-relaxed max-w-xl mx-auto">
            Your media partner for photography, videography, and live performances.
            Based in Erie, PA — ready to bring our artistry wherever your story unfolds.
          </p>
          <div className="w-[60px] h-[2px] bg-brand-red mx-auto" aria-hidden="true" />
          <p className="text-[0.7rem] text-brand-text-muted/60 tracking-wide">
            Cook Media LLC &middot; Erie, PA &middot; corey@cook-media.com
          </p>
          <div className="flex justify-center gap-8 pt-2">
            <Link href="/inquiry" className="text-[0.7rem] font-medium uppercase tracking-[2px] text-brand-text-muted hover:text-brand-red transition-colors duration-300">
              Book a Service
            </Link>
            <Link href="/admin" className="text-[0.7rem] font-medium uppercase tracking-[2px] text-brand-text-muted hover:text-brand-red transition-colors duration-300">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
