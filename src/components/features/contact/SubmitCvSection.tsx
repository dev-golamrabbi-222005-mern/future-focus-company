"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Upload, FileText, CheckCircle2, Send, User } from "lucide-react";

export function SubmitCvSection() {
  const t = useTranslations("SubmitCvPage");
  const tCommon = useTranslations("CommonUI");
  const [cvSubmitted, setCvSubmitted] = React.useState(false);

  return (
    <section
      id="submit-cv"
      className="pt-12 md:pt-16 border-t border-border/60"
    >
      <div className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16 gsap-fade-up">
          <div className="mb-6 flex justify-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              {t("tagline")}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4">
            {t("heading")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("subheading")}
          </p>
        </div>

        {/* Application Form */}

        <div className="space-y-6">
          {/* Form Header */}
          <div className="flex items-center gap-4 pb-5 border-b border-border/60">
            <div className="p-3.5 rounded-xl bg-primary/10 text-primary">
              <User className="h-6 w-6" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-foreground">
                {t("formTitle")}
              </h3>

              <p className="mt-1 text-xs text-muted-foreground font-medium">
                {tCommon("bmetPortalBadge")}
              </p>
            </div>
          </div>

          {/* Success Message */}
          {cvSubmitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
              <CheckCircle2 className="h-12 w-12 mx-auto text-emerald-500" />

              <h4 className="text-2xl font-extrabold text-emerald-600">
                {tCommon("appSubmitted")}
              </h4>

              <p className="text-sm font-semibold max-w-md mx-auto text-foreground/80">
                {t("successMessage")}
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setCvSubmitted(true);
              }}
              className="space-y-6"
            >
              {/* Personal Information */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    {t("personalInformation")}
                  </h4>

                  <p className="text-xs text-muted-foreground mt-1">
                    {t("personalInformationDesc")}
                  </p>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t("fullName")} <span className="text-destructive">*</span>
                  </label>

                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={60}
                    placeholder="Md. Rahim Uddin"
                    autoComplete="name"
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                  />

                  <p className="text-[11px] text-muted-foreground">
                    {t("fullNameHint")}
                  </p>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t("email")} <span className="text-destructive">*</span>
                    </label>

                    <input
                      type="email"
                      required
                      maxLength={100}
                      placeholder="name@example.com"
                      autoComplete="email"
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t("phone")} <span className="text-destructive">*</span>
                    </label>

                    <input
                      type="tel"
                      required
                      minLength={8}
                      maxLength={20}
                      placeholder="+880 1712 345678"
                      autoComplete="tel"
                      pattern="[+]?[0-9\s()-]{8,20}"
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                    />
                  </div>
                </div>

                {/* Nationality + Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Nationality */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t("nationality")}{" "}
                      <span className="text-destructive">*</span>
                    </label>

                    <select
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                    >
                      <option value="">{tCommon("selectCountry")}</option>

                      <option value="bangladesh">Bangladesh</option>
                      <option value="india">India</option>
                      <option value="pakistan">Pakistan</option>
                      <option value="nepal">Nepal</option>
                      <option value="philippines">Philippines</option>
                      <option value="indonesia">Indonesia</option>
                      <option value="uganda">Uganda</option>
                      <option value="sudan">Sudan</option>
                      <option value="ethiopia">Ethiopia</option>
                      <option value="sri-lanka">Sri Lanka</option>
                      <option value="other">{tCommon("other")}</option>
                    </select>
                  </div>

                  {/* Current Location */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t("currentLocation")}{" "}
                      <span className="text-destructive">*</span>
                    </label>

                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={80}
                      placeholder="Dhaka, Bangladesh"
                      autoComplete="address-level2"
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4 pt-2">
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    {t("professionalInformation")}
                  </h4>

                  <p className="text-xs text-muted-foreground mt-1">
                    {t("professionalInformationDesc")}
                  </p>
                </div>

                {/* Trade + Experience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Trade */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t("trade")} <span className="text-destructive">*</span>
                    </label>

                    <select
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                    >
                      <option value="">{tCommon("selectCategory")}</option>

                      <option value="electrician">Electrician</option>
                      <option value="welder">Welder</option>
                      <option value="plumber">Plumber</option>
                      <option value="mason">Mason</option>
                      <option value="steel-fixer">Steel Fixer</option>
                      <option value="hvac">HVAC Technician</option>
                      <option value="driver">Driver</option>
                      <option value="cook">Cook</option>
                      <option value="cleaner">Cleaner</option>
                      <option value="general-helper">General Helper</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Experience */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t("expYears")}{" "}
                      <span className="text-destructive">*</span>
                    </label>

                    <select
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                    >
                      <option value="">{tCommon("selectExperience")}</option>

                      <option value="0-1">0–1 Years</option>
                      <option value="1-3">1–3 Years</option>
                      <option value="3-5">3–5 Years</option>
                      <option value="5-10">5–10 Years</option>
                      <option value="10+">10+ Years</option>
                    </select>
                  </div>
                </div>

                {/* Passport */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t("passport")} <span className="text-destructive">*</span>
                  </label>

                  <input
                    type="text"
                    required
                    minLength={6}
                    maxLength={20}
                    placeholder="A01234567"
                    autoComplete="off"
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground uppercase"
                  />

                  <p className="text-[11px] text-muted-foreground">
                    {t("passportHint")}
                  </p>
                </div>
              </div>

              {/* Documents */}
              <div className="space-y-4 pt-2">
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    {t("requiredDocuments")}
                  </h4>

                  <p className="text-xs text-muted-foreground mt-1">
                    {t("requiredDocumentsDesc")}
                  </p>
                </div>

                {/* CV Upload */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t("uploadCv")} <span className="text-destructive">*</span>
                  </label>

                  <label
                    htmlFor="cv-upload-component"
                    className="block p-6 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 bg-muted/20 transition-colors text-center cursor-pointer"
                  >
                    <Upload className="h-8 w-8 text-primary mx-auto mb-2" />

                    <p className="text-xs font-semibold text-foreground">
                      {tCommon("uploadResume")}
                    </p>

                    <p className="text-[11px] text-muted-foreground mt-1">
                      PDF, DOC or DOCX • Max 5MB
                    </p>

                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      id="cv-upload-component"
                    />
                  </label>
                </div>

                {/* Passport Upload */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t("uploadPassport")}{" "}
                    <span className="text-destructive">*</span>
                  </label>

                  <label
                    htmlFor="passport-upload-component"
                    className="block p-6 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 bg-muted/20 transition-colors text-center cursor-pointer"
                  >
                    <FileText className="h-8 w-8 text-accent mx-auto mb-2" />

                    <p className="text-xs font-semibold text-foreground">
                      {tCommon("uploadPassport")}
                    </p>

                    <p className="text-[11px] text-muted-foreground mt-1">
                      PDF, JPG or PNG • Max 5MB
                    </p>

                    <input
                      type="file"
                      required
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      id="passport-upload-component"
                    />
                  </label>
                </div>
              </div>

              {/* Consent */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/60">
                <input
                  type="checkbox"
                  required
                  id="application-consent"
                  className="mt-1 h-4 w-4 accent-primary"
                />

                <label
                  htmlFor="application-consent"
                  className="text-xs leading-relaxed text-muted-foreground cursor-pointer"
                >
                  {t("applicationConsent")}
                  <span className="text-destructive"> *</span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />

                <span>{t("submitApplication")}</span>
              </button>

              {/* Privacy Note */}
              <p className="text-center text-[11px] text-muted-foreground leading-relaxed">
                {t("privacyNote")}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
