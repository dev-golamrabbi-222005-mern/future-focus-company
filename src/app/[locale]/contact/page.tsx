import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ContactClient } from '@/components/features/contact/ContactClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO' });

  return {
    title: t('contact.title'),
    description: t('contact.description'),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        en: '/en/contact',
        bn: '/bn/contact',
        ar: '/ar/contact',
        'x-default': '/en/contact',
      },
    },
    openGraph: {
      title: t('contact.title'),
      description: t('contact.description'),
      url: `/${locale}/contact`,
    },
  };
}

export default function ContactPage() {
  return <ContactClient />;
}
