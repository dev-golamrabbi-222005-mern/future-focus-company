"use client";

import * as React from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, FileCheck2, Globe, Users } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function StatsSection() {
  const t = useTranslations("StatsSection");
  const locale = useLocale();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const stats = [
    {
      targetNum: 5,
      suffix: t("expSuffix"),
      label: t("expLabel"),
      icon: Award,
      color: "from-blue-600 to-cyan-500",
    },
    {
      targetNum: 5000,
      suffix: t("visasSuffix"),
      label: t("visasLabel"),
      icon: FileCheck2,
      color: "from-sky-500 to-indigo-600",
    },
    {
      targetNum: 45,
      suffix: t("clientsSuffix"),
      label: t("clientsLabel"),
      icon: Globe,
      color: "from-cyan-500 to-blue-600",
    },
    {
      targetNum: 8000,
      suffix: t("workersSuffix"),
      label: t("workersLabel"),
      icon: Users,
      color: "from-indigo-600 to-sky-500",
    },
  ];

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const statItems = containerRef.current.querySelectorAll(".stat-card");

      statItems.forEach((card) => {
        const numElement = card.querySelector(".stat-number");
        const targetValue = parseInt(
          card.getAttribute("data-target") || "0",
          10,
        );
        if (!numElement || !targetValue) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetValue,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          onUpdate: () => {
            numElement.textContent = Math.floor(obj.val).toLocaleString(
              locale === "bn" ? "bn-BD" : locale === "ar" ? "ar-SA" : "en-US",
            );
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-20 lg:py-24 bg-muted/15 border-y border-border/60 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <div className="mb-6 flex justify-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 inline-flex items-center gap-2">
              <Award className="w-3.5 h-3.5 shrink-0 text-primary" />
              <span>{t("tagline")}</span>
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4 text-center">
            {t("heading")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* 4-Column Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                data-target={stat.targetNum}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.2,
                }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="stat-card relative group p-7 rounded-3xl border border-border/80 bg-card shadow-sm hover:shadow-2xl hover:border-primary/50 transition-all duration-300 flex flex-col items-center text-center space-y-4 overflow-hidden cursor-pointer"
              >
                {/* Top Gradient Strip */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
                {/* Hover glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                {/* Icon Badge */}
                <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
                  <Icon className="h-7 w-7" />
                </div>

                <div className="space-y-1">
                  <div className="text-4xl sm:text-5xl font-black text-foreground tracking-tight flex items-center justify-center">
                    <span className="stat-number">0</span>
                    <span className="text-primary ml-0.5">{stat.suffix}</span>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground pt-1">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

