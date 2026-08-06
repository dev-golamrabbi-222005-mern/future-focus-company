'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Award, Zap, RefreshCw } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function WhyChooseUs() {
  const t = useTranslations('WhyChooseUs');
  const containerRef = React.useRef<HTMLDivElement>(null);

  const features = [
    {
      title: t('card1Title'),
      desc: t('card1Desc'),
      icon: ShieldCheck,
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-500',
    },
    {
      title: t('card2Title'),
      desc: t('card2Desc'),
      icon: Award,
      color: 'from-blue-500/20 to-indigo-500/10 text-blue-500',
    },
    {
      title: t('card3Title'),
      desc: t('card3Desc'),
      icon: Zap,
      color: 'from-amber-500/20 to-orange-500/10 text-amber-500',
    },
    {
      title: t('card4Title'),
      desc: t('card4Desc'),
      icon: RefreshCw,
      color: 'from-purple-500/20 to-sky-500/10 text-purple-500',
    },
  ];

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const cards = containerRef.current.querySelectorAll('.why-card');

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.93 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.14,
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
    <section ref={containerRef} className="py-12 md:py-16 lg:py-20 bg-muted/30 border-y border-border/60 relative overflow-hidden">
      {/* Background Accent Blur */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[300px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />

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
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t('subheading')}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="why-card p-8 rounded-3xl border border-border bg-card shadow-sm hover:shadow-2xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between space-y-4 group relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                <div className="pt-2 text-xs font-extrabold text-primary uppercase tracking-wider">
                  {t('guaranteedStandard')}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
