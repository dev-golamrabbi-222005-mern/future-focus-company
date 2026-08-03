import * as React from 'react';
import { notFound } from 'next/navigation';
import { SectorDetailHero } from '@/components/features/services/SectorDetailHero';
import { JobRolesGrid } from '@/components/features/services/JobRolesGrid';
import { ServiceSidebar } from '@/components/features/services/ServiceSidebar';

const validSlugs = ['construction', 'hospitality', 'it', 'healthcare', 'driving'];

interface ServiceDetailsPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function ServiceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  const { locale, slug } = await params;

  if (!validSlugs.includes(slug)) {
    notFound();
  }

  return (
    <main className="py-8 sm:py-12 md:py-16">
      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dynamic Sector Hero Header */}
        <SectorDetailHero slug={slug} locale={locale} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-8">
            <JobRolesGrid slug={slug} locale={locale} />
          </div>

          <div className="lg:col-span-4">
            <ServiceSidebar slug={slug} />
          </div>
        </div>
      </div>
    </main>
  );
}
