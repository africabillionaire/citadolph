'use client';

import { type HTMLAttributes, forwardRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface WrapProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  fullWidth?: boolean;
}

export const Wrap = forwardRef<HTMLDivElement, WrapProps>(
  ({ className = '', children, fullWidth = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'mx-auto relative',
        'px-[var(--margin)]',
        fullWidth ? 'max-w-none' : 'max-w-[var(--maxw)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Wrap.displayName = 'Wrap';

export interface BandProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  span?: string; // e.g., "1 / 7" or "1 / -1"
  align?: 'start' | 'center' | 'end' | 'stretch';
  gap?: string;
  rows?: string;
}

export const Band = forwardRef<HTMLDivElement, BandProps>(
  (
    {
      className = '',
      children,
      span = '1 / -1',
      align = 'start',
      gap,
      rows,
      style,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        'grid',
        'grid-column-[var(--span)]',
        'grid-template-columns-subgrid',
        'align-items-[var(--align)]',
        className
      )}
      style={{
        '--span': span,
        '--align': align,
        '--gap': gap || 'var(--gutter)',
        '--rows': rows,
        gridColumn: span,
        gridTemplateColumns: 'subgrid',
        alignItems: align,
        columnGap: gap || 'var(--gutter)',
        gridTemplateRows: rows,
        ...style,
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  )
);

Band.displayName = 'Band';

export interface GridOverlayProps {
  enabled: boolean;
  onToggle: () => void;
}

export function GridOverlay({ enabled, onToggle }: GridOverlayProps) {
  if (typeof window === 'undefined') return null;

  return (
    <>
      <style jsx global>{`
        .grid-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .grid-overlay.active {
          opacity: 1;
        }
        .grid-overlay .columns {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: var(--margin) repeat(var(--cols), 1fr) var(--margin);
          column-gap: var(--gutter);
        }
        .grid-overlay .columns > div {
          background: rgba(228, 0, 43, 0.03);
          border-left: 1px dashed rgba(228, 0, 43, 0.15);
          border-right: 1px dashed rgba(228, 0, 43, 0.15);
        }
        .grid-overlay .columns > div::before {
          content: attr(data-col);
          position: absolute;
          top: var(--lh);
          left: 50%;
          transform: translateX(-50%);
          font: 10px/1 var(--font-mono), monospace;
          color: rgba(228, 0, 43, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .grid-overlay .baselines {
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(
              to bottom,
              transparent,
              transparent calc(var(--bl) - 1px),
              rgba(228, 0, 43, 0.04) calc(var(--bl) - 1px),
              rgba(228, 0, 43, 0.04) var(--bl)
            ),
            repeating-linear-gradient(
              to bottom,
              transparent,
              transparent calc(var(--lh) - 1px),
              rgba(228, 0, 43, 0.08) calc(var(--lh) - 1px),
              rgba(228, 0, 43, 0.08) var(--lh)
            );
        }
        .grid-overlay .margins {
          position: absolute;
          inset: 0;
        }
        .grid-overlay .margins::before,
        .grid-overlay .margins::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(228, 0, 43, 0.3);
        }
        .grid-overlay .margins::before { left: var(--margin); }
        .grid-overlay .margins::after { right: var(--margin); }
        .grid-toggle {
          position: fixed;
          bottom: var(--margin);
          right: var(--margin);
          z-index: 10000;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 12px 16px;
          background: var(--paper);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          font: 11px/1 var(--font-mono), monospace;
          color: var(--ink);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .grid-toggle:hover {
          border-color: var(--accent);
          box-shadow: var(--shadow-xl);
        }
        .grid-toggle kbd {
          min-width: 28px;
          height: 28px;
          padding: 0 8px;
          background: var(--ink);
          color: var(--paper);
          border-radius: var(--radius-sm);
          font: 11px/1 var(--font-mono), monospace;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .grid-toggle .status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
        }
        .grid-toggle .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border);
          transition: background 0.2s ease;
        }
        .grid-toggle .dot.active { background: var(--accent); }
        @media (max-width: 768px) {
          .grid-toggle {
            bottom: 16px;
            right: 16px;
            left: 16px;
            flex-direction: row;
            justify-content: center;
            padding: 10px 16px;
          }
          .grid-toggle kbd { display: none; }
        }
      `}</style>

      <div
        className={`grid-overlay ${enabled ? 'active' : ''}`}
        aria-hidden="true"
      >
        <div className="columns">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} data-col={i + 1} />
          ))}
        </div>
        <div className="baselines" />
        <div className="margins" />
      </div>

      <button
        className="grid-toggle"
        onClick={onToggle}
        aria-label={enabled ? 'Hide grid overlay' : 'Show grid overlay'}
        aria-pressed={enabled}
      >
        <div className="status">
          <span className={`dot ${enabled ? 'active' : ''}`} aria-hidden="true" />
          <span>Grid: {enabled ? 'ON' : 'OFF'}</span>
        </div>
        <kbd>G</kbd>
      </button>
    </>
  );
}

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant?: 'default' | 'compact' | 'alt';
  id?: string;
  ariaLabel?: string;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className = '', children, variant = 'default', id, ariaLabel, ...props }, ref) => {
    const variants = {
      default: 'py-[calc(var(--lh)*6)]',
      compact: 'py-[calc(var(--lh)*4)]',
      alt: 'py-[calc(var(--lh)*6)] bg-[var(--paper-alt)]',
    };

    return (
      <section
        ref={ref}
        id={id}
        aria-labelledby={ariaLabel}
        className={cn(variants[variant], className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';