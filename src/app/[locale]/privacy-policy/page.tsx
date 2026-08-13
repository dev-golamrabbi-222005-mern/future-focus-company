import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PrivacyPolicyClient } from '@/components/features/legal/PrivacyPolicyClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO' });

  return {
    title: t('privacy.title'),
    description: t('privacy.description'),
    alternates: {
      canonical: `/${locale}/privacy-policy`,
      languages: {
        en: '/en/privacy-policy',
        bn: '/bn/privacy-policy',
        ar: '/ar/privacy-policy',
        'x-default': '/en/privacy-policy',
      },
    },
    openGraph: {
      title: t('privacy.title'),
      description: t('privacy.description'),
      url: `/${locale}/privacy-policy`,
    },
  };
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
