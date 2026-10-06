import type { ReactNode } from "react";
import { cn } from "../utils/cn";
import Reveal from "./Reveal";

/* ───────────────── Section heading ───────────────── */

export function SectionHeading({
  kicker,
  title,
  align = "left",
  className,
}: {
  kicker: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-10 md:mb-14", align === "center" && "text-center", className)}>
      <p className="mb-4 flex flex-wrap items-center gap-3 font-display text-xs font-medium tracking-[0.3em] text-accent-bright uppercase">
        {align === "left" && <span className="h-px w-10 shrink-0 bg-accent" />}
        {align === "center" ? (
          <span className="mx-auto flex flex-wrap items-center justify-center gap-3">
            <span className="h-px w-10 shrink-0 bg-accent" />
            <span>{kicker}</span>
            <span className="h-px w-10 shrink-0 bg-accent" />
          </span>
        ) : (
          <span>{kicker}</span>
        )}
      </p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-white uppercase sm:text-4xl lg:text-5xl xl:text-6xl">
        {title}
      </h2>
    </Reveal>
  );
}

/* ───────────────── Buttons ───────────────── */

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export function PrimaryButton({ children, onClick, href, className }: ButtonProps) {
  const classes = cn(
    "group inline-flex min-w-0 items-center justify-center gap-3 whitespace-nowrap bg-accent px-6 py-3.5 font-display text-[11px] font-semibold tracking-[0.18em] text-white uppercase transition-colors duration-300 hover:bg-accent-bright hover:shadow-[0_0_40px_-8px_rgba(59,110,255,0.7)] cursor-pointer sm:px-8 sm:py-4 sm:text-sm",
    className,
  );
  const arrow = (
    <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
      →
    </span>
  );
  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children} {arrow}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {children} {arrow}
    </button>
  );
}

export function GhostButton({ children, onClick, href, className }: ButtonProps) {
  const classes = cn(
    "group inline-flex min-w-0 items-center justify-center gap-3 whitespace-nowrap border border-white/20 px-6 py-3.5 font-display text-[11px] font-semibold tracking-[0.18em] text-white uppercase transition-colors duration-300 hover:border-accent hover:text-accent-bright cursor-pointer sm:px-8 sm:py-4 sm:text-sm",
    className,
  );
  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

/* ───────────────── Tag / badge ───────────────── */

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 whitespace-nowrap border border-accent/40 bg-accent/10 px-3 py-1 font-display text-[10px] font-medium tracking-[0.2em] text-accent-bright uppercase",
        className,
      )}
    >
      <span className="h-1 w-1 shrink-0 rounded-full bg-accent-bright" />
      {children}
    </span>
  );
}