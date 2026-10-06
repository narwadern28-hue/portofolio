import { useState, useEffect, useRef } from "react";
import { cn } from "../utils/cn";
import { useRouter, Path } from "../utils/router";
import { useCurrency } from "../utils/CurrencyContext";
import { currencies, CurrencyCode } from "../utils/currency";
import { Globe, Menu, X, ArrowRight, Check } from "lucide-react";

const navigationLinks: { label: string; path: Path }[] = [
  { label: "Home", path: "/" },
  { label: "Work", path: "/work" },
  { label: "Services", path: "/services" },
  { label: "Process", path: "/process" },
  { label: "About", path: "/about" },
  { label: "Pricing", path: "/pricing" },
  { label: "Contact", path: "/contact" },
];

export default function Nav() {
  const { currentPath, navigate } = useRouter();
  const { currentCurrency, setCurrency } = useCurrency();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  // Measure actual header height and expose it as a CSS variable so
  // <main> can pad itself by the same amount. This is the root fix
  // for header-overlapping-first-section bugs across breakpoints.
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      const el = headerRef.current;
      if (!el) return;
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty(
        "--site-header-h",
        `${Math.round(h)}px`,
      );
    };
    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    if (headerRef.current) ro.observe(headerRef.current);
    window.addEventListener("resize", updateHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setMobileOpen(false);
    setCurrencyOpen(false);
  }, [currentPath]);

  // Lock body scroll while mobile menu is open so the overlay never
  // shows page content scrolling behind it.
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "site-header border-b transition-colors duration-300",
          scrolled || mobileOpen || currencyOpen
            ? "border-white/10 bg-ink/95 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-10 min-w-0">
          {/* Brand & Blue square "A" logo */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="group flex min-w-0 cursor-pointer items-center gap-3 focus:outline-none"
            aria-label="Go to home"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-accent font-display text-base font-bold text-white transition-colors duration-300 group-hover:bg-accent-bright">
              A
            </span>
            <div className="min-w-0 text-left leading-tight">
              <span className="block font-display text-sm font-bold tracking-[0.18em] text-white uppercase transition-colors duration-300 group-hover:text-accent-bright sm:text-[0.95rem]">
                ALEX WEB DESIGN
              </span>
              <span className="hidden font-display text-[10px] font-medium tracking-[0.22em] text-mist uppercase sm:block">
                Freelance Web Designer
              </span>
            </div>
          </button>

          {/* Desktop Navigation — only at xl and above to guarantee space */}
          <nav className="hidden items-center gap-3 xl:flex min-w-0">
            <ul className="flex items-center gap-1">
              {navigationLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <li key={link.path}>
                    <button
                      type="button"
                      onClick={() => navigate(link.path)}
                      className={cn(
                        "relative cursor-pointer px-3 py-2 font-display text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 hover:text-white",
                        isActive ? "text-white" : "text-mist",
                      )}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute inset-x-3 bottom-0.5 h-px bg-accent" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Currency Dropdown Selector */}
            <div className="relative ml-2 shrink-0">
              <button
                type="button"
                onClick={() => setCurrencyOpen((v) => !v)}
                className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-md border border-white/10 bg-coal/60 px-3 py-2 font-display text-[11px] font-semibold tracking-wider text-white hover:border-accent hover:text-accent-bright transition-colors duration-300"
                aria-expanded={currencyOpen}
                aria-haspopup="true"
              >
                <Globe className="h-3.5 w-3.5 text-accent-bright" />
                <span>
                  {currentCurrency.code} ({currentCurrency.symbol})
                </span>
              </button>

              {currencyOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setCurrencyOpen(false)}
                  />
                  <div
                    className="absolute right-0 top-full mt-2 z-50 w-60 rounded-lg border border-white/10 bg-coal p-1.5 shadow-2xl animate-fade-in"
                    role="menu"
                  >
                    <div className="px-3 py-2 text-[10px] font-bold tracking-widest text-mist uppercase border-b border-white/5 mb-1">
                      Select Region Currency
                    </div>
                    <ul className="grid gap-0.5">
                        {(Object.keys(currencies) as CurrencyCode[]).map((code) => {
                          const cur = currencies[code];
                          const isSelected = currentCurrency.code === code;
                          return (
                            <li key={code}>
                              <button
                                type="button"
                                onClick={() => {
                                  setCurrency(code);
                                  setCurrencyOpen(false);
                                }}
                                className={cn(
                                  "flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-left text-xs tracking-wide transition-colors",
                                  isSelected
                                    ? "bg-accent/15 text-accent-bright font-semibold"
                                    : "text-white hover:bg-white/5",
                                )}
                                role="menuitemradio"
                                aria-checked={isSelected}
                              >
                                <span className="flex items-center gap-2">
                                  {isSelected && (
                                    <Check className="h-3.5 w-3.5 text-accent-bright" />
                                  )}
                                  {cur.country}
                                </span>
                                <span className="font-mono font-semibold text-mist">
                                  {cur.symbol}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                  </div>
                </>
              )}
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="group ml-1 flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap border border-accent/60 bg-accent/5 px-4 py-2 font-display text-[11px] font-semibold tracking-[0.18em] text-white uppercase transition-colors duration-300 hover:bg-accent hover:border-accent"
            >
              Start a Project
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </nav>

          {/* Mobile / tablet bar (below xl) */}
          <div className="flex items-center gap-2 xl:hidden">
            <select
              value={currentCurrency.code}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              aria-label="Select region currency"
              className="cursor-pointer rounded-md border border-white/10 bg-coal/60 px-2.5 py-2 font-display text-[11px] font-semibold text-white focus:outline-none focus:border-accent"
            >
              {(Object.keys(currencies) as CurrencyCode[]).map((code) => (
                <option key={code} value={code} className="bg-coal text-white">
                  {currencies[code].symbol} {code}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center border border-white/10 bg-coal text-white"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay — hangs directly beneath the header */}
      {mobileOpen && (
        <div className="site-mobile-menu flex flex-col bg-ink px-6 pb-10 pt-6 animate-fade-in xl:hidden">
          <nav>
            <ul className="grid gap-0">
              {navigationLinks.map((link, i) => {
                const isActive = currentPath === link.path;
                return (
                  <li key={link.path} className="border-b border-white/5">
                    <button
                      type="button"
                      onClick={() => navigate(link.path)}
                      className="flex w-full cursor-pointer items-baseline gap-4 py-4 text-left"
                    >
                      <span className="font-display text-[11px] font-semibold text-accent-bright">
                        0{i + 1}
                      </span>
                      <span
                        className={cn(
                          "font-display text-2xl font-bold tracking-tight uppercase transition-colors duration-200",
                          isActive
                            ? "text-accent-bright"
                            : "text-white hover:text-accent-bright",
                        )}
                      >
                        {link.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto pt-8">
            <p className="font-display text-[10px] tracking-[0.2em] text-mist uppercase mb-2">
              Direct Enquiry
            </p>
            <a
              href="mailto:webdesigner.rn@gmail.com"
              className="block font-display text-base font-semibold text-white hover:text-accent-bright break-all"
            >
              webdesigner.rn@gmail.com
            </a>
            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="mt-6 flex w-full cursor-pointer items-center justify-center gap-3 bg-accent py-4 font-display text-sm font-semibold tracking-[0.18em] text-white uppercase transition-colors duration-300 hover:bg-accent-bright"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
