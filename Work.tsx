import { useEffect } from "react";
import type { CSSProperties } from "react";
import { useRouter } from "../utils/router";
import { projects } from "../data/projects";
import ProjectPreview from "../components/ProjectPreview";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/**
 * Editorial-style work page.
 *
 * Layout: a large hero section, then six large case-study blocks with
 * alternating image/text alignment, generous vertical spacing and
 * staggered scroll reveals. Each block occupies a generous portion of
 * the viewport so the projects feel like major portfolio pieces.
 *
 * Animations are pure CSS (opacity + translate) on inner spans so
 * nothing in the layout grows or shifts position while animating —
 * preventing any chance of an element overlapping another.
 */

const layoutModes = [
  "image-right",
  "image-left",
  "image-wide",
  "image-right",
  "image-left",
  "image-wide",
] as const;

type LayoutMode = (typeof layoutModes)[number];

/**
 * Helper to set the inline --work-delay CSS variable that the
 * .work-reveal keyframe reads. Type-cast keeps TypeScript happy.
 */
function revealStyle(delayMs: number): CSSProperties {
  return { ["--work-delay" as string]: `${delayMs}ms` } as CSSProperties;
}

export default function Work() {
  const { currentPath, navigate } = useRouter();

  const subRoute = currentPath.startsWith("/work/") ? currentPath.slice(6) : null;
  const activeProjectIndex = subRoute
    ? projects.findIndex((p) => p.id === subRoute)
    : -1;
  const activeProject =
    activeProjectIndex !== -1 ? projects[activeProjectIndex] : null;

  // Observe every .work-section and add `is-in` when it enters the
  // viewport. This drives the staggered reveal animation.
  useEffect(() => {
    if (activeProject) return; // don't observe while showing a case study

    const sections = document.querySelectorAll<HTMLElement>("[data-reveal-section]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [activeProject]);

  const handleNext = () => {
    if (activeProjectIndex === -1) return;
    const nextIndex = (activeProjectIndex + 1) % projects.length;
    navigate(`/work/${projects[nextIndex].id}`);
  };

  const handlePrev = () => {
    if (activeProjectIndex === -1) return;
    const prevIndex = (activeProjectIndex - 1 + projects.length) % projects.length;
    navigate(`/work/${projects[prevIndex].id}`);
  };

  if (activeProject) {
    return (
      <ProjectPreview
        project={activeProject}
        onClose={() => navigate("/work")}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    );
  }

  return (
    <div className="relative">
      {/* ───────────────────── HERO ───────────────────── */}
      <section className="relative overflow-hidden border-b border-white/5 pt-12 pb-24 sm:pt-20 sm:pb-28 lg:pt-28 lg:pb-32">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="hero-grid absolute inset-0 opacity-30" />
          <div className="animate-drift absolute top-[-20%] left-[40%] h-[30rem] w-[30rem] rounded-full bg-accent/12 blur-[140px]" />
          <div className="animate-drift2 absolute bottom-[-20%] left-[-10%] h-[26rem] w-[26rem] rounded-full bg-accent/8 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center gap-3 work-reveal" style={revealStyle(60)}>
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent-bright/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-bright" />
            </span>
            <span className="font-display text-xs font-semibold tracking-[0.3em] text-accent-bright uppercase">
              CONCEPT SHOWCASE
            </span>
          </div>

          <h1
            className="mt-10 font-display text-[3.25rem] font-bold leading-[0.95] tracking-tight text-white uppercase sm:text-[5rem] lg:text-[7.5rem] xl:text-[8.5rem] work-reveal"
            style={revealStyle(160)}
          >
            Selected
            <br />
            <span className="text-accent-bright">Work</span>
          </h1>

          <p
            className="mt-8 max-w-2xl text-base leading-relaxed text-mist sm:text-lg work-reveal"
            style={revealStyle(260)}
          >
            A collection of concept projects exploring modern design, responsive
            experiences and interactive digital interfaces. Every project below
            is a self-initiated concept, not a real client engagement.
          </p>

          <div
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-[11px] font-semibold tracking-[0.2em] text-mist uppercase work-reveal"
            style={revealStyle(360)}
          >
            <span className="flex items-center gap-2">
              <span className="font-mono text-white">
                {projects.length.toString().padStart(2, "0")}
              </span>
              Projects
            </span>
            <span className="h-px w-8 bg-white/15" />
            <span>06 industries</span>
            <span className="h-px w-8 bg-white/15" />
            <span>Concept showcase</span>
          </div>
        </div>
      </section>

      {/* ───────────────────── PROJECTS ───────────────────── */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {projects.map((project, i) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              index={i}
              mode={layoutModes[i % layoutModes.length]}
              onOpen={() => navigate(`/work/${project.id}`)}
            />
          ))}
        </div>
      </section>

      {/* ───────────────────── DISCLAIMER ───────────────────── */}
      <section className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <p className="text-xs leading-relaxed text-mist">
            <span className="font-semibold text-white">General Disclaimer:</span>{" "}
            The portfolios shown above are self-initiated concept designs
            created to demonstrate layout, interactions, and aesthetic
            alignment across various industries. No endorsement or association
            with actual businesses is implied.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ───────────────────── PROJECT SHOWCASE ───────────────────── */

interface ProjectShowcaseProps {
  project: (typeof projects)[number];
  index: number;
  mode: LayoutMode;
  onOpen: () => void;
}

function ProjectShowcase({ project, index, mode, onOpen }: ProjectShowcaseProps) {
  const number = String(index + 1).padStart(2, "0");
  const isReversed = mode === "image-left";
  const isWide = mode === "image-wide";

  return (
    <article
      data-reveal-section
      className="work-section relative border-t border-white/5 py-14 md:py-20 lg:py-24 first:border-t-0 first:pt-8 md:first:pt-12"
    >
      {/* Project number watermark (decorative) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-4 right-0 select-none font-display text-[5rem] font-black leading-none tracking-tighter text-white/[0.03] sm:text-[8rem] md:text-[11rem] lg:text-[14rem] work-num"
      >
        {number}
      </div>

      <div
        className={`relative grid min-w-0 gap-8 md:gap-12 lg:gap-16 ${
          isWide
            ? "grid-cols-1"
            : "grid-cols-1 lg:grid-cols-[1.05fr_1fr] lg:items-center"
        }`}
      >
        {/* ── Image column ── */}
        <div
          className={`relative min-w-0 work-reveal ${
            isReversed ? "lg:order-2" : ""
          }`}
        >
          <button
            type="button"
            onClick={onOpen}
            aria-label={`View ${project.name} project`}
            className="group block w-full overflow-hidden rounded-2xl border border-white/10 bg-coal text-left transition-colors duration-300 hover:border-white/25"
          >
            <div
              className={`relative w-full overflow-hidden bg-zinc-900 ${
                isWide ? "aspect-[16/9]" : "aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]"
              }`}
            >
              <img
                src={project.image}
                alt={`${project.name} — ${project.category} concept design preview`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
              />

              {/* Hover overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Top corner meta */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink/70 px-3 py-1 font-display text-[10px] font-semibold tracking-[0.2em] text-white/80 uppercase backdrop-blur-sm">
                  <span className="h-1 w-1 rounded-full bg-accent-bright" />
                  {project.label}
                </span>
              </div>

              {/* Center VIEW PROJECT on hover (desktop only — no tap on mobile) */}
              <div className="pointer-events-none absolute inset-0 hidden items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:flex">
                <span className="flex items-center gap-3 rounded-full bg-accent px-5 py-3 font-display text-xs font-bold tracking-[0.18em] text-white uppercase shadow-xl sm:px-7 sm:py-4 sm:text-sm">
                  VIEW PROJECT
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </button>

          {/* Caption strip under image */}
          <div className="mt-4 flex items-center justify-between text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase sm:text-[11px]">
            <span>Concept Visual</span>
            <span className="font-mono">{project.year}</span>
          </div>
        </div>

        {/* ── Text column ── */}
        <div className="relative flex min-w-0 flex-col">
          <div
            className="flex flex-wrap items-center gap-3 work-reveal"
            style={revealStyle(120)}
          >
            <span className="font-mono text-base font-bold text-accent-bright sm:text-lg">
              {number}
            </span>
            <span className="h-px w-10 shrink-0 bg-accent/40" />
            <span className="font-display text-[11px] font-bold tracking-[0.25em] text-accent-bright uppercase">
              {project.category}
            </span>
          </div>

          <h2
            className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight text-white uppercase sm:text-5xl lg:text-6xl xl:text-7xl work-reveal"
            style={revealStyle(200)}
          >
            {project.name}
          </h2>

          <p
            className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg work-reveal"
            style={revealStyle(300)}
          >
            {project.description}
          </p>

          <p
            className="mt-4 max-w-xl text-sm leading-relaxed text-white/55 work-reveal"
            style={revealStyle(380)}
          >
            {project.approach}
          </p>

          {/* Capability tags */}
          <ul
            className="mt-8 flex flex-wrap gap-2 work-reveal"
            style={revealStyle(460)}
          >
            {project.techStack.slice(0, 4).map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 font-display text-[10px] font-semibold tracking-[0.2em] text-white/70 uppercase sm:text-[11px]"
              >
                {tech}
              </li>
            ))}
          </ul>

          {/* Action row */}
          <div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center work-reveal"
            style={revealStyle(560)}
          >
            <button
              type="button"
              onClick={onOpen}
              className="group inline-flex min-w-0 cursor-pointer items-center justify-center gap-3 whitespace-nowrap bg-accent px-6 py-3.5 font-display text-[11px] font-bold tracking-[0.2em] text-white uppercase transition-colors duration-300 hover:bg-accent-bright sm:px-8 sm:py-4 sm:text-sm"
            >
              VIEW PROJECT
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={onOpen}
              className="inline-flex min-w-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap border border-white/10 px-4 py-3.5 font-display text-[11px] font-bold tracking-[0.2em] text-mist uppercase transition-colors duration-300 hover:border-accent hover:text-accent-bright sm:text-xs"
              aria-label={`Open ${project.name} preview`}
            >
              OPEN LIVE PREVIEW
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}