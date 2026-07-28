"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageContext";

/** Viewport the phone-preview window opens at. */
const PHONE_W = 442;
const PHONE_H = 920;

const phoneLabel = {
  en: "Open in phone view",
  el: "Άνοιγμα σε προβολή κινητού",
};

/**
 * Project thumbnail. Shows the screenshot if present, and gracefully falls back
 * to a letter tile if there's no image or the file fails to load — so a missing
 * screenshot never renders as a broken image.
 */
function Shot({
  image,
  title,
  className,
}: {
  image?: string;
  title: string;
  className: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImg = image && !failed;

  return (
    <div
      className={`${className} rounded shrink-0 overflow-hidden`}
      style={{ border: "1px solid rgba(201,168,76,0.15)" }}
    >
      {showImg ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="w-full h-full object-cover object-top project-screenshot"
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center text-gold opacity-40 text-2xl font-display italic"
          style={{
            background:
              "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(13,13,13,0.5) 100%)",
          }}
        >
          {title.charAt(0)}
        </div>
      )}
    </div>
  );
}

export default function ProjectThumb({
  image,
  imageMobile,
  href,
  title,
  variant = "stack",
}: {
  image?: string;
  imageMobile?: string;
  href?: string;
  title: string;
  /**
   * "stack" — desktop shot with the mobile one beneath it, from `sm` up.
   * "mobile" — the mobile shot alone, for the phone layout.
   */
  variant?: "stack" | "mobile";
}) {
  const { lang } = useLanguage();

  if (variant === "mobile") {
    if (!imageMobile) return null;
    return (
      <Shot
        image={imageMobile}
        title={`${title} — mobile`}
        className="w-12 h-[6.5rem]"
      />
    );
  }

  /**
   * Opens the live site in a window sized to a phone viewport, so the mobile
   * layout renders without the visitor having to reach for devtools. Modified
   * clicks (new tab, new window) are left to the browser.
   */
  const openPhoneView = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    e.stopPropagation();

    const left = Math.max(0, Math.round((window.screen.availWidth - PHONE_W) / 2));
    const top = Math.max(0, Math.round((window.screen.availHeight - PHONE_H) / 2));
    const win = window.open(
      href,
      "_blank",
      `popup=yes,width=${PHONE_W},height=${PHONE_H},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );

    if (win) win.opener = null;
    /* Popup blocked — fall back to a normal tab rather than swallowing the click. */
    else window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="hidden sm:flex flex-col items-center gap-1.5 shrink-0">
      <Shot image={image} title={title} className="w-24 h-16" />
      {imageMobile &&
        (href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={openPhoneView}
            title={phoneLabel[lang]}
            aria-label={`${title} — ${phoneLabel[lang]}`}
            className="relative z-20 block rounded transition-opacity hover:opacity-80"
          >
            <Shot
              image={imageMobile}
              title={`${title} — mobile`}
              className="w-9 h-[4.75rem]"
            />
          </a>
        ) : (
          <Shot
            image={imageMobile}
            title={`${title} — mobile`}
            className="w-9 h-[4.75rem]"
          />
        ))}
    </div>
  );
}
