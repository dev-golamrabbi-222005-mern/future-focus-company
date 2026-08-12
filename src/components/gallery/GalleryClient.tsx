'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Camera, ArrowRight, Play, X, ChevronLeft, ChevronRight,
  Users, Briefcase, Award, Globe,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SLIDE_IMAGES = [
  'https://i.postimg.cc/k5K41hnC/Hero-1.png',
  'https://i.postimg.cc/g08JSBYY/Hero-2.jpg',
  'https://i.postimg.cc/43VdLFJc/Hero-3.png',
  'https://i.postimg.cc/3wmRSbKv/Hero-4.png',
];

const ITEM_IMAGES = [
  'https://i.postimg.cc/bw6qvjm3/Training.png',
  'https://i.postimg.cc/Y0XdW8Tj/Departure.png',
  'https://i.postimg.cc/PrsJGh7g/Office.png',
  'https://i.postimg.cc/Zn5gpXdX/Training2.png',
  'https://i.postimg.cc/C5xtk9qW/Training3.png',
  'https://i.postimg.cc/qBLKGNqb/Evnt.png',
  'https://i.postimg.cc/Tw9FyTpq/Evnt2.png',
  'https://i.postimg.cc/Y0XdW8Tj/Departure.png',
  'https://i.postimg.cc/2ySJhgZH/Office2.png',
];

const STAT_ICONS = [Users, Briefcase, Award, Globe];

