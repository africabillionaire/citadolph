'use client';

import { processSteps, ProcessStep } from '@/lib/site-content';
import { Heading, Text, Kicker } from '@/components/ui/Typography';
import { Card, CardContent } from '@/components/ui/Card';
import { Section, Wrap, Band } from '@/components/ui/Grid';
import { OpticalAlign } from '@/components/ui/OpticalAlign';

export function Process() {
  return (
    <Section id="process" variant="default" ariaLabel="process-title">
      {/* Optical alignment for step numerals */}
      <OpticalAlign selector=".step-number" />
      
      <Wrap>
        <Band span="1 / 13" className="mb-[calc(var(--lh)*4)]">
          <Kicker>How We Work</Kicker>
          <Heading id="process-title" as="h2" size="2" className="mb-[var(--lh)]">Five Steps to Digital Transformation</Heading>
          <Text maxWidth="wide" style={{ lineHeight: 'var(--lh)' }}>
            A proven methodology that reduces risk, ensures alignment, and delivers
            measurable outcomes — every time.
          </Text>
        </Band>

        {processSteps.map((step, index) => (
          <Band
            key={step.number}
            span="1 / 13"
            className="py-[calc(var(--lh)*2)] items-center"
            style={{
              borderTop: index > 0 ? '1px solid var(--border)' : 'none',
              gridTemplateColumns: 'subgrid',
            }}
          >
            <Band span="1 / 3" className="flex items-center justify-end pr-[var(--gutter)]">
              <div style={{ textAlign: 'right' }}>
                <div className="step-number" style={{
                  font: '700 48px/1 var(--font-mono)',
                  color: 'var(--accent)',
                  opacity: 0.3,
                  lineHeight: 'calc(var(--lh) * 2)', /* 48px = 2 × 24px */
                }}>
                  {step.number}
                </div>
                <div style={{
                  font: '700 11px/1 var(--font-mono)',
                  color: 'var(--ink-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginTop: 'calc(var(--bl) * 0.5)',
                  lineHeight: 'var(--lh)',
                }}>
                  Step
                </div>
              </div>
            </Band>

            <Band span="3 / 8">
              <Heading as="h3" size="3" weight="semibold" className="mb-[calc(var(--bl)*1.5)]" style={{ lineHeight: 'calc(var(--lh) * 1.5)' }}>
                {step.title}
              </Heading>
              <Text size="lg" color="muted" style={{ lineHeight: 'var(--lh)' }}>
                {step.description}
              </Text>
            </Band>

            <Band span="8 / 13">
              <Card variant="outlined" padding="lg" className="h-full flex items-center justify-center text-center" style={{ minHeight: 'calc(var(--lh) * 5)' }}>
                <span style={{
                  font: '500 13px/1 var(--font-mono)',
                  color: 'var(--ink-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  lineHeight: 'var(--lh)',
                }}>
                  {step.visual}
                </span>
              </Card>
            </Band>
          </Band>
        ))}
      </Wrap>
    </Section>
  );
}