'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { HardHat, ArrowRight, Layers, Building2 } from 'lucide-react';

export function SectorsGrid({ className }: { className?: string }) {
  const t = useTranslations('SectorsGrid');
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const sectors = [
    {
      slug: "facility-management",
      icon: Building2,
      image: "/images/services/Facility-Mangement.png",
      color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      subServices: [
        "electricians",
        "plumbers",
        "hvac",
        "housekeepers",
        "gardeners",
        "security",
        "drivers",
        "catering",
        "officeBoy",
        "receptionists"
      ],
    },
    {
      slug: "construction",
      icon: HardHat,
      image: "/images/services/Cunstaction.png",
      color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      subServices: [
        "civilEngineers",
        "siteEngineers",
        "supervisors",
        "masons",
        "steelFixers",
        "welders",
        "scaffolders",
        "equipmentOperators",
      ],
    },
  ];

  return (
    <section className={`py-12 md:py-16 lg:py-20 relative overflow-hidden ${className || ''}`}>
      <div className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14 md:mb-16"
        >
          <div className="mb-6 flex justify-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 inline-flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 shrink-0 text-primary" />
              <span>{t('tagline')}</span>
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4 text-center">
            {t('heading')}
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {sectors.map((sector, idx) => {
            const title = t(`sectors.${sector.slug}.title`);
            const desc = t(`sectors.${sector.slug}.description`);
            const deployed = t(`sectors.${sector.slug}.deployed`);

            return (
              <motion.div
                key={sector.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="sector-card bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 group shadow-sm hover:shadow-xl flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden shrink-0">
                  <img
                    src={sector.image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Badge */}
                  <span
                    className={`absolute top-4 right-4 text-[10px] font-extrabold tracking-wider px-3 py-1.5 rounded-full border uppercase backdrop-blur-md ${sector.badgeColor}`}
                  >
                    {deployed}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {title}
                    </h3>

                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  {/* Sub Services */}
                  <div className="mt-5 flex-1 flex flex-col">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                      {t("subServices")}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                      {sector.subServices.map((serviceKey: string) => (
                        <div
                          key={serviceKey}
                          className="flex items-start gap-2 text-sm text-foreground/80"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span>
                            {t(`sectors.${sector.slug}.services.${serviceKey}.title`)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom / Footer aligned to baseline */}
                  <div className="pt-4 mt-6 border-t border-border/60 flex items-center justify-between gap-4">
                    <span className="text-xs text-muted-foreground font-semibold">
                      {t("targetSector")}
                    </span>

                    <Link
                      href={`/${locale}/services/${sector.slug}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm shadow-md shadow-primary/25 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 active:scale-95 transition-all group/btn"
                    >
                      <span>{t("viewDetails")}</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 rtl-flip" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
