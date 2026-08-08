'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, ShieldCheck, MapPin, Users2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceDetailHeroProps {
  slug: string;
  locale: string;
}

export function ServiceDetailHero({ slug, locale }: ServiceDetailHeroProps) {
  const t = useTranslations('ServicesPage.details');
  const tBento = useTranslations('ServicesPage.bento.sectors');
  const tCommon = useTranslations('CommonUI');
  const heroRef = React.useRef<HTMLDivElement>(null);
  const bgRef = React.useRef<HTMLDivElement>(null);

  const sectorTitle = tBento(`${slug}.title`);
  const sectorTagline = tBento(`${slug}.shortDesc`);

  useGSAP(
    () => {
      if (!bgRef.current || !heroRef.current) return;

      // Parallax scroll effect
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: heroRef }
  );

  return (
    <div
      ref={heroRef}
      className="relative min-h-[380px] sm:min-h-[440px] pt-6 md:pt-8 lg:pt-10 flex items-center justify-center rounded-3xl overflow-hidden border border-border/80 shadow-2xl mb-12"
    >
      {/* Background Image with Parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-12 bg-cover bg-center -z-10 scale-110 transition-transform"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40 -z-10" />

      {/* Content Container */}
      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center max-w-4xl space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="inline-flex items-center space-x-2 rtl:space-x-reverse text-xs font-semibold text-muted-foreground bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-border/60 shadow-sm">
          <Link href={`/${locale}`} className="hover:text-primary transition-colors">
            {t('home')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
          <Link href={`/${locale}/services`} className="hover:text-primary transition-colors">
            {t('services')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
          <span className="text-primary font-bold">{sectorTitle}</span>
        </div>

        {/* Dynamic Sector Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight">
          {sectorTitle}
        </h1>

        {/* Sector Tagline */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {sectorTagline}
        </p>

        {/* Key Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold pt-2">
          <span className="inline-flex items-center space-x-1.5 rtl:space-x-reverse bg-primary/10 text-primary border border-primary/20 px-3.5 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span>{tCommon('licenseBadge')}</span>
          </span>
          <span className="inline-flex items-center space-x-1.5 rtl:space-x-reverse bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
            <Users2 className="w-4 h-4" />
            <span>{tCommon('gamcaBadge')}</span>
          </span>
          <span className="inline-flex items-center space-x-1.5 rtl:space-x-reverse bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3.5 py-1.5 rounded-full">
            <MapPin className="w-4 h-4" />
            <span>{tCommon('ksaBadge')}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
