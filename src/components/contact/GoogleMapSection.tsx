"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

export default function GoogleMapSection() {
  const t = useTranslations("GoogleMap");

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8">

        {/* Header */}

        <div className="text-center mb-16">

          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-sm font-bold uppercase tracking-[0.3em] text-primary">
            {t("tag")}
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-black text-foreground">
            {t("title")}
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground leading-8">
            {t("description")}
          </p>

        </div>

        <div className="grid lg:grid-cols-5 gap-10">

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

                  <Phone className="text-primary h-5 w-5"/>

                  <span>+966 5X XXX XXXX</span>

                </div>

                <div className="flex items-center gap-3 mb-5">

                  <Mail className="text-primary h-5 w-5"/>

                  <span>info@futurefocus.com</span>

                </div>

                <div className="flex items-center gap-3">

                  <Clock className="text-primary h-5 w-5"/>

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

              <iframe
                src="https://www.google.com/maps?q=Riyadh,Saudi%20Arabia&output=embed"
                width="100%"
                height="550"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}