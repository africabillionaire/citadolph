'use client';

import { useEffect } from 'react';

/**
 * Optical Alignment for Display Type
 * Shifts element so INK (not box) lands on the column line.
 * Measures actualBoundingBoxLeft using canvas with the real loaded font.
 * Runs after fonts load and on resize.
 */
export function OpticalAlign({ 
  selector = '.masthead, .step-number, .display-numeral, .section-headline',
  offset = 0 
}: { selector?: string; offset?: number }) {
  useEffect(() => {
    const alignOptically = () => {
      const cvs = document.createElement('canvas');
      const ctx = cvs.getContext('2d');
      if (!ctx) return;

      document.querySelectorAll<HTMLElement>(selector).forEach(el => {
        // Reset first
        el.style.marginLeft = '0px';
        
        const cs = getComputedStyle(el);
        const text = (el.textContent || '').trim();
        if (!text) return;
        
        const ch = text[0];
        // Respect text-transform
        const transformed = cs.textTransform === 'uppercase' ? ch.toUpperCase() : ch;
        
        // Build exact font string
        ctx.font = `${cs.fontStyle} ${cs.fontVariant} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        
        const metrics = ctx.measureText(transformed);
        const abl = metrics.actualBoundingBoxLeft; // positive = ink overhangs left of box
        
        if (isFinite(abl) && abl > 0) {
          // Shift right by side-bearing + optional offset
          el.style.marginLeft = `${(abl + offset).toFixed(2)}px`;
        }
      });
    };

    // Wait for fonts, then align
    const cleanup = () => window.removeEventListener('resize', alignOptically);
    document.fonts.ready.then(alignOptically);
    window.addEventListener('resize', alignOptically);
    
    return cleanup;
  }, [selector, offset]);

  return null;
}

/**
 * Hook for inline optical alignment on specific elements
 */
export function useOpticalAlign(ref: React.RefObject<HTMLElement>, offset = 0) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const cvs = document.createElement('canvas');
    const ctx = cvs.getContext('2d');
    if (!ctx) return;
    
    const align = () => {
      el.style.marginLeft = '0px';
      const cs = getComputedStyle(el);
      const text = (el.textContent || '').trim();
      if (!text) return;
      
      const ch = cs.textTransform === 'uppercase' ? text[0].toUpperCase() : text[0];
      ctx.font = `${cs.fontStyle} ${cs.fontVariant} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      ctx.textAlign = 'left';
      const abl = ctx.measureText(ch).actualBoundingBoxLeft;
      
      if (isFinite(abl) && abl > 0) {
        el.style.marginLeft = `${(abl + offset).toFixed(2)}px`;
      }
    };
    
    document.fonts.ready.then(align);
    window.addEventListener('resize', align);
    return () => window.removeEventListener('resize', align);
  }, [offset, ref]);
}