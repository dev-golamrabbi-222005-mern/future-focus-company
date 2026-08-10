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
    className="space-y-5"
  >
    {/* Full Name */}
    <div className="space-y-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {t("nameLabel")}
      </label>

      <input
        type="text"
        name="name"
        required
        minLength={2}
        maxLength={60}
        autoComplete="name"
        placeholder="Enter your full name"
        title="Name must be between 2 and 60 characters"
        className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground placeholder:text-muted-foreground/60"
      />

      <p className="text-[11px] text-muted-foreground">
        2–60 characters
      </p>
    </div>

    {/* Email & Phone */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

      {/* Email */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {t("emailLabel")}
        </label>

        <input
          type="email"
          name="email"
          required
          maxLength={100}
          autoComplete="email"
          placeholder="name@company.com"
          title="Please enter a valid email address"
          className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground placeholder:text-muted-foreground/60"
        />

        <p className="text-[11px] text-muted-foreground">
          Please enter a valid email address
        </p>
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {t("phoneLabel")}
        </label>

        <input
          type="tel"
          name="phone"
          required
          minLength={8}
          maxLength={20}
          autoComplete="tel"
          inputMode="tel"
          placeholder="+966 5X XXX XXXX"
          pattern="^\+?[0-9\s\-()]{8,20}$"
          title="Please enter a valid phone number"
          className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground placeholder:text-muted-foreground/60"
        />

        <p className="text-[11px] text-muted-foreground">
          8–20 digits
        </p>
      </div>
    </div>

    {/* Subject */}
    <div className="space-y-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {t("subjectLabel")}
      </label>

      <input
        type="text"
        name="subject"
        required
        minLength={5}
        maxLength={120}
        placeholder="Manpower Requirement / Business Inquiry"
        title="Subject must be between 5 and 120 characters"
        className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground placeholder:text-muted-foreground/60"
      />

      <p className="text-[11px] text-muted-foreground">
        5–120 characters
      </p>
    </div>

    {/* Message */}
    <div className="space-y-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {t("messageLabel")}
      </label>

      <textarea
        name="message"
        rows={5}
        required
        minLength={10}
        maxLength={1000}
        placeholder="Please describe your manpower requirements, job categories, workforce quantity, and deployment timeline..."
        title="Message must be between 20 and 1000 characters"
        className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground placeholder:text-muted-foreground/60 resize-none"
      />

      <div className="flex justify-between items-center">
        <p className="text-[11px] text-muted-foreground">
          10–1000 characters
        </p>

        <p className="text-[11px] text-muted-foreground">
          Detailed requirements are preferred
        </p>
      </div>
    </div>

    {/* Submit */}
    <button
      type="submit"
      className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
    >
      <Send className="h-4 w-4" />
      <span>{t("submitBtn")}</span>
    </button>

    {/* Privacy Note */}
    <p className="text-center text-[11px] text-muted-foreground">
      Your information will be kept confidential and used only to respond to your inquiry.
    </p>
  </form>
)}

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
