"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, BriefcaseBusiness, Globe2, PhoneCall } from "lucide-react";

export default function CompanyHighlights() {
  const t = useTranslations("CompanyHighlights");

  const highlights = [
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
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: Globe2,
      title: t("items.3.title"),
      subtitle: t("items.3.subtitle"),
      color: "from-indigo-600 to-sky-500",
    },
    {
      icon: PhoneCall,
      title: t("items.4.title"),
      subtitle: t("items.4.subtitle"),
      color: "from-blue-600 to-cyan-500",
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/15 border-y border-border/60 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                className="relative group p-7 rounded-3xl border border-border/80 bg-card shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-primary/50 hover:scale-105 transition-all duration-300 flex flex-col items-center text-center space-y-4 overflow-hidden"
              >
                {/* Top Gradient Strip */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`} />
                {/* Hover glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                {/* Icon Badge */}
                <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
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
