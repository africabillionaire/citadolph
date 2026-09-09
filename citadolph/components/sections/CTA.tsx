'use client';

import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { Heading, Text } from '@/components/ui/Typography';
import { Section, Wrap, Band } from '@/components/ui/Grid';

export function CTA() {
  return (
    <Section
      id="cta"
      variant="default"
      ariaLabel="cta-title"
      className="text-[var(--paper)]"
      style={{ background: 'var(--ink)' }}
    >
      <Wrap>
        <Band span="1 / 13" className="text-center py-[calc(var(--lh)*2)]">
          <Heading id="cta-title" as="h2" size="1" weight="bold" color="inverted" className="mb-[var(--lh)]">
            Ready to Transform
            <br />
            Your Digital Presence?
          </Heading>
          <Text size="lg" color="inverted" maxWidth="prose" className="mx-auto mb-12" style={{ opacity: 0.7, lineHeight: '28px' }}>
            Start with a free discovery session. No commitment, just clarity on
            what&apos;s possible for your business.
          </Text>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />} style={{
              background: 'var(--accent)',
              color: 'var(--paper)',
              borderColor: 'var(--accent)',
              padding: '18px 36px',
            }}>
              Book Free Discovery
            </Button>
            <Button variant="outline" size="lg" style={{
              background: 'transparent',
              color: 'var(--paper)',
              borderColor: 'rgba(255,255,255,0.3)',
              padding: '18px 36px',
            }}>
              Explore Services
            </Button>
          </div>
        </Band>
      </Wrap>
    </Section>
  );
}