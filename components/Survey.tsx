"use client";

import { useState } from "react";
import { CONFIG } from "@/lib/config";

/* ----------------------------------------------------------------------------
   Types & shared option sets
---------------------------------------------------------------------------- */

type Answers = {
  isLandlord: "" | "yes" | "no";
  amountOwed: string;
  numAccounts: string;
  fullName: string;
  email: string;
  phone: string;
  zip: string;
  company: string;
};

const INITIAL_ANSWERS: Answers = {
  isLandlord: "",
  amountOwed: "",
  numAccounts: "",
  fullName: "",
  email: "",
  phone: "",
  zip: "",
  company: "",
};

const AMOUNT_OPTIONS = ["$0 – $1,000", "$1,000 – $10,000", "$10,000+"];
const ACCOUNT_OPTIONS = ["1", "2 – 10", "10 – 50", "50+"];

/* The numbered survey steps (landlord disqualification is handled separately). */
const TOTAL_STEPS = 4;

/* ----------------------------------------------------------------------------
   Validation helpers (client-side)
---------------------------------------------------------------------------- */

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

// Accepts US-style phone numbers; requires 10–11 digits.
const isValidPhone = (v: string) => {
  const digits = v.replace(/\D/g, "");
  return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
};

const isValidZip = (v: string) => /^\d{5}(-\d{4})?$/.test(v.trim());

/* ----------------------------------------------------------------------------
   Small presentational helpers
---------------------------------------------------------------------------- */

function ProgressBar({ step }: { step: number }) {
  const pct = Math.round((step / TOTAL_STEPS) * 100);
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between text-sm font-medium text-navy/60">
        <span>
          Step {step} of {TOTAL_STEPS}
        </span>
        <span>{pct}% complete</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-navy/10">
        <div
          className="h-full rounded-full bg-brand-green transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl border-2 px-5 py-4 text-left text-lg font-semibold transition-all active:scale-[0.99] ${
        selected
          ? "border-brand-green bg-brand-green/10 text-navy"
          : "border-navy/15 bg-white text-navy hover:border-brand-green hover:bg-brand-green/5"
      }`}
    >
      <span>{label}</span>
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
          selected ? "border-brand-green bg-brand-green" : "border-navy/25"
        }`}
      >
        {selected && (
          <svg viewBox="0 0 20 20" className="h-4 w-4 fill-white">
            <path d="M7.5 13.5l-3-3 1.4-1.4 1.6 1.6 4.6-4.6L13.5 7z" />
          </svg>
        )}
      </span>
    </button>
  );
}

function QuestionShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-step" key={title}>
      <h3 className="text-2xl font-bold leading-tight text-navy sm:text-3xl">
        {title}
      </h3>
      {subtitle && <p className="mt-2 text-navy/60">{subtitle}</p>}
      <div className="mt-6 space-y-3">{children}</div>
    </div>
  );
}

/* ----------------------------------------------------------------------------
   Main Survey component
---------------------------------------------------------------------------- */

