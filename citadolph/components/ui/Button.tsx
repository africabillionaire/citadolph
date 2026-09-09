'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-semibold text-sm uppercase tracking-wider',
    'transition-all duration-150 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--accent)] text-[var(--paper)] border-2 border-[var(--accent)]',
          'hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)]',
          'active:scale-[0.98] active:shadow-[0_2px_8px_rgba(228,0,43,0.3)]',
          'shadow-[0_4px_16px_rgba(228,0,43,0.3)]',
        ],
        secondary: [
          'bg-transparent text-[var(--ink)] border-2 border-[var(--ink)]',
          'hover:bg-[var(--ink)] hover:text-[var(--paper)]',
          'active:bg-[var(--ink-muted)] active:border-[var(--ink-muted)]',
        ],
        outline: [
          'bg-transparent text-[var(--accent)] border-2 border-[var(--accent)]',
          'hover:bg-[var(--accent)] hover:text-[var(--paper)]',
        ],
        ghost: [
          'bg-transparent text-[var(--ink)] border-2 border-transparent',
          'hover:bg-[var(--paper-alt)]',
        ],
      },
      size: {
        sm: 'px-4 py-2 text-xs gap-1.5',
        md: 'px-6 py-3 text-sm gap-2',
        lg: 'px-8 py-4 text-base gap-2.5',
        icon: 'p-3',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      leftIcon,
      rightIcon,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, fullWidth, className })}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <circle
              className="opacity-75"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="30"
              strokeDashoffset="0"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <>
            {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
            {children}
            {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';