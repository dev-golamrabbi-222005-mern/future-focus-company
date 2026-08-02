"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FAQSection() {
  const t = useTranslations("FAQ");
  const glowRef = React.useRef<HTMLDivElement>(null);
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const faqItems = [
    {
      question: t("items.0.question"),
      answer: t("items.0.answer"),
    },
    {
      question: t("items.1.question"),
      answer: t("items.1.answer"),
    },
    {
      question: t("items.2.question"),
      answer: t("items.2.answer"),
    },
    {
      question: t("items.3.question"),
      answer: t("items.3.answer"),
    },
    {
      question: t("items.4.question"),
      answer: t("items.4.answer"),
    },
    {
      question: t("items.5.question"),
      answer: t("items.5.answer"),
    },
  ];

useGSAP(
  () => {

    gsap.from(".faq-header", {
      y: 50,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top 80%",
      },
    });

    gsap.from(".faq-card", {
        opacity: 0,
        y: 60,
        duration: .8,
        stagger: .15,
        clearProps: "all",
        ease: "power3.out",
        scrollTrigger:{
            trigger: sectionRef.current,
            start:"top 80%"
        }
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
          duration: 0.6,
          ease: "power2.out",
        });

      };

      section.addEventListener("mousemove", move);
      return () => {
        section.removeEventListener("mousemove", move);
      };
    }

  },
  { scope: sectionRef }
);
  return (
    <section
      ref={sectionRef}
      className="relative overflow-visible py-24 lg:py-32 bg-background"
    >
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <div className="absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5">
        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{
    once: true,
    amount: 0.3,
  }}
  transition={{
    duration: 0.8,
    ease: "easeOut",
  }}
  className="mb-20 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-5 py-2">
            <span className="h-2 w-2 rounded-full bg-primary" />

            <span className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
              {t("tag")}
            </span>
          </div>

          <h2 className="text-4xl font-black text-foreground md:text-5xl lg:text-6xl">
            {t("title")}
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-muted-foreground">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="space-y-5">
          {faqItems.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={index}
                whileHover={{scale: 1.01, }}
                transition={{ duration: 0.25 }}
                className={`faq-card overflow-hidden rounded-2xl border transition-all duration-500

        ${
          isOpen
            ? "border-primary/40 bg-primary/5 shadow-xl"
            : "border-border bg-card hover:border-primary/30 hover:shadow-lg"
        }`}
              >
                {/* Header */}

                <button
                  onClick={() => setActiveIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between px-7 py-6 text-left transition-all"
                >
                  <h3 className="pr-6 text-lg font-bold text-foreground md:text-xl">
                    {item.question}
                  </h3>

                  <motion.div
                    animate={{
                      rotate: isOpen ? 180 : 0,
                      scale: isOpen ? 1.1 : 1,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border

            ${
              isOpen
                ? "border-primary bg-primary text-white"
                : "border-border bg-background text-primary"
            }`}
                  >
                    <AnimatePresence mode="wait">
                      {isOpen ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                        >
                          <X size={20} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="open"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                        >
                          <Plus size={20} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </button>

                {/* Answer */}

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.45,
                      }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        exit={{ y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-border px-7 py-6"
                      >
                        <p className="leading-8 text-muted-foreground">
                          {item.answer}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
