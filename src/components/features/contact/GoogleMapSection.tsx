"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

export default function GoogleMapSection() {
  const t = useTranslations("GoogleMap");

  return (
    <section className="pt-12 md:pt-16 lg:pt-20 pb-8 md:pb-10 lg:pb-12">
      <div className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8">

        {/* Header */}

        <div className="text-center mb-16">

          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.3em] text-primary">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-primary" />
            <span>{t("tag")}</span>
          </span>

          <h2 className="mt-6 text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center">
            {t("title")}
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-muted-foreground leading-8">
            {t("description")}
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">

          {/* Left */}

          <div className="lg:col-span-2">

            <div className="rounded-3xl border border-border bg-card p-8 shadow-lg space-y-8">

              <div>
                <div className="flex items-center gap-3 mb-3">

                  <MapPin className="text-primary h-6 w-6" />

                  <h3 className="text-xl font-bold">
                    {t("office")}
                  </h3>

                </div>

                <p className="text-muted-foreground leading-7">
                  Riyadh, Kingdom of Saudi Arabia
                </p>

              </div>

              <div className="border-t border-border pt-6">

                <div className="flex items-center gap-3 mb-5">

                  <Phone className="text-primary h-5 w-5" />

                  <span>+966 56 616 7562</span>

                </div>

                <div className="flex items-center gap-3 mb-5">

                  <Mail className="text-primary h-5 w-5" />

                  <span>operations@ffccom.net</span>

                </div>

                <div className="flex items-center gap-3">

                  <Clock className="text-primary h-5 w-5" />

                  <span>{t("time")}</span>

                </div>

              </div>

              <a
                href="https://maps.google.com/?q=Riyadh+Saudi+Arabia"
                target="_blank"
                className="inline-flex w-full justify-center rounded-xl bg-primary px-6 py-4 font-bold text-primary-foreground transition hover:opacity-90"
              >
                {t("button")}
              </a>

            </div>

          </div>

          {/* Right */}

          <div className="lg:col-span-3">

            <div className="overflow-hidden rounded-3xl border border-border shadow-xl">

              <div className="relative w-full h-0 pb-[56.25%]">
                <iframe
                  src="https://www.google.com/maps?q=Riyadh,Saudi%20Arabia&output=embed"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}