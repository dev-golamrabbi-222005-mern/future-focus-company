"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Wrench, Cog, Hammer } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhatIsManpower() {
  const t = useTranslations("WhatIsManpower");

  const sectionRef = React.useRef<HTMLDivElement>(null);
  const glowRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Left Content
      gsap.from(".wm-left", {
        opacity: 0,
        x: -70,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
     
      const section = sectionRef.current;
      const glow = glowRef.current;

      if (section && glow) {
        const move = (e: MouseEvent) => {
          const rect = section.getBoundingClientRect();

          const x = (e.clientX - rect.left - rect.width / 2) / 18;
          const y = (e.clientY - rect.top - rect.height / 2) / 18;

          gsap.to(glow, {
            x,
            y,
            duration: 0.8,
            ease: "power3.out",
          });
        };

        section.addEventListener("mousemove", move);

        return () => section.removeEventListener("mousemove", move);
      }
    },
    { scope: sectionRef },
  );

  const services = [
    {
      icon: Wrench,
      title: t("cards.0.title"),
      jobs: t("cards.0.jobs"),
      description: t("cards.0.description"),
    },
    {
      icon: Cog,
      title: t("cards.1.title"),
      jobs: t("cards.1.jobs"),
      description: t("cards.1.description"),
    },
    {
      icon: Hammer,
      title: t("cards.2.title"),
      jobs: t("cards.2.jobs"),
      description: t("cards.2.description"),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-24 lg:py-32"
    >
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-primary/5 blur-[120px]" />

        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-primary/5 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-20 lg:grid-cols-2 lg:items-start">
          {/* ===========================
                LEFT SIDE
            =========================== */}

          <div className="wm-left">
            {/* Tag */}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-5 py-2"
            >
              <span className="h-2 w-2 rounded-full bg-primary" />

              <span className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
                {t("tag")}
              </span>
            </motion.div>

            {/* Title */}

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl text-4xl font-black leading-tight text-foreground md:text-5xl lg:text-6xl"
            >
              {t("title")}
            </motion.h2>

            {/* Subtitle */}

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 max-w-3xl text-xl italic leading-10 text-primary/80"
            >
              {t("subtitle")}
            </motion.p>

            {/* Divider */}

            <div className="mt-8 h-[3px] w-24 rounded-full bg-primary" />

            {/* Description */}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10 space-y-8"
            >
              <p className="text-lg leading-9 text-muted-foreground">
                {t("description1")}
              </p>

              <p className="text-lg leading-9 text-muted-foreground">
                {t("description2")}
              </p>
            </motion.div>

            {/* Quote Card */}

            <motion.div
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              transition={{
                duration: 0.3,
              }}
              className="group relative mt-14 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary via-primary/95 to-emerald-900 p-10 shadow-2xl"
            >
              {/* Glow */}

              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-3xl transition-all duration-700 group-hover:scale-125" />

              {/* Left Border */}

              <div className="absolute left-0 top-0 h-full w-1.5 bg-yellow-400" />

              <p className="text-xs font-bold uppercase tracking-[0.35em] text-yellow-300">
                {t("quoteTitle")}
              </p>

              <blockquote className="mt-6 text-xl italic leading-10 text-white">
                {t("quote")}
              </blockquote>
            </motion.div>
          </div>

          {/* ===========================
              RIGHT SIDE
          =========================== */}

          <div className="space-y-6">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                  }}
                  transition={{ duration: 0.3 }}
                  className=" wm-card group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-lg transition-all duration-500 hover:border-primary/40 hover:shadow-2xl">
                  {/* Hover Glow */}

                  <div
                    className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary/10 blur-3xl transition-all duration-700 group-hover:scale-150"/>

                  <div className="relative flex gap-6">
                    {/* Icon */}

                    <motion.div
                      whileHover={{
                        rotate: 15,
                        scale: 1.1,
                      }}
                      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon size={34} />
                    </motion.div>

                    {/* Content */}

                    <div className="flex-1">
                      <h3
                        className="text-2xl font-bold uppercase tracking-wide text-foreground">
                        {service.title}
                      </h3>

                      <p
                        className="mt-3 text-sm font-semibold leading-7 text-primary">
                        {service.jobs}
                      </p>

                      <p
                        className="mt-5 text-base leading-8 text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Accent Line */}

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: index * 0.2,
                    }}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-yellow-400 to-primary"/>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
