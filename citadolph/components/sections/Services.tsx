'use client';

import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { services, serviceCategories, Service } from '@/lib/site-content';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { Kicker, Heading, Text, Badge } from '@/components/ui/Typography';
import { Card, CardContent } from '@/components/ui/Card';
import { Section, Wrap, Band } from '@/components/ui/Grid';
import { cn } from '@/lib/utils';

const FEATURED_COUNT = 4;

export function Services() {
  const [expanded, setExpanded] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const featuredServices = services.filter((s) => 'featured' in s && s.featured === true).slice(0, FEATURED_COUNT);
  const allServices = [...services];

  return (
    <Section id="services" variant="alt" ariaLabel="services-title">
      <Wrap>
        <Band span="1 / 5" style={{ paddingTop: 'var(--lh)' }}>
          <Kicker>What We Do</Kicker>
          <Heading id="services-title" as="h2" size="2">12 Domains of Digital Excellence</Heading>
          <Text className="mb-[calc(var(--lh)*2)]" maxWidth="prose" style={{ lineHeight: 'var(--lh)' }}>
            Each service is delivered by specialist agencies and independent
            contractors, orchestrated by your dedicated digital concierge.
          </Text>
          
          {/* Category filter tabs (Hick's Law - reduce visible choices) */}
          <div className="mb-[calc(var(--lh)*2)] flex flex-wrap gap-2" role="tablist" aria-label="Service categories">
            {serviceCategories.map((cat, i) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={!expanded || i === 0}
                onClick={() => setExpanded(!expanded)}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-[var(--radius-full)] transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2',
                  !expanded || i === 0
                    ? 'bg-[var(--accent)] text-[var(--paper)]'
                    : 'bg-[var(--paper-alt)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--paper)]'
                )}
                style={{ border: '1px solid transparent', lineHeight: 'var(--lh)' }}
              >
                {cat.label}
                {!expanded && i === serviceCategories.length - 1 && (
                  <ChevronDown className="w-4 h-4 ml-1" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>

          <Button variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />} className="min-h-[48px]" style={{ lineHeight: 'var(--lh)' }}>
            Discuss Your Needs
          </Button>
        </Band>

        <Band span="5 / 13">
          {/* Category sections with progressive disclosure */}
          <AnimatePresence mode="popLayout">
            {serviceCategories.map((category, catIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: catIndex * 0.05, duration: 0.3 }}
                className={expanded || catIndex === 0 ? '' : 'hidden'}
              >
                {/* Category header */}
                <div className="mb-[calc(var(--lh)*1.5)] flex items-center gap-3 pb-[calc(var(--lh)*1.5)] border-b border-[var(--border)]" style={{ lineHeight: 'var(--lh)' }}>
                  <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                    <span className="w-5 h-5" style={{ color: 'var(--accent)' }}>{category.icon[0]}</span>
                  </div>
                  <div>
                    <h3 style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--ink)', marginBottom: 'calc(var(--bl) * 0.5)' }}>{category.label}</h3>
                    <p style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--ink-muted)' }}>{category.description}</p>
                  </div>
                </div>

                {/* Service cards grid - using subgrid Bands */}
                <Band style={{ gridTemplateRows: 'repeat(auto-fit, minmax(0, 1fr))', rowGap: 'var(--gutter)' }}>
                  {allServices
                    .filter(s => s.category === category.id)
                    .map((service, index) => (
                      <Band key={service.id} span="1 / 7" className="sm:span-4">
                        <ServiceCard
                          service={service}
                          index={index}
                          hoveredService={hoveredService}
                          onHover={setHoveredService}
                        />
                      </Band>
                    ))}
                </Band>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* View All toggle (Progressive Disclosure) */}
          {!expanded && (
            <motion.button
              onClick={() => setExpanded(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-[calc(var(--lh)*2)] w-full py-4 px-6 text-left bg-[var(--paper-alt)] border border-[var(--border)] rounded-[var(--radius-sm)] hover:border-[var(--accent)] hover:bg-[var(--paper)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
              style={{ font: '500 13px/1 var(--font-sans)', color: 'var(--ink)', lineHeight: 'var(--lh)' }}
            >
              <span className="flex items-center justify-between">
                View all 12 services
                <ChevronDown className="w-5 h-5 text-[var(--accent)]" aria-hidden="true" />
              </span>
            </motion.button>
          )}
        </Band>
      </Wrap>
    </Section>
  );
}

interface ServiceCardProps {
  service: Service;
  index: number;
  hoveredService: string | null;
  onHover: (id: string | null) => void;
}

function ServiceCard({ service, hoveredService, onHover }: ServiceCardProps) {
  const isHovered = hoveredService === service.id;
  const isPopular = service.popular;

  return (
    <motion.div
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group"
    >
      <Card
        variant="interactive"
        padding="md"
        hover
        className={cn(
          'h-full flex flex-col transition-all duration-300',
          isPopular && 'ring-2 ring-[var(--accent)]/20'
        )}
        style={{
          border: isPopular ? '2px solid var(--accent)' : '1px solid var(--border)',
        }}
      >
        <CardContent className="flex flex-col h-full">
          <div className="flex items-start justify-between gap-2 mb-[calc(var(--lh)*1.5)]" style={{ lineHeight: 'var(--lh)' }}>
            <Badge
              variant={isPopular ? 'accent' : 'outline'}
              size="sm"
              className={cn(
                'flex-shrink-0',
                isPopular && 'bg-[var(--accent)]/10 border-[var(--accent)]/30 text-[var(--accent)]'
              )}
            >
              {isPopular ? 'Most Popular' : service.category.replace('-', ' ').toUpperCase()}
            </Badge>
            {isPopular && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex-shrink-0 text-[var(--accent)]"
              >
                <Check className="w-4 h-4" />
              </motion.span>
            )}
          </div>

          <Heading as="h3" size="5" weight="semibold" className="mb-[var(--lh)] group-hover:text-[var(--accent)] transition-colors" style={{ lineHeight: 'var(--lh)' }}>
            {service.title}
          </Heading>
          
          <Text size="sm" color="muted" className="flex-1 mb-[calc(var(--lh)*2)]" style={{ lineHeight: 'var(--lh)' }}>
            {service.description}
          </Text>

          {/* Social Proof: Client count */}
          <div className="mb-[calc(var(--lh)*2)] flex items-center gap-2 text-xs" style={{ color: 'var(--ink-muted)', lineHeight: 'var(--lh)' }}>
            <span className="w-4 h-4 flex-shrink-0" aria-hidden="true">👥</span>
            <span style={{ font: '500 11px/1 var(--font-mono)' }}>{service.clientCount}+ clients</span>
          </div>

          {/* Outcomes - revealed on hover (IKEA Effect - mental preview) */}
          <AnimatePresence>
            {isHovered && service.outcomes && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-[calc(var(--bl)*1.5)] mb-[calc(var(--lh)*2)] pt-[calc(var(--lh)*1.5)] border-t border-[var(--border)]"
                style={{ overflow: 'hidden', lineHeight: 'var(--lh)' }}
              >
                {service.outcomes.map((outcome, i) => (
                  <motion.li
                    key={outcome}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2 text-xs"
                    style={{ color: 'var(--ink-muted)' }}
                  >
                    <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                    <span>{outcome}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}