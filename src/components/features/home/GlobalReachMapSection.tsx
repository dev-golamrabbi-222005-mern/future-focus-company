'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, MapPin, Quote, Building, Star, Landmark, Gem, Crown } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function GlobalReachMap() {
  const t = useTranslations('GlobalReachMap');
  const tCommon = useTranslations('CommonUI');
  const containerRef = React.useRef<HTMLDivElement>(null);

  const hubs = [
    {
      name: t('saudiLabel'),
      count: t('saudiCount'),
      flag: '🇸🇦',
      icon: Crown,
      iconColor: 'text-amber-500 bg-amber-500/10',
      label: 'Active Workforce Solutions',
    },
    {
      name: t('uaeLabel'),
      count: t('uaeCount'),
      flag: 'RYD',
      icon: Landmark,
      iconColor: 'text-sky-500 bg-sky-500/10',
      label: 'Corporate Projects',
    },
    {
      name: t('qatarLabel'),
      count: t('qatarCount'),
      flag: 'JED',
      icon: Gem,
      iconColor: 'text-violet-500 bg-violet-500/10',
      label: 'Growing Operations',
    },
    {
      name: t('kuwaitLabel'),
      count: t('kuwaitCount'),
      flag: 'GCC',
      icon: Star,
      iconColor: 'text-emerald-500 bg-emerald-500/10',
      label: 'COMING SOON',
    },
  ];

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const animatedElements = containerRef.current.querySelectorAll('.gsap-fade-up');

      gsap.fromTo(
        animatedElements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
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
    <section ref={containerRef} className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
      <div className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16 gsap-fade-up">
          <div className="mb-6 flex justify-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 inline-flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 shrink-0 text-primary" />
              <span>{t('tagline')}</span>
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4 text-center">
            {t('heading')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t('subheading')}
          </p>
        </div>

        {/* 2-Column Grid: Deployment Hubs & Client Testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Column: GCC Deployment Network */}
          <div className="space-y-4">
            {hubs.map((hub, idx) => {
              const Icon = hub.icon;
              return (
                <div
                  key={idx}
                  className="gsap-fade-up p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg hover:border-primary/50 transition-all flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-3xl">{hub.flag}</span>
                    <div>
                      <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                        {hub.name}
                      </h3>
                      <p className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5 mt-0.5">
                        <span className={`inline-flex items-center justify-center h-4 w-4 rounded-full ${hub.iconColor}`}>
                          <Icon className="h-2.5 w-2.5" />
                        </span>
                        {hub.label}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 py-2 rounded-xl bg-primary/10 text-primary font-extrabold text-xs shrink-0">
                    {hub.count}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Featured Enterprise Testimonial Card */}
          <div className="gsap-fade-up p-8 sm:p-10 rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/10 shadow-xl space-y-6 relative overflow-hidden">
            <Quote className="h-12 w-12 text-primary/20 absolute top-6 right-6 rtl:left-6 rtl:right-auto" />

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-primary text-primary-foreground">
                <Building className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-foreground">{t('testimonialTitle')}</h3>
                <p className="text-xs text-muted-foreground font-semibold">{tCommon('verifiedClient')}</p>
              </div>
            </div>

            <p className="text-base sm:text-lg italic text-foreground/90 font-medium leading-relaxed">
              {t('quote')}
            </p>

            <div className="pt-4 border-t border-border/60">
              <p className="text-base font-extrabold text-foreground">{t('author')}</p>
              <p className="text-xs text-primary font-semibold">{t('role')}</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
