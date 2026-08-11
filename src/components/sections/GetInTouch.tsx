'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

import { sendContactEmail } from '@/lib/emailjs';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function GetInTouch() {
  const t = useTranslations('GetInTouch');
  const containerRef = React.useRef<HTMLDivElement>(null);
  const leftColRef = React.useRef<HTMLDivElement>(null);
  const rightColRef = React.useRef<HTMLDivElement>(null);

  const [formState, setFormState] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceType: '',
    workforceSize: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await sendContactEmail({
      form_type: 'Get In Touch / Manpower Request',
      from_name: formState.fullName,
      from_email: formState.email,
      phone: formState.phone,
      company: formState.company,
      service_type: formState.serviceType,
      workforce_size: formState.workforceSize,
      message: formState.message,
    });

    setIsSubmitting(false);
    if (result.success) {
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setFormState({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      serviceType: '',
      workforceSize: '',
      message: '',
    });
    setIsSubmitted(false);
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  const contactCards = [
    {
      icon: MapPin,
      title: t('contactInfo.addressTitle'),
      value: t('contactInfo.address'),
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      icon: Phone,
      title: t('contactInfo.phoneTitle'),
      value: t('contactInfo.phone'),
      color: 'bg-emerald-500/10 text-emerald-500',
    },
    {
      icon: Mail,
      title: t('contactInfo.emailTitle'),
      value: t('contactInfo.email'),
      color: 'bg-amber-500/10 text-amber-500',
    },
    {
      icon: Clock,
      title: t('contactInfo.hoursTitle'),
      value: t('contactInfo.hours'),
      color: 'bg-purple-500/10 text-purple-500',
    },
  ];

  return (
    <section
      id="get-in-touch"
      ref={containerRef}
      className="pt-12 md:pt-16 lg:pt-20 pb-6 md:pb-8 lg:pb-10 bg-muted/20 border-t border-border/60 relative overflow-hidden"
    >
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                <Send className="w-3.5 h-3.5 shrink-0 text-primary" />
                <span>{t('tagline')}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                {t('heading')}
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t('subheading')}
              </p>
            </div>

            {/* Response SLA Badge */}
            <div className="p-4 rounded-2xl bg-card border border-border shadow-sm flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-extrabold text-emerald-500">
                  {t('badgeSla')}
                </p>
                <p className="text-xs text-muted-foreground">
                  Our team reviews & responds to proposals on the same day.
                </p>
              </div>
            </div>

            {/* Contact Details List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 pt-2">
              {contactCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-card border border-border/80 shadow-sm hover:shadow-md transition-all flex items-start space-x-4 rtl:space-x-reverse group"
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                        {card.title}
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-foreground break-words">
                        {card.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Floating Form Card */}
          <div ref={rightColRef} className="lg:col-span-7">
            <div className="bg-card border border-border rounded-3xl p-5 sm:p-7 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
              {/* Header Decorative Accent */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

              {isSubmitted ? (
                /* Success Message */
                <div className="py-12 text-center space-y-6 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      {t('form.successTitle')}
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
                      {t('form.successMessage')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-md text-sm cursor-pointer"
                  >
                    <span>{t('form.sendAnother')}</span>
                  </button>
                </div>
              ) : (
                /* Proposal Request Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-foreground tracking-tight">
                      {t('form.title')}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {t('form.subtitle')}
                    </p>
                  </div>

                  {/* Row 1: Full Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                        {t('form.fullNameLabel')} *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formState.fullName}
                        onChange={handleChange}
                        placeholder={t('form.fullNamePlaceholder')}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                        {t('form.emailLabel')} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        placeholder={t('form.emailPlaceholder')}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone + Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                        {t('form.phoneLabel')} *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder={t('form.phonePlaceholder')}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                        {t('form.companyLabel')}
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        placeholder={t('form.companyPlaceholder')}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service Type + Workforce Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                        {t('form.serviceTypeLabel')} *
                      </label>
                      <select
                        name="serviceType"
                        required
                        value={formState.serviceType}
                        onChange={handleChange}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 cursor-pointer"
                      >
                        <option value="" disabled>
                          {t('form.serviceTypeSelect')}
                        </option>
                        <option value="construction">
                          {t('form.serviceOptions.construction')}
                        </option>
                        <option value="mep">
                          {t('form.serviceOptions.mep')}
                        </option>
                        <option value="hospitality">
                          {t('form.serviceOptions.hospitality')}
                        </option>
                        <option value="facility">
                          {t('form.serviceOptions.facility')}
                        </option>
                        <option value="logistics">
                          {t('form.serviceOptions.logistics')}
                        </option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                        {t('form.workforceSizeLabel')} *
                      </label>
                      <select
                        name="workforceSize"
                        required
                        value={formState.workforceSize}
                        onChange={handleChange}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 cursor-pointer"
                      >
                        <option value="" disabled>
                          {t('form.workforceSizeSelect')}
                        </option>
                        <option value="small">{t('form.sizeOptions.small')}</option>
                        <option value="medium">{t('form.sizeOptions.medium')}</option>
                        <option value="large">{t('form.sizeOptions.large')}</option>
                        <option value="enterprise">{t('form.sizeOptions.enterprise')}</option>
                      </select>
                    </div>
                  </div>

                  {/* Message / Project Details */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                      {t('form.messageLabel')}
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      placeholder={t('form.messagePlaceholder')}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground font-bold px-6 py-4 rounded-xl shadow-lg hover:shadow-primary/25 hover:bg-primary/90 active:scale-[0.99] transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        <span>{t('form.submitting')}</span>
                      </span>
                    ) : (
                      <>
                        <span>{t('form.submitButton')}</span>
                        <Send className="w-4 h-4 rtl:-scale-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
