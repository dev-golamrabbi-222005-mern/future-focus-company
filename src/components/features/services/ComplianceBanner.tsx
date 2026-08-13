'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, RefreshCw, Award, FileCheck, CheckCircle2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ComplianceBanner() {
  const t = useTranslations('ServicesPage.compliance');
  const bannerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!bannerRef.current) return;

      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top 85%',
          },
        }
      );
    },
    { scope: bannerRef }
  );

  const trustBadges = [
    { title: t('badge1Title'), subtitle: t('badge1Sub'), icon: ShieldCheck, color: 'text-emerald-500 bg-emerald-500/10' },
    { title: t('badge2Title'), subtitle: t('badge2Sub'), icon: RefreshCw, color: 'text-blue-500 bg-blue-500/10' },
    { title: t('badge3Title'), subtitle: t('badge3Sub'), icon: Award, color: 'text-amber-500 bg-amber-500/10' },
    { title: t('badge4Title'), subtitle: t('badge4Sub'), icon: FileCheck, color: 'text-purple-500 bg-purple-500/10' },
  ];

  return (
    <div
      ref={bannerRef}
      className="p-8 sm:p-10 md:p-12 rounded-3xl bg-card border border-border/80 shadow-xl relative overflow-hidden mt-12 md:mt-16 lg:mt-20 mb-8 md:mb-10 lg:mb-12"
    >
      {/* Top Gradient Highlight Accent */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-primary to-accent" />

      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Heading & Subtitle */}
        <div className="lg:col-span-5 space-y-4 text-start">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-500">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
            <span>{t('tagline')}</span>
          </div>

          <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            {t('heading')}
          </h3>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t('subheading')}
          </p>
        </div>

        {/* Right Column: 4 Trust Badges Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {trustBadges.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-muted/40 border border-border/60 hover:border-primary/40 hover:bg-muted/70 transition-all flex items-start space-x-4 rtl:space-x-reverse"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center shrink-0 shadow-sm`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-foreground truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
