'use client';

import { useEffect, useState, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { About } from '@/components/sections/About';
import { CTA } from '@/components/sections/CTA';
import { Contact } from '@/components/sections/Contact';
import { GridOverlay } from '@/components/ui/Grid';

export default function Home() {
  const [gridOn, setGridOn] = useState(false);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'g' || e.key === 'G') {
        setGridOn((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('grid-on', gridOn);
  }, [gridOn]);

  return (
    <>
      <Header onScrollTo={scrollToSection} />

      <main id="main-content">
        <Hero />
        <Services />
        <Process />
        <About />
        <CTA />
        <Contact />
      </main>

      <Footer />

      <GridOverlay enabled={gridOn} onToggle={() => setGridOn(!gridOn)} />
    </>
  );
}