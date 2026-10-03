import { vi, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock framer-motion / motion
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button {...props}>{children}</button>
    ),
    form: ({ children, ...props }: React.FormHTMLAttributes<HTMLFormElement>) => (
      <form {...props}>{children}</form>
    ),
    span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
      <span {...props}>{children}</span>
    ),
    aside: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <aside {...props}>{children}</aside>
    ),
    nav: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <nav {...props}>{children}</nav>
    ),
    ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul {...props}>{children}</ul>
    ),
    li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
      <li {...props}>{children}</li>
    ),
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p {...props}>{children}</p>
    ),
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1 {...props}>{children}</h1>
    ),
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2 {...props}>{children}</h2>
    ),
    h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3 {...props}>{children}</h3>
    ),
    section: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <section {...props}>{children}</section>
    ),
    header: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <header {...props}>{children}</header>
    ),
    footer: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <footer {...props}>{children}</footer>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReducedMotion: () => false,
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => {
  const createIcon = (name: string) => {
    const Icon = (props: React.SVGProps<SVGSVGElement>) => (
      <svg data-testid={`icon-${name}`} {...props} />
    );
    Icon.displayName = `Mock${name.charAt(0).toUpperCase() + name.slice(1)}`;
    return Icon;
  };
  return {
    ArrowRight: createIcon('arrow-right'),
    ChevronDown: createIcon('chevron-down'),
    ChevronRight: createIcon('chevron-right'),
    Menu: createIcon('menu'),
    X: createIcon('x'),
    Shield: createIcon('shield'),
    Globe: createIcon('globe'),
    Check: createIcon('check'),
    Mail: createIcon('mail'),
    MapPin: createIcon('map-pin'),
    Phone: createIcon('phone'),
    ArrowUp: createIcon('arrow-up'),
    MessageCircle: createIcon('message-circle'),
    Users: createIcon('users'),
    Briefcase: createIcon('briefcase'),
    Lightbulb: createIcon('lightbulb'),
    GraduationCap: createIcon('graduation-cap'),
    Building2: createIcon('building2'),
    Heart: createIcon('heart'),
    Clock: createIcon('clock'),
    Sparkles: createIcon('sparkles'),
    Search: createIcon('search'),
    ExternalLink: createIcon('external-link'),
    LogOut: createIcon('log-out'),
    User: createIcon('user'),
    TrendingUp: createIcon('trending-up'),
    Save: createIcon('save'),
    RotateCcw: createIcon('rotate-ccw'),
    AlertCircle: createIcon('alert-circle'),
    BarChart3: createIcon('bar-chart-3'),
    Cpu: createIcon('cpu'),
    Lock: createIcon('lock'),
    Zap: createIcon('zap'),
  };
});

// Mock CSS custom properties for tests
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: (prop: string) => {
      const vars: Record<string, string> = {
        '--cols': '12',
        '--gutter': '24px',
        '--margin': '48px',
        '--bl': '8px',
        '--lh': '24px',
        '--maxw': '1280px',
        '--accent': '#E4002B',
        '--accent-hover': '#C40026',
        '--ink': '#111315',
        '--ink-muted': '#4A4A4A',
        '--paper': '#FFFFFF',
        '--paper-alt': '#FAFAFA',
        '--border': '#E0E0E0',
        '--radius-sm': '4px',
        '--radius-md': '8px',
        '--radius-lg': '12px',
        '--radius-full': '9999px',
        '--shadow-xs': '0 1px 2px rgba(0,0,0,0.05)',
        '--shadow-sm': '0 1px 3px rgba(0,0,0,0.08)',
        '--shadow-md': '0 4px 12px rgba(0,0,0,0.1)',
        '--shadow-lg': '0 8px 24px rgba(0,0,0,0.12)',
        '--shadow-xl': '0 16px 48px rgba(0,0,0,0.15)',
        '--z-fixed': '300',
        '--z-modal': '500',
        '--font-geist-sans': 'Geist',
        '--font-geist-mono': 'Geist Mono',
      };
      return vars[prop] || '';
    },
  }),
  writable: true,
});

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};
Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock });

// Mock navigator.vibrate
Object.defineProperty(navigator, 'vibrate', {
  value: vi.fn(),
  writable: true,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
  writable: true,
});

// Suppress specific console errors in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      args[0]?.includes?.('Warning: ReactDOM.render is no longer supported') ||
      args[0]?.includes?.('act(...)')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});