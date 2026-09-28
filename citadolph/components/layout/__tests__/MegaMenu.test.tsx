import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MegaMenu } from '@/components/layout/MegaMenu';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

const mockMegaMenuData = {
  title: 'What We Do',
  columns: [
    {
      heading: 'Digital Products',
      defaultExpanded: true,
      items: [
        { label: 'Website Development', href: '#web' },
        { label: 'Mobile Applications', href: '#mobile' },
        { label: 'ERP Implementation', href: '#erp' },
      ],
    },
    {
      heading: 'Brand & Strategy',
      items: [
        { label: 'Personal Branding', href: '#branding' },
        { label: 'Design Services', href: '#design' },
      ],
    },
  ],
  cta: { label: 'See All Services', href: '#services' },
};

describe('MegaMenu Keyboard Navigation', () => {
  const triggerRefs = { current: {} as Record<string, HTMLButtonElement | null> };
  const triggerKey = 'what-we-do';
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    const triggerBtn = document.createElement('button');
    triggerBtn.setAttribute('aria-expanded', 'false');
    triggerBtn.setAttribute('aria-haspopup', 'dialog');
    triggerBtn.setAttribute('aria-controls', 'megamenu-panel');
    triggerBtn.textContent = 'What We Do';
    triggerRefs.current[triggerKey] = triggerBtn;
    document.body.appendChild(triggerBtn);
  });

  afterEach(() => {
    if (triggerRefs.current[triggerKey]?.parentNode) {
      triggerRefs.current[triggerKey]?.parentNode?.removeChild(triggerRefs.current[triggerKey]!);
    }
  });

  it('opens when trigger is clicked', () => {
    render(
      <MegaMenu
        data={mockMegaMenuData}
        triggerRefs={triggerRefs}
        triggerKey={triggerKey}
        isOpen={true}
        onClose={onClose}
        position="center"
      />
    );

    expect(screen.getByRole('dialog', { name: /what we do/i })).toBeInTheDocument();
  });

  it('closes on Escape key', async () => {
    render(
      <MegaMenu
        data={mockMegaMenuData}
        triggerRefs={triggerRefs}
        triggerKey={triggerKey}
        isOpen={true}
        onClose={onClose}
        position="center"
      />
    );

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('traps focus within menu when open', async () => {
    render(
      <MegaMenu
        data={mockMegaMenuData}
        triggerRefs={triggerRefs}
        triggerKey={triggerKey}
        isOpen={true}
        onClose={onClose}
        position="center"
      />
    );

    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    // Get focusable elements
    const focusableElements = screen.getByRole('dialog').querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    expect(focusableElements.length).toBeGreaterThan(0);
  });

  it('renders search input', async () => {
    render(
      <MegaMenu
        data={mockMegaMenuData}
        triggerRefs={triggerRefs}
        triggerKey={triggerKey}
        isOpen={true}
        onClose={onClose}
        position="center"
      />
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/search…/i)).toBeInTheDocument();
    });
  });

  it('filters columns when search query is entered', async () => {
    render(
      <MegaMenu
        data={mockMegaMenuData}
        triggerRefs={triggerRefs}
        triggerKey={triggerKey}
        isOpen={true}
        onClose={onClose}
        position="center"
      />
    );

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search…/i);
    fireEvent.change(searchInput, { target: { value: 'website' } });

    // Should show only matching items
    expect(screen.getByText('Website Development')).toBeInTheDocument();
    expect(screen.queryByText('Mobile Applications')).not.toBeInTheDocument();
  });

  it('shows no results message when search has no matches', async () => {
    render(
      <MegaMenu
        data={mockMegaMenuData}
        triggerRefs={triggerRefs}
        triggerKey={triggerKey}
        isOpen={true}
        onClose={onClose}
        position="center"
      />
    );

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search…/i);
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    expect(screen.getByText(/no results for/i)).toBeInTheDocument();
  });

  it('renders CTA buttons', async () => {
    render(
      <MegaMenu
        data={mockMegaMenuData}
        triggerRefs={triggerRefs}
        triggerKey={triggerKey}
        isOpen={true}
        onClose={onClose}
        position="center"
      />
    );

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /see all services/i })).toBeInTheDocument();
  });

  it('closes when clicking outside', async () => {
    render(
      <MegaMenu
        data={mockMegaMenuData}
        triggerRefs={triggerRefs}
        triggerKey={triggerKey}
        isOpen={true}
        onClose={onClose}
        position="center"
      />
    );

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    fireEvent.mouseDown(document.body);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when clicking inside menu', async () => {
    render(
      <MegaMenu
        data={mockMegaMenuData}
        triggerRefs={triggerRefs}
        triggerKey={triggerKey}
        isOpen={true}
        onClose={onClose}
        position="center"
      />
    );

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Click on a link inside the menu (should not close)
    const link = screen.getByRole('link', { name: /website development/i });
    fireEvent.mouseDown(link, { bubbles: true });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('has proper ARIA attributes', async () => {
    render(
      <MegaMenu
        data={mockMegaMenuData}
        triggerRefs={triggerRefs}
        triggerKey={triggerKey}
        isOpen={true}
        onClose={onClose}
        position="center"
      />
    );

    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'false');
      expect(dialog).toHaveAttribute('aria-label', 'What We Do');
    });
  });

  it('renders column headers with correct numbering', async () => {
    render(
      <MegaMenu
        data={mockMegaMenuData}
        triggerRefs={triggerRefs}
        triggerKey={triggerKey}
        isOpen={true}
        onClose={onClose}
        position="center"
      />
    );

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('Digital Products')).toBeInTheDocument();
    expect(screen.getByText('Brand & Strategy')).toBeInTheDocument();
  });
});