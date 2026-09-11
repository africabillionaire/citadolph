'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ExternalLink, Briefcase, Lightbulb, Users, GraduationCap, Building2, Heart, MapPin, Clock, Search, ChevronDown, ChevronUp, Users as UsersIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Kicker, Heading, Text } from '@/components/ui/Typography';
import { megaMenus } from '@/lib/site-content';

interface MegaMenuItem {
  label: string;
  href: string;
  description: string;
}

interface MegaMenuColumn {
  heading: string;
  items: MegaMenuItem[];
  defaultExpanded?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

interface MegaMenuData {
  title: string;
  columns: MegaMenuColumn[];
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string; variant: 'outline' | 'primary' | 'ghost' };
}

interface MegaMenuProps {
  data: MegaMenuData;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  isOpen: boolean;
  onClose: () => void;
  position: 'left' | 'center' | 'right';
}

const columnIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Digital Products': Briefcase,
  'Brand & Strategy': Lightbulb,
  'Growth & Intelligence': Users,
  'Insights': Lightbulb,
  'Our Process': GraduationCap,
  'Resources': Building2,
  'Open Roles': Briefcase,
  'Why Join Us': Heart,
  'Life at Citadolph': Users,
};

const menuVariants = {
  hidden: { opacity: 0, y: -16, scaleY: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scaleY: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 25, duration: 0.25 }
  },
  exit: { opacity: 0, y: -8, scaleY: 0.95, transition: { duration: 0.15 } }
};

const columnVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.15 }
  }
};

