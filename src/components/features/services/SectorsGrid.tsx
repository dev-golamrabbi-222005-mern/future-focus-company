'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HardHat, Utensils, Laptop, HeartPulse, Truck, ArrowRight, Layers } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function SectorsGrid() {
  const t = useTranslations('SectorsGrid');
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const containerRef = React.useRef<HTMLDivElement>(null);

  const sectors = [
    {
      slug: 'construction',
      icon: HardHat,
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
    {
      slug: 'hospitality',
      icon: Utensils,
      color: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    },
    {
      slug: 'it',
      icon: Laptop,
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    },
    {
      slug: 'healthcare',
      icon: HeartPulse,
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      slug: 'driving',
      icon: Truck,
      color: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    },
  ];

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const cards = containerRef.current.querySelectorAll('.sector-card');

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
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
    <section ref={containerRef} className="max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
      {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <div className="mb-6 flex justify-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 inline-flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 shrink-0 text-primary" />
              <span>{t('tagline')}</span>
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4 text-center">
            {t('heading')}
          </h2>
          {/* <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t('subheading')}
          </p> */}
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectors.map((sector) => {
          const Icon = sector.icon;
          const title = t(`sectors.${sector.slug}.title`);
          const desc = t(`sectors.${sector.slug}.description`);
          const deployed = t(`sectors.${sector.slug}.deployed`);

          return (
            <div
              key={sector.slug}
              className="sector-card bg-card border border-border rounded-2xl p-6 flex flex-col justify-between hover:border-primary/50 transition-all duration-300 group shadow-sm hover:shadow-xl relative overflow-hidden"
            >
              {/* Top Row: Flex between Icon + Badge */}
              <div className="flex items-center justify-between">
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center ${sector.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span
                  className={`text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-full border uppercase ${sector.badgeColor}`}
                >
                  {deployed}
                </span>
              </div>

              {/* Middle: Title + Short Description */}
              <div className="my-4">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                  {desc}
                </p>
              </div>

              {/* Bottom Row: Separated by top border */}
              <div className="pt-4 mt-2 border-t border-border/60 flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium">
                  {t('targetSector')}
                </span>

                <Link
                  href={`/${locale}/services/${sector.slug}`}
                  className="inline-flex items-center space-x-1 rtl:space-x-reverse text-primary font-bold hover:underline group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
                >
                  <span>{t('viewDetails')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
