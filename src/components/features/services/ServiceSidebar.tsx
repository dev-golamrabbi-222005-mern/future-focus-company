'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle2, ShieldCheck, Award, Headset } from 'lucide-react';

interface ServiceSidebarProps {
  slug: string;
}

export function ServiceSidebar({ slug }: ServiceSidebarProps) {
  const t = useTranslations('ServicesPage.details.sidebar');
  const tBento = useTranslations('ServicesPage.bento.sectors');

  const sectorTitle = tBento(`${slug}.title`);

  const [formState, setFormState] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    count: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="space-y-6 sticky top-28">
      {/* Lead Generation Mini-Form */}
      <div className="bg-card border border-border rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-accent to-emerald-500" />

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h4 className="text-lg font-bold text-foreground">
              {t('successTitle')}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t('successDesc')}
            </p>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="text-xs font-bold text-primary underline"
            >
              {t('sendAnother')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h4 className="text-lg font-extrabold text-foreground">
                {t('formTitle')} {sectorTitle}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {t('formSubtitle')}
              </p>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-foreground">
                {t('nameLabel')} *
              </label>
              <input
                type="text"
                required
                value={formState.fullName}
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
                placeholder={t('namePlaceholder')}
                className="w-full mt-1 bg-background border border-border rounded-xl px-3 py-2.5 text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-foreground">
                {t('emailLabel')} *
              </label>
              <input
                type="email"
                required
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                placeholder={t('emailPlaceholder')}
                className="w-full mt-1 bg-background border border-border rounded-xl px-3 py-2.5 text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-foreground">
                {t('phoneLabel')} *
              </label>
              <input
                type="tel"
                required
                value={formState.phone}
                onChange={(e) =>
                  setFormState({ ...formState, phone: e.target.value })
                }
                placeholder={t('phonePlaceholder')}
                className="w-full mt-1 bg-background border border-border rounded-xl px-3 py-2.5 text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-foreground">
                {t('countLabel')} *
              </label>
              <select
                required
                value={formState.count}
                onChange={(e) =>
                  setFormState({ ...formState, count: e.target.value })
                }
                className="w-full mt-1 bg-background border border-border rounded-xl px-3 py-2.5 text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer"
              >
                <option value="" disabled>
                  {t('selectCount')}
                </option>
                <option value="1-20">1 - 20 Workers</option>
                <option value="21-50">21 - 50 Workers</option>
                <option value="51-200">51 - 200 Workers</option>
                <option value="200+">200+ Turnkey Mobilization</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl shadow-md hover:bg-primary/90 transition-all text-xs flex items-center justify-center space-x-2 rtl:space-x-reverse cursor-pointer"
            >
              <span>{isSubmitting ? t('submitting') : t('submit')}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>

      {/* Why Choose Us Box */}
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-4">
        <h4 className="text-sm font-bold text-foreground flex items-center space-x-2 rtl:space-x-reverse">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>{t('whyTitle')}</span>
        </h4>

        <ul className="space-y-3 text-xs text-muted-foreground">
          <li className="flex items-center space-x-2 rtl:space-x-reverse">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t('point1')}</span>
          </li>
          <li className="flex items-center space-x-2 rtl:space-x-reverse">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t('point2')}</span>
          </li>
          <li className="flex items-center space-x-2 rtl:space-x-reverse">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t('point3')}</span>
          </li>
          <li className="flex items-center space-x-2 rtl:space-x-reverse">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t('point4')}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
