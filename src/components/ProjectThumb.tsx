"use client";

import { useState } from "react";

/**
 * Project thumbnail. Shows the screenshot if present, and gracefully falls back
 * to a letter tile if there's no image or the file fails to load — so a missing
 * screenshot never renders as a broken image.
 */
export default function ProjectThumb({
  image,
  title,
}: {
  image?: string;
  title: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImg = image && !failed;

  return (
    <div
      className="hidden sm:block w-24 h-16 rounded shrink-0 overflow-hidden"
      style={{ border: "1px solid rgba(201,168,76,0.15)" }}
    >
      {showImg ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={image}
          alt={title}
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
