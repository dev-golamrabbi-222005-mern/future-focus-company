"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Search,
  Plane,
  Home,
  HeartPulse,
  Briefcase,
  Zap,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Job image map — curated Unsplash photos per role ── */
const JOB_IMAGES: Record<string, string> = {
  job1: "https://i.postimg.cc/bwRztbmv/Hospitality.png", // receptionist / hotel lobby
  job2: "https://i.postimg.cc/JzQ1kJpy/Housekeeper.png", // housekeeper
  job3: "https://i.postimg.cc/qvGk3n1h/Security-Guard.png", // security guard
  job4: "https://i.postimg.cc/T1xjR06D/Driver.png", // driver
  job5: "https://i.postimg.cc/G3PJXWF8/Office-Boy.png", // office / tea boy
  job6: "https://i.postimg.cc/Wz7GtZNM/Gardener.png", // gardener
  job7: "https://i.postimg.cc/VvFq5tfn/General-Helper.png", // general labor
  job8: "https://i.postimg.cc/VvFq5tfM/Even-staff.png", // event staff
  job9: "https://i.postimg.cc/tJz376R0/Golf-Cart-Driver.png", // golf cart
};

const CATEGORY_COLORS: Record<string, string> = {
  Hospitality: "bg-amber-500/15 text-amber-600 border-amber-500/25",
  Cleaning:    "bg-sky-500/15 text-sky-600 border-sky-500/25",
  Security:    "bg-red-500/15 text-red-600 border-red-500/25",
  Transport:   "bg-violet-500/15 text-violet-600 border-violet-500/25",
  "Support Staff": "bg-emerald-500/15 text-emerald-600 border-emerald-500/25",
};

const FILTER_KEYS = ["All", "Hospitality", "Security", "Support Staff", "Transport", "Cleaning"] as const;
type FilterKey = typeof FILTER_KEYS[number];

const FILTER_LABEL_KEYS: Record<FilterKey, string> = {
  All:           "filterAll",
  Hospitality:   "filterHospitality",
  Security:      "filterSecurity",
  "Support Staff": "filterSupport",
  Transport:     "filterTransport",
  Cleaning:      "filterCleaning",
};

export default function CareersJobsSection() {
  const t = useTranslations("CareersPage");
  const locale = useLocale();
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const headerRef  = React.useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = React.useState<FilterKey>("All");
  const [search, setSearch] = React.useState("");

  /* ── Build jobs array from translations ── */
  const allJobs = React.useMemo(() => {
    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tx = t as (key: any) => string;
    return ids.map((n) => ({
      key:      `job${n}` as keyof typeof JOB_IMAGES,
      title:    tx(`job${n}Title`),
      location: tx(`job${n}Location`),
      salary:   tx(`job${n}Salary`),
      category: tx(`job${n}Category`) as string,
      desc:     tx(`job${n}Desc`),
      image:    JOB_IMAGES[`job${n}`],
      urgent:   n <= 3,
    }));
  }, [t]);

  const filtered = React.useMemo(() => {
    return allJobs.filter((j) => {
      const matchCat    = activeFilter === "All" || j.category === activeFilter;
      const matchSearch = search === "" ||
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.location.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [allJobs, activeFilter, search]);

  useGSAP(
    () => {
      if (!headerRef.current) return;
      gsap.fromTo(
        headerRef.current.querySelectorAll(".gsap-up"),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
        }
      );
    },
    { scope: headerRef }
  );

  const benefits = [
    { icon: Plane,     label: t("freeVisa") },
    { icon: Home,      label: t("freeAccom") },
    { icon: HeartPulse,label: t("freeMedical") },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-background py-16 md:py-20 lg:py-24"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(3,105,161,0.06),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-[1380px] px-4 md:px-6 lg:px-8 space-y-12">

        {/* ── Section header ── */}
        <div ref={headerRef} className="text-center space-y-4">
          <div className="gsap-up flex justify-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              {t("filterTag")}
            </span>
          </div>
          <h2 className="gsap-up text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-tight">
            {t("filterTitle")}
          </h2>
          <p className="gsap-up text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("filterSubtitle")}
          </p>

          {/* Benefits bar */}
          <div className="gsap-up flex flex-wrap items-center justify-center gap-3 pt-2">
            {benefits.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Search + Filter bar ── */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Search input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full rounded-xl border border-border bg-card pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {FILTER_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all border ${
                  activeFilter === key
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
                }`}
              >
                {t(FILTER_LABEL_KEYS[key])}
              </button>
            ))}
          </div>
        </div>

        {/* ── Job cards grid ── */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center text-muted-foreground text-sm"
            >
              {t("noJobs")}
            </motion.div>
          ) : (
            <motion.div
              key={activeFilter + search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((job, idx) => (
                <motion.div
                  key={job.key}
                  initial={{ opacity: 0, y: 35, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.07, ease: "easeOut" }}
                  whileHover={{ y: -6 }}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-400"
                >
                  {/* ── Image ── */}
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={job.image}
                      alt={job.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading={idx < 3 ? "eager" : "lazy"}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Badges on image */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span
                        className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm ${CATEGORY_COLORS[job.category] ?? "bg-primary/15 text-primary border-primary/25"}`}
                      >
                        {job.category}
                      </span>
                      {job.urgent && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-md">
                          <Zap className="h-3 w-3" />
                          {t("urgent")}
                        </span>
                      )}
                    </div>

                    {/* Title on image bottom */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-extrabold text-white leading-tight drop-shadow-lg transition-colors">
                        {job.title}
                      </h3>
                    </div>
                  </div>

                  {/* ── Card body ── */}
                  <div className="flex flex-1 flex-col gap-4 p-5">
                    {/* Location & salary */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 shrink-0 text-primary" />
                        <span className="font-medium">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-xl bg-muted/40 border border-border/60 px-3 py-2 text-sm font-bold text-foreground">
                        <DollarSign className="h-4 w-4 shrink-0 text-emerald-500" />
                        <span>{job.salary}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs leading-5 text-muted-foreground line-clamp-2">
                      {job.desc}
                    </p>

                    {/* Perks row */}
                    <div className="flex flex-wrap gap-2">
                      {[t("freeVisa"), t("freeAccom"), t("freeMedical")].map((perk) => (
                        <span
                          key={perk}
                          className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-semibold text-emerald-600"
                        >
                          <CheckCircle2 className="h-3 w-3 shrink-0" />
                          {perk}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-auto pt-3 border-t border-border/60 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1 text-[10px] font-bold text-primary">
                        <Briefcase className="h-3 w-3" />
                        {t("fullTime")}
                      </span>
                      <Link
                        href={`/${locale}/contact#submit-cv`}
                        className="group/btn inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90 transition-all"
                      >
                        {t("applyBtn")}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
