"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import {
  ArrowRight,
  Download,
} from "lucide-react";
import LightRays from "@/components/ui/LightRays";

export default function AboutCompany() {
  const t = useTranslations("AboutCompany");
  const locale = useLocale();

  return (
    <section
      className="relative overflow-hidden pt-6 md:pt-8 lg:pt-10 pb-12 md:pb-16 lg:pb-20"
    >
      {/* LightRays decorative background */}
      <div className="absolute inset-0 -z-10 pointer-events-none [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)]">
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
          <div className="space-y-8">

            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
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
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black leading-[1.08] text-foreground"
            >
              {t("title1")}
              <span className="block bg-gradient-to-r from-primary via-sky-400 to-cyan-400 bg-clip-text text-transparent">
                {t("title2")}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl text-base md:text-lg leading-8 text-muted-foreground"
            >
              {t("description")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
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
          </div>

          {/* ── RIGHT: Image ── */}
          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
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
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md"
                  >
                    <p className="text-lg font-bold text-white">{t("companyName")}</p>
                    <p className="mt-1 text-xs leading-5 text-white/75">{t("companyShort")}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
