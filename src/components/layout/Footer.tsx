'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Building2, MapPin, Phone, Mail, ShieldCheck, Share2, Globe, Send, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navigation');
  const locale = useLocale();

  return (
    <footer className="border-t border-border bg-card text-card-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-border/60">
          
          {/* Column 1: Agency Brand & Govt License */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-md">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-foreground">
                {siteConfig.name}
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('tagline')}
            </p>

            <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 text-xs text-primary font-semibold flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{t('license')}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-foreground tracking-wide uppercase">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2.5">
              {siteConfig.navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info (Dubai & Bangladesh Offices) */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-foreground tracking-wide uppercase">
              {t('dubaiOffice')}
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{t('dubaiAddress')}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>{siteConfig.offices.dubai.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>{siteConfig.offices.dubai.email}</span>
              </p>
            </div>

            <h3 className="text-base font-bold text-foreground tracking-wide uppercase pt-2">
              {t('bdOffice')}
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{t('bdAddress')}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>{siteConfig.offices.bangladesh.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>{siteConfig.offices.bangladesh.email}</span>
              </p>
            </div>
          </div>

          {/* Column 4: Social Media */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-foreground tracking-wide uppercase">
              Connect With Us
            </h3>
            <p className="text-sm text-muted-foreground">
              Follow our official channels for the latest recruitment drives and job announcements.
            </p>
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg border border-border bg-muted/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg border border-border bg-muted/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href={siteConfig.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg border border-border bg-muted/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                aria-label="Twitter"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/97141234567"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg border border-border bg-muted/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                aria-label="WhatsApp"
              >
                <MessageSquare className="h-4 w-4" />
              </a>

              {/* Website */}
              <a
                href="https://globalmanpower.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg border border-border bg-muted/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                aria-label="Website"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {siteConfig.name}. {t('rights')}</p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale}#privacy`} className="hover:text-foreground transition-colors">
              {t('privacy')}
            </Link>
            <Link href={`/${locale}#terms`} className="hover:text-foreground transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
