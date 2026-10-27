import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { useStore } from '../../lib/store';
import StoryNavbar from '../StoryNavbar';
import CustomCursor from '../CustomCursor';
import { ScrollProgress } from '../animations/ScrollProgress';
import CommandPalette from '../command-palette/CommandPalette';

export default function RootLayout({ children }) {
  const { setActiveRoute } = useStore();

  // 1. Theme Configuration
  useEffect(() => {
    // Allows clean warm off-white canvas with dark accents
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  // 2. Browser Back/Forward PopState Synchronization
  useEffect(() => {
    const handlePopState = () => {
      const route = window.location.pathname === '' ? '/' : window.location.pathname.replace(/\/$/, '') || '/';
      useStore.setState({ activeRoute: route });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 3. Lenis Smooth Scroll with Reduced-Motion Awareness
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let lenisInstance = null;
    let animId = null;

    try {
      lenisInstance = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      const raf = (time) => {
        lenisInstance.raf(time);
        animId = requestAnimationFrame(raf);
      };

      animId = requestAnimationFrame(raf);
    } catch (e) {
      console.warn('Lenis smooth scrolling fallback initialized.');
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (lenisInstance) lenisInstance.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-canvas text-primary relative flex flex-col font-sans transition-colors duration-300">
      {/* Subtle tactile film grain overlay */}
      <div className="film-grain" aria-hidden="true" />

      {/* Top Laser Scroll Progress Bar */}
      <ScrollProgress />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Sticky Compact Story Navigation */}
      <StoryNavbar />

      {/* Main Viewport Content */}
      <main id="main-content" className="flex-1 w-full relative z-10">
        {children}
      </main>

      {/* Global Command Palette Dialog */}
      <CommandPalette />
    </div>
  );
}
