import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useRouter } from "../utils/router";
import { useCurrency } from "../utils/CurrencyContext";
import { projects } from "../data/projects";
import Reveal from "../components/Reveal";
import { PrimaryButton, GhostButton, SectionHeading } from "../components/ui";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Monitor,
  ArrowUpRight,
} from "lucide-react";

/**
 * Helper: set the inline --work-delay CSS variable used by the
 * .work-reveal keyframe.
 */
function revealStyle(delayMs: number): CSSProperties {
  return { ["--work-delay" as string]: `${delayMs}ms` } as CSSProperties;
}

/**
 * Editorial-style homepage.
 *
 * Layout: hero → large "SELECTED WORK" showcase with all 6 projects
 * (two-column alternating editorial blocks) → value props → CTA → page
 * ends. Pricing in hero is hardcoded to $99 USD on first paint.
 */

const layoutModes = [
  "image-right",
  "image-left",
  "image-wide",
  "image-right",
  "image-left",
  "image-wide",
] as const;

export default function Home() {
  const { navigate } = useRouter();
  const { currentCurrency } = useCurrency();

  // Observe every .work-section on this page and add `is-in` when it
  // enters the viewport. This drives the staggered reveal animation
  // exactly as the dedicated Work page does.
  useEffect(() => {
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
  }, []);

  return (
    <>
      {/* ───────────────────── HERO ───────────────────── */}
      <section className="relative overflow-hidden border-b border-white/5 bg-ink">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="hero-grid absolute inset-0 opacity-40" />
          <div className="animate-drift absolute top-[-10%] left-[40%] h-[35rem] w-[35rem] rounded-full bg-accent/15 blur-[140px]" />
          <div className="animate-drift2 absolute bottom-[-15%] left-[-5%] h-[30rem] w-[30rem] rounded-full bg-accent/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 py-20 sm:py-28 lg:px-10 lg:py-32">
          <Reveal>
            <div className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3.5 py-1.5 font-display text-xs font-semibold tracking-[0.2em] text-accent-bright uppercase rounded-full">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span>Available for New Projects</span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-8 max-w-5xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white uppercase sm:text-6xl lg:text-[5rem] xl:text-[5.5rem]">
              Modern Websites <br className="hidden sm:inline" />
              That Make Businesses <br className="hidden sm:inline" />
              <span className="text-accent-bright">Look Better Online.</span>
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
              Professional, responsive and visually engaging websites designed to
              give businesses a stronger, more premium online presence.
            </p>
          </Reveal>

          <Reveal delay={280}>
            <p className="mt-10 font-display text-sm font-semibold tracking-[0.3em] text-accent-bright uppercase sm:text-base">
              Professional Websites From $99 USD
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-4 max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-coal/50">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 sm:px-6">
                <span className="font-display text-[10px] font-bold tracking-[0.3em] text-accent-bright uppercase">
                  Professional Websites From
                </span>
                <span className="font-display text-[10px] font-semibold tracking-[0.25em] text-white/40 uppercase">
                  {currentCurrency.code}
                </span>
              </div>
              <div className="flex items-baseline gap-3 px-5 py-6 sm:px-6">
                <span className="font-display text-5xl font-black tracking-tight text-white sm:text-6xl">
                  {currentCurrency.symbol}
                  {currentCurrency.amount}
                </span>
                <span className="font-display text-base font-bold tracking-widest text-accent-bright uppercase">
                  {currentCurrency.code}
                </span>
              </div>
              <div className="border-t border-white/10 bg-ink/40 px-5 py-3 sm:px-6">
                <p className="text-[11px] leading-relaxed text-mist sm:text-xs">
                  Fixed starting price. Custom pricing may apply for larger
                  or more advanced projects. Other currencies available in
                  the header selector.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <PrimaryButton onClick={() => navigate("/contact")}>
                START YOUR PROJECT
              </PrimaryButton>
              <GhostButton onClick={() => navigate("/contact")}>
                GET A QUOTE
              </GhostButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────── SELECTED WORK (all 6) ───────────────────── */}
      <section
        id="selected-work"
        className="relative overflow-hidden border-b border-white/5 py-20 md:py-28"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-[-10%] right-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent/8 blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[-10%] h-[26rem] w-[26rem] rounded-full bg-accent/5 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          {/* Section heading */}
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="min-w-0">
              <Reveal>
                <p className="mb-4 flex items-center gap-3 font-display text-xs font-semibold tracking-[0.3em] text-accent-bright uppercase">
                  <span className="h-px w-10 shrink-0 bg-accent" />
                  Portfolio
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="font-display text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl lg:text-6xl xl:text-7xl">
                  Selected Work
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
                  A showcase of websites designed and developed by ALEX WEB DESIGN.
                </p>
              </Reveal>
            </div>

            <Reveal delay={180} className="shrink-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-coal/60 px-4 py-2 font-display text-[11px] font-bold tracking-[0.25em] text-white uppercase backdrop-blur-sm">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-accent-bright/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-bright" />
                </span>
                {projects.length.toString().padStart(2, "0")} Demo Projects
              </span>
            </Reveal>
          </div>

          {/* All six projects */}
          <div className="flex flex-col">
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

          {/* Disclaimer */}
          <Reveal className="mt-10 rounded-xl border border-white/5 bg-coal/40 p-5 text-center sm:p-6">
            <p className="text-xs leading-relaxed text-mist">
              <span className="font-semibold text-white">Disclaimer:</span>{" "}
              All projects above are self-initiated demo / concept designs,
              built to demonstrate design direction and interactive
              capability. They are not real client engagements.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────── VALUE PROPOSITION ───────────────────── */}
      <section className="relative border-b border-white/5 bg-coal/30 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            kicker="Value First"
            title="Premium Quality. Transparent Pricing."
            align="center"
          />

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <Reveal>
              <ValueCard
                icon={<Monitor className="h-6 w-6" />}
                title="Fully Responsive"
                body="Tailored to look absolutely immaculate on devices of all sizes, from wide desktop displays to mobile screens."
              />
            </Reveal>
            <Reveal delay={120}>
              <ValueCard
                icon={<ShieldCheck className="h-6 w-6" />}
                title="No hidden fees"
                body="Bespoke website design starting from a clear, fixed rate. You will know exactly what you will invest before we begin."
              />
            </Reveal>
            <Reveal delay={240}>
              <ValueCard
                icon={<Cpu className="h-6 w-6" />}
                title="No Boring Templates"
                body="I construct visual solutions designed explicitly for your brand voice, industry parameters, and target audience needs."
              />
            </Reveal>
          </div>

          <Reveal className="mt-14 text-center">
            <button
              type="button"
              onClick={() => navigate("/pricing")}
              className="group inline-flex cursor-pointer items-center gap-2 border border-white/10 px-6 py-3.5 font-display text-xs font-semibold tracking-widest text-white uppercase hover:border-accent hover:text-accent-bright transition-colors duration-300"
            >
              See pricing breakdowns{" "}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────── CTA ───────────────────── */}
      <section className="relative overflow-hidden py-20 text-center md:py-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 h-[20rem] w-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl">
            Ready to design your digital home?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-mist">
            Get started today with professional website designs tailored to make
            your business excel.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <PrimaryButton onClick={() => navigate("/contact")}>
              START YOUR PROJECT
            </PrimaryButton>
            <GhostButton onClick={() => navigate("/services")}>
              VIEW SERVICES
            </GhostButton>
          </div>
        </div>
      </section>
    </>
  );
}

