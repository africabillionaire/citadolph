'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Users, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Heading, Text, Kicker } from '@/components/ui/Typography';
import { Section, Wrap, Band } from '@/components/ui/Grid';
import { ctaScarcity, ctaAnchor, heroSocialProof } from '@/lib/site-content';
import { cn } from '@/lib/utils';

export function CTA() {
  return (
    <Section
      id="cta"
      variant="default"
      ariaLabel="cta-title"
      className="text-[var(--paper)] relative overflow-hidden"
      style={{ background: 'var(--ink)' }}
    >
      {/* Accent line at top - baseline aligned */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'var(--accent)' }} aria-hidden="true" />

      <Wrap>
        <Band span="1 / 13" className="py-[calc(var(--lh)*4)] relative z-10">
          {/* Content placed flush-left at column 2-11 (10 columns), leaving 1 col margin on each side */}
          <Band span="2 / 12" className="text-left">
            {/* Loss-framed headline (Loss Aversion) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-[calc(var(--lh)*3)]"
            >
              <Kicker color="inverted" className="mb-[calc(var(--lh)*1.5)]" style={{ color: 'var(--accent)', lineHeight: 'var(--lh)' }}>
                Don&apos;t Let Another Quarter Pass
              </Kicker>
              <Heading id="cta-title" as="h2" size="1" weight="bold" color="inverted" className="mb-[calc(var(--lh)*1.5)]" style={{ lineHeight: 'calc(var(--lh) * 4)' }}>
                Without Digital Infrastructure,
                <br />
                You&apos;re Losing Ground
              </Heading>
              <Text size="lg" color="inverted" maxWidth="prose" className="mb-[calc(var(--lh)*3)]" style={{ opacity: 0.7, lineHeight: 'var(--lh)' }}>
                Every quarter without a digital strategy means missed revenue, 
                slower operations, and competitors pulling ahead.
              </Text>
            </motion.div>

            {/* Scarcity + Social Proof + Anchoring (Common Region) - 3-column subgrid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-[calc(var(--lh)*3)] p-6 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-[var(--radius-md)]"
            >
              <Band span="1 / 13" style={{ gridTemplateRows: '1fr', rowGap: 'var(--gutter)' }}>
                {/* Scarcity */}
                <Band span="1 / 5">
                  <div className="flex items-center gap-3 p-4 bg-[rgba(228,0,43,0.1)] border border-[var(--accent)]/30 rounded-[var(--radius-sm)]" style={{ lineHeight: 'var(--lh)' }}>
                    <div className="w-12 h-12 rounded-full bg-[var(--accent)]/20 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-6 h-6" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                    </div>
                    <div>
                      <p style={{ font: '700 18px/1 var(--font-display)', color: 'var(--accent)', lineHeight: 'calc(var(--lh) * 1.5)' }}>
                        Only {ctaScarcity.slotsLeft} Left
                      </p>
                      <p style={{ font: '400 12px/1 var(--font-sans)', color: 'rgba(255,255,255,0.7)', lineHeight: 'var(--lh)' }}>
                        {ctaScarcity.type} {ctaScarcity.timeframe}
                      </p>
                    </div>
                  </div>
                </Band>

                {/* Social Proof */}
                <Band span="5 / 9">
                  <div className="flex items-center gap-3 p-4 bg-[rgba(0,74,172,0.1)] border border-[var(--accent-blue)]/30 rounded-[var(--radius-sm)]" style={{ lineHeight: 'var(--lh)' }}>
                    <div className="w-12 h-12 rounded-full bg-[var(--accent-blue)]/20 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6" style={{ color: 'var(--accent-blue)' }} aria-hidden="true" />
                    </div>
                    <div>
                      <p style={{ font: '700 18px/1 var(--font-display)', color: 'var(--accent-blue)', lineHeight: 'calc(var(--lh) * 1.5)' }}>
                        {heroSocialProof.businessesJoined}+
                      </p>
                      <p style={{ font: '400 12px/1 var(--font-sans)', color: 'rgba(255,255,255,0.7)', lineHeight: 'var(--lh)' }}>
                        {heroSocialProof.region} started {heroSocialProof.timeframe}
                      </p>
                    </div>
                  </div>
                </Band>

                {/* Anchoring */}
                <Band span="9 / 13">
                  <div className="flex items-center gap-3 p-4 bg-[rgba(16,185,129,0.1)] border border-[var(--success)]/30 rounded-[var(--radius-sm)]" style={{ lineHeight: 'var(--lh)' }}>
                    <div className="w-12 h-12 rounded-full bg-[var(--success)]/20 flex items-center justify-center flex-shrink-0">
                      <ArrowRight className="w-6 h-6" style={{ color: 'var(--success)' }} aria-hidden="true" />
                    </div>
                    <div>
                      <p style={{ font: '700 18px/1 var(--font-display)', color: 'var(--success)', lineHeight: 'calc(var(--lh) * 1.5)' }}>
                        {ctaAnchor.freeOffer}
                      </p>
                      <p style={{ font: '400 12px/1 var(--font-sans)', color: 'rgba(255,255,255,0.7)', lineHeight: 'var(--lh)' }}>
                        {ctaAnchor.premiumLabel} from {ctaAnchor.premiumPrice}
                      </p>
                    </div>
                  </div>
                </Band>
              </Band>
            </motion.div>

            {/* CTAs - Primary is larger (Fitts's Law), placed on column lines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-[calc(var(--lh)*3)] flex flex-col sm:flex-row gap-4"
            >
              <Band span="1 / 7">
                <Button
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className={cn(
                    'min-h-[56px] w-full',
                    'shadow-[0_8px_32px_rgba(228,0,43,0.4)]',
                    'hover:shadow-[0_12px_40px_rgba(228,0,43,0.5)]',
                    'transition-shadow duration-300'
                  )}
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--paper)',
                    borderColor: 'var(--accent)',
                    padding: '20px 48px',
                    fontSize: '15px',
                    lineHeight: 'var(--lh)',
                  }}
                >
                  Claim Free Discovery Session
                </Button>
              </Band>
              <Band span="7 / 13">
                <Button
                  variant="outline"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="min-h-[56px] w-full"
                  style={{
                    background: 'transparent',
                    color: 'var(--paper)',
                    borderColor: 'rgba(255,255,255,0.3)',
                    padding: '18px 36px',
                    lineHeight: 'var(--lh)',
                  }}
                >
                  Explore Services
                </Button>
              </Band>
            </motion.div>

            {/* Risk-free guarantee (Loss Aversion reversal) */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-left"
              style={{ font: '400 13px/1.5 var(--font-sans)', color: 'rgba(255,255,255,0.5)', lineHeight: 'var(--lh)' }}
            >
              No commitment · No credit card · 30-min strategy call · Cancel anytime
            </motion.p>
          </Band>
        </Band>
      </Wrap>
    </Section>
  );
}