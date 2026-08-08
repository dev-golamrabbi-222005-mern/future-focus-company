"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, ArrowRight } from "lucide-react";

export default function FAQSection() {
  const t = useTranslations("FAQSystem");
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const [activeIndex, setActiveIndex] = React.useState<number | null>(0);

  // 5 Process/Contact FAQs
  const items = [
    { key: "item6" },
    { key: "item7" },
    { key: "item9" },
    { key: "item10" },
    { key: "item20" },
  ];

  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-background overflow-hidden">
      {/* Background Accent Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 md:mb-16 text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            <HelpCircle className="w-3.5 h-3.5 shrink-0 text-primary" />
            <span>{t("tagline")}</span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight text-center">
            {t("heading")}
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("subheading")}
          </p>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {items.map((item, index) => {
            const question = t(`items.${item.key}.question`);
            const answer = t(`items.${item.key}.answer`);
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 shadow-sm ${
                  isOpen
                    ? "border-primary/50 bg-card ring-1 ring-primary/20 shadow-md"
                    : "border-border bg-card/70 hover:border-primary/30 hover:bg-card"
                }`}
              >
                {/* Accordion Question Button */}
                <button
                  type="button"
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-6 py-5 sm:px-8 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors pr-4 rtl:pr-0 rtl:pl-4">
                    {question}
                  </span>

                  <span
                    className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isOpen
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted/80 text-muted-foreground border-border group-hover:border-primary/40 group-hover:text-foreground"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {/* Animated Dropdown Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border/50 px-6 py-5 sm:px-8 text-sm sm:text-base text-muted-foreground leading-relaxed bg-muted/20">
                        {answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* View All FAQs Outline Button */}
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