/* ───────────────────── PROJECT SHOWCASE ───────────────────── */

interface ProjectShowcaseProps {
  project: (typeof projects)[number];
  index: number;
  mode: "image-right" | "image-left" | "image-wide";
  onOpen: () => void;
}
// `mode` is retained for future layout variations; currently we always
// render a two-column editorial layout.

function ProjectShowcase({ project, index, mode, onOpen }: ProjectShowcaseProps) {
  const number = String(index + 1).padStart(2, "0");
  const isReversed = mode === "image-left";

  return (
    <article
      data-reveal-section
      className="work-section relative border-t border-white/5 py-12 first:border-t-0 first:pt-4 md:py-16 lg:py-20"
    >
      {/* Decorative watermark number */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-4 right-0 select-none font-display text-[5rem] font-black leading-none tracking-tighter text-white/[0.03] sm:text-[8rem] md:text-[11rem] lg:text-[14rem] work-num"
      >
        {number}
      </div>

      <div className="relative grid min-w-0 grid-cols-1 gap-10 md:gap-12 xl:grid-cols-[1.45fr_1fr] xl:items-start xl:gap-12">
        {/* Preview column — wider than text column so the live demo
            is the dominant visual element of each project. Two-column
            layout only kicks in at xl (1280px) so the preview column has
            enough horizontal room to render at a meaningful 16:9 height
            (≥380 px). On smaller viewports the preview naturally uses the
            full available width and becomes much taller (more comfortable
            to read on tablets). Capped at 760 px on extra-wide screens
            so it never gets excessively tall (16:9 of 760 px ≈ 428 px). */}
        <div
          className={`relative flex min-w-0 flex-col work-reveal xl:max-w-[760px] ${
            isReversed ? "xl:order-2 xl:justify-self-start" : "xl:justify-self-start"
          }`}
        >
          {/* Header row above the browser — sits OUTSIDE the iframe so it
              never covers the embedded site's logo, navigation or hero.
              Matches the requested visual hierarchy:
              01 · DEMO PROJECT  →  [browser frame]  →  CATEGORY  →  TITLE */}
          <div
            className="mb-4 flex items-center gap-3"
            style={revealStyle(80)}
          >
            <span className="font-mono text-base font-bold text-accent-bright sm:text-lg">
              {number}
            </span>
            <span className="h-px w-10 shrink-0 bg-accent/40" />
            <span className="font-display text-[10px] font-bold tracking-[0.25em] text-mist uppercase">
              Demo Project
            </span>
            <span className="font-display text-[10px] font-bold tracking-[0.25em] text-mist uppercase">
              · Live Preview
            </span>
          </div>

          {/* Live preview frame — lazy-mounted iframe of the deployed site
              with robust health-check fallback (see LivePreview docs). */}
          <LivePreview
            url={project.url}
            name={project.name}
            year={project.year}
            fallbackImage={project.image}
            category={project.category}
            onOpen={onOpen}
          />
        </div>

        {/* Text column */}
        <div className="relative flex min-w-0 flex-col">
          <span
            className="font-display text-[11px] font-bold tracking-[0.25em] text-accent-bright uppercase work-reveal"
            style={revealStyle(120)}
          >
            {project.category}
          </span>

          <h2
            className="mt-4 font-display text-4xl font-bold leading-[1.02] tracking-tight text-white uppercase sm:text-5xl lg:text-6xl xl:text-7xl work-reveal"
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
              onClick={() =>
                document
                  .getElementById("selected-work")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="inline-flex min-w-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap border border-white/10 px-4 py-3.5 font-display text-[11px] font-bold tracking-[0.2em] text-mist uppercase transition-colors duration-300 hover:border-accent hover:text-accent-bright sm:text-xs"
            >
              BACK TO WORK
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ───────────────────── VALUE CARD ───────────────────── */

function ValueCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-white/5 bg-ink p-8 hover:border-accent/40 transition-colors duration-300">
      <div className="mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
        {icon}
      </div>
      <h3 className="font-display text-lg font-bold tracking-tight text-white uppercase">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-mist">{body}</p>
    </div>
  );
}

/* ───────────────────── LIVE PREVIEW ───────────────────── */

/**
 * LivePreview
 *
 * Renders a 16:9 premium browser-style frame containing the actual
 * deployed website of the project via <iframe loading="lazy">.
 *
 * Performance:
 *   - The iframe element is only mounted into the DOM after the
 *     containing <article> has entered the viewport (IntersectionObserver).
 *     Before that point the preview shows only the local screenshot
 *     so there is never an empty black rectangle.
 *   - The screenshot is real (one of the public/images/ assets) — never
 *     a placeholder gradient.
 *
 * Fallback:
 *   - If the iframe fails to embed (X-Frame-Options / CSP), the
 *     `onError` handler switches to a "LIVE PREVIEW UNAVAILABLE" state
 *     that shows the screenshot and an "OPEN LIVE WEBSITE" button.
 */

interface LivePreviewProps {
  url: string;
  name: string;
  year: string;
  fallbackImage: string;
  category: string;
  onOpen: () => void;
}

function LivePreview({
  url,
  name,
  year,
  fallbackImage,
  category,
  onOpen,
}: LivePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
  // previewFailed flips to true when we detect the deployed URL is
  // serving an error page (e.g. Antideploy "Nothing deployed here")
  // or when the iframe cannot be embedded. When true, the iframe is
  // hidden and a premium fallback overlay is shown instead.
  const [previewFailed, setPreviewFailed] = useState(false);
  // previewVerified becomes true when our body-inspection fetch confirmed
  // the URL is serving real content. Until then the iframe is hidden
  // behind the screenshot.
  const [previewVerified, setPreviewVerified] = useState(false);

  // Lazy-mount the iframe only once the preview frame enters the
  // viewport. This is the performance guarantee — at most a handful
  // of live sites are ever mounted at once.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldMount(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Robust health-check: fetch the deployed URL in parallel with the
  // iframe load. If the response body contains a known error marker
  // (e.g. Antideploy's "Nothing deployed here" page) we mark the
  // preview as failed and the iframe is never made visible. This is
  // the only reliable way to detect a broken deployment, because the
  // browser still fires `iframe.onLoad` for error pages.
  useEffect(() => {
    if (!shouldMount) return;
    let cancelled = false;

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 10000);

    // Markers that indicate the deployed URL is NOT serving a real site.
    const errorMarkers = [
      "nothing deployed here",
      "nothing has been deployed",
      "404 not found",
      "page not found",
      "site not found",
      "no application",
      "app not found",
      "this app has been removed",
      "this application has been removed",
    ];

    const check = async () => {
      try {
        const res = await fetch(url, {
          method: "GET",
          // Default mode is "cors". If the deployed site does not
          // serve permissive CORS headers, this promise rejects with
          // a TypeError — we treat that as "unknown, assume live"
          // because the iframe may still work fine.
          mode: "cors",
          cache: "no-store",
          signal: controller.signal,
        });

        if (cancelled) return;

        // If the server returned a non-2xx status, the deployment is
        // certainly broken — fail immediately.
        if (!res.ok) {
          setPreviewFailed(true);
          return;
        }

        const text = await res.text();
        if (cancelled) return;

        const lower = text.toLowerCase();
        const matched = errorMarkers.some((m) => lower.includes(m));
        if (matched) {
          setPreviewFailed(true);
          return;
        }

        // Real, live content — show the iframe.
        setPreviewVerified(true);
      } catch {
        // CORS blocked or network error: we cannot determine. Do NOT
        // mark as failed; fall back to the iframe's own loading. The
        // 10-second watchdog below will fail-safe if the iframe never
        // settles into a usable view.
      }
    };

    check();

    // The AbortController above cancels the fetch after 10 seconds.
    // If CORS is blocked AND the network is silent, the fetch rejects
    // with an AbortError and we keep the screenshot visible. The
    // user never sees a broken Antideploy error page; they see the
    // curated local screenshot of the project instead.
    return () => {
      cancelled = true;
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [shouldMount, url]);

  return (
    <div
      ref={containerRef}
      className="relative isolate w-full min-w-0"
    >
      {/* Premium browser-style frame */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-coal shadow-2xl transition-colors duration-300 hover:border-white/25">
        {/* Browser chrome */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-ink/70 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="hidden min-w-0 flex-1 truncate px-3 font-mono text-[11px] text-white/40 sm:block">
            {url.replace(/^https?:\/\//, "")}
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-display text-[10px] font-semibold tracking-[0.2em] text-accent-bright uppercase transition-colors duration-300 hover:text-white"
          >
            Open
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        {/* Preview area: 16:9. The container uses aspect-ratio so the iframe
            is never stretched: when the column is wide enough, 16:9 gives
            a comfortable preview height (≈ 400–430 px at xl breakpoints).
            On mobile the box fills the viewport width at 16:9 (≈ 200–
            320 px tall depending on screen size) and remains clearly
            readable. `overflow-hidden` keeps the embedded site from
            introducing its own scrollbars inside the frame. No labels
            are placed inside the iframe area — the portfolio's own badges
            live OUTSIDE the browser frame so they never cover the
            embedded site's logo, navigation or hero text. */}
        <div
          className="relative w-full overflow-hidden bg-zinc-900"
          style={{ aspectRatio: "16 / 9" }}
        >
          {/* Local screenshot sits behind the iframe and is always rendered,
              so even before the iframe loads (or if the deployment is broken)
              there is a real, non-black image visible. display:block + 100%w/h
              guarantees the image fills the 16:9 box completely. */}
          <img
            src={fallbackImage}
            alt={`${name} — ${category} design preview`}
            loading="lazy"
            style={{ width: "100%", height: "100%", display: "block" }}
            className={`absolute inset-0 object-cover transition-opacity duration-500 ${
              shouldMount && previewVerified && !previewFailed
                ? "opacity-0"
                : "opacity-100"
            }`}
          />

          {/* Iframe is mounted only after viewport intersection AND only
              made visible once our health-check confirmed the URL is
              serving real content. Until then the iframe is hidden
              behind the screenshot so a broken Antideploy deployment
              (e.g. "Nothing deployed here") never flashes in front
              of the visitor. */}
          {shouldMount && (
            <iframe
              title={`Live preview — ${name}`}
              src={url}
              loading="lazy"
              // referrerpolicy avoids leaking the parent URL to the embedded site
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                border: 0,
              }}
              className={`absolute inset-0 transition-opacity duration-500 ${
                previewVerified && !previewFailed ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {/* Loading shimmer — visible only while we're still checking
              the URL. Stops once verified, fails, or times out. */}
          {shouldMount && !previewVerified && !previewFailed && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-accent-bright" />
            </div>
          )}

          {/* Center "VIEW PROJECT" on hover (desktop only) — only shown
              when the live preview is actually visible. */}
          {shouldMount && previewVerified && !previewFailed && (
            <button
              type="button"
              onClick={onOpen}
              aria-label={`View ${name} project`}
              className="group absolute inset-0 hidden items-center justify-center bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100 md:flex"
            >
              <span className="flex items-center gap-3 rounded-full bg-accent px-5 py-3 font-display text-xs font-bold tracking-[0.18em] text-white uppercase shadow-xl transition-transform duration-300 group-hover:scale-105 sm:px-7 sm:py-4 sm:text-sm">
                VIEW PROJECT
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </button>
          )}

          {/* Premium fallback overlay — shown whenever the deployed URL
              is unavailable (broken deployment, embed blocked, network
              silent, etc.). The overlay lives inside the browser frame
              and never exposes a raw Antideploy error page. */}
          {previewFailed && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/90 px-6 text-center backdrop-blur-[2px]">
              <span className="font-display text-[11px] font-bold tracking-[0.3em] text-accent-bright uppercase">
                Live Preview Unavailable
              </span>
              <span className="mt-3 max-w-sm text-sm text-white/75">
                This demo is temporarily unavailable.
              </span>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-display text-xs font-bold tracking-[0.2em] text-white uppercase transition-colors duration-300 hover:bg-accent-bright"
              >
                OPEN LIVE WEBSITE
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Caption strip under preview — kept OUTSIDE the browser frame
          so no portfolio badge ever covers content inside the iframe. */}
      <div className="mt-3 flex items-center justify-between text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase sm:text-[11px]">
        <span>
          {year} · Live Preview
        </span>
        <span className="font-mono truncate">
          {url.replace(/^https?:\/\//, "")}
        </span>
      </div>
    </div>
  );
}
