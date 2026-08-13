import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { TermsOfServiceClient } from '@/components/features/legal/TermsOfServiceClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO' });

  return {
    title: t('terms.title'),
    description: t('terms.description'),
    alternates: {
      canonical: `/${locale}/terms-of-service`,
      languages: {
        en: '/en/terms-of-service',
        bn: '/bn/terms-of-service',
        ar: '/ar/terms-of-service',
        'x-default': '/en/terms-of-service',
      },
    },
    openGraph: {
      title: t('terms.title'),
      description: t('terms.description'),
      url: `/${locale}/terms-of-service`,
    },
  };
}

export default function TermsOfServicePage() {
  return <TermsOfServiceClient />;
}
