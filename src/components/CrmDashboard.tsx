import {
  needsOptions,
  situationOptions,
  budgetOptions,
  timelineOptions,
  contactMethodOptions,
  type Choice,
} from "@/lib/requestForm";
import {
  companyTypeOptions,
  employeesOptions,
  priorFundingOptions,
  programOptions,
} from "@/lib/espa";
import CrmLogout from "./CrmLogout";

export type Lead = {
  id: string;
  created_at: string;
  name: string;
  needs: string[] | null;
  business_name: string | null;
  business_about: string | null;
  situation: string | null;
  budget: string | null;
  timeline: string | null;
  details: string | null;
  email: string;
  phone: string | null;
  contact_method: string | null;
  consent: boolean;
  lang: string | null;
  source: string | null;
  extra: Record<string, string> | null;
};

/** value → Greek label lookups, so raw keys read as human text. */
function toMap(opts: Choice[]): Record<string, string> {
  return Object.fromEntries(opts.map((o) => [o.value, o.label.el]));
}
const needMap: Record<string, string> = {
  ...toMap(needsOptions),
  espa_website: "Ιστοσελίδα μέσω ΕΣΠΑ",
};
const situationMap = toMap(situationOptions);
const budgetMap = toMap(budgetOptions);
const timelineMap = toMap(timelineOptions);
const contactMap = toMap(contactMethodOptions);

// ESPA `extra` fields → human label + (optional) value lookup.
const extraLabels: Record<string, string> = {
  vat: "ΑΦΜ",
  kad: "ΚΑΔ",
  region: "Περιοχή",
  company_type: "Τύπος",
  employees: "Εργαζόμενοι",
  prior_funding: "Προηγ. ΕΣΠΑ",
  program: "Στόχος",
};
const extraValueMaps: Record<string, Record<string, string>> = {
  company_type: toMap(companyTypeOptions),
  employees: toMap(employeesOptions),
  prior_funding: toMap(priorFundingOptions),
  program: toMap(programOptions),
};
const EXTRA_ORDER = ["region", "vat", "kad", "company_type", "employees", "prior_funding", "program"];

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("el-GR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function Meta({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <span className="block font-mono text-[0.6rem] tracking-widest uppercase text-stone-dark mb-0.5">
        {label}
      </span>
      <span className="text-sm text-stone-light">{value}</span>
    </div>
  );
}

export default function CrmDashboard({
  leads,
  error,
}: {
  leads: Lead[];
  error: string | null;
}) {
  return (
    <div className="min-h-screen max-w-4xl mx-auto px-6 sm:px-10 py-12">
      {/* Header */}
      <header className="flex items-end justify-between gap-4 mb-10 pb-6 border-b border-stone-dark">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-gold mb-2">
            <span className="ornament">— </span>Akos · Leads
          </p>
          <h1 className="font-display text-3xl font-bold text-paper">
            {leads.length} {leads.length === 1 ? "lead" : "leads"}
          </h1>
        </div>
        <div className="flex items-center gap-5 pb-1">
          <a
            href="/crm"
            className="font-mono text-xs tracking-widest uppercase text-stone hover:text-gold-light transition-colors"
          >
            Refresh
          </a>
          <CrmLogout />
        </div>
      </header>

      {error && (
        <div className="rounded-lg border border-rust/40 bg-rust/10 px-4 py-3 mb-8">
          <p className="text-sm text-paper font-medium">Couldn&apos;t load leads</p>
          <p className="text-xs text-stone-light mt-1">{error}</p>
        </div>
      )}

      {!error && leads.length === 0 && (
        <p className="text-sm text-stone py-16 text-center">No leads yet.</p>
      )}

      {/* Leads */}
      <ul className="space-y-4">
        {leads.map((lead) => (
          <li key={lead.id} className="section-card">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h2 className="font-display font-semibold text-paper text-lg leading-snug flex items-center gap-2.5 flex-wrap">
                {lead.name || "—"}
                {lead.source === "espa-assessment" && (
                  <span className="font-mono text-[0.6rem] tracking-widest uppercase text-gold border border-gold/40 rounded-full px-2 py-0.5">
                    ΕΣΠΑ
                  </span>
                )}
              </h2>
              <span className="font-mono text-xs text-stone-dark shrink-0 pt-1">
                {fmtDate(lead.created_at)}
              </span>
            </div>

            {/* Contact */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mb-4">
              <a href={`mailto:${lead.email}`} className="gold-link text-sm">
                {lead.email}
              </a>
              {lead.phone && (
                <a href={`tel:${lead.phone}`} className="gold-link text-sm">
                  {lead.phone}
                </a>
              )}
              {lead.contact_method && (
                <span className="text-xs text-stone">
                  via {contactMap[lead.contact_method] ?? lead.contact_method}
                </span>
              )}
            </div>

            {/* Needs */}
            {lead.needs && lead.needs.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {lead.needs.map((n) => (
                  <span key={n} className="tag-pill">
                    {needMap[n] ?? n}
                  </span>
                ))}
              </div>
            )}

            {/* Meta grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <Meta label="Budget" value={lead.budget ? budgetMap[lead.budget] ?? lead.budget : null} />
              <Meta label="Timeline" value={lead.timeline ? timelineMap[lead.timeline] ?? lead.timeline : null} />
              <Meta label="Has site" value={lead.situation ? situationMap[lead.situation] ?? lead.situation : null} />
              <Meta label="Lang" value={lead.lang ? lead.lang.toUpperCase() : null} />
            </div>

            {/* Business */}
            {(lead.business_name || lead.business_about) && (
              <div className="mb-3">
                {lead.business_name && (
                  <p className="text-sm text-paper font-medium">{lead.business_name}</p>
                )}
                {lead.business_about && (
                  <p className="text-sm text-stone leading-relaxed mt-0.5">{lead.business_about}</p>
                )}
              </div>
            )}

            {/* ESPA assessment details */}
            {lead.extra && Object.keys(lead.extra).length > 0 && (
              <div className="flex flex-wrap gap-x-5 gap-y-2 mb-3 rounded-lg bg-gold/[0.04] border border-gold/15 px-4 py-3">
                {EXTRA_ORDER.filter((k) => lead.extra?.[k]).map((k) => (
                  <div key={k}>
                    <span className="block font-mono text-[0.6rem] tracking-widest uppercase text-stone-dark mb-0.5">
                      {extraLabels[k] ?? k}
                    </span>
                    <span className="text-sm text-stone-light">
                      {extraValueMaps[k]?.[lead.extra![k]] ?? lead.extra![k]}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Details */}
            {lead.details && (
              <p className="text-sm text-stone-light leading-relaxed border-l-2 border-gold/30 pl-4 mt-3">
                {lead.details}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
