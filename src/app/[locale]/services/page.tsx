import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ServiceHero } from '@/components/features/services/ServiceHero';
import { BentoGrid } from '@/components/features/services/BentoGrid';
import { ComplianceBanner } from '@/components/features/services/ComplianceBanner';
import { ProcessTimeline } from '@/components/features/services/ProcessTimeline';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO' });

  return {
    title: t('services.title'),
    description: t('services.description'),
    alternates: {
      canonical: `/${locale}/services`,
      languages: {
        en: '/en/services',
        bn: '/bn/services',
        ar: '/ar/services',
        'x-default': '/en/services',
      },
    },
    openGraph: {
      title: t('services.title'),
      description: t('services.description'),
      url: `/${locale}/services`,
    },
  };
}

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;

  return (
    <main className="py-8 sm:py-12 md:py-16 space-y-16 sm:space-y-20 md:space-y-24">
      {/* Standard Max-Width Container */}
      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20 md:space-y-24">
        {/* 1. Hero Section */}
        <ServiceHero locale={locale} />

        {/* 2. Bento Grid Sector Categories */}
        <BentoGrid locale={locale} />

        {/* 3. KSA Compliance & Guarantee Banner */}
        <ComplianceBanner />

        {/* 4. Dynamic Process Timeline */}
        <ProcessTimeline />
      </div>
    </main>
  );
}
