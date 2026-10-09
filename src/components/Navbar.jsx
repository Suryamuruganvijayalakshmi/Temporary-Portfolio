import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Works', href: '#works' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detect active section
      const sections = ['home', 'about', 'skills', 'works', 'experience', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-8 ${
          isScrolled ? 'pt-3' : 'pt-5'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <nav
            className={`flex items-center justify-between px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 ${
              isScrolled
                ? 'bg-white/90 backdrop-blur-md border border-iris-300 shadow-md shadow-iris-500/10'
                : 'bg-white/80 backdrop-blur-sm border border-iris-200/80 shadow-xs'
            }`}
          >
            {/* Brand Logo Left */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center space-x-2.5 group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-iris-700 to-indigo-600 flex items-center justify-center text-white font-mono font-bold text-sm tracking-wider shadow-sm group-hover:shadow-iris transition-all">
                S
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-slate-900 tracking-tight text-sm sm:text-base group-hover:text-iris-700 transition-colors">
                  SURYA V M
                </span>
                <span className="text-[10px] text-iris-600 font-mono font-semibold -mt-0.5 hidden sm:inline">
                  BUILDER • FOUNDER
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links Right */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'text-iris-900 font-bold'
                        : 'text-slate-600 hover:text-iris-700 hover:bg-iris-50/70'
                    }`}
                  >
                    {item.label}

                    {/* Iris active underline/pill indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-iris-100/90 border border-iris-300 rounded-full -z-10 shadow-iris-sm"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}

              {/* Founder Venture Quick Action */}
              <a
                href="https://signbridge.click/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-iris-600 to-indigo-600 hover:from-iris-700 hover:to-indigo-700 text-white text-xs font-semibold inline-flex items-center gap-1 shadow-iris-sm transition-all"
              >
                <span>SignBridge</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 bg-white/95 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-10"
          >
            <div className="space-y-4">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-widest px-2 mb-2">
                Navigation
              </div>
              {navItems.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block px-4 py-3 rounded-2xl text-lg font-bold transition-all ${
                      isActive
                        ? 'bg-iris-50 text-iris-700 border border-iris-200'
                        : 'text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3">
              <a
                href="https://signbridge.click/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-2xl bg-iris-600 text-white font-semibold text-center block shadow-iris text-sm"
              >
                Explore SignBridge Platform ↗
              </a>
              <div className="text-center text-xs text-slate-400 font-mono">
                Surya V M • Software Developer & AI/IoT Builder
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
