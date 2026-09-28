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
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = 'citadolph:openMegaMenu'

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
    return sessionStorage.getItem(STORAGE_KEY)
  })

  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  /* --------------------------- megamenu ---------------------------- */

  const closeMega = useCallback(() => {
    setOpenMenu(null)
    sessionStorage.removeItem(STORAGE_KEY)
  }, [])

  const toggleMega = useCallback((key: string) => {
    setOpenMenu((prev) => {
      const next = prev === key ? null : key
      if (next) sessionStorage.setItem(STORAGE_KEY, key)
      else sessionStorage.removeItem(STORAGE_KEY)
      return next
    })
  }, [])

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
        closeMega()
      } else {
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openMenu, closeMega])

  const onTriggerKeyDown = (e: React.KeyboardEvent, key: string) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault()
      toggleMega(key)
    } else if (e.key === 'ArrowUp' && openMenu === key) {
      e.preventDefault()
      closeMega()
    }
  }

  /* ----------------------------- nav ------------------------------- */

  const handleNavClick = useCallback(
    (href: string) => {
      if (onScrollTo && href.startsWith('#') && href !== '#') onScrollTo(href.slice(1))
      setMobileOpen(false)
      closeMega()
    },
    [onScrollTo, closeMega]
  )

  /* ------------------------------ render --------------------------- */
  return (
    /* Sticky wrapper: no fixed-position magic numbers, no content overlap.
       Utility bar scrolls away naturally; header pins to the top. */
    <div className="sticky top-0 z-[var(--z-fixed)]">
      <UtilityBar authState={authState} onAuthAction={onAuthAction} />

      <header
        role="banner"
        className={cn(
          'relative border-b border-[var(--border)] bg-[var(--paper)]/95 backdrop-blur-sm',
          'transition-[box-shadow] duration-300',
          scrolled && 'shadow-[var(--shadow-sm)]'
        )}
      >
        {/* Müller-Brockmann 12-column grid, 88px band */}
        <div className="mx-auto grid h-[88px] max-w-[1440px] grid-cols-12 items-center gap-[var(--gutter)] px-[var(--gutter)]">
          {/* Logo — columns 1–3 */}
          <div className="col-span-3 flex items-center">
            <Link
              href="/"
              aria-label={`${siteConfig.name} — home`}
              className="rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
              onClick={() => {
                setMobileOpen(false)
                closeMega()
              }}
            >
              <Image
                src="/images/logo_full_white.svg"
                alt={`${siteConfig.name} logo`}
                width={160}
                height={40}
                priority
                className="h-10 w-auto"
                style={{ filter: 'var(--logo-filter, none)' }}
              />
            </Link>
          </div>

          {/* Primary navigation — columns 4–9 */}
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
                    type="button"
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      'group relative rounded-[var(--radius-sm)] px-4 py-2 text-sm font-medium text-[var(--ink)]',
                      'opacity-70 hover:opacity-100 transition-opacity duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2'
                    )}
                  >
                    <span className="relative inline-block transition-transform duration-200 group-hover:scale-105">
                      {item.label}
                      {/* Underline constrained strictly to the text width */}
                      <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
                    </span>
                  </button>
                )
              }

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseLeave={closeMega}
                >
                  <button
                    ref={(el) => {
                      triggerRefs.current[megaKey] = el
                    }}
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="dialog"
                    aria-controls={`megamenu-${megaKey}`}
                    onClick={() => toggleMega(megaKey)}
                    onKeyDown={(e) => onTriggerKeyDown(e, megaKey)}
                    className={cn(
                      'group relative flex items-center gap-1.5 rounded-[var(--radius-sm)] px-4 py-2 text-sm font-medium text-[var(--ink)]',
                      'transition-opacity duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2',
                      isOpen ? 'opacity-100 text-[var(--accent)]' : 'opacity-70 hover:opacity-100'
                    )}
                  >
                    <span className="relative inline-block transition-transform duration-200 group-hover:scale-105">
                      {item.label}
                      {/* Underline constrained strictly to the text width */}
                      <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
                    </span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        isOpen && 'rotate-180'
                      )}
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
              )
            })}
          </nav>

          {/* Actions — columns 10–12, flush right */}
          <div className="col-span-9 flex items-center justify-end gap-4 lg:col-span-3">
            <motion.button
              type="button"
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
              type="button"
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
    </div>
  )
}