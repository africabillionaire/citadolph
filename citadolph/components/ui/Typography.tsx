'use client';

import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface KickerProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'muted' | 'inverted';
  size?: 'sm' | 'md' | 'lg';
}

export const Kicker = forwardRef<HTMLSpanElement, KickerProps>(
  ({ className = '', variant = 'default', size = 'md', children, ...props }, ref) => {
    const variants = {
      default: 'text-[var(--accent)]',
      accent: 'text-[var(--accent)]',
      muted: 'text-[var(--ink-muted)]',
      inverted: 'text-[var(--paper)]',
    };

    const sizes = {
      sm: 'text-xs',
      md: 'text-[11px]',
      lg: 'text-sm',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-block font-mono font-semibold uppercase tracking-widest',
          'mb-4',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Kicker.displayName = 'Kicker';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = '', variant = 'default', size = 'md', dot, children, ...props }, ref) => {
    const variants = {
      default: 'bg-[var(--ink)] text-[var(--paper)]',
      outline: 'bg-transparent text-[var(--ink)] border border-[var(--border)]',
      accent: 'bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20',
      success: 'bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20',
      warning: 'bg-[var(--warning)]/10 text-[var(--warning)] border border-[var(--warning)]/20',
      error: 'bg-[var(--error)]/10 text-[var(--error)] border border-[var(--error)]/20',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs gap-1',
      md: 'px-3 py-1 text-sm gap-1.5',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium rounded-full',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className="w-1.5 h-1.5 rounded-full bg-current"
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: '1' | '2' | '3' | '4' | '5' | '6';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      className = '',
      as: Component = 'h2',
      size = '2',
      weight = 'bold',
      align = 'left',
      children,
      ...props
    },
    ref
  ) => {
    const sizes = {
      1: 'text-[clamp(48px,6vw,96px)] leading-[96px]',
      2: 'text-[clamp(32px,4vw,48px)] leading-[48px]',
      3: 'text-[clamp(24px,3vw,32px)] leading-[32px]',
      4: 'text-[clamp(20px,2.5vw,24px)] leading-[24px]',
      5: 'text-[clamp(18px,2vw,20px)] leading-[28px]',
      6: 'text-[clamp(16px,1.5vw,18px)] leading-[24px]',
    };

    const weights = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    const alignments = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    };

    return (
      <Component
        ref={ref}
        className={cn(
          'tracking-tight text-[var(--ink)]',
          sizes[size],
          weights[weight],
          alignments[align],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div';
  size?: 'sm' | 'base' | 'lg' | 'xl';
  color?: 'default' | 'muted' | 'ink' | 'accent' | 'inverted';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  maxWidth?: 'none' | 'prose' | 'wide';
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      className = '',
      as: Component = 'p',
      size = 'base',
      color = 'default',
      weight = 'normal',
      align = 'left',
      maxWidth = 'prose',
      children,
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: 'text-sm leading-6',
      base: 'text-base leading-[var(--lh)]',
      lg: 'text-lg leading-7',
      xl: 'text-xl leading-8',
    };

    const colors = {
      default: 'text-[var(--ink-muted)]',
      muted: 'text-[var(--ink-muted)]/80',
      ink: 'text-[var(--ink)]',
      accent: 'text-[var(--accent)]',
      inverted: 'text-[var(--paper)]',
    };

    const weights = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    const alignments = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    };

    const widths = {
      none: 'max-w-none',
      prose: 'max-w-[65ch]',
      wide: 'max-w-[80ch]',
    };

    return (
      <Component
        ref={ref}
        className={cn(
          sizes[size],
          colors[color],
          weights[weight],
          alignments[align],
          widths[maxWidth],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';