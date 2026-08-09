"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HelpCircle,
  ChevronDown,
  MessageSquare,
  Headset,
  ArrowRight,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FAQ() {
  const t = useTranslations("FAQSystem");
  const params = useParams();
  const locale = (params.locale as string) || "en";

  const containerRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);

  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // 5 Most Demanded FAQs for Homepage
  const faqItems = [
    { key: "item1" },
    { key: "item2" },
    { key: "item6" },
    { key: "item8" },
    { key: "item14" },
  ];

  useGSAP(
    () => {
      if (!containerRef.current) return;

      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
          },
        );
      }

      const items = containerRef.current.querySelectorAll(".faq-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current.querySelector(".faq-list"),
            start: "top 80%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 bg-background relative overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-[350px] h-[350px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <div className="mb-4 inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <HelpCircle className="w-3.5 h-3.5 shrink-0 text-primary" />
            <span>{t("tagline")}</span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4 text-center">
            {t("heading")}
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("subheading")}
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4 faq-list">
          {faqItems.map((item, idx) => {
            const question = t(`items.${item.key}.question`);
            const answer = t(`items.${item.key}.answer`);
            const isOpen = openIndex === idx;

            return (
              <div
                key={item.key}
                className={`faq-item border rounded-2xl transition-all duration-300 overflow-hidden shadow-sm ${
                  isOpen
                    ? "border-primary/50 bg-card shadow-md ring-1 ring-primary/20"
                    : "border-border bg-card/60 hover:border-primary/30 hover:bg-card"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors pr-4 rtl:pr-0 rtl:pl-4">
                    {question}
                  </span>

                  <span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isOpen
                        ? "bg-primary text-primary-foreground border-primary rotate-180"
                        : "bg-muted/80 text-muted-foreground border-border group-hover:border-primary/40 group-hover:text-foreground"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pt-1 pb-6 px-6 sm:px-8 text-muted-foreground text-sm sm:text-base leading-relaxed border-t border-border/40 mt-1">
                      {answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All FAQs Button */}
        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/faq`}
            className="inline-flex items-center space-x-2 rtl:space-x-reverse font-bold text-primary border border-primary/30 bg-primary/5 px-6 py-3 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm"
          >
            <span>{t("seeMoreFaqs")}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
