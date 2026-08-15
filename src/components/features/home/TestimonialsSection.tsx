'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Star, Quote, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

export function Testimonials() {
  const t = useTranslations('Testimonials');
  const tCommon = useTranslations('CommonUI');
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const tweenRef = React.useRef<gsap.core.Tween | null>(null);

  // Array of 15 keys
  const items = Array.from({ length: 15 }, (_, i) => `item${i + 1}`);

  // Duplicate items array twice to achieve seamless looping
  const marqueeItems = [...items, ...items];

  useGSAP(
    () => {
      if (!marqueeRef.current) return;

      const track = marqueeRef.current;
      const totalWidth = track.scrollWidth / 2;

      // GSAP smooth linear marquee tween
      tweenRef.current = gsap.to(track, {
        x: `-=${totalWidth}`,
        duration: 100,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });

      return () => {
        if (tweenRef.current) tweenRef.current.kill();
      };
    },
    { scope: marqueeRef }
  );

  const handleMouseEnter = () => {
    if (tweenRef.current) tweenRef.current.pause();
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) tweenRef.current.play();
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16 text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
          <MessageSquareQuote className="w-3.5 h-3.5 shrink-0 text-primary" />
          <span>{t('tagline')}</span>
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4 text-center">
          {t('heading')}
        </h2>

        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {t('subheading')}
        </p>
      </motion.div>

      {/* Infinite Marquee Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative w-full overflow-hidden py-4 cursor-grab active:cursor-grabbing"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left & Right Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background/60 to-transparent z-10 pointer-events-none" />

        <div
          ref={marqueeRef}
          className="flex gap-6 w-max items-stretch"
        >
          {marqueeItems.map((itemKey, idx) => {
            const quote = t(`items.${itemKey}.quote`);
            const name = t(`items.${itemKey}.name`);
            const role = t(`items.${itemKey}.role`);
            const location = t(`items.${itemKey}.location`);
            const type = t(`items.${itemKey}.type`);
            const isB2B = type === 'b2b';

            // Generate initials for avatar
            const initials = name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .substring(0, 2)
              .toUpperCase();

            return (
              <div
                key={`${itemKey}-${idx}`}
                className="w-[320px] sm:w-[380px] md:w-[420px] shrink-0 bg-card border border-border rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Accent top border on card hover */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top Bar: Star Rating & Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0"
                        />
                      ))}
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${isB2B
                          ? 'bg-sky-500/10 text-sky-500 border-sky-500/20'
                          : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                        }`}
                    >
                      {isB2B ? tCommon('enterpriseEmployer') : tCommon('verifiedCandidate')}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-foreground/90 text-sm md:text-base leading-relaxed mb-6 font-medium italic">
                    &ldquo;{quote}&rdquo;
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-5 border-t border-border/60">
                  <div className="flex items-center space-x-3.5 rtl:space-x-reverse">
                    <div className="relative shrink-0">
                      <div
                        className={`w-11 h-11 rounded-full bg-gradient-to-br ${isB2B
                            ? 'from-blue-600 to-sky-500'
                            : 'from-emerald-600 to-teal-500'
                          } text-white font-bold flex items-center justify-center text-xs tracking-wider shadow-sm`}
                      >
                        {initials}
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-card rounded-full p-0.5 shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                        {name}
                      </h4>
                      <p className="text-xs text-muted-foreground truncate font-medium">
                        {role}
                      </p>
                      <p className="text-[11px] text-primary/80 font-medium truncate mt-0.5">
                        {location}
                      </p>
                    </div>

                    <Quote className="w-6 h-6 text-primary/20 shrink-0" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
