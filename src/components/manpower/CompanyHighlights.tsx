"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, BriefcaseBusiness, Globe2, PhoneCall } from "lucide-react";

export default function CompanyHighlights() {
  const t = useTranslations("CompanyHighlights");

  const highlights = [
    {
      icon: ShieldCheck,
      title: t("items.0.title"),
      subtitle: t("items.0.subtitle"),
      color: "from-blue-600 to-cyan-500",
    },
    {
      icon: Zap,
      title: t("items.1.title"),
      subtitle: t("items.1.subtitle"),
      color: "from-sky-500 to-indigo-600",
    },
    {
      icon: BriefcaseBusiness,
      title: t("items.2.title"),
      subtitle: t("items.2.subtitle"),
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: Globe2,
      title: t("items.3.title"),
      subtitle: t("items.3.subtitle"),
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: PhoneCall,
      title: t("items.4.title"),
      subtitle: t("items.4.subtitle"),
      color: "from-indigo-600 to-sky-500",
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/40 border-y border-border/60 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="p-8 rounded-3xl border border-border/80 bg-card shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col items-center text-center space-y-4 group relative overflow-hidden"
              >
                {/* Top Gradient Strip */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`} />

                {/* Icon Badge */}
                <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] pt-1">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
