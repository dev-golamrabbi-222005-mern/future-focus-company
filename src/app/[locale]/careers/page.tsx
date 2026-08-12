import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CareersClient } from '@/components/features/careers/CareersClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO' });

  return {
    title: t('careers.title'),
    description: t('careers.description'),
    alternates: {
      canonical: `/${locale}/careers`,
      languages: {
        en: '/en/careers',
        bn: '/bn/careers',
        ar: '/ar/careers',
        'x-default': '/en/careers',
      },
    },
    openGraph: {
      title: t('careers.title'),
      description: t('careers.description'),
      url: `/${locale}/careers`,
    },
  };
}

export default function CareersPage() {
  return <CareersClient />;
}
