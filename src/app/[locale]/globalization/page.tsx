import { redirect } from 'next/navigation';

export default async function GlobalizationRedirectPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/our-services`);
}
