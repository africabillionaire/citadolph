import { render, screen, fireEvent } from '@testing-library/react';
import { GridOverlay } from '@/components/ui/Grid';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('GridOverlay', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders overlay elements when enabled', () => {
    const onToggle = vi.fn();
    render(<GridOverlay enabled={true} onToggle={onToggle} />);

    const overlay = screen.getByRole('button', { name: /hide grid overlay/i }).closest('.grid-overlay')?.parentElement;
    // The overlay is rendered via style jsx global, so we check for the toggle button
    const toggleButton = screen.getByRole('button', { name: /hide grid overlay/i });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders toggle button with correct aria when disabled', () => {
    const onToggle = vi.fn();
    render(<GridOverlay enabled={false} onToggle={onToggle} />);

    const toggleButton = screen.getByRole('button', { name: /show grid overlay/i });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('toggles grid on button click', () => {
    const onToggle = vi.fn();
    render(<GridOverlay enabled={false} onToggle={onToggle} />);

    const toggleButton = screen.getByRole('button', { name: /show grid overlay/i });
    fireEvent.click(toggleButton);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('shows correct grid status text', () => {
    const onToggle = vi.fn();
    const { rerender } = render(<GridOverlay enabled={false} onToggle={onToggle} />);

    expect(screen.getByText('Grid: OFF')).toBeInTheDocument();

    rerender(<GridOverlay enabled={true} onToggle={onToggle} />);
    expect(screen.getByText('Grid: ON')).toBeInTheDocument();
  });

  it('has correct aria attributes when enabled', () => {
    const onToggle = vi.fn();
    render(<GridOverlay enabled={true} onToggle={onToggle} />);

    const toggleButton = screen.getByRole('button', { name: /hide grid overlay/i });
    expect(toggleButton).toHaveAttribute('aria-pressed', 'true');
    expect(toggleButton).toHaveAttribute('aria-label', 'Hide grid overlay');
  });

  it('has correct aria attributes when disabled', () => {
    const onToggle = vi.fn();
    render(<GridOverlay enabled={false} onToggle={onToggle} />);

    const toggleButton = screen.getByRole('button', { name: /show grid overlay/i });
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false');
    expect(toggleButton).toHaveAttribute('aria-label', 'Show grid overlay');
  });

  it('renders kbd with G key', () => {
    const onToggle = vi.fn();
    render(<GridOverlay enabled={true} onToggle={onToggle} />);

    expect(screen.getByText('G')).toBeInTheDocument();
  });
});