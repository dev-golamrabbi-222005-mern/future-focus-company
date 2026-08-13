'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImpactNumbers } from './GalleryImpactNumbers';
import { GalleryCTA } from './GalleryCTA';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Hero slideshow images ── */
const SLIDE_IMAGES = [
  { src: 'https://i.postimg.cc/HkVGvXfm/Hero-1.png',  alt: 'Hero 1' },
  { src: 'https://i.postimg.cc/y8kqpcwB/Hero-2.jpg',  alt: 'Hero 2' },
  { src: 'https://i.postimg.cc/YChcDYJ0/Hero-3.png',  alt: 'Hero 3' },
  { src: 'https://i.postimg.cc/P5PGVYBq/Hero-4.png',  alt: 'Hero 4' },
];

/* ── Gallery grid images ── */
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

/* ─────────────────────────────────────────────
   Lightbox
───────────────────────────────────────────── */
function Lightbox({
  items,
  activeIdx,
  onClose,
  onPrev,
  onNext,
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>
        <div className="p-6 space-y-1">
          <h3 className="text-xl font-extrabold text-foreground">{item.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <button
          onClick={onPrev}
          aria-label="Previous"
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={onNext}
          aria-label="Next"
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <span className="absolute bottom-20 right-6 text-xs text-white/60 font-bold">
          {activeIdx + 1} / {items.length}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main export
───────────────────────────────────────────── */
const CATEGORIES = ['All', 'Construction', 'Civil', 'Facility Mgmt', 'Hospitality'] as const;
type Cat = (typeof CATEGORIES)[number];

export function GalleryClient() {
  const t = useTranslations('GalleryPage');

  /* ── Hero slideshow ── */
  const [heroIdx, setHeroIdx] = React.useState(0);
  /* Preload all slide images on mount so mobile doesn't blank-flash */
  React.useEffect(() => {
    SLIDE_IMAGES.forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  React.useEffect(() => {
    const id = setInterval(
      () => setHeroIdx((p) => (p + 1) % SLIDE_IMAGES.length),
      5000,
    );
    return () => clearInterval(id);
  }, []);

  /* ── Gallery grid ── */
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
  const filtered =
    activeFilter === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  /* ── Lightbox ── */
  const [lightboxIdx, setLightboxIdx] = React.useState<number | null>(null);
  const closeLightbox = () => setLightboxIdx(null);
  const prevLightbox = () =>
    setLightboxIdx((p) =>
      p === null ? 0 : (p - 1 + filtered.length) % filtered.length,
    );
  const nextLightbox = () =>
    setLightboxIdx((p) => (p === null ? 0 : (p + 1) % filtered.length));

  /* ── GSAP refs ── */
  const heroRef   = React.useRef<HTMLElement>(null);
  const filterRef = React.useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;
    gsap.fromTo(
      heroRef.current.querySelectorAll('.hero-anim'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.2 },
    );
  }, { scope: heroRef });

  useGSAP(() => {
    if (!filterRef.current) return;
    gsap.fromTo(
      filterRef.current.querySelectorAll('.filter-anim'),
      { opacity: 0, y: 45 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: filterRef.current, start: 'top 80%' },
      },
    );
  }, { scope: filterRef });

  return (
    <>
      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-[70vh] pt-6 md:pt-8 lg:pt-10 flex items-center justify-center overflow-hidden"
      >
        {/* Slideshow background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIdx}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              {/*
                Use a plain <img> so the browser can load external URLs freely.
                priority-equivalent: we set fetchpriority="high" on the first
                slide and preload the rest in the useEffect above.
              */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SLIDE_IMAGES[heroIdx].src}
                alt={SLIDE_IMAGES[heroIdx].alt}
                fetchPriority={heroIdx === 0 ? 'high' : 'low'}
                decoding="async"
                className="w-full h-full object-cover object-center"
                style={{ display: 'block' }}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-black/35 dark:bg-black/50" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/15 rounded-full blur-[130px] pointer-events-none" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14 text-center">
          <div className="hero-anim mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              <Camera className="h-3.5 w-3.5" />
              {t('heroTagline')}
            </span>
          </div>

          <h1 className="hero-anim text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            {t('heroHeading')}{' '}
            <span className="bg-gradient-to-r from-sky-400 via-primary to-cyan-400 bg-clip-text text-transparent">
              {t('heroHeadingHighlight')}
            </span>
          </h1>

          <p className="hero-anim text-lg sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed mb-10">
            {t('heroSubheading')}
          </p>

          <div className="hero-anim flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <motion.a
              href="#gallery-grid"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
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
              <div
                key={i}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm shadow-sm"
              >
                <span className="text-primary font-extrabold text-sm">{s.num}</span>
                <span className="text-white/70 text-xs">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. GALLERY GRID
      ══════════════════════════════════════ */}
      <section id="gallery-grid" ref={filterRef} className="py-16 md:py-20 lg:py-24">
        <div className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8">
          {/* Header */}
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

          {/* Filter pills */}
          <div className="filter-anim flex flex-wrap items-center justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
                  activeFilter === cat
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25'
                    : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-primary'
                }`}
              >
                {cat === 'All'
                  ? t('filterAll')
                  : cat === 'Construction'
                  ? t('filterTraining')
                  : cat === 'Civil'
                  ? t('filterDeparture')
                  : cat === 'Facility Mgmt'
                  ? t('filterOffice')
                  : t('filterEvent')}
              </motion.button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, idx) => (
                <motion.div
                  key={item.title + item.category}
                  layout
                  initial={{ opacity: 0, scale: 0.88, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: 20 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.06,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="group relative rounded-3xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-2xl cursor-pointer aspect-[4/3]"
                  onClick={() => setLightboxIdx(idx)}
                  role="button"
                  aria-label={`Open ${item.title}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-primary/90 text-primary-foreground px-3 py-1 rounded-full backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-base font-extrabold text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-white/70 leading-relaxed line-clamp-2">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. IMPACT NUMBERS  (own file)
      ══════════════════════════════════════ */}
      <GalleryImpactNumbers />

      {/* ══════════════════════════════════════
          4. READY TO PARTNER  (own file)
      ══════════════════════════════════════ */}
      <GalleryCTA />

      {/* ══════════════════════════════════════
          Lightbox
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            items={filtered}
            activeIdx={lightboxIdx}
            onClose={closeLightbox}
            onPrev={prevLightbox}
            onNext={nextLightbox}
          />
        )}
      </AnimatePresence>
    </>
  );
}
