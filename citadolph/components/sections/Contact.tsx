'use client';

import { useState, FormEvent } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { Input, Textarea } from '@/components/ui/Input';
import { Kicker, Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Section, Wrap, Band } from '@/components/ui/Grid';
import { contactInfo } from '@/lib/site-content';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, this would submit to an API
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