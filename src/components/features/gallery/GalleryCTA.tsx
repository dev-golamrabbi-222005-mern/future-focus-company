'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Briefcase } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function GalleryCTA() {
  const t = useTranslations('GalleryPage');
  const locale = useLocale();
  const ctaRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ctaRef.current) return;
    gsap.fromTo(
      ctaRef.current.querySelectorAll('.cta-anim'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
      },
    );
  }, { scope: ctaRef });

  return (
    <section
      ref={ctaRef}
      className="relative py-12 md:py-16 lg:py-20 bg-muted/15 border-y border-border/60 overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none flex items-center justify-center">
        <div className="absolute w-[800px] h-[250px] bg-primary/15 rounded-[100%] blur-[120px] -rotate-12 translate-y-10" />
        <div className="absolute top-10 right-[10%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-[10%] w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[130px]" />
      </div>

      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] bg-card/60 backdrop-blur-2xl border border-border shadow-2xl px-6 py-12 md:py-16 text-center z-10 group"
        >
          {/* Inner card accents */}
          <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-70" />
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[70%] h-[200px] bg-primary/20 blur-[80px] -z-10" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[100px] -z-10 transition-transform duration-700 group-hover:scale-125" />

          <div className="relative z-20">
            {/* Tagline */}
            <div className="cta-anim mb-8 flex justify-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-5 py-2.5 rounded-full ring-1 ring-primary/30 shadow-[0_0_15px_rgba(3,105,161,0.2)]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                {t('ctaTagline')}
              </motion.span>
            </div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="cta-anim text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight md:leading-[1.15] mb-8 max-w-4xl mx-auto"
            >
              {t('ctaHeading')}
            </motion.h2>

            {/* Divider */}
            <div className="cta-anim mx-auto mb-8 h-1.5 w-24 rounded-full bg-gradient-to-r from-primary to-cyan-400 shadow-[0_0_10px_rgba(3,105,161,0.5)] opacity-90" />

            {/* Subheading */}
            <p className="cta-anim text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              {t('ctaSubheading')}
            </p>

            {/* Buttons */}
            <div className="cta-anim flex flex-col sm:flex-row items-center justify-center gap-5">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={`/${locale}/contact`}
                  className="group/btn inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-2xl bg-gradient-to-r from-primary to-sky-500 text-white font-bold text-sm md:text-base shadow-[0_0_20px_rgba(3,105,161,0.4)] hover:shadow-[0_0_30px_rgba(3,105,161,0.6)] transition-all duration-300 w-full sm:w-auto"
                >
                  <Briefcase className="h-5 w-5 transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
                  {t('ctaHire')}
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={`/${locale}/careers`}
                  className="group/btn inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-2xl border border-border bg-background/50 backdrop-blur-sm text-foreground font-bold text-sm md:text-base hover:bg-muted hover:border-primary/50 hover:text-primary transition-all duration-300 w-full sm:w-auto"
                >
                  {t('ctaApply')}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
