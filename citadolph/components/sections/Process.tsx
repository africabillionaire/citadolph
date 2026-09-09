'use client';

import { processSteps } from '@/lib/site-content';
import { Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent } from '@/components/ui/Card';
import { Section, Wrap, Band } from '@/components/ui/Grid';

export function Process() {
  return (
    <Section id="process" variant="default" ariaLabel="process-title">
      <Wrap>
        <Band span="1 / 13" className="mb-[calc(var(--lh)*4)]">
          <span style={{ font: '700 11px/1 var(--font-mono)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: 'var(--lh)' }}>
            How We Work
          </span>
          <Heading id="process-title" as="h2" size="2" className="mb-[var(--lh)]">Five Steps to Digital Transformation</Heading>
          <Text maxWidth="wide">
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
                <div style={{
                  font: '700 48px/1 var(--font-mono)',
                  color: 'var(--accent)',
                  opacity: 0.3,
                }}>
                  {step.number}
                </div>
                <div style={{
                  font: '700 11px/1 var(--font-mono)',
                  color: 'var(--ink-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginTop: '4px',
                }}>
                  Step
                </div>
              </div>
            </Band>

            <Band span="3 / 8">
              <Heading as="h3" size="3" weight="semibold" className="mb-2">
                {step.title}
              </Heading>
              <Text size="lg" color="muted" style={{ lineHeight: '24px' }}>
                {step.description}
              </Text>
            </Band>

            <Band span="8 / 13">
              <Card variant="outlined" padding="lg" className="h-full flex items-center justify-center text-center min-h-[120px]">
                <span style={{
                  font: '500 13px/1 var(--font-mono)',
                  color: 'var(--ink-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
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