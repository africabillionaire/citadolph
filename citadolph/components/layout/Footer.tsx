'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  Mail,
  ArrowRight,
  Check,
  MessageCircle,
  ArrowUp,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Helper: Facebook icon (removed from lucide-react brand set)        */
/* ------------------------------------------------------------------ */

interface IconProps {
  className?: string;
  strokeWidth?: number | string;
  style?: React.CSSProperties;
  'aria-hidden'?: boolean | 'true' | 'false';
}

function Facebook({ className, strokeWidth = 2, style, ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      {...rest}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function Linkedin({ className, strokeWidth = 2, style, ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      {...rest}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v1.5" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function X({ className, strokeWidth = 2, style, ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      {...rest}
    >
      <path d="M4 4l16 16" />
      <path d="M20 4L4 20" />
    </svg>
  );
}

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { siteConfig, services, contactInfo, footerLinks } from '@/lib/site-content';
import { getFooterCopy, type Locale, type FooterCopy } from '@/lib/footer-copy';

/* ------------------------------------------------------------------ */
/* Types & Constants                                                  */
/* ------------------------------------------------------------------ */

type SubscribeStatus = 'idle' | 'loading' | 'success' | 'error';

interface NewsletterFormState {
  email: string;
  status: SubscribeStatus;
  error: string | null;
}

interface AccordionState {
  openIndex: number | null;
}

const NEWSLETTER_HAIRLINE = 'rgba(255,255,255,0.1)';
const TEXT_SECONDARY = 'rgba(255,255,255,0.6)';
const TEXT_MUTED = 'rgba(255,255,255,0.4)';
const TEXT_DIM = 'rgba(255,255,255,0.3)';
const BRAND_BLUE = '#004AAC';
const BRAND_RED = '#E4002B';
const BRAND_RED_HOVER = '#004AAC';

const SERVICE_LABELS = services.slice(0, 8).map((s) => s.title);

const SOCIAL_LINKS = [
  { href: siteConfig.company.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: siteConfig.company.social.facebook, icon: Facebook, label: 'Facebook' },
  { href: siteConfig.company.social.x, icon: X, label: 'X' },
  { href: siteConfig.company.social.instagram, icon: MessageCircle, label: 'WhatsApp' },
] as const;

const COMPLIANCE_BADGES = siteConfig.compliance;

const CONTACT_EMAILS = [
  { label: 'hello@', href: `mailto:${siteConfig.company.emails.general}` },
  { label: 'legal@', href: `mailto:${siteConfig.company.emails.legal}` },
  { label: 'hr@', href: `mailto:${siteConfig.company.emails.hr}` },
  { label: 'partner@', href: `mailto:${siteConfig.company.emails.partnerships}` },
] as const;

/* ------------------------------------------------------------------ */
/* Helper: Email validation                                           */
/* ------------------------------------------------------------------ */

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ------------------------------------------------------------------ */
/* Newsletter Band                                                    */
/* ------------------------------------------------------------------ */

interface NewsletterBandProps {
  locale: Locale;
  copy: FooterCopy;
  onSubscribe: (email: string) => Promise<void>;
}

function NewsletterBand({ locale, copy, onSubscribe }: NewsletterBandProps) {
  const [formState, setFormState] = useState<NewsletterFormState>({
    email: '',
    status: 'idle',
    error: null,
  });

  const inputRef = useCallback((el: HTMLInputElement | null) => {
    if (el && formState.status === 'idle') {
      el.focus();
    }
  }, [formState.status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, status } = formState;
    if (status !== 'idle' || !isValidEmail(email)) return;

    setFormState((prev) => ({ ...prev, status: 'loading', error: null }));

    try {
      await onSubscribe(email);
      setFormState((prev) => ({ ...prev, status: 'success', email: '' }));
    } catch {
      setFormState((prev) => ({
        ...prev,
        status: 'error',
        error: copy.newsletter.errorGeneric,
      }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormState((prev) => ({
      ...prev,
      email,
      error: email && !isValidEmail(email) ? copy.newsletter.errorInvalidEmail : null,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (email && !isValidEmail(email)) {
      setFormState((prev) => ({ ...prev, error: copy.newsletter.errorInvalidEmail }));
    }
  };

  const { newsletter } = copy;

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="band"
      style={{
        paddingTop: 'calc(var(--lh) * 3)',
        paddingBottom: 'calc(var(--lh) * 3)',
        borderBottom: `1px solid ${NEWSLETTER_HAIRLINE}`,
      }}
    >
      {/* Left: Copy — spans 7 columns on desktop */}
      <div style={{ gridColumn: '1 / 8' }}>
        <span
          id="newsletter-eyebrow"
          style={{
            display: 'block',
            font: '600 11px/1 var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: BRAND_BLUE,
            marginBottom: 'calc(var(--lh) * 0.5)',
          }}
        >
          {newsletter.eyebrow}
        </span>
        <h2
          id="newsletter-heading"
          style={{
            font: '700 clamp(24px, 3.5vw, 32px)/1.1 var(--font-sans)',
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            margin: 0,
            marginBottom: 'calc(var(--lh) * 0.5)',
            maxWidth: '55ch',
          }}
        >
          {newsletter.headline}
        </h2>
        <p
          style={{
            font: '400 14px/1.5 var(--font-sans)',
            color: TEXT_SECONDARY,
            margin: 0,
            maxWidth: '48ch',
          }}
        >
          {newsletter.subtext}
        </p>
      </div>

      {/* Right: Form — spans 5 columns on desktop, stacks on mobile */}
      <div
        style={{
          gridColumn: '8 / 13',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            gap: '12px',
            width: '100%',
            maxWidth: '420px',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
          }}
          noValidate
        >
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label htmlFor="footer-email" className="visually-hidden">
              {newsletter.inputPlaceholder}
            </label>
            <input
              ref={inputRef}
              id="footer-email"
              type="email"
              name="email"
              autoComplete="email"
              value={formState.email}
              onChange={handleEmailChange}
              onBlur={handleBlur}
              placeholder={newsletter.inputPlaceholder}
              disabled={formState.status !== 'idle'}
              aria-invalid={formState.status === 'error'}
              aria-describedby={
                formState.status === 'error' ? 'footer-email-error' : undefined
              }
              style={{
                width: '100%',
                padding: '12px 16px',
                font: '400 14px/1 var(--font-sans)',
                color: '#FFFFFF',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '0',
                outline: 'none',
                transition: 'border-color 150ms ease, box-shadow 150ms ease',
                '&::placeholder': {
                  color: 'rgba(255,255,255,0.4)',
                },
                '&:focus': {
                  borderColor: BRAND_BLUE,
                  boxShadow: `0 0 0 2px ${BRAND_BLUE}`,
                },
                '&:disabled': {
                  opacity: 0.5,
                  cursor: 'not-allowed',
                },
              }}
            />
            {formState.status === 'error' && formState.error && (
              <p
                id="footer-email-error"
                role="alert"
                style={{
                  marginTop: '8px',
                  font: '400 12px/1 var(--font-sans)',
                  color: BRAND_RED,
                }}
              >
                {formState.error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={formState.status !== 'idle' || !isValidEmail(formState.email)}
            aria-busy={formState.status === 'loading'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 24px',
              font: '600 13px/1 var(--font-sans)',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              color: '#FFFFFF',
              background: BRAND_RED,
              border: 'none',
              borderRadius: '0',
              cursor: formState.status !== 'idle' || !isValidEmail(formState.email) ? 'not-allowed' : 'pointer',
              transition: 'background-color 150ms ease, transform 80ms ease',
              opacity: formState.status !== 'idle' || !isValidEmail(formState.email) ? 0.6 : 1,
              whiteSpace: 'nowrap',
              '&:hover:not(:disabled)': {
                background: BRAND_BLUE,
                transform: 'translateY(-1px)',
              },
              '&:active:not(:disabled)': {
                transform: 'translateY(0)',
              },
              '&:focus-visible': {
                outline: `2px solid ${BRAND_BLUE}`,
                outlineOffset: '2px',
              },
            }}
          >
            {formState.status === 'loading' ? (
              <>
                <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid currentColor', borderRightColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} aria-hidden="true" />
                {newsletter.buttonLoading}
              </>
            ) : (
              <>
                {newsletter.buttonLabel}
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
              </>
            )}
          </button>

          <style jsx>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </form>

        {/* Success State */}
        <AnimatePresence mode="wait">
          {formState.status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                font: '400 14px/1 var(--font-sans)',
                color: '#FFFFFF',
                width: '100%',
                maxWidth: '420px',
                padding: '4px 0',
              }}
            >
              <Check
                className="w-5 h-5 flex-shrink-0"
                strokeWidth={2.5}
                style={{ color: BRAND_BLUE }}
                aria-hidden="true"
              />
              <span>{newsletter.successMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Link Matrix — Desktop (4 columns) & Accordion (mobile)             */
/* ------------------------------------------------------------------ */

interface LinkMatrixProps {
  copy: FooterCopy;
  locale: Locale;
}

function LinkMatrix({ copy, locale }: LinkMatrixProps) {
  const [accordionState, setAccordionState] = useState<AccordionState>({ openIndex: null });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { linkMatrix } = copy;
  const companyLinks = linkMatrix.company.links;
  const serviceLinks = SERVICE_LABELS.map((label) => ({ label, href: `#${label.toLowerCase().replace(/\s+/g, '-')}` }));
  const legalLinks = linkMatrix.legal.links;

  const columns = [
    { key: 'company', label: linkMatrix.company.label, links: companyLinks },
    { key: 'services', label: linkMatrix.services.label, links: serviceLinks },
    {
      key: 'contact',
      label: linkMatrix.contact.label,
      links: [
        ...CONTACT_EMAILS,
        { label: linkMatrix.contact.location, href: '#', isText: true },
      ],
    },
    { key: 'legal', label: linkMatrix.legal.label, links: legalLinks },
  ];

  const toggleAccordion = (index: number) => {
    setAccordionState((prev) => ({ openIndex: prev.openIndex === index ? null : index }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleAccordion(index);
    } else if (e.key === 'Escape') {
      setAccordionState({ openIndex: null });
    } else if (e.key === 'ArrowDown' && accordionState.openIndex === index) {
      e.preventDefault();
      // Focus first link in panel
      const panel = document.getElementById(`panel-${index}`);
      panel?.querySelector('a')?.focus();
    }
  };

  /* Desktop: 4-column grid */
  if (!isMobile) {
    return (
      <section aria-labelledby="link-matrix-heading" className="band" style={{ paddingTop: 'calc(var(--lh) * 4)', paddingBottom: 'calc(var(--lh) * 4)', borderBottom: `1px solid ${NEWSLETTER_HAIRLINE}` }}>
        <h2 id="link-matrix-heading" className="visually-hidden">{linkMatrix.company.label} & More</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'calc(var(--gutter) * 1.5)',
          }}
          role="list"
        >
          {columns.map((col, idx) => (
            <div key={col.key} role="listitem" style={{ minWidth: 0 }}>
              <h3
                style={{
                  font: '600 11px/1 var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: TEXT_MUTED,
                  marginBottom: 'calc(var(--lh) * 1.5)',
                }}
              >
                {col.label}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {col.links.map((link) =>
                  link.isText ? (
                    <li key={link.label} style={{ font: '400 14px/1.5 var(--font-sans)', color: TEXT_SECONDARY }}>
                      {link.label}
                    </li>
                  ) : (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        style={{
                          display: 'inline-block',
                          font: '400 14px/1.5 var(--font-sans)',
                          color: 'rgba(255,255,255,0.8)',
                          textDecoration: 'none',
                          paddingLeft: '0',
                          borderLeft: '2px solid transparent',
                          transition: 'color 150ms ease, border-color 150ms ease, padding-left 150ms ease',
                          '&:hover': {
                            color: '#FFFFFF',
                            borderLeftColor: BRAND_RED,
                            paddingLeft: '10px',
                          },
                          '&:focus-visible': {
                            outline: `2px solid ${BRAND_BLUE}`,
                            outlineOffset: '2px',
                            borderRadius: '2px',
                            color: '#FFFFFF',
                          },
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* Mobile: Accordion stack */
  return (
    <section aria-labelledby="link-matrix-heading" style={{ borderBottom: `1px solid ${NEWSLETTER_HAIRLINE}` }}>
      <h2 id="link-matrix-heading" className="visually-hidden">{linkMatrix.company.label} & More</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: NEWSLETTER_HAIRLINE }}>
        {columns.map((col, idx) => (
          <div key={col.key} style={{ background: '#111315' }}>
            <button
              id={`accordion-trigger-${idx}`}
              aria-expanded={accordionState.openIndex === idx}
              aria-controls={`panel-${idx}`}
              onClick={() => toggleAccordion(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: 'calc(var(--lh) * 1.5) 0',
                font: '600 13px/1 var(--font-sans)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#FFFFFF',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                '&:focus-visible': {
                  outline: `2px solid ${BRAND_BLUE}`,
                  outlineOffset: '-2px',
                },
              }}
            >
              <span>{col.label}</span>
              <ChevronDown
                className={cn('w-5 h-5 flex-shrink-0 transition-transform duration-200', {
                  'rotate-180': accordionState.openIndex === idx,
                  'text-[var(--accent)]': true,
                })}
                style={{ color: BRAND_RED }}
                aria-hidden="true"
              />
            </button>
            <div
              id={`panel-${idx}`}
              role="region"
              aria-labelledby={`accordion-trigger-${idx}`}
              style={{
                overflow: 'hidden',
                willChange: 'height',
              }}
            >
              <motion.div
                style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: 'calc(var(--lh) * 2)' }}
                initial={false}
                animate={{ height: accordionState.openIndex === idx ? 'auto' : 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                {col.links.map((link) =>
                  link.isText ? (
                    <div key={link.label} style={{ font: '400 14px/1.5 var(--font-sans)', color: TEXT_SECONDARY, paddingTop: '4px' }}>
                      {link.label}
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      style={{
                        display: 'inline-block',
                        font: '400 14px/1.5 var(--font-sans)',
                        color: 'rgba(255,255,255,0.8)',
                        textDecoration: 'none',
                        paddingLeft: '0',
                        borderLeft: '2px solid transparent',
                        transition: 'color 150ms ease, border-color 150ms ease, padding-left 150ms ease',
                        '&:hover': {
                          color: '#FFFFFF',
                          borderLeftColor: BRAND_RED,
                          paddingLeft: '10px',
                        },
                        '&:focus-visible': {
                          outline: `2px solid ${BRAND_BLUE}`,
                          outlineOffset: '2px',
                          borderRadius: '2px',
                          color: '#FFFFFF',
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Social Row                                                         */
/* ------------------------------------------------------------------ */

interface SocialRowProps {
  copy: FooterCopy;
}

function SocialRow({ copy }: SocialRowProps) {
  return (
    <section aria-label="Social and compliance" style={{ borderBottom: `1px solid ${NEWSLETTER_HAIRLINE}`, paddingTop: 'calc(var(--lh) * 2)', paddingBottom: 'calc(var(--lh) * 2)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'calc(var(--lh) * 2)' }}>
        {/* Left: Social Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ font: '600 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em', color: TEXT_MUTED, whiteSpace: 'nowrap' }}>
            {copy.social.followLabel}
          </span>
          <div style={{ display: 'flex', gap: '8px' }} role="list" aria-label="Social links">
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                role="listitem"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '0',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: TEXT_SECONDARY,
                  transition: 'color 150ms ease, border-color 150ms ease, background-color 150ms ease',
                  '&:hover': {
                    color: '#FFFFFF',
                    borderTopColor: BRAND_BLUE,
                    borderTopWidth: '2px',
                  },
                  '&:focus-visible': {
                    outline: `2px solid ${BRAND_BLUE}`,
                    outlineOffset: '2px',
                  },
                }}
              >
                <social.icon className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Compliance Badges (typographic only) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'flex-end' }} aria-label="Compliance certifications">
          {COMPLIANCE_BADGES.map((badge, idx) => (
            <span
              key={idx}
              style={{
                font: '400 11px/1 var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: TEXT_DIM,
                whiteSpace: 'nowrap',
              }}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Baseline Bar                                                       */
/* ------------------------------------------------------------------ */

interface BaselineBarProps {
  copy: FooterCopy;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

function BaselineBar({ copy, locale, onLocaleChange }: BaselineBarProps) {
  const currentYear = new Date().getFullYear();
  const { baseline } = copy;

  return (
    <section aria-label="Footer baseline" style={{ paddingTop: 'calc(var(--lh) * 1.5)', paddingBottom: 'calc(var(--lh) * 1.5)' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'calc(var(--lh) * 1.5)',
          font: '400 12px/1.5 var(--font-sans)',
          color: TEXT_SECONDARY,
        }}
      >
        {/* Left: Copyright */}
        <p style={{ margin: 0, flex: 1, minWidth: '200px', textAlign: 'left' }}>
          {baseline.copyright.replace('{year}', String(currentYear))}
        </p>

        {/* Center/Right: Operating + Language Toggle + Back to Top */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '16px',
            flex: 1,
            minWidth: '200px',
          }}
        >
          <span style={{ color: TEXT_MUTED, whiteSpace: 'nowrap' }}>{baseline.operating}</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} role="group" aria-label="Language">
            {(['en', 'fr'] as Locale[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLocaleChange(lang)}
                aria-pressed={locale === lang}
                aria-current={locale === lang ? 'true' : 'false'}
                style={{
                  font: '500 11px/1 var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: locale === lang ? BRAND_BLUE : TEXT_MUTED,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  textDecoration: locale === lang ? 'underline' : 'none',
                  textUnderlineOffset: '4px',
                  transition: 'color 150ms ease',
                  '&:hover': {
                    color: locale === lang ? BRAND_BLUE : '#FFFFFF',
                  },
                  '&:focus-visible': {
                    outline: `2px solid ${BRAND_BLUE}`,
                    outlineOffset: '2px',
                    borderRadius: '2px',
                  },
                }}
              >
                {baseline.languageToggle[lang]}
              </button>
            ))}
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              font: '500 11px/1 var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: TEXT_MUTED,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 0',
              transition: 'color 150ms ease',
              '&:hover': { color: '#FFFFFF' },
              '&:focus-visible': { outline: `2px solid ${BRAND_BLUE}`, outlineOffset: '2px', borderRadius: '2px' },
            }}
            aria-label={baseline.backToTop}
          >
            <span>{baseline.backToTop}</span>
            <ArrowUp className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer — Main Export                                               */
/* ------------------------------------------------------------------ */

interface FooterProps {
  locale?: Locale;
  onLocaleChange?: (locale: Locale) => void;
  onSubscribe?: (email: string) => Promise<void>;
}

export function Footer({
  locale = 'en',
  onLocaleChange,
  onSubscribe = async () => {
    // Default no-op — replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 800));
  },
}: FooterProps) {
  const copy = getFooterCopy(locale);

  return (
    <footer
      role="contentinfo"
      style={{
        background: '#111315',
        color: '#FFFFFF',
        fontFamily: 'var(--font-sans), system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        className="wrap"
        style={{
          maxWidth: '1440px',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          columnGap: 'var(--gutter)',
        }}
      >
        <NewsletterBand locale={locale} copy={copy} onSubscribe={onSubscribe} />
        <LinkMatrix copy={copy} locale={locale} />
        <SocialRow copy={copy} />
        <BaselineBar copy={copy} locale={locale} onLocaleChange={onLocaleChange ?? (() => {})} />
      </div>

      {/* Reduced motion styles injected once */}
      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          footer *,
          footer *::before,
          footer *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </footer>
  );
}