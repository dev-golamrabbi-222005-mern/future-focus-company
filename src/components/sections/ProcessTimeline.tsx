'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileSearch, UserCheck, Stethoscope, PlaneTakeoff } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProcessTimeline() {
  const t = useTranslations('ProcessTimeline');
  const containerRef = React.useRef<HTMLDivElement>(null);
  const lineRef = React.useRef<HTMLDivElement>(null);

  const steps = [
    {
      num: t('step1Num'),
      title: t('step1Title'),
      desc: t('step1Desc'),
      icon: FileSearch,
    },
    {
      num: t('step2Num'),
      title: t('step2Title'),
      desc: t('step2Desc'),
      icon: UserCheck,
    },
    {
      num: t('step3Num'),
      title: t('step3Title'),
      desc: t('step3Desc'),
      icon: Stethoscope,
    },
    {
      num: t('step4Num'),
      title: t('step4Title'),
      desc: t('step4Desc'),
      icon: PlaneTakeoff,
    },
  ];

  useGSAP(
    () => {
      if (!containerRef.current) return;

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: 1,
            },
          }
        );
      }

      const stepItems = containerRef.current.querySelectorAll('.timeline-step');
      stepItems.forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, scale: 0.85, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="pt-12 md:pt-16 lg:pt-20 pb-8 md:pb-10 lg:pb-12 relative overflow-hidden">
      <div className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
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

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto">
          
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 bg-border/60 -translate-x-1/2 rounded-full" />
          
          <div
            ref={lineRef}
            className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-primary via-sky-400 to-accent -translate-x-1/2 rounded-full origin-top"
          />

          <div className="space-y-12 md:space-y-16 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`timeline-step flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  <div className="w-full md:w-1/2 pl-14 md:pl-0">
                    <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
                          Step {step.num}
                        </span>
                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>

                      <h3 className="text-xl font-extrabold text-foreground tracking-tight">
                        {step.title}
                      </h3>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground font-extrabold text-sm border-4 border-background shadow-lg flex items-center justify-center">
                      {step.num}
                    </div>
                  </div>

                  <div className="hidden md:block w-1/2" />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
