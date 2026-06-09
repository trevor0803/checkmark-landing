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

          {/* Right — credibility card */}
          <div className="relative">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">
                Why businesses choose us
              </p>
              <ul className="mt-5 space-y-4">
                {[
                  "Zero upfront cost — we only get paid when you do",
                  "20+ years of professional revenue recovery",
                  "Ethical, reputation-safe collection approach",
                  "Specialists in B2B accounts receivable",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-green/20">
                      <Check className="h-4 w-4 fill-brand-green" />
                    </span>
                    <span className="text-white/85">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-3xl font-extrabold text-white">$0</p>
                <p className="text-sm text-white/60">
                  upfront. You only pay if we recover your money.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TRUST BAR ===================== */}
      <section className="border-y border-navy/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-8 lg:flex-row lg:gap-8 lg:py-6">
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

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="bg-white py-16 sm:py-20">
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
