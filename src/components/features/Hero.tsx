'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Users, Award, ShieldCheck, ArrowRight, CheckCircle2, Globe2, Sparkles } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale();
  const [mounted, setMounted] = React.useState(false);

  const heroRef = React.useRef<HTMLDivElement>(null);
  const badgeRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const subtitleRef = React.useRef<HTMLParagraphElement>(null);
  const ctaRef = React.useRef<HTMLDivElement>(null);
  const statsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { label: t('statsPlacements'), value: t('statsPlacementsValue'), icon: Users },
    { label: t('statsSatisfaction'), value: t('statsSatisfactionValue'), icon: CheckCircle2 },
    { label: t('statsExperience'), value: t('statsExperienceValue'), icon: Award },
    { label: t('statsCountries'), value: t('statsCountriesValue'), icon: Globe2 },
  ];

  useGSAP(
    () => {
      if (!mounted || !heroRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, scale: 0.8, y: -20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6 }
        );
      }

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.3'
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 25, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15 },
          '-=0.4'
        );
      }

      if (statsRef.current) {
        tl.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 40, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12 },
          '-=0.3'
        );
      }
    },
    { scope: heroRef, dependencies: [mounted] }
  );

  return (
    <section ref={heroRef} className="relative max-h-[70vh] min-h-[500px] h-[70vh] flex flex-col justify-center items-center py-6 md:py-8 overflow-hidden">
      {/* Background Decorative Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-accent/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8 my-auto">
        
        {/* Top Tagline Badge */}
        <div ref={badgeRef} className="flex justify-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>{t('badge')}</span>
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.15]"
          >
            {t('titlePrefix')}{' '}
            <span className="bg-gradient-to-r from-sky-600 via-primary to-accent bg-clip-text text-transparent dark:from-sky-400 dark:via-primary dark:to-cyan-400">
              {t('titleHighlight')}
            </span>{' '}
            {t('titleSuffix')}
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-normal"
          >
            {t('subtitle')}
          </p>

          {/* Dual CTAs */}
          <div ref={ctaRef} className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              href={`/${locale}/contact`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-lg shadow-primary/30 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Briefcase className="h-5 w-5" />
              <span>{t('ctaHire')}</span>
              <ArrowRight className="h-4 w-4 rtl-flip" />
            </Link>

            <Link
              href={`/${locale}/careers`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl border-2 border-primary/40 bg-card text-foreground font-bold text-base hover:bg-muted hover:border-primary/60 transition-all duration-200"
            >
              <Users className="h-5 w-5 text-primary" />
              <span>{t('ctaApply')}</span>
            </Link>
          </div>
        </div>

        {/* Agency Metrics Banner */}
        <div ref={statsRef} className="mt-14 md:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
