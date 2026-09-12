import Link from "next/link";
import { Icon } from "@/components/Icons";
import "./globals.css";

/**
 * Every notFound() under [lang] (an invalid /xx segment, or a bad dynamic
 * slug like /el/sectors/xyz) bubbles all the way up here rather than to a
 * [lang]/not-found.tsx boundary: Next only renders a segment's own
 * not-found.js when that exact segment matched, and this app's [lang] has no
 * catch-all, so most unmatched paths never match [lang] at all. This root
 * file is therefore the only 404 that ever renders, and Next always
 * pre-renders it once at build time (no per-request access to the URL), so
 * it can't detect language from the path either. Greek, since that's the
 * site's default locale (see the "/" -> "/el" redirect in next.config.mjs).
 */
export default function RootNotFound() {
  return (
    <html lang="el">
      <body className="antialiased bg-ink text-paper">
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 min-h-screen pb-24">
          <header className="py-8">
            <Link
              href="/el"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-accent hover:text-accent-light transition-colors"
            >
              <span className="ornament">←</span>
              Πίσω στην αρχική
            </Link>
          </header>

          <div className="flex flex-col items-start justify-center min-h-[60vh]">
            <div className="deco-rule mb-6" />
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
              404
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-paper leading-tight mb-4">
              Αυτή η σελίδα δεν βρέθηκε.
            </h1>
            <p className="text-base text-stone-light leading-relaxed mb-10 max-w-md">
              Η σελίδα που ψάχνεις δεν υπάρχει, ή έχει μετακινηθεί.
            </p>
            <Link href="/el" className="cta-button inline-flex">
              Αρχική σελίδα
              <span className="arrow-icon">
                <Icon name="arrow" size={13} />
              </span>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
