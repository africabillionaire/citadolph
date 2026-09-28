'use client';

import Image from 'next/image';
import { Shield, Globe, Users } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Kicker, Heading, Text } from '@/components/ui/Typography';
import { Section, Wrap, Band } from '@/components/ui/Grid';
import { siteConfig, heroSocialProof, contactReciprocity } from '@/lib/site-content';
import { OpticalAlign } from '@/components/ui/OpticalAlign';

export function Hero() {
  return (
    <Section
      id="hero"
      variant="default"
      ariaLabel="hero-title"
      className="relative"
      style={{ paddingTop: 'calc(var(--lh) * 10)', paddingBottom: 'calc(var(--lh) * 8)' }}
    >
      {/* Optical alignment for masthead headline */}
      <OpticalAlign selector=".masthead" />
      
      <Wrap>
        <Band span="1 / 8" style={{ paddingTop: 'var(--lh)' }}>
          <Kicker>Digital Transformation Agency</Kicker>
          <Heading id="hero-title" as="h1" size="1" weight="bold" className="masthead">
            We Build Digital
            <br />
            <span style={{ color: 'var(--accent)' }}>Infrastructure</span>
            <br />
            for Africa
          </Heading>
          <Text size="xl" color="ink" maxWidth="wide" className="mb-[calc(var(--lh)*2)]" style={{ lineHeight: 'var(--lh)' }}>
            Your premier digital partner. From strategy to execution, we deliver
            websites, apps, ERPs, branding, and AI solutions — backed by a network
            of specialist agencies across the continent.
          </Text>

          {/* Goal Gradient: Progress indicator - start at 30% (Step 1 of 3) */}
          <div className="mb-[calc(var(--lh)*3)]" role="progressbar" aria-valuenow={30} aria-valuemin={0} aria-valuemax={100} aria-label="Project journey progress">
            <div className="flex items-center gap-2 mb-[var(--lh)]">
              <div className="flex-1 h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--accent)] rounded-full transition-all duration-500" style={{ width: '30%' }} />
              </div>
              <span style={{ font: '600 11px/1 var(--font-mono)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                30%
              </span>
            </div>
            <Text size="sm" color="muted" className="text-left" style={{ lineHeight: 'var(--lh)' }}>
              Step 1 of 3 — Discovery → Proposal → Build
            </Text>
          </div>

          <div className="flex flex-wrap gap-4 items-center mb-[calc(var(--lh)*3)]">
            {/* Primary CTA - Loss framed, larger touch target (Fitts's Law) */}
            <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />} className="min-h-[52px] min-w-[220px]" style={{ padding: '18px 36px', fontSize: '14px' }}>
              Claim Your Free Discovery
            </Button>
            <Button variant="secondary" size="lg" className="min-h-[52px]">
              Our Process
            </Button>
          </div>

          {/* Reciprocity: Free value offer */}
          <div className="mb-[calc(var(--lh)*3)] p-4 bg-[var(--paper-alt)] border border-[var(--border)] rounded-[var(--radius-sm)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5" style={{ color: 'var(--accent)' }} aria-hidden="true" />
              </div>
              <div>
                <p style={{ font: '600 13px/1.3 var(--font-sans)', color: 'var(--ink)', marginBottom: 'var(--lh)' }}>
                  {contactReciprocity.offer}: Free 30-min strategy session
                </p>
                <p style={{ font: '400 12px/1.3 var(--font-sans)', color: 'var(--ink-muted)', lineHeight: 'var(--lh)' }}>
                  No commitment. Just clarity on what&apos;s possible.
                </p>
              </div>
            </div>
          </div>

          {/* Social Proof near CTA (Common Region) */}
          <div className="flex items-center gap-3 mb-[calc(var(--lh)*3)]" style={{ color: 'var(--ink-muted)', lineHeight: 'var(--lh)' }}>
            <Users className="w-5 h-5" style={{ color: 'var(--accent)' }} aria-hidden="true" />
            <span style={{ font: '500 13px/1 var(--font-sans)' }}>
              {heroSocialProof.businessesJoined} {heroSocialProof.region} started {heroSocialProof.timeframe}
            </span>
          </div>

          <div className="flex flex-wrap gap-6 items-center" style={{ color: 'var(--ink-muted)', lineHeight: 'var(--lh)' }}>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" style={{ color: 'var(--accent)' }} aria-hidden="true" />
              <span style={{ font: '500 13px/1 var(--font-sans)' }}>ISO 27001 Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" style={{ color: 'var(--accent)' }} aria-hidden="true" />
              <span style={{ font: '500 13px/1 var(--font-sans)' }}>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" style={{ color: 'var(--accent)' }} aria-hidden="true" />
              <span style={{ font: '500 13px/1 var(--font-sans)' }}>GDPR Compliant</span>
            </div>
          </div>
        </Band>

        <Band span="8 / 13" style={{ paddingTop: 'var(--lh)' }}>
          <div
            style={{
              aspectRatio: '4/5',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              background: 'var(--paper-alt)',
              border: '1px solid var(--border)',
              position: 'relative',
              height: 'calc(var(--lh) * 20)', /* 480px = 20 × 24px */
            }}
            aria-hidden="true"
          >
            <Image
              src="/images/logo_full_black.svg"
              alt={`${siteConfig.name} brand mark`}
              fill
              priority
              style={{ objectFit: 'contain', padding: 'calc(var(--lh) * 4)', opacity: 0.15 }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              background: 'linear-gradient(135deg, rgba(228,0,43,0.05) 0%, rgba(0,74,172,0.05) 100%)',
            }}>
              <div style={{ textAlign: 'center', padding: 'calc(var(--lh) * 3)' }}>
                <div style={{
                  font: '700 14px/1 var(--font-mono)',
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginBottom: 'var(--lh)',
                }}>
                  Swiss Design
                </div>
                <div style={{
                  font: '700 14px/1 var(--font-mono)',
                  color: 'var(--accent-blue)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginBottom: 'var(--lh)',
                }}>
                  Carbon System
                </div>
                <div style={{
                  font: '700 14px/1 var(--font-mono)',
                  color: 'var(--ink-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                }}>
                  Grid Aligned
                </div>
              </div>
            </div>
          </div>
        </Band>
      </Wrap>
    </Section>
  );
}