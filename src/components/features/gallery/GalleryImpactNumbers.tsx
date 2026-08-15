'use client';

import * as React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Briefcase, Award, Globe } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STAT_ICONS = [Users, Briefcase, Award, Globe];
const COLORS = [
  'from-blue-600 to-cyan-500',
  'from-sky-500 to-indigo-600',
  'from-cyan-500 to-blue-600',
  'from-indigo-600 to-sky-500',
];

/**
 * Normalize any locale's native digit string to a western-arabic integer.
 * Handles: Arabic-Indic (٠-٩), Extended Arabic-Indic (۰-۹), Bengali (০-৯).
 */
function parseStatNum(raw: string): number {
  const normalized = raw
    .replace(/[\u0660-\u0669]/g, (c) => String(c.charCodeAt(0) - 0x0660)) // Arabic-Indic
    .replace(/[\u06F0-\u06F9]/g, (c) => String(c.charCodeAt(0) - 0x06f0)) // Extended Arabic-Indic
    .replace(/[\u09E6-\u09EF]/g, (c) => String(c.charCodeAt(0) - 0x09e6)) // Bengali
    .replace(/[^\d]/g, '');
  return parseInt(normalized, 10) || 0;
}

/** Format a western-arabic number using locale-appropriate digits. */
function toLocalDigits(n: number, locale: string): string {
  return n.toLocaleString(
    locale === 'bn' ? 'bn-BD' : locale === 'ar' ? 'ar-EG' : 'en-US',
    { useGrouping: true },
  );
}

/* ─────────────────────────────────────────────
   StatItem — individual animated counter card
───────────────────────────────────────────── */
interface StatItemProps {
  target: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
  color: string;
  delay: number;
  locale: string;
}

function StatItem({ target, suffix, label, icon: Icon, color, delay, locale }: StatItemProps) {
  const [display, setDisplay] = React.useState('0');
  const ref = React.useRef<HTMLDivElement>(null);

  // Keep locale fresh inside the GSAP callback without re-running the effect
  const localeRef = React.useRef(locale);
  React.useEffect(() => { localeRef.current = locale; }, [locale]);

  useGSAP(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 90%',
        once: true,
      },
      onUpdate() {
        setDisplay(toLocalDigits(Math.floor(obj.val), localeRef.current));
      },
      onComplete() {
        setDisplay(toLocalDigits(target, localeRef.current));
      },
    });
  }, { scope: ref });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.93 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className="relative group p-7 rounded-3xl border border-border/80 bg-card shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-primary/50 hover:scale-105 transition-all duration-300 text-center overflow-hidden"
    >
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color}`} />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
      <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mx-auto">
        <Icon className="h-6 w-6" />
      </div>
      <div className="text-4xl md:text-5xl font-black text-foreground mb-2 tabular-nums">
        {display}
        <span className="text-primary">{suffix}</span>
      </div>
      <p className="text-sm text-muted-foreground font-medium">{label}</p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Section export
───────────────────────────────────────────── */
export function GalleryImpactNumbers() {
  const t = useTranslations('GalleryPage');
  const locale = useLocale();

  const stats = [
    { numKey: 'stat1Num', suffix: t('stat1Suffix'), label: t('stat1Label'), icon: STAT_ICONS[0], color: COLORS[0] },
    { numKey: 'stat2Num', suffix: t('stat2Suffix'), label: t('stat2Label'), icon: STAT_ICONS[1], color: COLORS[1] },
    { numKey: 'stat3Num', suffix: t('stat3Suffix'), label: t('stat3Label'), icon: STAT_ICONS[2], color: COLORS[2] },
    { numKey: 'stat4Num', suffix: t('stat4Suffix'), label: t('stat4Label'), icon: STAT_ICONS[3], color: COLORS[3] },
  ] as const;

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[220px] bg-primary/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="mb-4 flex justify-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              {t('statsTagline')}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            {t('statsHeading')}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ numKey, suffix, label, icon, color }, idx) => (
            <StatItem
              key={numKey}
              target={parseStatNum(t(numKey))}
              suffix={suffix}
              label={label}
              icon={icon}
              color={color}
              delay={idx * 0.12}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
