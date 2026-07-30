'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, DollarSign, ArrowRight, CheckCircle2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function JobsPage() {
  const t = useTranslations('JobsPage');
  const locale = useLocale();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const jobs = [
    { title: t('job1Title'), company: t('job1Company'), salary: t('job1Salary'), category: 'Electrical' },
    { title: t('job2Title'), company: t('job2Company'), salary: t('job2Salary'), category: 'Transport' },
    { title: t('job3Title'), company: t('job3Company'), salary: t('job3Salary'), category: 'Hospitality' },
    { title: t('job4Title'), company: t('job4Company'), salary: t('job4Salary'), category: 'Maintenance' },
  ];

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const jobCards = containerRef.current.querySelectorAll('.job-card');
      gsap.fromTo(
        jobCards,
        { opacity: 0, y: 45, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8 pt-8 md:pt-10 lg:pt-12 pb-8 md:pb-10 lg:pb-12 space-y-12 md:space-y-16 lg:space-y-20">
      <div className="text-center space-y-4">
        <div className="mb-6 flex justify-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">{t('tagline')}</span>
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4">{t('heading')}</h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t('subheading')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job, idx) => (
          <div key={idx} className="job-card p-8 rounded-3xl border border-border bg-card shadow-sm hover:shadow-2xl transition-all space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary px-3 py-1 rounded-full">{job.category}</span>
                <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> Verified Demand</span>
              </div>
              <h3 className="text-2xl font-extrabold text-foreground group-hover:text-primary transition-colors">{job.title}</h3>
              <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4 text-primary shrink-0" /><span>{job.company}</span></p>
              <div className="p-3 rounded-xl bg-muted/40 border border-border/60 flex items-center gap-2 text-sm font-bold text-foreground">
                <DollarSign className="h-4 w-4 text-emerald-500 shrink-0" /><span>{job.salary}</span>
              </div>
            </div>
            <div className="pt-4 border-t border-border/60 flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-medium">Free Visa & Medical</span>
              <Link href={`/${locale}/contact#submit-cv`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md hover:bg-primary/90 transition-all">
                <span>{t('applyBtn')}</span>
                <ArrowRight className="h-3.5 w-3.5 rtl-flip" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
