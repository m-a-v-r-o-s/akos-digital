/**
 * The request-a-quote wizard: one <form>, one fieldset per step. Validation
 * mirrors /api/lead, the payload is the shape that route has always taken,
 * and the 7μερο nudge stops the wizard once when the budget is under €1,000.
 */
import { HONEYPOT_FIELD } from "../lib/leadGuard.ts";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const form = document.querySelector<HTMLFormElement>("[data-wizard]");

if (form) {
  const msgs = JSON.parse(form.dataset.msgs!);
  const steps = [...form.querySelectorAll<HTMLFieldSetElement>("[data-step]")];
  const err = form.querySelector<HTMLElement>("[data-error]")!;
  const failed = form.querySelector<HTMLElement>("[data-failed]")!;
  const back = form.querySelector<HTMLButtonElement>("[data-back]")!;
  const skip = form.querySelector<HTMLButtonElement>("[data-skip]")!;
  const next = form.querySelector<HTMLButtonElement>("[data-next]")!;
  const nextLabel = next.innerHTML;
  const nudge = form.querySelector<HTMLElement>("[data-nudge]");
  const done = document.querySelector<HTMLElement>("[data-done]")!;
  let step = 0;
  let nudgeState: "none" | "open" | "dismissed" = "none";

  const val = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | RadioNodeList | null)?.value?.trim() ?? "";
  const checked = (name: string) => [...form.querySelectorAll<HTMLInputElement>(`input[name="${name}"]:checked`)].map((i) => i.value);
  const fail = (m: string) => { err.textContent = m; return false; };

  const show = (i: number, focus = true) => {
    if (focus) form.dataset.moved = "";
    step = i;
    steps.forEach((s, j) => (s.hidden = j !== i));
    const optional = steps[i].hasAttribute("data-optional-step");
    skip.hidden = !optional;
    form.querySelector<HTMLElement>("[data-optional]")!.hidden = !optional;
    form.querySelector<HTMLElement>("[data-step-n]")!.textContent = String(i + 1);
    form.querySelector<HTMLElement>("[data-progress]")!.style.width = `${((i + 1) / steps.length) * 100}%`;
    back.disabled = i === 0;
    if (i === steps.length - 1) next.textContent = msgs.submit;
    else next.innerHTML = nextLabel;
    err.textContent = "";
    if (focus) steps[i].querySelector<HTMLElement>("input, textarea")?.focus({ preventScroll: true });
    form.scrollIntoView({ block: "nearest" });
  };

  const valid = (): boolean => {
    switch (steps[step].dataset.key) {
      case "name": return val("name") ? true : fail(msgs.vRequired);
      case "needs": return checked("needs").length ? true : fail(msgs.vPickAtLeastOne);
      case "situation": case "budget": case "timeline":
        return checked(steps[step].dataset.key!).length ? true : fail(msgs.vPickOne);
      case "contact":
        if (!EMAIL_RE.test(val("email"))) return fail(msgs.vEmail);
        if (!checked("consent").length) return fail(msgs.vConsent);
        return true;
      default: return true;
    }
  };

  // Single-choice steps glide forward once answered; the under-€1,000 budget stops once for the nudge.
  form.addEventListener("change", (e) => {
    const input = e.target as HTMLInputElement;
    err.textContent = "";
    if (input.type !== "radio" || input.name === "contactMethod") return;
    if (input.name === "budget" && input.value === "under_1k" && nudgeState === "none" && nudge) {
      nudgeState = "open";
      nudge.hidden = false;
      return;
    }
    setTimeout(() => show(step + 1), 280);
  });
  form.querySelector("[data-nudge-stay]")?.addEventListener("click", () => {
    nudgeState = "dismissed";
    nudge!.hidden = true;
    show(step + 1);
  });

  back.addEventListener("click", () => show(Math.max(0, step - 1)));
  skip.addEventListener("click", () => show(step + 1));
  // Enter in a text field moves on, the way the old wizard did.
  form.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.target as Element).matches("input:not([type=checkbox]):not([type=radio])") && step < steps.length - 1) {
      e.preventDefault();
      if (valid()) show(step + 1);
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!valid()) return;
    if (step < steps.length - 1) return show(step + 1);
    failed.hidden = true;
    next.disabled = true;
    next.textContent = msgs.sending;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: val("name"),
          needs: checked("needs"),
          businessName: val("businessName"),
          businessAbout: val("businessAbout"),
          situation: checked("situation")[0] ?? "",
          budget: checked("budget")[0] ?? "",
          timeline: checked("timeline")[0] ?? "",
          details: val("details"),
          email: val("email"),
          phone: val("phone"),
          contactMethod: checked("contactMethod")[0] ?? "email",
          consent: checked("consent").length > 0,
          lang: form.dataset.lang,
          // Only when the 7μερο card was shown and waved off, so the email says
          // "this one saw the cheap route and still wanted a quote".
          ...(nudgeState === "dismissed" && { extra: { sevenmero_offer: "declined" } }),
          [HONEYPOT_FIELD]: val(HONEYPOT_FIELD),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.hidden = true;
      done.hidden = false;
      done.focus();
    } catch {
      failed.hidden = false;
      next.disabled = false;
      next.textContent = msgs.submit;
    }
  });

  show(0, false);
}
