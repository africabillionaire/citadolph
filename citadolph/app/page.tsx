'use client';

import { useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { About } from '@/components/sections/About';
import { CTA } from '@/components/sections/CTA';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

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
    </>
  );
}