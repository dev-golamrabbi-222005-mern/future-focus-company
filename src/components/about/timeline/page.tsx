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

export default function CompanyTimeline() {
  const t = useTranslations("CompanyTimeline");

  const sectionRef  = React.useRef<HTMLDivElement>(null);
  const lineRef     = React.useRef<HTMLDivElement>(null);
  const cardsRef    = React.useRef<(HTMLDivElement | null)[]>([]);

  const timeline = [
    { year: "2022", badge: t("timeline2022.badge"), title: t("timeline2022.title"), description: t("timeline2022.description"), icon: Building2 },
    { year: "2023", badge: t("timeline2023.badge"), title: t("timeline2023.title"), description: t("timeline2023.description"), icon: Globe2 },
    { year: "2024", badge: t("timeline2024.badge"), title: t("timeline2024.title"), description: t("timeline2024.description"), icon: CalendarDays },
    { year: "2025", badge: t("timeline2025.badge"), title: t("timeline2025.title"), description: t("timeline2025.description"), icon: Trophy },
    { year: "2026", badge: t("timeline2026.badge"), title: t("timeline2026.title"), description: t("timeline2026.description"), icon: Rocket },
  ];

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Vertical line scrub
      if (lineRef.current) {
        gsap.set(lineRef.current, { transformOrigin: "top center", scaleY: 0 });
        gsap.to(lineRef.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 85%",
            scrub: true,
          },
        });
      }

      // Timeline dots pop in
      gsap.utils.toArray<HTMLElement>(".timeline-dot").forEach((dot) => {
        gsap.from(dot, {
          scale: 0,
          rotate: 180,
          duration: 0.6,
          ease: "back.out(2)",
          scrollTrigger: { trigger: dot, start: "top 90%" },
        });
      });

      // Cards slide in from alternating sides
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          x: index % 2 === 0 ? -70 : 70,
          y: 30,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-muted/30 py-20 lg:py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(3,105,161,0.07),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.04]" />
      </div>

      <div className="mx-auto max-w-[1380px] px-4 md:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-5 py-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
              {t("tag")}
            </span>
          </div>

          <h2 className="text-4xl font-black leading-tight text-foreground md:text-5xl lg:text-6xl">
            {t("title1")}
            <span className="mt-1 block bg-gradient-to-r from-primary via-sky-400 to-cyan-400 bg-clip-text text-transparent">
              {t("title2")}
            </span>
          </h2>

          <div className="mx-auto mt-6 h-[3px] w-24 rounded-full bg-gradient-to-r from-primary to-cyan-400" />

          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-8 text-muted-foreground">
            {t("description")}
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">

          {/* Vertical center line (desktop) */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/60 via-primary/30 to-transparent lg:block"
          />

          <div className="space-y-12 lg:space-y-16">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.year}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className="relative"
                >

                  {/* ── DESKTOP alternating layout ── */}
                  <div className={`hidden lg:grid lg:grid-cols-2 lg:gap-16 ${!isEven ? "lg:[direction:rtl]" : ""}`}>

                    {/* Card */}
                    <div className={!isEven ? "lg:[direction:ltr]" : ""}>
                      <motion.div
                        whileHover={{ y: -6, scale: 1.015 }}
                        transition={{ duration: 0.3 }}
                        className="group rounded-3xl border border-border bg-card p-8 shadow-md hover:border-primary/40 hover:shadow-2xl transition-all"
                      >
                        {/* Badge */}
                        <div className="mb-5 inline-flex items-center gap-2.5 rounded-full bg-primary/10 px-4 py-1.5">
                          <Icon className="h-4 w-4 text-primary" />
                          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                            {item.badge}
                          </span>
                        </div>

                        {/* Year accent */}
                        <p className="text-5xl font-black text-primary/15 leading-none mb-2 select-none">
                          {item.year}
                        </p>

                        <h3 className="text-2xl font-extrabold text-foreground -mt-3">
                          {item.title}
                        </h3>

                        <p className="mt-4 leading-7 text-muted-foreground text-sm md:text-base">
                          {item.description}
                        </p>

                        {/* Hover underline */}
                        <div className="mt-6 h-[2px] w-0 rounded-full bg-gradient-to-r from-primary to-cyan-400 transition-all duration-500 group-hover:w-28" />
                      </motion.div>
                    </div>

                    {/* Year dot column */}
                    <div className={`relative flex items-start justify-start pt-10 ${!isEven ? "lg:[direction:ltr] lg:justify-end" : ""}`}>
                      {/* Dot — centered on the line */}
                      <div
                        className={`timeline-dot absolute top-10 z-20 flex h-14 w-14 items-center justify-center rounded-full border-4 border-background bg-primary text-xs font-black text-primary-foreground shadow-xl ${
                          isEven ? "left-[-7.5rem]" : "right-[-7.5rem]"
                        }`}
                      >
                        {item.year.slice(2)}
                      </div>
                    </div>
                  </div>

                  {/* ── MOBILE stacked layout ── */}
                  <div className="lg:hidden">
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.08 }}
                      whileHover={{ y: -4 }}
                      className="group relative rounded-3xl border border-border bg-card p-6 shadow-md hover:border-primary/40 hover:shadow-xl transition-all"
                    >
                      {/* Left accent bar */}
                      <div className="absolute left-0 top-0 h-full w-1 rounded-l-3xl bg-gradient-to-b from-primary to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="mb-4 flex items-center gap-4">
                        <div className="timeline-dot flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-2xl font-black text-primary">{item.year}</p>
                          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{item.badge}</p>
                        </div>
                      </div>

                      <h3 className="text-xl font-extrabold text-foreground">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
