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
 * Renders only the language of the current /el or /en route. Each locale is
 * a separate URL carrying a single language, so the other language is not
 * emitted here: it lives on its own page, declared through hreflang.
 *
 * The html element already carries the route's lang, so no per-node lang
 * attribute is needed. The wrapper element is kept because callers depend
 * on it for layout and className.
 */
export default function Bilingual({ en, el, as: As = "span", className }: Props) {
  const { lang } = useLanguage();
  return <As className={className}>{lang === "el" ? el : en}</As>;
}

export function BilingualHtml({
  en,
  el,
  as: As = "p",
  className,
}: {
  en: string;
  el: string;
  as?: ElementType;
  className?: string;
}) {
  const { lang } = useLanguage();
  return (
    <As
      className={className}
      dangerouslySetInnerHTML={{ __html: lang === "el" ? el : en }}
    />
  );
}
