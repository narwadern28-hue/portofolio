import { useRouter } from "../utils/router";
import { useCurrency } from "../utils/CurrencyContext";
import Reveal from "../components/Reveal";
import { SectionHeading } from "../components/ui";
import { Check, ArrowRight } from "lucide-react";

interface ServiceItem {
  title: string;
  desc: string;
  included: string[];
  idealFor: string;
}

const servicesList: ServiceItem[] = [
  {
    title: "Business Website Design",
    desc: "Complete custom website structures designed to establish and scale your business's presence.",
    included: [
      "Custom layouts and structural discovery",
      "Dynamic lead generation forms",
      "Essential page assets (Home, Services, Contact, etc.)",
      "Domain and DNS launch assistance",
    ],
    idealFor:
      "Growing local companies, service operators, and premium boutique agencies.",
  },
  {
    title: "Website Redesign",
    desc: "Transform outdated, slow, or poorly structured websites into modern, high-converting digital storefronts.",
    included: [
      "In-depth analysis of existing usability issues",
      "Structural overhaul for conversion and Speed",
      "Preservation of SEO equity and content redirects",
      "Contemporary typography and styling update",
    ],
    idealFor:
      "Established operations looking to capture more online bookings and raise aesthetic value.",
  },
  {
    title: "Landing Page Design",
    desc: "Focused, single-page marketing structures optimized to turn advertising traffic into action.",
    included: [
      "Distraction-free, single-action conversion funnels",
      "Ultra-clear layout hierarchies",
      "Integrated booking and enquiry channels",
      "Speed optimized for immediate click response",
    ],
    idealFor:
      "Product launches, paid advertising campaigns, and direct customer acquisition.",
  },
  {
    title: "Responsive Web Design",
    desc: "Ensuring your website maintains beautiful layout ratios, spacing, and font balances across any viewport.",
    included: [
      "Adaptive grid arrangements for desktop and laptop",
      "Comfortable touch targets for tablets",
      "One-handed mobile layout structures",
      "Asset sizing optimizations for rapid mobile rendering",
    ],
    idealFor:
      "Businesses with a high proportion of mobile visitors or social media marketing channels.",
  },
  {
    title: "Interactive Website Design",
    desc: "Polishing your website with purposeful custom animations, responsive interactive controls, and visual details.",
    included: [
      "Purposeful scroll-reveals and hover states",
      "Dynamic interactive sections (calculators, customizers)",
      "High performance, lightweight execution",
      "Engaging page-transition curves",
    ],
    idealFor:
      "Brands wanting to leave a highly premium, cutting-edge first impression on potential clients.",
  },
];

export default function Services() {
  const { navigate } = useRouter();
  const { currentCurrency } = useCurrency();

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          kicker="My Core Capabilities"
          title="Designed for conversions."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesList.map((service, i) => (
            <Reveal key={service.title} delay={i * 100}>
              <div className="flex h-full flex-col rounded-2xl border border-white/5 bg-coal/40 p-8 hover:border-accent/40 transition-colors duration-300">
                <span className="font-mono text-xs font-semibold text-accent-bright">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-white uppercase">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-mist">
                  {service.desc}
                </p>

                <div className="mt-8 border-t border-white/5 pt-6">
                  <h4 className="mb-4 font-display text-[11px] font-bold tracking-widest text-white uppercase">
                    What is included:
                  </h4>
                  <ul className="grid gap-3">
                    {service.included.map((inc) => (
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

                <div className="mt-8 border-t border-white/5 pt-6">
                  <h4 className="mb-2 font-display text-[10px] font-bold tracking-widest text-white/50 uppercase">
                    Ideal Client
                  </h4>
                  <p className="text-xs leading-relaxed text-mist font-medium">
                    {service.idealFor}
                  </p>
                </div>

                <div className="mt-8 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate("/contact")}
                    className="group flex w-full cursor-pointer items-center justify-between border border-accent/40 bg-accent/5 px-5 py-3.5 font-display text-[11px] font-bold tracking-widest text-white uppercase hover:bg-accent hover:border-accent transition-colors duration-300"
                  >
                    <span>
                      GET STARTED FROM {currentCurrency.symbol}
                      {currentCurrency.amount}
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}