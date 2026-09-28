'use client';

import type { Variants } from 'motion/react';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { X, ChevronRight, Briefcase, Lightbulb, Users, GraduationCap, MapPin, Menu as MenuIcon, LogOut, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Kicker } from '@/components/ui/Typography';
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
  columns: readonly { heading: string; items: readonly { label: string; href: string }[]; defaultExpanded?: boolean; icon?: React.ComponentType<{ className?: string }> }[];
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string; variant: 'outline' | 'primary' | 'ghost' };
};

const mobileMegaMenuData: Record<string, MobileMegaMenuData> = {
  'what-we-do': megaMenus['what-we-do'],
  'what-we-think': megaMenus['what-we-think'],
  career: megaMenus.career,
};

// Haptic feedback utility for premium mobile feel
const triggerHaptic = () => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(10);
  }
};

// Accessibility: Focus trap hook
const useFocusTrap = (isActive: boolean, ref: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    if (!isActive || !ref.current) return;

    const focusableElements = ref.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const timer = setTimeout(() => firstElement?.focus(), 100);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isActive, ref]);
};

const drawerVariants: Variants = {
  hidden: { x: '-100%' },
  visible: { 
    x: 0,
    transition: { type: 'spring', stiffness: 350, damping: 35, mass: 1, restDelta: 0.001 }
  },
  exit: { 
    x: '-100%',
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const }
  }
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: 'easeOut' as const } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: 'easeIn' as const } }
};

const accordionVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: { 
    opacity: 1, 
    height: 'auto',
    transition: { duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] as const }
  },
  exit: { 
    opacity: 0, 
    height: 0,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const }
  }
};

