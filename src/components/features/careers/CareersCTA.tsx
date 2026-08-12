"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Plane,
  CreditCard,
  HeartPulse,
  HandHelping,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function CareersCTA() {
  const t = useTranslations("CareersPage");
  const locale = useLocale();

  const benefits = [
    { icon: Plane, label: t("ctaBenefit1") },
    { icon: CreditCard, label: t("ctaBenefit2") },
    { icon: HeartPulse, label: t("ctaBenefit3") },
    { icon: HandHelping, label: t("ctaBenefit4") },
  ];

  return (
    <section className="relative overflow-hidden py-12 md:py-16 lg:py-20">
      {/* Glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-primary/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,105,161,0.05),transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:56px_56px] opacity-[0.03]" />
      </div>

      <div className="mx-auto max-w-[1380px] px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-primary/20 bg-gradient-to-br from-primary/8 via-card to-sky-400/8 shadow-2xl"
        >
          {/* Inner glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

          <div className="relative px-6 py-14 sm:px-10 sm:py-16 md:px-14 lg:px-20 text-center space-y-8">

            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-5 py-2"
            >
              <Plane className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
                {t("ctaTag")}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-1"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight text-foreground">
                {t("ctaTitle1")}
              </h2>
              <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-primary via-sky-400 to-cyan-400 bg-clip-text text-transparent">
                {t("ctaTitle2")}
              </span>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mx-auto h-[3px] w-20 rounded-full bg-gradient-to-r from-primary to-cyan-400"
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto max-w-2xl text-base md:text-lg leading-8 text-muted-foreground"
            >
              {t("ctaDesc")}
            </motion.p>

            {/* Benefits grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {benefits.map(({ icon: Icon, label }, idx) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/80 px-4 py-4 shadow-sm"
                >
                  <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-bold text-center text-foreground leading-tight">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={`/${locale}/contact#submit-cv`}
                  className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all"
                >
                  {t("ctaSubmit")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={siteConfig.offices.saudi.Whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-emerald-500 px-10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-600 transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t("ctaContact")}
                </Link>
              </motion.div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
