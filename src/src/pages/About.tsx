import { useRouter } from "../utils/router";
import Reveal from "../components/Reveal";
import { SectionHeading, PrimaryButton } from "../components/ui";
import { Layout, Smartphone, Compass, Sparkles, Sliders, CheckSquare } from "lucide-react";

interface FocusPoint {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const focusPoints: FocusPoint[] = [
  {
    icon: <Layout className="h-6 w-6 text-accent-bright" />,
    title: "Modern Design",
    desc: "Clean layouts, beautiful typography, and generous negative space to present your brand.",
  },
  {
    icon: <Smartphone className="h-6 w-6 text-accent-bright" />,
    title: "Responsive Websites",
    desc: "Engineered to maintain balance, proportion, and speed perfectly across mobile, tablet, and desktop.",
  },
  {
    icon: <Compass className="h-6 w-6 text-accent-bright" />,
    title: "User Experience",
    desc: "Thoughtful navigation hierarchies and readable content layouts that make browsing comfortable.",
  },
  {
    icon: <CheckSquare className="h-6 w-6 text-accent-bright" />,
    title: "Professional Presentation",
    desc: "Every element is crafted to project immediate credibility and high standards to your potential clients.",
  },
  {
    icon: <Sparkles className="h-6 w-6 text-accent-bright" />,
    title: "Interactive Details",
    desc: "Smooth animations and polished interactive details that keep visitors engaged and delighted.",
  },
  {
    icon: <Sliders className="h-6 w-6 text-accent-bright" />,
    title: "Business-Focused",
    desc: "Every section has a purpose — designed to direct visitors smoothly towards booking or enquiry.",
  },
];

export default function About() {
  const { navigate } = useRouter();

  return (
    <>
      {/* Intro */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0">
              <SectionHeading kicker="Who is Alex?" title="About Me" className="mb-6" />
              <Reveal delay={120}>
                <div className="space-y-6 text-base leading-relaxed text-mist">
                  <p>
                    I'm Alex, a freelance web designer focused on creating modern,
                    responsive and visually engaging websites for businesses. I
                    enjoy combining clean design, thoughtful user experiences and
                    interactive details to create websites that look professional
                    and work smoothly across devices.
                  </p>
                  <p>
                    I work with businesses that want a modern online presence that
                    represents their brand effectively. Whether you need a
                    brand-new website designed from scratch or a complete
                    structural redesign of your existing layout, I bring visual
                    focus and structural integrity to every project.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/5 pt-8">
                  <div>
                    <p className="font-display text-[10px] font-semibold tracking-[0.25em] text-white/50 uppercase">
                      Role
                    </p>
                    <p className="mt-1 font-display text-sm font-bold tracking-wide text-white uppercase">
                      Freelance Web Designer
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-[10px] font-semibold tracking-[0.25em] text-white/50 uppercase">
                      Service Focus
                    </p>
                    <p className="mt-1 font-display text-sm font-bold tracking-wide text-white uppercase">
                      Commercial & Business Websites
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={150}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-coal/40 min-h-[280px] sm:aspect-video lg:aspect-auto lg:h-full">
                <img
                  src="/images/about-workspace.jpg"
                  alt="Web design workspace"
                  className="h-full w-full object-cover transition-transform duration-700"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="font-display text-xs font-bold tracking-[0.25em] text-accent-bright uppercase">
                    ESTABLISHING REAL DIGITAL TRUST
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Focus Points */}
      <section className="border-t border-white/5 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading kicker="Core Values" title="My Design Philosophy" />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {focusPoints.map((point, i) => (
              <Reveal key={point.title} delay={i * 80}>
                <div className="group flex h-full flex-col rounded-2xl border border-white/5 bg-coal/30 p-8 hover:border-accent/40 transition-colors duration-300">
                  <div className="mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent-bright transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    {point.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold tracking-tight text-white uppercase">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    {point.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-16 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <PrimaryButton onClick={() => navigate("/contact")}>
            START YOUR PROJECT
          </PrimaryButton>
        </div>
      </section>
    </>
  );
}
