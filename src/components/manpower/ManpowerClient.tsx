'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HardHat, Wrench, Utensils, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import AboutIntro from '@/components/manpower/AboutIntro';
import WhatIsManpower from '@/components/manpower/WhatIsManpower';
import CompanyHighlights from '@/components/manpower/CompanyHighlights';
import ProcessSection from '@/components/manpower/ProcessSection';
import {useLocale } from "next-intl";
import Link from 'next/link';


if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ManpowerClient() {
   const locale = useLocale();
  const t = useTranslations('ManpowerPage');
  const tCommon = useTranslations('CommonUI');
  const containerRef = React.useRef<HTMLDivElement>(null);

const categories = [
  {
    title: t("cat1Title"),
    desc: t("cat1Desc"),
    image: "/images/categories/civil-construction.jpg",
  },
  {
    title: t("cat2Title"),
    desc: t("cat2Desc"),
    image: "/images/categories/mep-electrical.jpg",
  },
  {
    title: t("cat3Title"),
    desc: t("cat3Desc"),
    image: "/images/categories/hospitality-retail.jpg",
  },
  {
    title: t("cat4Title"),
    desc: t("cat4Desc"),
    image: "/images/categories/transportation.jpg",
  },
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

      <div ref={containerRef} className="max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8 pt-8 md:pt-10 lg:pt-12 pb-8 md:pb-10 lg:pb-12 space-y-12 md:space-y-16 lg:space-y-20">
        <div className="text-center space-y-4 gsap-fade-up">
          <div className="mb-6 flex justify-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">{t('tagline')}</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4">{t('heading')}</h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t('subheading')}</p>
        </div>


        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {categories.map((cat, idx) => {
            return (
              <div
                key={idx}
                className="gsap-fade-up group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Image */}

                <div className="overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Content */}

                <div className="space-y-4 p-6">
                  <h3 className="text-xl font-bold text-foreground">
                    {cat.title}
                  </h3>

                  <p className="text-sm leading-7 text-muted-foreground">
                    {cat.desc}
                  </p>
                
                <Link
                        href={`/${locale}/contact#submit-cv`}
                        className="group/btn inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90 transition-all"
                      >
                        {t("applyBtn")}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>
              </div>
              </div>
            );
          })}
        </div>

        <div className="gsap-fade-up p-8 sm:p-12 rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/10 via-card to-accent/10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <ShieldCheck className="h-5 w-5" />
              <span>{tCommon('bmetApprovedBadge')}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">{t('guaranteeTitle')}</h3>
            <p className="text-base text-muted-foreground leading-relaxed">{t('guaranteeDesc')}</p>
          </div>
          <div className="p-6 rounded-2xl bg-primary text-primary-foreground font-extrabold text-center shadow-lg">
            <span className="text-[13px] uppercase tracking-wider block">{tCommon('freeReplacementBadge')}</span>
          </div>
        </div>
      </div>

      <WhatIsManpower />
      <ProcessSection />
    </div>
  );
}
