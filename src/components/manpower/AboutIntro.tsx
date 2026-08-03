"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutIntro() {
  const t = useTranslations("AboutIntro");

  const sectionRef = React.useRef<HTMLDivElement>(null);
  const imageGroupRef = React.useRef<HTMLDivElement>(null);
  const glowRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      // Floating Images Animation
      gsap.from(".floating-image", {
        opacity: 0,
        scale: 0.9,
        y: 50,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageGroupRef.current,
          start: "top 85%",
        },
      });

      // Mouse Parallax
      const wrapper = imageGroupRef.current;

      if (wrapper) {
        const move = (e: MouseEvent) => {
          const rect = wrapper.getBoundingClientRect();

          const x = (e.clientX - rect.left - rect.width / 2) / 35;

          const y = (e.clientY - rect.top - rect.height / 2) / 35;

          gsap.utils
            .toArray<HTMLElement>(".parallax-item")
            .forEach((item, index) => {
              gsap.to(item, {
                x: x * (index + 1) * 0.25,
                y: y * (index + 1) * 0.25,
                duration: 0.8,
                ease: "power3.out",
              });
            });
        };

        wrapper.addEventListener("mousemove", move);

        return () => {
          wrapper.removeEventListener("mousemove", move);
        };
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
        className="relative overflow-hidden bg-background py-24 lg:py-32">
      {/* Animated Grid Background */}

      <motion.div
        animate={{
          backgroundPosition: ["0px 0px", "48px 48px"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.10) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.10) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Floating Glow */}

      <motion.div
        animate={{
          x: [0, 70, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-primary/10 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[-120px] bottom-20 h-80 w-80 rounded-full bg-yellow-400/10 blur-[140px]"
      />

      {/* Main Container */}

      <div className="relative z-10 mx-auto grid max-w-[1450px] grid-cols-1 items-center gap-20 px-6 lg:grid-cols-2">
        {/* ================= LEFT CONTENT ================= */}

        <div className="relative z-10">
          {/* Small Tag */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="intro-reveal mb-8 flex items-center gap-4"
          >
            <div className="h-[2px] w-10 bg-primary" />

            <span className="text-xs font-semibold uppercase tracking-[0.45em] text-primary/80">
              {t("tag")}
            </span>
          </motion.div>

          {/* Heading */}

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-3xl font-serif text-4xl font-bold uppercase leading-[0.95] text-foreground md:text-6xl xl:text-7xl">
            <span className="block">{t("title1")}</span>

            <span className="block">{t("title2")}</span>

            <span className="mt-2 block text-primary">{t("title3")}</span>
          </motion.h1>

          {/* Subtitle */}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="intro-reveal mt-10 max-w-2xl text-2xl italic leading-relaxed text-primary/80"
          >
            {t("subtitle")}
          </motion.p>

          {/* Description */}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="intro-reveal mt-10 max-w-2xl text-lg leading-9 text-muted-foreground"
          >
            {t("description")}
          </motion.p>

          {/* Country Switch */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            className="intro-reveal mt-14 inline-flex overflow-hidden rounded-full border border-border bg-card backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 px-8 py-5">
              <span className="text-lg">🇧🇩</span>

              <span className="font-semibold uppercase tracking-[0.2em] text-foreground">
                {t("bangladesh")}
              </span>
            </div>

            <div className="flex items-center justify-center bg-primary px-7">
              <ArrowRight className="h-5 w-5 text-primary-foreground" />
            </div>

            <div className="flex items-center gap-3 px-8 py-5">
              <span className="text-lg">🇸🇦</span>

              <span className="font-semibold uppercase tracking-[0.2em] text-foreground">
                {t("saudi")}
              </span>
            </div>
          </motion.div>

          {/* Buttons */}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="intro-reveal mt-12 flex flex-wrap gap-5"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-primary px-8 py-5 font-bold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:scale-105"
            >
              {t("request")}

              <ArrowRight size={18} />
            </Link>

            <Link
              href="https://wa.me/966500000000"
              target="_blank"
              className="inline-flex items-center gap-3 bg-green-500 px-8 py-5 font-bold uppercase tracking-[0.18em] text-foreground transition-all duration-300 hover:scale-105"
            >
              <MessageCircle size={18} />

              {t("whatsapp")}
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center border border-border px-8 py-5 font-bold uppercase tracking-[0.18em] text-foreground transition-all duration-300 hover:border-primary hover:bg-muted"
            >
              {t("browse")}
            </Link>
          </motion.div>
        </div>

        {/* ================= RIGHT IMAGE SECTION ================= */}

        <div
          ref={imageGroupRef}
          className="relative flex min-h-[760px] items-center justify-center"
        >
          {/* Main Image */}

          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="floating-image parallax-item absolute right-10 top-0 overflow-hidden rounded-none shadow-[0_40px_80px_rgba(0,0,0,.35)]"
          >
            <Image
              src="/images/about/manpower.jpg"
              alt="Future Focus Company"
              width={560}
              height={640}
              priority
              className="h-[620px] w-[540px] object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>

          {/* Secondary Image */}

          {/* <motion.div
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="floating-image parallax-item absolute bottom-0 right-[-30px] overflow-hidden border-8 border-background bg-card shadow-[0_30px_70px_rgba(0,0,0,.35)]"
          >
            <Image
              src="/images/about/about-worker.jpg"
              alt="Saudi Worker"
              width={360}
              height={450}
              className="h-[360px] w-[330px] object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div> */}

          {/* Market Card */}

          <motion.div
            animate={{
              x: [0, 8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="floating-image parallax-item absolute bottom-20 left-0 w-[350px] border border-border bg-card/90 p-8 shadow-2xl backdrop-blur-xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
              {t("market")}
            </p>

            <h3 className="mt-3 font-serif text-4xl font-bold text-foreground">
              {t("country")}
            </h3>

            <div className="mt-3 flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />

              <span className="text-sm">{t("cities")}</span>
            </div>
          </motion.div>

          {/* Experience Badge */}

          <motion.div
            animate={{
              scale: [1, 1.06, 1],
              rotate: [0, 4, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="floating-image absolute right-[-35px] top-16 flex h-36 w-36 items-center justify-center rounded-full bg-primary shadow-[0_0_50px_rgba(255,205,0,.45)]"
          >
            <div className="text-center">
              <h4 className="text-5xl font-black text-primary-foreground">05+</h4>

              <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground">
                {t("experience")}
              </p>
            </div>
          </motion.div>

          {/* Decorative Glow */}

          <div className="absolute bottom-0 right-1/2 -z-10 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[130px]" />
        </div>
      </div>

      {/* Bottom Divider */}

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </section>
  );
}