function CollapsibleSection({ 
  title, 
  children, 
  defaultOpen = false,
  icon: Icon,
  itemCount = 0
}: { 
  title: string; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  itemCount?: number;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col">
      <button
        className="flex items-center gap-2 w-full py-2 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        style={{ color: 'var(--ink)' }}
      >
        {Icon && <Icon className="w-5 h-5" style={{ color: 'var(--accent)' }} aria-hidden="true" />}
        <Kicker size="sm" className="mb-0 flex-1">{title}</Kicker>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{ color: 'var(--ink-muted)' }}
        >
          <ChevronDown className="w-4 h-4 flex-shrink-0" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{ 
              hidden: { opacity: 0, height: 0 },
              visible: { opacity: 1, height: 'auto', transition: { duration: 0.2 } },
              exit: { opacity: 0, height: 0, transition: { duration: 0.15 } }
            }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pl-7 pt-2 space-y-2 border-l-2" style={{ borderColor: 'var(--accent)' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MegaMenuSkeleton() {
  return (
    <div className="grid gap-[var(--gutter)] p-[calc(var(--lh)*3)]" style={{
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      columnGap: 'var(--gutter)',
    }}>
      {[1,2,3].map(i => (
        <div key={i} className="flex flex-col space-y-3">
          <div className="h-5 w-3/4 rounded bg-[var(--border)] animate-pulse" />
          <ul className="space-y-3 flex-1">
            {[1,2,3,4].map(j => (
              <li key={j} className="h-12 rounded-[var(--radius-sm)] bg-[var(--border)] animate-pulse" />
            ))}
          </ul>
        </div>
      ))}
      <div className="col-span-3 pt-[var(--lh)] border-t border-[var(--border)]">
        <div className="h-6 w-1/3 rounded bg-[var(--border)] animate-pulse mb-2" />
        <div className="h-8 w-1/2 rounded bg-[var(--border)] animate-pulse mb-2" />
        <div className="h-4 w-full rounded bg-[var(--border)] animate-pulse mb-4" />
        <div className="flex gap-3">
          <div className="h-11 w-40 rounded bg-[var(--border)] animate-pulse" />
          <div className="h-11 w-40 rounded bg-[var(--border)] animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function MegaMenuContent({ data, onClose }: { data: MegaMenuData; onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredColumns = useMemo(() => {
    if (!searchQuery) return data.columns;
    return data.columns.map(col => ({
      ...col,
      items: col.items.filter(item => 
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(col => col.items.length > 0);
  }, [data.columns, searchQuery]);

  return (
    <>
      {/* Search Input */}
      <div className="col-span-3 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--ink-muted)' }} aria-hidden="true" />
          <input
            type="search"
            placeholder="Search services, roles, insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--paper)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none"
            aria-label="Search"
          />
        </div>
      </div>

      {filteredColumns.map((column, colIndex) => (
        <motion.div
          key={column.heading}
          variants={columnVariants}
          initial="hidden"
          animate="visible"
          custom={colIndex}
          className="flex flex-col"
          style={{ transitionDelay: `${colIndex * 0.05}s` }}
        >
          <CollapsibleSection
            title={column.heading}
            icon={column.icon || columnIcons[column.heading] || Briefcase}
            defaultOpen={column.defaultExpanded ?? colIndex === 0}
            itemCount={column.items.length}
          >
            <ul className="space-y-2" role="list">
              {column.items.slice(0, 3).map((item, itemIndex) => (
                <motion.li
                  key={item.label}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={itemIndex}
                  style={{ transitionDelay: `${itemIndex * 0.03}s` }}
                >
                  <Link
                    href={item.href}
                    className="group flex flex-col gap-1 p-3 rounded-[var(--radius-sm)] transition-all duration-150"
                    style={{
                      background: 'transparent',
                      border: '1px solid transparent',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--paper-alt)';
                      e.currentTarget.style.borderColor = 'var(--border)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                    onClick={onClose}
                  >
                    <span className="font-medium text-sm transition-colors group-hover:text-[var(--accent)]" style={{ color: 'var(--ink)' }}>
                      {item.label}
                      <ChevronRight className="inline-block w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                    <span className="text-xs" style={{ color: 'var(--ink-muted)', lineHeight: '1.5' }}>
                      {item.description}
                    </span>
                  </Link>
                </motion.li>
              ))}
              {column.items.length > 3 && (
                <motion.li
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-xs px-3 py-2"
                    onClick={onClose}
                  >
                    Show all {column.items.length} {column.heading.toLowerCase()} →
                  </Button>
                </motion.li>
              )}
            </ul>
          </CollapsibleSection>
        </motion.div>
      ))}

      <div className="col-span-3 pt-[var(--lh)] border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[200px]">
          {/* Social Proof */}
          <div className="flex items-center gap-3 mb-3 text-sm" style={{ color: 'var(--ink-muted)' }}>
            <UsersIcon className="w-4 h-4" aria-hidden="true" style={{ color: 'var(--accent)' }} />
            <span><strong>2,847</strong> specialists trust Citadolph</span>
            <div className="w-px h-4 bg-[var(--border)]" />
            <span><strong>94%</strong> project success rate</span>
          </div>
          <Kicker className="mb-2">Explore Further</Kicker>
          <Heading as="h3" size="4" weight="semibold" className="mb-2">
            {data.title}
          </Heading>
          <Text size="lg" color="muted" className="max-w-xl">
            Discover the full depth of our {data.title.toLowerCase()} — from strategy to execution, we deliver measurable outcomes.
          </Text>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Button
            size="lg"
            rightIcon={<ExternalLink className="w-4 h-4" />}
            onClick={onClose}
          >
            {data.cta.label}
          </Button>
          {data.secondaryCta && (
            <Button
              variant={data.secondaryCta.variant}
              size="lg"
              onClick={onClose}
            >
              {data.secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export function MegaMenu({ data, triggerRef, isOpen, onClose, position }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
          onClose();
        }
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, triggerRef]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setContentLoaded(true), 50);
      return () => clearTimeout(timer);
    } else {
      setContentLoaded(false);
    }
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const positionStyles = {
    left: { left: 'var(--margin)', right: 'auto' },
    center: { left: '50%', transform: 'translateX(-50%)' },
    right: { right: 'var(--margin)', left: 'auto' },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed top-full left-0 right-0 z-[var(--z-modal)]"
          style={{ paddingTop: 'var(--gutter)' }}
          role="menu"
          aria-label={data.title}
        >
          <div
            className="fixed inset-0 bg-[var(--ink)]/50 backdrop-blur-sm"
            aria-hidden="true"
            onClick={onClose}
          />

          <div
            ref={menuRef}
            className={cn(
              'relative mx-auto rounded-[var(--radius-lg)] border border-[var(--border)]',
              'bg-[var(--paper)] shadow-[var(--shadow-xl)]',
              'overflow-hidden',
              'max-h-[calc(100vh-120px)] overflow-y-auto'
            )}
            style={{
              maxWidth: 'var(--maxw)',
              width: 'calc(100% - var(--margin) * 2)',
              ...positionStyles[position],
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {contentLoaded ? (
              <MegaMenuContent data={data} onClose={onClose} />
            ) : (
              <MegaMenuSkeleton />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}