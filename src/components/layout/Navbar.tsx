'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { cn } from '@/lib/utils';

export function Navbar() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Helper to determine active link
  const isLinkActive = (href: string) => {
    const targetPath = `/${locale}${href}`;
    if (href === '') {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname === targetPath || pathname.startsWith(`${targetPath}/`);
  };

  return (
    <header className="glass-nav sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 group"
          >
            <div className="relative h-10 w-10 rounded-xl overflow-hidden shadow-md shadow-primary/25 transition-transform group-hover:scale-105 border border-border shrink-0">
              <Image
                src="/logo.jpg"
                alt={siteConfig.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-foreground flex items-center gap-1.5">
                {t('companyName')}
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-primary flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-sky-500" />
                Govt. Lic: {siteConfig.license}
              </span>
            </div>
          </Link>

          {/* Centered Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 rtl:space-x-reverse">
            {siteConfig.navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.key}
                  href={`/${locale}${link.href}`}
                  className={cn(
                    'px-3.5 py-2 rounded-lg text-sm transition-all duration-200 relative',
                    active
                      ? 'bg-primary/10 text-primary font-bold border border-primary/20 shadow-xs'
                      : 'font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  )}
                >
                  {t(link.key)}
                </Link>
              );
            })}
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
          {siteConfig.navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.key}
                href={`/${locale}${link.href}`}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block px-4 py-3 rounded-lg text-base transition-colors',
                  active
                    ? 'bg-primary/15 text-primary font-bold border-l-4 border-primary'
                    : 'font-medium text-foreground hover:bg-primary/10 hover:text-primary'
                )}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
