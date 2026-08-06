import React from 'react';

interface JsonLdProps {
  siteUrl?: string;
}

export function JsonLd({ siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://futurefocuscompany.com' }: JsonLdProps) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['RecruitmentAgency', 'LocalBusiness', 'Organization'],
    '@id': `${siteUrl}/#organization`,
    name: 'Future Focus Company',
    legalName: 'Future Focus Company (Govt. Approved RL-1428)',
    alternateName: ['Future Focus Recruitment Agency', 'Future Focus Manpower'],
    url: siteUrl,
    logo: `${siteUrl}/logo.jpg`,
    image: `${siteUrl}/logo.jpg`,
    description:
      'Government Approved Recruitment Agency (RL-1428) in Bangladesh connecting skilled Bangladeshi workers with top employers in Saudi Arabia, UAE, Qatar, and GCC countries.',
    identifier: 'RL-1428',
    taxID: 'RL-1428',
    telephone: '+8801700000000',
    email: 'info@futurefocuscompany.com',
    priceRange: '$$',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'House 12, Road 04, Block B, Banani',
        addressLocality: 'Dhaka',
        postalCode: '1213',
        addressCountry: 'BD',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Suite 402, Business Bay Tower, Al Amal Street, Business Bay',
        addressLocality: 'Riyadh',
        addressCountry: 'SA',
      },
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '23.7937',
      longitude: '90.4066',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    areaServed: [
      {
        '@type': 'Country',
        name: 'Saudi Arabia',
      },
      {
        '@type': 'Country',
        name: 'United Arab Emirates',
      },
      {
        '@type': 'Country',
        name: 'Qatar',
      },
      {
        '@type': 'Country',
        name: 'Kuwait',
      },
      {
        '@type': 'Country',
        name: 'Bahrain',
      },
      {
        '@type': 'Country',
        name: 'Oman',
      },
    ],
    knowsLanguage: ['en', 'bn', 'ar'],
    sameAs: [
      'https://www.facebook.com/futurefocuscompany',
      'https://www.linkedin.com/company/futurefocuscompany',
      'https://twitter.com/futurefocusco',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'Future Focus Company',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    inLanguage: ['en', 'bn', 'ar'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
