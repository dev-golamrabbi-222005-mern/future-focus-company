'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HardHat, Utensils, Truck, HeartPulse, Wrench, Laptop, ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function SectorsGrid() {
  const t = useTranslations('SectorsGrid');
  const containerRef = React.useRef<HTMLDivElement>(null);

  const sectors = [
    {
      title: t('sector1Title'),
      desc: t('sector1Desc'),
      icon: HardHat,
      color: 'from-amber-500/20 to-orange-500/10 text-amber-500',
    },
    {
      title: t('sector2Title'),
      desc: t('sector2Desc'),
      icon: Utensils,
      color: 'from-rose-500/20 to-pink-500/10 text-rose-500',
    },
    {
      title: t('sector3Title'),
      desc: t('sector3Desc'),
      icon: Truck,
      color: 'from-blue-500/20 to-indigo-500/10 text-blue-500',
    },
    {
      title: t('sector4Title'),
      desc: t('sector4Desc'),
      icon: HeartPulse,
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-500',
    },
    {
      title: t('sector5Title'),
      desc: t('sector5Desc'),
      icon: Wrench,
      color: 'from-cyan-500/20 to-sky-500/10 text-cyan-500',
    },
    {
      title: t('sector6Title'),
      desc: t('sector6Desc'),
      icon: Laptop,
      color: 'from-purple-500/20 to-violet-500/10 text-purple-500',
    },
  ];

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const cards = containerRef.current.querySelectorAll('.sector-card');

      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-12 md:py-16 lg:py-20 bg-muted/30 border-t border-border/60 relative">
      <div className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <div className="mb-6 flex justify-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              {t('tagline')}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4">
            {t('heading')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            {t('description')}
          </p>
        </div>

        {/* Sectors Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <div
                key={idx}
                className="sector-card p-8 rounded-3xl border border-border bg-card shadow-sm hover:shadow-2xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${sector.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  
                  <h3 className="text-xl font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors">
                    {sector.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {sector.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-border/50 flex items-center justify-between text-xs font-bold text-primary">
                  <span>{t('learnMore')}</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl-flip transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
