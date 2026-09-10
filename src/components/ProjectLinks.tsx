"use client";

import Link from "next/link";
import { Icon } from "@/components/Icons";
import { useLanguage } from "@/components/LanguageContext";
import type { Project } from "@/lib/data";
import { externalProps, localeHref } from "@/lib/links";

/**
 * The three link surfaces on a project card, shared by the homepage, the
 * mobile panel and the sector pages so a project cannot lead one place on one
 * of them and somewhere else on another.
 */

/**
 * The invisible link covering the whole card.
 *
 * It goes to the case study where there is one, because that is the fuller
 * answer to "what is this". The thumbnail and the labelled link beside it
 * still go to the live site, so one card reaches both. A project with no case
 * study falls back to wherever its first link points.
 */
export function CardOverlay({ project }: { project: Project }) {
  const { lang } = useLanguage();
  const target = project.caseStudy ?? project.links[0]?.href;
  if (!target) return null;

  return (
    <Link
      href={localeHref(target, lang)}
      {...externalProps(target)}
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
  const { lang } = useLanguage();

  return (
    <>
      {project.links.map((lnk) => (
        <Link
          key={lnk.label}
          href={localeHref(lnk.href, lang)}
          {...externalProps(lnk.href)}
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
