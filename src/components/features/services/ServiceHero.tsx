'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Download, Users2, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export function ServiceHero({ locale }: { locale: string }) {
  const t = useTranslations('ServicesPage.hero');
  const heroRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!heroRef.current) return;

      const elements = heroRef.current.querySelectorAll('.hero-animate');
      gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    },
    { scope: heroRef }
  );

  return (
    <div
      ref={heroRef}
      className="relative py-16 md:py-24 rounded-3xl bg-gradient-to-br from-card via-background to-muted/40 border border-border/80 shadow-xl overflow-hidden"
    >
      {/* Background Decorative Blurs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
        {/* KSA Government Approved Tagline Badge */}
        <div className="hero-animate mb-6 inline-flex items-center space-x-2 rtl:space-x-reverse bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
          <ShieldCheck className="w-4 h-4 shrink-0 text-primary" />
          <span>{t('badge')}</span>
        </div>

        {/* Hero Title */}
        <h1 className="hero-animate text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
          {t('title')}
        </h1>

        {/* Subtitle */}
        <p className="hero-animate text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
          {t('subtitle')}
        </p>

        {/* Action Buttons */}
        <div className="hero-animate flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${locale}/contact#get-in-touch`}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rtl:space-x-reverse bg-primary text-primary-foreground font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-primary/25 hover:bg-primary/90 transition-all duration-300 group cursor-pointer"
          >
            <Users2 className="w-5 h-5" />
            <span>{t('ctaRequest')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>

          <a
            href="/company-profile.pdf"
            download
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rtl:space-x-reverse border border-border bg-card hover:bg-muted/50 text-foreground font-bold px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <Download className="w-5 h-5 text-primary" />
            <span>{t('ctaDownload')}</span>
          </a>
        </div>

        {/* Trust Badges Bar */}
        <div className="hero-animate mt-12 pt-8 border-t border-border/50 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-muted-foreground">
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t('trust1')}</span>
          </div>
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t('trust2')}</span>
          </div>
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t('trust3')}</span>
          </div>
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t('trust4')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
