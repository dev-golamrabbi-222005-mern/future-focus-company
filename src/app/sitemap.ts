import { MetadataRoute } from 'next';
import { locales } from '@/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ffccom.net';
  // Strip any trailing slashes to avoid double slashes (//) in generated sitemap URLs
  const baseUrl = rawBaseUrl.replace(/\/+$/, '');

  const routes = [
    '',
    '/about',
    '/our-services',
    '/services',
    '/careers',
    '/gallery',
    '/contact',
    '/faq',
    '/globalization',
    '/privacy-policy',
    '/terms-of-service',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    locales.forEach((locale) => {
      const isHome = route === '';
      const priority = isHome ? 1.0 : route.includes('services') ? 0.9 : 0.8;

      const languageAlternates: Record<string, string> = {};
      locales.forEach((l) => {
        languageAlternates[l] = `${baseUrl}/${l}${route}`;
      });
      languageAlternates['x-default'] = `${baseUrl}/en${route}`;

      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: isHome ? 'daily' : 'weekly',
        priority,
        alternates: {
          languages: languageAlternates,
        },
      });
    });
  });

  return sitemapEntries;
}
