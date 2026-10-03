import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Space_Mono } from "next/font/google";
import "./globals.css";

/**
 * Inter — canonical grotesque sans for Swiss/International Typographic Style.
 * Variable font, subset for performance, display: optional for fast paint.
 */
const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  display: "optional",
  preload: true,
  weight: "variable",
});

/**
 * Inter Tight — tighter tracking for display headlines (optical compensation).
 * Used for masthead/hero where Inter's default tracking is too loose at large sizes.
 */
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "optional",
  preload: true,
  weight: "variable",
});

/**
 * Space Mono — mono for folios, captions, grid annotations, kickers.
 * Reinforces the technical/engineering register of Swiss design.
 * Only weights 400 and 700 available. We use 400 for body mono, 700 for kickers.
 */
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  display: "optional",
  preload: true,
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Citadolph — Digital Transformation Agency for Africa",
    template: "%s | Citadolph",
  },
  description: "Your premier digital partner. We build websites, apps, ERPs, branding, and AI solutions — backed by a network of specialist agencies across Africa. ISO 27001 ready, SOC 2 compliant, GDPR compliant.",
  keywords: ["digital transformation", "website development", "mobile apps", "ERP", "branding", "AI implementation", "Africa", "digital agency"],
  authors: [{ name: "Citadolph" }],
  creator: "Citadolph",
  publisher: "Citadolph",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://citadolph.com",
    siteName: "Citadolph",
    title: "Citadolph — Digital Transformation Agency for Africa",
    description: "Your premier digital partner. We build websites, apps, ERPs, branding, and AI solutions across Africa.",
    images: [
      {
        url: "/images/logo_full_black.svg",
        width: 1200,
        height: 630,
        alt: "Citadolph",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Citadolph — Digital Transformation Agency for Africa",
    description: "Your premier digital partner. We build websites, apps, ERPs, branding, and AI solutions across Africa.",
    images: ["/images/logo_full_black.svg"],
    creator: "@citadolph",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/**
 * Root Layout — Müller-Brockmann Grid System
 *
 * Structure:
 *   <html> (font variables)
 *     <head> (preconnect, icons, manifest)
 *     <body className="grid-root">
 *       <div className="wrap">          ← centered max-width container
 *         <div className="guides" />    ← grid overlay (child of wrap!)
 *         <div className="baseline-guides" /> ← baseline overlay
 *         <div className="margin-guides" />   ← margin lines
 *         {children}                    ← all content inside wrap
 *       </div>
 *       <GridToggle />                  ← fixed toggle button
 *     </body>
 *   </html>
 *
 * Key principles applied:
 * 1. One source of truth: all grid params in :root CSS variables (globals.css)
 * 2. Overlay lives INSIDE .wrap — same content box, no drift
 * 3. Subgrid bands via .band components in sections
 * 4. Baseline lock: --lh = 24px = 3 × --bl (8px)
 * 5. Optical alignment runtime for display type
 * 6. Flush-left, ragged-right; scale hierarchy; one accent (red #e4002b)
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${interSans.variable} ${interTight.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/images/logo_icon_black.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/logo_icon_black.svg" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="grid-root min-h-full flex flex-col">
        {/* 
          .wrap = centered content container with relative positioning.
          The grid overlay (.guides) is a CHILD of .wrap, not a sibling.
          This ensures columns align perfectly at ALL viewport widths.
        */}
        <div className="wrap relative min-h-full flex flex-col">
          {/* Grid column guides — numbered column fields */}
          <div className="guides" aria-hidden="true">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} data-col={i + 1} />
            ))}
          </div>

          {/* Baseline guides — major (--lh) and minor (--bl) lines */}
          <div className="baseline-guides" aria-hidden="true" />

          {/* Margin guides — left/right margin lines */}
          <div className="margin-guides" aria-hidden="true" />

          {/* All page content flows inside the grid wrap */}
          <main id="main-content" className="flex-1" role="main">
            {children}
          </main>
        </div>

        {/* Grid toggle button — fixed viewport, controls body.grid-on */}
        <GridToggle />
      </body>
    </html>
  );
}

/**
 * Grid Toggle — client component for G-key + button toggle.
 * Adds/removes .grid-on class on <body> to reveal overlay.
 */
function GridToggle() {
  if (typeof window === "undefined") return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var body = document.body;
              var toggle = document.querySelector('.grid-toggle');
              var statusDot = toggle?.querySelector('.grid-status-dot');
              var statusText = toggle?.querySelector('.grid-status-text');
              
              function updateUI(on) {
                body.classList.toggle('grid-on', on);
                if (statusDot) statusDot.classList.toggle('active', on);
                if (statusText) statusText.textContent = on ? 'Grid: ON' : 'Grid: OFF';
                toggle?.setAttribute('aria-pressed', String(on));
                toggle?.setAttribute('aria-label', on ? 'Hide grid overlay' : 'Show grid overlay');
              }
              
              // Keyboard: G key
              document.addEventListener('keydown', function(e) {
                if (e.key === 'g' || e.key === 'G') {
                  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
                  e.preventDefault();
                  updateUI(!body.classList.contains('grid-on'));
                }
              });
              
              // Button click
              toggle?.addEventListener('click', function() {
                updateUI(!body.classList.contains('grid-on'));
              });
              
              // Initialize from localStorage
              var saved = localStorage.getItem('grid-overlay');
              if (saved === 'true') updateUI(true);
              
              // Persist
              var observer = new MutationObserver(function() {
                localStorage.setItem('grid-overlay', String(body.classList.contains('grid-on')));
              });
              observer.observe(body, { attributes: true, attributeFilter: ['class'] });
            })();
          `,
        }}
      />
      <button
        className="grid-toggle"
        aria-label="Show grid overlay"
        aria-pressed="false"
        type="button"
      >
        <div className="grid-status">
          <span className="grid-status-dot" aria-hidden="true" />
          <span className="grid-status-text">Grid: OFF</span>
        </div>
        <kbd>G</kbd>
      </button>
    </>
  );
}