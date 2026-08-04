'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, Building2, MapPin, CheckCircle2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Testimonials() {
  const t = useTranslations('Testimonials');
  const containerRef = React.useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      key: 'item1',
      rating: 5,
      avatarInitials: 'TM',
      avatarBg: 'from-amber-500 to-orange-600',
    },
    {
      key: 'item2',
      rating: 5,
      avatarInitials: 'SJ',
      avatarBg: 'from-sky-500 to-blue-600',
    },
    {
      key: 'item3',
      rating: 5,
      avatarInitials: 'RH',
      avatarBg: 'from-emerald-500 to-teal-600',
    },
  ];

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const cards = containerRef.current.querySelectorAll('.testimonial-card');

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 bg-muted/30 border-y border-border/60 relative overflow-hidden"
    >
      {/* Background Decorative Blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="mb-4 inline-flex items-center space-x-2 rtl:space-x-reverse bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <Building2 className="w-3.5 h-3.5" />
            <span>{t('tagline')}</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-4 leading-tight">
            {t('heading')}
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t('subheading')}
          </p>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item) => {
            const quote = t(`items.${item.key}.quote`);
            const name = t(`items.${item.key}.name`);
            const role = t(`items.${item.key}.role`);
            const location = t(`items.${item.key}.location`);
            const project = t(`items.${item.key}.project`);

            return (
              <div
                key={item.key}
                className="testimonial-card bg-card border border-border rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:border-primary/50 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Subtle top border accent on hover */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top Row: Stars + Quote Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-amber-400 text-amber-400 shrink-0"
                        />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-primary/20 group-hover:text-primary/40 transition-colors shrink-0" />
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-foreground/90 text-base leading-relaxed mb-6 font-medium italic">
                    &ldquo;{quote}&rdquo;
                  </p>
                </div>

                {/* Footer: Client Info */}
                <div className="pt-6 border-t border-border/60">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    {/* Avatar Placeholder with Gradient & Verified Icon */}
                    <div className="relative shrink-0">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.avatarBg} text-white font-bold flex items-center justify-center shadow-md text-sm tracking-wider`}
                      >
                        {item.avatarInitials}
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-card rounded-full p-0.5 shadow-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="min-w-0 flex-1">
                      <h4 className="text-base font-bold text-foreground truncate group-hover:text-primary transition-colors">
                        {name}
                      </h4>
                      <p className="text-xs font-medium text-muted-foreground truncate">
                        {role}
                      </p>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1 text-[11px] text-primary/80 font-medium">
                        <span className="inline-flex items-center space-x-1 rtl:space-x-reverse">
                          <MapPin className="w-3 h-3" />
                          <span>{location}</span>
                        </span>
                        <span>•</span>
                        <span className="truncate">{project}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
