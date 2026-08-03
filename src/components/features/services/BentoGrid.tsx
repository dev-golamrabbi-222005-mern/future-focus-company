'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  HardHat,
  Hotel,
  Cpu,
  Stethoscope,
  Truck,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function BentoGrid({ locale }: { locale: string }) {
  const t = useTranslations('ServicesPage.bento');
  const gridRef = React.useRef<HTMLDivElement>(null);

  const sectors = [
    {
      slug: 'construction',
      icon: HardHat,
      colSpan: 'md:col-span-2 lg:col-span-2',
      color: 'from-amber-500/20 via-orange-500/10 to-transparent',
      badgeColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    },
    {
      slug: 'hospitality',
      icon: Hotel,
      colSpan: 'md:col-span-1 lg:col-span-1',
      color: 'from-sky-500/20 via-blue-500/10 to-transparent',
      badgeColor: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
    },
    {
      slug: 'it',
      icon: Cpu,
      colSpan: 'md:col-span-1 lg:col-span-1',
      color: 'from-purple-500/20 via-indigo-500/10 to-transparent',
      badgeColor: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    },
    {
      slug: 'healthcare',
      icon: Stethoscope,
      colSpan: 'md:col-span-1 lg:col-span-1',
      color: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      badgeColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    },
    {
      slug: 'driving',
      icon: Truck,
      colSpan: 'md:col-span-1 lg:col-span-1',
      color: 'from-rose-500/20 via-red-500/10 to-transparent',
      badgeColor: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    },
    {
      slug: 'cleaning',
      icon: Sparkles,
      colSpan: 'md:col-span-2 lg:col-span-2',
      color: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      badgeColor: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    },
  ];

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll('.bento-card');
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.94, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    },
    { scope: gridRef }
  );

  return (
    <section ref={gridRef} className="space-y-8">
      {/* Section Sub-header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
          {t('sectionTitle')}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          {t('sectionSubtitle')}
        </p>
      </div>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sectors.map((sector) => {
          const Icon = sector.icon;
          const title = t(`sectors.${sector.slug}.title`);
          const desc = t(`sectors.${sector.slug}.shortDesc`);
          const stats = t(`sectors.${sector.slug}.stats`);

          return (
            <div
              key={sector.slug}
              className={`bento-card ${sector.colSpan} bg-card border border-border rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:border-primary/50 transition-all duration-300 relative group overflow-hidden`}
            >
              {/* Radial gradient background accent */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${sector.color} opacity-30 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none`}
              />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-background/80 backdrop-blur-md border border-border/60 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${sector.badgeColor}`}
                  >
                    {stats}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                    {desc}
                  </p>
                </div>
              </div>

              {/* Hover reveal CTA button linking to details */}
              <div className="relative z-10 pt-6 mt-4 border-t border-border/40 flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                  {t('exploreSector')}
                </span>

                <Link
                  href={`/${locale}/services/${sector.slug}`}
                  className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-xs font-extrabold text-primary bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground px-4 py-2 rounded-xl transition-all duration-300 shadow-sm"
                >
                  <span>{t('viewDetails')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
