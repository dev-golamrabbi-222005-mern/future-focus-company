"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  Star,
  Globe2,
  ClipboardCheck,
  BadgeDollarSign,
  HeartHandshake,
  Zap,
  Handshake,
  Lightbulb,
  Trophy,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const items = [
  {
    key: "item1",
    icon: ShieldCheck,
    accent: "#10b981", // emerald
  },
  {
    key: "item2",
    icon: Star,
    accent: "#3b82f6", // blue
  },
  {
    key: "item3",
    icon: Globe2,
    accent: "#8b5cf6", // violet
  },
  {
    key: "item4",
    icon: ClipboardCheck,
    accent: "#f59e0b", // amber
  },
  {
    key: "item5",
    icon: BadgeDollarSign,
    accent: "#06b6d4", // cyan
  },
  {
    key: "item6",
    icon: HeartHandshake,
    accent: "#ec4899", // pink
  },
  {
    key: "item7",
    icon: Zap,
    accent: "#f97316", // orange
  },
  {
    key: "item8",
    icon: Handshake,
    accent: "#6366f1", // indigo
  },
  {
    key: "item9",
    icon: Lightbulb,
    accent: "#eab308", // yellow
  },
  {
    key: "item10",
    icon: Trophy,
    accent: "#14b8a6", // teal
  },
];

export function WhyChooseUs() {
  const t = useTranslations("WhyChooseUs");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Animate header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
        },
      );

      // Animate cards with stagger
      const cards = containerRef.current.querySelectorAll(".wcu-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 48, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-20 lg:py-24 overflow-hidden bg-background"
    >
      {/* ── Background decorations ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* large radial blob */}
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/5 blur-[120px]" />
        {/* subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1380px] px-4 md:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div ref={headerRef} className="mb-14 text-center md:mb-16">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-primary">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
            {t("tagline")}
          </span>
          <h2 className="mx-auto mb-4 max-w-3xl text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            {t("heading")}
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("subheading")}
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-5">
          {items.map(({ key, icon: Icon, accent }, idx) => (
            <Card
              key={key}
              number={idx + 1}
              icon={Icon}
              accent={accent}
              title={t(`${key}Title`)}
              desc={t(`${key}Desc`)}
            />
          ))}
        </div>

        {/* ── Bottom accent bar ── */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 md:mt-16">
          {[
            { label: "5,000+ Workers Deployed" },
            { label: "150+ Satisfied Clients" },
            { label: "15+ Years of Experience" },
            { label: "Saudi Arabia Coverage" },
          ].map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-xs font-semibold text-muted-foreground shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {badge.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Card sub-component
───────────────────────────────────────────── */
interface CardProps {
  number: number;
  icon: React.ElementType;
  accent: string;
  title: string;
  desc: string;
}

function Card({ number, icon: Icon, accent, title, desc }: CardProps) {
  return (
    <div
      className="wcu-card group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl"
      style={
        {
          "--accent": accent,
        } as React.CSSProperties
      }
    >
      {/* Hover glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(200px circle at 50% 0%, ${accent}18 0%, transparent 70%)`,
        }}
      />

      {/* Top row: icon + number */}
      <div className="flex items-start justify-between">
        {/* Icon badge */}
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${accent}20` }}
        >
          <Icon className="h-6 w-6" style={{ color: accent }} />
        </div>

        {/* Number badge */}
        <span
          className="rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-widest"
          style={{
            backgroundColor: `${accent}15`,
            color: accent,
          }}
        >
          {String(number).padStart(2, "0")}
        </span>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-[var(--accent)]">
          {title}
        </h3>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {desc}
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full transition-all duration-500 group-hover:w-full"
        style={{ backgroundColor: accent }}
      />
    </div>
  );
}
