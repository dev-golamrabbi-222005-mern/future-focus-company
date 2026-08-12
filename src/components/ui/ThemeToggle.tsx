'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@/providers/ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const t = useTranslations('CommonUI');
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-16 h-8 rounded-full bg-muted border border-border flex items-center px-1 animate-pulse" />
    );
  }

  const isDark = (resolvedTheme || theme) === 'dark';

  return (
    <button
      type="button"
      dir="ltr"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={t('toggleTheme')}
      className={cn(
        'relative inline-flex h-8 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 select-none',
        isDark ? 'bg-slate-800' : 'bg-slate-200'
      )}
    >
      <span className="sr-only">{t('toggleTheme')}</span>
      
      {/* Sun & Moon background icons */}
      <span className="absolute inset-0 flex items-center justify-between px-1.5 text-xs text-muted-foreground pointer-events-none">
        <Sun className={cn("h-3.5 w-3.5 transition-opacity", isDark ? "opacity-40 text-amber-400" : "opacity-0")} />
        <Moon className={cn("h-3.5 w-3.5 transition-opacity", isDark ? "opacity-0" : "opacity-40 text-indigo-500")} />
      </span>

      {/* Slider Button */}
      <span
        className={cn(
          'pointer-events-none relative inline-block h-7 w-7 transform rounded-full bg-white dark:bg-slate-950 shadow-md ring-0 transition duration-300 ease-in-out flex items-center justify-center',
          isDark ? 'translate-x-8' : 'translate-x-0'
        )}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-sky-400" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-amber-500" />
        )}
      </span>
    </button>
  );
}
