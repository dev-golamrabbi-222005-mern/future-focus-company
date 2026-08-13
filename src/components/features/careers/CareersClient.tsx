"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Briefcase, Users, DollarSign, Clock } from "lucide-react";
import CareersJobsSection from "@/components/features/careers/CareersJobsSection";
import CareersCTA from "@/components/features/careers/CareersCTA";
import { SubmitCvSection } from "@/components/features/contact/SubmitCvSection";
import LightRays from "@/components/ui/LightRays";

export function CareersClient() {
  const t = useTranslations("CareersPage");

  const heroStats = [
    {
      icon: Briefcase,
      value: t("heroStatJobsValue"),
      label: t("heroStatJobs"),
      color: "from-blue-600 to-cyan-500",
    },
    {
      icon: Users,
      value: t("heroStatPlacedValue"),
      label: t("heroStatPlaced"),
      color: "from-sky-500 to-indigo-600",
    },
    {
      icon: DollarSign,
      value: t("heroStatSalaryValue"),
      label: t("heroStatSalary"),
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: Clock,
      value: t("heroStatDaysValue"),
      label: t("heroStatDays"),
      color: "from-indigo-600 to-sky-500",
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      <div className="relative
      flex
      items-center
      justify-center
      overflow-hidden
      min-h-[720px]
      sm:min-h-[700px]
      md:min-h-[650px]
      lg:min-h-[600px]
      pb-10
      sm:pb-14
      md:pb-20
      lg:pb-24">
        <div
      className="
        absolute
        inset-x-0
        top-0
        h-[420px]
        sm:h-[480px]
        md:h-[520px]
        lg:h-[560px]
        pointer-events-none
        [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)]
      "
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
        <section className="relative w-full overflow-hidden pt-16 sm:pt-18 md:pt-20 lg:pt-24 pb-8 sm:pb-10 md:pb-12">
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
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="relative
                  group
                  rounded-2xl
                  sm:rounded-3xl
                  border
                  border-border/80
                  bg-card
                  px-3
                  py-5
                  sm:p-6
                  md:p-7
                  shadow-sm
                  hover:shadow-xl
                  hover:border-primary/50
                  transition-all
                  duration-300
                  text-center
                  overflow-hidden
                  min-w-0"
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.color}`} />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                    <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mx-auto">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="text-xl lg:text-2xl font-black text-foreground">{s.value}</p>
                    <p className="mt-1 text-sm font-medium text-muted-foreground leading-tight">{s.label}</p>
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
