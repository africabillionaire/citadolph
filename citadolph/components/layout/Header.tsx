'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { navigation, siteConfig } from '@/lib/site-content';

interface HeaderProps {
  onScrollTo?: (id: string) => void;
}

export function Header({ onScrollTo }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (onScrollTo && href.startsWith('#')) {
      onScrollTo(href.slice(1));
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-[var(--z-fixed)] transition-all duration-300',
        scrolled
          ? 'bg-[var(--paper)]/95 backdrop-blur-sm border-b border-[var(--border)]'
          : 'bg-transparent'
      )}
      role="banner"
      style={{
        background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
      }}
    >
      <nav className="grid gap-[var(--gutter)] items-center" style={{
        gridTemplateColumns: 'subgrid',
        height: '88px',
      }} aria-label="Main navigation">
        <div className="flex items-center gap-3" style={{ gridColumn: '1 / 4' }}>
          <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.name} Home`}>
            <Image
              src="/images/logo_icon_black.svg"
              alt=""
              width={32}
              height={32}
              priority
              style={{ filter: 'var(--logo-filter, none)' }}
            />
            <span style={{
              font: '700 18px/1 var(--font-sans)',
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
            }}>
              {siteConfig.name}
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center justify-end gap-12" style={{ gridColumn: '4 / 11' }}>
          {navigation.main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--ink-muted)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink-muted)'}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3" style={{ gridColumn: '11 / 13' }}>
          <Button
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => handleNavClick(navigation.cta.href)}
          >
            {navigation.cta.label}
          </Button>
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ background: 'var(--paper-alt)' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-[var(--border)] bg-[var(--paper)] animate-slide-down" role="navigation" aria-label="Mobile menu">
          <div className="flex flex-col gap-6 py-6" style={{ padding: '0 var(--margin)' }}>
            {navigation.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-lg font-medium"
                style={{ color: 'var(--ink)' }}
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="primary"
              className="w-full mt-2"
              onClick={() => handleNavClick(navigation.cta.href)}
            >
              {navigation.cta.label}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}