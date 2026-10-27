import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles, Send, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { isSoundEnabled, toggleSound, playChime, playSuccessSound } from '../lib/soundFx';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'SignBridge', href: '#signbridge' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Honors', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function StoryNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundOn(next);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sectionIds = ['hero', 'about', 'journey', 'signbridge', 'projects', 'skills', 'achievements', 'vision', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMonogramClick = (e) => {
    handleScrollTo(e, '#hero');
    playSuccessSound();
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.08, x: 0.15 },
        colors: ['#2563eb', '#06b6d4', '#ea580c', '#fbbf24', '#8b5cf6'],
      });
    } catch (err) {}
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-8 ${
          isScrolled ? 'pt-2.5 sm:pt-3' : 'pt-4 sm:pt-5'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <nav
            className={`flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 border ${
              isScrolled
                ? 'bg-white/92 backdrop-blur-xl border-stone-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
                : 'bg-white/80 backdrop-blur-md border-stone-200/60 shadow-xs'
            }`}
          >
            {/* Brand Monogram Left with Easter Egg Particle Burst */}
            <a
              href="#hero"
              onClick={handleMonogramClick}
              className="flex items-center gap-2.5 group cursor-pointer"
              title="Click to jump to top + launch sparks"
            >
              <div className="w-8 h-8 rounded-lg bg-zinc-900 group-hover:bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-xs tracking-wider transition-colors shadow-xs group-hover:scale-110 duration-200">
                S
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-stone-900 tracking-tight text-xs sm:text-sm group-hover:text-blue-600 transition-colors">
                  SURYA V M
                </span>
                <span className="text-[10px] text-stone-500 font-mono tracking-wider hidden sm:inline">
                  AI &amp; ML · FOUNDER
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'text-stone-950 font-bold'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeStoryNav"
                        className="absolute inset-0 bg-stone-100 rounded-full -z-10 border border-stone-200/80"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right Action & External Links */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={handleToggleSound}
                className="p-2 rounded-full bg-stone-100 hover:bg-stone-200/80 text-stone-700 transition-all border border-stone-200/60 cursor-pointer shadow-2xs hover:scale-105"
                title={soundOn ? "Interactive synth audio: ON" : "Interactive synth audio: MUTED"}
                aria-label="Toggle interactive audio feedback"
              >
                {soundOn ? (
                  <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                )}
              </button>

              <a
                href="https://signbridge.click/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200/80 text-stone-800 text-xs font-mono font-semibold inline-flex items-center gap-1.5 transition-all border border-stone-200/60 shadow-2xs hover:shadow-sm"
              >
                <img src="/sign-logo.png" alt="" className="w-4 h-4 object-contain rounded bg-black/80 p-0.5" />
                <span>SignBridge</span>
                <ArrowUpRight className="w-3 h-3 text-stone-500" />
              </a>

              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-all hover:shadow-blue-500/20"
              >
                <span>Let's Talk</span>
                <Send className="w-3 h-3" />
              </a>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Darkened backdrop tap-to-close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-stone-950/40 backdrop-blur-xs z-30 lg:hidden"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 left-4 right-4 z-40 lg:hidden bg-white/95 backdrop-blur-2xl rounded-2xl border border-stone-200/90 shadow-2xl p-4 space-y-1 font-sans"
            >
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors active:scale-98 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}

              <div className="pt-3 mt-2 border-t border-stone-100 flex items-center gap-2">
                <button
                  onClick={handleToggleSound}
                  className="p-3 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center border border-stone-200/60 transition-colors active:scale-95 shrink-0"
                  aria-label="Toggle interactive sound effects"
                  title={soundOn ? 'Sound is ON' : 'Sound is MUTED'}
                >
                  {soundOn ? (
                    <Volume2 className="w-4 h-4 text-blue-600" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-stone-400" />
                  )}
                </button>

                <a
                  href="https://signbridge.click/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center rounded-xl bg-stone-100 text-stone-800 text-xs font-mono font-bold hover:bg-stone-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <img src="/sign-logo.png" alt="" className="w-3.5 h-3.5 object-contain rounded bg-black/80 p-0.5" />
                  <span>SignBridge ↗</span>
                </a>

                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, '#contact')}
                  className="flex-1 py-3 text-center rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Contact
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
