import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import { JsonLd } from '@/components/seo/JsonLd';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'SEO' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://futurefocuscompany.com';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t('defaultTitle'),
      template: t('titleTemplate'),
    },
    description: t('defaultDescription'),
    keywords: t('keywords'),
    authors: [{ name: 'Future Focus Company', url: baseUrl }],
    creator: 'Future Focus Company',
    publisher: 'Future Focus Company',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        bn: '/bn',
        ar: '/ar',
        'x-default': '/en',
      },
    },
    openGraph: {
      title: t('defaultTitle'),
      description: t('defaultDescription'),
      url: `${baseUrl}/${locale}`,
      siteName: t('siteName'),
      images: [
        {
          url: '/logo.jpg',
          width: 800,
          height: 600,
          alt: t('siteName'),
        },
      ],
      locale: locale === 'ar' ? 'ar_SA' : locale === 'bn' ? 'bn_BD' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('defaultTitle'),
      description: t('defaultDescription'),
      images: ['/logo.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    },
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Load messages server-side
  const messages = await getMessages({ locale });

  // RTL direction detection for Arabic
  const isRtl = locale === 'ar';
  const direction = isRtl ? 'rtl' : 'ltr';

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://futurefocuscompany.com';

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        <JsonLd siteUrl={baseUrl} />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppFloat />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
