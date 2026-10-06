import { useRouter, Path } from "../utils/router";

const linkGroups: { title: string; links: { label: string; path: Path }[] }[] = [
  {
    title: "Navigate",
    links: [
      { label: "Home", path: "/" },
      { label: "Work", path: "/work" },
      { label: "Pricing", path: "/pricing" },
    ],
  },
  {
    title: "Capabilities",
    links: [
      { label: "Services", path: "/services" },
      { label: "Our Process", path: "/process" },
      { label: "Contact", path: "/contact" },
    ],
  },
];

export default function Footer() {
  const { navigate: go } = useRouter();
  return (
    <footer className="site-footer border-t border-white/5 bg-coal/60">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <button
              type="button"
              onClick={() => go("/")}
              className="group flex cursor-pointer items-center gap-3.5 text-left focus:outline-none"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-accent font-display text-base font-bold text-white transition-colors duration-300 group-hover:bg-accent-bright">
                A
              </span>
              <span className="font-display text-sm font-bold tracking-[0.2em] text-white uppercase group-hover:text-accent-bright transition-colors">
                ALEX WEB DESIGN
              </span>
            </button>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">
              Modern websites for businesses that want a stronger online
              presence. Crafted with meticulous aesthetic choices and
              lightweight structural builds.
            </p>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="font-display text-[11px] font-bold tracking-widest text-white/50 uppercase mb-4">
                {group.title}
              </h4>
              <ul className="grid gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => go(link.path)}
                      className="cursor-pointer font-display text-xs font-semibold tracking-wider text-mist hover:text-accent-bright transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/5 pt-8 flex flex-col gap-4 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} ALEX WEB DESIGN. All rights reserved.</p>
            <p>
              Direct contact:{" "}
              <a
                href="mailto:webdesigner.rn@gmail.com"
                className="text-white/60 hover:text-accent-bright transition-colors"
              >
                webdesigner.rn@gmail.com
              </a>
            </p>
          </div>
          <p className="max-w-md leading-relaxed">
            Portfolio projects shown are demo concepts unless otherwise stated.
          </p>
        </div>
      </div>
    </footer>
  );
}