export function MobileDrawer({ isOpen, onClose, authState = 'unauthenticated', onAuthAction, onScrollTo }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const [expandedMenu, setExpandedMenu] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('citadolph:mobileExpandedMenu');
    }
    return null;
  });
  const [isClosing, setIsClosing] = useState(false);

  // Define handleClose first so it can be used in useEffects
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  }, [onClose]);

  useFocusTrap(isOpen, drawerRef);

  // Body scroll-lock while drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (expandedMenu) {
          setExpandedMenu(null);
        } else {
          handleClose();
        }
      }
    }
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, expandedMenu, handleClose]);

  const handleNavClick = useCallback((href: string) => {
    if (onScrollTo && href.startsWith('#')) {
      onScrollTo(href.slice(1));
    }
    if (!href.startsWith('#') || href === '#') {
      handleClose();
    }
  }, [onScrollTo, handleClose]);

  const handleExpand = useCallback((menuKey: string | null) => {
    triggerHaptic();
    setExpandedMenu(menuKey);
    if (typeof window !== 'undefined') {
      if (menuKey) sessionStorage.setItem('citadolph:mobileExpandedMenu', menuKey);
      else sessionStorage.removeItem('citadolph:mobileExpandedMenu');
    }
  }, []);

  const currentAuthLinks = authLinks[authState];
  const transitionProps = shouldReduceMotion ? { transition: { duration: 0 } } : {};

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[var(--z-modal)] lg:hidden"
            aria-hidden="true"
            onClick={handleClose}
            {...transitionProps}
          >
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-[var(--ink)]/40 backdrop-blur-md"
              onClick={handleClose}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.aside
            ref={drawerRef}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80 || info.velocity.x < -500) {
                triggerHaptic();
                handleClose();
              }
            }}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'fixed top-0 left-0 z-[var(--z-modal)] lg:hidden touch-none',
              'h-full w-[85vw] max-w-[380px]',
              'bg-[var(--paper)] border-r border-[var(--border)]',
              'flex flex-col',
              'pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]'
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            {/* Header */}
            <motion.div
              className="flex items-center justify-between p-4 border-b border-[var(--border)]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <Link href="/" className="flex items-center gap-3" aria-label="Citadolph Home" onClick={handleClose}>
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ delay: 0.4, duration: 0.6, repeat: Infinity, repeatDelay: 4 }}
                >
                  <Image
                    src="/images/logo_full_black.svg"
                    alt="Citadolph Logo"
                    width={120}
                    height={32}
                    priority
                  />
                </motion.div>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'var(--paper-alt)' }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg transition-colors"
                onClick={() => { triggerHaptic(); handleClose(); }}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" style={{ color: 'var(--ink)' }} />
              </motion.button>
            </motion.div>

            {/* Scrollable Area with Shadow Masks */}
            <div className="relative flex-1 flex flex-col overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[var(--paper)] to-transparent z-10 pointer-events-none" />
              
              <motion.nav 
                className="flex-1 p-4 space-y-1 overflow-y-auto overscroll-contain"
                style={{ paddingBottom: 'calc(var(--lh) * 4)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                {navigation.main.map((item: NavItem) => {
                  const hasMegaMenu = item.megaMenu && mobileMegaMenuData[item.megaMenu as keyof typeof mobileMegaMenuData];
                  const NavIcon = navIcons[item.label] || Briefcase;
                  const isExpanded = expandedMenu === item.megaMenu;

                  if (hasMegaMenu) {
                    const megaData = mobileMegaMenuData[item.megaMenu as keyof typeof mobileMegaMenuData];
                    return (
                      <motion.div key={item.label} layout className="overflow-hidden">
                        <motion.button
                          whileHover={{ backgroundColor: 'var(--paper-alt)' }}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            'w-full flex items-center justify-between px-4 py-4 rounded-[var(--radius-sm)]',
                            'transition-colors text-left',
                            isExpanded ? 'bg-[var(--paper-alt)]' : ''
                          )}
                          style={{ 
                            color: isExpanded ? 'var(--accent)' : 'var(--ink)',
                            minHeight: '52px',
                          }}
                          onClick={() => handleExpand(isExpanded ? null : item.megaMenu!)}
                          aria-expanded={isExpanded}
                          aria-controls={`mobile-megamenu-${item.megaMenu}`}
                        >
                          <div className="flex items-center gap-3">
                            <NavIcon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                            <span className="font-medium text-base">{item.label}</span>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="w-5 h-5 flex-shrink-0"
                            aria-hidden="true"
                          >
                            <ChevronRight />
                          </motion.div>
                        </motion.button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              variants={accordionVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="mt-2 ml-4 border-l-2 border-[var(--accent)]"
                              role="region"
                              aria-label={`${item.label} submenu`}
                            >
                              {megaData.columns.map((column) => (
                                <div key={column.heading} className="py-3">
                                  <div className="flex items-center gap-2 mb-2 px-3">
                                    {column.icon && <column.icon className="w-4 h-4 text-[var(--accent)]" aria-hidden="true" />}
                                    <Kicker size="sm" className="mb-0">{column.heading}</Kicker>
                                  </div>
                                  <ul className="space-y-1" role="list">
                                    {column.items.slice(0, 3).map((subItem) => (
                                      <li key={subItem.label}>
                                        <Link
                                          href={subItem.href}
                                          className="flex flex-col gap-0.5 px-3 py-3 rounded-[var(--radius-sm)] transition-colors group"
                                          style={{ 
                                            color: 'var(--ink-muted)',
                                            minHeight: '48px',
                                            justifyContent: 'center'
                                          }}
                                          onClick={() => handleNavClick(subItem.href)}
                                        >
                                          <span className="font-medium text-sm group-hover:text-[var(--accent)] transition-colors">
                                            {subItem.label}
                                          </span>
                                        </Link>
                                      </li>
                                    ))}
                                    {column.items.length > 3 && (
                                      <li>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="w-full justify-start text-xs px-3 py-2 text-[var(--ink-muted)] hover:text-[var(--accent)]"
                                          onClick={() => handleNavClick(megaData.cta.href)}
                                        >
                                          Show all {column.items.length} {column.heading.toLowerCase()} →
                                        </Button>
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              ))}
                              
                              <div className="pt-2 pb-4 px-3 flex gap-2 flex-wrap">
                                <Button
                                  size="sm"
                                  className="flex-1 min-h-[48px]"
                                  rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                                  onClick={() => handleNavClick(megaData.cta.href)}
                                >
                                  {megaData.cta.label}
                                </Button>
                                {megaData.secondaryCta && (
                                  <Button
                                    variant={megaData.secondaryCta.variant}
                                    size="sm"
                                    className="flex-1 min-h-[48px]"
                                    onClick={() => handleNavClick(megaData.secondaryCta!.href)}
                                  >
                                    {megaData.secondaryCta.label}
                                  </Button>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div key={item.label}>
                      <motion.button
                        whileHover={{ backgroundColor: 'var(--paper-alt)' }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center gap-3 px-4 py-4 rounded-[var(--radius-sm)] transition-colors font-medium text-base"
                        style={{ 
                          color: 'var(--ink)',
                          minHeight: '52px',
                          textAlign: 'left',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                        onClick={(e) => { e.preventDefault(); triggerHaptic(); handleNavClick(item.href); }}
                      >
                        <NavIcon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                        {item.label}
                      </motion.button>
                    </motion.div>
                  );
                })}

                {/* Account Section */}
                <div className="pt-4 border-t border-[var(--border)] mt-2">
                  <Kicker className="mb-3 px-4">Account</Kicker>
                  <div className="space-y-2">
                    {currentAuthLinks.map((link) => (
                      <motion.button
                        key={link.label}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          triggerHaptic();
                          if ('action' in link && link.action === 'signout') onAuthAction?.('signout');
                          else if (link.label === 'Login') onAuthAction?.('login');
                          else if (link.label === 'Register') onAuthAction?.('register');
                          handleClose();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-[var(--radius-sm)] font-medium transition-all"
                        style={{ 
                          minHeight: '48px',
                          textAlign: 'left',
                          background: link.variant === 'primary' ? 'var(--accent)' : 'transparent',
                          color: link.variant === 'primary' ? 'var(--paper)' : 'var(--ink)',
                          border: link.variant === 'primary' ? '2px solid var(--accent)' : link.variant === 'outline' ? '1px solid var(--border)' : 'none',
                        }}
                      >
                        {link.label === 'Sign Out' && <LogOut className="w-5 h-5" aria-hidden="true" />}
                        {link.label === 'Dashboard' && <MenuIcon className="w-5 h-5" aria-hidden="true" />}
                        {link.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Primary CTA */}
                <div className="pt-6 pb-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { triggerHaptic(); handleNavClick(navigation.cta.href); }}
                    className="w-full"
                  >
                    <Button
                      variant="primary"
                      className="w-full justify-center gap-2"
                      style={{ minHeight: '56px', padding: '16px 24px', fontSize: '16px' }}
                      size="lg"
                    >
                      {navigation.cta.label}
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <ChevronRight className="w-5 h-5" aria-hidden="true" />
                      </motion.span>
                    </Button>
                  </motion.button>
                </div>
              </motion.nav>

              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[var(--paper)] to-transparent z-10 pointer-events-none" />
            </div>

            {/* Footer: Language Selector */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
              className="p-4 border-t border-[var(--border)] bg-[var(--paper-alt)]"
            >
              <Kicker className="mb-3 px-1">Language</Kicker>
              <div className="flex gap-1 p-1 bg-[var(--paper)] rounded-[var(--radius-md)] border border-[var(--border)]">
                {['EN', 'FR'].map((lang) => (
                  <motion.button
                    key={lang}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => triggerHaptic()}
                    className={cn(
                      "flex-1 py-2.5 px-3 rounded-[var(--radius-sm)] text-sm font-semibold transition-all",
                      lang === 'EN' 
                        ? "bg-[var(--accent)] text-[var(--paper)] shadow-sm" 
                        : "text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--paper-alt)]"
                    )}
                  >
                    {lang}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Exit Toast */}
            <AnimatePresence>
              {isClosing && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 px-5 py-3 rounded-full bg-[var(--ink)] text-[var(--paper)] text-sm font-medium shadow-xl z-[calc(var(--z-modal)+10)] flex items-center gap-2 whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Thanks for visiting!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}