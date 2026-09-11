'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { X, ChevronRight, Globe, User, LogOut, Briefcase, Lightbulb, Users, GraduationCap, Building2, Heart, MapPin, Clock, Menu as MenuIcon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  columns: readonly { heading: string; items: readonly { label: string; href: string; description: string }[]; defaultExpanded?: boolean; icon?: React.ComponentType<{ className?: string }> }[];
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string; variant: 'outline' | 'primary' | 'ghost' };
};

const mobileMegaMenuData: Record<string, MobileMegaMenuData> = {
  'what-we-do': megaMenus['what-we-do'],
  'what-we-think': megaMenus['what-we-think'],
  career: megaMenus.career,
};

const drawerVariants = {
  hidden: { x: '-100%' },
  visible: { 
    x: 0,
    transition: { 
      type: 'spring' as const, 
      stiffness: 300, 
      damping: 30, 
      delayChildren: 0.1, 
      staggerChildren: 0.05 
    }
  },
  exit: { 
    x: '-100%',
    transition: { duration: 0.2 }
  }
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 }
  }
};

const peakVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: 'spring' as const, stiffness: 200, damping: 15, delay: 0.3, duration: 0.5 }
  }
};

const thankYouVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

export function MobileDrawer({ isOpen, onClose, authState = 'unauthenticated', onAuthAction, onScrollTo }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('citadolph:mobileExpandedMenu');
    }
    return null;
  });
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

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
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, expandedMenu]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  }, [onClose]);

  const handleNavClick = useCallback((href: string) => {
    if (onScrollTo && href.startsWith('#')) {
      onScrollTo(href.slice(1));
    }
    if (!href.startsWith('#') || href === '#') {
      handleClose();
    }
  }, [onScrollTo, handleClose]);

  const handleExpand = useCallback((menuKey: string | null) => {
    setExpandedMenu(menuKey);
    if (menuKey) {
      sessionStorage.setItem('citadolph:mobileExpandedMenu', menuKey);
    } else {
      sessionStorage.removeItem('citadolph:mobileExpandedMenu');
    }
  }, []);

  const currentAuthLinks = authLinks[authState];

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
          >
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-[var(--ink)]/50 backdrop-blur-sm"
              onClick={handleClose}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.aside
            ref={drawerRef}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'fixed top-0 left-0 z-[var(--z-modal)] lg:hidden',
              'h-full w-[85vw] max-w-[360px]',
              'bg-[var(--paper)] border-r border-[var(--border)]',
              'flex flex-col overflow-y-auto'
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            {/* Peak moment: Logo with elastic bounce */}
            <motion.div
              variants={peakVariants}
              className="flex items-center justify-between p-4 border-b border-[var(--border)]"
            >
              <Link href="/" className="flex items-center gap-3" aria-label="Citadolph Home" onClick={handleClose}>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ delay: 0.4, duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Image
                    src="/images/logo_full_black.svg"
                    alt=""
                    width={120}
                    height={32}
                    priority
                  />
                </motion.div>
              </Link>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg transition-colors hover:bg-[var(--paper-alt)]"
                onClick={handleClose}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" style={{ color: 'var(--ink)' }} />
              </motion.button>
            </motion.div>

            <motion.nav 
              variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
              className="flex-1 p-4 space-y-1 overflow-y-auto" 
              style={{ paddingBottom: 'calc(var(--lh) * 4)' }}
            >
              {navigation.main.map((item: NavItem) => {
                const hasMegaMenu = item.megaMenu && mobileMegaMenuData[item.megaMenu as keyof typeof mobileMegaMenuData];
                const NavIcon = navIcons[item.label] || Briefcase;
                const isExpanded = expandedMenu === item.megaMenu;

                if (hasMegaMenu) {
                  const megaData = mobileMegaMenuData[item.megaMenu as keyof typeof mobileMegaMenuData];
                  return (
                    <motion.div key={item.label} variants={itemVariants}>
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
                          minHeight: '52px', // 48px+ for Fitts's Law
                        }}
                        onClick={() => handleExpand(isExpanded ? null : item.megaMenu!)}
                        aria-expanded={isExpanded}
                        aria-controls={`mobile-megamenu-${item.megaMenu}`}
                      >
                        <motion.div
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          <NavIcon className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
                          <span className="font-medium text-base">{item.label}</span>
                        </motion.div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                          className="w-6 h-6 flex-shrink-0"
                          aria-hidden="true"
                        >
                          <ChevronRight />
                        </motion.div>
                      </motion.button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            id={`mobile-megamenu-${item.megaMenu}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="mt-2 ml-2 border-l-2"
                            style={{ borderColor: 'var(--accent)', overflow: 'hidden' }}
                            role="region"
                            aria-label={`${item.label} submenu`}
                          >
                            {megaData.columns.map((column) => (
                              <motion.div key={column.heading} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="py-3">
                                <motion.div className="flex items-center gap-1 mb-2" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                                  <motion.span 
                                    animate={{ scale: [1, 1.1, 1] }} 
                                    transition={{ delay: 0.3, duration: 0.6, repeat: Infinity, repeatDelay: 4 }}
                                    style={{ color: 'var(--accent)' }} 
                                    aria-hidden="true"
                                  >
                                    {column.icon && <column.icon className="w-4 h-4" />}
                                  </motion.span>
                                  <Kicker size="sm" className="mb-0">{column.heading}</Kicker>
                                </motion.div>
                                <ul className="space-y-1" role="list">
                                  {column.items.slice(0, 3).map((subItem) => (
                                    <motion.li key={subItem.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.15 }}>
                                      <Link
                                        href={subItem.href}
                                        className="flex flex-col gap-0.5 px-3 py-3 rounded-[var(--radius-sm)] transition-colors"
                                        style={{ 
                                          color: 'var(--ink-muted)',
                                          minHeight: '48px', // Fitts's Law minimum
                                          display: 'flex',
                                          flexDirection: 'column',
                                          justifyContent: 'center'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink-muted)'}
                                        onClick={() => handleNavClick(subItem.href)}
                                      >
                                        <span className="font-medium text-sm">{subItem.label}</span>
                                        <span className="text-xs" style={{ color: 'var(--ink-muted)', lineHeight: '1.4' }}>
                                          {subItem.description}
                                        </span>
                                      </Link>
                                    </motion.li>
                                  ))}
                                  {column.items.length > 3 && (
                                    <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start text-xs px-3 py-2"
                                        onClick={() => handleNavClick(megaData.cta.href)}
                                      >
                                        Show all {column.items.length} {column.heading.toLowerCase()} →
                                      </Button>
                                    </motion.li>
                                  )}
                                </ul>
                              </motion.div>
                            ))}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="pt-2 flex gap-2 flex-wrap">
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleNavClick(megaData.cta.href)}
                              >
                                <Button
                                  size="sm"
                                  className="w-full sm:w-auto min-h-[48px]"
                                  rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                                >
                                  {megaData.cta.label}
                                </Button>
                              </motion.button>
                              {megaData.secondaryCta ? (
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleNavClick(megaData.secondaryCta!.href)}
                                >
                                  <Button
                                    variant={megaData.secondaryCta.variant}
                                    size="sm"
                                    className="w-full sm:w-auto min-h-[48px]"
                                  >
                                    {megaData.secondaryCta.label}
                                  </Button>
                                </motion.button>
                              ) : null}
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                return (
                  <motion.li variants={itemVariants}>
                    <motion.button
                      whileHover={{ backgroundColor: 'var(--paper-alt)' }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 px-4 py-4 rounded-[var(--radius-sm)] transition-colors font-medium text-base"
                      style={{ 
                        color: 'var(--ink)',
                        minHeight: '52px', // 48px+ for Fitts's Law
                        textAlign: 'left',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                    >
                      <NavIcon className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
                      {item.label}
                    </motion.button>
                  </motion.li>
                );
              })}

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="pt-4 border-t border-[var(--border)]">
                <Kicker className="mb-3">Account</Kicker>
                <motion.div className="space-y-2" variants={{ visible: { transition: { staggerChildren: 0.05 } } }} >
                  {currentAuthLinks.map((link) => (
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      key={link.label}
                      variants={itemVariants}
                      onClick={() => {
                        if ('action' in link && link.action === 'signout') onAuthAction?.('signout');
                        else if (link.label === 'Login') onAuthAction?.('login');
                        else if (link.label === 'Register') onAuthAction?.('register');
                        handleClose();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-[var(--radius-sm)] font-medium"
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
                </motion.div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNavClick(navigation.cta.href)}
                >
                  <Button
                    variant="primary"
                    className="w-full justify-center gap-2"
                    style={{ 
                      minHeight: '56px', // Larger for thumb zone
                      padding: '16px 24px',
                      fontSize: '16px',
                    }}
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
              </motion.div>
            </motion.nav>

            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5 }}
              className="p-4 border-t border-[var(--border)] bg-[var(--paper-alt)]"
            >
              <Kicker className="mb-2">Language</Kicker>
              <div className="flex gap-2">
                {['EN', 'FR'].map((lang) => (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    key={lang}
                    className={`flex-1 py-2 px-3 rounded-[var(--radius-sm)] text-sm font-medium transition-colors min-h-[44px] ${
                      lang === 'EN'
                        ? 'bg-[var(--accent)] text-[var(--paper)]'
                        : 'bg-transparent text-[var(--ink)] border border-[var(--border)] hover:bg-[var(--paper)]'
                    }`}
                  >
                    {lang}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Positive end: Thank you message */}
            <AnimatePresence>
              {isClosing && (
                <motion.div
                  variants={thankYouVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-[var(--radius-full)] bg-[var(--accent)] text-[var(--paper)] text-sm font-medium shadow-[var(--shadow-lg)] z-50"
                >
                  Thanks for visiting! 👋
                </motion.div>
              )}
            </AnimatePresence>
          </motion.aside>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}