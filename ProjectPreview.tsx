import { useState, useEffect } from "react";
import { Project } from "../data/projects";
import { Badge } from "./ui";
import {
  X,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react";

interface ProjectPreviewProps {
  project: Project;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ProjectPreview({
  project,
  onClose,
  onNext,
  onPrev,
}: ProjectPreviewProps) {
  const [iframeLoading, setIframeLoading] = useState(true);

  useEffect(() => {
    setIframeLoading(true);
    const t = setTimeout(() => setIframeLoading(false), 8000);
    return () => clearTimeout(t);
  }, [project.id]);

  return (
    <section className="py-10 md:py-12 animate-fade-in">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Top controls bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <button
            type="button"
            onClick={onClose}
            className="group inline-flex cursor-pointer items-center gap-2 font-display text-xs font-semibold tracking-[0.18em] text-mist uppercase transition-colors duration-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Work
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onPrev}
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center border border-white/10 bg-coal hover:border-accent hover:text-accent-bright transition-colors duration-300"
              aria-label="Previous Project"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <span className="font-display text-[11px] tracking-widest text-mist uppercase">
              {project.category}
            </span>
            <button
              type="button"
              onClick={onNext}
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center border border-white/10 bg-coal hover:border-accent hover:text-accent-bright transition-colors duration-300"
              aria-label="Next Project"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center border border-white/10 bg-coal hover:bg-white/5 transition-colors duration-300"
            aria-label="Close Preview"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Title row */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_minmax(0,320px)] lg:gap-12">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>{project.label}</Badge>
              <span className="font-display text-[11px] tracking-[0.18em] text-white/40 uppercase">
                {project.year}
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl lg:text-5xl">
              {project.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col justify-end border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0">
            <p className="font-display text-[11px] font-medium tracking-[0.22em] text-accent-bright uppercase">
              Brand Palette
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.palette.map((color) => (
                <span
                  key={color}
                  className="h-8 w-8 rounded-full border border-white/10"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Simulated browser frame with iframe */}
        <div className="mt-10">
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-coal shadow-2xl">
            <div className="flex flex-col gap-2 border-b border-white/10 bg-ink/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex shrink-0 items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="flex min-w-0 flex-1 items-center justify-center truncate rounded bg-ink/40 px-3 py-1 text-[11px] text-white/40 sm:text-xs">
                {project.url}
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-semibold tracking-wider text-accent-bright hover:text-white transition-colors duration-300 sm:text-xs"
              >
                Open in new tab
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="relative aspect-[16/10] w-full bg-zinc-950">
              {iframeLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-950">
                  <Loader2 className="h-10 w-10 animate-spin text-accent" />
                  <p className="mt-4 font-display text-[11px] tracking-widest text-mist uppercase">
                    Connecting live preview...
                  </p>
                </div>
              )}

              <iframe
                title={`Live Website Preview for ${project.name}`}
                src={project.url}
                className="block h-full w-full border-0"
                sandbox="allow-scripts allow-same-origin allow-popups"
                onLoad={() => setIframeLoading(false)}
                onError={() => setIframeLoading(false)}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col items-start justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-4 text-sm text-mist sm:flex-row sm:items-center">
            <p className="min-w-0 flex-1">
              Note: This interactive frame loads the real site deployed on
              Antideploy. If it is blocked by security policies, use the
              button below to open it directly.
            </p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 bg-white/10 px-4 py-2.5 font-display text-[11px] font-bold tracking-widest text-white uppercase hover:bg-white hover:text-ink transition-colors duration-300"
            >
              Open Live Website
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Case-study content */}
        <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-[minmax(0,240px)_1fr] lg:gap-16">
          <div>
            <p className="font-display text-[11px] font-medium tracking-[0.22em] text-accent-bright uppercase">
              01 / CONCEPT
            </p>
            <h2 className="mt-3 font-display text-xl font-bold tracking-tight text-white uppercase sm:text-2xl">
              Overview
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-relaxed text-mist">
            {project.overview}
          </p>
        </div>

        <div className="mt-12 grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-[minmax(0,240px)_1fr] lg:gap-16">
          <div>
            <p className="font-display text-[11px] font-medium tracking-[0.22em] text-accent-bright uppercase">
              02 / LAYOUT & STYLE
            </p>
            <h2 className="mt-3 font-display text-xl font-bold tracking-tight text-white uppercase sm:text-2xl">
              Design Approach
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-relaxed text-mist">
            {project.approach}
          </p>
        </div>

        <div className="mt-12 grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-[minmax(0,240px)_1fr] lg:gap-16">
          <div>
            <p className="font-display text-[11px] font-medium tracking-[0.22em] text-accent-bright uppercase">
              03 / INTERACTIONS
            </p>
            <h2 className="mt-3 font-display text-xl font-bold tracking-tight text-white uppercase sm:text-2xl">
              Key Features
            </h2>
          </div>
          <ul className="grid max-w-3xl gap-3 sm:grid-cols-2">
            {project.features.map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm leading-relaxed text-mist"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-[minmax(0,240px)_1fr] lg:gap-16">
          <div>
            <p className="font-display text-[11px] font-medium tracking-[0.22em] text-accent-bright uppercase">
              04 / INFRASTRUCTURE
            </p>
            <h2 className="mt-3 font-display text-xl font-bold tracking-tight text-white uppercase sm:text-2xl">
              Tech Stack
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="border border-white/10 bg-white/[0.02] px-3.5 py-1.5 font-display text-xs tracking-wider text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom controls */}
        <div className="mt-16 flex flex-col items-stretch gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onClose}
            className="group inline-flex cursor-pointer items-center justify-center gap-2 font-display text-xs font-semibold tracking-[0.18em] text-mist uppercase transition-colors duration-300 hover:text-white sm:justify-start"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to All Projects
          </button>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onPrev}
              className="inline-flex cursor-pointer items-center justify-center gap-2 border border-white/10 bg-coal hover:border-accent hover:text-accent-bright px-5 py-3 font-display text-[11px] font-semibold tracking-wider uppercase transition-colors duration-300"
            >
              Previous Project
            </button>
            <button
              type="button"
              onClick={onNext}
              className="inline-flex cursor-pointer items-center justify-center gap-2 border border-white/10 bg-coal hover:border-accent hover:text-accent-bright px-5 py-3 font-display text-[11px] font-semibold tracking-wider uppercase transition-colors duration-300"
            >
              Next Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}