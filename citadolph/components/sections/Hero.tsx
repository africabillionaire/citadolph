'use client';

import Image from 'next/image';
import { Shield, Globe, Users, ArrowRight, Zap, BarChart3, Cpu, Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Kicker, Heading, Text } from '@/components/ui/Typography';
import { Section, Wrap, Band } from '@/components/ui/Grid';
import { siteConfig, heroSocialProof, contactReciprocity, ctaScarcity } from '@/lib/site-content';
import { OpticalAlign } from '@/components/ui/OpticalAlign';
import { motion } from 'framer-motion';

const serviceHighlights = [
  { icon: Cpu, label: 'AI Implementation', metric: '12+ projects', color: 'var(--accent-blue)' },
  { icon: BarChart3, label: 'Digital Marketing', metric: '3× ROAS avg', color: 'var(--accent)' },
  { icon: Lock, label: 'ISO 27001 / SOC 2', metric: 'Zero incidents', color: 'var(--success)' },
  { icon: Zap, label: 'ERP Systems', metric: '35% automation', color: 'var(--warning)' },
] as const;

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
        {/* Left Column: Content (columns 1-7) */}
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

          {/* Dynamic Progress Indicator — tied to scroll/engagement (Goal Gradient) */}
          <motion.div
            className="mb-[calc(var(--lh)*3)]"
            role="progressbar"
            aria-valuenow={30}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Project journey progress"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-[var(--lh)]">
              <div className="flex-1 h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--accent)] rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 0.3 }}
                  transition={{ delay: 0.5, duration: 0.8, type: 'spring', stiffness: 200, damping: 20 }}
                  style={{ transformOrigin: 'left', width: '100%' }}
                />
              </div>
              <span style={{ font: '600 11px/1 var(--font-mono)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                30%
              </span>
            </div>
            <Text size="sm" color="muted" className="text-left" style={{ lineHeight: 'var(--lh)' }}>
              Step 1 of 3 — Discovery → Proposal → Build
            </Text>
          </motion.div>

          {/* Primary CTAs — Fitts's Law: large targets, thumb zone */}
          <motion.div
            className="flex flex-wrap gap-4 items-center mb-[calc(var(--lh)*3)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="min-h-[56px] min-w-[240px]"
              style={{ padding: '20px 40px', fontSize: '14px', lineHeight: 'var(--lh)' }}
            >
              Claim Your Free Discovery
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="min-h-[56px]"
              style={{ lineHeight: 'var(--lh)' }}
            >
              Our Process
            </Button>
          </motion.div>

          {/* Reciprocity: Free value offer — Common Region with CTA */}
          <motion.div
            className="mb-[calc(var(--lh)*3)] p-5 bg-[var(--paper)] border border-[var(--border)] rounded-[var(--radius-sm)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{ lineHeight: 'var(--lh)' }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6" style={{ color: 'var(--accent)' }} aria-hidden="true" />
              </div>
              <div className="flex-1">
                <p style={{ font: '600 14px/1.3 var(--font-sans)', color: 'var(--ink)', marginBottom: 'var(--lh)' }}>
                  {contactReciprocity.offer}: Free 30-min strategy session
                </p>
                <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: 0, padding: 0, listStyle: 'none' }}>
                  {contactReciprocity.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--ink-muted)', lineHeight: 'var(--lh)' }}>
                      <span className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Service Highlights — Proof of capability (not just badges) */}
          <motion.div
            className="mb-[calc(var(--lh)*3)] grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{ lineHeight: 'var(--lh)' }}
          >
            {serviceHighlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="p-4 bg-[var(--paper-alt)] border border-[var(--border)] rounded-[var(--radius-sm)] hover:border-[var(--accent)] transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-[var(--radius-sm)] flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}/10` }}>
                    <item.icon className="w-5 h-5" style={{ color: item.color }} aria-hidden="true" />
                  </div>
                  <div>
                    <p style={{ font: '600 13px/1.3 var(--font-sans)', color: 'var(--ink)' }}>{item.label}</p>
                    <p style={{ font: '500 11px/1 var(--font-mono)', color: item.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.metric}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Proof near CTA (Common Region) */}
          <motion.div
            className="flex items-center gap-3 mb-[calc(var(--lh)*3)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{ color: 'var(--ink-muted)', lineHeight: 'var(--lh)' }}
          >
            <Users className="w-5 h-5" style={{ color: 'var(--accent)' }} aria-hidden="true" />
            <span style={{ font: '500 13px/1 var(--font-sans)' }}>
              {heroSocialProof.businessesJoined} {heroSocialProof.region} started {heroSocialProof.timeframe}
            </span>
          </motion.div>

          {/* Scarcity Signal — Real capacity indicator */}
          <motion.div
            className="p-4 bg-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-[var(--radius-sm)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            style={{ lineHeight: 'var(--lh)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--accent)]/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-4 h-4" style={{ color: 'var(--accent)' }} aria-hidden="true" />
              </div>
              <div>
                <p style={{ font: '600 13px/1.3 var(--font-sans)', color: 'var(--accent)' }}>
                  Only {ctaScarcity.slotsLeft} {ctaScarcity.type} open {ctaScarcity.timeframe}
                </p>
                <p style={{ font: '400 12px/1.3 var(--font-sans)', color: 'var(--ink-muted)' }}>
                  Capacity-limited to ensure quality delivery
                </p>
              </div>
            </div>
          </motion.div>
        </Band>

        {/* Right Column: Visual Proof (columns 8-13) */}
        <Band span="8 / 13" style={{ paddingTop: 'var(--lh)' }}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              aspectRatio: '4/5',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              background: 'var(--paper-alt)',
              border: '1px solid var(--border)',
              position: 'relative',
              height: 'calc(var(--lh) * 20)', /* 480px = 20 × 24px */
            }}
            aria-label="Service capability visualization"
          >
            {/* Grid visualization showing our 12-column system in action */}
            <div className="absolute inset-0" style={{ opacity: 0.03 }}>
              <div className="grid grid-cols-12 gap-[var(--gutter)] h-full px-[var(--margin)] pt-[var(--lh)]">
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="relative" style={{ background: 'var(--accent)' }}>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[8px] font-mono" style={{ color: 'var(--paper)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Baseline grid visualization */}
            <div className="absolute inset-0" style={{ opacity: 0.02 }}>
              <div style={{
                height: '100%',
                backgroundImage: `
                  repeating-linear-gradient(
                    to bottom,
                    transparent,
                    transparent calc(var(--bl) - 1px),
                    var(--accent) calc(var(--bl) - 1px),
                    var(--accent) var(--bl)
                  ),
                  repeating-linear-gradient(
                    to bottom,
                    transparent,
                    transparent calc(var(--lh) - 1px),
                    var(--accent) calc(var(--lh) - 1px),
                    var(--accent) var(--lh)
                  )
                `
              }} />
            </div>

            {/* Centered brand mark with purpose */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              padding: 'calc(var(--lh) * 4)',
            }}>
              <Image
                src="/images/logo_full_black.svg"
                alt={`${siteConfig.name} brand mark`}
                width={200}
                height={200}
                style={{ objectFit: 'contain', opacity: 0.15 }}
              />
            </div>

            {/* Corner annotation: Grid system badge */}
            <div className="absolute bottom-[var(--margin)] right-[var(--margin)] text-right">
              <div style={{
                font: '600 10px/1 var(--font-mono)',
                color: 'var(--accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 'calc(var(--bl) * 0.5)',
              }}>
                12-Column Grid
              </div>
              <div style={{
                font: '400 10px/1 var(--font-mono)',
                color: 'var(--ink-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                8px Baseline
              </div>
            </div>
          </motion.div>
        </Band>
      </Wrap>
    </Section>
  );
}