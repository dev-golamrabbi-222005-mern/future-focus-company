'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Target, Eye, Quote, CheckCircle2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const t = useTranslations('AboutPage');
  const containerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const animatedElements = containerRef.current.querySelectorAll('.gsap-fade-up');
      gsap.fromTo(
        animatedElements,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8 pt-8 md:pt-10 lg:pt-12 pb-8 md:pb-10 lg:pb-12 space-y-12 md:space-y-16 lg:space-y-20">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 gsap-fade-up">
        <div className="mb-6 flex justify-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
            {t('tagline')}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4">
          {t('title')}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {t('subtitle')}
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="gsap-fade-up p-8 rounded-3xl border border-border bg-card shadow-sm hover:shadow-xl transition-all space-y-4">
          <div className="p-3.5 rounded-2xl bg-primary/10 text-primary w-fit">
            <Target className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-foreground">{t('missionTitle')}</h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            {t('missionDesc')}
          </p>
        </div>

        <div className="gsap-fade-up p-8 rounded-3xl border border-border bg-card shadow-sm hover:shadow-xl transition-all space-y-4">
          <div className="p-3.5 rounded-2xl bg-accent/10 text-accent w-fit">
            <Eye className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-foreground">{t('visionTitle')}</h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            {t('visionDesc')}
          </p>
        </div>
      </div>

      {/* License & Accreditation Banner */}
      <div className="gsap-fade-up p-8 sm:p-12 rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/10 via-card to-accent/10 shadow-lg space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-primary text-primary-foreground">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">{t('licenseTitle')}</h3>
            <p className="text-sm text-muted-foreground font-medium">Government License: RL-1428</p>
          </div>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          {t('licenseDesc')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <span>BMET Smart Card Authorization</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <span>GAMCA Medical Affiliated</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <span>UAE Embassy Verified</span>
          </div>
        </div>
      </div>

      {/* Managing Director Statement */}
      <div className="gsap-fade-up max-w-4xl mx-auto p-8 sm:p-10 rounded-3xl border border-border bg-card shadow-md relative space-y-4">
        <Quote className="h-10 w-10 text-primary/30 absolute top-6 right-6 rtl:left-6 rtl:right-auto" />
        <h3 className="text-xl font-extrabold text-foreground">{t('mdTitle')}</h3>
        <p className="text-base sm:text-lg italic text-muted-foreground leading-relaxed">
          {t('mdMessage')}
        </p>
        <div className="pt-4 border-t border-border/60">
          <p className="text-base font-extrabold text-foreground">Md. Rafiqul Islam</p>
          <p className="text-xs text-primary font-semibold">Managing Director & Founder</p>
        </div>
      </div>

    </div>
  );
}
