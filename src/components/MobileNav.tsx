"use client";

import { useRef, useState } from "react";

const sections = [
  { id: "about", label: "Σχετικά" },
  { id: "services", label: "Υπηρεσίες" },
  { id: "experience", label: "Εμπειρία" },
  { id: "projects", label: "Έργα" },
];

export default function MobileNav() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollTo = (idx: number) => {
    setActive(idx);
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ left: idx * window.innerWidth, behavior: "smooth" });
  };

  // Sync active tab when user manually swipes
  const onScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const idx = Math.round(container.scrollLeft / window.innerWidth);
    setActive(idx);
  };

  return (
    <>
      {/* Tab bar */}
      <div className="lg:hidden flex border-b border-stone-dark mb-0">
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => scrollTo(i)}
            className={`flex-1 py-2.5 text-xs font-mono tracking-widest uppercase transition-colors duration-200 ${
              active === i
                ? "text-gold border-b-2 border-gold -mb-px"
                : "text-stone"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Horizontal scroll container — receives children via portal trick */}
      <div
        id="mobile-scroll-container"
        ref={containerRef}
        onScroll={onScroll}
        className="mobile-sections-container lg:hidden"
      />
    </>
  );
}
