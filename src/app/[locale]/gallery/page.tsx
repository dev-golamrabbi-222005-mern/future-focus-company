'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Building, Plane, Award, Users, CheckCircle2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GalleryPage() {
  const t = useTranslations('GalleryPage');
  const containerRef = React.useRef<HTMLDivElement>(null);

  const galleryItems = [
    { title: t('item1Title'), tag: 'Training Center', icon: Award, color: 'from-blue-900 to-sky-950' },
    { title: t('item2Title'), tag: 'Flight Departure', icon: Plane, color: 'from-slate-900 to-indigo-950' },
    { title: t('item3Title'), tag: 'Dubai Office', icon: Building, color: 'from-cyan-900 to-slate-950' },
    { title: t('item4Title'), tag: 'Hospitality Workshop', icon: Users, color: 'from-indigo-900 to-sky-950' },
    { title: t('item5Title'), tag: 'Safety Seminar', icon: CheckCircle2, color: 'from-slate-900 to-blue-950' },
    { title: t('item6Title'), tag: 'Client Delegation', icon: Camera, color: 'from-sky-900 to-indigo-950' },
  ];

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const items = containerRef.current.querySelectorAll('.gallery-card');
      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.88, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
        }
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="gallery-card relative rounded-3xl overflow-hidden border border-border shadow-md hover:shadow-2xl transition-all aspect-[4/3] group cursor-pointer">
              <div className={`absolute inset-0 bg-gradient-to-tr ${item.color} p-6 flex flex-col justify-between text-white`}>
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-sky-400" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">{item.tag}</span>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white">{item.title}</h3>
                  <p className="text-xs text-sky-300 font-medium">Global Manpower Records • RL-1428</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
