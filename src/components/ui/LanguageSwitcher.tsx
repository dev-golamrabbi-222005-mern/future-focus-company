'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const t = useTranslations('Language');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', label: t('en'), flag: '🇬🇧' },
    { code: 'bn', label: t('bn'), flag: '🇧🇩' },
    { code: 'ar', label: t('ar'), flag: '🇦🇪' },
  ];

  // Close dropdown on click outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    setIsOpen(false);
    if (newLocale === locale) return;

    // Replace current locale prefix in pathname
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/') || `/${newLocale}`;

    router.push(newPath);
  };

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-border bg-card hover:bg-muted text-foreground transition-all duration-200 shadow-sm"
      >
        <Globe className="h-3.5 w-3.5 text-primary" />
        <span>{currentLang.flag}</span>
        <span className="uppercase">{currentLang.code}</span>
        <ChevronDown className={cn("h-3 w-3 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-36 rounded-xl border border-border bg-card shadow-xl ring-1 ring-black/5 z-50 py-1 backdrop-blur-md">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleLanguageChange(lang.code)}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors text-left rtl:text-right',
                lang.code === locale
                  ? 'bg-primary/10 text-primary font-bold'
                  : 'text-foreground hover:bg-muted'
              )}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