function Lightbox({
  items, activeIdx, onClose, onPrev, onNext,
}: {
  items: { title: string; desc: string; img: string }[];
  activeIdx: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  const item = items[activeIdx];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="relative w-full max-w-4xl rounded-3xl overflow-hidden bg-card border border-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video w-full">
          <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>
        <div className="p-6 space-y-1">
          <h3 className="text-xl font-extrabold text-foreground">{item.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors">
          <X className="h-5 w-5" />
        </button>
        <button onClick={onPrev} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors">
          <ChevronRight className="h-6 w-6" />
        </button>
        <span className="absolute bottom-20 right-6 text-xs text-white/60 font-bold">
          {activeIdx + 1} / {items.length}
        </span>
      </motion.div>
    </motion.div>
  );
}

export function GalleryClient() {
  const t = useTranslations('GalleryPage');
  const locale = useLocale();

  const [heroIdx, setHeroIdx] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setHeroIdx((p) => (p + 1) % SLIDE_IMAGES.length), 5000);
    return () => clearInterval(id);
  }, []);

  const CATEGORIES = ['All', 'Training', 'Departure', 'Office', 'Events'] as const;
  type Cat = typeof CATEGORIES[number];
  const [activeFilter, setActiveFilter] = React.useState<Cat>('All');

  const galleryItems = Array.from({ length: 9 }, (_, idx) => {
    const key = `item${idx + 1}` as const;
    return {
      title: t(`${key}Title`),
      desc: t(`${key}Desc`),
      category: t(`${key}Category`) as Cat,
      img: ITEM_IMAGES[idx] ?? ITEM_IMAGES[0],
    };
  });

  const filtered = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  const [lightboxIdx, setLightboxIdx] = React.useState<number | null>(null);
  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevLightbox = () =>
    setLightboxIdx((p) => (p === null ? 0 : (p - 1 + filtered.length) % filtered.length));
  const nextLightbox = () =>
    setLightboxIdx((p) => (p === null ? 0 : (p + 1) % filtered.length));

  const statsRef = React.useRef<HTMLDivElement>(null);
  const heroRef = React.useRef<HTMLDivElement>(null);
  const filterRef = React.useRef<HTMLDivElement>(null);
  const ctaRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;
    gsap.fromTo(
      heroRef.current.querySelectorAll('.hero-anim'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
    );
  }, { scope: heroRef });

  useGSAP(() => {
    if (!filterRef.current) return;
    gsap.fromTo(
      filterRef.current.querySelectorAll('.filter-anim'),
      { opacity: 0, y: 45 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: filterRef.current, start: 'top 80%' },
      }
    );
  }, { scope: filterRef });

  useGSAP(() => {
    if (!ctaRef.current) return;
    gsap.fromTo(
      ctaRef.current.querySelectorAll('.cta-anim'),
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
      }
    );
  }, { scope: ctaRef });

  useGSAP(() => {
    if (!statsRef.current) return;
    const cards = statsRef.current.querySelectorAll('.stat-num');
    cards.forEach((card) => {
      const target = parseInt(card.getAttribute('data-target') || '0', 10);
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2.4,
        ease: 'power2.out',
        scrollTrigger: { trigger: card, start: 'top 90%' },
        onUpdate: () => {
          card.childNodes[0].textContent = Math.floor(obj.val).toLocaleString(locale === 'bn' ? 'bn-BD' : locale === 'ar' ? 'ar-SA' : 'en-US');
        },
      });
    });
  }, { scope: statsRef });

  const stats = [
    { numKey: 'stat1Num', suffix: t('stat1Suffix'), label: t('stat1Label'), icon: STAT_ICONS[0] },
    { numKey: 'stat2Num', suffix: t('stat2Suffix'), label: t('stat2Label'), icon: STAT_ICONS[1] },
    { numKey: 'stat3Num', suffix: t('stat3Suffix'), label: t('stat3Label'), icon: STAT_ICONS[2] },
    { numKey: 'stat4Num', suffix: t('stat4Suffix'), label: t('stat4Label'), icon: STAT_ICONS[3] },
  ] as const;

  return (
    <>
      <section ref={heroRef} className="relative min-h-[80vh] pt-6 md:pt-8 lg:pt-10 flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIdx}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 0.22, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
              className="w-full h-full"
            >
              <img src={SLIDE_IMAGES[heroIdx]} alt="" className="w-full h-full object-cover" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/15 rounded-full blur-[130px] pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-28 text-center">
          <div className="hero-anim mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              <Camera className="h-3.5 w-3.5" />
              {t('heroTagline')}
            </span>
          </div>

          <h1 className="hero-anim text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
            {t('heroHeading')}{' '}
            <span className="bg-gradient-to-r from-sky-500 via-primary to-cyan-400 bg-clip-text text-transparent">
              {t('heroHeadingHighlight')}
            </span>
          </h1>

          <p className="hero-anim text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            {t('heroSubheading')}
          </p>

          <div className="hero-anim flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <motion.a
              href="#gallery-grid"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all"
            >
              <Play className="h-4 w-4" />
              {t('heroCta')}
            </motion.a>
          </div>

          <div className="hero-anim flex flex-wrap items-center justify-center gap-4">
            {[
              { num: t('heroStat1Num'), label: t('heroStat1Label') },
              { num: t('heroStat2Num'), label: t('heroStat2Label') },
              { num: t('heroStat3Num'), label: t('heroStat3Label') },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card/70 backdrop-blur-sm shadow-sm">
                <span className="text-primary font-extrabold text-sm">{s.num}</span>
                <span className="text-muted-foreground text-xs">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery-grid" ref={filterRef} className="py-16 md:py-20 lg:py-24 bg-background">
        <div className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 filter-anim">
            <div className="mb-4 flex justify-center">
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                {t('filterTagline')}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4">
              {t('filterHeading')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('filterSubheading')}
            </p>
          </div>

          <div className="filter-anim flex flex-wrap items-center justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
                  activeFilter === cat
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25'
                    : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-primary'
                }`}
              >
                {cat === 'All' ? t('filterAll')
                  : cat === 'Training' ? t('filterTraining')
                  : cat === 'Departure' ? t('filterDeparture')
                  : cat === 'Office' ? t('filterOffice')
                  : t('filterEvent')}
              </motion.button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, idx) => (
                <motion.div
                  key={item.title + item.category}
                  layout
                  initial={{ opacity: 0, scale: 0.88, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: 20 }}
                  transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="group relative rounded-3xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-2xl cursor-pointer aspect-[4/3]"
                  onClick={() => openLightbox(idx)}
                  role="button"
                  aria-label={`Open ${item.title}`}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-primary/90 text-primary-foreground px-3 py-1 rounded-full backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                      <Play className="h-7 w-7 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                    <h3 className="text-base font-extrabold text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-white/70 leading-relaxed line-clamp-2">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/40 border-y border-border/60 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[220px] bg-primary/10 rounded-full blur-[130px] pointer-events-none" />

        <div ref={statsRef} className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="mb-4 flex justify-center">
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                {t('statsTagline')}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
              {t('statsHeading')}
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ numKey, suffix, label, icon: Icon }, idx) => {
              const rawNum = t(numKey);
              const num = parseInt(rawNum.replace(/[^\d]/g, ''), 10) || 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40, scale: 0.93 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: idx * 0.12, ease: 'easeOut' }}
                  className="relative group p-7 rounded-3xl border border-border bg-card shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mx-auto">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-foreground mb-2 tabular-nums stat-num" data-target={num}>
                    0<span className="text-primary">{suffix}</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">{label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* --- 1. Global Background Glows (Outer Layer) --- */}
        <div className="absolute inset-0 -z-10 pointer-events-none flex items-center justify-center">
          {/* Central massive elliptical glow (Angled for dynamic look) */}
          <div className="absolute w-[800px] h-[250px] bg-primary/15 rounded-[100%] blur-[120px] -rotate-12 translate-y-10" />

          {/* Top Right Cyan Glow */}
          <div className="absolute top-10 right-[10%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />

          {/* Bottom Left Sky Glow */}
          <div className="absolute bottom-10 left-[10%] w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[130px]" />
        </div>

        <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          {/* Main CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] bg-card/60 backdrop-blur-2xl border border-border shadow-2xl px-6 py-16 md:py-24 text-center z-10 group"
          >
            {/* --- 2. Inner Card Glows & Edge Highlights --- */}
            {/* Top glowing border edge */}
            <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-70" />

            {/* Soft inner top glow */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[70%] h-[200px] bg-primary/20 blur-[80px] -z-10" />

            {/* Interactive bottom glow that expands on hover */}
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[100px] -z-10 transition-transform duration-700 group-hover:scale-125" />

            {/* Content Wrapper */}
            <div className="relative z-20">
              {/* Tagline Badge */}
              <div className="cta-anim mb-8 flex justify-center">
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-5 py-2.5 rounded-full ring-1 ring-primary/30 shadow-[0_0_15px_rgba(3,105,161,0.2)]"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  {t('ctaTagline')}
                </motion.span>
              </div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="cta-anim text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight md:leading-[1.15] mb-8 max-w-4xl mx-auto"
              >
                {t('ctaHeading')}
              </motion.h2>

              {/* Gradient Divider */}
              <div className="cta-anim mx-auto mb-8 h-1.5 w-24 rounded-full bg-gradient-to-r from-primary to-cyan-400 shadow-[0_0_10px_rgba(3,105,161,0.5)] opacity-90" />

              {/* Subheading */}
              <p className="cta-anim text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
                {t('ctaSubheading')}
              </p>

              {/* Buttons */}
              <div className="cta-anim flex flex-col sm:flex-row items-center justify-center gap-5">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href={`/${locale}/contact`}
                    className="group/btn inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-2xl bg-gradient-to-r from-primary to-sky-500 text-white font-bold text-sm md:text-base shadow-[0_0_20px_rgba(3,105,161,0.4)] hover:shadow-[0_0_30px_rgba(3,105,161,0.6)] transition-all duration-300 w-full sm:w-auto"
                  >
                    <Briefcase className="h-5 w-5 transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
                    {t('ctaHire')}
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href={`/${locale}/careers`}
                    className="group/btn inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-2xl border border-border bg-background/50 backdrop-blur-sm text-foreground font-bold text-sm md:text-base hover:bg-muted hover:border-primary/50 hover:text-primary transition-all duration-300 w-full sm:w-auto"
                  >
                    {t('ctaApply')}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
