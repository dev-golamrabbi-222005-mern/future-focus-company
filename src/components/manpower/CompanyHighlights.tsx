"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {ShieldCheck, Zap, BriefcaseBusiness, Globe2, PhoneCall,} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CompanyHighlights() {
  const t = useTranslations("CompanyHighlights");

  const sectionRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
    },
    { scope: sectionRef },
  );

  const highlights = [
    {
      icon: ShieldCheck,
      title: t("items.0.title"),
      subtitle: t("items.0.subtitle"),
      color: "text-green-500",
    },
    {
      icon: Zap,
      title: t("items.1.title"),
      subtitle: t("items.1.subtitle"),
      color: "text-yellow-500",
    },
    {
      icon: BriefcaseBusiness,
      title: t("items.2.title"),
      subtitle: t("items.2.subtitle"),
      color: "text-amber-500",
    },
    {
      icon: Globe2,
      title: t("items.3.title"),
      subtitle: t("items.3.subtitle"),
      color: "text-blue-500",
    },
    {
      icon: PhoneCall,
      title: t("items.4.title"),
      subtitle: t("items.4.subtitle"),
      color: "text-primary",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-visible bg-background py-12 lg:py-12"
    >
      {/* Background Pattern */}

      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 lg:grid-cols-3 md:divide-x md:divide-y-0 xl:grid-cols-5">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                }}
                whileHover={{
                  y: -6,
                  backgroundColor: "rgba(255,255,255,.08)",
                }}
                className=" highlight-card group relative flex items-center gap-5 overflow-hidden px-8 py-8 transition-all duration-500 hover:cursor-pointer">
                {/* Hover Glow */}

                <div
                  className=" absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
                </div>

                {/* Icon */}

                <motion.div
                  whileHover={{
                    rotate: 12,
                    scale: 1.15,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md ${item.color}`}>
                  <Icon className="h-7 w-7" />
                </motion.div>

                {/* Content */}

                <div className="relative z-10 flex-1">
                  <h3
                    className="text-xl lg:text-2xl font-black uppercase tracking-wide text-foreground">
                
                    {item.title}
                  </h3>

                  <p
                    className="mt-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                    {item.subtitle}
                  </p>
                </div>

                {/* Bottom Accent */}

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                  }}
                  style={{ transformOrigin: "left" }}
                  className=" absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-yellow-300 via-white to-yellow-300"/>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
