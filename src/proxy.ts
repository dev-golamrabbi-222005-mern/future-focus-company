import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: 'en',
  
  // Always include locale prefix in pathnames
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames, excluding api routes and static files
  matcher: ['/', '/(ar|bn|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
