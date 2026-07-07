"use client";

import { useState } from "react";
import Link from "next/link";
import SpotlightWrapper from "@/components/SpotlightWrapper";
import LanguageToggle from "@/components/LanguageToggle";
import { Icon } from "@/components/Icons";
import { useLanguage } from "@/components/LanguageContext";
import {
  espaUi,
  companyTypeOptions,
  employeesOptions,
  priorFundingOptions,
  programOptions,
} from "@/lib/espa";
import type { Choice } from "@/lib/requestForm";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Form = {
  businessName: string;
  vat: string;
  kad: string;
  region: string;
  companyType: string;
  employees: string;
  priorFunding: string;
  program: string;
  goal: string;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
};

const empty: Form = {
  businessName: "",
  vat: "",
  kad: "",
  region: "",
  companyType: "",
  employees: "",
  priorFunding: "",
  program: "",
  goal: "",
  name: "",
  email: "",
  phone: "",
  consent: false,
};

export default function EspaPage() {
  const { lang } = useLanguage();
  const t = espaUi[lang];

  const [form, setForm] = useState<Form>(empty);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.name.trim() || !form.businessName.trim() || !form.email.trim())
      return setError(t.vRequired);
    if (!EMAIL_RE.test(form.email.trim())) return setError(t.vEmail);
    if (!form.consent) return setError(t.vConsent);

    setError("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          consent: form.consent,
          lang,
          source: "espa-assessment",
          needs: ["espa_website"],
          businessName: form.businessName,
          details: form.goal,
          contactMethod: "email",
          extra: {
            vat: form.vat,
            kad: form.kad,
            region: form.region,
            company_type: form.companyType,
            employees: form.employees,
            prior_funding: form.priorFunding,
            program: form.program,
          },
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <SpotlightWrapper className="espa-theme">
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 min-h-screen pb-24">
        {/* Header */}
        <header className="flex items-center justify-between py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors"
          >
            <span className="ornament">←</span>
            {t.back}
          </Link>
          <LanguageToggle />
        </header>

        {status === "success" ? (
          <div className="fade-up py-16">
            <div className="deco-rule mb-6" />
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-gold mb-4">✦</p>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-paper leading-tight mb-4">
              {t.successTitle}
            </h1>
            <p className="text-base text-stone-light leading-relaxed mb-10 max-w-md">
              {t.successBody}
            </p>
            <Link href="/" className="cta-button inline-flex">
              {t.backHome}
              <span className="arrow-icon">
                <Icon name="arrow" size={13} />
              </span>
            </Link>
          </div>
        ) : (
          <>
            {/* Hero */}
            <section className="fade-up pt-2 pb-12">
              <div className="inline-block bg-white rounded-lg p-2.5 mb-7 shadow-lg">
                <img src="/1915943-2048448176.jpg" alt="ΕΣΠΑ 2021-2027" loading="lazy" decoding="async" className="h-14 sm:h-16 w-auto block" />
              </div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-stone mb-5">
                {t.eyebrow}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-paper mb-6">
                {t.title}
              </h1>
              <div className="deco-rule mb-6" />
              <p className="text-base text-stone-light leading-relaxed max-w-3xl">{t.subtitle}</p>
            </section>

            {/* What is ESPA */}
            <section className="mb-12">
              <h2 className="section-heading !static mb-4">{t.whatTitle}</h2>
              <div className="space-y-4">
                {t.what.map((p, i) => (
                  <p key={i} className="text-sm text-stone leading-[1.85] max-w-3xl">
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {/* Covers + Steps */}
            <section className="grid sm:grid-cols-2 gap-4 mb-12">
              <div className="section-card">
                <h3 className="font-display font-semibold text-paper text-base mb-4">{t.coversTitle}</h3>
                <ul className="space-y-2.5">
                  {t.covers.map((c, i) => (
                    <li key={i} className="flex gap-3 text-sm text-stone leading-snug">
                      <span className="text-gold mt-0.5">✦</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="section-card">
                <h3 className="font-display font-semibold text-paper text-base mb-4">{t.stepsTitle}</h3>
                <ol className="space-y-4">
                  {t.steps.map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="font-mono text-xs text-gold shrink-0 mt-0.5">0{i + 1}</span>
                      <div>
                        <p className="text-sm text-paper font-medium leading-snug">{s.title}</p>
                        <p className="text-xs text-stone leading-relaxed mt-0.5">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <p className="text-xs text-stone leading-relaxed max-w-3xl mb-14 border-l-2 border-gold/30 pl-4">
              {t.disclaimer}
            </p>

            {/* Assessment form */}
            <section id="check" className="border-t border-stone-dark pt-12">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-paper mb-2">
                {t.formTitle}
              </h2>
              <p className="text-sm text-stone mb-8">{t.formSubtitle}</p>

              <div className="space-y-7">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label={t.fBusiness}>
                    <input className="field-input" value={form.businessName} onChange={(e) => set("businessName", e.target.value)} />
                  </Field>
                  <Field label={t.fRegion}>
                    <input className="field-input" value={form.region} onChange={(e) => set("region", e.target.value)} />
                  </Field>
                  <Field label={t.fVat} optional={t.optional}>
                    <input className="field-input" inputMode="numeric" value={form.vat} onChange={(e) => set("vat", e.target.value)} />
                  </Field>
                  <Field label={t.fKad} optional={t.optional} hint={t.fKadHint}>
                    <input className="field-input" value={form.kad} onChange={(e) => set("kad", e.target.value)} />
                  </Field>
                </div>

                <Options label={t.fCompanyType} options={companyTypeOptions} lang={lang} value={form.companyType} onPick={(v) => set("companyType", v)} />
                <Options label={t.fEmployees} options={employeesOptions} lang={lang} value={form.employees} onPick={(v) => set("employees", v)} />
                <Options label={t.fPrior} options={priorFundingOptions} lang={lang} value={form.priorFunding} onPick={(v) => set("priorFunding", v)} />
                <Options label={t.fProgram} options={programOptions} lang={lang} value={form.program} onPick={(v) => set("program", v)} />

                <Field label={t.fGoal} optional={t.optional}>
                  <textarea className="field-input resize-none" rows={3} placeholder={t.fGoalPlaceholder} value={form.goal} onChange={(e) => set("goal", e.target.value)} />
                </Field>

                <div className="grid sm:grid-cols-3 gap-5 pt-2 border-t border-stone-dark">
                  <Field label={t.fName}>
                    <input className="field-input" value={form.name} onChange={(e) => set("name", e.target.value)} />
                  </Field>
                  <Field label={t.fEmail}>
                    <input className="field-input" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
                  </Field>
                  <Field label={t.fPhone} optional={t.optional}>
                    <input className="field-input" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                  </Field>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => {
                      set("consent", e.target.checked);
                      setError("");
                    }}
                    className="mt-1 h-4 w-4 shrink-0 accent-gold cursor-pointer"
                  />
                  <span className="text-sm text-stone-light leading-relaxed">
                    {t.consent}
                    <span className="block text-xs text-stone mt-1">{t.consentNote}</span>
                  </span>
                </label>

                {error && <p className="text-sm text-rust font-medium">{error}</p>}
                {status === "error" && (
                  <div className="rounded-lg border border-rust/40 bg-rust/10 px-4 py-3">
                    <p className="text-sm font-semibold text-paper">{t.errorTitle}</p>
                    <p className="text-xs text-stone-light mt-1">{t.errorBody}</p>
                  </div>
                )}

                <button onClick={submit} disabled={status === "submitting"} className="cta-button disabled:opacity-60">
                  {status === "submitting" ? t.sending : t.submit}
                  {status !== "submitting" && (
                    <span className="arrow-icon">
                      <Icon name="arrow" size={13} />
                    </span>
                  )}
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </SpotlightWrapper>
  );
}

function Field({
  label,
  optional,
  hint,
  children,
}: {
  label: string;
  optional?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-baseline gap-2 font-mono text-[0.65rem] tracking-widest uppercase text-stone-light mb-2">
        {label}
        {optional && <span className="text-stone-dark normal-case tracking-normal">({optional})</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-stone mt-1.5">{hint}</p>}
    </div>
  );
}

function Options({
  label,
  options,
  lang,
  value,
  onPick,
}: {
  label: string;
  options: Choice[];
  lang: "en" | "el";
  value: string;
  onPick: (v: string) => void;
}) {
  return (
    <div>
      <span className="block font-mono text-[0.65rem] tracking-widest uppercase text-stone-light mb-2">
        {label}
      </span>
      <div className="flex flex-wrap gap-2.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onPick(opt.value)}
            className={`choice-option choice-option-compact ${value === opt.value ? "choice-option-selected" : ""}`}
          >
            <span className="text-sm text-paper leading-snug">{opt.label[lang]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
