"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CalendarDays, Building2, Globe2, Trophy, Rocket } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


type TimelineItem = {
  year: string;
  badge: string;
  title: string;
  description: string;
  icon: React.ElementType;
};

export default function CompanyTimeline() {
  const t = useTranslations("CompanyTimeline");

  const sectionRef = React.useRef<HTMLDivElement>(null);

  const lineRef = React.useRef<HTMLDivElement>(null);

  const cardsRef = React.useRef<(HTMLDivElement | null)[]>([]);
  
  React.useEffect(() => {
  const section = sectionRef.current;

  if (!section) return;

  const handleMove = (e: MouseEvent) => {
    const cards = cardsRef.current;

    const x =
      (e.clientX / window.innerWidth - 0.5) * 12;

    const y =
      (e.clientY / window.innerHeight - 0.5) * 12;

    cards.forEach((card) => {
      if (!card) return;

      gsap.to(card, {
        x,
        y,
        duration: 1,
        ease: "power3.out",
      });
    });
  };

  section.addEventListener("mousemove", handleMove);

  return () =>
    section.removeEventListener(
      "mousemove",
      handleMove
    );
}, []);

  const timeline = [
  {
    year: "2022",
    badge: t("timeline2022.badge"),
    title: t("timeline2022.title"),
    description: t("timeline2022.description"),
    icon: Building2,
  },
  {
    year: "2023",
    badge: t("timeline2023.badge"),
    title: t("timeline2023.title"),
    description: t("timeline2023.description"),
    icon: Globe2,
  },
  {
    year: "2024",
    badge: t("timeline2024.badge"),
    title: t("timeline2024.title"),
    description: t("timeline2024.description"),
    icon: CalendarDays,
  },
  {
    year: "2025",
    badge: t("timeline2025.badge"),
    title: t("timeline2025.title"),
    description: t("timeline2025.description"),
    icon: Trophy,
  },
  {
    year: "2026",
    badge: t("timeline2026.badge"),
    title: t("timeline2026.title"),
    description: t("timeline2026.description"),
    icon: Rocket,
  },
];


      useGSAP(
        () => {
          if (!sectionRef.current) return;

          // ===========================
          // Section Header Animation
          // ===========================

          const header = sectionRef.current.querySelector("h2");
          const description = sectionRef.current.querySelector("p");

          gsap.from(header, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
            },
          });

          gsap.from(description, {
            y: 40,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: description,
              start: "top 85%",
            },
          });

          // ===========================
          // Timeline Vertical Line
          // ===========================

          if (lineRef.current) {
            gsap.set(lineRef.current, {
              transformOrigin: "top center",
              scaleY: 0,
            });

            gsap.to(lineRef.current, {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                end: "bottom 80%",
                scrub: true,
              },
            });
          }

          // ===========================
          // Timeline Cards
          // ===========================

          cardsRef.current.forEach((card, index) => {
            if (!card) return;

            gsap.from(card, {
              opacity: 0,
              x: index % 2 === 0 ? -80 : 80,
              y: 40,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          });

          // ===========================
          // Timeline Dots
          // ===========================

          gsap.utils.toArray<HTMLElement>(".timeline-dot").forEach((dot) => {
            gsap.from(dot, {
              scale: 0,
              rotate: 180,
              duration: 0.6,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: dot,
                start: "top 90%",
              },
            });
          });
        },
        { scope: sectionRef },
      );
    // },
    // { scope: sectionRef },
//   );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-24 lg:py-32"
    >
      {/* Background Pattern */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,.06),transparent_40%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.05]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Part-1A-2 এ */}
        {/* =========================
        SECTION HEADER
========================= */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto mb-24 max-w-4xl text-center"
        >
          {/* Small Badge */}

          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-5 py-2">
            <span className="h-2 w-2 rounded-full bg-primary" />

            <span className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
              {t("tag")}
            </span>
          </div>

          {/* Heading */}

          <h2 className="text-4xl font-black leading-tight text-foreground md:text-6xl lg:text-7xl">
            {t("title1")}

            <span className="mt-2 block text-primary">{t("title2")}</span>
          </h2>

          {/* Divider */}

          <div className="mx-auto mt-8 h-[3px] w-28 rounded-full bg-primary" />

          {/* Description */}

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-muted-foreground">
            {t("description")}
          </p>
        </motion.div>

        {/* =========================
        TIMELINE WRAPPER
========================= */}

        <div className="relative">
          {/* Vertical Line */}

          <div
            ref={lineRef}
            className="absolute left-6 top-0 hidden h-full w-[3px] rounded-full bg-border lg:block"
          />

          {/* Timeline Cards */}

          <div className="space-y-16">
            {/*  Part-1B এ Timeline Cards  */}
            {timeline.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.year}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  initial={{
                    opacity: 0,
                    x: isEven ? -80 : 80,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                  }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Desktop Timeline */}

                  <div
                    className={`hidden lg:grid lg:grid-cols-2 lg:gap-16 ${
                      isEven ? "" : "direction-rtl"
                    }`}
                  >
                    {/* Card */}

                    <div className={`${isEven ? "" : "lg:order-2"}`}>
                      <motion.div
                        whileHover={{
                          y: -8,
                          scale: 1.02,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        className="group rounded-3xl border border-border bg-card p-8 shadow-lg transition-all hover:border-primary/40 hover:shadow-2xl"
                      >
                        {/* Badge */}

                        <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2">
                          <Icon className="h-5 w-5 text-primary" />

                          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                            {item.badge}
                          </span>
                        </div>

                        {/* Title */}

                        <h3 className="text-3xl font-bold text-foreground">
                          {item.title}
                        </h3>

                        {/* Description */}

                        <p className="mt-5 leading-8 text-muted-foreground">
                          {item.description}
                        </p>

                        {/* Bottom Line */}

                        <div className="mt-8 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-32" />
                      </motion.div>
                    </div>

                    {/* Year */}

                    <div className={`relative ${isEven ? "" : "lg:order-1"}`}>
                      <div className="absolute left-[-63px] top-12 z-20 flex h-14 w-14 items-center justify-center rounded-full border-4 border-background bg-primary text-lg font-black text-primary-foreground shadow-xl">
                        {item.year}
                      </div>
                    </div>
                  </div>

                  {/* Mobile */}

                  <div className="lg:hidden">
                    <motion.div
                      whileHover={{
                        y: -5,
                      }}
                      className="rounded-3xl border border-border bg-card p-6 shadow-md"
                    >
                      <div className="mb-5 flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Icon className="h-6 w-6" />
                        </div>

                        <div>
                          <h4 className="text-2xl font-black text-primary">
                            {item.year}
                          </h4>

                          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                            {item.badge}
                          </p>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-foreground">
                        {item.title}
                      </h3>

                      <p className="mt-4 leading-8 text-muted-foreground">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Timeline Part-1B এ */}
      </div>
    </section>
  );
}
