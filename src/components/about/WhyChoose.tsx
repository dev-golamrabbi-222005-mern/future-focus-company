"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

import { motion } from "framer-motion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import {
  Clock3,
  SearchCheck,
  BadgeDollarSign,
  FileCheck2,
  Handshake,
  ShieldCheck,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Feature = {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
};

export default function WhyChoose() {
  const t = useTranslations("WhyChoose");

  const sectionRef = React.useRef<HTMLDivElement>(null);

  const cardsRef = React.useRef<(HTMLDivElement | null)[]>([]);

  const features: Feature[] = [
    {
      number: "01",
      title: t("feature1.title"),
      description: t("feature1.description"),
      icon: Clock3,
    },
    {
      number: "02",
      title: t("feature2.title"),
      description: t("feature2.description"),
      icon: SearchCheck,
    },
    {
      number: "03",
      title: t("feature3.title"),
      description: t("feature3.description"),
      icon: BadgeDollarSign,
    },
    {
      number: "04",
      title: t("feature4.title"),
      description: t("feature4.description"),
      icon: FileCheck2,
    },
    {
      number: "05",
      title: t("feature5.title"),
      description: t("feature5.description"),
      icon: Handshake,
    },
    {
      number: "06",
      title: t("feature6.title"),
      description: t("feature6.description"),
      icon: ShieldCheck,
    },
  ];

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.from(".why-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.from(card, {
          opacity: 0,
          y: 80,
          duration: 0.8,
          delay: index * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 lg:py-32 bg-background"
    >
      {/* Background */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,.06),transparent_45%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.03]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-5 py-2">
            <span className="h-2 w-2 rounded-full bg-primary" />

            <span className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
              {t("tag")}
            </span>
          </div>

          <h2 className="mx-auto max-w-5xl text-4xl font-black leading-tight text-foreground md:text-6xl">
            {t("title")}
          </h2>

          <div className="mx-auto mt-6 h-[3px] w-24 rounded-full bg-primary" />

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-muted-foreground">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Cards */}

        <div className="space-y-5">
          {/* Part-2 */}
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.number}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -5,
                }}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-primary/40 hover:shadow-2xl"
              >
                <div className="grid lg:grid-cols-12">
                  {/* Number */}

                  <div className="flex items-center justify-center bg-primary text-primary-foreground lg:col-span-1 py-8 lg:py-0">
                    <motion.span
                      whileHover={{
                        scale: 1.15,
                        rotate: -5,
                      }}
                      className="text-3xl font-black tracking-wider"
                    >
                      {feature.number}
                    </motion.span>
                  </div>

                  {/* Title */}

                  <div className="flex items-center border-y lg:border-y-0 lg:border-x border-border px-8 py-8 lg:col-span-5">
                    <motion.div
                      whileHover={{
                        rotate: 360,
                        scale: 1.15,
                      }}
                      transition={{
                        duration: 0.6,
                      }}
                      className="mr-5 rounded-2xl bg-primary/10 p-4 text-primary"
                    >
                      <Icon className="h-7 w-7" />
                    </motion.div>

                    <div>
                      <h3 className="text-2xl font-bold tracking-wide text-foreground uppercase">
                        {feature.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}

                  <div className="flex items-center px-8 py-8 lg:col-span-6">
                    <p className="leading-8 text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Hover Line */}

                <div className="h-[3px] w-0 bg-primary transition-all duration-700 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
