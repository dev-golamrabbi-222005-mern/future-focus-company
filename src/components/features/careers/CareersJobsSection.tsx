"use client";

import * as React from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin, DollarSign, CheckCircle2, Search,
  Plane, Home, HeartPulse, Briefcase, Zap,
  X, Send, ChevronRight, User, Phone, Mail,
  FileText, Upload, ArrowRight,
} from "lucide-react";
import { sendCvEmail, fileToBase64 } from "@/lib/emailjs";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Job images ─── */
const JOB_IMAGES: Record<string, string> = {
  job1: "https://i.postimg.cc/sXLhKzXG/Hospitality.png",
  job2: "https://i.postimg.cc/RhnnDY6P/Housekeeper.png",
  job3: "https://i.postimg.cc/Fs3TfWWG/Security-Guard.png",
  job4: "https://i.postimg.cc/8CDBrTJj/Driver.png",
  job5: "https://i.postimg.cc/VLnKSGGF/Office-Boy.png",
  job6: "https://i.postimg.cc/Bb8xG6kG/Gardener.png",
  job7: "https://i.postimg.cc/SRXWps57/General-Helper.png",
  job8: "https://i.postimg.cc/yxJFzd5c/Even-staff.png",
  job9: "https://i.postimg.cc/t4dFb8ST/Golf-Cart-Driver.png",
};

const CATEGORY_COLORS: Record<string, string> = {
  Hospitality: "bg-amber-500 text-slate-950 font-black shadow-lg border border-amber-300/40",
  Cleaning: "bg-sky-500 text-slate-950 font-black shadow-lg border border-sky-300/40",
  Security: "bg-rose-600 text-white font-black shadow-lg border border-rose-300/40",
  Transport: "bg-violet-600 text-white font-black shadow-lg border border-violet-300/40",
  "Support Staff": "bg-emerald-500 text-slate-950 font-black shadow-lg border border-emerald-300/40",
};

const RAW_CATEGORIES = [
  "Hospitality", "Cleaning", "Security", "Transport", "Support Staff",
  "Support Staff", "Support Staff", "Hospitality", "Transport"
] as const;

const FILTER_KEYS = ["All", "Hospitality", "Security", "Support Staff", "Transport", "Cleaning"] as const;
type FilterKey = typeof FILTER_KEYS[number];

const FILTER_LABEL_KEYS: Record<FilterKey, string> = {
  All: "filterAll", Hospitality: "filterHospitality",
  Security: "filterSecurity", "Support Staff": "filterSupport",
  Transport: "filterTransport", Cleaning: "filterCleaning",
};

/* ─── Job type ─── */
type Job = {
  key: string;
  title: string;
  location: string;
  salary: string;
  categoryKey: string;
  category: string;
  desc: string;
  image: string;
  urgent: boolean;
};

/* ─── Apply Form ─── */
function ApplyForm({
  job,
  onClose,
  onSuccess,
}: {
  job: Job;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const t = useTranslations("CareersPage");
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    fullName: "", phone: "", email: "", passportNo: "", experience: "1-3",
  });
  const [cvFileName, setCvFileName] = React.useState("");
  const [cvBase64, setCvBase64] = React.useState("");
  const tCommon = useTranslations('CommonUI');

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFileName(file.name);
      try {
        const b64 = await fileToBase64(file);
        setCvBase64(b64);
      } catch (err) {
        console.error('CV conversion error:', err);
      }
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await sendCvEmail({
      form_type: 'Job Application',
      job_title: job.title,
      candidate_name: form.fullName,
      phone: form.phone,
      email: form.email,
      passport_no: form.passportNo,
      experience_years: form.experience,
      cv_file_name: cvFileName || 'Not attached',
      cv_attachment: cvBase64 || '',
    });

    setLoading(false);
    if (result.success) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {/* Full Name */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <User className="h-3.5 w-3.5" /> {t("fullNameLabel")}
        </label>
        <input name="fullName" required value={form.fullName} onChange={handle}
          placeholder={t("fullNamePlaceholder")}
          className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>

      {/* Phone + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Phone className="h-3.5 w-3.5" /> {t("phoneLabel")}
          </label>
          <input name="phone" type="tel" required value={form.phone} onChange={handle}
            placeholder={t("phonePlaceholder")}
            className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Mail className="h-3.5 w-3.5" /> {t("emailLabel")}
          </label>
          <input name="email" type="email" value={form.email} onChange={handle}
            placeholder={t("emailPlaceholder")}
            className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>

      {/* Passport + Experience */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <FileText className="h-3.5 w-3.5" /> {t("passportLabel")}
          </label>
          <input name="passportNo" required value={form.passportNo} onChange={handle}
            placeholder={t("passportPlaceholder")}
            className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
            {t("expYearsLabel")}
          </label>
          <select name="experience" required value={form.experience} onChange={handle}
            className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="1-3">{tCommon('years1_3')}</option>
            <option value="3-5">{tCommon('years3_5')}</option>
            <option value="5+">{tCommon('years5Plus')}</option>
          </select>
        </div>
      </div>

      {/* CV Upload */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <Upload className="h-3.5 w-3.5" /> {t("uploadCvLabel")}
        </label>
        <label className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/20 px-4 py-5 text-center cursor-pointer hover:border-primary/50 transition-colors">
          <Upload className="h-6 w-6 text-primary" />
          <span className="text-xs font-semibold text-foreground">
            {cvFileName ? `${tCommon('attached')}${cvFileName}` : tCommon('uploadPdfDoc')}
          </span>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required className="hidden" />
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onClose}
          className="flex-1 rounded-xl border border-border bg-muted/40 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors">
          {tCommon('cancel')}
        </button>
        <button type="submit" disabled={loading}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 disabled:opacity-60 transition-all">
          {loading ? (
            <span className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
          ) : (
            <><Send className="h-4 w-4" /> {tCommon('submitApp')}</>
          )}
        </button>
      </div>
    </form>
  );
}

