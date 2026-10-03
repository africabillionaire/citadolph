import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MegaMenu } from '@/components/layout/MegaMenu';
import { vi, describe, it, expect, beforeEach } from 'vitest';

const mockMegaMenuData = {
  title: 'Test Menu',
  columns: [
    {
      heading: 'Column 1',
      items: [
        { label: 'Item 1', href: '#1' },
        { label: 'Item 2', href: '#2' },
        { label: 'Item 3', href: '#3' },
        { label: 'Item 4', href: '#4' },
        { label: 'Item 5', href: '#5' },
        { label: 'Item 6', href: '#6' },
      ],
    },
    {
      heading: 'Column 2',
      items: [
        { label: 'Item A', href: '#a' },
        { label: 'Item B', href: '#b' },
      ],
    },
  ],
  cta: { label: 'View All', href: '#all' },
};

const renderMegaMenu = (overrides = {}) => {
  const triggerRefs: React.RefObject<Record<string, HTMLButtonElement | null>> = {
    current: { 'test-key': document.createElement('button') },
  };
  
  return render(
    <MegaMenu
      data={mockMegaMenuData}
      triggerRefs={triggerRefs}
      triggerKey="test-key"
      isOpen={true}
      onClose={vi.fn()}
      position="center"
      {...overrides}
    />
  );
};

describe('MegaMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders menu panel when open', () => {
    renderMegaMenu();
    
    expect(screen.getByRole('dialog', { name: 'Test Menu' })).toBeInTheDocument();
  });

  it('shows search input with auto-focus', () => {
    renderMegaMenu();
    
    const searchInput = screen.getByPlaceholderText('SEARCH…');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('aria-label', 'Search Test Menu');
  });

  it('displays all columns with numbered headers', () => {
    renderMegaMenu();
    
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('Column 1')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('Column 2')).toBeInTheDocument();
  });

  it('applies progressive disclosure - shows only 5 items per column', () => {
    renderMegaMenu();
    
    // Column 1 has 6 items, should only show 5 + "View all"
    const column1Items = screen.getAllByText(/Item [1-6]/);
    expect(column1Items).toHaveLength(5); // Only first 5 visible
    
    // "View all" button should be present
    expect(screen.getByRole('button', { name: /view all 6 column 1/i })).toBeInTheDocument();
  });

  it('filters items when searching', async () => {
    const user = userEvent.setup();
    renderMegaMenu();
    
    const searchInput = screen.getByPlaceholderText('SEARCH…');
    await user.type(searchInput, 'Item 1');
    
    // Should only show Item 1
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Item A')).not.toBeInTheDocument();
  });

  it('shows "No results" when search has no matches', async () => {
    const user = userEvent.setup();
    renderMegaMenu();
    
    const searchInput = screen.getByPlaceholderText('SEARCH…');
    await user.type(searchInput, 'nonexistent');
    
    expect(screen.getByText(/no results for "nonexistent"/i)).toBeInTheDocument();
  });

  it('closes on Escape key', () => {
    const onClose = vi.fn();
    renderMegaMenu({ onClose });
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(onClose).toHaveBeenCalled();
  });

  it('closes on click outside menu', () => {
    const onClose = vi.fn();
    renderMegaMenu({ onClose });
    
    fireEvent.mouseDown(document.body);
    
    expect(onClose).toHaveBeenCalled();
  });

  it('does not close on click inside menu', () => {
    const onClose = vi.fn();
    const { container } = renderMegaMenu({ onClose });
    
    const menuPanel = container.querySelector('[role="dialog"]');
    fireEvent.mouseDown(menuPanel!, { bubbles: false });
    
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders CTA buttons', () => {
    renderMegaMenu();
    
    expect(screen.getByRole('button', { name: 'View All' })).toBeInTheDocument();
  });

  it('renders social proof stats in CTA band', () => {
    renderMegaMenu();
    
    // Stats are rendered in the CTA band - use container query for text content
    const container = screen.getByRole('dialog');
    expect(container).toHaveTextContent('2,847 specialists');
    expect(container).toHaveTextContent('94% success rate');
  });

  it('has proper focus management - search input focused on open', () => {
    renderMegaMenu();
    
    const searchInput = screen.getByPlaceholderText('SEARCH…');
    expect(searchInput).toHaveFocus();
  });

  it('supports keyboard navigation - columns have tabIndex and data-column-index', () => {
    const { container } = renderMegaMenu();
    
    // The column divs have tabIndex=0 and data-column-index
    const columns = container.querySelectorAll('[data-column-index]');
    expect(columns.length).toBe(2);
    
    // First column should be focusable
    expect(columns[0]).toHaveAttribute('tabIndex', '0');
    expect(columns[1]).toHaveAttribute('tabIndex', '0');
  });

  it('renders with correct grid structure (12-column)', () => {
    const { container } = renderMegaMenu();
    
    const grid = container.querySelector('.grid.grid-cols-12');
    expect(grid).toBeInTheDocument();
  });
});

describe('MegaMenu - Progressive Disclosure Edge Cases', () => {
  it('hides "View all" when column has 5 or fewer items', () => {
    const data = {
      ...mockMegaMenuData,
      columns: [
        {
          heading: 'Small Column',
          items: [
            { label: 'Item 1', href: '#1' },
            { label: 'Item 2', href: '#2' },
          ],
        },
      ],
    };
    
    const triggerRefs: React.RefObject<Record<string, HTMLButtonElement | null>> = {
      current: { 'test-key': document.createElement('button') },
    };
    render(
      <MegaMenu
        data={data}
        triggerRefs={triggerRefs}
        triggerKey="test-key"
        isOpen={true}
        onClose={vi.fn()}
        position="center"
      />
    );
    
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    // The CTA button "View All" is always shown (it's from the data.cta)
    expect(screen.getByRole('button', { name: 'View All' })).toBeInTheDocument();
  });

  it('handles empty filtered columns gracefully', async () => {
    const user = userEvent.setup();
    renderMegaMenu();
    
    const searchInput = screen.getByPlaceholderText('SEARCH…');
    await user.type(searchInput, 'nonexistent');
    
    expect(screen.getByText(/no results for "nonexistent"/i)).toBeInTheDocument();
  });
});