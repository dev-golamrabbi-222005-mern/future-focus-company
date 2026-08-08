'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2, ShieldCheck, Wrench, Award, FileText } from 'lucide-react';

interface ServiceOverviewProps {
  slug: string;
}

export function ServiceOverview({ slug }: ServiceOverviewProps) {
  const t = useTranslations('ServicesPage.details');
  const tCommon = useTranslations('CommonUI');

  // Fallback / dynamic data for roles based on sector slug
  const rolesMap: Record<string, string[]> = {
    construction: [
      'Certified Structural Welders & Fabricators',
      'High-Rise Building Masons & Plasterers',
      'MEP Electricians & Cable Pullers',
      'Plumbers & Pipefitters',
      'Heavy Construction Laborers',
      'Scaffolders (TUV Certified)',
      'Steel Fixers & Rebar Technicians',
      'HVAC Ductmen & Technicians',
    ],
    hospitality: [
      '5-Star Hotel Line Cooks & Chefs',
      'Waiters & Food Service Staff',
      'Housekeeping & Room Attendants',
      'Baristas & Beverage Specialists',
      'Kitchen Stewards & Dishwashers',
      'Front Desk & Concierge Staff',
    ],
    it: [
      'Full-Stack Software Engineers',
      'Network & Infrastructure Engineers',
      'Cybersecurity Specialists',
      'Helpdesk & IT Support Technicians',
      'Database Administrators',
      'Cloud Solutions Architects',
    ],
    healthcare: [
      'Registered Nurses (Saudi Prometric Passed)',
      'Medical Lab Technicians',
      'Physiotherapy Assistants',
      'Patient Care Assistants & Orderlies',
      'Pharmacy Technicians',
      'Medical Facility Cleaners',
    ],
    driving: [
      'Heavy Trailer Drivers (Saudi Heavy License)',
      'Bus & Coach Drivers',
      'Forklift Operators (TUV Certified)',
      'Light Vehicle & Delivery Drivers',
      'Bulldozer & Excavator Operators',
      'Crane & Rigging Operators',
    ],
    cleaning: [
      'Commercial Facility Cleaners',
      'Industrial Janitorial Staff',
      'High-Rise Window Cleaners',
      'Hospital Disinfection Technicians',
      'Waste Management Personnel',
      'Landscape & Grounds Keepers',
    ],
  };

  const roles = rolesMap[slug] || rolesMap.construction;

  return (
    <div className="space-y-10">
      {/* Overview Paragraphs */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center space-x-3 rtl:space-x-reverse text-primary font-bold">
          <FileText className="w-5 h-5" />
          <h3 className="text-xl font-bold text-foreground">
            {t('overviewTitle')}
          </h3>
        </div>

        <p className="text-base text-foreground/90 leading-relaxed">
          {t('overviewP1')}
        </p>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {t('overviewP2')}
        </p>
      </div>

      {/* Key Roles We Supply Grid */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center space-x-3 rtl:space-x-reverse text-emerald-500 font-bold">
          <CheckCircle2 className="w-5 h-5" />
          <h3 className="text-xl font-bold text-foreground">
            {t('rolesTitle')}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roles.map((role, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-muted/40 border border-border/60 flex items-start space-x-3 rtl:space-x-reverse hover:border-emerald-500/40 transition-colors"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-sm font-semibold text-foreground">
                {role}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Vetting & Trade Testing Section */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center space-x-3 rtl:space-x-reverse text-amber-500 font-bold">
          <Wrench className="w-5 h-5" />
          <h3 className="text-xl font-bold text-foreground">
            {t('vettingTitle')}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {t('vettingDesc')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-center space-y-1">
            <p className="text-sm font-bold text-foreground">{tCommon('stage1')}</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-center space-y-1">
            <p className="text-sm font-bold text-foreground">{tCommon('stage2')}</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-center space-y-1">
            <p className="text-sm font-bold text-foreground">{tCommon('stage3')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
