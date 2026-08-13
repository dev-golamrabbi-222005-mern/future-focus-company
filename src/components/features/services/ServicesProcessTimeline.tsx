'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardCheck, Users, Wrench, PlaneTakeoff, ShieldCheck } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProcessTimeline() {
  const t = useTranslations('ServicesPage.process');
  const containerRef = React.useRef<HTMLDivElement>(null);
  const progressBarRef = React.useRef<HTMLDivElement>(null);

  const steps = [
    { key: 'step1', icon: ClipboardCheck, number: '01' },
    { key: 'step2', icon: Users, number: '02' },
    { key: 'step3', icon: Wrench, number: '03' },
    { key: 'step4', icon: ShieldCheck, number: '04' },
    { key: 'step5', icon: PlaneTakeoff, number: '05' },
  ];

  useGSAP(
    () => {
      if (!containerRef.current || !progressBarRef.current) return;

      // Vertical filling progress bar on scroll
      gsap.fromTo(
        progressBarRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
          {t('tagline')}
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight mt-4">
          {t('heading')}
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          {t('subheading')}
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative pl-6 sm:pl-10 rtl:pl-0 rtl:pr-6 rtl:sm:pr-10">
        {/* Static Background Vertical Line */}
        <div className="absolute top-0 bottom-0 left-3 sm:left-5 rtl:left-auto rtl:right-3 rtl:sm:right-5 w-1 bg-border/60 rounded-full" />

        {/* Animated Filling Progress Bar */}
        <div
          ref={progressBarRef}
          className="absolute top-0 bottom-0 left-3 sm:left-5 rtl:left-auto rtl:right-3 rtl:sm:right-5 w-1 bg-gradient-to-b from-primary via-accent to-emerald-500 rounded-full origin-top"
        />

        {/* Steps List with Framer Motion Scroll Pop-Up (Triggers once per page session) */}
        <div className="space-y-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const title = t(`steps.${step.key}.title`);
            const desc = t(`steps.${step.key}.desc`);

            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, scale: 0.65, y: 70 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2, margin: '0px 0px -80px 0px' }}
                transition={{
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 110,
                  damping: 14,
                  delay: idx * 0.05,
                }}
                className="step-card flex items-start space-x-6 rtl:space-x-reverse relative group"
              >
                {/* Step Icon Badge */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-card border-2 border-primary text-primary flex items-center justify-center font-bold text-sm sm:text-base shrink-0 shadow-md group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 z-10">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                {/* Step Content Card */}
                <div className="flex-1 bg-card border border-border/80 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {t('stepLabel')} {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
