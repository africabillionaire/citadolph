'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Menu } from 'lucide-react'

import { cn } from '@/lib/utils'
import { navigation, siteConfig, megaMenus, type NavItem } from '@/lib/site-content'
import { UtilityBar } from './UtilityBar'
import { MegaMenu } from './MegaMenu'
import { MobileDrawer } from './MobileDrawer'

/* ------------------------------------------------------------------ */
/* Constants (module scope — shared by component & helpers)           */
/* ------------------------------------------------------------------ */

const UTILITY_BAR_HEIGHT = 40 // px — matches UtilityBar
const STORAGE_KEY = 'citadolph:openMegaMenu'

/* ------------------------------------------------------------------ */
/* Helper functions (module scope — used by callbacks)                */
/* ------------------------------------------------------------------ */

function openNow(key: string) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('citadolph:openMegaMenu', key)
  }
}

function closeNow() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('citadolph:openMegaMenu')
  }
}

function onTriggerKeyDown(e: React.KeyboardEvent, key: string) {
  if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
  }
  if (e.key === 'ArrowUp') {
    // handled by component closure
  }
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

interface HeaderProps {
  onScrollTo?: (id: string) => void
  authState?: 'unauthenticated' | 'authenticated'
  onAuthAction?: (action: 'login' | 'register' | 'signout') => void
}

