'use client';

import { CheckCircle } from 'lucide-react';
import { stats, networkFeatures, clientTypes } from '@/lib/site-content';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { Kicker, Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Typography';
import { Section, Wrap, Band } from '@/components/ui/Grid';

export function About() {
  return (
    <Section id="about" variant="alt" ariaLabel="about-title">
      <Wrap>
        <Band span="1 / 7" style={{ paddingTop: 'var(--lh)' }}>
          <Kicker>Our Network</Kicker>
          <Heading id="about-title" as="h2" size="2" className="mb-[var(--lh)]">
            Specialists, Agencies, and a Concierge for You
          </Heading>
          <Text className="mb-8" maxWidth="prose">
            We don&apos;t hire generalists. We partner with specialized agencies and
            independent contractors who are masters of their craft. Your digital
            concierge assembles the right team for your specific challenge.
          </Text>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--lh)', marginBottom: 'calc(var(--lh) * 3)' }}>
            {networkFeatures.map((feature, i) => (
              <li key={i} className="flex items-start gap-3" style={{ fontSize: '15px', lineHeight: '24px', color: 'var(--ink)' }}>
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Button rightIcon={<ArrowRight className="w-4 h-4" />}>
            Join as a Specialist
          </Button>
        </Band>

        <Band span="7 / 13" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--gutter)' }}>
          {stats.map((stat) => (
            <Card key={stat.label} variant="interactive" padding="lg" hover className="text-center">
              <div style={{ font: '700 48px/1 var(--font-display)', color: 'var(--accent)', marginBottom: '8px' }}>
                {stat.value}
              </div>
              <div style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {stat.label}
              </div>
            </Card>
          ))}
        </Band>

        <Band span="1 / 13" className="mt-[calc(var(--lh)*4)] pt-[calc(var(--lh)*4)] border-t border-[var(--border)]">
          <Heading as="h3" size="4" weight="semibold" style={{ gridColumn: '1 / 4', marginBottom: 'var(--lh)' }}>
            We Serve
          </Heading>
          <div className="flex flex-wrap gap-4" style={{ gridColumn: '4 / 13' }}>
            {clientTypes.map((type) => (
              <Badge
                key={type}
                variant="outline"
                size="md"
                className="transition-all duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-default"
              >
                {type}
              </Badge>
            ))}
          </div>
        </Band>
      </Wrap>
    </Section>
  );
}