"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Users,
  Globe2,
  BadgeCheck,
  ChevronDown,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "@/config/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TRUST_BADGES = [
  { label: "BMET Authorized", icon: BadgeCheck, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
  { label: "Govt. Licensed", icon: ShieldCheck, color: "text-sky-500 bg-sky-500/10 border-sky-500/20" },
  { label: "Saudi Embassy", icon: Globe2, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
];

export default function AboutIntro() {
  const t = useTranslations("AboutIntro");
  const locale = useLocale();

  const sectionRef = React.useRef<HTMLDivElement>(null);
  const imageRef   = React.useRef<HTMLDivElement>(null);

  /* ── Parallax on scroll ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY     = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY   = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const imageY  = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  /* ── GSAP entrance ── */
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".ai-tag",      { opacity: 0, y: -20, duration: 0.6 })
        .from(".ai-heading",  { opacity: 0, y: 50, duration: 0.9 }, "-=0.3")
        .from(".ai-sub",      { opacity: 0, y: 30, duration: 0.7 }, "-=0.5")
        .from(".ai-badges",   { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(".ai-route",    { opacity: 0, scale: 0.92, duration: 0.7 }, "-=0.3")
        .from(".ai-ctas > *", { opacity: 0, y: 25, stagger: 0.12, duration: 0.55 }, "-=0.3")
        .from(".ai-stat",     { opacity: 0, y: 30, stagger: 0.1, duration: 0.55 }, "-=0.2");

      gsap.from(imageRef.current, {
        opacity: 0,
        x: 60,
        scale: 0.95,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.3,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-background"
    >
      {/* ── Animated grid bg ── */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:56px_56px] opacity-[0.04]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(3,105,161,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(251,191,36,0.06),transparent_55%)]" />
      </motion.div>

      {/* ── Ambient glow orbs ── */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-primary/10 blur-[130px]"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-24 bottom-1/4 h-96 w-96 rounded-full bg-amber-400/8 blur-[150px]"
      />

      {/* ── Main grid ── */}
      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 md:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ══════════ LEFT COLUMN ══════════ */}
          <motion.div style={{ y: textY }} className="space-y-7 sm:space-y-8">

            {/* Tag pill */}
            <div className="ai-tag inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-[0.4em] text-primary">
                {t("tag")}
              </span>
            </div>

            {/* Headline */}
            <div className="ai-heading">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-black leading-[1.04] tracking-tight text-foreground">
                <span className="block">{t("title1")}</span>
                <span className="relative inline-flex items-center gap-4 my-1">
                  {/* animated arrow between countries */}
                  <motion.span
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  >
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.span>
                  <span className="block">{t("title2")}</span>
                </span>
                <span className="block bg-gradient-to-r from-primary via-sky-400 to-cyan-400 bg-clip-text text-transparent">
                  {t("title3")}
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="ai-sub text-base sm:text-lg leading-8 text-muted-foreground max-w-xl">
              {t("description")}
            </p>

            {/* Trust badges */}
            <div className="ai-badges flex flex-wrap gap-2">
              {TRUST_BADGES.map(({ label, icon: Icon, color }) => (
                <span
                  key={label}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${color}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </span>
              ))}
            </div>

            {/* BD → SA route strip */}
            <div className="ai-route">
              <div className="inline-flex items-stretch overflow-hidden rounded-2xl border border-border bg-card shadow-md">
                <div className="flex items-center gap-3 px-5 py-4">
                  <span className="text-xl">🇧🇩</span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Origin</p>
                    <p className="text-sm font-extrabold text-foreground">{t("bangladesh")}</p>
                  </div>
                </div>

                <div className="flex items-center justify-center border-x border-border px-4 bg-primary/5">
                  <motion.div
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </motion.div>
                </div>

                <div className="flex items-center gap-3 px-5 py-4">
                  <span className="text-xl">🇸🇦</span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Destination</p>
                    <p className="text-sm font-extrabold text-foreground">{t("saudi")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="ai-ctas flex flex-col sm:flex-row gap-3">
              <Link
                href={`/${locale}/contact#get-in-touch`}
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary px-7 py-4 font-bold text-sm text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-200 hover:bg-primary/90 hover:scale-[1.02]"
              >
                <Users className="h-4 w-4" />
                {t("request")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={siteConfig.offices.saudi.Whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-emerald-500 px-7 py-4 font-bold text-sm text-white shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:bg-emerald-600 hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" />
                {t("whatsapp")}
              </Link>

              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-border bg-card px-7 py-4 font-bold text-sm text-foreground transition-all duration-200 hover:border-primary/50 hover:text-primary"
              >
                {t("browse")}
              </Link>
            </div>

            {/* Micro stats row */}
            <div className="flex flex-wrap gap-5 pt-1">
              {[
                { value: t("experienceValue"), label: t("experience") },
                { value: "2,500+", label: "Workers Placed" },
                { value: "100%", label: "Visa Success Rate" },
              ].map((s) => (
                <div key={s.label} className="ai-stat">
                  <p className="text-2xl sm:text-3xl font-black text-foreground leading-none">{s.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ══════════ RIGHT COLUMN — IMAGE STACK ══════════ */}
          <motion.div
            ref={imageRef}
            style={{ y: imageY }}
            className="relative flex items-center justify-center"
          >
            {/* Main image */}
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-[520px] overflow-hidden rounded-[2rem] border border-border shadow-2xl"
            >
              <Image
                src="/images/about/manpower2.jpg"
                alt="Future Focus Company — Manpower"
                width={560}
                height={660}
                priority
                className="w-full h-auto object-cover min-h-[360px] sm:min-h-[500px] transition-transform duration-700 hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Caption overlay */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="rounded-xl border border-white/20 bg-black/40 px-4 py-3 backdrop-blur-md">
                  <p className="text-sm font-bold text-white">{t("country")}</p>
                  <p className="mt-0.5 text-xs text-white/70">{t("cities")}</p>
                </div>
              </div>
            </motion.div>

            {/* Floating: worker image card — bottom left */}
            {/* <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-4 sm:left-0 hidden sm:block w-[160px] sm:w-[190px] overflow-hidden rounded-2xl border-4 border-background shadow-xl"
            >
              <Image
                src="/images/about/about-worker.jpg"
                alt="Worker"
                width={190}
                height={230}
                className="w-full h-auto object-cover"
              />
            </motion.div> */}

            {/* Floating: experience badge — top right */}
            <motion.div
              animate={{ scale: [1, 1.06, 1], rotate: [0, 3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 sm:right-0 flex h-24 w-24 sm:h-28 sm:w-28 flex-col items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-2xl shadow-primary/30"
            >
              <span className="text-2xl sm:text-3xl font-black leading-none">{t("experienceValue")}</span>
              <span className="mt-1 text-center text-[9px] sm:text-[10px] font-bold uppercase tracking-wider leading-tight px-2">
                {t("experience")}
              </span>
            </motion.div>

            {/* Floating: primary market card — top left */}
            <motion.div
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 -left-4 sm:left-0 hidden lg:block"
            >
              <div className="rounded-2xl border border-border bg-card/90 px-4 py-3.5 shadow-xl backdrop-blur-md">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-primary mb-1">
                  {t("market")}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="text-base">🇸🇦</span>
                  <span className="text-sm font-bold text-foreground">{t("country")}</span>
                </div>
              </div>
            </motion.div>

            {/* Decorative glow behind image */}
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-primary/5 blur-[80px]" />
          </motion.div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-muted-foreground/60"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>

      {/* ── Bottom divider ── */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </section>
  );
}
