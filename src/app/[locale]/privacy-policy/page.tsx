'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  ShieldCheck,
  Lock,
  FileText,
  UserCheck,
  Building2,
  Database,
  Share2,
  Mail,
  Phone,
  CheckCircle2,
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const params = useParams();
  const locale = (params.locale as string) || 'en';
  const t = useTranslations('PrivacyPolicy');

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/10 via-background/60 to-background pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1050px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            <Lock className="w-3.5 h-3.5 shrink-0 text-primary" />
            <span>{t('badge')}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight text-center">
            {t('privacyTitle')}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t('privacySubtitle')}
          </p>

          <div className="inline-block text-xs font-bold text-primary bg-primary/5 border border-primary/20 px-4 py-1.5 rounded-full mt-2">
            {t('effectiveDate')}
          </div>
        </div>

        {/* Content Container Card */}
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 md:p-12 space-y-10 shadow-sm text-foreground/90 leading-relaxed text-sm sm:text-base">
          
          {/* Section 1: Introduction */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground border-b border-border/60 pb-3">
              {t('sec1Title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('sec1Desc')}
            </p>
          </section>

          {/* Section 2: Information We Collect */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground border-b border-border/60 pb-3">
              {t('sec2Title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* Candidates */}
              <div className="p-5 rounded-2xl bg-muted/30 border border-border/70 space-y-3">
                <div className="flex items-center gap-2 font-bold text-foreground text-base">
                  <UserCheck className="w-5 h-5 text-sky-500 shrink-0" />
                  <span>{t('sec2CandidatesTitle')}</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t('sec2CandidatesDesc')}
                </p>
              </div>

              {/* Employers */}
              <div className="p-5 rounded-2xl bg-muted/30 border border-border/70 space-y-3">
                <div className="flex items-center gap-2 font-bold text-foreground text-base">
                  <Building2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>{t('sec2EmployersTitle')}</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t('sec2EmployersDesc')}
                </p>
              </div>

              {/* Automatically Collected */}
              <div className="p-5 rounded-2xl bg-muted/30 border border-border/70 space-y-3">
                <div className="flex items-center gap-2 font-bold text-foreground text-base">
                  <FileText className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>{t('sec2AutoTitle')}</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t('sec2AutoDesc')}
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: How We Use Your Information */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground border-b border-border/60 pb-3">
              {t('sec3Title')}
            </h2>
            <ul className="space-y-3 pl-2">
              {[
                t('sec3Item1'),
                t('sec3Item2'),
                t('sec3Item3'),
                t('sec3Item4'),
                t('sec3Item5'),
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4: How We Share Your Information */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground border-b border-border/60 pb-3">
              {t('sec4Title')}
            </h2>
            <p className="text-muted-foreground">
              {t('sec4Desc')}
            </p>
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-card border border-border flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <strong className="text-foreground">{t('sec4Item1Title')}:</strong> {t('sec4Item1Desc')}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-card border border-border flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <strong className="text-foreground">{t('sec4Item2Title')}:</strong> {t('sec4Item2Desc')}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-card border border-border flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <strong className="text-foreground">{t('sec4Item3Title')}:</strong> {t('sec4Item3Desc')}
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Data Security & Retention */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground border-b border-border/60 pb-3">
              {t('sec5Title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('sec5Desc')}
            </p>
          </section>

          {/* Section 6: Your Rights & Contact */}
          <section className="space-y-4 border-t border-border/60 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              {t('sec6Title')}
            </h2>
            <p className="text-muted-foreground">
              {t('sec6Desc')}
            </p>

            <div className="p-6 rounded-2xl bg-muted/40 border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-6 mt-4">
              <div className="space-y-2 text-start">
                <p className="flex items-center gap-3 text-sm font-bold text-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>Email: Operations@ffccom.net</span>
                </p>
                <p className="flex items-center gap-3 text-sm font-bold text-foreground">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>Phone: +966 56 616 7562</span>
                </p>
              </div>

              <Link
                href={`/${locale}/contact#get-in-touch`}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-xs px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-sm shrink-0"
              >
                <span>{t('contactBtn')}</span>
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
