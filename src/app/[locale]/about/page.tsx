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

import WhyChoose from "../../../components/about/WhyChoose";
import AboutCompany from "@/components/about/aboutUs/page";
import CompanyTimeline from "@/components/about/timeline/page";
import CallToAction from "@/components/about/CallToAction";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
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
        }
      );
    },
    { scope: containerRef }
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
        className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20 lg:py-24 space-y-16 md:space-y-20 lg:space-y-24"
      >

        {/* ════ SECTION HEADER ════ */}
        <div className="text-center space-y-4 gsap-fade-up">
          <div className="flex justify-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              {t("tagline")}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
            {t("title")}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* ════ MISSION & VISION ════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm hover:-translate-y-2 hover:shadow-2xl hover:border-primary/30 transition-all duration-500"
          >
            {/* top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-primary to-sky-400" />
            <div className="p-8 space-y-5">
              {/* Icon header */}
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <Target className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-extrabold text-foreground">{t("missionTitle")}</h2>
              </div>
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl aspect-video">
                <img
                  src="/images/about/mission.jpg"
                  alt={t("missionTitle")}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {t("missionDesc")}
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm hover:-translate-y-2 hover:shadow-2xl hover:border-accent/30 transition-all duration-500"
          >
            <div className="h-1 w-full bg-gradient-to-r from-cyan-400 to-sky-500" />
            <div className="p-8 space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-accent/10 text-accent">
                  <Eye className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-extrabold text-foreground">{t("visionTitle")}</h2>
              </div>
              <div className="relative overflow-hidden rounded-2xl aspect-video">
                <img
                  src="/images/about/vision2.jpg"
                  alt={t("visionTitle")}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {t("visionDesc")}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ════ LICENSE & ACCREDITATION ════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="gsap-fade-up relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/8 via-card to-sky-400/8 shadow-lg"
        >
          {/* Glow */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(3,105,161,0.12),transparent_60%)]" />

          <div className="p-8 sm:p-10 space-y-6">
            {/* Header row */}
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

            {/* Checklist grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {licenseChecks.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ════ MANAGING DIRECTOR STATEMENT ════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="gsap-fade-up relative max-w-4xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-md p-8 sm:p-10 space-y-5">
            {/* Quote icon watermark */}
            <Quote className="absolute top-6 right-6 rtl:left-6 rtl:right-auto h-12 w-12 text-primary/10 pointer-events-none" />

            {/* Label */}
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 border border-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                {t("mdTitle")}
              </span>
            </div>

            {/* Quote text */}
            <blockquote className="text-base sm:text-lg italic text-muted-foreground leading-relaxed border-l-4 border-primary/40 pl-5">
              {t("mdMessage")}
            </blockquote>

            {/* Divider */}
            <div className="pt-4 border-t border-border/60 flex items-center gap-4">
              {/* Avatar circle */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-sky-400 text-primary-foreground font-black text-lg shadow-md">
                A
              </div>
              <div>
                <p className="text-base font-extrabold text-foreground">{t("mdName")}</p>
                <p className="text-xs text-primary font-semibold">{t("mdRole")}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ════ QUICK NAVIGATE ════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="gsap-fade-up flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:bg-primary/90 hover:scale-[1.02] transition-all"
          >
            {t("ctaHire")}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:border-primary/50 hover:text-primary transition-all"
          >
            {t("ctaServices")}
          </Link>
        </motion.div>

      </div>

      {/* ── CTA ── */}
      <CallToAction />
    </div>
  );
}
