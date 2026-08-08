import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { FAQClient } from '@/components/faq/FAQClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO' });

  return {
    title: t('faq.title'),
    description: t('faq.description'),
    alternates: {
      canonical: `/${locale}/faq`,
      languages: {
        en: '/en/faq',
        bn: '/bn/faq',
        ar: '/ar/faq',
        'x-default': '/en/faq',
      },
    },
    openGraph: {
      title: t('faq.title'),
      description: t('faq.description'),
      url: `/${locale}/faq`,
    },
  };
}

export default function FAQPage() {
  return <FAQClient />;
}
