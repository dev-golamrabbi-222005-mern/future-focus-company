import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AboutIntro from '@/components/features/manpower/ManpowerAboutIntro';
import CompanyHighlights from '@/components/features/manpower/ManpowerCompanyHighlights';
import { SectorsGrid } from '@/components/features/services/ServicesSectorsGrid';
import WhatIsManpower from '@/components/features/manpower/WhatIsManpower';
import { ProcessTimeline as ServicesProcessTimeline } from '@/components/features/services/ServicesProcessTimeline';
import { ComplianceBanner } from '@/components/features/services/ComplianceBanner';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO' });

  return {
    title: t('manpower.title'),
    description: t('manpower.description'),
    alternates: {
      canonical: `/${locale}/manpower-solutions`,
      languages: {
        en: '/en/manpower-solutions',
        bn: '/bn/manpower-solutions',
        ar: '/ar/manpower-solutions',
        'x-default': '/en/manpower-solutions',
      },
    },
    openGraph: {
      title: t('manpower.title'),
      description: t('manpower.description'),
      url: `/${locale}/manpower-solutions`,
    },
  };
}

export default function ManpowerSolutionsPage() {
  return (
    <main className="w-full mb-6 md:mb-8 lg:mb-10">
      {/* 1. Hero Section (from old Globalization page) */}
      <AboutIntro />

      {/* 2. Stats Section (from old Globalization page with Homepage card design) */}
      <CompanyHighlights />

      {/* 3. Specialized Workforce Sectors Section (from old Services page) */}
      <SectorsGrid />

      {/* 4. What We Do Section (from old Globalization page) */}
      <WhatIsManpower />

      {/* 5. 5-Step Turnkey Deployment Workflow Section (from old Services page) */}
      <section className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <ServicesProcessTimeline />
      </section>

      {/* 6. Recruitment Guarantee Section (from old Globalization / Services page) */}
      <section className="py-12 md:py-16 lg:py-20 bg-muted/15 border-y border-border/60 relative overflow-hidden">
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <ComplianceBanner />
        </div>
      </section>
    </main>
  );
}
