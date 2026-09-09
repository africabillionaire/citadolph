'use client';

import Image from 'next/image';
import { Shield, Globe } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Kicker, Heading, Text } from '@/components/ui/Typography';
import { Section, Wrap, Band } from '@/components/ui/Grid';
import { siteConfig } from '@/lib/site-content';

export function Hero() {
  return (
    <Section
      id="hero"
      variant="default"
      ariaLabel="hero-title"
      className="relative"
      style={{ paddingTop: 'calc(var(--lh) * 10)', paddingBottom: 'calc(var(--lh) * 8)' }}
    >
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
          <Text size="xl" color="ink" maxWidth="wide" className="mb-12" style={{ lineHeight: 'calc(var(--lh) * 1.5)' }}>
            Your premier digital partner. From strategy to execution, we deliver
            websites, apps, ERPs, branding, and AI solutions — backed by a network
            of specialist agencies across the continent.
          </Text>
          <div className="flex flex-wrap gap-4 items-center mb-12">
            <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Start Your Project
            </Button>
            <Button variant="secondary" size="lg">
              Our Process
            </Button>
          </div>
          <div className="flex flex-wrap gap-6 items-center" style={{ color: 'var(--ink-muted)' }}>
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