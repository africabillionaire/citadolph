"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, Globe, User, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  navigation,
  siteConfig,
  megaMenus,
  type NavItem,
  authLinks,
  type AuthState,
} from "@/lib/site-content";
import { MegaMenu } from "./MegaMenu";
import { MobileDrawer } from "./MobileDrawer";
import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Typography";
import { Band, Wrap } from "@/components/ui/Grid";

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "citadolph:openMegaMenu";

/* Swiss Design Easing: Objective, crisp, professional deceleration. */
const swissEasing = [0.16, 1, 0.3, 1] as const;

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: swissEasing } },
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

interface HeaderProps {
  onScrollTo?: (id: string) => void;
  authState?: AuthState;
  onAuthAction?: (action: "login" | "register" | "signout") => void;
}

export function Header({
  onScrollTo,
  authState = "unauthenticated",
  onAuthAction,
}: HeaderProps) {
  /* ------------------------------ state ---------------------------- */
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem(STORAGE_KEY);
  });
  const [languageOpen, setLanguageOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const languageRef = useRef<HTMLDivElement>(null);
  const authRef = useRef<HTMLDivElement>(null);

  /* --------------------------- megamenu ---------------------------- */

  const closeMega = useCallback(() => {
    setOpenMenu(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const toggleMega = useCallback((key: string) => {
    setOpenMenu((prev) => {
      const next = prev === key ? null : key;
      if (next) sessionStorage.setItem(STORAGE_KEY, key);
      else sessionStorage.removeItem(STORAGE_KEY);
      return next;
    });
  }, []);

  /* --------------------------- effects ----------------------------- */

  /* Scroll elevation — baseline-aligned threshold */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Body scroll-lock while drawer is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* Global Escape: close megamenu first, then drawer */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openMenu) closeMega();
      else if (languageOpen) setLanguageOpen(false);
      else if (authOpen) setAuthOpen(false);
      else setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMenu, languageOpen, authOpen, mobileOpen, closeMega]);

  /* Click outside handlers for dropdowns */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (languageRef.current && !languageRef.current.contains(e.target as Node)) {
        setLanguageOpen(false);
      }
      if (authRef.current && !authRef.current.contains(e.target as Node)) {
        setAuthOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onTriggerKeyDown = (e: React.KeyboardEvent, key: string) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      toggleMega(key);
    } else if (e.key === "ArrowUp" && openMenu === key) {
      e.preventDefault();
      closeMega();
    }
  };

  /* ----------------------------- nav ------------------------------- */

  const handleNavClick = useCallback(
    (href: string) => {
      if (onScrollTo && href.startsWith("#") && href !== "#")
        onScrollTo(href.slice(1));
      setMobileOpen(false);
      closeMega();
    },
    [onScrollTo, closeMega],
  );

  const currentAuthLinks = authLinks[authState];

  /* ------------------------------ render --------------------------- */
  return (
    /* Sticky wrapper: single top band, no UtilityBar separation */
    <motion.div
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-[var(--z-fixed)]"
    >
      <header
        role="banner"
        className={cn(
          "relative border-b border-[var(--border)] bg-[var(--paper)]/95 backdrop-blur-sm",
          "transition-[box-shadow] duration-300",
          scrolled && "shadow-[var(--shadow-sm)]",
        )}
      >
        {/* 
          Single 12-column grid band.
          Height = 3 × --lh (72px) — baseline aligned.
          Utility bar merged into row 1 (top 24px), nav row 2 (48px).
        */}
        <Wrap className="relative">
          {/* Row 1: Utility strip (24px = 1 × --lh) */}
          <Band
            span="1 / -1"
            className="h-[var(--lh)] border-b border-[var(--border)] items-center justify-between"
            style={{ minHeight: 'var(--lh)' }}
          >
            <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--ink-muted)' }}>
              <span className="flex items-center gap-1.5">
                <Globe className="w-3 h-3" aria-hidden="true" />
                International
              </span>
              <div className="relative" ref={languageRef}>
                <button
                  className="flex items-center gap-1 px-2 py-1 rounded-[var(--radius-sm)] transition-colors hover:bg-[var(--paper-alt)]"
                  onClick={() => setLanguageOpen(!languageOpen)}
                  aria-expanded={languageOpen}
                  aria-haspopup="listbox"
                  aria-label="Select language"
                >
                  <span className="text-base">🇺🇸</span>
                  <span className="font-medium" style={{ color: 'var(--ink)' }}>EN</span>
                  <ChevronDown className={cn("w-3 h-3 transition-transform", languageOpen && "rotate-180")} aria-hidden="true" style={{ color: 'var(--ink-muted)' }} />
                </button>
                {languageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-full left-0 mt-1 min-w-[120px] rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--paper)] shadow-[var(--shadow-lg)] overflow-hidden"
                    role="listbox"
                  >
                    <button role="option" aria-selected className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-[var(--paper-alt)]" onClick={() => setLanguageOpen(false)} style={{ color: 'var(--ink)' }}>
                      <span>🇺🇸</span> <span>EN</span> <span className="text-xs" style={{ color: 'var(--ink-muted)' }}>English</span>
                    </button>
                    <button role="option" className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-[var(--paper-alt)]" onClick={() => setLanguageOpen(false)} style={{ color: 'var(--ink)' }}>
                      <span>🇫🇷</span> <span>FR</span> <span className="text-xs" style={{ color: 'var(--ink-muted)' }}>Français</span>
                    </button>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2" ref={authRef}>
              <button
                className="flex items-center gap-1.5 px-2 py-1 rounded-[var(--radius-sm)] transition-colors hover:bg-[var(--paper-alt)]"
                onClick={() => setAuthOpen(!authOpen)}
                aria-expanded={authOpen}
                aria-haspopup="listbox"
                aria-label={authState === "authenticated" ? "Account menu" : "Sign in or register"}
              >
                <User className="w-3.5 h-3.5" aria-hidden="true" style={{ color: 'var(--ink-muted)' }} />
                <span className="font-medium text-sm" style={{ color: 'var(--ink)' }}>
                  {authState === "authenticated" ? "Account" : "Sign In"}
                </span>
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", authOpen && "rotate-180")} aria-hidden="true" style={{ color: 'var(--ink-muted)' }} />
              </button>
              {authOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute top-full right-0 mt-1 min-w-[160px] rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--paper)] shadow-[var(--shadow-lg)] overflow-hidden"
                  role="listbox"
                >
                  {currentAuthLinks.map((link, index) => (
                    <motion.button
                      key={link.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        'w-full justify-start px-3 py-2 text-sm font-medium gap-2 transition-colors',
                        link.variant === 'primary'
                          ? 'bg-[var(--accent)] text-[var(--paper)] border-2 border-[var(--accent)] hover:bg-[var(--accent-hover)]'
                          : 'bg-transparent text-[var(--ink)] hover:bg-[var(--paper-alt)]'
                      )}
                      onClick={() => {
                        setAuthOpen(false);
                        if ('action' in link && link.action === 'signout') onAuthAction?.('signout');
                        else if (link.label === 'Login') onAuthAction?.('login');
                        else if (link.label === 'Register') onAuthAction?.('register');
                      }}
                      role="option"
                    >
                      {link.label === 'Sign Out' && <LogOut className="w-4 h-4" aria-hidden="true" />}
                      {link.label === 'Dashboard' && <Menu className="w-4 h-4" aria-hidden="true" />}
                      {link.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>
          </Band>

          {/* Row 2: Brand + Navigation (48px = 2 × --lh) */}
          <Band
            span="1 / -1"
            className="h-[calc(var(--lh)*2)] items-center"
            style={{ minHeight: 'calc(var(--lh) * 2)' }}
          >
            {/* Logo — columns 1–3 */}
            <div className="col-span-3 flex items-center">
              <Link
                href="/"
                aria-label={`${siteConfig.name} — home`}
                className="rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
                onClick={() => { setMobileOpen(false); closeMega(); }}
              >
                <Image
                  src="/images/logo_full_black.svg"
                  alt={`${siteConfig.name} logo`}
                  width={180}
                  height={48}
                  priority
                  style={{ filter: "var(--logo-filter, none)" }}
                />
              </Link>
            </div>

            {/* Primary navigation — columns 4–9 */}
            <nav
              aria-label="Main navigation"
              className="col-span-6 hidden items-center justify-center gap-1 lg:flex"
            >
              {navigation.main.map((item: NavItem) => {
                const megaKey = item.megaMenu;
                const hasMega = !!megaKey && megaKey in megaMenus;
                const isOpen = openMenu === megaKey;

                if (!hasMega) {
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        "group relative rounded-[var(--radius-sm)] px-4 py-2 text-sm font-medium",
                        "transition-colors duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
                        "text-[var(--ink)] opacity-70 hover:opacity-100"
                      )}
                    >
                      <span className="relative inline-block transition-transform duration-200 group-hover:scale-105">
                        {item.label}
                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
                      </span>
                    </button>
                  );
                }

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseLeave={closeMega}
                  >
                    <button
                      ref={(el) => { triggerRefs.current[megaKey] = el; }}
                      type="button"
                      aria-expanded={isOpen}
                      aria-haspopup="dialog"
                      aria-controls={`megamenu-${megaKey}`}
                      onClick={() => toggleMega(megaKey)}
                      onKeyDown={(e) => onTriggerKeyDown(e, megaKey)}
                      className={cn(
                        "group relative flex items-center gap-1.5 rounded-[var(--radius-sm)] px-4 py-2 text-sm font-medium",
                        "transition-colors duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
                        isOpen
                          ? "text-[var(--accent)] bg-[var(--accent)]/5"
                          : "text-[var(--ink)] opacity-70 hover:opacity-100 hover:bg-[var(--paper-alt)]"
                      )}
                    >
                      <span className="relative inline-block transition-transform duration-200 group-hover:scale-105">
                        {item.label}
                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
                      </span>
                      <ChevronDown
                        className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")}
                        aria-hidden="true"
                      />
                    </button>

                    <MegaMenu
                      data={megaMenus[megaKey as keyof typeof megaMenus]}
                      triggerRefs={triggerRefs}
                      triggerKey={megaKey}
                      isOpen={isOpen}
                      onClose={closeMega}
                      position="center"
                    />
                  </div>
                );
              })}
            </nav>

            {/* Actions — columns 10–12, flush right */}
            <div className="col-span-3 flex items-center justify-end gap-3">
              <Button
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => handleNavClick(navigation.cta.href)}
                className="hidden lg:inline-flex min-h-[48px]"
                style={{ lineHeight: 'var(--lh)' }}
              >
                {navigation.cta.label}
              </Button>

              {/* Mobile trigger — column 12 only */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-drawer"
                aria-label="Open menu"
                className={cn(
                  "flex min-h-[48px] min-w-[48px] items-center justify-center rounded-[var(--radius-sm)] transition-colors lg:hidden",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                )}
                style={{ background: "var(--paper-alt)", color: "var(--ink)" }}
              >
                <Menu className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>
          </Band>
        </Wrap>
      </header>

      <MobileDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        authState={authState}
        onAuthAction={onAuthAction}
        onScrollTo={onScrollTo}
      />
    </motion.div>
  );
}