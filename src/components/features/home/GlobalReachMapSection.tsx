'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Globe, Quote, Building, Star, Landmark, Gem, Crown } from 'lucide-react';

export function GlobalReachMap() {
  const t = useTranslations('GlobalReachMap');
  const tCommon = useTranslations('CommonUI');

  const hubs = [
    {
      name: t('saudiLabel'),
      count: t('saudiCount'),
      flag: '🇸🇦',
      icon: Crown,
      iconColor: 'text-amber-500 bg-amber-500/10',
      label: t('activeWorkforceLabel'),
    },
    {
      name: t('uaeLabel'),
      count: t('uaeCount'),
      flag: 'RYD',
      icon: Landmark,
      iconColor: 'text-sky-500 bg-sky-500/10',
      label: t('corporateProjectsLabel'),
    },
    {
      name: t('qatarLabel'),
      count: t('qatarCount'),
      flag: 'JED',
      icon: Gem,
      iconColor: 'text-violet-500 bg-violet-500/10',
      label: t('growingOperationsLabel'),
    },
    {
      name: t('kuwaitLabel'),
      count: t('kuwaitCount'),
      flag: 'GCC',
      icon: Star,
      iconColor: 'text-emerald-500 bg-emerald-500/10',
      label: t('comingSoonLabel'),
    },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden">
  <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-5 md:px-6 lg:px-8">

    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16"
    >
      <div className="mb-5 sm:mb-6 flex justify-center">
        <span className="max-w-full text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3 sm:px-4 py-2 rounded-full border border-primary/20 inline-flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 shrink-0 text-primary" />

          <span className="truncate">
            {t("tagline")}
          </span>
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4 text-center leading-tight">
        {t("heading")}
      </h2>

      <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
        {t("subheading")}
      </p>
    </motion.div>

    {/* Main Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start">

      {/* Left Column */}
      <div className="space-y-3 sm:space-y-4 min-w-0">

        {hubs.map((hub, idx) => {
          const Icon = hub.icon;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -4 }}
              transition={{
                duration: 0.4,
                delay: idx * 0.08,
              }}
              className="p-4 sm:p-5 md:p-6 rounded-2xl
                border
                border-border
                bg-card
                shadow-sm
                hover:shadow-lg
                hover:border-primary/50
                transition-all
                duration-300
                group
                cursor-pointer
                min-w-0
              "
            >

              {/* Mobile: Grid / Desktop: Flex */}
              <div className="
                grid
                grid-cols-[42px_minmax(0,1fr)]
                sm:flex
                sm:items-center
                gap-3
                sm:gap-3.5
              ">

                {/* Flag / Country Code */}
                <div className="
                  flex
                  items-center
                  justify-center
                  sm:block
                  shrink-0
                ">
                  <span className="text-2xl sm:text-3xl">
                    {hub.flag}
                  </span>
                </div>

                {/* Name + Label */}
                <div className="
                  min-w-0
                  flex-1
                ">
                  <h3 className="
                    text-sm
                    sm:text-base
                    font-bold
                    text-foreground
                    group-hover:text-primary
                    transition-colors
                    leading-snug
                    break-words
                  ">
                    {hub.name}
                  </h3>

                  <p className="
                    text-[10px]
                    sm:text-xs
                    text-muted-foreground
                    font-semibold
                    flex
                    items-start
                    gap-1.5
                    mt-1
                    leading-snug
                  ">
                    <span
                      className={`
                        inline-flex
                        items-center
                        justify-center
                        h-4
                        w-4
                        rounded-full
                        ${hub.iconColor}
                        shrink-0
                        mt-0.5
                      `}
                    >
                      <Icon className="h-2.5 w-2.5" />
                    </span>

                    <span className="break-words">
                      {hub.label}
                    </span>
                  </p>
                </div>

                {/* Count */}
                <div className="
                  col-span-2
                  sm:col-span-1
                  sm:ml-auto
                  w-full
                  sm:w-auto
                  min-w-0
                  sm:shrink-0
                ">
                  <div className="
                    w-full
                    sm:w-auto
                    px-3
                    sm:px-4
                    py-2
                    rounded-xl
                    bg-primary/10
                    text-primary
                    font-extrabold
                    text-[10px]
                    sm:text-xs
                    text-center
                    leading-tight
                    break-words
                  ">
                    {hub.count}
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}

      </div>

      {/* Right Column: Testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.6,
          delay: 0.2,
        }}
        className="
          p-6
          sm:p-8
          lg:p-10
          rounded-3xl
          border
          border-primary/30
          bg-gradient-to-br
          from-card
          via-card
          to-primary/10
          shadow-xl
          space-y-5
          sm:space-y-6
          relative
          overflow-hidden
          min-w-0
        "
      >

        <Quote
          className="
            h-10
            w-10
            sm:h-12
            sm:w-12
            text-primary/20
            absolute
            top-5
            right-5
            sm:top-6
            sm:right-6
            rtl:left-5
            rtl:right-auto
            sm:rtl:left-6
          "
        />

        <div className="flex items-center gap-3 min-w-0">

          <div className="
            p-2.5
            sm:p-3
            rounded-2xl
            bg-primary
            text-primary-foreground
            shrink-0
          ">
            <Building className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>

          <div className="min-w-0">
            <h3 className="
              text-base
              sm:text-lg
              font-extrabold
              text-foreground
              leading-tight
              break-words
            ">
              {t("testimonialTitle")}
            </h3>

            <p className="
              text-[10px]
              sm:text-xs
              text-muted-foreground
              font-semibold
              mt-1
            ">
              {tCommon("verifiedClient")}
            </p>
          </div>

        </div>

        <p className="
          text-sm
          sm:text-base
          lg:text-lg
          italic
          text-foreground/90
          font-medium
          leading-relaxed
          break-words
        ">
          {t("quote")}
        </p>

        <div className="pt-4 border-t border-border/60 min-w-0">

          <p className="
            text-sm
            sm:text-base
            font-extrabold
            text-foreground
            break-words
          ">
            {t("author")}
          </p>

          <p className="
            text-[10px]
            sm:text-xs
            text-primary
            font-semibold
            mt-1
            leading-relaxed
            break-words
          ">
            {t("role")}
          </p>

        </div>

      </motion.div>

    </div>

  </div>
</section>
  );
}
