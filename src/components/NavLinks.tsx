"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";

const sectionLabels = {
  en: { about: "About", services: "Services", education: "Education", projects: "Works" },
  el: { about: "Σχετικά", services: "Υπηρεσίες", education: "Εκπαίδευση", projects: "Έργα" },
};

const sections = ["about", "services", "education", "projects"] as const;

export default function NavLinks() {
  const [active, setActive] = useState("about");
  const { lang } = useLanguage();
  const labels = sectionLabels[lang];

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="hidden lg:flex flex-col gap-5 mt-10">
      {sections.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className={`nav-link ${active === id ? "active" : ""}`}
        >
          {labels[id]}
        </a>
      ))}
    </nav>
  );
}
