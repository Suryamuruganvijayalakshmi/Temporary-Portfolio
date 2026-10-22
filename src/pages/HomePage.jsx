import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useStore } from '../lib/store';
import { featuredProjects, profileConfig } from '../data/portfolioData';
import { ProjectPhoto, ProjectLogoCard } from '../components/ProjectArtworks';
import ProjectModal from '../components/ProjectModal';
import { ChevronRight, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

export default function HomePage() {
  const { openProjectModal, activeProjectModal, closeProjectModal, setActiveRoute } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const isTransitioningRef = useRef(false);

  const currentProject = featuredProjects[currentIndex] || featuredProjects[0];

  // GSAP Scroll & Wheel Transition Handler
  const goToProject = (nextIndex) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const normalizedIndex = (nextIndex + featuredProjects.length) % featuredProjects.length;

    // Timeline transition
    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioningRef.current = false;
      }
    });

    tl.to('.featured-photo-frame', {
      scale: 0.94,
      opacity: 0.7,
      duration: 0.18,
      ease: 'power2.in'
    })
    .to('.project-center-meta', {
      opacity: 0,
      y: 8,
      duration: 0.15,
      ease: 'power2.in'
    }, '<')
    .to('.project-logo-card', {
      scale: 0.92,
      opacity: 0.7,
      duration: 0.18,
      ease: 'power2.in'
    }, '<')
    .add(() => {
      setCurrentIndex(normalizedIndex);
    })
    .to('.featured-photo-frame', {
      scale: 1,
      opacity: 1,
      duration: 0.28,
      ease: 'back.out(1.4)'
    })
    .to('.project-center-meta', {
      opacity: 1,
      y: 0,
      duration: 0.25,
      ease: 'power2.out'
    }, '<0.05')
    .to('.project-logo-card', {
      scale: 1,
      opacity: 1,
      duration: 0.28,
      ease: 'back.out(1.4)'
    }, '<');
  };

  // Wheel listener for natural desk scrolling
  useEffect(() => {
    let lastWheelTime = 0;

    const handleWheel = (e) => {
      const now = Date.now();
      if (now - lastWheelTime < 600) return;

      if (Math.abs(e.deltaY) > 35) {
        lastWheelTime = now;
        if (e.deltaY > 0) {
          goToProject(currentIndex + 1);
        } else {
          goToProject(currentIndex - 1);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentIndex]);

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeProjectModal) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToProject(currentIndex + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToProject(currentIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, activeProjectModal]);

  // Touch swipe gestures for mobile phones and tablets
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e) => {
      if (e.changedTouches.length === 1) {
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
          if (deltaX < 0) {
            goToProject(currentIndex + 1);
          } else {
            goToProject(currentIndex - 1);
          }
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [currentIndex]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-4 sm:px-8 pt-16 sm:pt-20 pb-10 select-none overflow-hidden"
    >
      {/* Background Halftone Paper Noise Grid (Matching screenshots) */}
      <div className="absolute inset-0 halftone-grid opacity-35 pointer-events-none" />
      <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />

      {/* ============================================================
          SURROUNDING TILTED OBJECTS (Matching Screenshot 1 & 2!)
          ============================================================ */}

      {/* Top-Left: Tilted B&W Hardware Photograph with Corner Clip */}
      <motion.div
        animate={{ y: [0, -4, 0], rotate: [-14, -12, -14] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => goToProject(3)} // Jump to Sentinel
        className="absolute -top-6 -left-12 sm:top-2 sm:left-4 lg:left-8 w-44 sm:w-56 lg:w-64 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-zinc-300/80 dark:border-zinc-800 bg-zinc-950 cursor-pointer hidden md:block z-0 group hover:scale-105 transition-transform"
        title="View SENTINEL Orbital Prototype"
      >
        <div className="relative w-full h-full p-2">
          {/* Metallic pin clip on corner */}
          <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-zinc-300 border border-zinc-400 shadow-md z-10" />
          <div className="w-full h-full rounded-xl overflow-hidden opacity-85 group-hover:opacity-100 transition-opacity">
            <ProjectPhoto projectId="sentinel" />
          </div>
        </div>
      </motion.div>

      {/* Bottom-Left: Tilted Vibrant Landscape / App Card */}
      <motion.div
        animate={{ y: [0, 5, 0], rotate: [12, 14, 12] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => goToProject(2)} // Jump to FarmCargo
        className="absolute -bottom-8 -left-10 sm:bottom-4 sm:left-4 lg:left-10 w-44 sm:w-56 lg:w-64 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-zinc-300/80 dark:border-zinc-800 bg-emerald-950 cursor-pointer hidden md:block z-0 group hover:scale-105 transition-transform"
        title="View FarmCargo Logistics"
      >
        <div className="w-full h-full p-2">
          <div className="w-full h-full rounded-xl overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity">
            <ProjectPhoto projectId="farmcargo" />
          </div>
        </div>
      </motion.div>

      {/* Top-Right: Tilted White Paper Card with Signature (Matching Screenshot 1 & 2) */}
      <motion.div
        animate={{ y: [0, -3, 0], rotate: [16, 18, 16] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-2 right-2 sm:top-6 sm:right-6 lg:right-12 w-28 sm:w-36 aspect-square rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-300/90 dark:border-zinc-800 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.14)] p-3 flex flex-col justify-between items-center text-center hidden md:flex select-none z-0"
      >
        <div className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          SIGNATURE
        </div>
        <div className="font-serif italic text-base sm:text-lg font-bold text-zinc-800 dark:text-zinc-200 tracking-wide">
          Surya V M
        </div>
        <div className="text-[8px] font-mono text-zinc-400">
          TAMIL NADU, IN
        </div>
      </motion.div>

      {/* Bottom-Right: Tilted Square Card with Colorful Emblem (Matching Screenshot 1 & 2) */}
      <motion.div
        animate={{ y: [0, 4, 0], rotate: [22, 24, 22] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => goToProject(4)} // Jump to Merry Berry
        className="absolute -bottom-6 right-8 sm:bottom-4 sm:right-8 lg:right-16 w-28 sm:w-36 aspect-square rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-300/90 dark:border-zinc-800 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.14)] p-3 flex items-center justify-center cursor-pointer hidden md:flex z-0 group hover:scale-105 transition-transform"
        title="View Merry Berry Concept"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 via-purple-500 to-amber-400 p-1 shadow-md flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-white dark:bg-zinc-950 flex items-center justify-center text-xl">
            🍨
          </div>
        </div>
      </motion.div>

      {/* ============================================================
          CENTRAL MAIN PROJECT STAGE (Matching Screenshot 1 & 2!)
          ============================================================ */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 my-auto">
        
        {/* Left: Large Featured Project Photograph */}
        <div className="w-full lg:w-5/12 flex justify-center">
          <motion.div 
            className="featured-photo-frame w-full max-w-md sm:max-w-lg aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-300/90 dark:border-zinc-800 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.22)] bg-black transform -rotate-1 hover:rotate-0 transition-transform duration-300 cursor-pointer"
            onClick={() => openProjectModal(currentProject)}
            title="Click to view complete case study"
          >
            <ProjectPhoto projectId={currentProject.id} />
          </motion.div>
        </div>

        {/* Center: Title, Dotted Constellation, Index & Meta */}
        <div className="project-center-meta w-full lg:w-4/12 flex flex-col items-center text-center space-y-3">
          {/* Subtle Dotted Constellation Pattern (Matching screenshots above title) */}
          <div className="h-10 w-28 relative flex items-center justify-center pointer-events-none opacity-50 dark:opacity-40">
            <svg width="100" height="35" viewBox="0 0 100 35" fill="currentColor" className="text-zinc-600 dark:text-zinc-300">
              <circle cx="50" cy="6" r="1.5" />
              <circle cx="35" cy="18" r="1.2" />
              <circle cx="65" cy="18" r="1.2" />
              <circle cx="20" cy="28" r="1.5" />
              <circle cx="50" cy="26" r="1.2" />
              <circle cx="80" cy="28" r="1.5" />
              <circle cx="42" cy="12" r="1" />
              <circle cx="58" cy="12" r="1" />
            </svg>
          </div>

          {/* Project Index Counter (Nº01 / 06) */}
          <div className="font-mono text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-semibold tracking-wider">
            Nº {currentProject.index} / {currentProject.totalCount}
          </div>

          {/* Oversized Bold Grotesk Title */}
          <h1 className="editorial-title text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-950 dark:text-white tracking-tight">
            {currentProject.title}
          </h1>

          {/* Tag Badges (W/FOUNDER, 2026) */}
          <div className="flex items-center justify-center gap-2 pt-1 font-mono text-[11px]">
            <span className="px-2.5 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300/60 dark:border-zinc-700/60 font-semibold uppercase">
              {currentProject.tag || 'SYSTEM'}
            </span>
            <span className="px-2.5 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300/60 dark:border-zinc-700/60 font-semibold">
              {currentProject.year}
            </span>
          </div>

          {/* View Project Button */}
          <div className="pt-2">
            <button
              onClick={() => openProjectModal(currentProject)}
              className="px-5 py-2 rounded-full bg-zinc-200/80 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-sans text-xs font-semibold shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400 select-none flex items-center gap-1.5"
            >
              <span>View project</span>
            </button>
          </div>
        </div>

        {/* Right: Square Project Logo / Visual Card (Matching Screenshot 1 & 2!) */}
        <div className="w-full lg:w-3/12 flex justify-center">
          <motion.div 
            className="project-logo-card transform rotate-1 hover:rotate-0 transition-transform duration-300 cursor-pointer"
            onClick={() => openProjectModal(currentProject)}
            title="Click to view complete case study"
          >
            <ProjectLogoCard projectId={currentProject.id} />
          </motion.div>
        </div>
      </div>

      {/* ============================================================
          BOTTOM PROJECT NAVIGATION STRIP & CONTROLS
          ============================================================ */}
      <div className="relative z-10 w-full max-w-xl mx-auto mt-6 pt-2 flex flex-col items-center gap-3">
        {/* Project Selector Pills */}
        <div className="flex items-center gap-2 p-1 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-zinc-300/80 dark:border-zinc-800 shadow-sm font-mono text-xs">
          <button
            onClick={() => goToProject(currentIndex - 1)}
            className="px-2.5 py-1 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            aria-label="Previous project"
          >
            ←
          </button>

          <div className="flex items-center gap-1">
            {featuredProjects.map((p, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={p.id}
                  onClick={() => goToProject(idx)}
                  className={`px-2.5 py-1 rounded-full transition-all text-xs font-mono ${
                    isSelected
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                  }`}
                  aria-label={`Jump to project ${p.title}`}
                >
                  0{idx + 1}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => goToProject(currentIndex + 1)}
            className="px-2.5 py-1 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            aria-label="Next project"
          >
            →
          </button>
        </div>

        {/* Scroll Helper Hint */}
        <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 tracking-wider">
          SCROLL OR USE ARROW KEYS TO EXPLORE // 06 FEATURED WORKS
        </div>
      </div>

      {/* Case Study Modal Window */}
      {activeProjectModal && (
        <ProjectModal
          project={activeProjectModal}
          onClose={closeProjectModal}
        />
      )}
    </div>
  );
}
