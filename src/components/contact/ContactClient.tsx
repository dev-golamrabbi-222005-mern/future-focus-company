"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContactFormSection } from "@/components/features/contact/ContactFormSection";
import GoogleMapSection from "@/components/contact/GoogleMapSection";
import FAQSection from "@/components/contact/FAQSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactClient() {
  const t = useTranslations("ContactPage");
  const containerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const animatedElements =
        containerRef.current.querySelectorAll(".gsap-fade-up");
      gsap.fromTo(
        animatedElements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div>
      <div
        ref={containerRef}
        className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8 lg:pt-10 pb-8 md:pb-10 lg:pb-12 space-y-12 md:space-y-16 lg:space-y-20"
      >
        <div className="text-center space-y-4 gsap-fade-up">
          <div className="mb-6 flex justify-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              {t("tagline")}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4">
            {t("heading")}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("subheading")}
          </p>
        </div>

        <ContactFormSection />
      </div>
      <FAQSection />
      <GoogleMapSection />
    </div>
  );
}
