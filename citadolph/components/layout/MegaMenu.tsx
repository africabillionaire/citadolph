'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, ExternalLink, Search, Users as UsersIcon } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Kicker, Heading, Text } from '@/components/ui/Typography';
import { megaMenus } from '@/lib/site-content';

interface MegaMenuItem {
  label: string;
  href: string;
}

interface MegaMenuColumn {
  heading: string;
  items: readonly MegaMenuItem[];
  defaultExpanded?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

interface MegaMenuData {
  title: string;
  columns: readonly MegaMenuColumn[];
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string; variant: 'outline' | 'primary' | 'ghost' };
}

interface MegaMenuProps {
  data: MegaMenuData;
  triggerRefs: React.RefObject<Record<string, HTMLButtonElement | null>>;
  triggerKey: string;
  isOpen: boolean;
  onClose: () => void;
  position: 'left' | 'center' | 'right';
}

// Swiss Design Easing: Objective, crisp, professional deceleration. No playful bounces.
const swissEasing = [0.16, 1, 0.3, 1] as const;

const menuVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.35, ease: swissEasing } 
  },
  exit: { 
    opacity: 0, 
    y: -4, 
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as const } 
  },
};

const positionStyles = {
  left: { marginRight: 'auto' },
  center: { marginLeft: 'auto', marginRight: 'auto' },
  right: { marginLeft: 'auto' },
} as const;

