"use client";

import * as React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutSection() {
  const t = useTranslations("HomeAbout");
  const locale = useLocale();

  const features = [
    t("feature1"),
    t("feature2"),
    t("feature3"),
    t("feature4"),
    t("feature5"),
    t("feature6"),
  ];

  return (
    <section className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center pt-8 lg:pt-0">
        
        {/* IMAGE COLUMN */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mb-10 lg:mb-0"
        >
          <div className="absolute top-8 -right-6 w-full h-full rounded-xl border-2 border-primary/30 hidden lg:block" />

          <Image
            src="/images/about/about-home.jpg"
            alt="About"
            width={700}
            height={900}
            className="relative rounded-xl object-cover shadow-xl w-full h-auto"
          />

          {/* Experience Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute -bottom-8 right-2 sm:right-0"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 p-2 rounded-full bg-primary text-primary-foreground border-[5px] sm:border-[6px] border-background shadow-xl flex flex-col justify-center items-center">
              <h2 className="text-2xl sm:text-4xl font-black">05+</h2>

              <p className="text-[9px] sm:text-xs uppercase tracking-widest text-center">
                {t("experience")}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* CONTENT COLUMN */}
        <div className="space-y-4">
          
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {t("tag")}
            </span>
          </motion.div>

          {/* Header Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4 leading-snug">
              {t("title")}
            </h2>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="w-20 h-[2px] bg-primary rounded-full origin-left"
          />

          {/* Description 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-muted-foreground leading-8">
              {t("description1")}
            </p>
          </motion.div>

          {/* Description 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <p className="text-muted-foreground leading-8">
              {t("description2")}
            </p>
          </motion.div>

          {/* FEATURES GRID */}
          <div className="grid sm:grid-cols-2 gap-y-5 gap-x-10 pt-3">
            {features.map((item, idx) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
                className="flex items-center gap-3"
              >
                <CheckCircle2 className="text-primary shrink-0" size={22} />
                <span className="text-foreground font-medium">{item}</span>
              </motion.div>
            ))}
          </div>

          {/* BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="pt-5"
          >
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:opacity-90 hover:scale-[1.02] group"
            >
              {t("button")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
