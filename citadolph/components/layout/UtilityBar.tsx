'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe, User, LogOut, Menu, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

const utilityBarVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { delay: 0.3, duration: 0.4, type: 'spring' as const, stiffness: 300, damping: 30 }
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.2 }
  }
};

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
    <motion.div
      variants={utilityBarVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="hidden lg:block border-b border-[var(--border)] relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(90deg, var(--ink) 0%, var(--ink-muted) 100%)',
        height: '36px',
        minHeight: '36px',
      }}
      role="navigation"
      aria-label="Utility navigation"
    >
      {/* Subtle animated accent line to break banner blindness */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ background: 'var(--accent)' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.8, type: 'spring', stiffness: 200, damping: 20 }}
      />
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-[var(--accent)]/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <motion.div
        variants={utilityBarVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-between h-full"
        style={{
          maxWidth: 'var(--maxw)',
          margin: '0 auto',
          padding: '0 var(--margin)',
        }}
      >
        <motion.div className="flex items-center gap-6 text-sm" variants={itemVariants} custom={0} style={{ transitionDelay: '0.1s' }}>
          <div className="flex items-center gap-2" style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.9)' }}>
            <Globe className="w-3.5 h-3.5" aria-hidden="true" />
            <span>International</span>
          </div>

          <motion.div 
            className="relative" 
            ref={languageRef}
            variants={itemVariants}
            custom={1}
            style={{ transitionDelay: '0.15s' }}
          >
            <button
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-[var(--radius-sm)] transition-colors hover:bg-white/10"
              onClick={() => setLanguageOpen(!languageOpen)}
              aria-expanded={languageOpen}
              aria-haspopup="listbox"
              aria-label="Select language"
            >
              <span className="text-base">{languages[0].flag}</span>
              <span className="font-medium" style={{ color: 'var(--paper)' }}>{languages[0].code}</span>
              <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', languageOpen && 'rotate-180')} aria-hidden="true" style={{ color: 'rgba(255,255,255,0.8)' }} />
            </button>

            <AnimatePresence>
              {languageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute top-full left-0 mt-1 min-w-[140px] rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--paper)] shadow-[var(--shadow-lg)] overflow-hidden"
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
                      <span className="font-medium text-sm" style={{ color: 'var(--ink)' }}>{lang.code}</span>
                      <span className="text-xs" style={{ color: 'var(--ink-muted)' }}>{lang.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <motion.div className="flex items-center gap-4" variants={itemVariants} custom={2} style={{ transitionDelay: '0.2s' }}>
          <motion.div className="relative" ref={authRef} variants={itemVariants} custom={0}>
            <button
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-[var(--radius-sm)] transition-colors hover:bg-white/10"
              onClick={() => setAuthOpen(!authOpen)}
              aria-expanded={authOpen}
              aria-haspopup="listbox"
              aria-label={authState === 'authenticated' ? 'Account menu' : 'Sign in or register'}
            >
              <User className="w-3.5 h-3.5" aria-hidden="true" style={{ color: 'rgba(255,255,255,0.9)' }} />
              <span className="font-medium text-sm" style={{ color: 'var(--paper)' }}>
                {authState === 'authenticated' ? 'Account' : 'Sign In'}
              </span>
              <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', authOpen && 'rotate-180')} aria-hidden="true" style={{ color: 'rgba(255,255,255,0.8)' }} />
            </button>

            <AnimatePresence>
              {authOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute top-full right-0 mt-1 min-w-[180px] rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--paper)] shadow-[var(--shadow-lg)] overflow-hidden"
                  role="listbox"
                >
                  {currentLinks.map((link, index) => (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
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
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down { animation: slideDown 0.2s ease-out forwards; }
      `}</style>
    </motion.div>
  );
}