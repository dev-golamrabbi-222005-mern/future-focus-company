import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { GalleryClient } from '@/components/gallery/GalleryClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO' });

  return {
    title: t('gallery.title'),
    description: t('gallery.description'),
    alternates: {
      canonical: `/${locale}/gallery`,
      languages: {
        en: '/en/gallery',
        bn: '/bn/gallery',
        ar: '/ar/gallery',
        'x-default': '/en/gallery',
      },
    },
    openGraph: {
      title: t('gallery.title'),
      description: t('gallery.description'),
      url: `/${locale}/gallery`,
    },
  };
}

export default function GalleryPage() {
  return <GalleryClient />;
}
