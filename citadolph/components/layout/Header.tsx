'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Kicker, Text } from '@/components/ui/Typography';
import { navigation, siteConfig, megaMenus, type NavItem, type MegaMenuData } from '@/lib/site-content';
import { UtilityBar } from './UtilityBar';
import { MegaMenu } from './MegaMenu';
import { MobileDrawer } from './MobileDrawer';

interface HeaderProps {
  onScrollTo?: (id: string) => void;
  authState?: 'unauthenticated' | 'authenticated';
  onAuthAction?: (action: 'login' | 'register' | 'signout') => void;
}

export function Header({ onScrollTo, authState = 'unauthenticated', onAuthAction }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const [hoveredMegaMenu, setHoveredMegaMenu] = useState<string | null>(null);
  const megaMenuTriggerRefs = useRef<Record<string, React.RefObject<HTMLButtonElement | null>>>({});
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    if (onScrollTo && href.startsWith('#') && href !== '#') {
      onScrollTo(href.slice(1));
    }
    setMobileDrawerOpen(false);
    setOpenMegaMenu(null);
  }, [onScrollTo]);

  const handleMegaMenuTrigger = (menuKey: string | null) => {
    setOpenMegaMenu(menuKey);
  };

  const handleMegaMenuHover = (menuKey: string | null) => {
    setHoveredMegaMenu(menuKey);
    if (menuKey) setOpenMegaMenu(menuKey);
  };

  const handleMegaMenuLeave = () => {
    setHoveredMegaMenu(null);
    setTimeout(() => {
      if (!hoveredMegaMenu) setOpenMegaMenu(null);
    }, 100);
  };

  const currentMegaMenuKey = openMegaMenu || hoveredMegaMenu;

  return (
    <>
      <UtilityBar authState={authState} onAuthAction={onAuthAction} />

      <header
        ref={headerRef}
        className={cn(
          'fixed top-[40px] left-0 right-0 z-[var(--z-fixed)] transition-all duration-300',
          'lg:top-0',
          scrolled
            ? 'bg-[var(--paper)]/95 backdrop-blur-sm border-b border-[var(--border)]'
            : 'bg-transparent'
        )}
        style={{
          background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          transform: scrolled ? 'translateY(0)' : 'translateY(-40px)',
        }}
        role="banner"
        onMouseEnter={() => handleMegaMenuHover(currentMegaMenuKey)}
        onMouseLeave={handleMegaMenuLeave}
      >
        <nav
          className="grid gap-[var(--gutter)] items-center"
          style={{
            gridTemplateColumns: 'subgrid',
            height: '88px',
          }}
          aria-label="Main navigation"
        >
          <div className="flex items-center gap-3" style={{ gridColumn: '1 / 4' }}>
            <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.name} Home`} onClick={() => { setMobileDrawerOpen(false); setOpenMegaMenu(null); }}>
              <Image
                src="/images/logo_full_black.svg"
                alt={`${siteConfig.name} logo`}
                width={160}
                height={40}
                priority
                style={{ filter: 'var(--logo-filter, none)' }}
              />
            </Link>
          </div>

          <div className="hidden lg:flex items-center justify-center gap-1" style={{ gridColumn: '4 / 11' }}>
            {navigation.main.map((item: NavItem, index: number) => {
              const hasMegaMenu = item.megaMenu && megaMenus[item.megaMenu as keyof typeof megaMenus];
              const isLast = index === navigation.main.length - 1;
              const isFirst = index === 0;
              const position = isFirst ? 'left' : isLast ? 'right' : 'center';

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasMegaMenu && handleMegaMenuHover(item.megaMenu!)}
                  onMouseLeave={handleMegaMenuLeave}
                >
                  <button
                    ref={(el) => { if (hasMegaMenu) megaMenuTriggerRefs.current[item.megaMenu!] = { current: el }; }}
                    className={cn(
                      'flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-[var(--radius-sm)]',
                      'transition-all duration-150 ease-out',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2',
                      hasMegaMenu
                        ? 'hover:bg-[var(--paper-alt)]'
                        : 'hover:text-[var(--accent)]'
                    )}
                    style={{
                      color: openMegaMenu === item.megaMenu || hoveredMegaMenu === item.megaMenu
                        ? 'var(--accent)'
                        : 'var(--ink-muted)',
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (hasMegaMenu) {
                        handleMegaMenuTrigger(item.megaMenu!);
                      } else {
                        handleNavClick(item.href);
                      }
                    }}
                    aria-expanded={openMegaMenu === item.megaMenu || hoveredMegaMenu === item.megaMenu}
                    aria-haspopup={hasMegaMenu ? 'dialog' : undefined}
                    aria-controls={hasMegaMenu ? `megamenu-${item.megaMenu}` : undefined}
                  >
                    {item.label}
                    {hasMegaMenu && (
                      <ChevronDown
                        className={cn('w-4 h-4 transition-transform', (openMegaMenu === item.megaMenu || hoveredMegaMenu === item.megaMenu) && 'rotate-180')}
                        aria-hidden="true"
                      />
                    )}
                  </button>

                  {hasMegaMenu && (
                    <MegaMenu
                      data={megaMenus[item.megaMenu as keyof typeof megaMenus] as MegaMenuData}
                      triggerRef={megaMenuTriggerRefs.current[item.megaMenu!] || { current: null }}
                      isOpen={openMegaMenu === item.megaMenu || hoveredMegaMenu === item.megaMenu}
                      onClose={() => { setOpenMegaMenu(null); setHoveredMegaMenu(null); }}
                      position={position}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end gap-3" style={{ gridColumn: '11 / 13' }}>
            <Button
              variant="primary"
              size="sm"
              className="hidden lg:inline-flex"
              onClick={() => handleNavClick(navigation.cta.href)}
            >
              {navigation.cta.label}
            </Button>
            <button
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ background: 'var(--paper-alt)' }}
              onClick={() => setMobileDrawerOpen(true)}
              aria-expanded={mobileDrawerOpen}
              aria-controls="mobile-drawer"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" style={{ color: 'var(--ink)' }} />
            </button>
          </div>
        </nav>
      </header>

      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        authState={authState}
        onAuthAction={onAuthAction}
        onScrollTo={onScrollTo}
      />
    </>
  );
}