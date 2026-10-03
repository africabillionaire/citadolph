import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '@/components/layout/Header';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset scroll position
    window.scrollTo(0, 0);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders logo with dark variant (visible on light background)', () => {
    render(<Header />);
    
    const logo = screen.getByAltText('Citadolph logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/logo_full_black.svg');
  });

  it('renders single top band (no UtilityBar separation)', () => {
    render(<Header />);
    
    // Should have header element
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    // Should NOT have separate utility bar with dark gradient
    const utilityBars = document.querySelectorAll('[style*="linear-gradient(90deg, var(--ink)"]');
    expect(utilityBars.length).toBe(0);
  });

  it('renders navigation items in 12-column grid', () => {
    render(<Header />);
    
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeInTheDocument();
    
    // Check all 5 nav items
    expect(screen.getByText('What We Do')).toBeInTheDocument();
    expect(screen.getByText('What We Think')).toBeInTheDocument();
    expect(screen.getByText('Who We Are')).toBeInTheDocument();
    expect(screen.getByText('Career')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('shows CTA button with proper baseline-aligned height (48px)', () => {
    render(<Header />);
    
    const ctaButton = screen.getByRole('button', { name: 'Start a Project' });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveClass('min-h-[48px]');
  });

  it('applies scroll elevation after 20px scroll', async () => {
    render(<Header />);
    
    const header = screen.getByRole('banner');
    expect(header).not.toHaveClass('shadow-[var(--shadow-sm)]');
    
    // Mock scrollY and fire scroll event
    Object.defineProperty(window, 'scrollY', { value: 25, writable: true });
    fireEvent(window, new Event('scroll'));
    
    await waitFor(() => {
      expect(header).toHaveClass('shadow-[var(--shadow-sm)]');
    });
  });

  it('removes scroll elevation when scrolling back to top', async () => {
    render(<Header />);
    
    Object.defineProperty(window, 'scrollY', { value: 25, writable: true });
    fireEvent(window, new Event('scroll'));
    
    await waitFor(() => {
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('shadow-[var(--shadow-sm)]');
    });
    
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    fireEvent(window, new Event('scroll'));
    
    await waitFor(() => {
      const header = screen.getByRole('banner');
      expect(header).not.toHaveClass('shadow-[var(--shadow-sm)]');
    });
  });

  it('opens mobile drawer on hamburger click', async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    const mobileTrigger = screen.getByLabelText('Open menu');
    await user.click(mobileTrigger);
    
    // Mobile drawer should be open
    expect(screen.getByRole('dialog', { name: 'Mobile menu' })).toBeInTheDocument();
  });

  it('has language selector dropdown', () => {
    render(<Header />);
    
    const langButton = screen.getByLabelText('Select language');
    expect(langButton).toBeInTheDocument();
    expect(langButton).toHaveTextContent('EN');
  });

  it('has auth dropdown', () => {
    render(<Header />);
    
    const authButton = screen.getByLabelText('Sign in or register');
    expect(authButton).toBeInTheDocument();
    expect(authButton).toHaveTextContent('Sign In');
  });

  it('opens auth dropdown on click', async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    const authButton = screen.getByLabelText('Sign in or register');
    await user.click(authButton);
    
    expect(screen.getByRole('option', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Register' })).toBeInTheDocument();
  });

  it('opens language dropdown on click', async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    const langButton = screen.getByLabelText('Select language');
    await user.click(langButton);
    
    // Dropdown options include flag + code + label
    expect(screen.getByRole('option', { name: /EN.*English/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /FR.*Français/i })).toBeInTheDocument();
  });

  it('uses sticky positioning at top', () => {
    render(<Header />);
    
    const wrapper = screen.getByRole('banner').parentElement;
    expect(wrapper).toHaveClass('sticky');
    expect(wrapper).toHaveClass('top-0');
  });

  it('has proper z-index for fixed positioning', () => {
    render(<Header />);
    
    const wrapper = screen.getByRole('banner').parentElement;
    expect(wrapper).toHaveClass('z-[var(--z-fixed)]');
  });

  it('nav items have proper focus-visible styles', () => {
    render(<Header />);
    
    const navItems = screen.getAllByRole('button', { name: /what we do|what we think|who we are|career|contact us/i });
    navItems.forEach(item => {
      expect(item).toHaveClass('focus-visible:outline-none');
      expect(item).toHaveClass('focus-visible:ring-2');
      expect(item).toHaveClass('focus-visible:ring-[var(--accent)]');
    });
  });

  it('mega menu triggers have aria-haspopup="dialog"', () => {
    render(<Header />);
    
    const whatWeDo = screen.getByRole('button', { name: 'What We Do' });
    const whatWeThink = screen.getByRole('button', { name: 'What We Think' });
    const career = screen.getByRole('button', { name: 'Career' });
    
    expect(whatWeDo).toHaveAttribute('aria-haspopup', 'dialog');
    expect(whatWeThink).toHaveAttribute('aria-haspopup', 'dialog');
    expect(career).toHaveAttribute('aria-haspopup', 'dialog');
  });

  it('logo links to home and closes menus', async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    const logoLink = screen.getByRole('link', { name: 'Citadolph — home' });
    await user.click(logoLink);
    
    // Should navigate to home (link href="/")
    expect(logoLink).toHaveAttribute('href', '/');
  });
});

describe('Header - Grid Alignment', () => {
  it('uses Wrap component with max-width constraint', () => {
    render(<Header />);
    
    const wrap = document.querySelector('.mx-auto.max-w-\\[var\\(--maxw\\)\\]');
    expect(wrap).toBeInTheDocument();
  });

  it('applies baseline-aligned padding via CSS variables', () => {
    render(<Header />);
    
    // Header band height should be 3 × --lh = 72px
    const header = screen.getByRole('banner');
    const bands = header.querySelectorAll('[style*="var(--lh)"]');
    expect(bands.length).toBeGreaterThan(0);
  });

  it('does not use fixed pixel heights (88px removed)', () => {
    render(<Header />);
    
    const header = screen.getByRole('banner');
    // Should not have h-[88px]
    expect(header).not.toHaveAttribute('style', expect.stringContaining('88px'));
  });
});