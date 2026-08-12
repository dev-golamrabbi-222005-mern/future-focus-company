"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────
   Facility Management Services
───────────────────────────────────────────── */
const SERVICES_SLUGS: Record<string, string[]> = {
  "facility-management": [
    "electricians",
    "plumbers",
    "hvac",
    "housekeepers",
    "gardeners",
    "security",
    "drivers",
    "catering",
  ],

  /* ─────────────────────────────────────────────
     Construction Services
  ───────────────────────────────────────────── */
  construction: [
    "civilEngineers",
    "siteEngineers",
    "supervisors",
    "masons",
    "steelFixers",
    "welders",
    "scaffolders",
    "equipmentOperators",
  ],
};

/* ─────────────────────────────────────────────
   Rich Role Objects
───────────────────────────────────────────── */
const ROLE_KEYS = ["role1", "role2", "role3", "role4", "role5", "role6"];

/* ─────────────────────────────────────────────
   Service Images
───────────────────────────────────────────── */
const SERVICE_IMAGES: Record<string, string> = {
  electricians: "/images/workforce/electricians.jpg",
  plumbers: "/images/workforce/plumbers.jpg",
  hvac: "/images/workforce/hvac.jpg",
  housekeepers: "/images/workforce/housekeepers.jpg",
  gardeners: "/images/workforce/gardeners.jpg",
  security: "/images/workforce/security.jpg",
  drivers: "/images/workforce/drivers.jpg",
  catering: "/images/workforce/catering.jpg",

  civilEngineers: "/images/workforce/civil-engineers.jpg",
  siteEngineers: "/images/workforce/site-engineers.jpg",
  supervisors: "/images/workforce/supervisors.jpg",
  masons: "/images/workforce/masons.jpg",
  steelFixers: "/images/workforce/steel-fixers.jpg",
  welders: "/images/workforce/welders.jpg",
  scaffolders: "/images/workforce/scaffolders.jpg",
  equipmentOperators: "/images/workforce/equipment-operators.jpg",
};

/* ─────────────────────────────────────────────
   Props
───────────────────────────────────────────── */
interface JobRolesGridProps {
  slug: string;
  locale: string;
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export function JobRolesGrid({ slug, locale }: JobRolesGridProps) {
  const t = useTranslations("SectorsGrid");

  const containerRef = React.useRef<HTMLDivElement>(null);

  const isServicesMode = slug in SERVICES_SLUGS;

  /* ───────────────────────────────────────────
     GSAP Animation
  ─────────────────────────────────────────── */
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const cards = containerRef.current.querySelectorAll(".role-card");

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 30,
          scale: 0.97,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out",

          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      );
    },
    {
      scope: containerRef,
    },
  );

  /* ───────────────────────────────────────────
     Render
  ─────────────────────────────────────────── */
  return (
    <div ref={containerRef} className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
          {t("availableRolesTitle")}
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          {t("availableRolesSubtitle")}
        </p>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isServicesMode
          ? SERVICES_SLUGS[slug].map((key) => (
              <ServiceCard
                key={key}
                image={SERVICE_IMAGES[key]}
                title={t(`sectors.${slug}.services.${key}.title`)}
                badge={t(`sectors.${slug}.services.${key}.badge`)}
                desc={t(`sectors.${slug}.services.${key}.desc`)}
                hireLabel={t("requestRole")}
                tradeLabel={t("tradeTested")}
                locale={locale}
              />
            ))
          : ROLE_KEYS.map((key) => (
              <ServiceCard
                key={key}
                image={SERVICE_IMAGES[key]}
                title={t(`sectors.${slug}.roles.${key}.title`)}
                badge={t(`sectors.${slug}.roles.${key}.badge`)}
                desc={t(`sectors.${slug}.roles.${key}.desc`)}
                hireLabel={t("requestRole")}
                tradeLabel={t("tradeTested")}
                locale={locale}
              />
            ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Service Card Props
───────────────────────────────────────────── */
interface ServiceCardProps {
  image: string;
  title: string;
  badge: string;
  desc: string;
  hireLabel: string;
  tradeLabel: string;
  locale: string;
}

/* ─────────────────────────────────────────────
   Service Card
───────────────────────────────────────────── */
function ServiceCard({
  image,
  title,
  badge,
  desc,
  hireLabel,
  tradeLabel,
  locale,
}: ServiceCardProps) {
  return (
    <div
      className="
        role-card
        group
        flex
        flex-col
        overflow-hidden
        bg-card
        border
        border-border
        rounded-2xl
        shadow-sm
        hover:shadow-xl
        hover:border-primary/50
        transition-all
        duration-300
      "
    >
      {/* ───────────────────────────────────────
          Image
      ─────────────────────────────────────── */}
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-105
          "
          loading="lazy"
        />

        {/* Dark Gradient Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/70
            via-black/20
            to-transparent
          "
        />

        {/* Badge */}
        <span
          className="
            absolute
            top-4
            left-4
            text-[10px]
            font-black
            uppercase
            tracking-wider
            text-white
            bg-primary/90
            backdrop-blur-md
            border
            border-white/20
            px-3
            py-1.5
            rounded-full
          "
        >
          {badge}
        </span>

        {/* Verified Icon */}
        <div
          className="
            absolute
            top-4
            right-4
            w-8
            h-8
            rounded-full
            bg-black/30
            backdrop-blur-md
            flex
            items-center
            justify-center
            border
            border-white/20
          "
        >
          <CheckCircle2
            className="
              w-5
              h-5
              text-emerald-400
            "
          />
        </div>

        {/* Image Bottom Gradient */}
        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            h-16
            bg-gradient-to-t
            from-black/50
            to-transparent
            pointer-events-none
          "
        />
      </div>

      {/* ───────────────────────────────────────
          Content
      ─────────────────────────────────────── */}
      <div
        className="
          flex
          flex-col
          justify-between
          flex-1
          p-6
        "
      >
        {/* Top Content */}
        <div className="space-y-3">
          {/* Title */}
          <h3
            className="
              text-base
              font-bold
              text-foreground
              leading-snug
              group-hover:text-primary
              transition-colors
            "
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className="
              text-xs
              sm:text-sm
              text-muted-foreground
              leading-relaxed
              line-clamp-3
            "
          >
            {desc}
          </p>
        </div>

        {/* ─────────────────────────────────────
            Bottom
        ───────────────────────────────────── */}
        <div
          className="
            pt-4
            mt-5
            border-t
            border-border/60
            flex
            items-center
            justify-between
            gap-2
          "
        >
          {/* Trade Tested */}
          <span
            className="
              text-xs
              font-semibold
              text-muted-foreground
            "
          >
            {tradeLabel}
          </span>

          {/* Request Role */}
          <Link
            href={`/${locale}/contact#get-in-touch`}
            className="
              inline-flex
              items-center
              gap-1.5
              text-xs
              font-bold
              text-primary
              hover:underline
              shrink-0
            "
          >
            <span>{hireLabel}</span>

            <ArrowRight
              className="
                w-3.5
                h-3.5
                group-hover:translate-x-1
                rtl:group-hover:-translate-x-1
                transition-transform
              "
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
