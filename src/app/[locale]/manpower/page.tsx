'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HardHat, Wrench, Utensils, Truck, ShieldCheck } from 'lucide-react';
import AboutIntro from '@/components/manpower/AboutIntro';
import WhatIsManpower from '@/components/manpower/WhatIsManpower';
import CompanyHighlights from '@/components/manpower/CompanyHighlights';
import ProcessSection from '@/components/manpower/ProcessSection';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ManpowerPage() {
  const t = useTranslations('ManpowerPage');
  const containerRef = React.useRef<HTMLDivElement>(null);

  const categories = [
    { title: t('cat1Title'), desc: t('cat1Desc'), icon: HardHat, color: 'from-amber-500/20 to-orange-500/10 text-amber-500' },
    { title: t('cat2Title'), desc: t('cat2Desc'), icon: Wrench, color: 'from-cyan-500/20 to-sky-500/10 text-cyan-500' },
    { title: t('cat3Title'), desc: t('cat3Desc'), icon: Utensils, color: 'from-rose-500/20 to-pink-500/10 text-rose-500' },
    { title: t('cat4Title'), desc: t('cat4Desc'), icon: Truck, color: 'from-blue-500/20 to-indigo-500/10 text-blue-500' },
  ];

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const items = containerRef.current.querySelectorAll('.gsap-fade-up');
      gsap.fromTo(
        items,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div>
      <AboutIntro />
      <CompanyHighlights />

      <div ref={containerRef} className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8 pt-8 md:pt-10 lg:pt-12 pb-8 md:pb-10 lg:pb-12 space-y-12 md:space-y-16 lg:space-y-20">
      <div className="text-center space-y-4 gsap-fade-up">
        <div className="mb-6 flex justify-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">{t('tagline')}</span>
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4">{t('heading')}</h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t('subheading')}</p>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-extrabold text-foreground tracking-tight gsap-fade-up">{t('categoryTitle')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={idx} className="gsap-fade-up p-8 rounded-3xl border border-border bg-card shadow-sm hover:shadow-xl transition-all space-y-4 group">
                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{cat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="gsap-fade-up p-8 sm:p-12 rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/10 via-card to-accent/10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <ShieldCheck className="h-5 w-5" />
            <span>BMET Approved Guarantee</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">{t('guaranteeTitle')}</h3>
          <p className="text-base text-muted-foreground leading-relaxed">{t('guaranteeDesc')}</p>
        </div>
        <div className="p-6 rounded-2xl bg-primary text-primary-foreground font-extrabold text-center shadow-lg">
          <span className="text-4xl block">90 Days</span>
          <span className="text-xs uppercase tracking-wider opacity-90">Free Replacement</span>
        </div>
      </div>
    </div>

    <WhatIsManpower />
    <ProcessSection />
    </div>
  );
}
