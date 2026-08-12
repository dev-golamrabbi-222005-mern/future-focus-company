"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Wrench, Cog, Hammer, Cpu, CheckCircle2, Quote, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CARD_META = [
  {
    icon: Wrench,
    color: "from-blue-600 to-cyan-500",
    iconBg: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Cog,
    color: "from-sky-500 to-indigo-600",
    iconBg: "bg-sky-500/10 text-sky-500",
  },
  {
    icon: Hammer,
    color: "from-cyan-500 to-blue-600",
    iconBg: "bg-cyan-500/10 text-cyan-600",
  },
  {
    icon: Cpu,
    color: "from-indigo-600 to-sky-500",
    iconBg: "bg-indigo-500/10 text-indigo-500",
  },
];

export default function WhatIsManpower() {
  const t = useTranslations("WhatIsManpower");
  const sectionRef = React.useRef<HTMLDivElement>(null);

  const cardsRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.from(".wm-left", {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  useGSAP(
    () => {
      if (!cardsRef.current) return;

      gsap.from(cardsRef.current.querySelectorAll(".wm-card"), {
        opacity: 0,
        y: 50,
        scale: 0.96,
        duration: 0.7,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope: cardsRef },
  );

  const cards = Array.from({ length: 4 }, (_, i) => ({
    ...CARD_META[i],
    title: t(`cards.${i}.title`),
    jobs: t(`cards.${i}.jobs`),
    description: t(`cards.${i}.description`),
  }));

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-20 lg:py-24"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-primary/8 blur-[140px]" />
        <div className="absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-accent/8 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-[1380px] px-4 md:px-6 lg:px-8">
        <div className="grid gap-16 lg:gap-20 lg:grid-cols-2 lg:items-start">

          {/* ══════════ LEFT COLUMN ══════════ */}
          <div className="wm-left space-y-8">

            {/* Tag */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/10 px-5 py-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="text-xs font-extrabold uppercase tracking-[0.4em] text-primary">
                {t("tag")}
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black leading-[1.1] tracking-tight text-foreground">
              {t("title")}
            </h2>

            {/* Subtitle */}
            <p className="text-lg font-medium italic leading-8 text-primary/80">
              {t("subtitle")}
            </p>

            {/* Divider */}
            <div className="h-[3px] w-20 rounded-full bg-gradient-to-r from-primary to-cyan-400" />

            {/* Descriptions */}
            <div className="space-y-5">
              <p className="text-base leading-8 text-muted-foreground">{t("description1")}</p>
              <p className="text-base leading-8 text-muted-foreground">{t("description2")}</p>
            </div>

            {/* Feature pills
            <div className="flex flex-wrap gap-2.5 pt-2">
              {["BMET Certified", "Saudi Licensed", "10+ Countries", "End-to-End"].map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-bold text-primary"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {pill}
                </span>
              ))}
            </div> */}

            {/* Quote card */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-accent/10 to-transparent p-8 shadow-xl"
            >
              {/* Top gradient strip */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-cyan-400 to-accent" />
              {/* Glow orb */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                  <Quote className="h-3 w-3 text-primary" />
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-primary">
                    {t("quoteTitle")}
                  </span>
                </div>
                <blockquote className="text-base md:text-lg font-medium italic leading-8 text-foreground/90">
                  "{t("quote")}"
                </blockquote>
              </div>
            </motion.div>
          </div>

          {/* ══════════ RIGHT COLUMN — 4 CARDS ══════════ */}
          <div ref={cardsRef} className="wm-cards-grid grid grid-cols-1 sm:grid-cols-2 gap-5">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="wm-card group relative overflow-hidden rounded-3xl border border-border/80 bg-card p-6 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300"
                >
                  {/* Top gradient strip */}
                  <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${card.color}`} />

                  {/* Hover glow */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                  <div className="relative space-y-4">
                    {/* Icon + arrow row */}
                    <div className="flex items-start justify-between">
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-extrabold text-foreground tracking-tight leading-tight">
                      {card.title}
                    </h3>

                    {/* Jobs tags */}
                    <p className="text-[11px] font-bold text-primary/80 leading-5 tracking-wide">
                      {card.jobs}
                    </p>

                    {/* Description */}
                    <p className="text-sm leading-6 text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