export function Header({ onScrollTo, authState = 'unauthenticated', onAuthAction }: HeaderProps) {
  /* ------------------------------ state ---------------------------- */
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null
    return sessionStorage.getItem('citadolph:openMegaMenu')
  })

  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  /* --------------------------- effects ----------------------------- */

  /* Scroll elevation */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Body scroll-lock while drawer is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  /* Global Escape: close megamenu first, then drawer */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (openMenu) {
        sessionStorage.removeItem('citadolph:openMegaMenu')
        setOpenMenu(null)
      } else {
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openMenu])

  /* --------------------------- megamenu ---------------------------- */
  /* Click-only trigger — no hover intent */

  const openNow = useCallback(
    (key: string) => {
      setOpenMenu(key)
      sessionStorage.setItem('citadolph:openMegaMenu', key)
    },
    []
  )

  const closeNow = useCallback(() => {
    setOpenMenu(null)
    sessionStorage.removeItem('citadolph:openMegaMenu')
  }, [])

  const onTriggerKeyDown = (e: React.KeyboardEvent, key: string) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openMenu === key ? setOpenMenu(null) : setOpenMenu(key)
    }
    if (e.key === 'ArrowUp' && openMenu === key) {
      setOpenMenu(null)
    }
  }

  /* ----------------------------- nav ------------------------------- */

  const handleNavClick = useCallback(
    (href: string) => {
      if (onScrollTo && href.startsWith('#') && href !== '#') onScrollTo(href.slice(1))
      setMobileOpen(false)
      setOpenMenu(null)
      sessionStorage.removeItem('citadolph:openMegaMenu')
    },
    [onScrollTo]
  )

  /* ------------------------------ render --------------------------- */
  return (
    <>
      {/* Utility bar — pinned at very top on desktop */}
      <UtilityBar authState={authState} onAuthAction={onAuthAction} />

      {/* Main header — fixed beneath utility bar, white background on scroll */}
      <header
        role="banner"
        className={cn(
          'fixed inset-x-0 z-[var(--z-fixed)] backdrop-blur-sm transition-[background-color,border-color] duration-300',
          'border-b border-[var(--border)] bg-[var(--paper)]/95',
          scrolled && 'shadow-[var(--shadow-sm)]'
        )}
        style={{ top: 40 }}
      >
        <div
          className={cn(
            'mx-auto grid max-w-[1440px] grid-cols-12 items-center gap-[var(--gutter)] px-[var(--gutter)]',
            'h-[88px]' // Fixed height — nav sits perfectly on white band
          )}
        >
          {/* Logo — columns 1–3 (Müller-Brockmann: 3-column logo block) */}
          <div className="col-span-3 flex items-center">
            <Link
              href="/"
              aria-label={`${siteConfig.name} — home`}
              className="rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
              onClick={() => {
                setMobileOpen(false)
                setOpenMenu(null)
                sessionStorage.removeItem('citadolph:openMegaMenu')
              }}
            >
              <Image
                src="/images/logo_full_black.svg"
                alt={`${siteConfig.name} logo`}
                width={160}
                height={40}
                priority
                className="h-10 w-auto"
                style={{ filter: 'var(--logo-filter, none)' }}
              />
            </Link>
          </div>

          {/* Primary navigation — columns 4–9 (6 columns, optically centered) */}
          <nav
            aria-label="Main navigation"
            className="col-span-6 hidden items-center justify-center gap-2 lg:flex"
          >
            {navigation.main.map((item: NavItem) => {
              const megaKey = item.megaMenu
              const hasMega = !!megaKey && megaKey in megaMenus
              const isOpen = openMenu === megaKey

              if (!hasMega) {
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      'relative rounded-[var(--radius-sm)] px-4 py-2 text-sm font-medium transition-colors duration-200',
                      'after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-[var(--accent)] after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full',
                      'text-[var(--ink-muted)] hover:text-[var(--ink)]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2'
                    )}
                    onClick={() => handleNavClick(item.href)}
                  >
                    {item.label}
                  </button>
                )
              }

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseLeave={closeNow} // Close on mouse leave
                >
                  <button
                    ref={(el) => {
                      triggerRefs.current[megaKey] = el
                    }}
                    aria-expanded={openMenu === megaKey}
                    aria-haspopup="dialog"
                    aria-controls={`megamenu-${megaKey}`}
                    onClick={(e) => {
                      e.preventDefault()
                      openMenu === megaKey ? setOpenMenu(null) : setOpenMenu(megaKey)
                    }}
                    onKeyDown={(e) => onTriggerKeyDown(e, megaKey)}
                    className={cn(
                      'relative flex items-center gap-1.5 rounded-[var(--radius-sm)] px-4 py-2 text-sm font-medium transition-colors duration-200',
                      'after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-[var(--accent)] after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full',
                      'text-[var(--ink-muted)] hover:text-[var(--ink)]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2'
                    )}
                    style={{ color: openMenu === megaKey ? 'var(--accent)' : 'var(--ink-muted)' }}
                    onClick={(e) => {
                      e.preventDefault()
                      openMenu === megaKey ? setOpenMenu(null) : setOpenMenu(megaKey)
                    }}
                    onKeyDown={(e) => onTriggerKeyDown(e, megaKey)}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        openMenu === megaKey && 'rotate-180'
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  <MegaMenu
                    data={megaMenus[megaKey as keyof typeof megaMenus]}
                    triggerRef={{ current: triggerRefs.current[megaKey] ?? null }}
                    isOpen={openMenu === megaKey}
                    onClose={setOpenMenu}
                    position="center"
                  />
                </div>
              )
            })}
          </nav>

          {/* Actions — columns 10–12, flush right with proper spacing */}
          <div className="col-span-9 flex items-center justify-end gap-4 lg:col-span-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onClick={() => handleNavClick(navigation.cta.href)}
              className={cn(
                'group hidden items-center gap-2 px-6 py-2.5 lg:inline-flex',
                'shadow-[var(--shadow-accent)] transition-shadow duration-200',
                'hover:shadow-[0_8px_32px_rgba(228,0,43,0.4)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2'
              )}
              style={{
                background: 'var(--accent)',
                color: 'var(--paper)',
                border: '2px solid var(--accent)',
                borderRadius: 'var(--radius-sm)',
                font: '600 13px/1 var(--font-sans)',
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
              }}
            >
              {navigation.cta.label}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </motion.button>

            {/* Mobile trigger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
              aria-label="Open menu"
              className={cn(
                'flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg transition-colors lg:hidden',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]'
              )}
              style={{ background: 'var(--paper-alt)', color: 'var(--ink)' }}
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        authState={authState}
        onAuthAction={onAuthAction}
        onScrollTo={onScrollTo}
      />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Helpers (module scope)                                             */
/* ------------------------------------------------------------------ */

const triggerRefs = { current: {} as Record<string, HTMLButtonElement | null> }