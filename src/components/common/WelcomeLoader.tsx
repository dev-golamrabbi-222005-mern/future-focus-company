'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck } from 'lucide-react';

export function WelcomeLoader() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const [visible, setVisible] = React.useState(false);
  const [themeMode, setThemeMode] = React.useState<'dark' | 'light'>('dark');

  React.useEffect(() => {
    // Check session storage to show only once per browser session
    const hasBeenShown = sessionStorage.getItem('ffc_welcome_shown');
    if (hasBeenShown) {
      return;
    }

    // Auto-detect browser/system theme preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setThemeMode('dark');
    } else if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
      setThemeMode('light');
    }

    setVisible(true);

    // Auto dismiss loader after 2.2 seconds and save session flag
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('ffc_welcome_shown', 'true');
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  // Language auto-detection text
  const getGreeting = () => {
    if (locale === 'bn' || (typeof navigator !== 'undefined' && navigator.language?.startsWith('bn'))) {
      return {
        welcome: 'ফিউচার ফোকাস কোম্পানিতে স্বাগতম',
        motto: 'আপনার এইচআর পার্টনার ও সলিউশনস',
      };
    }
    if (locale === 'ar' || (typeof navigator !== 'undefined' && navigator.language?.startsWith('ar'))) {
      return {
        welcome: 'مرحباً بكم في شركة فيوتشر فوكس',
        motto: 'شريككم في الموارد البشرية والحلول',
      };
    }
    return {
      welcome: 'Welcome to Future Focus Company',
      motto: 'Your HR Partner & Solutions',
    };
  };

  const text = getGreeting();
  const isDark = themeMode === 'dark';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center px-4 transition-colors duration-300 ${
            isDark ? 'bg-[#090d16] text-white' : 'bg-white text-slate-900'
          }`}
        >
          {/* Ambient Background Glows */}
          <div
            className={`absolute w-96 h-96 rounded-full blur-[140px] pointer-events-none -z-10 ${
              isDark ? 'bg-primary/20' : 'bg-primary/15'
            }`}
          />

          <div className="text-center space-y-6 max-w-lg mx-auto">
            {/* Logo Animated Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 border border-primary/30 text-primary shadow-2xl relative group"
            >
              <ShieldCheck className="w-10 h-10 text-primary animate-pulse" />
              <Sparkles className="w-4 h-4 text-primary absolute top-2 right-2 animate-bounce" />
            </motion.div>

            {/* Welcome Greeting & Motto */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="space-y-2"
            >
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                {text.welcome}
              </h2>
              <p
                className={`text-xs sm:text-sm font-semibold uppercase tracking-widest ${
                  isDark ? 'text-primary/90' : 'text-primary'
                }`}
              >
                {text.motto}
              </p>
            </motion.div>

            {/* Animated Loading Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-48 sm:w-64 h-1.5 mx-auto bg-primary/20 rounded-full overflow-hidden relative"
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-primary via-sky-400 to-primary rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
