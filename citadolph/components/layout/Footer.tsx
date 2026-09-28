'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ArrowRight,
  Check,
  MessageCircle,
  ArrowUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/lib/utils';
import { siteConfig, services } from '@/lib/site-content';
import { getFooterCopy, type Locale, type FooterCopy } from '@/lib/footer-copy';

/* ------------------------------------------------------------------ */
/* Helper: Brand icons                                                */
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

function X({ className, style, ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      {...rest}
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

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


const SERVICE_LABELS = services.slice(0, 8).map((s) => s.title);

const SOCIAL_LINKS = [
  { href: siteConfig.company.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: siteConfig.company.social.facebook, icon: Facebook, label: 'Facebook' },
  { href: siteConfig.company.social.x, icon: X, label: 'X' },
  { href: siteConfig.company.social.instagram, icon: MessageCircle, label: 'WhatsApp' },
] as const;

const COMPLIANCE_BADGES = siteConfig.compliance;

const CONTACT_EMAILS = [
  { label: 'hello@', href: `mailto:${siteConfig.company.emails.general}`, isText: false as const },
  { label: 'legal@', href: `mailto:${siteConfig.company.emails.legal}`, isText: false as const },
  { label: 'hr@', href: `mailto:${siteConfig.company.emails.hr}`, isText: false as const },
  { label: 'partner@', href: `mailto:${siteConfig.company.emails.partnerships}`, isText: false as const },
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

  const isValid = isValidEmail(formState.email);
  const isLoading = formState.status === 'loading';

  // Auto-reset form 2 seconds after success
  useEffect(() => {
    if (formState.status === 'success') {
      const timer = setTimeout(() => {
        setFormState({ email: '', status: 'idle', error: null });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [formState.status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    // Allow clicking even if invalid to trigger immediate validation feedback
    if (!isValid) {
      setFormState((prev) => ({
        ...prev,
        status: 'error',
        error: copy.newsletter.errorInvalidEmail,
      }));
      return;
    }

    setFormState((prev) => ({ ...prev, status: 'loading', error: null }));

    try {
      await onSubscribe(formState.email);
      setFormState({ email: '', status: 'success', error: null });
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
      email,
      // Clear error state immediately when user starts typing again
      status: prev.status === 'error' ? 'idle' : prev.status,
      error: null,
    }));
  };

  const { newsletter } = copy;

  return (
    <section aria-labelledby="newsletter-heading" className="ftr-band">
      <div className="ftr-news-copy">
        <span className="ftr-eyebrow">{newsletter.eyebrow}</span>
        <h2 id="newsletter-heading" className="ftr-news-heading">
          {newsletter.headline}
        </h2>
        <p className="ftr-news-subtext">{newsletter.subtext}</p>
      </div>

      <div className="ftr-news-form-col">
        <AnimatePresence mode="wait" initial={false}>
          {formState.status === 'success' ? (
            <motion.div
              key="newsletter-success"
              role="status"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="ftr-news-success"
            >
              <Check
                className="w-5 h-5 flex-shrink-0 ftr-success-icon"
                strokeWidth={2.5}
                aria-hidden="true"
              />
              <span>{newsletter.successMessage}</span>
            </motion.div>
          ) : (
            <motion.form
              key="newsletter-form"
              onSubmit={handleSubmit}
              noValidate
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="ftr-news-form"
            >
              <div className="ftr-input-wrap">
                <label htmlFor="footer-email" className="visually-hidden">
                  {newsletter.inputPlaceholder}
                </label>
                <input
                  id="footer-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formState.email}
                  onChange={handleEmailChange}
                  placeholder={newsletter.inputPlaceholder}
                  aria-invalid={formState.status === 'error'}
                  aria-describedby={formState.error ? 'footer-email-error' : undefined}
                  className={cn('ftr-input', formState.status === 'error' && 'ftr-input--error')}
                />
                <AnimatePresence>
                  {formState.error && (
                    <motion.p
                      id="footer-email-error"
                      role="alert"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="ftr-error"
                    >
                      {formState.error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="submit"
                aria-busy={isLoading}
                className={cn('ftr-submit', !isValid && !isLoading && 'ftr-submit--inactive')}
              >
                {isLoading ? (
                  <>
                    <span className="ftr-spinner" aria-hidden="true" />
                    {newsletter.buttonLoading}
                  </>
                ) : (
                  <>
                    {newsletter.buttonLabel}
                    <motion.div
                      animate={isValid ? { x: 0 } : { x: -4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <ArrowRight className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                    </motion.div>
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <p role="status" className="visually-hidden" aria-live="polite">
        {formState.status === 'success'
          ? newsletter.successMessage
          : formState.error ?? ''}
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Link Matrix                                                        */
/* ------------------------------------------------------------------ */

interface LinkMatrixProps {
  copy: FooterCopy;
  locale: Locale;
}

function LinkMatrix({ copy, locale }: LinkMatrixProps) {
  const [accordionState, setAccordionState] = useState<AccordionState>({ openIndex: null });

  const { linkMatrix } = copy;
  const companyLinks = linkMatrix.company.links.map(l => ({ ...l, isText: false as const }));
  const serviceLinks = SERVICE_LABELS.map((label) => ({
    label,
    href: `#${label.toLowerCase().replace(/\s+/g, '-')}`,
    isText: false as const,
  }));
  const legalLinks = linkMatrix.legal.links.map(l => ({ ...l, isText: false as const }));

  const columns = [
    { key: 'company', label: linkMatrix.company.label, links: companyLinks },
    { key: 'services', label: linkMatrix.services.label, links: serviceLinks },
    {
      key: 'contact',
      label: linkMatrix.contact.label,
      links: [...CONTACT_EMAILS, { label: linkMatrix.contact.location, href: '#', isText: true as const }],
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
      document.getElementById(`accordion-trigger-${index}`)?.focus();
    } else if (e.key === 'ArrowDown' && accordionState.openIndex === index) {
      e.preventDefault();
      const panel = document.getElementById(`panel-${index}`);
      panel?.querySelector('a')?.focus();
    }
  };

  const renderLinks = (links: typeof columns[number]['links']) =>
    links.map((link) =>
      link.isText ? (
        <div key={link.label} className="ftr-link-static">
          {link.label}
        </div>
      ) : (
        <Link key={link.href} href={link.href} className="ftr-link">
          {link.label}
        </Link>
      )
    );

  return (
    <>
      <section aria-labelledby="link-matrix-heading" className="ftr-band ftr-matrix-desktop">
        <h2 id="link-matrix-heading" className="visually-hidden">
          {linkMatrix.company.label} & More
        </h2>
        <div className="ftr-matrix-grid" role="list">
          {columns.map((col) => (
            <div key={col.key} role="listitem" className="ftr-matrix-col">
              <h3 className="ftr-col-heading">{col.label}</h3>
              <div className="ftr-col-links">{renderLinks(col.links)}</div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="link-matrix-heading-mobile" className="ftr-matrix-mobile">
        <h2 id="link-matrix-heading-mobile" className="visually-hidden">
          {linkMatrix.company.label} & More
        </h2>
        <div className="ftr-acc-list">
          {columns.map((col, idx) => {
            const isOpen = accordionState.openIndex === idx;
            return (
              <div key={col.key} className="ftr-acc-item">
                <button
                  type="button"
                  id={`accordion-trigger-${idx}`}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${idx}`}
                  onClick={() => toggleAccordion(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className="ftr-acc-trigger"
                >
                  <span>{col.label}</span>
                  <ChevronDown
                    className={cn('w-5 h-5 flex-shrink-0 ftr-chevron', { 'ftr-chevron--open': isOpen }, 'ftr-chevron-color')}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      id={`panel-${idx}`}
                      role="region"
                      aria-labelledby={`accordion-trigger-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="ftr-acc-panel"
                      style={{ overflow: 'hidden' }}
                      layout
                    >
                      <div className="ftr-acc-inner">{renderLinks(col.links)}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </>
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
    <section aria-label="Social and compliance" className="ftr-band ftr-social-section">
      <div className="ftr-social-row">
        <div className="ftr-social-left">
          <span className="ftr-social-label">{copy.social.followLabel}</span>
          <div className="ftr-social-icons" role="list" aria-label="Social links">
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                role="listitem"
                className="ftr-social"
              >
                <social.icon className="w-5 h-5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        <div className="ftr-badges" aria-label="Compliance certifications">
          {COMPLIANCE_BADGES.map((badge, idx) => (
            <span key={idx} className="ftr-badge">
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

  const handleBackToTop = () => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section aria-label="Footer baseline" className="ftr-baseline-section">
      <div className="ftr-baseline">
        <div className="ftr-baseline-left">
          <p className="ftr-copyright">
            {baseline.copyright.replace('{year}', String(currentYear))}
          </p>
          <span className="ftr-divider" aria-hidden="true" />
          <span className="ftr-operating">{baseline.operating}</span>
        </div>

        <div className="ftr-baseline-right">
          <div className="ftr-lang" role="group" aria-label="Language">
            {(['en', 'fr'] as Locale[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => onLocaleChange(lang)}
                aria-pressed={locale === lang}
                className={cn('ftr-lang-btn', { 'ftr-lang-btn--active': locale === lang })}
              >
                {baseline.languageToggle[lang]}
              </button>
            ))}
          </div>

          <span className="ftr-divider" aria-hidden="true" />

          <button
            type="button"
            onClick={handleBackToTop}
            className="ftr-top"
            aria-label={baseline.backToTop}
          >
            <span>{baseline.backToTop}</span>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <ArrowUp className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
            </motion.div>
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
    await new Promise((resolve) => setTimeout(resolve, 800));
  },
}: FooterProps) {
  const copy = getFooterCopy(locale);

  return (
    <footer role="contentinfo" className="ftr-root">
      <div className="ftr-wrap">
        <NewsletterBand locale={locale} copy={copy} onSubscribe={onSubscribe} />
        <LinkMatrix copy={copy} locale={locale} />
        <SocialRow copy={copy} />
        <BaselineBar copy={copy} locale={locale} onLocaleChange={onLocaleChange ?? (() => {})} />
      </div>
    </footer>
  );
}