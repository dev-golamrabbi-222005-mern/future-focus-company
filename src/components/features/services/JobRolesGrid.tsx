'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ShieldCheck, Wrench, ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface JobRolesGridProps {
  slug: string;
  locale: string;
}

export function JobRolesGrid({ slug, locale }: JobRolesGridProps) {
  const t = useTranslations('SectorsGrid');
  const containerRef = React.useRef<HTMLDivElement>(null);

  const roleKeys = ['role1', 'role2', 'role3', 'role4', 'role5', 'role6'];

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const cards = containerRef.current.querySelectorAll('.role-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
            {t('availableRolesTitle')}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t('availableRolesSubtitle')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roleKeys.map((key) => {
          const title = t(`sectors.${slug}.roles.${key}.title`);
          const badge = t(`sectors.${slug}.roles.${key}.badge`);
          const desc = t(`sectors.${slug}.roles.${key}.desc`);

          return (
            <div
              key={key}
              className="role-card bg-card border border-border rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                    {badge}
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                </div>

                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {title}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">
                  {t('tradeTested')}
                </span>

                <Link
                  href={`/${locale}/contact#get-in-touch`}
                  className="inline-flex items-center space-x-1 rtl:space-x-reverse text-xs font-bold text-primary group-hover:underline"
                >
                  <span>{t('requestRole')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
