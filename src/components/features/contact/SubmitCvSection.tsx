'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Upload, FileText, CheckCircle2, Send, User } from 'lucide-react';

export function SubmitCvSection() {
  const t = useTranslations('SubmitCvPage');
  const [cvSubmitted, setCvSubmitted] = React.useState(false);

  return (
    <section id="submit-cv" className="pt-12 md:pt-16 border-t border-border/60">
      <div className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16 gsap-fade-up">
          <div className="mb-6 flex justify-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              {t('tagline')}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4">
            {t('heading')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t('subheading')}
          </p>
        </div>

        {/* Application Form */}
        <div className="max-w-3xl mx-auto gsap-fade-up">
          <div className="p-8 sm:p-12 rounded-3xl border border-border bg-card shadow-xl space-y-8">
            
            <div className="flex items-center gap-3 pb-4 border-b border-border/60">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-foreground">{t('formTitle')}</h3>
                <p className="text-xs text-muted-foreground font-medium">BMET Authorized Direct Candidate Portal</p>
              </div>
            </div>

            {cvSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-center space-y-4">
                <CheckCircle2 className="h-12 w-12 mx-auto animate-bounce" />
                <h4 className="text-2xl font-extrabold">Application Submitted!</h4>
                <p className="text-sm font-semibold max-w-md mx-auto text-foreground/90">
                  {t('successMessage')}
                </p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setCvSubmitted(true); }} className="space-y-6">
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t('fullName')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Md. Rahim Uddin"
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t('phone')}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 1712 345678"
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t('passportNo')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="A12345678"
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t('trade')}
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                    >
                      <option value="">Select Category</option>
                      <option value="electrician">MEP Electrician</option>
                      <option value="driver">Heavy Trailer Driver</option>
                      <option value="cook">Hospitality Line Cook</option>
                      <option value="mason">Civil Construction Mason</option>
                      <option value="hvac">HVAC Technician</option>
                      <option value="other">Other Skilled Trade</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t('expYears')}
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium text-foreground"
                    >
                      <option value="1-3">1 - 3 Years</option>
                      <option value="3-5">3 - 5 Years</option>
                      <option value="5+">5+ Years (Experienced)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t('uploadCv')}
                  </label>
                  <div className="p-6 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 bg-muted/20 transition-colors text-center cursor-pointer space-y-2">
                    <Upload className="h-8 w-8 text-primary mx-auto" />
                    <p className="text-xs font-semibold text-foreground">Click to upload Resume / CV</p>
                    <p className="text-[10px] text-muted-foreground">PDF, DOC, DOCX up to 5MB</p>
                    <input type="file" required accept=".pdf,.doc,.docx" className="hidden" id="cv-upload-component" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t('uploadPassport')}
                  </label>
                  <div className="p-6 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 bg-muted/20 transition-colors text-center cursor-pointer space-y-2">
                    <FileText className="h-8 w-8 text-accent mx-auto" />
                    <p className="text-xs font-semibold text-foreground">Click to upload Passport Main Page Copy</p>
                    <p className="text-[10px] text-muted-foreground">PDF, JPG, PNG up to 5MB</p>
                    <input type="file" required accept=".pdf,.jpg,.jpeg,.png" className="hidden" id="passport-upload-component" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  <span>{t('submitApplication')}</span>
                </button>

              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
