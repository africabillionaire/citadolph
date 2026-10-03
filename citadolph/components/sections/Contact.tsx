'use client';

import React, { useState, FormEvent, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Check, Save, RotateCcw, AlertCircle, TrendingUp, Sparkles, Users as UsersIcon, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Kicker, Heading, Text, Badge } from '@/components/ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Section, Wrap, Band } from '@/components/ui/Grid';
import { contactInfo, contactReciprocity, contactSocialProof } from '@/lib/site-content';
import { cn } from '@/lib/utils';

const formSteps = ['Details', 'Message', 'Submit'] as const;
const STORAGE_KEY = 'citadolph:contact-draft';

/* Intent detection keywords — routes to correct department automatically */
const INTENT_KEYWORDS: Record<string, string[]> = {
  general: ['hello', 'hi', 'inquiry', 'question', 'info', 'information', 'general'],
  sales: ['project', 'build', 'develop', 'create', 'website', 'app', 'erp', 'system', 'quote', 'proposal', 'pricing', 'cost', 'budget', 'start'],
  partnerships: ['partner', 'partnership', 'collaborate', 'agency', 'network', 'affiliate', 'reseller', 'white label'],
  legal: ['legal', 'contract', 'compliance', 'gdpr', 'privacy', 'terms', 'law', 'regulation', 'audit', 'iso', 'soc'],
  hr: ['job', 'career', 'hiring', 'recruit', 'position', 'role', 'employment', 'work', 'join', 'talent'],
  finance: ['invoice', 'payment', 'billing', 'finance', 'accounting', 'tax', 'financial'],
  marketing: ['marketing', 'seo', 'ads', 'campaign', 'social', 'content', 'brand', 'growth'],
};

function detectIntent(message: string): string {
  const lower = message.toLowerCase();
  let bestMatch = 'general';
  let maxMatches = 0;
  
  for (const [dept, keywords] of Object.entries(INTENT_KEYWORDS)) {
    const matches = keywords.filter(k => lower.includes(k)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = dept;
    }
  }
  return bestMatch;
}

const DEPT_LABELS: Record<string, string> = {
  general: 'General Inquiries',
  sales: 'New Projects & Sales',
  partnerships: 'Partnerships & Agency Network',
  legal: 'Legal & Compliance',
  hr: 'Careers & HR',
  finance: 'Finance & Billing',
  marketing: 'Marketing & Growth',
};

const DEPT_ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties; 'aria-hidden'?: boolean | 'true' | 'false' }>> = {
  general: Mail,
  sales: Sparkles,
  partnerships: UsersIcon,
  legal: AlertCircle,
  hr: MapPin,
  finance: TrendingUp,
  marketing: BarChart3,
};

