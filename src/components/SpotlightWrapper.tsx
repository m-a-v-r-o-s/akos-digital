"use client";

import { useEffect, useRef } from "react";
import ThetaBackground from "./ThetaBackground";

export default function SpotlightWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cursor = { x: 0, y: 0 };
    const trail = { x: 0, y: 0 };
    let raf: number;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      cursor.x = e.clientX - rect.left;
      cursor.y = e.clientY - rect.top;
    };

    const animate = () => {
      trail.x += (cursor.x - trail.x) * 0.06;
      trail.y += (cursor.y - trail.y) * 0.06;

      el.style.setProperty("--spotlight-x", `${cursor.x}px`);
      el.style.setProperty("--spotlight-y", `${cursor.y}px`);
      el.style.setProperty("--trail-x", `${trail.x}px`);
      el.style.setProperty("--trail-y", `${trail.y}px`);

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="spotlight-bg min-h-screen w-full">
      <ThetaBackground />
      {children}
    </div>
  );
}
