'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Building2, Menu, X, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { cn } from '@/lib/utils';

export function Navbar() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 group"
          >
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-md shadow-primary/25 transition-transform group-hover:scale-105">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-foreground flex items-center gap-1.5">
                {siteConfig.name}
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-primary flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-sky-500" />
                Govt. Lic: {siteConfig.license}
              </span>
            </div>
          </Link>

          {/* Centered Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 rtl:space-x-reverse">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.key}
                href={`/${locale}${link.href}`}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          {/* Right Actions: Language Dropdown + Slider Theme Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            <LanguageSwitcher />
            <ThemeToggle />

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-300">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.key}
              href={`/${locale}${link.href}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {t(link.key)}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
