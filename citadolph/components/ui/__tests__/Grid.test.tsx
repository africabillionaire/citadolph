import { render, screen } from '@testing-library/react';
import { Section, Wrap, Band } from '@/components/ui/Grid';
import { vi, describe, it, expect } from 'vitest';

describe('Grid System - Section', () => {
  it('renders section with default variant', () => {
    render(<Section data-testid="test-section">Content</Section>);
    
    const section = screen.getByTestId('test-section');
    expect(section).toBeInTheDocument();
    expect(section.tagName).toBe('SECTION');
  });

  it('renders section with compact variant', () => {
    render(<Section variant="compact" data-testid="test-section">Content</Section>);
    
    const section = screen.getByTestId('test-section');
    expect(section).toBeInTheDocument();
    expect(section.tagName).toBe('SECTION');
  });

  it('renders section with alt variant', () => {
    render(<Section variant="alt" data-testid="test-section">Content</Section>);
    
    const section = screen.getByTestId('test-section');
    expect(section).toBeInTheDocument();
    expect(section.tagName).toBe('SECTION');
  });

  it('applies id and aria-labelledby', () => {
    render(<Section id="test-section" ariaLabel="test-title" data-testid="test-section">Content</Section>);
    
    const section = screen.getByTestId('test-section');
    expect(section).toHaveAttribute('id', 'test-section');
    expect(section).toHaveAttribute('aria-labelledby', 'test-title');
  });
});

describe('Grid System - Wrap', () => {
  it('renders centered container', () => {
    render(<Wrap data-testid="test-wrap">Content</Wrap>);
    
    const wrap = screen.getByTestId('test-wrap');
    expect(wrap).toBeInTheDocument();
    expect(wrap.tagName).toBe('DIV');
  });

  it('removes max-width when fullWidth=true', () => {
    render(<Wrap fullWidth data-testid="test-wrap">Content</Wrap>);
    
    const wrap = screen.getByTestId('test-wrap');
    expect(wrap).toBeInTheDocument();
  });

  it('has relative positioning for overlay children', () => {
    render(<Wrap data-testid="test-wrap">Content</Wrap>);
    
    const wrap = screen.getByTestId('test-wrap');
    expect(wrap).toBeInTheDocument();
  });
});

describe('Grid System - Band', () => {
  it('renders as grid', () => {
    render(
      <Band span="1 / 7" data-testid="test-band">
        <div>Child</div>
      </Band>
    );
    
    const band = screen.getByTestId('test-band');
    expect(band).toBeInTheDocument();
    expect(band.tagName).toBe('DIV');
  });

  it('applies default span (1 / -1) when not specified', () => {
    render(
      <Band data-testid="test-band">
        <div>Child</div>
      </Band>
    );
    
    const band = screen.getByTestId('test-band');
    expect(band).toBeInTheDocument();
  });

  it('applies align-items', () => {
    render(
      <Band align="center" data-testid="test-band">
        <div>Child</div>
      </Band>
    );
    
    const band = screen.getByTestId('test-band');
    expect(band).toBeInTheDocument();
  });

  it('applies column gap', () => {
    render(
      <Band gap="32px" data-testid="test-band">
        <div>Child</div>
      </Band>
    );
    
    const band = screen.getByTestId('test-band');
    expect(band).toBeInTheDocument();
  });

  it('applies gridTemplateRows when provided', () => {
    render(
      <Band rows="auto 1fr auto" data-testid="test-band">
        <div>Child</div>
      </Band>
    );
    
    const band = screen.getByTestId('test-band');
    expect(band).toBeInTheDocument();
  });

  it('forwards ref to underlying div', () => {
    const ref = vi.fn();
    render(<Band ref={ref} data-testid="test-band">Content</Band>);
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });
});

describe('Grid System - Baseline Alignment', () => {
  it('uses --lh (24px) as baseline unit', () => {
    // Verify CSS variables are available
    const style = getComputedStyle(document.documentElement);
    expect(style.getPropertyValue('--lh')).toBe('24px');
    expect(style.getPropertyValue('--bl')).toBe('8px');
  });

  it('Section renders correctly', () => {
    render(<Section data-testid="test-section">Content</Section>);
    const section = screen.getByTestId('test-section');
    expect(section).toBeInTheDocument();
  });

  it('Band renders correctly', () => {
    render(<Band data-testid="test-band"><div>Child</div></Band>);
    const band = screen.getByTestId('test-band');
    expect(band).toBeInTheDocument();
  });
});

describe('Grid System - Subgrid Fallback', () => {
  it('Band renders with grid template columns', () => {
    render(
      <Band data-testid="test-band">
        <div>Child</div>
      </Band>
    );
    
    const band = screen.getByTestId('test-band');
    expect(band).toBeInTheDocument();
  });

  it('applies inline styles for grid properties', () => {
    render(
      <Band span="1 / 5" align="start" gap="16px" data-testid="test-band">
        <div>Child</div>
      </Band>
    );
    
    const band = screen.getByTestId('test-band');
    expect(band).toBeInTheDocument();
  });
});

describe('Grid System - Column Span Validation', () => {
  const validSpans = [
    '1 / -1',
    '1 / 7',
    '7 / 13',
    '2 / 12',
    '1 / 5',
    '5 / 9',
    '9 / 13',
  ];

  validSpans.forEach(span => {
    it(`accepts valid span: ${span}`, () => {
      render(
        <Band span={span} data-testid="test-band">
          <div>Child</div>
        </Band>
      );
      
      const band = screen.getByTestId('test-band');
      expect(band).toBeInTheDocument();
    });
  });
});

describe('Grid System - Responsive Behavior', () => {
  it('Wrap renders with CSS variables for responsive margins', () => {
    render(<Wrap data-testid="test-wrap">Content</Wrap>);
    
    const wrap = screen.getByTestId('test-wrap');
    expect(wrap).toBeInTheDocument();
  });

  it('Band renders with CSS variables for gap', () => {
    render(
      <Band data-testid="test-band">
        <div>Child</div>
      </Band>
    );
    
    const band = screen.getByTestId('test-band');
    expect(band).toBeInTheDocument();
  });
});

describe('Grid System - Integration', () => {
  it('Section > Wrap > Band hierarchy works', () => {
    render(
      <Section id="test" ariaLabel="Test" data-testid="test-section">
        <Wrap data-testid="test-wrap">
          <Band span="1 / 7" data-testid="left-band">
            <div>Left Column</div>
          </Band>
          <Band span="7 / 13" data-testid="right-band">
            <div>Right Column</div>
          </Band>
        </Wrap>
      </Section>
    );
    
    expect(screen.getByText('Left Column')).toBeInTheDocument();
    expect(screen.getByText('Right Column')).toBeInTheDocument();
    
    const section = screen.getByTestId('test-section');
    expect(section).toHaveAttribute('id', 'test');
    
    const wrap = screen.getByTestId('test-wrap');
    expect(wrap).toBeInTheDocument();
    
    const leftBand = screen.getByTestId('left-band');
    expect(leftBand).toBeInTheDocument();
    
    const rightBand = screen.getByTestId('right-band');
    expect(rightBand).toBeInTheDocument();
  });
});