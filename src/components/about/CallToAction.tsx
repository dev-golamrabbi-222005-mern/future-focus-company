"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CallToAction() {
  const t = useTranslations("CallToAction");

  const sectionRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.from(".cta-reveal", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-24 lg:py-32"
    >
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.03),transparent_65%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,.02),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-5xl px-6 text-center">
        {/* Small Tag */}

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="cta-reveal mb-6 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-5 py-2"
        >
          <span className="h-2 w-2 rounded-full bg-primary" />

          <span className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
            {t("tag")}
          </span>
        </motion.div>

        {/* Title */}

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{
    once: true,
    amount: 0.4,
  }}
  transition={{
    duration: 0.8,
    ease: "easeOut",
  }}
  className="text-4xl font-black leading-tight md:text-6xl lg:text-7xl"
        >
          <span className="mx-auto max-w-5xl text-4xl font-black leading-tight text-foreground md:text-6xl">
            {t("title1")}
          </span>

          <span className="mt-2 block bg-gradient-to-r from-primary via-yellow-500 to-primary bg-clip-text text-transparent">
            {t("title2")}
          </span>
        </motion.h2>

        {/* Divider */}

        <div className="cta-reveal mx-auto mt-8 h-[3px] w-24 rounded-full bg-primary" />

        {/* Description */}

        <p className="cta-reveal mx-auto mt-8 max-w-3xl text-lg leading-9 text-muted-foreground">
          {t("description")}
        </p>

        {/* Buttons */}

        <div className="cta-reveal mt-14 flex flex-col justify-center gap-5 sm:flex-row">
          {/* Quote Button */}

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:shadow-2xl"
            >
              {t("quoteButton")}

              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>

          {/* WhatsApp */}

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="https://wa.me/966500000000"
              target="_blank"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-green-500 px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-green-600 hover:shadow-2xl"
            >
              <MessageCircle className="h-5 w-5" />

              {t("whatsappButton")}
            </Link>
          </motion.div>
        </div>

        {/* Bottom Trust Bar */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className="cta-reveal mt-20"
        >
          <div className="flex items-center justify-center gap-5">
            <div className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-primary/20 md:block" />

            <div className="flex flex-wrap items-center justify-center gap-4 text-center">
              <span className="h-3 w-3 rotate-45 bg-primary/80" />

              <span className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
                {t("government")}
              </span>

              <span className="text-primary">•</span>

              <span className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
                {t("experience")}
              </span>

              <span className="text-primary">•</span>

              <span className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
                {t("workers")}
              </span>

              <span className="h-3 w-3 rotate-45 bg-primary/80" />
            </div>

            <div className="hidden h-px flex-1 bg-gradient-to-l from-transparent via-primary/40 to-primary/20 md:block" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
