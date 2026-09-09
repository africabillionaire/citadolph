'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Globe, Users, Target, Heart } from 'lucide-react';
import { siteConfig, footerLinks } from '@/lib/site-content';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: siteConfig.company.social.linkedin, icon: Globe, label: 'LinkedIn' },
    { href: siteConfig.company.social.facebook, icon: Users, label: 'Facebook' },
    { href: siteConfig.company.social.x, icon: Target, label: 'X' },
    { href: siteConfig.company.social.instagram, icon: Heart, label: 'Instagram' },
  ] as const;

  return (
    <footer className="border-t border-[var(--border)]" style={{ background: 'var(--paper-alt)' }} role="contentinfo">
      <div className="grid gap-[var(--gutter)]" style={{
        gridTemplateColumns: 'subgrid',
        padding: 'calc(var(--lh) * 4) 0',
      }}>
        <div className="flex flex-col gap-4" style={{ gridColumn: '1 / 5', paddingTop: 'var(--lh)' }}>
          <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.name} Home`}>
            <Image
              src="/images/logo_icon_white.svg"
              alt=""
              width={32}
              height={32}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <span style={{
              font: '700 18px/1 var(--font-sans)',
              color: 'var(--paper)',
              letterSpacing: '-0.02em',
            }}>
              {siteConfig.name}
            </span>
          </Link>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '45ch',
            fontSize: '15px',
            lineHeight: '24px',
            margin: 0,
          }}>
            Digital transformation agency building infrastructure for Africa&apos;s future.
            Registered in Delaware. Operating across the continent.
          </p>
          <div className="flex gap-4" role="list" aria-label="Social links">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex items-center justify-center w-10 h-10 rounded-lg transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--accent)';
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--paper)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                }}
              >
                <social.icon className="w-5 h-5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        <nav style={{ gridColumn: '5 / 9', paddingTop: 'var(--lh)' }} aria-label="Quick links">
          <h4 style={{
            fontSize: '13px',
            lineHeight: '1',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: 'calc(var(--lh) * 1.5)',
          }}>
            Quick Links
          </h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0, margin: 0 }}>
            {footerLinks.quick.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    fontSize: '15px',
                    lineHeight: '24px',
                    color: 'rgba(255,255,255,0.8)',
                    transition: 'color 0.15s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav style={{ gridColumn: '9 / 13', paddingTop: 'var(--lh)' }} aria-label="Legal and compliance">
          <h4 style={{
            fontSize: '13px',
            lineHeight: '1',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: 'calc(var(--lh) * 1.5)',
          }}>
            Legal & Compliance
          </h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0, margin: 0 }}>
            {footerLinks.legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    fontSize: '15px',
                    lineHeight: '24px',
                    color: 'rgba(255,255,255,0.8)',
                    transition: 'color 0.15s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-wrap justify-between items-center gap-[var(--lh)]" style={{
          gridColumn: '1 / 13',
          marginTop: 'calc(var(--lh) * 3)',
          paddingTop: 'calc(var(--lh) * 2)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}>
          <p style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.5)',
            margin: 0,
          }}>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p style={{
            font: '500 11px/1 var(--font-mono)',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: 0,
          }}>
            Swiss Design · Carbon System · Grid Aligned
          </p>
        </div>
      </div>
    </footer>
  );
}