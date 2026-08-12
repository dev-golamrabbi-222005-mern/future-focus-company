import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Hero1 from '@/components/features/home/HeroSection';
import AboutSection from '@/components/features/home/AboutSection';
import { StatsSection } from '@/components/features/home/StatsSection';
import { WhyChooseUs } from '@/components/features/home/WhyChooseUsSection';
import { AboutSnippet } from '@/components/features/home/AboutSnippetSection';
import { SectorsGrid } from '@/components/features/services/ServicesSectorsGrid';
import { GlobalReachMap } from '@/components/features/home/GlobalReachMapSection';
import { ProcessTimeline } from '@/components/features/home/HomeProcessTimelineSection';
import { Testimonials } from '@/components/features/home/TestimonialsSection';
import { FAQ } from '@/components/features/home/HomeFAQSection';
import { GetInTouch } from '@/components/features/home/GetInTouchSection';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO' });

  return {
    title: t('home.title'),
    description: t('home.description'),
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
      title: t('home.title'),
      description: t('home.description'),
      url: `/${locale}`,
    },
  };
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
      <Testimonials />
      <FAQ />
      <GetInTouch />
    </>
  );
}