export function MegaMenu({ data, triggerRefs, triggerKey, isOpen, onClose, position }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const shouldReduceMotion = useReducedMotion();

  /* Reset search each time the menu closes */
  useEffect(() => {
    if (!isOpen) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchQuery(prev => prev ? '' : prev);
  }, [isOpen]);

  /* Close on click outside */
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        const triggerRef = triggerRefs.current[triggerKey] ?? null;
        if (triggerRef && !triggerRef.contains(e.target as Node)) {
          onClose();
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, triggerRefs, triggerKey]);

  /* Focus management — strict keyboard navigation contract */
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const menu = menuRef.current;
    const getFocusable = () =>
      Array.from(
        menu.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.getClientRects().length > 0);

    const focusTimer = setTimeout(() => getFocusable()[0]?.focus(), 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      const triggerRef = triggerRefs.current[triggerKey] ?? null;
      triggerRef?.focus();
    };
  }, [isOpen, onClose, triggerRefs, triggerKey]);

  const filteredColumns = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return data.columns;
    return data.columns
      .map((col) => ({
        ...col,
        items: col.items.filter((item) => item.label.toLowerCase().includes(q)),
      }))
      .filter((col) => col.items.length > 0);
  }, [data.columns, searchQuery]);

  const searching = searchQuery.trim().length > 0;
  const transitionProps = shouldReduceMotion ? { transition: { duration: 0 } } : {};

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-x-0 top-full z-[var(--z-modal)]"
          style={{ paddingTop: 'var(--gutter)' }}
          role="dialog"
          aria-modal="false"
          aria-label={data.title}
          {...transitionProps}
        >
          <div
            ref={menuRef}
            id={`megamenu-panel`}
            className={cn(
              'relative overflow-y-auto border border-[var(--border)] bg-[var(--paper)]',
              'shadow-[var(--shadow-xl)] scrollbar-thin'
            )}
            style={{
              maxWidth: 'var(--maxw)',
              width: 'calc(100% - var(--margin) * 2)',
              maxHeight: 'calc(100vh - 140px)',
              ...positionStyles[position],
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Müller-Brockmann Grid: Strict modular layout */}
            <div className="grid grid-cols-12">
              
              {/* Search Module: Full-width, hairline separation, technical feel */}
              <div className="col-span-12 border-b border-[var(--border)] px-[calc(var(--gutter)*1.5)] py-4">
                <div className="relative">
                  <Search
                    className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2"
                    style={{ color: 'var(--ink-muted)' }}
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    placeholder="SEARCH…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label={`Search ${data.title}`}
                    className="w-full border-b border-transparent bg-transparent py-2 pl-8 text-sm font-medium uppercase tracking-wider text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink-muted)] focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              {/* Link Columns Module: Asymmetrical grid distribution */}
              <div className="col-span-12 grid grid-cols-12 gap-x-[var(--gutter)] px-[calc(var(--gutter)*1.5)] py-[calc(var(--gutter)*1.5)]">
                {filteredColumns.map((column, colIndex) => (
                  <div key={column.heading} className="col-span-12 sm:col-span-6 lg:col-span-3">
                    {/* Column Header: Numbered, tracked, hairline bottom border */}
                    <div className="mb-4 flex items-baseline gap-3 border-b border-[var(--border)] pb-2">
                      <span
                        className="font-mono text-[10px] font-bold leading-none tracking-[0.2em] text-[var(--accent)]"
                        aria-hidden="true"
                      >
                        {String(colIndex + 1).padStart(2, '0')}
                      </span>
                      <Kicker size="sm" className="mb-0 uppercase tracking-wider text-[var(--ink)]">
                        {column.heading}
                      </Kicker>
                    </div>
                    
                    <ul role="list" className="space-y-0">
                      {(searching ? column.items : column.items.slice(0, 5)).map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="group relative flex items-center justify-between border-b border-[var(--border)] py-3 pl-3 transition-colors hover:bg-[var(--paper-alt)] focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2"
                          >
                            {/* Swiss hover indicator: precise left accent */}
                            <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100" />
                            
                            <span className="text-sm font-medium text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]">
                              {item.label}
                            </span>
                            <ChevronRight
                              className="h-4 w-4 text-[var(--ink-muted)] transition-colors group-hover:text-[var(--accent)]"
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      ))}
                      
                      {!searching && column.items.length > 5 && (
                        <li className="pt-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start px-3 text-xs font-medium uppercase tracking-wider text-[var(--ink-muted)] hover:text-[var(--accent)]"
                            onClick={onClose}
                          >
                            View all {column.items.length} {column.heading.toLowerCase()} →
                          </Button>
                        </li>
                      )}
                    </ul>
                  </div>
                ))}

                {filteredColumns.length === 0 && (
                  <div className="col-span-12 py-8 text-center">
                    <Text size="sm" color="muted" className="font-mono uppercase tracking-wider">
                      No results for {searchQuery ? `"${searchQuery}"` : ""}
                    </Text>
                  </div>
                )}
              </div>

              {/* CTA Band Module: Strict asymmetrical balance (7/5 split) */}
              <div className="col-span-12 grid grid-cols-12 gap-x-[var(--gutter)] border-t border-[var(--border)] bg-[var(--paper-alt)] px-[calc(var(--gutter)*1.5)] py-[calc(var(--gutter)*1.5)]">
                <div className="col-span-12 lg:col-span-7">
                  <div className="mb-3 flex flex-wrap items-center gap-4 text-xs font-medium uppercase tracking-wider text-[var(--ink-muted)]">
                    <div className="flex items-center gap-2">
                      <UsersIcon className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                      <span>
                        <strong className="font-mono text-[var(--ink)]">2,847</strong> specialists
                      </span>
                    </div>
                    <span className="hidden h-4 w-px bg-[var(--border)] sm:block" aria-hidden="true" />
                    <div className="flex items-center gap-2">
                      <span>
                        <strong className="font-mono text-[var(--ink)]">94%</strong> success rate
                      </span>
                    </div>
                  </div>
                  <Heading as="h3" size="4" weight="semibold" className="mb-2 text-left">
                    {data.title}
                  </Heading>
                  <Text size="base" color="muted" className="max-w-xl text-left leading-relaxed">
                    Discover the full depth of our {data.title.toLowerCase()} — from strategy to
                    execution, we deliver measurable, objective outcomes.
                  </Text>
                </div>
                
                <div className="col-span-12 mt-6 flex flex-col gap-3 sm:flex-row sm:items-center lg:col-span-5 lg:mt-0 lg:justify-end">
                  <Button
                    size="lg"
                    rightIcon={<ExternalLink className="w-4 h-4" />}
                    onClick={onClose}
                    className="w-full sm:w-auto font-medium uppercase tracking-wider"
                  >
                    {data.cta.label}
                  </Button>
                  {data.secondaryCta && (
                    <Button
                      variant={data.secondaryCta.variant}
                      size="lg"
                      onClick={onClose}
                      className="w-full sm:w-auto font-medium uppercase tracking-wider"
                    >
                      {data.secondaryCta.label}
                    </Button>
                  )}
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}