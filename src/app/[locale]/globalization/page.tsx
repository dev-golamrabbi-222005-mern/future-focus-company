import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ManpowerClient } from '@/components/manpower/ManpowerClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO' });

  return {
    title: t('manpower.title'),
    description: t('manpower.description'),
    alternates: {
      canonical: `/${locale}/manpower`,
      languages: {
        en: '/en/manpower',
        bn: '/bn/manpower',
        ar: '/ar/manpower',
        'x-default': '/en/manpower',
      },
    },
    openGraph: {
      title: t('manpower.title'),
      description: t('manpower.description'),
      url: `/${locale}/manpower`,
    },
  };
}

export default function ManpowerPage() {
  return <ManpowerClient />;
}
