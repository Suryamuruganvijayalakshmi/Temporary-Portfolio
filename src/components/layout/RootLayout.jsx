import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { useStore } from '../../lib/store';
import TopHUD from './TopHUD';
import Navbar from './Navbar';
import CommandPalette from '../command-palette/CommandPalette';
import FloatingAssistant from './FloatingAssistant';
import VisitorToast from './VisitorToast';

export default function RootLayout({ children }) {
  const { theme, resolvedTheme, setTheme, setActiveRoute } = useStore();

  // 1. Theme Synchronization & System Listener
  useEffect(() => {
    const applyTheme = () => {
      const isDark = resolvedTheme === 'dark';
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    };

    applyTheme();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleThemeChange = (e) => {
        setTheme('system');
      };
      mediaQuery.addEventListener('change', handleThemeChange);
      return () => mediaQuery.removeEventListener('change', handleThemeChange);
    }
  }, [theme, resolvedTheme, setTheme]);

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

      {/* Top Persistent Monospace Telemetry HUD */}
      <TopHUD />

      {/* Center Navigation & Monogram Pill */}
      <Navbar />

      {/* Main Viewport Content */}
      <main id="main-content" className="flex-1 w-full relative z-10">
        {children}
      </main>

      {/* Global Command Palette Dialog */}
      <CommandPalette />

      {/* Bottom-Left Realtime Visitor Toast */}
      <VisitorToast />

      {/* Floating Bottom-Right Assistant */}
      <FloatingAssistant />
    </div>
  );
}
