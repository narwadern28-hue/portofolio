import { useRouter } from "../utils/router";
import { useCurrency } from "../utils/CurrencyContext";
import { currencies, CurrencyCode } from "../utils/currency";
import Reveal from "../components/Reveal";
import { SectionHeading, PrimaryButton } from "../components/ui";
import { Check, Info, ShieldCheck, Zap } from "lucide-react";

export default function Pricing() {
  const { navigate } = useRouter();
  const { currentCurrency, setCurrency } = useCurrency();

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          kicker="Honest & Fixed"
          title="Professional Websites From $99"
          align="center"
        />

        {/* Lead description */}
        <Reveal className="mx-auto mt-4 max-w-2xl text-center">
          <p className="text-base leading-relaxed text-mist">
            Transparent pricing for every market. Select your currency above to
            view the fixed base starting price for your region. Custom quotes
            are available for larger or more advanced projects.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_minmax(0,380px)] lg:gap-12">
          {/* Main Pricing Card */}
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-coal/40 p-8 shadow-2xl hover:border-accent/60 transition-colors duration-300 sm:p-10">
              <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <span className="font-display text-[11px] font-semibold tracking-[0.25em] text-accent-bright uppercase">
                    International Starting Rate
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white uppercase sm:text-3xl xl:text-4xl">
                    PROFESSIONAL WEBSITE
                  </h3>
                </div>
                <div className="shrink-0 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-display text-[10px] font-bold tracking-widest text-accent-bright uppercase">
                  Best Value
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-baseline gap-3">
                <span className="text-xs font-semibold tracking-widest text-mist uppercase">
                  Starting From
                </span>
                <span className="font-display text-5xl font-black tracking-tight text-white sm:text-6xl">
                  {currentCurrency.symbol}
                  {currentCurrency.amount}
                </span>
                <span className="font-display text-base font-bold tracking-widest text-accent-bright uppercase">
                  {currentCurrency.code}
                </span>
              </div>

              <p className="mt-4 max-w-2xl text-xs leading-relaxed text-mist">
                * These are fixed base prices and minimum starting prices. More
                advanced projects may require a custom quote.
              </p>

              <div className="mt-10 border-t border-white/5 pt-8">
                <h4 className="mb-6 font-display text-[11px] font-bold tracking-widest text-white uppercase">
                  What is included in the base rate:
                </h4>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Immaculate custom responsive visual design",
                    "Domain mapping and DNS launch support",
                    "Integrated high-converting booking & enquiry forms",
                    "Full mobile & tablet layout compatibility",
                    "Standard layout optimization for rapid load times",
                    "Security configurations & SSL pairs setup support",
                  ].map((inc) => (
                    <li
                      key={inc}
                      className="flex items-start gap-2.5 text-xs leading-relaxed text-mist"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-bright" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <PrimaryButton
                  onClick={() => navigate("/contact")}
                  className="w-full sm:w-auto"
                >
                  START YOUR PROJECT
                </PrimaryButton>
              </div>
            </div>
          </Reveal>

          {/* Regional Reference & Currency Swapping List */}
          <Reveal delay={120}>
            <div className="flex h-full flex-col rounded-3xl border border-white/5 bg-coal/20 p-6 sm:p-8">
              <h3 className="mb-5 font-display text-[11px] font-bold tracking-[0.2em] text-white/50 uppercase">
                All Fixed Regional Starting Rates
              </h3>
              <ul className="grid gap-3">
                {(Object.keys(currencies) as CurrencyCode[]).map((code) => {
                  const curr = currencies[code];
                  const isCurrent = currentCurrency.code === code;
                  return (
                    <li key={code}>
                      <button
                        type="button"
                        onClick={() => setCurrency(code)}
                        className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border p-4 text-left transition-colors duration-300 ${
                          isCurrent
                            ? "border-accent bg-accent/5"
                            : "border-white/5 bg-ink/40 hover:border-white/15"
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="font-display text-xs font-bold text-white uppercase">
                            {curr.country}
                          </p>
                          <p className="mt-0.5 text-[10px] font-semibold text-mist">
                            Fixed Minimum Base Rate
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <span className="font-display text-base font-black text-white">
                            {curr.symbol}
                            {curr.amount}
                          </span>
                          <p className="mt-0.5 text-[9px] font-bold tracking-widest text-accent-bright">
                            {curr.code}
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 flex gap-3 rounded-xl border border-white/5 bg-white/[0.01] p-4 text-xs leading-relaxed text-mist">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-bright" />
                <p>
                  These are fixed starting prices established for each
                  respective market — they are not live currency conversions.
                  Custom design features or larger structural loads will
                  trigger custom quotes.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Trust features */}
        <div className="mt-20 grid gap-8 border-t border-white/5 pt-14 sm:grid-cols-2 md:grid-cols-3">
          <Reveal>
            <div className="flex gap-4">
              <ShieldCheck className="h-6 w-6 shrink-0 text-accent-bright" />
              <div className="min-w-0">
                <h4 className="font-display text-sm font-bold tracking-wider text-white uppercase">
                  No Hidden Traps
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-mist">
                  Every deliverable, timeline milestone, and cost tier is
                  agreed in writing before we code anything.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex gap-4">
              <Zap className="h-6 w-6 shrink-0 text-accent-bright" />
              <div className="min-w-0">
                <h4 className="font-display text-sm font-bold tracking-wider text-white uppercase">
                  Agile Execution
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-mist">
                  We maintain momentum using weekly iterative walkthroughs so
                  you never lose control of the creative output.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex gap-4">
              <Info className="h-6 w-6 shrink-0 text-accent-bright" />
              <div className="min-w-0">
                <h4 className="font-display text-sm font-bold tracking-wider text-white uppercase">
                  Free Lifetime Handover
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-mist">
                  Once your site launches, you receive all credentials, visual
                  source assets, and source files at no extra fee.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}