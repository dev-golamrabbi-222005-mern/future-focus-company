'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Users, Briefcase } from 'lucide-react';

export default function Hero1() {
  const t = useTranslations('Hero1');
  const locale = useLocale();
  const [index, setIndex] = useState(0);

  const slideImages = [
    'https://i.postimg.cc/k5K41hnC/Hero-1.png',
    'https://i.postimg.cc/g08JSBYY/Hero-2.jpg',
    'https://i.postimg.cc/43VdLFJc/Hero-3.png',
    'https://i.postimg.cc/3wmRSbKv/Hero-4.png',
  ];

  const slides = [
    {
      id: 1,
      role: t('slide1.role'),
      title: t('slide1.title'),
      highlight: t('slide1.highlight'),
      desc: t('slide1.desc'),
      img: slideImages[0],
    },
    {
      id: 2,
      role: t('slide2.role'),
      title: t('slide2.title'),
      highlight: t('slide2.highlight'),
      desc: t('slide2.desc'),
      img: slideImages[1],
    },
    {
      id: 3,
      role: t('slide3.role'),
      title: t('slide3.title'),
      highlight: t('slide3.highlight'),
      desc: t('slide3.desc'),
      img: slideImages[2],
    },
    {
      id: 4,
      role: t('slide4.role'),
      title: t('slide4.title'),
      highlight: t('slide4.highlight'),
      desc: t('slide4.desc'),
      img: slideImages[3],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-[calc(100vh-80px)] pt-8 md:pt-10 lg:pt-12 pb-12 md:pb-16 lg:pb-20 w-full bg-background overflow-hidden flex items-center justify-center">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.25, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <img
              src={slides[index].img}
              className="object-cover w-full h-full min-h-[calc(100vh-80px)]"
              alt="Background"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8 my-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          
          {/* Left Column Text Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="space-y-6"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-primary font-bold tracking-widest text-xs uppercase">
                    {slides[index].role}
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.15] tracking-tight">
                  {t('brandName')} <br />
                  <span className="bg-gradient-to-r from-sky-500 via-primary to-cyan-400 bg-clip-text text-transparent">
                    {slides[index].highlight}
                  </span>
                </h1>

                {/* Subtitle / Description */}
                <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
                  {slides[index].desc}
                </p>

                {/* Dual CTAs */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  {/* Primary CTA (Employers) */}
                  <Link
                    href={`/${locale}/contact`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-lg shadow-primary/30 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    <Briefcase className="h-5 w-5" />
                    <span>{t('ctaHire')}</span>
                    <ArrowRight className="h-4 w-4 rtl-flip" />
                  </Link>

                  {/* Secondary CTA (Candidates) */}
                  <Link
                    href={`/${locale}/jobs`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl border-2 border-primary/40 bg-card/80 backdrop-blur-md text-foreground font-bold text-base hover:bg-muted hover:border-primary/60 transition-all duration-200"
                  >
                    <Users className="h-5 w-5 text-primary" />
                    <span>{t('ctaApply')}</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column Slide Showcase Card */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xl aspect-[4/3] rounded-3xl overflow-hidden border border-border/80 shadow-2xl bg-card">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={index}
                  initial={{
                    clipPath: 'circle(0% at 50% 50%)',
                    filter: 'blur(10px)',
                    scale: 1.1,
                  }}
                  animate={{
                    clipPath: 'circle(150% at 50% 50%)',
                    filter: 'blur(0px)',
                    scale: 1,
                  }}
                  exit={{ opacity: 0, filter: 'blur(8px)', scale: 1.05 }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={slides[index].img}
                    className="object-cover w-full h-full min-h-full"
                    alt={slides[index].highlight}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                  {/* Indicators & Active Highlight Banner */}
                  <div className="absolute z-20 flex items-end justify-between bottom-6 left-6 right-6">
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        {slides.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setIndex(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`h-2 rounded-full transition-all duration-500 ${
                              index === i
                                ? 'w-10 bg-primary'
                                : 'w-4 bg-white/30 hover:bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight drop-shadow-md">
                        {slides[index].highlight}
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-primary/90 text-primary-foreground shadow-lg backdrop-blur-md">
                      <MapPin className="h-6 w-6" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
