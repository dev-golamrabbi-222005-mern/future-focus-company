'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, CheckCircle2, ArrowRight, Quote, Building2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutSnippet() {
  const t = useTranslations('AboutSnippet');
  const locale = useLocale();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.15, opacity: 0, clipPath: 'inset(10% 10% 10% 10% round 1.5rem)' },
          {
            scale: 1,
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
      <div className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Image Composition */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl bg-card aspect-[4/3] group">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-sky-950 to-slate-900 flex flex-col justify-between p-8 text-white">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                    <Building2 className="h-8 w-8 text-sky-400" />
                  </div>
                  <div className="px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-semibold text-xs flex items-center gap-1.5 backdrop-blur-md">
                    <ShieldCheck className="h-4 w-4" />
                    <span>{t('bmetBadge')}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-sky-400 font-bold">
                    {t('pipelineBadge')}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {t('cardTitle')}
                  </h3>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:-right-6 p-5 rounded-2xl bg-card border border-primary/30 shadow-2xl max-w-xs backdrop-blur-xl hidden sm:flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary text-primary-foreground shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-primary block uppercase">{t('ministryApproved')}</span>
                <span className="text-sm font-extrabold text-foreground">{t('rlLicense')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Text & CEO Quote */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <div className="mb-6">
                <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                  {t('badge')}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight mb-4">
                {t('title')}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t('subtitle')}
              </p>
            </div>

            {/* Key Value Points */}
            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-bold text-foreground">{t('point1Title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('point1Desc')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-bold text-foreground">{t('point2Title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('point2Desc')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-bold text-foreground">{t('point3Title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('point3Desc')}</p>
                </div>
              </div>
            </div>

            {/* CEO Quote Block */}
            <div className="p-6 rounded-2xl bg-muted/50 border border-border space-y-3 relative">
              <Quote className="h-8 w-8 text-primary/30 absolute top-4 right-4 rtl:left-4 rtl:right-auto" />
              <p className="text-sm sm:text-base italic text-foreground/90 font-medium leading-relaxed">
                {t('ceoQuote')}
              </p>
              <div className="pt-2">
                <p className="text-sm font-extrabold text-foreground">{t('ceoName')}</p>
                <p className="text-xs text-muted-foreground">{t('ceoTitle')}</p>
              </div>
            </div>

            {/* Action CTA */}
            <div>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:bg-primary/90 transition-all duration-200"
              >
                <span>{t('cta')}</span>
                <ArrowRight className="h-4 w-4 rtl-flip" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
