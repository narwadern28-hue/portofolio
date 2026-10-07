import { useState, useRef, FormEvent } from "react";
import { useCurrency } from "../utils/CurrencyContext";
import Reveal from "../components/Reveal";
import { SectionHeading } from "../components/ui";
import { Mail, CheckCircle2, Send, Loader2, Sparkles } from "lucide-react";

const FAILURE_MESSAGE =
  "Something went wrong. Please try again or email webdesigner.rn@gmail.com.";

export default function Contact() {
  const { currentCurrency } = useCurrency();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Basic protection against accidental duplicate submissions.
    if (loading) return;
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      businessName: String(data.get("businessName") || "").trim(),
      websiteType: String(data.get("websiteType") || ""),
      budget: String(data.get("budget") || ""),
      details: String(data.get("details") || "").trim(),
      // Honeypot (always empty for real users; bots may fill it).
      company_website: String(data.get("company_website") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => null)) as {
        ok?: boolean;
      } | null;
      if (!res.ok || !json || json.ok !== true) {
        throw new Error("send_failed");
      }
      form.reset();
      setSuccess(true);
    } catch {
      setError(FAILURE_MESSAGE);
    } finally {
      setLoading(false);
    }
  };

  const baseAmount = `${currentCurrency.symbol}${currentCurrency.amount}+`;

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading kicker="Get in Touch" title="Start Your Project" />

        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,360px)] lg:gap-16">
          <Reveal>
            {success ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-accent/20 bg-coal/40 p-10 text-center animate-fade-in">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent-bright">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-white uppercase">
                  Project Enquiry Sent
                </h3>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-mist">
                  Thanks for reaching out. I’ll review your project details
                  and get back to you.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-8 cursor-pointer font-display text-xs font-bold tracking-widest text-accent-bright hover:text-white uppercase transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="grid gap-6"
                noValidate={false}
              >
                {/* Honeypot field for bots — invisible to real visitors. */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    defaultValue=""
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block font-display text-[10px] font-bold tracking-widest text-mist uppercase"
                    >
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      type="text"
                      maxLength={100}
                      autoComplete="name"
                      placeholder="Your name"
                      className="w-full rounded-lg border border-white/10 bg-coal/50 px-4 py-3.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block font-display text-[10px] font-bold tracking-widest text-mist uppercase"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      required
                      type="email"
                      maxLength={254}
                      autoComplete="email"
                      placeholder="you@email.com"
                      className="w-full rounded-lg border border-white/10 bg-coal/50 px-4 py-3.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="biz-name"
                      className="mb-2 block font-display text-[10px] font-bold tracking-widest text-mist uppercase"
                    >
                      Business Name *
                    </label>
                    <input
                      id="biz-name"
                      name="businessName"
                      required
                      type="text"
                      maxLength={160}
                      autoComplete="organization"
                      placeholder="Your company name"
                      className="w-full rounded-lg border border-white/10 bg-coal/50 px-4 py-3.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="web-type"
                      className="mb-2 block font-display text-[10px] font-bold tracking-widest text-mist uppercase"
                    >
                      Website Type *
                    </label>
                    <select
                      id="web-type"
                      name="websiteType"
                      required
                      defaultValue=""
                      className="w-full rounded-lg border border-white/10 bg-coal/50 px-4 py-3.5 text-sm text-white transition-colors focus:border-accent focus:outline-none"
                    >
                      <option value="" disabled className="bg-coal text-white">
                        Select a website type...
                      </option>
                      <option className="bg-coal text-white">Business Website Design</option>
                      <option className="bg-coal text-white">Website Redesign</option>
                      <option className="bg-coal text-white">Landing Page Design</option>
                      <option className="bg-coal text-white">Responsive Web Design</option>
                      <option className="bg-coal text-white">Interactive Website Design</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="mb-2 block font-display text-[10px] font-bold tracking-widest text-mist uppercase"
                  >
                    Project Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    defaultValue=""
                    className="w-full rounded-lg border border-white/10 bg-coal/50 px-4 py-3.5 text-sm text-white transition-colors focus:border-accent focus:outline-none"
                  >
                    <option value="" disabled className="bg-coal text-white">
                      Select budget parameters...
                    </option>
                    <option className="bg-coal text-white">
                      {baseAmount} (Starting Fixed Minimum)
                    </option>
                    <option className="bg-coal text-white">Mid-Tier Bespoke Build</option>
                    <option className="bg-coal text-white">Advanced / Enterprise Integration</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="details"
                    className="mb-2 block font-display text-[10px] font-bold tracking-widest text-mist uppercase"
                  >
                    Project Details *
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={6}
                    placeholder="Tell me about your business and what you want your website to achieve..."
                    className="w-full resize-none rounded-lg border border-white/10 bg-coal/50 px-4 py-3.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-accent focus:outline-none"
                  />
                </div>

                {error && (
                  <p
                    role="alert"
                    className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm leading-relaxed text-red-200"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full cursor-pointer items-center justify-center gap-3 bg-accent px-8 py-4 font-display text-sm font-semibold tracking-[0.18em] text-white uppercase transition-colors duration-300 hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>SENDING...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND PROJECT ENQUIRY</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </Reveal>

          {/* Quick Info Sidebar */}
          <Reveal delay={120}>
            <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5">
              <li className="bg-ink p-7">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
                  <Mail className="h-5 w-5" />
                </div>
                <p className="font-display text-[10px] font-bold tracking-widest text-mist uppercase">
                  Email Alex Directly
                </p>
                <a
                  href="mailto:webdesigner.rn@gmail.com"
                  className="mt-1 block break-all font-display text-base font-semibold text-white hover:text-accent-bright transition-colors"
                >
                  webdesigner.rn@gmail.com
                </a>
              </li>
              <li className="bg-ink p-7">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="font-display text-[10px] font-bold tracking-widest text-mist uppercase">
                  Response Times
                </p>
                <p className="mt-2 text-xs leading-relaxed text-mist">
                  Average response window sits under 24 hours. Clear, detailed
                  project outlines always receive immediate priority.
                </p>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
