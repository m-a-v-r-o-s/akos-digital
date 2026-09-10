"use client";

import Link from "next/link";
import { Icon } from "@/components/Icons";
import { useLanguage } from "@/components/LanguageContext";
import type { Project, ProjectLink } from "@/lib/data";

/**
 * The two link surfaces on a project card, shared by the desktop and mobile
 * renderings so a project cannot lead one place on a phone and another on a
 * laptop.
 *
 * A link whose href starts with "/" is a route on this site and gets the
 * locale segment; anything else is external and opens in a new tab. That is
 * what lets a project with nothing public to open, such as an internal tool,
 * still have a card that leads somewhere.
 */
const isInternal = (href: string) => href.startsWith("/");

function useHref() {
  const { lang } = useLanguage();
  return (href: string) => (isInternal(href) ? `/${lang}${href}` : href);
}

function linkProps(href: string) {
  return isInternal(href) ? {} : { target: "_blank", rel: "noopener noreferrer" };
}

/** The invisible link covering the whole card. */
export function CardOverlay({ project }: { project: Project }) {
  const href = useHref();
  const first: ProjectLink | undefined = project.links[0];
  if (!first) return null;

  return (
    <Link
      href={href(first.href)}
      {...linkProps(first.href)}
      aria-label={project.title}
      className="absolute inset-0 z-10"
    />
  );
}

/** The labelled links that sit among the tag pills. */
export function CardLinks({
  project,
  size = 11,
}: {
  project: Project;
  size?: number;
}) {
  const href = useHref();

  return (
    <>
      {project.links.map((lnk) => (
        <Link
          key={lnk.label}
          href={href(lnk.href)}
          {...linkProps(lnk.href)}
          className="relative z-20 inline-flex items-center gap-1 text-xs font-mono text-stone hover:text-gold-light transition-colors ml-1"
        >
          {lnk.label}
          <span className="arrow-icon">
            <Icon name="arrow" size={size} />
          </span>
        </Link>
      ))}
    </>
  );
}
