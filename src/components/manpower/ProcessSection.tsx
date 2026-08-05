"use client";

import * as React from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  Search,
  Lightbulb,
  Users,
  ShieldCheck,
  FileText,
  Plane,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProcessSection() {
  const t = useTranslations("Process");
  const locale = useLocale();

  const formatStepNum = (n: number) =>
    n.toLocaleString(locale === 'bn' ? 'bn-BD' : locale === 'ar' ? 'ar-SA' : 'en-US', { minimumIntegerDigits: 2 });

  const sectionRef = React.useRef<HTMLDivElement>(null);
  const glowRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.from(".process-card", {
        opacity: 0,
        y: 80,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
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

        return () => {
          section.removeEventListener("mousemove", move);
        };
      }
    },
    { scope: sectionRef },
  );

  const process = [
    {
      number: formatStepNum(1),
      title: t("steps.0.title"),
      description: t("steps.0.description"),
      icon: Search,
    },
    {
      number: formatStepNum(2),
      title: t("steps.1.title"),
      description: t("steps.1.description"),
      icon: Lightbulb,
    },
    {
      number: formatStepNum(3),
      title: t("steps.2.title"),
      description: t("steps.2.description"),
      icon: Users,
    },
    {
      number: formatStepNum(4),
      title: t("steps.3.title"),
      description: t("steps.3.description"),
      icon: ShieldCheck,
    },
    {
      number: formatStepNum(5),
      title: t("steps.4.title"),
      description: t("steps.4.description"),
      icon: FileText,
    },
    {
      number: formatStepNum(6),
      title: t("steps.5.title"),
      description: t("steps.5.description"),
      icon: Plane,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-24 lg:py-32"
    >
      {/* Mouse Glow */}

      <div className="absolute inset-0 -z-10">
        <div
          ref={glowRef}
          className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]"
        />

        <motion.div
          animate={{
            x: [0, 90, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/5 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -70, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-primary/5 blur-[140px]"
        />
      </div>

      {/* Animated Grid */}

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-24 max-w-4xl text-center">
          {/* Tag */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-6 py-2 backdrop-blur-xl"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />

            <span className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
              {t("tag")}
            </span>
          </motion.div>

          {/* Heading */}

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="text-4xl font-black leading-tight text-foreground md:text-6xl lg:text-7xl"
          >
            {t("title1")}

            <span className="mt-3 block bg-gradient-to-r from-primary via-cyan-500 to-primary bg-clip-text text-transparent">
              {t("title2")}
            </span>
          </motion.h2>

          {/* Subtitle */}

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-muted-foreground md:text-xl"
          >
            {t("subtitle")}
          </motion.p>

          {/* Animated Divider */}

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 140 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.4,
            }}
            className="mx-auto mt-10 h-1 rounded-full bg-gradient-to-r from-primary via-cyan-500 to-primary"
          />

          {/* Small Description */}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.6,
              duration: 0.8,
            }}
            className="mx-auto mt-8 max-w-2xl text-base leading-8 text-muted-foreground"
          >
            {t("description")}
          </motion.p>
        </div>

        <div className="relative">
          {/* Desktop Timeline Line */}

          <div className="absolute left-1/2 top-10 hidden h-[90%] w-[3px] -translate-x-1/2 rounded-full bg-border lg:block">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
              className="w-full rounded-full bg-gradient-to-b from-primary via-cyan-500 to-primary"
            />
          </div>

          <div className="space-y-12">
            {process.map((item, index) => {
              const Icon = item.icon;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className="relative grid items-center gap-8 lg:grid-cols-[1fr_80px_1fr]"
                >
                  {/* Left Side */}
                  {isLeft ? (
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: isLeft ? -80 : 80,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.3,
                      }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.12,
                      }}
                      whileHover={{
                        y: -8,
                        scale: 1.02,
                      }}
                      className=" process-card group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-xl transition-all duration-500 hover:border-primary/30 hover:shadow-2xl "
                    >
                      {/* Glow */}

                      <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-primary/10 blur-3xl transition-all duration-700 group-hover:scale-150" />

                      {/* Number */}

                      <div className="mb-6 flex items-center justify-between">
                        <span className="text-5xl font-black text-primary/20">
                          {item.number}
                        </span>

                        <motion.div
                          whileHover={{
                            rotate: 360,
                            scale: 1.1,
                          }}
                          transition={{
                            duration: 0.8,
                          }}
                          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"
                        >
                          <Icon className="h-8 w-8" />
                        </motion.div>
                      </div>

                      {/* Title */}

                      <h3 className="text-3xl font-black text-foreground">
                        {item.title}
                      </h3>

                      {/* Description */}

                      <p className="mt-5 leading-8 text-muted-foreground">
                        {item.description}
                      </p>

                      {/* Bottom Border */}

                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: index * 0.15,
                        }}
                        style={{
                          transformOrigin: "left",
                        }}
                        className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary via-cyan-500 to-primary"
                      />
                    </motion.div>
                  ) : (
                    <div />
                  )}

                  {/* Timeline Dot */}
                  <div className="hidden lg:flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-primary shadow-xl">
                      <span className="h-4 w-4 rounded-full bg-primary-foreground" />
                    </div>
                  </div>

                  {/* Right Side */}
                  {!isLeft ? (
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: isLeft ? -80 : 80,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.3,
                      }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.12,
                      }}
                      whileHover={{
                        y: -8,
                        scale: 1.02,
                      }}
                      className=" process-card group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-xl transition-all duration-500 hover:border-primary/30 hover:shadow-2xl "
                    >
                      {/* Glow */}

                      <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-primary/10 blur-3xl transition-all duration-700 group-hover:scale-150" />

                      {/* Number */}

                      <div className="mb-6 flex items-center justify-between">
                        <span className="text-5xl font-black text-primary/20">
                          {item.number}
                        </span>

                        <motion.div
                          whileHover={{
                            rotate: 360,
                            scale: 1.1,
                          }}
                          transition={{
                            duration: 0.8,
                          }}
                          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"
                        >
                          <Icon className="h-8 w-8" />
                        </motion.div>
                      </div>

                      {/* Title */}

                      <h3 className="text-3xl font-black text-foreground">
                        {item.title}
                      </h3>

                      {/* Description */}

                      <p className="mt-5 leading-8 text-muted-foreground">
                        {item.description}
                      </p>

                      {/* Bottom Border */}

                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: index * 0.15,
                        }}
                        style={{
                          transformOrigin: "left",
                        }}
                        className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary via-cyan-500 to-primary"
                      />
                    </motion.div>
                  ) : (
                    <div />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
