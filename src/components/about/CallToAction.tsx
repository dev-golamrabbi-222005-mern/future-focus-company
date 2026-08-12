"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CallToAction() {
  const t = useTranslations("CallToAction");
  const locale = useLocale();
  const sectionRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".cta-reveal"),
        { y: 55, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.95, stagger: 0.13, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-12 md:pt-16 lg:pt-20 pb-6 md:pb-8 lg:pb-10"
    >
      {/* Background glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-primary/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,105,161,0.05),transparent_65%)]" />
      </div>

      <div className="mx-auto max-w-[1380px] px-4 md:px-6 lg:px-8 text-center">

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="cta-reveal mb-6 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-5 py-2"
        >
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
            {t("tag")}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="cta-reveal text-3xl sm:text-4xl font-black leading-tight md:text-5xl lg:text-7xl text-foreground"
        >
          {t("title1")}
          <span className="mt-2 block bg-gradient-to-r from-primary via-sky-400 to-cyan-400 bg-clip-text text-transparent">
            {t("title2")}
          </span>
        </motion.h2>

        {/* Divider */}
        <div className="cta-reveal mx-auto mt-7 h-[3px] w-24 rounded-full bg-gradient-to-r from-primary to-cyan-400" />

        {/* Description */}
        <p className="cta-reveal mx-auto mt-7 max-w-3xl text-base md:text-lg leading-8 text-muted-foreground">
          {t("description")}
        </p>

        {/* Buttons */}
        <div className="cta-reveal mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-primary/90"
            >
              {t("quoteButton")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={siteConfig.offices.saudi.Whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-emerald-500 px-10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-600"
            >
              <MessageCircle className="h-4 w-4" />
              {t("whatsappButton")}
            </Link>
          </motion.div>
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.35 }}
          className="cta-reveal mt-16 flex items-center justify-center gap-5"
        >
          <div className="hidden h-px flex-1 max-w-[160px] bg-gradient-to-r from-transparent via-primary/35 to-primary/15 md:block" />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="h-2.5 w-2.5 rotate-45 bg-primary/70 inline-block" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">{t("government")}</span>
            <span className="text-primary/50">•</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">{t("experience")}</span>
            <span className="text-primary/50">•</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">{t("workers")}</span>
            <span className="h-2.5 w-2.5 rotate-45 bg-primary/70 inline-block" />
          </div>
          <div className="hidden h-px flex-1 max-w-[160px] bg-gradient-to-l from-transparent via-primary/35 to-primary/15 md:block" />
        </motion.div>
      </div>
    </section>
  );
}
