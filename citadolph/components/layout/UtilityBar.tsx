'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe, User, LogOut, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Kicker, Text } from '@/components/ui/Typography';
import { authLinks, type AuthState } from '@/lib/site-content';

interface UtilityBarProps {
  authState?: AuthState;
  onAuthAction?: (action: 'login' | 'register' | 'signout') => void;
}

const languages = [
  { code: 'EN', label: 'English', flag: '🇺🇸' },
  { code: 'FR', label: 'Français', flag: '🇫🇷' },
] as const;

export function UtilityBar({ authState = 'unauthenticated', onAuthAction }: UtilityBarProps) {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const authRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (languageRef.current && !languageRef.current.contains(e.target as Node)) {
        setLanguageOpen(false);
      }
      if (authRef.current && !authRef.current.contains(e.target as Node)) {
        setAuthOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLinks = authLinks[authState];

  return (
    <div
      className="hidden lg:block border-b border-[var(--border)]"
      style={{ background: 'var(--paper)', height: '40px' }}
      role="navigation"
      aria-label="Utility navigation"
    >
      <div className="flex items-center justify-between h-full" style={{
        maxWidth: 'var(--maxw)',
        margin: '0 auto',
        padding: '0 var(--margin)',
      }}>
        <div className="flex items-center gap-6 text-sm" style={{ color: 'var(--ink-muted)' }}>
          <div className="flex items-center gap-2" style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            <Globe className="w-3.5 h-3.5" aria-hidden="true" />
            <span>International</span>
          </div>

          <div className="relative" ref={languageRef}>
            <button
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-[var(--radius-sm)] transition-colors hover:bg-[var(--paper-alt)]"
              onClick={() => setLanguageOpen(!languageOpen)}
              aria-expanded={languageOpen}
              aria-haspopup="listbox"
              aria-label="Select language"
            >
              <span className="text-base">{languages[0].flag}</span>
              <span className="font-medium">{languages[0].code}</span>
              <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', languageOpen && 'rotate-180')} aria-hidden="true" />
            </button>

            {languageOpen && (
              <div
                className="absolute top-full left-0 mt-1 min-w-[140px] rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--paper)] shadow-[var(--shadow-lg)] overflow-hidden animate-slide-down"
                role="listbox"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-[var(--paper-alt)]"
                    role="option"
                    aria-selected={lang.code === 'EN'}
                    onClick={() => setLanguageOpen(false)}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span className="font-medium text-sm">{lang.code}</span>
                    <span className="text-xs" style={{ color: 'var(--ink-muted)' }}>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative" ref={authRef}>
            <button
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-[var(--radius-sm)] transition-colors hover:bg-[var(--paper-alt)]"
              onClick={() => setAuthOpen(!authOpen)}
              aria-expanded={authOpen}
              aria-haspopup="listbox"
              aria-label={authState === 'authenticated' ? 'Account menu' : 'Sign in or register'}
            >
              <User className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="font-medium text-sm" style={{ color: 'var(--ink-muted)' }}>
                {authState === 'authenticated' ? 'Account' : 'Sign In'}
              </span>
              <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', authOpen && 'rotate-180')} aria-hidden="true" />
            </button>

            {authOpen && (
              <div
                className="absolute top-full right-0 mt-1 min-w-[180px] rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--paper)] shadow-[var(--shadow-lg)] overflow-hidden animate-slide-down"
                role="listbox"
              >
                {currentLinks.map((link, index) => (
                  <Button
                    key={link.label}
                    variant={link.variant}
                    className="w-full justify-start px-3 py-2 text-sm gap-2"
                    onClick={() => {
                      setAuthOpen(false);
                      if ('action' in link && link.action === 'signout') onAuthAction?.('signout');
                      else if (link.label === 'Login') onAuthAction?.('login');
                      else if (link.label === 'Register') onAuthAction?.('register');
                    }}
                    role="option"
                  >
                    {link.label === 'Sign Out' && <LogOut className="w-4 h-4" aria-hidden="true" />}
                    {link.label === 'Dashboard' && <Menu className="w-4 h-4" aria-hidden="true" />}
                    {link.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down { animation: slideDown 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
}