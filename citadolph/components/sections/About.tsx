'use client';

import { CheckCircle, Users, Award, TrendingUp, Shield, AlertCircle } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { stats, networkFeatures, clientTypes, caseStudies, specialistScarcity } from '@/lib/site-content';
import { Button } from '@/components/ui/Button';
import { Kicker, Heading, Text, Badge } from '@/components/ui/Typography';
import { Card, CardContent } from '@/components/ui/Card';
import { Section, Wrap, Band } from '@/components/ui/Grid';
import { cn } from '@/lib/utils';

export function About() {
  return (
    <Section id="about" variant="alt" ariaLabel="about-title">
      <Wrap>
        <Band span="1 / 7" style={{ paddingTop: 'var(--lh)' }}>
          <Kicker>Our Network</Kicker>
          <Heading id="about-title" as="h2" size="2" className="mb-[var(--lh)]" style={{ lineHeight: 'calc(var(--lh) * 1.2)' }}>
            Specialists, Agencies, and a Concierge for You
          </Heading>
          <Text className="mb-[calc(var(--lh)*2)]" maxWidth="prose" style={{ lineHeight: 'var(--lh)' }}>
            We don&apos;t hire generalists. We partner with specialized agencies and
            independent contractors who are masters of their craft. Your digital
            concierge assembles the right team for your specific challenge.
          </Text>
          
          {/* Network features with social proof (Common Region + Social Proof) */}
          <ul className="mb-[calc(var(--lh)*3)]" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lh)' }}>
            {networkFeatures.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-3 bg-[var(--paper)] border border-[var(--border)] rounded-[var(--radius-sm)]"
                style={{ fontSize: '14px', lineHeight: 'var(--lh)', color: 'var(--ink)' }}
              >
                <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p style={{ font: '500 13px/1.3 var(--font-sans)', marginBottom: 'calc(var(--bl) * 0.5)' }}>
                    {feature.text}
                  </p>
                  <p style={{ font: '400 11px/1 var(--font-mono)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 'var(--lh)' }}>
                    Proof: {feature.proof}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* Loss-framed CTA for specialists (Scarcity + Loss Aversion) */}
          <div className="mb-[calc(var(--lh)*2)] p-4 bg-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-[var(--radius-sm)]">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                <span style={{ font: '600 13px/1 var(--font-sans)', color: 'var(--accent)', lineHeight: 'var(--lh)' }}>
                  Only {specialistScarcity.slotsOpen} {specialistScarcity.role} open {specialistScarcity.timeframe}
                </span>
              </div>
            </div>
          </div>
          
          <Button rightIcon={<ArrowRight className="w-4 h-4" />} className="min-h-[48px]" style={{ lineHeight: 'var(--lh)' }}>
            Join as a Specialist
          </Button>
        </Band>

        {/* Stats with context - 2-column subgrid */}
        <Band span="7 / 13" style={{ gridTemplateRows: '1fr', rowGap: 'var(--gutter)' }}>
          {stats.map((stat) => (
            <Band key={stat.label} span="1 / 7">
              <Card variant="interactive" padding="lg" hover className="text-center">
                <div style={{ font: '700 48px/1 var(--font-display)', color: 'var(--accent)', marginBottom: 'calc(var(--bl) * 1)', lineHeight: 'calc(var(--lh) * 2)' }}>
                  {stat.value}
                </div>
                <div style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'calc(var(--bl) * 1)', lineHeight: 'var(--lh)' }}>
                  {stat.label}
                </div>
                <div style={{ font: '400 12px/1.4 var(--font-sans)', color: 'var(--ink-muted)', lineHeight: 'var(--lh)' }}>
                  {stat.context}
                </div>
              </Card>
            </Band>
          ))}
        </Band>

        {/* Case Studies - Social Proof at decision point - using subgrid Bands */}
        <Band span="1 / 13" className="mt-[calc(var(--lh)*6)] pt-[calc(var(--lh)*4)] border-t border-[var(--border)]" style={{ gridTemplateRows: 'auto auto 1fr', rowGap: 'calc(var(--lh)*3)' }}>
          <Kicker style={{ gridColumn: '1 / -1', marginBottom: 'var(--lh)' }}>Case Studies</Kicker>
          <Heading as="h3" size="3" weight="semibold" style={{ gridColumn: '1 / -1', marginBottom: 'calc(var(--lh)*3)' }}>Real Outcomes for African Organizations</Heading>
          
          <Band span="1 / 13" style={{ gridTemplateRows: 'repeat(auto-fit, minmax(0, 1fr))', rowGap: 'var(--gutter)' }}>
            {caseStudies.map((study, i) => (
              <Band key={study.client} span="1 / 5">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-[var(--paper)] border border-[var(--border)] rounded-[var(--radius-md)] hover:border-[var(--accent)] transition-colors h-full"
                >
                  <div className="mb-[calc(var(--lh)*1.5)] flex items-center gap-2" style={{ lineHeight: 'var(--lh)' }}>
                    <Badge variant="outline" size="sm">{study.sector}</Badge>
                  </div>
                  <h4 style={{ font: '600 16px/1.3 var(--font-sans)', color: 'var(--ink)', marginBottom: 'var(--lh)' }}>
                    {study.client}
                  </h4>
                  <div className="space-y-[calc(var(--lh)*1.5)] mb-[calc(var(--lh)*2)]">
                    <div>
                      <p style={{ font: '600 11px/1 var(--font-mono)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'calc(var(--bl) * 0.5)', lineHeight: 'var(--lh)' }}>Challenge</p>
                      <p style={{ font: '400 13px/1.5 var(--font-sans)', color: 'var(--ink-muted)', lineHeight: 'var(--lh)' }}>{study.challenge}</p>
                    </div>
                    <div>
                      <p style={{ font: '600 11px/1 var(--font-mono)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'calc(var(--bl) * 0.5)', lineHeight: 'var(--lh)' }}>Solution</p>
                      <p style={{ font: '400 13px/1.5 var(--font-sans)', color: 'var(--ink-muted)', lineHeight: 'var(--lh)' }}>{study.solution}</p>
                    </div>
                    <div>
                      <p style={{ font: '600 11px/1 var(--font-mono)', color: 'var(--success)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'calc(var(--bl) * 0.5)', lineHeight: 'var(--lh)' }}>Outcome</p>
                      <p style={{ font: '500 13px/1.5 var(--font-sans)', color: 'var(--ink)', lineHeight: 'var(--lh)' }}>{study.outcome}</p>
                    </div>
                  </div>
                </motion.article>
              </Band>
            ))}
          </Band>
        </Band>

        {/* Client types with counts (Social Proof) - using subgrid Bands */}
        <Band span="1 / 13" className="mt-[calc(var(--lh)*4)] pt-[calc(var(--lh)*4)] border-t border-[var(--border)]" style={{ gridTemplateRows: 'auto 1fr', rowGap: 'var(--lh)' }}>
          <Heading as="h3" size="4" weight="semibold" style={{ gridColumn: '1 / 4', marginBottom: 'var(--lh)', lineHeight: 'calc(var(--lh) * 1.2)' }}>
            We Serve
          </Heading>
          <Band span="4 / 13" style={{ gridTemplateRows: 'auto', rowGap: 'calc(var(--bl) * 1.5)' }}>
            {clientTypes.map((type) => (
              <Band key={type.label} span="1 / 5">
                <Badge
                  variant="outline"
                  size="md"
                  className={cn(
                    'transition-all duration-150 cursor-default',
                    'hover:border-[var(--accent)] hover:text-[var(--accent)]',
                    'group'
                  )}
                  style={{ lineHeight: 'var(--lh)' }}
                >
                  <span className="flex items-center gap-2">
                    {type.label}
                    <span className={cn(
                      'px-1.5 py-0.5 text-xs rounded-full font-mono',
                      'bg-[var(--paper-alt)] text-[var(--ink-muted)]',
                      'group-hover:bg-[var(--accent)] group-hover:text-[var(--paper)] transition-colors'
                    )}>
                      {type.count}
                    </span>
                    {type.example && (
                      <span className="text-xs text-[var(--ink-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                        e.g., {type.example}
                      </span>
                    )}
                  </span>
                </Badge>
              </Band>
            ))}
          </Band>
        </Band>
      </Wrap>
    </Section>
  );
}