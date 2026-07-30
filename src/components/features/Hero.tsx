'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Briefcase, Users, Award, ShieldCheck, ArrowRight, CheckCircle2, Globe2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale();

  const stats = [
    { label: t('statsPlacements'), value: '15,000+', icon: Users },
    { label: t('statsSatisfaction'), value: '98.5%', icon: CheckCircle2 },
    { label: t('statsExperience'), value: '14+ Years', icon: Award },
    { label: t('statsCountries'), value: '6 GCC Nations', icon: Globe2 },
  ];

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-accent/15 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
            <ShieldCheck className="h-4 w-4 text-primary animate-pulse" />
            <span>{t('badge')}</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            {t('titlePrefix')}{' '}
            <span className="bg-gradient-to-r from-sky-600 via-primary to-accent bg-clip-text text-transparent dark:from-sky-400 dark:via-primary dark:to-cyan-400">
              {t('titleHighlight')}
            </span>{' '}
            {t('titleSuffix')}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-normal">
            {t('subtitle')}
          </p>

          {/* Dual CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            
            {/* Primary CTA (Dubai Clients) */}
            <Link
              href={`/${locale}#contact`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-lg shadow-primary/30 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Briefcase className="h-5 w-5" />
              <span>{t('ctaHire')}</span>
              <ArrowRight className="h-4 w-4 rtl-flip" />
            </Link>

            {/* Secondary CTA (Bangladeshi Candidates) */}
            <Link
              href={`/${locale}#vacancies`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl border-2 border-primary/40 bg-card text-foreground font-bold text-base hover:bg-muted hover:border-primary/60 transition-all duration-200"
            >
              <Users className="h-5 w-5 text-primary" />
              <span>{t('ctaApply')}</span>
            </Link>

          </div>
        </div>

        {/* Agency Metrics Banner */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 flex flex-col items-center text-center space-y-2 group"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
