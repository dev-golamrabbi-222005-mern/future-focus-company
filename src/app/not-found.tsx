'use client';

import * as React from 'react';
import Link from 'next/link';
import { ShieldAlert, Home, Briefcase } from 'lucide-react';

export default function RootNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-2xl w-full text-center space-y-8 bg-card/60 backdrop-blur-xl border border-border/80 p-8 sm:p-12 md:p-14 rounded-3xl shadow-2xl relative">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-primary">
            <ShieldAlert className="w-4 h-4 shrink-0 text-primary" />
            <span>Error 404 • Page Not Found</span>
          </div>

          <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight text-foreground bg-gradient-to-b from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
            404
          </h1>
        </div>

        <div className="space-y-3 max-w-lg mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Page Not Found
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            The page you are looking for might have been removed or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/en"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
