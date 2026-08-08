"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  Download,
} from "lucide-react";
import LightRays from "@/components/ui/LightRays";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutCompany() {
  const t = useTranslations("AboutCompany");
  const locale = useLocale();

  const sectionRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLDivElement>(null);

  const stats = [
    { icon: Building2,  value: t("experienceValue"),  label: t("experience") },
    { icon: Users,      value: t("workersValue"),  label: t("workers")    },
    { icon: BriefcaseBusiness, value: t("clientsValue"), label: t("clients") },
    { icon: ShieldCheck, value: t("supportValue"), label: t("support")   },
  ];

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      tl.from(textRef.current, { opacity: 0, x: -70, duration: 1, ease: "power3.out" })
        .from(imageRef.current, { opacity: 0, x: 70, duration: 1, ease: "power3.out" }, "<0.2");
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-20 lg:py-28"
    >


      {/* LightRays decorative background */}
      <div className="absolute inset-0 -z-10 pointer-events-none h-[300px] sm:h-[400px] lg:h-[600px]">
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

      {/* Subtle grid background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(3,105,161,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.04]" />
      </div>

      <div className="mx-auto max-w-[1380px] px-4 md:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-2">

          {/* ── LEFT: Text content ── */}
          <div ref={textRef} className="space-y-8">

            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="h-[2px] w-10 rounded-full bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
                {t("tag")}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black leading-[1.08] text-foreground"
            >
              {t("title1")}
              <span className="block bg-gradient-to-r from-primary via-sky-400 to-cyan-400 bg-clip-text text-transparent">
                {t("title2")}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="max-w-xl text-base md:text-lg leading-8 text-muted-foreground"
            >
              {t("description")}
            </motion.p>

            {/* Checklist highlights */}
            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {[
                "BMET Smart Card Authorized",
                "GAMCA Medical Affiliated",
                "Ministry License 7052268831",
                "Saudi Embassy Verified",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Link
                href={`/${locale}/contact`}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02]"
              >
                {t("book")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
            href="/doc/Profile(FFC).pdf"
            download
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rtl:space-x-reverse border border-border bg-card hover:bg-muted/50 text-foreground font-bold px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <Download className="w-5 h-5 text-primary" />
            <span>{t('ctaDownload')}</span>
          </a>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {stats.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    whileHover={{ y: -6, scale: 1.03 }}
                    className="group rounded-2xl border border-border bg-card p-5 shadow-sm hover:border-primary/40 hover:shadow-lg transition-all"
                  >
                    <Icon className="mb-3 h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
                    <p className="text-2xl font-black text-foreground">{item.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground leading-tight">{item.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT: Image ── */}
          <div ref={imageRef} className="relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: -1.5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85 }}
              whileHover={{ scale: 1.015 }}
              className="relative w-full max-w-[740px]"
            >
              {/* Decorative blobs */}
              <div className="absolute -top-8 -left-8 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />
              {/* Offset border */}
              <div className="absolute -right-4 top-4 h-full w-full rounded-[32px] border-2 border-primary/20 pointer-events-none" />

              {/* Image card */}
              <div className="group relative overflow-hidden rounded-[32px] border border-border bg-card shadow-2xl">
                <Image
                  src="/images/about/we-are-photo2.png"
                  alt="Future Focus Company — Our Team"
                  width={900}
                  height={1060}
                  priority
                  className="h-auto w-full min-h-[340px] sm:min-h-[480px] md:min-h-[600px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                {/* Caption overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md"
                  >
                    <p className="text-lg font-bold text-white">{t("companyName")}</p>
                    <p className="mt-1 text-xs leading-5 text-white/75">{t("companyShort")}</p>
                  </motion.div>
                </div>
              </div>

              {/* Experience badge — hidden on xs, shown sm+ */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="absolute -left-4 sm:-left-8 top-10 sm:top-14 z-10 hidden sm:block"
              >
                <motion.div
                  animate={{ y: [-7, 0, -7] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-24 w-24 sm:h-32 sm:w-32 flex-col items-center justify-center rounded-full border-[5px] border-background bg-primary text-primary-foreground shadow-2xl"
                >
                  <span className="text-2xl sm:text-3xl font-black">05+</span>
                  <span className="mt-1 text-center text-[10px] uppercase tracking-[0.15em] leading-tight px-2">
                    {t("experience")}
                  </span>
                </motion.div>
              </motion.div>

              {/* Govt badge */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.65 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-6 sm:-bottom-8 right-2 sm:right-4 z-10"
              >
                <div className="rounded-2xl border border-border bg-card/95 px-5 py-4 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-primary p-2.5">
                      <ShieldCheck className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{t("approved")}</p>
                      <p className="text-xs text-muted-foreground">License 7052268831</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
