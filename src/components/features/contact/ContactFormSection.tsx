"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Building2,
  Link,
  MessageCircle,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export function ContactFormSection() {
  const t = useTranslations("ContactPage");
  const tFooter = useTranslations("Footer");
  const [submitted, setSubmitted] = React.useState(false);

  const primaryOffice = siteConfig.offices.saudi || {
    address:
      "Suite 402, Business Bay Tower, Al A'amal St, Business Bay, Riyadh, KSA",
    phone: "+971 4 123 4567",
    email: "saudi@futurefocus.com",
  };

  const bdOffice = siteConfig.offices.bangladesh || {
    address: "House 12, Road 04, Block B, Banani, Dhaka-1213, Bangladesh",
    phone: "+880 2 987 6543",
    email: "dhaka@globalmanpower.com",
  };

  return (
    <div className="max-w-[1380px] mx-auto">
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-10">
        {/* Left Column: Interactive Contact Form */}
        <div className="gsap-fade-up w-full md:flex-1 p-6 sm:p-8 sm:p-10 rounded-3xl border border-border bg-card shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            {t("formTitle")}
          </h2>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 mt-0.5" />
              <p className="text-sm font-semibold">{t("successMsg")}</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("nameLabel")}
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t("emailLabel")}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t("phoneLabel")}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+966 50 123 4567"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("subjectLabel")}
                </label>
                <input
                  type="text"
                  required
                  placeholder="Manpower Requirement / Inquiry"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("messageLabel")}
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail your manpower requirements..."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                <span>{t("submitBtn")}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Office Address Cards & Map */}
        <div className="w-full md:flex-1 space-y-6">
          {/* Saudi/Primary Overseas Office Card */}
          <div className="gsap-fade-up p-8 rounded-3xl border border-border bg-card shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {tFooter("saudiOffice")}
              </h3>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-1" />
                <span>{tFooter("saudiAddress")}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>{primaryOffice.phone}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>{primaryOffice.Whatsapp}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>{primaryOffice.email}</span>
              </p>
            </div>
          </div>

          {/* Dhaka Office Card */}
          <div className="gsap-fade-up p-8 rounded-3xl border border-border bg-card shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-accent/10 text-accent">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {tFooter("bdOffice")}
              </h3>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-accent shrink-0 mt-1" />
                <span>{tFooter("bdAddress")}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <span>{bdOffice.phone}</span>
              </p>
              
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>{primaryOffice.Whatsapp}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <span>{bdOffice.email}</span>
              </p>
            </div>
          </div>

          {/* Google Maps Embed Mock */}
          {/* <div className="gsap-fade-up rounded-3xl overflow-hidden border border-border bg-muted/40 h-52 relative flex items-center justify-center p-4 text-center">
            <div className="space-y-2">
              <MapPin className="h-8 w-8 text-primary mx-auto animate-bounce" />
              <p className="text-sm font-bold text-foreground">Interactive Google Maps Location</p>
              <p className="text-xs text-muted-foreground">Riyadh, KSA & Banani, Dhaka</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