/* ─── Job Detail Modal ─── */
function JobModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const t = useTranslations("CareersPage");
  const tCommon = useTranslations("CommonUI");
  const [view, setView] = React.useState<"details" | "apply" | "success">("details");

  /* lock body scroll */
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const perks = [t("freeVisa"), t("freeAccom"), t("freeMedical")];

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Panel */}
        <motion.div
          key="modal-panel"
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.97 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative z-10 w-full sm:max-w-2xl max-h-[92svh] sm:max-h-[88vh] overflow-hidden rounded-t-[2rem] sm:rounded-[2rem] bg-card border border-border shadow-2xl flex flex-col"
        >
          {/* ── Job image header ── */}
          <div className="relative h-44 sm:h-52 shrink-0 overflow-hidden">
            <img src={job.image} alt={job.title}
              className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Close */}
            <button onClick={onClose}
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-md">
              <X className="h-5 w-5" />
            </button>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className={`rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide shadow-md ${CATEGORY_COLORS[job.categoryKey] ?? "bg-primary text-primary-foreground font-black"}`}>
                {job.category}
              </span>
              {job.urgent && (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white">
                  <Zap className="h-3 w-3" /> {t("urgent")}
                </span>
              )}
            </div>

            {/* Title */}
            <div className="absolute bottom-4 left-4 right-16">
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-lg">
                {job.title}
              </h2>
              <p className="flex items-center gap-1.5 mt-1 text-xs text-white/80 font-semibold">
                <MapPin className="h-3.5 w-3.5 text-primary" /> {job.location}
              </p>
            </div>
          </div>

          {/* ── Tab switcher (only when not success) ── */}
          {view !== "success" && (
            <div className="flex border-b border-border shrink-0">
              {(["details", "apply"] as const).map((tab) => (
                <button key={tab} onClick={() => setView(tab)}
                  className={`flex-1 py-3.5 text-sm font-bold transition-colors ${view === tab
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"}`}>
                  {tab === "details" ? t("jobDetailsTab") : t("applyNowTab")}
                </button>
              ))}
            </div>
          )}

          {/* ── Scrollable content ── */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">

            {/* SUCCESS */}
            {view === "success" && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-5">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                  <CheckCircle2 className="h-9 w-9 text-emerald-500 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-foreground">{tCommon('appSubmitted')}</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                    {t("reviewMsg")}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-5 py-2 text-xs font-bold text-primary">
                  <Briefcase className="h-3.5 w-3.5" /> {job.title}
                </div>
                <button onClick={onClose}
                  className="mt-2 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
                  {tCommon('close')}
                </button>
              </motion.div>
            )}

            {/* DETAILS */}
            {view === "details" && (
              <div className="space-y-6">
                {/* Salary */}
                <div className="flex items-center gap-2 rounded-2xl bg-muted/40 border border-border px-4 py-3">
                  <DollarSign className="h-5 w-5 shrink-0 text-emerald-500" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{tCommon('monthlySalary')}</p>
                    <p className="text-sm font-extrabold text-foreground">{job.salary}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground mb-2">{tCommon('jobDescription')}</h4>
                  <p className="text-sm leading-7 text-foreground/90">{job.desc}</p>
                </div>

                {/* Perks */}
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground mb-3">{tCommon('includedBenefits')}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {perks.map((perk) => (
                      <div key={perk} className="flex items-center gap-2 rounded-xl bg-emerald-500/8 border border-emerald-500/20 px-3 py-2.5">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                        <span className="text-xs font-semibold text-foreground">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Job type */}
                <div className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-muted/30">
                  <Briefcase className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{tCommon('jobType')}</p>
                    <p className="text-sm font-bold text-foreground">{t("fullTime")} • {job.location}</p>
                  </div>
                </div>

                {/* CTA */}
                <button onClick={() => setView("apply")}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-sm text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all group">
                  {t("applyBtn")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}

            {/* APPLY FORM */}
            {view === "apply" && (
              <ApplyForm job={job} onClose={onClose} onSuccess={() => setView("success")} />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Main Section ─── */
export default function CareersJobsSection() {
  const t = useTranslations("CareersPage");
  const tCommon = useTranslations("CommonUI");
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = React.useState<FilterKey>("All");
  const [search, setSearch] = React.useState("");
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);

  /* ── Build jobs array from translations ── */
  const allJobs = React.useMemo(() => {
    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tx = t as (key: any) => string;
    return ids.map((n, idx) => ({
      key: `job${n}`,
      title: tx(`job${n}Title`),
      location: tx(`job${n}Location`),
      salary: tx(`job${n}Salary`),
      categoryKey: RAW_CATEGORIES[idx],
      category: tx(`job${n}Category`) as string,
      desc: tx(`job${n}Desc`),
      image: JOB_IMAGES[`job${n}`],
      urgent: n <= 3,
    }));
  }, [t]);

  const filtered = React.useMemo(() => allJobs.filter((j) => {
    const matchCat = activeFilter === "All" || j.categoryKey === activeFilter;
    const matchSearch = search === "" ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  }), [allJobs, activeFilter, search]);

  useGSAP(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current.querySelectorAll(".gsap-up"),
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 80%" }
      }
    );
  }, { scope: headerRef });

  return (
    <>
      <section ref={sectionRef} className="relative py-12 md:py-16 lg:py-20 bg-muted/15 border-y border-border/60">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(3,105,161,0.06),transparent_55%)]" />
        </div>

        <div className="mx-auto max-w-[1380px] px-4 md:px-6 lg:px-8 space-y-10">

          {/* Header */}
          <div ref={headerRef} className="text-center space-y-4">
            <div className="gsap-up flex justify-center">
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 inline-flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 shrink-0 text-primary" />
                <span>{t("filterTag")}</span>
              </span>
            </div>
            <h2 className="gsap-up text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight text-center">
              {t("filterTitle")}
            </h2>
            <p className="gsap-up text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("filterSubtitle")}
            </p>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full rounded-xl border border-border bg-card pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTER_KEYS.map((key) => (
                <button key={key} onClick={() => setActiveFilter(key)}
                  className={`rounded-full px-3.5 py-2 text-xs font-bold transition-all border ${activeFilter === key
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                      : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
                    }`}>
                  {t(FILTER_LABEL_KEYS[key])}
                </button>
              ))}
            </div>
          </div>

          {/* Cards grid */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="py-20 text-center text-muted-foreground text-sm">
                {t("noJobs")}
              </motion.div>
            ) : (
              <motion.div key={activeFilter + search}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((job, idx) => (
                  <motion.div key={job.key}
                    initial={{ opacity: 0, y: 35, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.07, ease: "easeOut" }}
                    whileHover={{ y: -6 }}
                    className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-300">

                    {/* Image */}
                    <div className="relative overflow-hidden h-52">
                      <img src={job.image} alt={job.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading={idx < 3 ? "eager" : "lazy"} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className={`rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide shadow-md ${CATEGORY_COLORS[job.categoryKey] ?? "bg-primary text-primary-foreground font-black"}`}>
                          {job.category}
                        </span>
                        {job.urgent && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-md">
                            <Zap className="h-3 w-3" /> {t("urgent")}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-extrabold text-white leading-tight drop-shadow-lg">
                          {job.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 shrink-0 text-primary" />
                        <span className="font-medium">{job.location}</span>
                      </div>

                      <p className="text-xs leading-5 text-muted-foreground line-clamp-2">{job.desc}</p>

                      {/* Perks
                      <div className="flex flex-wrap gap-1.5">
                        {[t("freeVisa"), t("freeAccom"), t("freeMedical")].map((perk) => (
                          <span key={perk}
                            className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-semibold text-emerald-600">
                            <CheckCircle2 className="h-3 w-3 shrink-0" /> {perk}
                          </span>
                        ))}
                      </div> */}

                      {/* Footer */}
                      <div className="mt-auto pt-3 border-t border-border/60 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1 text-[10px] font-bold text-primary">
                          <Briefcase className="h-3 w-3" /> {t("fullTime")}
                        </span>
                        <button onClick={() => setSelectedJob(job)}
                          className="group/btn inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90 transition-all">
                          {tCommon("details")}
                          <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Modal */}
      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </>
  );
}
