'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { X, ChevronRight, Globe, User, LogOut, Briefcase, Lightbulb, Users, GraduationCap, Building2, Heart, MapPin, Clock, Menu as MenuIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Kicker, Heading, Text } from '@/components/ui/Typography';
import { navigation, megaMenus, authLinks, type AuthState, type NavItem } from '@/lib/site-content';
import Image from 'next/image';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  authState?: AuthState;
  onAuthAction?: (action: 'login' | 'register' | 'signout') => void;
  onScrollTo?: (id: string) => void;
}

const navIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'What We Do': Briefcase,
  'What We Think': Lightbulb,
  'Who We Are': Users,
  'Career': GraduationCap,
  'Contact Us': MapPin,
};

type MobileMegaMenuData = {
  title: string;
  columns: readonly { heading: string; items: readonly { label: string; href: string; description: string }[] }[];
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string; variant: 'outline' | 'primary' | 'ghost' };
};

const mobileMegaMenuData: Record<string, MobileMegaMenuData> = {
  'what-we-do': megaMenus['what-we-do'],
  'what-we-think': megaMenus['what-we-think'],
  career: megaMenus.career,
};

export function MobileDrawer({ isOpen, onClose, authState = 'unauthenticated', onAuthAction, onScrollTo }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleNavClick = (href: string) => {
    if (onScrollTo && href.startsWith('#')) {
      onScrollTo(href.slice(1));
    }
    if (!href.startsWith('#') || href === '#') {
      onClose();
    }
  };

  const currentAuthLinks = authLinks[authState];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[var(--z-modal)] lg:hidden"
          aria-hidden="true"
          onClick={onClose}
        >
          <div
            className="fixed inset-0 bg-[var(--ink)]/50 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
          />
        </div>
      )}

      <aside
        ref={drawerRef}
        className={cn(
          'fixed top-0 left-0 z-[var(--z-modal)] lg:hidden',
          'h-full w-[85vw] max-w-[360px]',
          'bg-[var(--paper)] border-r border-[var(--border)]',
          'flex flex-col overflow-y-auto',
          'transform transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'animate-slide-in'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <Link href="/" className="flex items-center gap-3" aria-label="Citadolph Home" onClick={onClose}>
            <Image
              src="/images/logo_full_black.svg"
              alt=""
              width={120}
              height={32}
              priority
            />
          </Link>
          <button
            className="p-2 rounded-lg transition-colors hover:bg-[var(--paper-alt)]"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" style={{ color: 'var(--ink)' }} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto" style={{ paddingBottom: 'calc(var(--lh) * 4)' }}>
          {navigation.main.map((item: NavItem) => {
            const hasMegaMenu = item.megaMenu && mobileMegaMenuData[item.megaMenu as keyof typeof mobileMegaMenuData];
            const NavIcon = navIcons[item.label] || Briefcase;
            const isExpanded = expandedMenu === item.megaMenu;

            if (hasMegaMenu) {
              const megaData = mobileMegaMenuData[item.megaMenu as keyof typeof mobileMegaMenuData];
              return (
                <div key={item.label}>
                  <button
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-3 rounded-[var(--radius-sm)]',
                      'transition-colors text-left',
                      isExpanded ? 'bg-[var(--paper-alt)]' : 'hover:bg-[var(--paper-alt)]'
                    )}
                    style={{ color: isExpanded ? 'var(--accent)' : 'var(--ink)' }}
                    onClick={() => setExpandedMenu(isExpanded ? null : item.megaMenu!)}
                    aria-expanded={isExpanded}
                    aria-controls={`mobile-megamenu-${item.megaMenu}`}
                  >
                    <div className="flex items-center gap-3">
                      <NavIcon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                      <span className="font-medium text-base">{item.label}</span>
                    </div>
                    <ChevronRight
                      className={cn('w-5 h-5 flex-shrink-0 transition-transform', isExpanded && 'rotate-90')}
                      aria-hidden="true"
                    />
                  </button>

                  {isExpanded && (
                    <div
                      id={`mobile-megamenu-${item.megaMenu}`}
                      className="mt-2 ml-2 border-l-2 animate-slide-down"
                      style={{ borderColor: 'var(--accent)' }}
                      role="region"
                      aria-label={`${item.label} submenu`}
                    >
                      {megaData.columns.map((column) => (
                        <div key={column.heading} className="py-3">
                          <Kicker size="sm" className="mb-2 flex items-center gap-1">
                            <span style={{ color: 'var(--accent)' }} aria-hidden="true">
                              <NavIcon className="w-4 h-4" />
                            </span>
                            {column.heading}
                          </Kicker>
                          <ul className="space-y-1" role="list">
                            {column.items.map((subItem) => (
                              <li key={subItem.label}>
                                <Link
                                  href={subItem.href}
                                  className="flex flex-col gap-0.5 px-3 py-2 rounded-[var(--radius-sm)] transition-colors"
                                  style={{ color: 'var(--ink-muted)' }}
                                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink-muted)'}
                                  onClick={() => handleNavClick(subItem.href)}
                                >
                                  <span className="font-medium text-sm">{subItem.label}</span>
                                  <span className="text-xs" style={{ color: 'var(--ink-muted)', lineHeight: '1.4' }}>
                                    {subItem.description}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div className="pt-2 flex gap-2 flex-wrap">
                        <Button
                          size="sm"
                          className="w-full sm:w-auto"
                          rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                          onClick={() => handleNavClick(megaData.cta.href)}
                        >
                          {megaData.cta.label}
                        </Button>
                        {(() => {
                          const secondaryCta = megaData.secondaryCta;
                          if (!secondaryCta) return null;
                          return (
                            <Button
                              variant={secondaryCta.variant}
                              size="sm"
                              className="w-full sm:w-auto"
                              onClick={() => handleNavClick(secondaryCta.href)}
                            >
                              {secondaryCta.label}
                            </Button>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-[var(--radius-sm)] transition-colors font-medium text-base hover:bg-[var(--paper-alt)]"
                style={{ color: 'var(--ink)' }}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
              >
                <NavIcon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-[var(--border)]">
            <Kicker className="mb-3">Account</Kicker>
            <div className="space-y-2">
              {currentAuthLinks.map((link) => (
                <Button
                  key={link.label}
                  variant={link.variant}
                  className="w-full justify-start gap-3"
                  onClick={() => {
                    if ('action' in link && link.action === 'signout') onAuthAction?.('signout');
                    else if (link.label === 'Login') onAuthAction?.('login');
                    else if (link.label === 'Register') onAuthAction?.('register');
                    onClose();
                  }}
                >
                  {link.label === 'Sign Out' && <LogOut className="w-4 h-4" aria-hidden="true" />}
                  {link.label === 'Dashboard' && <MenuIcon className="w-4 h-4" aria-hidden="true" />}
                  {link.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Button
              variant="primary"
              className="w-full justify-center gap-2 py-3"
              size="lg"
              onClick={() => handleNavClick(navigation.cta.href)}
            >
              {navigation.cta.label}
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </nav>

        <div className="p-4 border-t border-[var(--border)] bg-[var(--paper-alt)]">
          <Kicker className="mb-2">Language</Kicker>
          <div className="flex gap-2">
            {['EN', 'FR'].map((lang) => (
              <button
                key={lang}
                className={`flex-1 py-2 px-3 rounded-[var(--radius-sm)] text-sm font-medium transition-colors ${
                  lang === 'EN'
                    ? 'bg-[var(--accent)] text-[var(--paper)]'
                    : 'bg-transparent text-[var(--ink)] border border-[var(--border)] hover:bg-[var(--paper)]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-in { animation: slideIn 0.3s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
      `}</style>
    </>
  );
}