import { Hero } from '@/components/features/Hero';
import { StatsSection } from '@/components/sections/StatsSection';
import { AboutSnippet } from '@/components/sections/AboutSnippet';
import { SectorsGrid } from '@/components/sections/SectorsGrid';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import Hero1 from '@/components/features/Hero1';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  return (
    <>
    
      {/* Hero Section */}
      <Hero1 />
      <Hero />

      {/* Agency Impact Stats Section */}
      <StatsSection />

      {/* About Agency & CEO Snippet Section */}
      <AboutSnippet />

      {/* Industry Sectors Grid Section */}
      <SectorsGrid />

      {/* Step-by-Step Recruitment Process Timeline */}
      <ProcessTimeline />
    </>
  );
}
