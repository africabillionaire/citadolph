import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/images/logo_icon_black.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/logo_icon_black.svg" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}