export default function Survey() {
  // step: 1..4 = questions. Special string states for terminal screens.
  const [step, setStep] = useState<number>(1);
  const [screen, setScreen] = useState<"survey" | "landlord" | "thankyou">(
    "survey"
  );
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const update = (patch: Partial<Answers>) =>
    setAnswers((a) => ({ ...a, ...patch }));

  const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  /* Q1 — landlord conditional logic */
  const handleLandlord = (value: "yes" | "no") => {
    update({ isLandlord: value });
    if (value === "yes") {
      setScreen("landlord"); // dead-end, no submission
    } else {
      goNext();
    }
  };

  /* Q4 — validate contact fields */
  const validateContact = () => {
    const e: Record<string, string> = {};
    if (!answers.fullName.trim()) e.fullName = "Please enter your full name.";
    if (!answers.email.trim()) e.email = "Please enter your email.";
    else if (!isValidEmail(answers.email))
      e.email = "Please enter a valid email address.";
    if (!answers.phone.trim()) e.phone = "Please enter your phone number.";
    else if (!isValidPhone(answers.phone))
      e.phone = "Please enter a valid 10-digit phone number.";
    if (!answers.zip.trim()) e.zip = "Please enter your ZIP code.";
    else if (!isValidZip(answers.zip)) e.zip = "Please enter a valid ZIP code.";
    if (!answers.company.trim()) e.company = "Please enter your company name.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* Final submit */
  const handleSubmit = async () => {
    if (!validateContact()) return;
    setSubmitting(true);
    setSubmitError("");

    const payload = {
      isLandlord: answers.isLandlord,
      amountOwed: answers.amountOwed,
      numAccounts: answers.numAccounts,
      fullName: answers.fullName.trim(),
      email: answers.email.trim(),
      phone: answers.phone.trim(),
      zip: answers.zip.trim(),
      company: answers.company.trim(),
      submittedAt: new Date().toISOString(),
      source: "meta-landing",
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);

      // Fire Meta Pixel "Lead" conversion — qualified leads ONLY.
      // (Not fired on the landlord disqualification path.)
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }

      setScreen("thankyou");
    } catch (err) {
      console.error(err);
      setSubmitError(
        "Something went wrong submitting your details. Please try again or call us directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* -------------------------------------------------------------------------
     Terminal screen: Landlord disqualification (dead-end, branded)
  ------------------------------------------------------------------------- */
  if (screen === "landlord") {
    return (
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-card sm:p-10">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-navy/5">
          <svg viewBox="0 0 24 24" className="h-8 w-8 fill-navy/50">
            <path d="M12 2L2 7v6c0 5 3.4 8.7 10 11 6.6-2.3 10-6 10-11V7L12 2zm0 6a1.5 1.5 0 011.5 1.5c0 .8-.5 1.2-1 1.6-.4.3-.5.5-.5.9v.5h-2v-.7c0-1 .6-1.5 1.1-1.9.4-.3.4-.4.4-.6A.5.5 0 0012 9.5a.6.6 0 00-.6.5h-2A2.5 2.5 0 0112 8zm-1 7h2v2h-2v-2z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-navy">
          We currently don&apos;t assist landlords at this time.
        </h3>
        <p className="mt-3 text-navy/60">
          Thank you for your interest in Checkmark Collections. Our recovery
          services are tailored to business-to-business accounts receivable, so
          we&apos;re not able to help with rent or tenant obligations right now.
        </p>
        <a
          href={CONFIG.LANDLORD_REDIRECT_URL}
          className="mt-7 inline-flex items-center justify-center rounded-xl bg-navy px-7 py-3.5 text-base font-semibold text-white transition hover:bg-navy-light"
        >
          Back to our main site
        </a>
      </div>
    );
  }

  /* -------------------------------------------------------------------------
     Terminal screen: Thank you / confirmation
  ------------------------------------------------------------------------- */
  if (screen === "thankyou") {
    return (
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-card sm:p-10">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/15">
          <svg viewBox="0 0 24 24" className="h-9 w-9 fill-brand-green">
            <path d="M9 16.2l-3.5-3.5L4 14.2 9 19.2l11-11-1.4-1.4z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-navy sm:text-3xl">
          Thank you — we&apos;ve got your details.
        </h3>
        <p className="mt-3 text-navy/60">
          A member of our recovery team will reach out shortly to discuss your
          accounts. Remember: <strong className="text-navy">no recovery,
          no fee</strong> — you pay nothing unless we collect.
        </p>
        <div className="mt-6 rounded-xl bg-navy/5 p-4 text-sm text-navy/70">
          Need to talk sooner? Call us at{" "}
          <a
            href={CONFIG.PHONE_HREF}
            className="font-bold text-brand-blue underline"
          >
            {CONFIG.PHONE_DISPLAY}
          </a>
          .
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------------------
     Survey (steps 1–4)
  ------------------------------------------------------------------------- */
  return (
    <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-card sm:p-9">
      <ProgressBar step={step} />

      {/* Q1 — Landlord */}
      {step === 1 && (
        <QuestionShell
          title="Are you a landlord trying to collect past due rent or tenant obligations?"
          subtitle="This helps us make sure we're the right fit for you."
        >
          <OptionButton
            label="Yes"
            selected={answers.isLandlord === "yes"}
            onClick={() => handleLandlord("yes")}
          />
          <OptionButton
            label="No"
            selected={answers.isLandlord === "no"}
            onClick={() => handleLandlord("no")}
          />
        </QuestionShell>
      )}

      {/* Q2 — Amount owed */}
      {step === 2 && (
        <QuestionShell title="How much money are you currently owed?">
          {AMOUNT_OPTIONS.map((opt) => (
            <OptionButton
              key={opt}
              label={opt}
              selected={answers.amountOwed === opt}
              onClick={() => {
                update({ amountOwed: opt });
                goNext();
              }}
            />
          ))}
        </QuestionShell>
      )}

      {/* Q3 — Number of accounts */}
      {step === 3 && (
        <QuestionShell title="How many different accounts owe you money?">
          {ACCOUNT_OPTIONS.map((opt) => (
            <OptionButton
              key={opt}
              label={opt}
              selected={answers.numAccounts === opt}
              onClick={() => {
                update({ numAccounts: opt });
                goNext();
              }}
            />
          ))}
        </QuestionShell>
      )}

      {/* Q4 — Contact capture */}
      {step === 4 && (
        <QuestionShell
          title="Where should we send your recovery details?"
          subtitle="Enter your contact info and our team will be in touch."
        >
          <div className="space-y-4">
            <Field
              label="Full name"
              value={answers.fullName}
              error={errors.fullName}
              onChange={(v) => update({ fullName: v })}
              placeholder="Jane Smith"
              autoComplete="name"
            />
            <Field
              label="Email"
              type="email"
              value={answers.email}
              error={errors.email}
              onChange={(v) => update({ email: v })}
              placeholder="jane@company.com"
              autoComplete="email"
            />
            <Field
              label="Phone number"
              type="tel"
              value={answers.phone}
              error={errors.phone}
              onChange={(v) => update({ phone: v })}
              placeholder="(555) 123-4567"
              autoComplete="tel"
            />
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="ZIP code"
                value={answers.zip}
                error={errors.zip}
                onChange={(v) => update({ zip: v })}
                placeholder="33401"
                autoComplete="postal-code"
                inputMode="numeric"
              />
              <Field
                label="Company name"
                value={answers.company}
                error={errors.company}
                onChange={(v) => update({ company: v })}
                placeholder="Acme Inc."
                autoComplete="organization"
              />
            </div>
          </div>

          {submitError && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {submitError}
            </p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="mt-6 flex w-full items-center justify-center rounded-xl bg-brand-green px-6 py-4 text-lg font-bold text-white shadow-lg shadow-brand-green/25 transition hover:bg-brand-greenDark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Get My Free Recovery Review"}
          </button>
          <p className="mt-3 text-center text-xs text-navy/50">
            No recovery, no fee. By submitting you agree to be contacted about
            your accounts.
          </p>
        </QuestionShell>
      )}

      {/* Back navigation (not on Q1, not on terminal screens) */}
      {step > 1 && (
        <button
          type="button"
          onClick={goBack}
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-navy/50 transition hover:text-navy"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
            <path d="M12.5 15l-5-5 5-5 1.4 1.4L10.3 10l3.6 3.6z" />
          </svg>
          Back
        </button>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------------------
   Input field with inline validation error
---------------------------------------------------------------------------- */

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "text" | "tel" | "email";
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
      </label>
      <input
        type={type}
        value={value}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border-2 bg-white px-4 py-3.5 text-base text-navy outline-none transition placeholder:text-navy/30 focus:border-brand-green ${
          error ? "border-red-400" : "border-navy/15"
        }`}
      />
      {error && <p className="mt-1 text-sm font-medium text-red-600">{error}</p>}
    </div>
  );
}
