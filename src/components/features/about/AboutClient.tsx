"use client";

import * as React from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Quote,
  Target,
  Eye,
  ArrowRight,
} from "lucide-react";

import WhyChoose from "./AboutWhyChoose";
import AboutCompany from "@/components/features/about/AboutUsSection";
import CompanyTimeline from "@/components/features/about/CompanyTimelineSection";
import CallToAction from "@/components/features/about/AboutCTA";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutClient() {
  const t = useTranslations("AboutPage");
  const locale = useLocale();
  const containerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      gsap.fromTo(
        containerRef.current.querySelectorAll(".gsap-fade-up"),
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  const licenseChecks = [
    t("licenseCheck1"),
    t("licenseCheck2"),
    t("licenseCheck3"),
    t("licenseCheck4"),
  ];

  return (
    <div>
      {/* ── Hero intro + stats ── */}
      <AboutCompany />

      {/* ── Journey timeline ── */}
      <CompanyTimeline />

      {/* ── Why choose us ── */}
      <WhyChoose />

      {/* ── Mission / Vision / License / MD — inline sections ── */}
      <div
        ref={containerRef}
        className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8 pt-12 md:pt-16 lg:pt-20 pb-8 md:pb-10 lg:pb-12"
      >
        {/* ════ SECTION HEADER ════ */}
        <div className="text-center space-y-4 gsap-fade-up mb-14">
          <div className="flex justify-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 inline-flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-primary" />
              <span>{t("tagline")}</span>
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground tracking-tight leading-tight text-center">
            {t("title")}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* ════ MISSION & VISION ════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-15 md:mb-22 lg:mb-30">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            {/* Subtle Glow Background on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Top Image Section */}
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted/20">
              <img
                src="/images/about/mission.jpg"
                alt={t("missionTitle")}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Seamless blend gradient from image to card background */}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

              {/* Floating Icon Overlapping Image & Content */}
              <div className="absolute bottom-10 left-8 translate-y-1/2 z-10">
                <div className="p-3 rounded-2xl bg-card border border-border shadow-xl group-hover:border-primary/30 transition-colors duration-500">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <Target className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="relative z-20 flex-1 px-8 pb-10 pt-14 space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground group-hover:text-primary transition-colors duration-300">
                {t("missionTitle")}
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                {t("missionDesc")}
              </p>
            </div>

            {/* Animated Bottom Gradient Line */}
            <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-gradient-to-r from-primary to-sky-400 transition-all duration-500 ease-out group-hover:w-full" />
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            {/* Subtle Glow Background on Hover */}
            <div className="absolute inset-0 bg-gradient-to-bl from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Top Image Section */}
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted/20">
              <img
                src="/images/about/vision2.jpg"
                alt={t("visionTitle")}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Seamless blend gradient from image to card background */}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

              {/* Floating Icon Overlapping Image & Content */}
              <div className="absolute bottom-10 left-8 translate-y-1/2 z-10">
                <div className="p-3 rounded-2xl bg-card border border-border shadow-xl group-hover:border-accent/30 transition-colors duration-500">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent">
                    <Eye className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="relative z-20 flex-1 px-8 pb-10 pt-14 space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground group-hover:text-accent transition-colors duration-300">
                {t("visionTitle")}
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                {t("visionDesc")}
              </p>
            </div>

            {/* Animated Bottom Gradient Line */}
            <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-gradient-to-r from-cyan-400 to-sky-500 transition-all duration-500 ease-out group-hover:w-full" />
          </motion.div>
        </div>

        {/* ════ LICENSE & ACCREDITATION ════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="gsap-fade-up relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/8 via-card to-sky-400/8 shadow-lg my-12 md:my-16 lg:my-20"
        >
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(3,105,161,0.12),transparent_60%)]" />

          <div className="p-8 sm:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="p-4 rounded-2xl bg-primary text-primary-foreground w-fit shadow-lg shadow-primary/30">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  {t("licenseTitle")}
                </h3>
                <p className="text-sm text-primary font-semibold mt-0.5">
                  {t("licenseNumber")}
                </p>
              </div>
            </div>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
              {t("licenseDesc")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {licenseChecks.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 text-sm font-semibold text-foreground"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ════ MANAGING DIRECTOR STATEMENT ════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-15 md:mt-22 lg:mt-30">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="gsap-fade-up relative max-w-4xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-md p-8 sm:p-10 space-y-5 transform transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl">
              <Quote className="absolute top-6 right-6 rtl:left-6 rtl:right-auto h-12 w-12 text-primary/10 pointer-events-none" />

              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 border border-primary/20">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  {t("ceoTitle")}
                </span>
              </div>

              <blockquote className="text-base sm:text-lg italic text-muted-foreground leading-relaxed border-l-4 border-primary/40 pl-5">
                {t("ceoMessage")}
              </blockquote>

              <div className="pt-4 border-t border-border/60 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-sky-400 text-primary-foreground font-black text-lg shadow-md">
                  M
                </div>
                <div>
                  <p className="text-base font-extrabold text-foreground">
                    {t("ceoName")}
                  </p>
                  <p className="text-xs text-primary font-semibold">
                    {t("ceoRole")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CEO STATEMENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="gsap-fade-up relative max-w-4xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-md p-8 sm:p-10 space-y-5 transform transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl">
              <Quote className="absolute top-6 right-6 rtl:left-6 rtl:right-auto h-12 w-12 text-primary/10 pointer-events-none" />

              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 border border-primary/20">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  {t("mdTitle")}
                </span>
              </div>

              <blockquote className="text-base sm:text-lg italic text-muted-foreground leading-relaxed border-l-4 border-primary/40 pl-5">
                {t("mdMessage")}
              </blockquote>

              <div className="pt-4 border-t border-border/60 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-sky-400 text-primary-foreground font-black text-lg shadow-md">
                  S
                </div>
                <div>
                  <p className="text-base font-extrabold text-foreground">
                    {t("mdName")}
                  </p>
                  <p className="text-xs text-primary font-semibold">
                    {t("mdRole")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
