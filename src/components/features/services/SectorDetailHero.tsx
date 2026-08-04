'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronRight, ShieldCheck, MapPin, Users2 } from 'lucide-react';

interface SectorDetailHeroProps {
  slug: string;
  locale: string;
}

export function SectorDetailHero({ slug, locale }: SectorDetailHeroProps) {
  const t = useTranslations('SectorsGrid');
  const heroRef = React.useRef<HTMLDivElement>(null);

  const title = t(`sectors.${slug}.title`);
  const subtitle = t(`sectors.${slug}.description`);
  const deployed = t(`sectors.${slug}.deployed`);

  useGSAP(
    () => {
      if (!heroRef.current) return;
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );
    },
    { scope: heroRef }
  );

  return (
    <div
      ref={heroRef}
      className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0a0f1c] via-background to-card border border-white/10 shadow-2xl overflow-hidden mb-12 text-center"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Breadcrumb Navigation */}
      <div className="inline-flex items-center space-x-2 rtl:space-x-reverse text-xs font-semibold text-muted-foreground bg-card/80 px-4 py-2 rounded-full border border-border/60 shadow-sm mb-6">
        <Link href={`/${locale}`} className="hover:text-primary transition-colors">
          {t('home')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
        <Link href={`/${locale}/services`} className="hover:text-primary transition-colors">
          {t('services')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
        <span className="text-primary font-bold">{title}</span>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-4">
        {title} Manpower
      </h1>

      <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
        {subtitle}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold">
        <span className="inline-flex items-center space-x-1.5 rtl:space-x-reverse bg-primary/10 text-primary border border-primary/20 px-3.5 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4" />
          <span>MHRSD Licensed & Compliant</span>
        </span>
        <span className="inline-flex items-center space-x-1.5 rtl:space-x-reverse bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
          <Users2 className="w-4 h-4" />
          <span>{deployed}</span>
        </span>
        <span className="inline-flex items-center space-x-1.5 rtl:space-x-reverse bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3.5 py-1.5 rounded-full">
          <MapPin className="w-4 h-4" />
          <span>Saudi Arabia (KSA)</span>
        </span>
      </div>
    </div>
  );
}
