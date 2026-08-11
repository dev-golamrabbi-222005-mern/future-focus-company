'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── slugs that expose flat `services` objects (title + badge + desc) ── */
const SERVICES_SLUGS: Record<string, string[]> = {
  'facility-management': [
    'electricians',
    'plumbers',
    'hvac',
    'housekeepers',
    'gardeners',
    'security',
    'drivers',
    'catering',
  ],
  construction: [
    'civilEngineers',
    'siteEngineers',
    'supervisors',
    'masons',
    'steelFixers',
    'welders',
    'scaffolders',
    'equipmentOperators',
  ],
};

/* ── slugs that expose rich `roles` objects (role1–role6) ── */
const ROLE_KEYS = ['role1', 'role2', 'role3', 'role4', 'role5', 'role6'];

interface JobRolesGridProps {
  slug: string;
  locale: string;
}

export function JobRolesGrid({ slug, locale }: JobRolesGridProps) {
  const t = useTranslations('SectorsGrid');
  const containerRef = React.useRef<HTMLDivElement>(null);

  const isServicesMode = slug in SERVICES_SLUGS;

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const cards = containerRef.current.querySelectorAll('.role-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
          {t('availableRolesTitle')}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t('availableRolesSubtitle')}
        </p>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isServicesMode
          ? SERVICES_SLUGS[slug].map((key) => (
              <ServiceCard
                key={key}
                title={t(`sectors.${slug}.services.${key}.title`)}
                badge={t(`sectors.${slug}.services.${key}.badge`)}
                desc={t(`sectors.${slug}.services.${key}.desc`)}
                hireLabel={t('requestRole')}
                tradeLabel={t('tradeTested')}
                locale={locale}
              />
            ))
          : ROLE_KEYS.map((key) => (
              <ServiceCard
                key={key}
                title={t(`sectors.${slug}.roles.${key}.title`)}
                badge={t(`sectors.${slug}.roles.${key}.badge`)}
                desc={t(`sectors.${slug}.roles.${key}.desc`)}
                hireLabel={t('requestRole')}
                tradeLabel={t('tradeTested')}
                locale={locale}
              />
            ))}
      </div>
    </div>
  );
}

/* ─── Shared card ─── */
interface ServiceCardProps {
  title: string;
  badge: string;
  desc: string;
  hireLabel: string;
  tradeLabel: string;
  locale: string;
}

function ServiceCard({
  title,
  badge,
  desc,
  hireLabel,
  tradeLabel,
  locale,
}: ServiceCardProps) {
  return (
    <div className="role-card group flex flex-col justify-between bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300">
      {/* Top */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            {badge}
          </span>
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
        </div>

        <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {desc}
        </p>
      </div>

      {/* Bottom */}
      <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-muted-foreground">
          {tradeLabel}
        </span>

        <Link
          href={`/${locale}/contact#get-in-touch`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline shrink-0"
        >
          <span>{hireLabel}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
