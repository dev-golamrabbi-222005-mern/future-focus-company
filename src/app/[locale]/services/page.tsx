'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users2, Wrench, Stethoscope, Stamp, Plane, ShieldCheck } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesPage() {
  const t = useTranslations('ServicesPage');
  const containerRef = React.useRef<HTMLDivElement>(null);

  const services = [
    { title: t('service1Title'), desc: t('service1Desc'), icon: Users2, color: 'from-blue-500/20 to-sky-500/10 text-blue-500' },
    { title: t('service2Title'), desc: t('service2Desc'), icon: Wrench, color: 'from-amber-500/20 to-orange-500/10 text-amber-500' },
    { title: t('service3Title'), desc: t('service3Desc'), icon: Stethoscope, color: 'from-emerald-500/20 to-teal-500/10 text-emerald-500' },
    { title: t('service4Title'), desc: t('service4Desc'), icon: Stamp, color: 'from-purple-500/20 to-indigo-500/10 text-purple-500' },
    { title: t('service5Title'), desc: t('service5Desc'), icon: Plane, color: 'from-sky-500/20 to-cyan-500/10 text-sky-500' },
    { title: t('service6Title'), desc: t('service6Desc'), icon: ShieldCheck, color: 'from-rose-500/20 to-pink-500/10 text-rose-500' },
  ];

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const cards = containerRef.current.querySelectorAll('.service-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.93 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8 pt-8 md:pt-10 lg:pt-12 pb-8 md:pb-10 lg:pb-12 space-y-12 md:space-y-16 lg:space-y-20">
      
      {/* Header Banner */}
      <div className="text-center space-y-4">
        <div className="mb-6 flex justify-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
            {t('tagline')}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4">{t('heading')}</h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t('subheading')}</p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div key={idx} className="service-card p-8 rounded-3xl border border-border bg-card shadow-sm hover:shadow-2xl transition-all space-y-4 group">
              <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-extrabold text-foreground">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
