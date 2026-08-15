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
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { sendContactEmail } from "@/lib/emailjs";

export function ContactFormSection() {
  const t = useTranslations("ContactPage");
  const tFooter = useTranslations("Footer");
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    workforceSize: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await sendContactEmail({
      form_type: "Contact Us Inquiry",
      from_name: form.fullName,
      from_email: form.email,
      phone: form.phone,
      company: form.company,
      service_type: form.serviceType,
      workforce_size: form.workforceSize,
      message: form.message,
    });

    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    }
  };

  const resetForm = () => {
    setForm({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      serviceType: "",
      workforceSize: "",
      message: "",
    });
    setSubmitted(false);
  };

  const primaryOffice = siteConfig.offices.saudi || {
    address:
      "Building 3183, Saeed bin Al-Aas Street, Al-Quds District, Riyadh 13214, Kingdom of Saudi Arabia",
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
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">

        {/* Left Column: Interactive Contact Form */}
        <div className="gsap-fade-up w-full md:flex-1 p-6 sm:p-10 rounded-3xl border border-border bg-card shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            {t("formTitle")}
          </h2>

          {submitted ? (
            <div className="py-10 text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                {t("successMsg")}
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors text-sm cursor-pointer"
              >
                <span>{t("sendAnother")}</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("nameLabel")} *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  minLength={2}
                  maxLength={60}
                  autoComplete="name"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder={t("namePlaceholder")}
                  title={t("nameTitle")}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground placeholder:text-muted-foreground/60"
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t("emailLabel")} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    maxLength={100}
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t("emailPlaceholder")}
                    title={t("emailTitle")}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground placeholder:text-muted-foreground/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t("phoneLabel")} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    minLength={8}
                    maxLength={20}
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="^\+?[0-9\s\-()]{8,20}$"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={t("phonePlaceholder")}
                    title={t("phoneTitle")}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground placeholder:text-muted-foreground/60"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("companyLabel")}
                </label>
                <input
                  type="text"
                  name="company"
                  maxLength={100}
                  autoComplete="organization"
                  value={form.company}
                  onChange={handleChange}
                  placeholder={t("companyPlaceholder")}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground placeholder:text-muted-foreground/60"
                />
              </div>

              {/* Service Type + Workforce Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t("serviceTypeLabel")} *
                  </label>
                  <select
                    name="serviceType"
                    required
                    value={form.serviceType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground cursor-pointer"
                  >
                    <option value="" disabled>
                      {t("serviceTypeSelect")}
                    </option>
                    <option value="construction">
                      {t("serviceOptions.construction")}
                    </option>
                    <option value="mep">{t("serviceOptions.mep")}</option>
                    <option value="hospitality">
                      {t("serviceOptions.hospitality")}
                    </option>
                    <option value="facility">
                      {t("serviceOptions.facility")}
                    </option>
                    <option value="logistics">
                      {t("serviceOptions.logistics")}
                    </option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t("workforceSizeLabel")} *
                  </label>
                  <select
                    name="workforceSize"
                    required
                    value={form.workforceSize}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground cursor-pointer"
                  >
                    <option value="" disabled>
                      {t("workforceSizeSelect")}
                    </option>
                    <option value="small">{t("sizeOptions.small")}</option>
                    <option value="medium">{t("sizeOptions.medium")}</option>
                    <option value="large">{t("sizeOptions.large")}</option>
                    <option value="enterprise">
                      {t("sizeOptions.enterprise")}
                    </option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("messageLabel")}
                </label>
                <textarea
                  name="message"
                  rows={5}
                  minLength={10}
                  maxLength={1000}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t("messagePlaceholder")}
                  title={t("messageTitle")}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground placeholder:text-muted-foreground/60 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg hover:bg-primary/90 disabled:opacity-60 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>{t("submitBtn")}</span>
                  </>
                )}
              </button>

              {/* Privacy Note (from main) */}
              <p className="text-center text-[11px] text-muted-foreground">
                {t("privacyNote")}
              </p>

            </form>
          )}
        </div>

        {/* Right Column: Office Address Cards */}
        <div className="w-full md:flex-1 space-y-6">
          {/* Saudi Office Card */}
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
        </div>

      </div>
    </div>
  );
}
