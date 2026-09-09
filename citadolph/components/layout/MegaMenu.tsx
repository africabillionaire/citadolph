'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ExternalLink, Briefcase, Lightbulb, Users, GraduationCap, Building2, Heart, MapPin, Clock } from 'lucide-react';
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
  items: readonly MegaMenuItem[];
}

interface MegaMenuData {
  title: string;
  columns: readonly MegaMenuColumn[];
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

export function MegaMenu({ data, triggerRef, isOpen, onClose, position }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

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

  if (!mounted || !isOpen) return null;

  const positionStyles = {
    left: { left: 'var(--margin)', right: 'auto' },
    center: { left: '50%', transform: 'translateX(-50%)' },
    right: { right: 'var(--margin)', left: 'auto' },
  };

  return (
    <div
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
          'overflow-hidden animate-slide-down',
          'max-h-[calc(100vh-120px)] overflow-y-auto'
        )}
        style={{
          maxWidth: 'var(--maxw)',
          width: 'calc(100% - var(--margin) * 2)',
          ...positionStyles[position],
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid gap-[var(--gutter)] p-[calc(var(--lh)*3)]" style={{
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          columnGap: 'var(--gutter)',
        }}>
          {data.columns.map((column) => {
            const Icon = columnIcons[column.heading] || Briefcase;
            return (
              <div key={column.heading} className="flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span style={{ color: 'var(--accent)' }} aria-hidden="true">
                    <Icon className="w-5 h-5" />
                  </span>
                  <Kicker size="sm" className="mb-0">{column.heading}</Kicker>
                </div>
                <ul className="space-y-3 flex-1" role="list">
                  {column.items.map((item) => (
                    <li key={item.label}>
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
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <div className="col-span-3 pt-[var(--lh)] border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1 min-w-[200px]">
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
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slideDown 0.25s ease-out forwards;
        }
      `}</style>
    </div>
  );
}