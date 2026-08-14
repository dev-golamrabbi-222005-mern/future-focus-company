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
    legalName: 'Future Focus Company (Govt. Approved 7052268831)',
    alternateName: ['Future Focus Recruitment Agency', 'Future Focus Manpower'],
    url: siteUrl,
    logo: `${siteUrl}/logo.jpg`,
    image: `${siteUrl}/logo.jpg`,
    description:
      'Government Approved Recruitment Agency (7052268831) in Bangladesh connecting skilled Bangladeshi workers with top employers in Saudi Arabia, UAE, Qatar, and GCC countries.',
    identifier: '7052268831',
    taxID: '7052268831',
    telephone: '+8801700000000',
    email: 'operations@ffccom.net',
    priceRange: '$$',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: '204 Shahid Syed Nazrul Islam Avenue, 89 (12/B Old) Bijoy Nagar, Aziz Co-operative Marker - 2nd floor, Dhaka 1000, Bangladesh',
        addressLocality: 'Dhaka',
        postalCode: '1213',
        addressCountry: 'BD',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Building 3183, Saeed bin Al-Aas Street, Al-Quds District, Riyadh 13214, Kingdom of Saudi Arabia',
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
