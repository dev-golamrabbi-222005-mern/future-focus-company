"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Clock3,
  SearchCheck,
  BadgeDollarSign,
  FileCheck2,
  Handshake,
  ShieldCheck,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ICONS = [SearchCheck, BadgeDollarSign, FileCheck2, Clock3, Handshake, ShieldCheck];

const GRADIENTS = [
  "from-blue-500/15 to-sky-400/10 border-blue-500/20 text-blue-500",
  "from-violet-500/15 to-purple-400/10 border-violet-500/20 text-violet-500",
  "from-emerald-500/15 to-teal-400/10 border-emerald-500/20 text-emerald-500",
  "from-amber-500/15 to-orange-400/10 border-amber-500/20 text-amber-500",
  "from-sky-500/15 to-cyan-400/10 border-sky-500/20 text-sky-500",
  "from-rose-500/15 to-pink-400/10 border-rose-500/20 text-rose-500",
];

export default function WhyChoose() {
  const t = useTranslations("WhyChoose");
  const sectionRef = React.useRef<HTMLDivElement>(null);

  const features = Array.from({ length: 6 }, (_, i) => ({
    number: String(i + 1).padStart(2, "0"),
    title: t(`feature${i + 1}.title`),
    description: t(`feature${i + 1}.description`),
    icon: ICONS[i],
    gradient: GRADIENTS[i],
  }));

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Header
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".why-header-anim"),
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      // Cards
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".why-card"),
        { opacity: 0, y: 55, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current.querySelector(".why-grid"), start: "top 82%" },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-12 md:py-16 lg:py-20"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(3,105,161,0.07),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.03]" />
      </div>

      <div className="mx-auto max-w-[1380px] px-4 md:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <div className="why-header-anim mb-5 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">
              {t("tag")}
            </span>
          </div>

          <h2 className="why-header-anim text-2xl md:text-3xl lg:text-4xl font-black leading-tight text-foreground">
            {t("title")}
          </h2>

          <div className="why-header-anim mt-5 h-[3px] w-24 rounded-full bg-gradient-to-r from-primary to-cyan-400" />

          <p className="why-header-anim mt-6 max-w-2xl text-base md:text-lg leading-8 text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Cards grid */}
        <div className="why-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.number}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.28 }}
                className="why-card group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm hover:border-primary/30 hover:shadow-2xl transition-all duration-300"
              >
                {/* Number watermark */}
                <span className="absolute top-4 right-5 text-6xl font-black text-foreground/5 select-none pointer-events-none leading-none">
                  {feature.number}
                </span>

                {/* Icon */}
                <div className={`mb-5 inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br border ${feature.gradient}`}>
                  <Icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-extrabold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>

                {/* Bottom hover line */}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 rounded-full bg-gradient-to-r from-primary to-cyan-400 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
