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

export default function FAQPage() {
  const t = useTranslations('FAQSystem');
  const params = useParams();
  const locale = (params.locale as string) || 'en';

  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  // All 20 FAQ items
  const allItems = Array.from({ length: 20 }, (_, i) => ({
    key: `item${i + 1}`,
    id: i + 1,
    question: t(`items.item${i + 1}.question`),
    answer: t(`items.item${i + 1}.answer`),
    category: t(`items.item${i + 1}.category`),
  }));

  const categories = [
    { key: 'all', label: t('allCategories'), icon: Layers },
    { key: 'catEmployersServices', label: t('catEmployersServices'), icon: Briefcase },
    { key: 'catEmployersProcess', label: t('catEmployersProcess'), icon: ShieldCheck },
    { key: 'catCandidates', label: t('catCandidates'), icon: Users },
  ];

  // Filter items based on category and search query
  const filteredItems = allItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 md:pb-24">
      {/* Background Accent Elements */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/10 via-background/50 to-background pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Page Hero */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            <HelpCircle className="w-3.5 h-3.5 shrink-0 text-primary" />
            <span>{t('tagline')}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight text-center">
            {t('heading')}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t('subheading')}
          </p>

          {/* Interactive Search Bar */}
          <div className="pt-4 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-12 rtl:pl-4 rtl:pr-12 pr-4 py-4 rounded-2xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground shadow-sm transition-all text-sm sm:text-base"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 rtl:right-auto rtl:left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground hover:text-foreground bg-muted px-2 py-1 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.key;

            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.key);
                  setOpenIndex(0);
                }}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md scale-105'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4 min-h-[300px]">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 shadow-sm ${
                    isOpen
                      ? 'border-primary/50 bg-card ring-1 ring-primary/20 shadow-md'
                      : 'border-border bg-card/70 hover:border-primary/30 hover:bg-card'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between px-6 py-5 sm:px-8 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl cursor-pointer group"
                  >
                    <span className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors pr-4 rtl:pr-0 rtl:pl-4">
                      {item.question}
                    </span>

                    <span
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isOpen
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-muted/80 text-muted-foreground border-border group-hover:border-primary/40 group-hover:text-foreground'
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border/50 px-6 py-5 sm:px-8 text-sm sm:text-base text-muted-foreground leading-relaxed bg-muted/20">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-card border border-border rounded-3xl p-8 space-y-4">
              <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
              <p className="text-muted-foreground font-medium">
                {t('noResults')}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 md:mt-24 max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border border-primary/20 p-8 sm:p-10 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Still Have Questions or Specific Manpower Requirements?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Our experienced HR advisors in Dhaka and Riyadh are ready to assist you with custom workforce proposals, visa SLAs, and recruitment quotes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href={`/${locale}/contact#get-in-touch`}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rtl:space-x-reverse bg-primary text-primary-foreground font-bold px-8 py-3.5 rounded-xl shadow-lg hover:bg-primary/90 transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact HR Advisor</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