export function Contact() {
  const [formData, setFormData] = useState<{ name: string; email: string; message: string }>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return { name: '', email: '', message: '' };
        }
      }
    }
    return { name: '', email: '', message: '' };
  });
  const [submitted, setSubmitted] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [showDraftNotice, setShowDraftNotice] = useState(false);

  // Auto-detect intent from message (computed during render - no effect needed)
  const detectedIntent = useMemo(
    () => (formData.message.trim() ? detectIntent(formData.message) : 'general') as
      | 'general'
      | 'sales'
      | 'partnerships'
      | 'legal'
      | 'hr'
      | 'finance'
      | 'marketing',
    [formData.message]
  );

  // Auto-save draft to localStorage (Zeigarnik Effect)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.name || formData.email || formData.message) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        setDraftSaved(true);
        setShowDraftNotice(true);
        setTimeout(() => setShowDraftNotice(false), 3000);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData]);

  // Auto-calculate step based on filled fields (Goal Gradient)
  const currentStep = useMemo(() => {
    let step = 1;
    if (formData.name.trim() && formData.email.trim()) step = 2;
    if (formData.name.trim() && formData.email.trim() && formData.message.trim()) step = 3;
    return step;
  }, [formData]);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, intent: detectedIntent });
    setSubmitted(true);
    localStorage.removeItem(STORAGE_KEY);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  }, [formData, detectedIntent]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const clearDraft = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData({ name: '', email: '', message: '' });
    setDraftSaved(false);
  }, []);

  // Honeypot for spam prevention
  const [honeypot, setHoneypot] = useState('');

  return (
    <Section id="contact" variant="default" ariaLabel="contact-title">
      <Wrap>
        <Band span="1 / 7" style={{ paddingTop: 'var(--lh)' }}>
          <Kicker>Get In Touch</Kicker>
          <Heading id="contact-title" as="h2" size="2" className="mb-[var(--lh)]" style={{ lineHeight: 'calc(var(--lh) * 1.2)' }}>
            Start a Conversation
          </Heading>
          <Text className="mb-[calc(var(--lh)*3)]" maxWidth="prose" style={{ lineHeight: 'var(--lh)' }}>
            Tell us about your project, your challenges, or your vision.
            We&apos;ll route your message to the right team automatically — no need to pick a department.
          </Text>

          {/* Reciprocity: Free value offer before form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-[calc(var(--lh)*3)] p-5 bg-[var(--paper)] border border-[var(--border)] rounded-[var(--radius-md)]"
            style={{ lineHeight: 'var(--lh)' }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6" style={{ color: 'var(--accent)' }} aria-hidden="true" />
              </div>
              <div className="flex-1">
                <p style={{ font: '600 14px/1.3 var(--font-sans)', color: 'var(--ink)', marginBottom: 'calc(var(--lh)*0.5)' }}>
                  {contactReciprocity.offer} <span style={{ color: 'var(--accent)' }}>({contactReciprocity.value})</span>
                </p>
                <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: 0, padding: 0, listStyle: 'none' }}>
                  {contactReciprocity.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-1 text-sm" style={{ color: 'var(--ink-muted)', lineHeight: 'var(--lh)' }}>
                      <Check className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-[calc(var(--lh)*3)] p-4 bg-[var(--success)]/5 border border-[var(--success)]/20 rounded-[var(--radius-sm)]"
            style={{ lineHeight: 'var(--lh)' }}
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" style={{ color: 'var(--success)' }} aria-hidden="true" />
              <span style={{ font: '500 13px/1 var(--font-sans)', color: 'var(--success)' }}>
                {contactSocialProof.stat} {contactSocialProof.timeframe}
              </span>
            </div>
          </motion.div>

          {/* Contact Info — Clean, minimal */}
          <Band span="1 / 13" style={{ gridTemplateRows: 'auto', rowGap: 'calc(var(--lh)*1.5)' }}>
            {contactInfo.slice(0, 4).map((item) => ( // Only show primary contacts
              <Band key={item.label} span="1 / 13" style={{ gridTemplateColumns: 'auto 1fr', columnGap: 'var(--gutter)' }}>
                <dt style={{ font: '600 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: 'calc(var(--bl) * 0.5)', lineHeight: 'var(--lh)' }}>
                  {item.label}
                </dt>
                <dd style={{ margin: 0, fontSize: '15px', lineHeight: 'var(--lh)', color: 'var(--ink)' }}>
                  {item.href ? (
                    <a href={item.href} style={{ color: 'var(--ink)', textDecoration: 'none', transition: 'color 0.15s', lineHeight: 'var(--lh)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink)'}
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </Band>
            ))}
          </Band>
        </Band>

        <Band span="7 / 13" style={{ paddingTop: 'var(--lh)' }}>
          <Card variant="default" padding="lg" className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between" style={{ lineHeight: 'var(--lh)' }}>
                <CardTitle>Send a Message</CardTitle>
                {/* Intent indicator — shows auto-routing */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-3 py-1 bg-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-[var(--radius-sm)]"
                  style={{ lineHeight: 'var(--lh)' }}
                >
                  {(() => {
                    const Icon = DEPT_ICONS[detectedIntent];
                    return <Icon className="w-4 h-4" style={{ color: 'var(--accent)' }} aria-hidden="true" />;
                  })()}
                  <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                    → {DEPT_LABELS[detectedIntent]}
                  </span>
                </motion.div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Goal Gradient: Progress Indicator — baseline aligned */}
              <div className="mb-[calc(var(--lh)*3)]" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={3} aria-label="Form progress" style={{ lineHeight: 'var(--lh)' }}>
                <div className="flex items-center gap-2 mb-[var(--lh)]">
                  {formSteps.map((step, i) => (
                    <React.Fragment key={step}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                        className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300',
                          i < currentStep ? 'bg-[var(--accent)] text-[var(--paper)]' : 
                          i + 1 === currentStep ? 'bg-[var(--paper)] border-2 border-[var(--accent)] text-[var(--accent)]' :
                          'bg-[var(--paper-alt)] border border-[var(--border)] text-[var(--ink-muted)]'
                        )}
                      >
                        {i < currentStep - 1 ? <Check className="w-5 h-5" /> : i + 1}
                      </motion.div>
                      {i < formSteps.length - 1 && (
                        <motion.div
                          className={cn('flex-1 h-0.5 transition-colors duration-300', i < currentStep - 1 ? 'bg-[var(--accent)]' : 'bg-[var(--border)]')}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: i < currentStep - 1 ? 1 : 0 }}
                          transition={{ delay: 0.3, duration: 0.4 }}
                          style={{ transformOrigin: 'left' }}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <Text size="sm" color="muted" className="text-center" style={{ lineHeight: 'var(--lh)' }}>
                  Step {currentStep} of {formSteps.length} — {formSteps[currentStep - 1]}
                </Text>
              </div>

              {/* Draft notice toast (Zeigarnik) */}
              <AnimatePresence>
                {showDraftNotice && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-[calc(var(--lh)*2)] p-3 bg-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-[var(--radius-sm)] flex items-center justify-between text-sm"
                    style={{ color: 'var(--accent)', lineHeight: 'var(--lh)' }}
                  >
                    <span className="flex items-center gap-2">
                      <Save className="w-4 h-4" aria-hidden="true" />
                      Draft auto-saved. You can close and resume later.
                    </span>
                    <button
                      onClick={clearDraft}
                      className="text-xs underline hover:no-underline"
                      style={{ color: 'var(--accent)' }}
                    >
                      Clear draft
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-[calc(var(--lh)*2)]" style={{ lineHeight: 'var(--lh)' }}>
                {/* Honeypot — hidden from users, catches bots */}
                <input
                  type="text"
                  name="website"
                  id="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  aria-hidden="true"
                />

                <Input
                  name="name"
                  label="Full Name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
                <Input
                  name="email"
                  type="email"
                  label="Work Email"
                  placeholder="your@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
                <Textarea
                  name="message"
                  label="Project Details"
                  placeholder="Tell us about your project, timeline, budget range, or just say hi... We'll route your message to the right team."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  hint="Optional — we'll guide you through discovery if you're not sure yet"
                />
                
                {/* Loss-framed submit button */}
                <Button
                  type="submit"
                  className="w-full"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  disabled={submitted || honeypot.length > 0}
                  style={{ minHeight: '56px', fontSize: '14px', padding: '18px 36px', lineHeight: 'var(--lh)' }}
                >
                  {submitted ? (
                    <>
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                        <RotateCcw className="w-4 h-4" aria-hidden="true" />
                      </motion.span>
                      Sent! We&apos;ll be in touch.
                    </>
                  ) : (
                    <>
                      Don&apos;t Lose Your Free Audit Slot
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </>
                  )}
                </Button>
                
                {/* Micro-copy reassurance */}
                <p style={{ font: '400 11px/1.4 var(--font-sans)', color: 'var(--ink-muted)', textAlign: 'center', margin: 0, lineHeight: 'var(--lh)' }}>
                  By submitting, you agree to our <a href="#privacy" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Privacy Policy</a>. 
                  We never share your data. Response within 4 business hours.
                </p>
              </form>
            </CardContent>
          </Card>
        </Band>
      </Wrap>
    </Section>
  );
}