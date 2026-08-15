"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Upload, FileText, CheckCircle2, Send, User } from "lucide-react";
import { sendCvEmail, fileToBase64 } from "@/lib/emailjs";

export function SubmitCvSection() {
  const t = useTranslations("SubmitCvPage");
  const tCommon = useTranslations("CommonUI");
  const tCountries = useTranslations("Countries");
  const tTrades = useTranslations("Trades");
  const tExperience = useTranslations("Experience");
  const [cvSubmitted, setCvSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    passport: "",
    trade: "",
    expYears: "",
  });

  const [cvFileName, setCvFileName] = React.useState("");
  const [cvBase64, setCvBase64] = React.useState("");
  const [passportFileName, setPassportFileName] = React.useState("");
  const [passportBase64, setPassportBase64] = React.useState("");

  const cvInputRef = React.useRef<HTMLInputElement>(null);
  const passportInputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleCvFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFileName(file.name);
      try {
        setCvBase64(await fileToBase64(file));
      } catch (err) {
        console.error("CV conversion error:", err);
      }
    }
  };

  const handlePassportFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setPassportFileName(file.name);
      try {
        setPassportBase64(await fileToBase64(file));
      } catch (err) {
        console.error("Passport conversion error:", err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await sendCvEmail({
      form_type: "Candidate CV Portal Submission",
      candidate_name: form.fullName,
      email: form.email,
      phone: form.phone,
      nationality: form.nationality,
      passport_no: form.passport,
      trade: form.trade,
      experience_years: form.expYears,
      cv_file_name: cvFileName || "Not attached",
      cv_attachment: cvBase64 || "",
      passport_file_name: passportFileName || "Not attached",
      passport_attachment: passportBase64 || "",
    });

    setLoading(false);
    if (result.success) setCvSubmitted(true);
  };

  return (
    <section id="submit-cv" className="py-12 md:py-16 lg:py-20 bg-muted/15 border-y border-border/60">
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
        <div className="max-w-3xl mx-auto gsap-fade-up">
          <div className="p-8 sm:p-12 rounded-3xl border border-border bg-card shadow-xl space-y-8">
            
            {/* Form Header */}
            <div className="flex items-center gap-4 pb-5 border-b border-border/60">
              <div className="p-3.5 rounded-xl bg-primary/10 text-primary">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-foreground">{t("formTitle")}</h3>
                <p className="mt-1 text-xs text-muted-foreground font-medium">{tCommon("bmetPortalBadge")}</p>
              </div>
            </div>

            {cvSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-center space-y-4">
                <CheckCircle2 className="h-12 w-12 mx-auto animate-bounce" />
                <h4 className="text-2xl font-extrabold">{tCommon("appSubmitted")}</h4>
                <p className="text-sm font-semibold max-w-md mx-auto text-foreground/90">
                  {t("successMessage")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">

                {/* Personal Information */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{t("personalInformation")}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{t("personalInformationDesc")}</p>
                  </div>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t("fullName")} <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      minLength={2}
                      maxLength={60}
                      autoComplete="name"
                      placeholder={t("namePlaceholder")}
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {t("email")} <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        maxLength={100}
                        autoComplete="email"
                        placeholder={t("emailPlaceholder")}
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {t("phone")} <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        minLength={8}
                        maxLength={20}
                        autoComplete="tel"
                        placeholder={t("phonePlaceholder")}
                        pattern="[+]?[0-9\s\-()]{8,20}"
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                      />
                    </div>
                  </div>

                  {/* Nationality + Passport */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {t("nationality")} <span className="text-destructive">*</span>
                      </label>
                      <select
                        name="nationality"
                        value={form.nationality}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                      >
                        <option value="">{tCommon("selectCountry")}</option>
                        <option value="bangladesh">{tCountries("bangladesh")}</option>
                        <option value="india">{tCountries("india")}</option>
                        <option value="pakistan">{tCountries("pakistan")}</option>
                        <option value="nepal">{tCountries("nepal")}</option>
                        <option value="philippines">{tCountries("philippines")}</option>
                        <option value="indonesia">{tCountries("indonesia")}</option>
                        <option value="uganda">{tCountries("uganda")}</option>
                        <option value="sudan">{tCountries("sudan")}</option>
                        <option value="ethiopia">{tCountries("ethiopia")}</option>
                        <option value="sri-lanka">{tCountries("sriLanka")}</option>
                        <option value="other">{tCommon("other")}</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {t("passport")} <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        name="passport"
                        value={form.passport}
                        onChange={handleChange}
                        required
                        minLength={6}
                        maxLength={20}
                        autoComplete="off"
                        placeholder={t("passportPlaceholder")}
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground uppercase"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-4 pt-2">
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{t("professionalInformation")}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{t("professionalInformationDesc")}</p>
                  </div>

                  {/* Trade + Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {t("trade")} <span className="text-destructive">*</span>
                      </label>
                      <select
                        name="trade"
                        value={form.trade}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                      >
                        <option value="">{tCommon("selectCategory")}</option>
                        <option value="electrician">{tTrades("electrician")}</option>
                        <option value="welder">{tTrades("welder")}</option>
                        <option value="plumber">{tTrades("plumber")}</option>
                        <option value="mason">{tTrades("mason")}</option>
                        <option value="steel-fixer">{tTrades("steelFixer")}</option>
                        <option value="hvac">{tTrades("hvac")}</option>
                        <option value="driver">{tTrades("driver")}</option>
                        <option value="cook">{tTrades("cook")}</option>
                        <option value="cleaner">{tTrades("cleaner")}</option>
                        <option value="general-helper">{tTrades("generalHelper")}</option>
                        <option value="other">{tTrades("otherTrade")}</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {t("expYears")} <span className="text-destructive">*</span>
                      </label>
                      <select
                        name="expYears"
                        value={form.expYears}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                      >
                        <option value="">{tCommon("selectExperience")}</option>
                        <option value="0-1">{tExperience("years0_1")}</option>
                        <option value="1-3">{tCommon("years1_3")}</option>
                        <option value="3-5">{tCommon("years3_5")}</option>
                        <option value="5-10">{tExperience("years5_10")}</option>
                        <option value="5+">{tCommon("years5Plus")}</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="space-y-4 pt-2">
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{t("requiredDocuments")}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{t("requiredDocumentsDesc")}</p>
                  </div>

                  {/* CV Upload */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t("uploadCv")} <span className="text-destructive">*</span>
                    </label>
                    <label
                      htmlFor="cv-upload-input"
                      className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 bg-muted/20 transition-colors text-center cursor-pointer"
                    >
                      <Upload className="h-8 w-8 text-primary" />
                      <p className="text-xs font-semibold text-foreground">
                        {cvFileName ? `${tCommon("attached")}${cvFileName}` : tCommon("uploadResume")}
                      </p>
                      <input
                        id="cv-upload-input"
                        type="file"
                        ref={cvInputRef}
                        onChange={handleCvFileChange}
                        required
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Passport Upload */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t("uploadPassport")} <span className="text-destructive">*</span>
                    </label>
                    <label
                      htmlFor="passport-upload-input"
                      className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 bg-muted/20 transition-colors text-center cursor-pointer"
                    >
                      <FileText className="h-8 w-8 text-accent" />
                      <p className="text-xs font-semibold text-foreground">
                        {passportFileName ? `${tCommon("attached")}${passportFileName}` : tCommon("uploadPassport")}
                      </p>
                      <input
                        id="passport-upload-input"
                        type="file"
                        ref={passportInputRef}
                        onChange={handlePassportFileChange}
                        required
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-xl hover:bg-primary/90 disabled:opacity-60 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>{t("submitApplication")}</span>
                    </>
                  )}
                </button>

              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
