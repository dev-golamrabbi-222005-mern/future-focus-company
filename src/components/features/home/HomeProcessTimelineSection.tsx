'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileSearch, UserCheck, Stethoscope, PlaneTakeoff, Workflow } from 'lucide-react';

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
      if (!containerRef.current || !lineRef.current) return;

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
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-12 md:py-16 lg:py-20 bg-muted/15 border-y border-border/60 relative overflow-hidden">
      <div className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <div className="mb-6 flex justify-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 inline-flex items-center gap-2">
              <Workflow className="w-3.5 h-3.5 shrink-0 text-primary" />
              <span>{t('tagline')}</span>
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4 text-center">
            {t('heading')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            {t('description')}
          </p>
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Background line */}
          <div className="absolute left-5 md:left-1/2 top-4 bottom-4 w-[2px] bg-border/60 md:-translate-x-1/2 rounded-full" />
          {/* Animated fill line */}
          <div
            ref={lineRef}
            className="absolute left-5 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary via-sky-400 to-accent md:-translate-x-1/2 rounded-full origin-top"
          />

          <div className="space-y-10 md:space-y-16 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.85, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.1,
                  }}
                  className={`timeline-step relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Card — offset left on mobile to clear dot */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0">
                    <div className="p-5 sm:p-7 rounded-3xl border border-border bg-card shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
                          {t('stepPrefix')} {step.num}
                        </span>
                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight">
                        {step.title}
                      </h3>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Dot — left-5 on mobile, centred on md+ */}
                  <div className="absolute left-5 top-6 md:left-1/2 md:top-1/2 md:-translate-y-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary text-primary-foreground font-extrabold text-xs md:text-sm border-4 border-background shadow-lg flex items-center justify-center">
                      {step.num}
                    </div>
                  </div>

                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
