import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { Contact } from '@/components/sections/Contact';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('Contact Form Validation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders all form fields', () => {
    render(<Contact />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/work email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/project details/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /don't lose your free audit slot/i })).toBeInTheDocument();
  });

  it('shows progress indicator with step 1 initially', () => {
    render(<Contact />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '1');
    expect(progressBar).toHaveAttribute('aria-valuemin', '1');
    expect(progressBar).toHaveAttribute('aria-valuemax', '3');
  });

  it('advances progress to step 2 when name and email are filled', () => {
    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/work email/i), { target: { value: 'john@example.com' } });

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '2');
  });

  it('advances progress to step 3 when all fields are filled', () => {
    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/work email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/project details/i), { target: { value: 'Hello world' } });

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '3');
  });

  it('displays contact information', () => {
    render(<Contact />);

    expect(screen.getByText('hello@citadolph.com')).toBeInTheDocument();
    expect(screen.getByText('legal@citadolph.com')).toBeInTheDocument();
    expect(screen.getByText('hr@citadolph.com')).toBeInTheDocument();
    expect(screen.getByText('finance@citadolph.com')).toBeInTheDocument();
    expect(screen.getByText('partner@citadolph.com')).toBeInTheDocument();
    expect(screen.getByText('marketing@citadolph.com')).toBeInTheDocument();
  });

  it('has proper accessibility attributes for progress bar', () => {
    render(<Contact />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuemin', '1');
    expect(progressBar).toHaveAttribute('aria-valuemax', '3');
  });

  it('shows reciprocity offer', () => {
    render(<Contact />);

    expect(screen.getByText('Free 30-min digital audit')).toBeInTheDocument();
  });

  it('shows social proof', () => {
    render(<Contact />);

    // The social proof text is in a span with styles - use partial match
    const proof = screen.getByText(/last 5 clients saved/i);
    expect(proof).toBeInTheDocument();
  });

  it('shows draft saved notice when form has data', () => {
    vi.useFakeTimers();
    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John' } });

    // Advance timer to trigger auto-save (1 second)
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // The draft notice should appear (may be animated in)
    const draftNotice = screen.getByText(/draft auto-saved/i);
    expect(draftNotice).toBeInTheDocument();
    vi.useRealTimers();
  });
});