"use client";

import type { ElementType, ReactNode } from "react";
import { useLanguage } from "@/components/LanguageContext";

type Props = {
  en: ReactNode;
  el: ReactNode;
  as?: ElementType;
  className?: string;
};

/**
 * Renders both language versions of a text node into the DOM and hides the
 * inactive one with the `hidden` attribute, instead of discarding it at
 * render time. Search/AI crawlers that don't execute the language toggle
 * still see both languages in the served HTML; sighted and screen-reader
 * users only ever get the active one (`hidden` removes it from the a11y tree).
 */
export default function Bilingual({ en, el, as: As = "span", className }: Props) {
  const { lang } = useLanguage();
  return (
    <>
      <As lang="el" hidden={lang !== "el"} className={className}>
        {el}
      </As>
      <As lang="en" hidden={lang !== "en"} className={className}>
        {en}
      </As>
    </>
  );
}

export function BilingualHtml({ en, el, as: As = "p", className }: { en: string; el: string; as?: ElementType; className?: string }) {
  const { lang } = useLanguage();
  return (
    <>
      <As lang="el" hidden={lang !== "el"} className={className} dangerouslySetInnerHTML={{ __html: el }} />
      <As lang="en" hidden={lang !== "en"} className={className} dangerouslySetInnerHTML={{ __html: en }} />
    </>
  );
}
