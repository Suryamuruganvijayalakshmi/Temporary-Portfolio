import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../lib/store';
import IdentityPill from './IdentityPill';
import { 
  Command, 
  Menu, 
  X, 
  Compass, 
  FolderGit2, 
  BookOpen, 
  Layers, 
  Mail, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

const navItems = [
  { path: '/about', label: 'About', icon: Compass },
  { path: '/lab', label: 'Lab', icon: Sparkles, badge: '9' },
  { path: '/writing', label: 'Writing', icon: BookOpen, badge: '3' },
  { path: '/studio', label: 'Studio', icon: Layers },
  { path: '/contact', label: 'Contact', icon: Mail }
];

export default function Navbar() {
  const { activeRoute, setActiveRoute, openCommandPalette } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [osShortcut, setOsShortcut] = useState('⌘K');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);
      setOsShortcut(isMac ? '⌘K' : 'Ctrl+K');
    }
  }, []);

  // Close mobile menu on route change or ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (path) => {
    setActiveRoute(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className="sticky top-3 sm:top-4 z-30 w-full px-4 sm:px-8 py-2 pointer-events-none transition-all"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Left: Identity Monogram Pill */}
          <div className="flex items-center">
            <IdentityPill />
          </div>

          {/* Center: Desktop Navigation Bar + Standalone ⌘K Button */}
          <div className="hidden md:flex items-center gap-2">
            {/* White Rounded Navigation Pill */}
            <div className="flex items-center px-2 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              {navItems.map((item) => {
                const isActive = activeRoute === item.path;

                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-sans transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400 select-none ${
                      isActive ? 'text-zinc-950 dark:text-white font-bold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 rounded-full"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Separate Standalone ⌘K Button */}
            <button
              onClick={openCommandPalette}
              className="px-3 py-2 rounded-full bg-white dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-all text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 flex items-center justify-center select-none"
              title="Open Command Palette (⌘K / Ctrl+K)"
              aria-label="Open command palette"
            >
              <span>{osShortcut}</span>
            </button>
          </div>

          {/* Right: Mobile Hamburger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm flex items-center justify-center active:scale-95"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Backdrop & Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md z-40 md:hidden"
              aria-hidden="true"
            />

            {/* Mobile Menu Card */}
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 top-16 sm:top-20 z-50 md:hidden p-4 rounded-3xl bg-zinc-950/95 border border-zinc-800 shadow-2xl backdrop-blur-2xl max-w-sm mx-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col gap-1.5">
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-2 mb-1 border-b border-zinc-800/80 px-1 font-mono text-[11px] text-zinc-400">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    NAVIGATION MENU
                  </span>
                  <span className="text-zinc-500">SURYA V M</span>
                </div>

                {/* Home link */}
                <button
                  onClick={() => handleNavClick('/')}
                  className={`flex items-center justify-between p-3 rounded-2xl font-mono text-xs transition-colors min-h-[44px] ${
                    activeRoute === '/'
                      ? 'bg-white text-zinc-950 font-bold shadow-md'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Compass className="w-4 h-4 opacity-80" />
                    <span>Home // Orbit</span>
                  </div>
                  <span className="text-[10px] opacity-60">/</span>
                </button>

                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeRoute === item.path;

                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavClick(item.path)}
                      className={`flex items-center justify-between p-3 rounded-2xl font-mono text-xs transition-colors min-h-[44px] ${
                        isActive
                          ? 'bg-white text-zinc-950 font-bold shadow-md'
                          : 'text-zinc-300 hover:text-white hover:bg-zinc-900/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 opacity-80" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                          isActive
                            ? 'bg-zinc-200 text-zinc-900'
                            : 'bg-zinc-800 text-zinc-300 border border-zinc-700/60'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}

                {/* Command Palette Launcher Button */}
                <div className="pt-2 mt-1 border-t border-zinc-800/80">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openCommandPalette();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800/80 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-mono transition-colors min-h-[44px]"
                  >
                    <div className="flex items-center gap-2.5">
                      <Command className="w-4 h-4 text-iris-400" />
                      <span>Search &amp; Commands</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                      {osShortcut}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
