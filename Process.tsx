import { useRouter } from "../utils/router";
import Reveal from "../components/Reveal";
import { SectionHeading, PrimaryButton } from "../components/ui";

interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  details: string[];
}

const steps: ProcessStep[] = [
  {
    num: "01",
    title: "Discovery",
    desc: "Understand the business, audience, objectives, and project requirements.",
    details: [
      "Initial business analysis and target audience mapping",
      "Content strategy outline and site map creation",
      "Functional requirements definition and technical scoping",
    ],
  },
  {
    num: "02",
    title: "Design",
    desc: "Create the visual direction, design language, and user experience.",
    details: [
      "Custom style tiles, color systems, and type combinations",
      "Interactive structural wireframes for key breakpoints",
      "Refined high-fidelity mockups mapping specific user flows",
    ],
  },
  {
    num: "03",
    title: "Development",
    desc: "Build the fully responsive, lightning-fast website code structures.",
    details: [
      "Clean, semantic modern markup structures",
      "Optimal performance audits and light image compression",
      "Aesthetic scroll reveals and interactive animations",
    ],
  },
  {
    num: "04",
    title: "Review",
    desc: "Refine and calibrate the website based on your specific feedback.",
    details: [
      "Comprehensive walk-through with design revisions",
      "Content accuracy and link integrity assessment",
      "Layout tuning and user experience alignment",
    ],
  },
  {
    num: "05",
    title: "Launch",
    desc: "Prepare, inspect, test and release the completed website to the world.",
    details: [
      "Cross-browser and multi-device usability check",
      "Search Engine Optimization metadata configuration",
      "Domain pairing, server configurations, and live release",
    ],
  },
];

export default function Process() {
  const { navigate } = useRouter();

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading kicker="My Methodology" title="How I Work" />

        <div className="mt-12 flex flex-col gap-10">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 80}>
              <div className="grid gap-6 border-b border-white/5 pb-10 last:border-b-0 md:grid-cols-[180px_1fr] md:gap-12">
                <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-accent/40 bg-accent/5 font-display text-base font-bold text-accent-bright transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    {step.num}
                  </span>
                  <p className="font-display text-[11px] font-semibold tracking-widest text-mist uppercase">
                    Step {step.num}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-mist">
                      {step.desc}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-coal/30 p-6">
                    <h4 className="mb-4 font-display text-[11px] font-bold tracking-widest text-white/50 uppercase">
                      Key Deliverables
                    </h4>
                    <ul className="grid gap-3">
                      {step.details.map((detail, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2.5 text-xs leading-relaxed text-mist"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-bright" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-12 text-center">
          <p className="mb-4 font-display text-xs font-semibold tracking-widest text-accent-bright uppercase">
            Next Steps
          </p>
          <h2 className="mb-8 font-display text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl">
            Let's build something exceptional.
          </h2>
          <PrimaryButton onClick={() => navigate("/contact")}>
            START YOUR PROJECT
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}