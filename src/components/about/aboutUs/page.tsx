"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";




import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Users,
  ShieldCheck,
} from "lucide-react";

const MotionImage = motion(Image);

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutCompany() {
  const t = useTranslations("AboutCompany");

  const sectionRef = React.useRef<HTMLDivElement>(null);

  const imageRef = React.useRef<HTMLDivElement>(null);

  const textRef = React.useRef<HTMLDivElement>(null);

  const stats = [
    {
      icon: Building2,
      value: "15+",
      title: t("experience"),
    },
    {
      icon: Users,
      value: "10K+",
      title: t("workers"),
    },
    {
      icon: BriefcaseBusiness,
      value: "500+",
      title: t("clients"),
    },
    {
      icon: ShieldCheck,
      value: "24/7",
      title: t("support"),
    },
  ];

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.from(textRef.current, {
        opacity: 0,
        x: -80,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-24 lg:py-32"
    >
      {/* Background */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,.08),transparent_40%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.04]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* ================= LEFT ================= */}

          <div ref={textRef} className="space-y-8">
            {/* Label */}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <span className="h-[2px] w-12 rounded-full bg-primary" />

              <span className="uppercase tracking-[0.35em] text-xs font-bold text-primary">
                {t("tag")}
              </span>
            </motion.div>

            {/* Heading */}

            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05] text-foreground"
            >
              {t("title1")}

              <span className="block text-primary">{t("title2")}</span>
            </motion.h2>

            {/* Sub Title */}

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-2xl text-lg leading-9 text-muted-foreground"
            >
              {t("description")}
            </motion.p>

            {/* Buttons */}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col gap-5 sm:flex-row"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 font-bold text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                {t("book")}

                <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-8 py-4 font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
              >
                {t("services")}
              </Link>
            </motion.div>

            {/* Stats */}

            <div className="grid grid-cols-2 gap-5 pt-10 lg:grid-cols-4">
              {stats.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={index}
                    whileHover={{
                      y: -8,
                      scale: 1.03,
                    }}
                    className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all"
                  >
                    <Icon className="mb-4 h-8 w-8 text-primary" />

                    <h3 className="text-3xl font-black text-foreground">
                      {item.value}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.title}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ================= RIGHT ================= */}

          <div
            ref={imageRef}
            className="relative flex justify-center lg:justify-end"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="relative w-full max-w-[560px]"
            >
              {/* Background Decoration */}

              <div className="absolute -top-6 -left-6 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

              <div className="absolute -bottom-10 -right-8 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

              {/* Border */}

              <div className="absolute -right-5 top-5 h-full w-full rounded-[32px] border-2 border-primary/20" />

              {/* Image */}

              <div className="group relative overflow-hidden rounded-[32px] border border-border bg-card shadow-2xl">
                {/* <Image
                  src="/images/about/we-are-photo.png"
                  alt="Future Focus Company"
                  width={700}
                  height={900}
                  priority
                  className="h-[700px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                /> */}
                <MotionImage
                    src="/images/about/we-are-photo.png"
                    alt="Future Focus Company"
                    width={700}
                    height={900}
                    priority
                    animate={{
                        scale: [1, 1.08, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="h-[700px] w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Bottom Caption */}

                <div className="absolute bottom-8 left-8 right-8">
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md"
                  >
                    <h3 className="text-2xl font-bold text-white">
                      {t("companyName")}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-white/80">
                      {t("companyShort")}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Experience Badge */}

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                animate={{
                  y: [0, -8, 0],
                }}
                className="absolute -left-8 top-16"
              >
                <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border-[6px] border-background bg-primary text-primary-foreground shadow-2xl">
                  <h2 className="text-4xl font-black">15+</h2>

                  <p className="mt-1 text-center text-xs uppercase tracking-[0.2em]">
                    {t("experience")}
                  </p>
                </div>
              </motion.div>

              {/* Government Badge */}

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                }}
                className="absolute -bottom-10 right-6"
              >
                <div className="rounded-2xl border border-border bg-card/95 px-6 py-5 shadow-xl backdrop-blur-lg">
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-primary p-3">
                      <ShieldCheck className="h-8 w-8 text-primary-foreground" />
                    </div>

                    <div>
                      <p className="text-lg font-bold text-foreground">
                        {t("approved")}
                      </p>

                      <p className="text-sm text-muted-foreground">RL-1428</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
