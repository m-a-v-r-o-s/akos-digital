"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import { Icon } from "@/components/Icons";
import {
  ui,
  needsOptions,
  situationOptions,
  budgetOptions,
  timelineOptions,
  contactMethodOptions,
  TOTAL_STEPS,
  type Choice,
} from "@/lib/requestForm";
import Honeypot from "@/components/Honeypot";
import { HONEYPOT_FIELD } from "@/lib/leadGuard";
import { SEVENMERO_URL } from "@/lib/links";
import type { Lang } from "@/lib/i18n";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Form = {
  name: string;
  needs: string[];
  businessName: string;
  businessAbout: string;
  situation: string;
  budget: string;
  timeline: string;
  details: string;
  email: string;
  phone: string;
  contactMethod: string;
  consent: boolean;
};

const emptyForm: Form = {
  name: "",
  needs: [],
  businessName: "",
  businessAbout: "",
  situation: "",
  budget: "",
  timeline: "",
  details: "",
  email: "",
  phone: "",
  contactMethod: "email",
  consent: false,
};

export default function RequestWizard() {
  const { lang } = useLanguage();
  const t = ui[lang];

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(emptyForm);
  const [error, setError] = useState("");
  const [nudge, setNudge] = useState<"none" | "open" | "dismissed">("none");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const set = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const goNext = () => {
    setError("");
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };
  const goBack = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  };

  /** Single-choice steps: record the answer, then glide forward. */
  const pickSingle = <K extends keyof Form>(key: K, value: Form[K]) => {
    set(key, value);
    setError("");
    setTimeout(goNext, 280);
  };

  /**
   * Budget is the one honest signal for "this is a 7μερο job, not a quote".
   * Under €1,000 nothing bespoke fits, so instead of gliding on to the next
   * step the wizard stops once and offers the fixed-price route. Only once:
   * re-picking the same answer after dismissing it should not nag.
   */
  const pickBudget = (value: string) => {
    set("budget", value);
    setError("");
    if (value === "under_1k" && nudge === "none") setNudge("open");
    else setTimeout(goNext, 280);
  };

  const dismissNudge = () => {
    setNudge("dismissed");
    goNext();
  };

  const toggleNeed = (value: string) => {
    setError("");
    setForm((f) => ({
      ...f,
      needs: f.needs.includes(value)
        ? f.needs.filter((n) => n !== value)
        : [...f.needs, value],
    }));
  };

  /** Validate the current step before advancing. Returns true if OK. */
  const validateStep = (): boolean => {
    switch (step) {
      case 0:
        if (!form.name.trim()) return fail(t.vRequired);
        return true;
      case 1:
        if (form.needs.length === 0) return fail(t.vPickAtLeastOne);
        return true;
      case 3:
        if (!form.situation) return fail(t.vPickOne);
        return true;
      case 4:
        if (!form.budget) return fail(t.vPickOne);
        return true;
      case 5:
        if (!form.timeline) return fail(t.vPickOne);
        return true;
      default:
        return true; // steps 2 & 6 are optional
    }
  };

  const fail = (msg: string) => {
    setError(msg);
    return false;
  };

  const handleNext = () => {
    if (validateStep()) goNext();
  };

  const submit = async () => {
    if (!EMAIL_RE.test(form.email.trim())) return setError(t.vEmail);
    if (!form.consent) return setError(t.vConsent);

    setError("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          lang,
          // Only set when the 7μερο card was shown and waved off, so the
          // email says "this one saw the cheap route and still wanted a quote".
          ...(nudge === "dismissed" && { extra: { sevenmero_offer: "declined" } }),
          [HONEYPOT_FIELD]: hp,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") return <SuccessScreen />;

  const progress = ((step + 1) / TOTAL_STEPS) * 100;
  const isLast = step === TOTAL_STEPS - 1;
  const optionalStep = step === 2 || step === 6;

  return (
    <div className="w-full max-w-xl">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs tracking-widest uppercase text-accent">
            {t.step} {step + 1} <span className="text-stone-dark">{t.of}</span> {TOTAL_STEPS}
          </span>
          {optionalStep && (
            <span className="font-mono text-[0.65rem] tracking-widest uppercase text-stone-dark">
              {t.optional}
            </span>
          )}
        </div>
        <div className="h-px w-full bg-stone-dark/60 overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step body — re-animates on each step change */}
      <div key={step} className="fade-up min-h-[18rem]">
        {step === 0 && (
          <Question title={t.qName} hint={t.qNameHint}>
            <TextField
              value={form.name}
              onChange={(v) => set("name", v)}
              placeholder={lang === "en" ? "Your name" : "Το όνομά σου"}
              onEnter={handleNext}
              autoFocus
            />
          </Question>
        )}

        {step === 1 && (
          <Question title={t.qNeeds} hint={t.qNeedsHint}>
            <ChoiceGrid
              options={needsOptions}
              lang={lang}
              isSelected={(v) => form.needs.includes(v)}
              onSelect={toggleNeed}
              multi
            />
          </Question>
        )}

        {step === 2 && (
          <Question title={t.qBusiness}>
            <div className="space-y-5">
              <LabeledField label={t.qBusinessName}>
                <TextField
                  value={form.businessName}
                  onChange={(v) => set("businessName", v)}
                  placeholder={lang === "en" ? "e.g. Kyma Villa" : "π.χ. Kyma Villa"}
                  autoFocus
                />
              </LabeledField>
              <LabeledField label={t.qBusinessAbout}>
                <TextArea
                  value={form.businessAbout}
                  onChange={(v) => set("businessAbout", v)}
                  placeholder={lang === "en" ? "What you do, who you serve…" : "Τι κάνεις, σε ποιους απευθύνεσαι…"}
                  rows={2}
                />
              </LabeledField>
            </div>
          </Question>
        )}

        {step === 3 && (
          <Question title={t.qSituation}>
            <ChoiceGrid
              options={situationOptions}
              lang={lang}
              isSelected={(v) => form.situation === v}
              onSelect={(v) => pickSingle("situation", v)}
            />
          </Question>
        )}

        {step === 4 && (
          <Question title={t.qBudget} hint={t.qBudgetHint}>
            <ChoiceGrid
              options={budgetOptions}
              lang={lang}
              isSelected={(v) => form.budget === v}
              onSelect={pickBudget}
            />
            {nudge === "open" && <SevenMeroNudge t={t} onStay={dismissNudge} />}
          </Question>
        )}

        {step === 5 && (
          <Question title={t.qTimeline}>
            <ChoiceGrid
              options={timelineOptions}
              lang={lang}
              isSelected={(v) => form.timeline === v}
              onSelect={(v) => pickSingle("timeline", v)}
            />
          </Question>
        )}

        {step === 6 && (
          <Question title={t.qDetails} hint={t.qDetailsHint}>
            <TextArea
              value={form.details}
              onChange={(v) => set("details", v)}
              placeholder={t.qDetailsPlaceholder}
              rows={5}
              autoFocus
            />
          </Question>
        )}

        {step === 7 && (
          <Question title={t.qContact}>
            <div className="space-y-5">
              <LabeledField label={t.fEmail}>
                <TextField
                  type="email"
                  value={form.email}
                  onChange={(v) => set("email", v)}
                  placeholder="you@email.com"
                  autoFocus
                />
              </LabeledField>
              <LabeledField label={t.fPhone}>
                <TextField
                  type="tel"
                  value={form.phone}
                  onChange={(v) => set("phone", v)}
                  placeholder="+30 …"
                />
              </LabeledField>
              <LabeledField label={t.fContactMethod}>
                <ChoiceGrid
                  options={contactMethodOptions}
                  lang={lang}
                  isSelected={(v) => form.contactMethod === v}
                  onSelect={(v) => set("contactMethod", v)}
                  compact
                />
              </LabeledField>

              <label className="flex items-start gap-3 cursor-pointer group pt-1">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => {
                    set("consent", e.target.checked);
                    setError("");
                  }}
                  className="mt-1 h-4 w-4 shrink-0 [accent-color:rgb(var(--accent-rgb))] cursor-pointer"
                />
                <span className="text-sm text-stone-light leading-relaxed">
                  {t.consent}
                  <span className="block text-xs text-stone mt-1">{t.consentNote}</span>
                </span>
              </label>

              <Honeypot value={hp} onChange={setHp} />
            </div>
          </Question>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="mt-5 text-sm text-rust font-medium">{error}</p>
      )}
      {status === "error" && (
        <div className="mt-5 rounded-lg border border-rust/40 bg-rust/10 px-4 py-3">
          <p className="text-sm font-semibold text-paper">{t.errorTitle}</p>
          <p className="text-xs text-stone-light mt-1 leading-relaxed">{t.errorBody}</p>
        </div>
      )}

      {/* Controls */}
      <div className="mt-10 flex items-center justify-between gap-4">
        <button
          onClick={goBack}
          disabled={step === 0}
          className="font-mono text-xs tracking-widest uppercase text-stone hover:text-paper transition-colors disabled:opacity-0 disabled:pointer-events-none"
        >
          ← {t.back}
        </button>

        <div className="flex items-center gap-5">
          {optionalStep && (
            <button
              onClick={goNext}
              className="font-mono text-xs tracking-widest uppercase text-stone hover:text-paper transition-colors"
            >
              {t.skip}
            </button>
          )}
          {isLast ? (
            <button
              onClick={submit}
              disabled={status === "submitting"}
              className="cta-button disabled:opacity-60"
            >
              {status === "submitting" ? t.sending : t.submit}
              {status !== "submitting" && (
                <span className="arrow-icon">
                  <Icon name="arrow" size={13} />
                </span>
              )}
            </button>
          ) : (
            <button onClick={handleNext} className="cta-button">
              {t.next}
              <span className="arrow-icon">
                <Icon name="arrow" size={13} />
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Building blocks ──────────────────────────────────────────────── */

function Question({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-paper leading-snug mb-2">
        {title}
      </h2>
      {hint && <p className="text-sm text-stone mb-7">{hint}</p>}
      <div className={hint ? "" : "mt-7"}>{children}</div>
    </div>
  );
}

function LabeledField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-mono text-[0.65rem] tracking-widest uppercase text-stone-light mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function TextField({
  value,
  onChange,
  placeholder,
  type = "text",
  autoFocus,
  onEnter,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoFocus?: boolean;
  onEnter?: () => void;
}) {
  return (
    <input
      type={type}
      value={value}
      autoFocus={autoFocus}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && onEnter) {
          e.preventDefault();
          onEnter();
        }
      }}
      placeholder={placeholder}
      className="field-input"
    />
  );
}

function TextArea({
  value,
  onChange,
  placeholder,
  rows = 3,
  autoFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  autoFocus?: boolean;
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      autoFocus={autoFocus}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="field-input resize-none"
    />
  );
}

function ChoiceGrid({
  options,
  lang,
  isSelected,
  onSelect,
  multi = false,
  compact = false,
}: {
  options: Choice[];
  lang: "en" | "el";
  isSelected: (value: string) => boolean;
  onSelect: (value: string) => void;
  multi?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "flex flex-wrap gap-2.5" : "grid gap-2.5 sm:grid-cols-2"}>
      {options.map((opt) => {
        const selected = isSelected(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={`choice-option text-left ${selected ? "choice-option-selected" : ""} ${
              compact ? "choice-option-compact" : ""
            }`}
          >
            <span className="flex items-center gap-3">
              {multi && (
                <span className={`choice-check ${selected ? "choice-check-on" : ""}`}>
                  {selected && <Icon name="arrow" size={10} />}
                </span>
              )}
              <span className="min-w-0">
                <span className="block text-sm text-paper leading-snug">{opt.label[lang]}</span>
                {opt.hint && !compact && (
                  <span className="block text-xs text-stone mt-0.5">{opt.hint[lang]}</span>
                )}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function SuccessScreen() {
  const { lang } = useLanguage();
  const t = ui[lang];
  return (
    <div className="w-full max-w-xl fade-up text-center sm:text-left">
      <div className="deco-rule mb-6 mx-auto sm:mx-0" />
      <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">✦</p>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-paper leading-tight mb-4">
        {t.successTitle}
      </h2>
      <p className="text-base text-stone-light leading-relaxed mb-10 max-w-md mx-auto sm:mx-0">
        {t.successBody}
      </p>
      <Link href={`/${lang}`} className="cta-button inline-flex">
        {t.backHome}
        <span className="arrow-icon">
          <Icon name="arrow" size={13} />
        </span>
      </Link>
    </div>
  );
}

/**
 * Shown once, in place, when the budget answer says the bespoke route does not
 * fit. It offers the sister site without hijacking the wizard: the visitor can
 * carry on to a real quote with one click, and that refusal is what gets
 * recorded, so the nudge can be judged on whether it actually helps anyone.
 *
 * Price and delivery live on 7μερο.ai. They are repeated here only because a
 * nudge with no number is not a nudge; if they change there, change them here.
 */
function SevenMeroNudge({
  t,
  onStay,
}: {
  t: (typeof ui)[Lang];
  onStay: () => void;
}) {
  return (
    <div className="fade-up mt-8 rounded-2xl border border-accent/25 bg-accent/[0.04] p-5 sm:p-6">
      <p className="font-mono text-[0.65rem] tracking-widest uppercase text-accent mb-2">
        {t.nudgeEyebrow}
      </p>
      <h3 className="font-display text-xl font-semibold text-paper mb-2">
        {t.nudgeTitle}
      </h3>
      <p className="text-sm text-stone-light leading-relaxed mb-5">{t.nudgeBody}</p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={SEVENMERO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
        >
          {t.nudgeGo}
          <span className="arrow-icon">
            <Icon name="arrow" size={13} />
          </span>
        </a>
        <button
          type="button"
          onClick={onStay}
          className="font-mono text-xs tracking-widest uppercase text-stone hover:text-accent-light transition-colors duration-200 underline underline-offset-4"
        >
          {t.nudgeStay}
        </button>
      </div>
    </div>
  );
}
