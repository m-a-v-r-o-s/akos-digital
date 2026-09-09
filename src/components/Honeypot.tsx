import { HONEYPOT_FIELD } from "@/lib/leadGuard";

/**
 * Bait field for spam bots.
 *
 * Bots parse the raw HTML and fill every input they find, so a field that a
 * human can never reach acts as a free bot signal: if it arrives non-empty,
 * the submission was automated. `/api/lead` then quietly drops it.
 *
 * Hidden from humans AND assistive tech without `display: none`, which the
 * better bots specifically look for and skip:
 *  - moved off-screen rather than hidden,
 *  - `aria-hidden` + `tabIndex={-1}` so keyboard and screen-reader users can
 *    neither reach it nor hear it (a plain hidden input is a classic WCAG trap),
 *  - `autoComplete="off"` so a browser's autofill never populates it and
 *    locks a real visitor out of the form.
 */
export default function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
        whiteSpace: "nowrap",
      }}
    >
      <label htmlFor={HONEYPOT_FIELD}>Company website (leave this field empty)</label>
      <input
        id={HONEYPOT_FIELD}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
