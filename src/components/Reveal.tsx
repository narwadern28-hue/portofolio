import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { cn } from "../utils/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: keyof HTMLElementTagNameMap;
}

/**
 * Reveal-on-scroll wrapper.
 *
 * Uses CSS `opacity` + a *nested* inner span whose own transform animates,
 * so that any hover/translate utility on the OUTER element
 * (e.g. `group-hover:translate-x-1`) keeps working without being overwritten.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const inner = el.querySelector("[data-reveal-inner]") as HTMLElement | null;
    if (!inner) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (inner) inner.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      <span
        data-reveal-inner
        className="reveal-inner block w-full"
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </span>
    </Tag>
  );
}
