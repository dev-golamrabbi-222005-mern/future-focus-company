'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  Search,
  ChevronDown,
  Plus,
  Minus,
  Briefcase,
  ShieldCheck,
  Users,
  Layers,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';

export function FAQClient() {
  const t = useTranslations('FAQSystem');
  const params = useParams();
  const locale = (params.locale as string) || 'en';

  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const categories = [
    { id: 'all', label: t('categories.all'), icon: HelpCircle },
    { id: 'employers', label: t('categories.employers'), icon: Briefcase },
    { id: 'candidates', label: t('categories.candidates'), icon: Users },
    { id: 'compliance', label: t('categories.compliance'), icon: ShieldCheck },
    { id: 'deployment', label: t('categories.deployment'), icon: Layers },
  ];

  const faqItems = [
    {
      category: 'employers',
      question: t('q1.question'),
      answer: t('q1.answer'),
      details: t('q1.details'),
    },
    {
      category: 'employers',
      question: t('q2.question'),
      answer: t('q2.answer'),
      details: t('q2.details'),
    },
    {
      category: 'employers',
      question: t('q3.question'),
      answer: t('q3.answer'),
      details: t('q3.details'),
    },
    {
      category: 'employers',
      question: t('q4.question'),
      answer: t('q4.answer'),
      details: t('q4.details'),
    },
    {
      category: 'compliance',
      question: t('q5.question'),
      answer: t('q5.answer'),
      details: t('q5.details'),
    },
    {
      category: 'compliance',
      question: t('q6.question'),
      answer: t('q6.answer'),
      details: t('q6.details'),
    },
    {
      category: 'candidates',
      question: t('q7.question'),
      answer: t('q7.answer'),
      details: t('q7.details'),
    },
    {
      category: 'candidates',
      question: t('q8.question'),
      answer: t('q8.answer'),
      details: t('q8.details'),
    },
    {
      category: 'candidates',
      question: t('q9.question'),
      answer: t('q9.answer'),
      details: t('q9.details'),
    },
    {
      category: 'deployment',
      question: t('q10.question'),
      answer: t('q10.answer'),
      details: t('q10.details'),
    },
    {
      category: 'deployment',
      question: t('q11.question'),
      answer: t('q11.answer'),
      details: t('q11.details'),
    },
    {
      category: 'employers',
      question: t('q12.question'),
      answer: t('q12.answer'),
      details: t('q12.details'),
    },
    {
      category: 'compliance',
      question: t('q13.question'),
      answer: t('q13.answer'),
      details: t('q13.details'),
    },
    {
      category: 'deployment',
      question: t('q14.question'),
      answer: t('q14.answer'),
      details: t('q14.details'),
    },
    {
      category: 'candidates',
      question: t('q15.question'),
      answer: t('q15.answer'),
      details: t('q15.details'),
    },
    {
      category: 'employers',
      question: t('q16.question'),
      answer: t('q16.answer'),
      details: t('q16.details'),
    },
    {
      category: 'compliance',
      question: t('q17.question'),
      answer: t('q17.answer'),
      details: t('q17.details'),
    },
    {
      category: 'deployment',
      question: t('q18.question'),
      answer: t('q18.answer'),
      details: t('q18.details'),
    },
    {
      category: 'candidates',
      question: t('q19.question'),
      answer: t('q19.answer'),
      details: t('q19.details'),
    },
    {
      category: 'employers',
      question: t('q20.question'),
      answer: t('q20.answer'),
      details: t('q20.details'),
    },
  ];

  const filteredFaqs = faqItems.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background pt-6 md:pt-8 lg:pt-10 pb-6 md:pb-8 lg:pb-10 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/10 via-background/60 to-background pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            <HelpCircle className="w-3.5 h-3.5 shrink-0 text-primary" />
            <span>{t('badge')}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight text-center">
            {t('heroTitle')}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t('heroSubtitle')}
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl mx-auto pt-4">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-12 pr-4 py-3.5 bg-card/80 backdrop-blur-md border border-border/80 rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all text-sm sm:text-base shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setOpenIndex(null);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm ${
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-primary/20'
                    : 'bg-card border border-border hover:bg-muted text-foreground/80'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-card border border-border/80 rounded-2xl overflow-hidden shadow-sm hover:border-border transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-bold text-base sm:text-lg text-foreground pr-2">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'bg-primary text-primary-foreground rotate-180'
                          : 'bg-muted text-foreground/70'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-border/40 text-muted-foreground text-sm sm:text-base leading-relaxed space-y-3">
                          <p className="pt-3 font-medium text-foreground/90">
                            {faq.answer}
                          </p>
                          <div className="p-4 rounded-xl bg-muted/40 border border-border/60 text-xs sm:text-sm">
                            <span className="font-semibold text-primary block mb-1">
                              • Details:
                            </span>
                            {faq.details}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-card border border-border rounded-3xl p-8 space-y-3">
              <p className="text-lg font-bold text-foreground">
                No matching questions found
              </p>
              <p className="text-sm text-muted-foreground">
                Try searching with different keywords or switch categories.
              </p>
            </div>
          )}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 max-w-4xl mx-auto p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-primary/10 via-card to-card border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center sm:text-start">
            <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
              {t('ctaHeading')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('ctaSubheading')}
            </p>
          </div>

          <Link
            href={`/${locale}/contact#get-in-touch`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-md shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t('ctaButton')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
