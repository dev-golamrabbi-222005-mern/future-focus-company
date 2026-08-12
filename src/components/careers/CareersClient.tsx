"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Briefcase, Users, DollarSign, Clock } from "lucide-react";
import CareersJobsSection from "@/components/careers/CareersJobsSection";
import CareersCTA from "@/components/careers/CareersCTA";
import { SubmitCvSection } from "@/components/features/contact/SubmitCvSection";
import LightRays from "../ui/LightRays";

export function CareersClient() {
  const t = useTranslations("CareersPage");

  const heroStats = [
    {
      icon: Briefcase,
      value: t("heroStatJobsValue"),
      label: t("heroStatJobs"),
    },
    {
      icon: Users,
      value: t("heroStatPlacedValue"),
      label: t("heroStatPlaced"),
    },
    {
      icon: DollarSign,
      value: t("heroStatSalaryValue"),
      label: t("heroStatSalary"),
    },
    { icon: Clock, value: t("heroStatDaysValue"), label: t("heroStatDays") },
  ];

  return (
    <div className="w-full">
      <div className="relative flex overflow-hidden items-center justify-center">
        <div style={{ width: "100%", height: "500px", position: "relative" }}
        className="sticky"
        >
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1}
            lightSpread={0.5}
            rayLength={3}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1}
            saturation={1}
          />
        </div>

        {/* ══════════ HERO ══════════ */}
        <section className="absolute overflow-hidden flex-col bg-background pt-8 md:pt-10 lg:pt-12 pb-12 md:pb-16 lg:pb-20">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute -top-32 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(3,105,161,0.06),transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:56px_56px] opacity-[0.035]" />
          </div>

          <div className="mx-auto max-w-[1380px] px-4 md:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/25 bg-primary/10 px-5 py-2"
            >
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
                {t("heroTag")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black leading-[1.06] text-foreground"
            >
              {t("heroTitle1")}
              <span className="block mt-2 bg-gradient-to-r from-primary via-sky-400 to-cyan-400 bg-clip-text text-transparent">
                {t("heroTitle2")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-8 text-muted-foreground"
            >
              {t("heroSubtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto"
            >
              {heroStats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="group rounded-2xl border border-border bg-card p-5 shadow-sm hover:border-primary/40 hover:shadow-lg transition-all text-center"
                  >
                    <Icon className="mx-auto mb-2 h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                    <p className="text-2xl font-black text-foreground">
                      {s.value}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground leading-tight font-medium">
                      {s.label}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </div>

      {/* ══════════ JOB LISTINGS ══════════ */}
      <CareersJobsSection />

      {/* ══════════ CTA ══════════ */}
      <CareersCTA />

      <SubmitCvSection />
    </div>
  );
}
