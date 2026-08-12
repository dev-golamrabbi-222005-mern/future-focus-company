'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Scale,
  ShieldCheck,
  FileText,
  UserCheck,
  Building2,
  AlertOctagon,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
} from 'lucide-react';

export function TermsOfServiceClient() {
  const params = useParams();
  const locale = (params.locale as string) || 'en';
  const t = useTranslations('TermsOfService');
  const tCommon = useTranslations('CommonUI');

  return (
    <div className="min-h-screen pt-6 md:pt-8 lg:pt-10 pb-6 md:pb-8 lg:pb-10 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1050px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            <Scale className="w-3.5 h-3.5 shrink-0 text-primary" />
            <span>{t('badge')}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight text-center">
            {t('termsTitle')}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t('termsSubtitle')}
          </p>

          <div className="inline-block text-xs font-bold text-primary bg-primary/5 border border-primary/20 px-4 py-1.5 rounded-full mt-2">
            {t('effectiveDate')}
          </div>
        </div>

        {/* Content Container Card */}
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 md:p-12 space-y-10 shadow-sm text-foreground/90 leading-relaxed text-sm sm:text-base">

          {/* Section 1: Acceptance of Terms */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground border-b border-border/60 pb-3">
              {t('sec1Title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('sec1Desc')}
            </p>
          </section>

          {/* Section 2: Services Provided */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground border-b border-border/60 pb-3">
              {t('sec2Title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('sec2Desc')}
            </p>
          </section>

          {/* Section 3: Terms for Candidates */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground border-b border-border/60 pb-3">
              {t('sec3Title')}
            </h2>
            <div className="space-y-4 pt-1">
              <div className="p-5 rounded-2xl bg-muted/30 border border-border/70 space-y-2">
                <h3 className="font-bold text-foreground text-base">
                  • {t('sec3Item1Title')}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t('sec3Item1Desc')}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-muted/30 border border-border/70 space-y-2">
                <h3 className="font-bold text-foreground text-base">
                  • {t('sec3Item2Title')}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t('sec3Item2Desc')}
                </p>
              </div>

              {/* Anti-Fraud Banner Highlight */}
              <div className="p-5 rounded-2xl bg-primary/10 border border-primary/30 space-y-2 text-primary">
                <div className="flex items-center gap-2 font-bold text-base">
                  <AlertOctagon className="w-5 h-5 shrink-0" />
                  <span>{t('sec3Item3Title')}</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-foreground/90 font-medium">
                  {t('sec3Item3Desc')}
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Terms for Employers */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground border-b border-border/60 pb-3">
              {t('sec4Title')}
            </h2>
            <div className="space-y-4 pt-1">
              <div className="p-5 rounded-2xl bg-muted/30 border border-border/70 space-y-2">
                <h3 className="font-bold text-foreground text-base">
                  • {t('sec4Item1Title')}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t('sec4Item1Desc')}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-muted/30 border border-border/70 space-y-2">
                <h3 className="font-bold text-foreground text-base">
                  • {t('sec4Item2Title')}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t('sec4Item2Desc')}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <h3 className="font-bold text-emerald-600 dark:text-emerald-400 text-base flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <span>{t('sec4Item3Title')}</span>
                </h3>
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-medium">
                  {t('sec4Item3Desc')}
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Website Usage & Intellectual Property */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground border-b border-border/60 pb-3">
              {t('sec5Title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('sec5Desc')}
            </p>
          </section>

          {/* Section 6: Limitation of Liability */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground border-b border-border/60 pb-3">
              {t('sec6Title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('sec6Desc')}
            </p>
          </section>

          {/* Section 7: Governing Law */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground border-b border-border/60 pb-3">
              {t('sec7Title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('sec7Desc')}
            </p>
          </section>

          {/* Section 8: Contact Information */}
          <section className="space-y-4 border-t border-border/60 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              {t('sec8Title')}
            </h2>
            <p className="text-muted-foreground">
              {t('sec8Desc')}
            </p>

            <div className="p-6 rounded-2xl bg-muted/40 border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-6 mt-4">
              <div className="space-y-2 text-start">
                <p className="flex items-center gap-3 text-sm font-bold text-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>{tCommon('emailLabel')}: Operations@ffccom.net</span>
                </p>
                <p className="flex items-center gap-3 text-sm font-bold text-foreground">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{tCommon('phoneLabel')}: +966 56 616 7562</span>
                </p>
              </div>

              <Link
                href={`/${locale}/contact#get-in-touch`}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-xs px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-sm shrink-0"
              >
                <span>{t('inquireBtn')}</span>
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
