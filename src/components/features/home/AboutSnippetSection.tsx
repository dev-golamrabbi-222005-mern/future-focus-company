'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, ArrowRight, Building2 } from 'lucide-react';

export function AboutSnippet() {
  const t = useTranslations('AboutSnippet');
  const locale = useLocale();

  const points = [
    { title: t('point1Title'), desc: t('point1Desc') },
    { title: t('point2Title'), desc: t('point2Desc') },
    { title: t('point3Title'), desc: t('point3Desc') },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
      <div className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side image section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl group">
              {/* Image */}
              <img
                src="/images/about/recruitment-banner2.jpg"
                alt="Future Focus Company"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20">
                    <Building2 className="h-8 w-8 text-sky-300" />
                  </div>

                  <div className="px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-md text-emerald-200 text-xs font-semibold flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    <span>{t("bmetBadge")}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-sky-300">
                    {t("pipelineBadge")}
                  </span>
                  <h3 className="max-w-md text-3xl font-black leading-tight">
                    {t("cardTitle")}
                  </h3>
                </div>
              </div>
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute bottom-6 right-6 hidden max-w-xs items-center gap-4 rounded-2xl border border-primary/20 bg-card/90 p-3 shadow-2xl backdrop-blur-xl sm:flex"
            >
              <div className="rounded-xl bg-primary p-3 text-primary-foreground">
                <ShieldCheck className="h-5 w-5" />
              </div>
              {/* <div>
                <span className="block text-xs font-bold uppercase text-primary">
                  {t("ministryApproved")}
                </span>
                <span className="text-sm font-extrabold text-foreground">
                  {t("rlLicense")}
                </span>
              </div> */}
            </motion.div>
          </motion.div>

          {/* Right Column: Text & Points */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 inline-flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 shrink-0 text-primary" />
                  <span>{t('badge')}</span>
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight mb-4">
                {t('title')}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t('subtitle')}
              </p>
            </motion.div>

            {/* Key Value Points */}
            <div className="space-y-4">
              {points.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                  className="flex items-start gap-3.5"
                >
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-base font-bold text-foreground">{point.title}</h4>
                    <p className="text-sm text-muted-foreground">{point.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:bg-primary/90 transition-all duration-200"
              >
                <span>{t('cta')}</span>
                <ArrowRight className="h-4 w-4 rtl-flip" />
              </Link>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
