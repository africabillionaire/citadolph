'use client';

import { useState, FormEvent, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { Input, Textarea } from '@/components/ui/Input';
import { Kicker, Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Section, Wrap, Band } from '@/components/ui/Grid';
import { contactInfo } from '@/lib/site-content';
import { cn } from '@/lib/utils';

const formSteps = ['Details', 'Message', 'Submit'] as const;

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Auto-calculate step based on filled fields
  const calculatedStep = useMemo(() => {
    let step = 1;
    if (formData.name.trim() && formData.email.trim()) step = 2;
    if (formData.name.trim() && formData.email.trim() && formData.message.trim()) step = 3;
    return step;
  }, [formData]);

  useEffect(() => {
    setCurrentStep(calculatedStep);
  }, [calculatedStep]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Section id="contact" variant="default" ariaLabel="contact-title">
      <Wrap>
        <Band span="1 / 7" style={{ paddingTop: 'var(--lh)' }}>
          <Kicker>Get In Touch</Kicker>
          <Heading id="contact-title" as="h2" size="2" className="mb-[var(--lh)]">
            Start a Conversation
          </Heading>
          <Text className="mb-12" maxWidth="prose">
            Tell us about your project, your challenges, or your vision.
            We&apos;ll respond within working hours with a clear next step.
          </Text>

          <dl className="grid gap-y-[calc(var(--lh)*1.5)] gap-x-[var(--gutter)] max-w-[400px]" style={{ gridTemplateColumns: 'auto 1fr' }}>
            {contactInfo.map((item) => (
              <div key={item.label}>
                <dt style={{ font: '600 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '4px' }}>
                  {item.label}
                </dt>
                <dd style={{ margin: 0, fontSize: '15px', lineHeight: '24px', color: 'var(--ink)' }}>
                  {item.href ? (
                    <a href={item.href} style={{ color: 'var(--ink)', textDecoration: 'none', transition: 'color 0.15s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink)'}
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Band>

        <Band span="7 / 13" style={{ paddingTop: 'var(--lh)' }}>
          <Card variant="default" padding="lg" className="h-full">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Goal Gradient: Progress Indicator */}
              <div className="mb-6" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={3} aria-label="Form progress">
                <div className="flex items-center gap-2 mb-2">
                  {formSteps.map((step, i) => (
                    <> // React.Fragment
                      <motion.div
                        key={step}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300',
                          i < currentStep ? 'bg-[var(--accent)] text-[var(--paper)]' : 
                          i + 1 === currentStep ? 'bg-[var(--paper)] border-2 border-[var(--accent)] text-[var(--accent)]' :
                          'bg-[var(--paper-alt)] border border-[var(--border)] text-[var(--ink-muted)]'
                        )}
                      >
                        {i < currentStep - 1 ? <Check className="w-4 h-4" /> : i + 1}
                      </motion.div>
                      {i < formSteps.length - 1 && (
                        <motion.div
                          className={cn('flex-1 h-0.5 transition-colors duration-300', i < currentStep - 1 ? 'bg-[var(--accent)]' : 'bg-[var(--border)]')}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: i < currentStep - 1 ? 1 : 0 }}
                          transition={{ delay: 0.3, duration: 0.4 }}
                          style={{ transformOrigin: 'left' }}
                        />
                      )}
                    </>
                  ))}
                </div>
                <Text size="sm" color="muted" className="text-center">
                  Step {currentStep} of {formSteps.length} — {formSteps[currentStep - 1]}
                </Text>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  name="name"
                  label="Name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
                <Input
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
                <Textarea
                  name="message"
                  label="Message"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                />
                <Button
                  type="submit"
                  className="w-full"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  disabled={submitted}
                >
                  {submitted ? 'Sent!' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Band>
      </Wrap>
    </Section>
  );
}