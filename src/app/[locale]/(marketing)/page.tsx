import Hero1 from '@/components/features/Hero1';
import AboutSection from '@/components/sections/AboutSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { AboutSnippet } from '@/components/sections/AboutSnippet';
import { SectorsGrid } from '@/components/sections/SectorsGrid';
import { GlobalReachMap } from '@/components/sections/GlobalReachMap';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { GetInTouch } from '@/components/sections/GetInTouch';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  return (
    <>
      {/* Refactored Hero1 Section */}
      <Hero1 />

      {/* Agency Impact Stats Section */}
      <StatsSection />

      {/* New About Section */}
      <AboutSection />

      {/* Why Choose Us Animated Section */}
      <WhyChooseUs />

      {/* About Agency & CEO Snippet Section */}
      <AboutSnippet />

      {/* Industry Sectors Grid Section */}
      <SectorsGrid />

      {/* GCC Deployment Reach & Testimonials */}
      <GlobalReachMap />

      {/* Step-by-Step Recruitment Process Timeline */}
      <ProcessTimeline />
      <Testimonials/>
      <FAQ/>
      <GetInTouch/>
    </>
  );
}
