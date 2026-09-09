'use client';

import { services } from '@/lib/site-content';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { Kicker, Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent } from '@/components/ui/Card';
import { Section, Wrap, Band } from '@/components/ui/Grid';

export function Services() {
  return (
    <Section id="services" variant="alt" ariaLabel="services-title">
      <Wrap>
        <Band span="1 / 5" style={{ paddingTop: 'var(--lh)' }}>
          <Kicker>What We Do</Kicker>
          <Heading id="services-title" as="h2" size="2">12 Domains of Digital Excellence</Heading>
          <Text className="mb-8" maxWidth="prose">
            Each service is delivered by specialist agencies and independent
            contractors, orchestrated by your dedicated digital concierge.
          </Text>
          <Button variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Discuss Your Needs
          </Button>
        </Band>

        <Band span="5 / 13" style={{ gridTemplateRows: 'repeat(6, auto)' }}>
          {services.map((service, index) => (
            <Card
              key={service.id}
              variant="interactive"
              padding="md"
              hover
              style={{
                gridColumn: index % 2 === 0 ? '1 / 5' : '5 / 9',
                gridRow: Math.floor(index / 2) + 1,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <CardContent className="flex flex-col h-full">
                <Heading as="h3" size="5" weight="semibold" className="mb-2">
                  {service.title}
                </Heading>
                <Text size="sm" color="muted" className="flex-1" style={{ lineHeight: '20px' }}>
                  {service.description}
                </Text>
              </CardContent>
            </Card>
          ))}
        </Band>
      </Wrap>
    </Section>
  );
}