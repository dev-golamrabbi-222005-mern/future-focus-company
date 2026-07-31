'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Send, CheckCircle2, Building2 } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function ContactFormSection() {
  const t = useTranslations('ContactPage');
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <div className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: Interactive Contact Form */}
        <div className="gsap-fade-up p-8 sm:p-10 rounded-3xl border border-border bg-card shadow-lg space-y-6">
          <h2 className="text-2xl font-extrabold text-foreground">{t('formTitle')}</h2>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 mt-0.5" />
              <p className="text-sm font-semibold">{t('successMsg')}</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t('nameLabel')}
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
                    {t('emailLabel')}
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
                    {t('phoneLabel')}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 50 123 4567"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t('subjectLabel')}
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
                  {t('messageLabel')}
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
                <span>{t('submitBtn')}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Office Address Cards & Map */}
        <div className="space-y-6">
          
          {/* Dubai Office Card */}
          <div className="gsap-fade-up p-8 rounded-3xl border border-border bg-card shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-extrabold text-foreground">{t('dubaiTitle')}</h3>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-1" />
                <span>{siteConfig.offices.dubai.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>{siteConfig.offices.dubai.phone}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>{siteConfig.offices.dubai.email}</span>
              </p>
            </div>
          </div>

          {/* Dhaka Office Card */}
          <div className="gsap-fade-up p-8 rounded-3xl border border-border bg-card shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-accent/10 text-accent">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-extrabold text-foreground">{t('bdTitle')}</h3>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-accent shrink-0 mt-1" />
                <span>{siteConfig.offices.bangladesh.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <span>{siteConfig.offices.bangladesh.phone}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <span>{siteConfig.offices.bangladesh.email}</span>
              </p>
            </div>
          </div>

          {/* Google Maps Embed Mock */}
          <div className="gsap-fade-up rounded-3xl overflow-hidden border border-border bg-muted/40 h-52 relative flex items-center justify-center p-4 text-center">
            <div className="space-y-2">
              <MapPin className="h-8 w-8 text-primary mx-auto animate-bounce" />
              <p className="text-sm font-bold text-foreground">Interactive Google Maps Location</p>
              <p className="text-xs text-muted-foreground">Business Bay Tower, Dubai & Banani, Dhaka</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
