import { Hero } from '@/components/features/Hero';
import { getTranslations } from 'next-intl/server';
import { ShieldCheck, Award, Users2, Building, CheckCircle2 } from 'lucide-react';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Hero' });

  const sectors = [
    { title: 'Construction & Engineering', count: '5,000+ Deployed' },
    { title: 'Hospitality & Catering', count: '3,200+ Deployed' },
    { title: 'Healthcare & Nursing', count: '1,800+ Deployed' },
    { title: 'Logistics & Driving', count: '2,500+ Deployed' },
    { title: 'Facility Management', count: '2,100+ Deployed' },
    { title: 'Security & Operations', count: '1,400+ Deployed' },
  ];

  return (
    <>
      {/* Hero Feature Section */}
      <Hero />

      {/* Sectors Showcase Section */}
      <section id="sectors" className="py-20 border-t border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
              Key Industries
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Recruitment Sectors We Excel In
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Providing certified workforce solutions tailored to the demanding standards of Dubai and UAE markets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map((sector, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                  <Building className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {sector.title}
                </h3>
                <p className="text-sm font-semibold text-primary/80">
                  {sector.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Trust Section */}
      <section id="about" className="py-20 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
                Government Certified
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                Trusted Partner for Overseas Employment
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                With over a decade of operational excellence, Global Manpower bridges skilled Bangladeshi professionals with leading corporations in Dubai, Abu Dhabi, and across the Middle East.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Full BMET Registration & Government License RL-1428',
                  'Pre-departure Medical Screening & Skills Trade Testing',
                  'Direct Client Support with Offices in Dhaka & Dubai',
                  '100% Transparent Visa & Contract Documentation'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span className="text-sm sm:text-base font-semibold text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-background shadow-xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-primary text-primary-foreground">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-foreground">RL-1428 License</h3>
                  <p className="text-sm text-muted-foreground">Ministry of Expatriates Welfare & Overseas Employment</p>
                </div>
              </div>

              <hr className="border-border/60" />

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-card border border-border">
                  <span className="text-xs text-muted-foreground block font-medium">Headquarters</span>
                  <span className="text-base font-bold text-foreground">Banani, Dhaka</span>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border">
                  <span className="text-xs text-muted-foreground block font-medium">UAE Branch</span>
                  <span className="text-base font-bold text-foreground">Business Bay, Dubai</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
