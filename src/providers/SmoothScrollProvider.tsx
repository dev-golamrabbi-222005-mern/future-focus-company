'use client';

import * as React from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type ScrollTarget = string | HTMLElement | number;

interface ScrollToOptions {
  offset?: number;
  duration?: number;
  easing?: (t: number) => number;
  immediate?: boolean;
  lock?: boolean;
  onComplete?: () => void;
}

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: ScrollTarget, options?: ScrollToOptions) => void;
}

const SmoothScrollContext = React.createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => React.useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenisInstance, setLenisInstance] = React.useState<Lenis | null>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize Lenis with smooth momentum parameters
    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.01 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
      infinite: false,
    });

    setLenisInstance(lenis);

    // Sync Lenis scroll with GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    // Drive Lenis RAF via GSAP ticker for frame-perfect sync
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Global click listener for smooth hash link navigation
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Handle anchor links like "#section" or "/current-path#section"
      if (href.startsWith('#') || href.includes('#')) {
        try {
          const url = new URL(target.href, window.location.href);
          if (url.pathname === window.location.pathname && url.hash) {
            const targetEl = document.querySelector(url.hash);
            if (targetEl) {
              e.preventDefault();
              lenis.scrollTo(targetEl as HTMLElement, {
                offset: -90,
                duration: 1.2,
              });
              window.history.pushState(null, '', url.hash);
            }
          }
        } catch {
          // Fallback if URL parsing fails
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });

    // Check if current URL has a hash on mount
    if (window.location.hash) {
      setTimeout(() => {
        try {
          const targetEl = document.querySelector(window.location.hash);
          if (targetEl) {
            lenis.scrollTo(targetEl as HTMLElement, {
              offset: -90,
              duration: 1.2,
            });
          }
        } catch {
          // Ignore invalid selector
        }
      }, 300);
    }

    return () => {
      document.removeEventListener('click', handleAnchorClick, { capture: true });
      lenis.off('scroll', handleScroll);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  // On route change, refresh ScrollTrigger and handle any new hash target
  React.useEffect(() => {
    if (!lenisInstance) return;

    // Small delay to allow DOM render
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();

      if (window.location.hash) {
        try {
          const targetEl = document.querySelector(window.location.hash);
          if (targetEl) {
            lenisInstance.scrollTo(targetEl as HTMLElement, {
              offset: -90,
              duration: 1.2,
            });
            return;
          }
        } catch {
          // Ignore invalid selector
        }
      }
    }, 120);

    return () => clearTimeout(timeout);
  }, [pathname, lenisInstance]);

  const scrollTo = React.useCallback(
    (target: ScrollTarget, options?: ScrollToOptions) => {
      if (!lenisInstance) return;

      if (typeof target === 'string' && target.startsWith('#')) {
        try {
          const el = document.querySelector(target);
          if (el) {
            lenisInstance.scrollTo(el as HTMLElement, {
              offset: -90,
              duration: 1.2,
              ...options,
            });
            return;
          }
        } catch {
          // Ignore invalid selector
        }
      }

      lenisInstance.scrollTo(target as number | HTMLElement | string, {
        duration: 1.2,
        ...options,
      });
    },
    [lenisInstance]
  );

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
