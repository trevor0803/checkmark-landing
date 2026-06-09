import Survey from "@/components/Survey";
import { CONFIG } from "@/lib/config";

/* ----------------------------------------------------------------------------
   Small inline icon set (no external dependencies)
---------------------------------------------------------------------------- */
function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M9 16.2l-3.5-3.5L4 14.2 9 19.2l11-11-1.4-1.4z" />
    </svg>
  );
}

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
    </svg>
  );
}

/* ----------------------------------------------------------------------------
   Stock photography (Unsplash CDN — verified loading, royalty-free).
   Swap any of these for your own brand/team photos later.
---------------------------------------------------------------------------- */
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80",
  about:
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
} as const;

/* ----------------------------------------------------------------------------
   Testimonials — REPRESENTATIVE placeholder content.
   Replace with real, client-approved quotes before running paid traffic.
---------------------------------------------------------------------------- */
const TESTIMONIALS = [
  {
    quote:
      "We'd written off nearly $40,000 in unpaid invoices. Checkmark recovered the majority of it within a few months — and we never paid a dime until the money was in our account.",
    name: "Karen M.",
    title: "Controller, Commercial HVAC Supplier",
    photo:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "What impressed me most was how professional they were with our customers. They got us paid without burning the relationships we'd spent years building. Truly a partner, not a bulldog.",
    name: "David R.",
    title: "Owner, Wholesale Distribution",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "After 20+ years in business, I've dealt with plenty of collection agencies. Checkmark is in a different league — responsive, ethical, and they actually get results. Highly recommend.",
    name: "Marcus T.",
    title: "CFO, B2B Services Firm",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
];

const VALUE_PROPS = [
  {
    title: "No Recovery, No Fee",
    body: "You pay absolutely nothing unless we collect. Our success is tied directly to yours — zero upfront cost, zero risk.",
  },
  {
    title: "20+ Years of Experience",
    body: "Founded in 2007, we've spent two decades recovering revenue for businesses with a proven, professional process.",
  },
  {
    title: "Ethical & Non-Aggressive",
    body: "We protect your reputation. Our approach is firm but respectful — preserving relationships while getting you paid.",
  },
  {
    title: "B2B Recovery Specialists",
    body: "We focus on business-to-business accounts receivable. It's what we do best, and it's all we do.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Submit your details",
    body: "Tell us how much you're owed and how many accounts are outstanding. It takes under 60 seconds.",
  },
  {
    n: "2",
    title: "We pursue recovery",
    body: "Our experienced team goes to work — professionally and ethically pursuing what you're owed.",
  },
  {
    n: "3",
    title: "You get paid",
    body: "We collect your money. And remember — you only pay us if we successfully recover. No recovery, no fee.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* ===================== TOP BAR ===================== */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 backdrop-blur supports-[backdrop-filter]:bg-navy/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
          <img
            src="/assets/logo-white.png"
            alt="Checkmark Collections"
            className="h-9 w-auto sm:h-10"
          />
          <a
            href={CONFIG.PHONE_HREF}
            className="hidden items-center gap-2 text-sm font-semibold text-white sm:flex"
          >
            <span className="text-white/60">Call us:</span>
            <span className="text-brand-green">{CONFIG.PHONE_DISPLAY}</span>
          </a>
        </div>
      </header>

      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy to-navy-dark">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #16b378 0, transparent 40%), radial-gradient(circle at 80% 0%, #1e4d8c 0, transparent 45%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:py-20 lg:grid-cols-2 lg:items-center">
          {/* Left — copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-4 py-1.5 text-sm font-semibold text-brand-green">
              <Check className="h-4 w-4 fill-brand-green" />
              No Recovery, No Fee — Guaranteed
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Get paid what
              <br />
              you&apos;re owed.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">
              Checkmark Collections recovers your past-due accounts
              receivable — professionally and ethically. You pay{" "}
              <strong className="text-white">nothing unless we collect</strong>.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#survey"
                className="inline-flex items-center justify-center rounded-xl bg-brand-green px-8 py-4 text-lg font-bold text-white shadow-lg shadow-brand-green/30 transition hover:bg-brand-greenDark"
              >
                Start My Free Recovery Review
              </a>
              <a
                href={CONFIG.PHONE_HREF}
                className="inline-flex items-center justify-center rounded-xl border-2 border-white/25 px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
              >
                {CONFIG.PHONE_DISPLAY}
              </a>
            </div>

            <p className="mt-5 text-sm text-white/50">
              Trusted by businesses since 2007 · ACA International Member
            </p>
          </div>

          {/* Right — hero photo with floating stat cards */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
              <img
                src={IMAGES.hero}
                alt="Business professionals celebrating a successful revenue recovery"
                className="h-[340px] w-full object-cover sm:h-[420px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent" />
            </div>

            {/* Floating "$0 upfront" card */}
            <div className="absolute -bottom-5 -left-3 rounded-xl border border-white/10 bg-white p-4 shadow-xl sm:-left-6 sm:p-5">
              <p className="text-3xl font-extrabold text-brand-green sm:text-4xl">
                $0
              </p>
              <p className="text-xs font-medium text-navy/60 sm:text-sm">
                upfront — pay only
                <br />
                when we recover
              </p>
            </div>

            {/* Floating rating card */}
            <div className="absolute -right-3 -top-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white px-4 py-3 shadow-xl sm:-right-5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-sm font-bold text-navy">A+ Rated</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TRUST BAR ===================== */}
      <section className="border-y border-navy/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 pb-8 pt-12 lg:flex-row lg:gap-8 lg:py-6">
          {/* BBB Accredited Business — A+ Rating badge */}
          <div className="flex flex-shrink-0 items-center gap-4 lg:border-r lg:border-navy/10 lg:pr-8">
            <img
              src="/assets/bbb.jpg"
              alt="BBB Accredited Business — A+ Rating"
              width={150}
              height={54}
              className="h-auto w-[150px]"
            />
          </div>

          <div className="grid w-full grid-cols-2 gap-px md:grid-cols-4">
            {[
              { stat: "20+", label: "Years in business" },
              { stat: "2007", label: "Established" },
              { stat: "ACA", label: "International Member" },
              { stat: "FCA", label: "Florida Collectors Assn." },
            ].map((t) => (
              <div key={t.label} className="px-4 py-2 text-center">
                <p className="text-2xl font-extrabold text-brand-blue sm:text-3xl">
                  {t.stat}
                </p>
                <p className="mt-1 text-sm font-medium text-navy/55">
                  {t.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== VALUE PROPS ===================== */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-navy sm:text-4xl">
              A collection partner you can actually trust
            </h2>
            <p className="mt-3 text-lg text-navy/60">
              Professional, results-focused revenue recovery — without the
              aggressive tactics that damage your reputation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_PROPS.map((vp) => (
              <div
                key={vp.title}
                className="rounded-2xl bg-white p-6 shadow-card transition hover:shadow-cardHover"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green/15">
                  <Check className="h-6 w-6 fill-brand-green" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy">{vp.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/60">
                  {vp.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== NO RECOVERY NO FEE BAND ===================== */}
      <section className="bg-brand-green">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 text-center sm:py-14 lg:flex-row lg:justify-between lg:text-left">
          <div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              No Recovery, No Fee.
            </h2>
            <p className="mt-2 max-w-xl text-lg text-white/90">
              It&apos;s simple: if we don&apos;t collect your money, you
              don&apos;t pay us a cent. There&apos;s zero risk in finding out
              what we can recover for you.
            </p>
          </div>
          <a
            href="#survey"
            className="inline-flex flex-shrink-0 items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-brand-greenDark shadow-lg transition hover:bg-slate-50"
          >
            See What We Can Recover
          </a>
        </div>
      </section>

      {/* ===================== WHY CHECKMARK (image split) ===================== */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
          {/* Image with accent frame */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -left-4 -top-4 hidden h-full w-full rounded-2xl border-2 border-brand-green/30 lg:block" />
            <div className="relative overflow-hidden rounded-2xl shadow-card">
              <img
                src={IMAGES.about}
                alt="Checkmark Collections team reviewing accounts receivable"
                className="h-[360px] w-full object-cover sm:h-[440px]"
              />
            </div>
            {/* Founder credibility chip */}
            <div className="absolute -bottom-5 right-4 max-w-[230px] rounded-xl bg-navy p-4 shadow-xl lg:right-8">
              <p className="text-sm font-semibold text-white">
                Led by Melissa L. Nash
              </p>
              <p className="mt-1 text-xs text-white/60">
                30+ years in business finance & receivables recovery
              </p>
            </div>
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <span className="text-sm font-bold uppercase tracking-wider text-brand-green">
              Why Checkmark Collections
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-navy sm:text-4xl">
              A reputable partner who treats your business like their own
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy/65">
              Since 2007, we&apos;ve built our reputation on one principle:
              recovering your money the right way. As a proud member of{" "}
              <strong className="text-navy">ACA International</strong> and the{" "}
              <strong className="text-navy">
                Florida Collectors Association
              </strong>
              , we hold ourselves to the highest professional and ethical
              standards in the industry.
            </p>
            <ul className="mt-7 space-y-4">
              {[
                "BBB Accredited with an A+ Rating",
                "Two decades of proven B2B recovery results",
                "Firm, respectful tactics that protect your reputation",
                "No recovery, no fee — our incentives align with yours",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-green/15">
                    <Check className="h-4 w-4 fill-brand-green" />
                  </span>
                  <span className="font-medium text-navy/80">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#survey"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-navy px-7 py-3.5 text-base font-semibold text-white transition hover:bg-navy-light"
            >
              Get Your Free Recovery Review
            </a>
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-navy sm:text-4xl">
              How it works
            </h2>
            <p className="mt-3 text-lg text-navy/60">
              Three simple steps to recovering what you&apos;re owed.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="relative text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy text-xl font-bold text-white">
                  {s.n}
                </div>
                <h3 className="mt-5 text-xl font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-navy/60">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-amber-400" />
              ))}
            </div>
            <h2 className="text-3xl font-bold text-navy sm:text-4xl">
              Trusted by businesses across the country
            </h2>
            <p className="mt-3 text-lg text-navy/60">
              Real results from real companies who got paid what they were owed.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-2xl border border-navy/5 bg-slate-50 p-7 shadow-card"
              >
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="flex-1 text-navy/75">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-navy/10 pt-5">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-navy">{t.name}</p>
                    <p className="text-sm text-navy/55">{t.title}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-navy/40">
            Testimonials reflect the experiences of individual clients. Results
            vary by account.
          </p>
        </div>
      </section>

      {/* ===================== SURVEY ===================== */}
      <section id="survey" className="scroll-mt-20 bg-navy py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-4 py-1.5 text-sm font-semibold text-brand-green">
              <Check className="h-4 w-4 fill-brand-green" />
              No Recovery, No Fee
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              See what we can recover for you
            </h2>
            <p className="mt-3 text-lg text-white/70">
              Answer a few quick questions. It takes under a minute, and
              there&apos;s no obligation.
            </p>
          </div>

          <Survey />
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="bg-navy-dark text-white/70">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <img
                src="/assets/logo-white.png"
                alt="Checkmark Collections"
                className="h-11 w-auto"
              />
              <p className="mt-4 text-sm">
                We put the &ldquo;check&rdquo; into your business.
              </p>
              <p className="mt-2 text-sm font-semibold text-brand-green">
                #wefetchmoney
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-white">
                Contact
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    href={CONFIG.PHONE_HREF}
                    className="hover:text-brand-green"
                  >
                    {CONFIG.PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONFIG.EMAIL}`}
                    className="hover:text-brand-green"
                  >
                    {CONFIG.EMAIL}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-white">
                West Palm Beach, FL
              </h4>
              <p className="mt-3 text-sm leading-relaxed">
                Serving businesses nationwide from South Florida.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-white">
                Charlotte, NC
              </h4>
              <p className="mt-3 text-sm leading-relaxed">
                A second location supporting our clients across the Carolinas.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Checkmark Collections. All rights
              reserved.
            </p>
            <p>
              ACA International Member · Florida Collectors Association · Founded
              2007
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
