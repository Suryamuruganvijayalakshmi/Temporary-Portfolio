import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../lib/store';
import { featuredProjects, profileConfig } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import './Hero28.css';
import { ArrowRight, Compass, Sparkles, Sun } from 'lucide-react';

export default function Hero28() {
  const { setActiveRoute, openProjectModal, activeProjectModal, closeProjectModal } = useStore();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const activeProject = featuredProjects[activeProjectIndex] || featuredProjects[0];

  // Subtle interactive parallax for the sunbeam and leaf shadows
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="cinematic-hero-container relative min-h-[calc(100vh-80px)] w-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 select-none overflow-hidden"
    >
      {/* ============================================================
          CINEMATIC LIGHTING STAGE: SURYA V M WITH GOLDEN SUNLIGHT ACROSS EYES
          Matches user reference screenshot: warm angled window light beam,
          window crossbar shadows, botanical shadows, and eyes hit by the light.
          ============================================================ */}
      <div className="absolute inset-0 pointer-events-none flex items-start md:items-center justify-center overflow-hidden z-0">
        
        {/* 1. Base Layer: The remaining image slightly visible in dark shadows */}
        <div className="absolute inset-0 flex items-start md:items-center justify-center">
          <motion.div
            animate={{
              x: mousePos.x * -8,
              y: mousePos.y * -6
            }}
            transition={{ type: 'spring', damping: 40, stiffness: 180 }}
            className="relative w-full max-w-4xl h-[34vh] xs:h-[38vh] sm:h-[60vh] md:h-[85vh] flex items-center justify-center mt-1 sm:-mt-4 md:mt-0"
          >
            <img
              src="/surya.jpeg"
              alt="Surya V M"
              className="w-full h-full object-contain filter contrast-125 brightness-50 grayscale-40 opacity-25"
            />
          </motion.div>
        </div>

        {/* 2. The Angled Golden Sunbeam Light Beam (Matching Screenshot Angle) */}
        <motion.div
          animate={{
            x: mousePos.x * 12,
            y: mousePos.y * 8,
            rotate: 35 + mousePos.x * 2
          }}
          transition={{ type: 'spring', damping: 35, stiffness: 160 }}
          className="absolute w-[340px] h-[260px] sm:w-[620px] sm:h-[420px] md:w-[820px] md:h-[520px] rounded-3xl opacity-80"
          style={{
            background: 'linear-gradient(135deg, rgba(253, 230, 138, 0.95) 0%, rgba(245, 158, 11, 0.85) 45%, rgba(217, 119, 6, 0.4) 80%, transparent 100%)',
            filter: 'blur(28px)',
            mixBlendMode: 'screen'
          }}
        />

        {/* 3. Illuminated Eyes Layer: Hit directly by the golden sunlight */}
        <div className="absolute inset-0 flex items-start md:items-center justify-center sunlit-face-mask">
          <motion.div
            animate={{
              x: mousePos.x * -8,
              y: mousePos.y * -6
            }}
            transition={{ type: 'spring', damping: 40, stiffness: 180 }}
            className="relative w-full max-w-4xl h-[34vh] xs:h-[38vh] sm:h-[60vh] md:h-[85vh] flex items-center justify-center mt-1 sm:-mt-4 md:mt-0"
          >
            <img
              src="/surya.jpeg"
              alt="Surya V M Eyes in the Light"
              className="w-full h-full object-contain filter contrast-115 brightness-125 saturate-125 sepia-25"
            />
          </motion.div>
        </div>

        {/* Mobile Gradient Scrim: seamlessly fades portrait into dark canvas below */}
        <div className="md:hidden absolute inset-x-0 top-[26vh] xs:top-[29vh] h-[16vh] bg-gradient-to-b from-transparent via-[#080706]/90 to-[#080706] pointer-events-none z-[1]" />

        {/* 4. Botanical Foliage Silhouette Shadows (Natural Leaves entering from upper right) */}
        <motion.div
          animate={{
            x: mousePos.x * 14,
            y: mousePos.y * 10
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 140 }}
          className="absolute top-0 right-0 w-[240px] h-[240px] sm:w-[440px] sm:h-[440px] md:w-[580px] md:h-[580px] pointer-events-none opacity-85 select-none"
        >
          <svg viewBox="0 0 500 500" fill="currentColor" className="w-full h-full text-stone-950 blur-[7px]">
            {/* Main stem branch coming from top-right */}
            <path d="M500,20 Q340,120 180,310" stroke="currentColor" strokeWidth="12" fill="none" opacity="0.9" />
            
            {/* Delicate leaves cast onto the sunlit wall & face */}
            <path d="M430,70 Q370,40 340,90 Q370,140 430,70 Z" />
            <path d="M380,110 Q320,80 290,130 Q320,180 380,110 Z" />
            <path d="M340,160 Q280,130 250,180 Q280,230 340,160 Z" />
            <path d="M300,210 Q240,180 210,230 Q240,280 300,210 Z" />
            <path d="M260,260 Q200,230 170,280 Q200,330 260,260 Z" />
            
            {/* Secondary twig branch */}
            <path d="M380,110 Q420,170 450,230" stroke="currentColor" strokeWidth="8" fill="none" opacity="0.8" />
            <path d="M400,140 Q450,120 470,160 Q440,200 400,140 Z" />
            <path d="M420,190 Q470,170 490,210 Q460,250 420,190 Z" />
          </svg>
        </motion.div>

        {/* Ambient Dark Room Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-stone-950/40 to-stone-950/90 pointer-events-none" />
      </div>

      {/* ============================================================
          DESKTOP HEADER (Top-Left, Hidden on Mobile)
          ============================================================ */}
      <div className="hidden md:block relative z-10 max-w-lg space-y-2 pt-2">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-[1.08] font-sans">
          Software for the light you already have.
        </h1>
        <p className="text-stone-400/90 text-sm sm:text-base font-sans pt-1">
          Engineering resilient AIoT hardware &amp; practical machine intelligence.
        </p>
      </div>

      {/* ============================================================
          MOBILE SECTION: CLEAN, BALANCED, HIGH-CONTRAST LAYOUT
          Sunlit portrait clear in upper zone; content sits cleanly below!
          ============================================================ */}
      <div className="md:hidden relative z-10 flex flex-col pt-[31vh] xs:pt-[34vh] pb-4 space-y-3.5 w-full">
        {/* Mobile Headline & Editorial Subtitle */}
        <div className="space-y-1.5">
          <h1 className="text-2xl xs:text-3xl font-semibold text-white tracking-tight leading-[1.14] font-sans">
            Software for the light you already have.
          </h1>
          <p className="text-stone-300 text-xs xs:text-sm font-sans leading-relaxed">
            Engineering resilient AIoT hardware, practical machine intelligence, and scalable platforms tailored for your venture.
          </p>
        </div>

        {/* Mobile Project Selector Tabs + Interactive Preview Card */}
        <div className="space-y-2 pt-1">
          {/* Scrollable Project Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
            {featuredProjects.map((project, idx) => {
              const isSelected = idx === activeProjectIndex;
              return (
                <button
                  key={project.id}
                  onClick={() => setActiveProjectIndex(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all select-none ${
                    isSelected
                      ? 'bg-white text-stone-950 font-bold shadow-md'
                      : 'bg-stone-900/90 text-stone-400 border border-stone-800 hover:text-stone-200'
                  }`}
                >
                  {project.title}
                </button>
              );
            })}
          </div>

          {/* Active Project Mobile Summary Card */}
          <div
            onClick={() => openProjectModal(activeProject)}
            className="p-3.5 rounded-2xl bg-stone-900/85 border border-stone-800/90 backdrop-blur-md space-y-1 cursor-pointer active:scale-[0.99] transition-transform shadow-lg"
          >
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">
                {activeProject.category}
              </span>
              <span className="text-stone-500 font-mono text-[10px]">
                {activeProject.year} • TAP TO EXPAND
              </span>
            </div>
            <div className="font-sans font-bold text-sm text-white flex items-center justify-between">
              <span>{activeProject.title}</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
            </div>
            <p className="text-xs text-stone-300 font-sans line-clamp-2 leading-relaxed">
              {activeProject.tagline || activeProject.summary}
            </p>
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex items-center gap-2.5 pt-0.5">
          <button
            onClick={() => openProjectModal(activeProject)}
            className="flex-1 py-3 px-4 rounded-full bg-white text-stone-950 font-sans text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-[0.98] min-h-[44px]"
          >
            <span>View Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setActiveRoute('/lab')}
            className="py-3 px-5 rounded-full bg-stone-900/90 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs font-mono font-medium min-h-[44px] flex items-center justify-center active:scale-[0.98]"
          >
            Lab Console
          </button>
        </div>

        {/* Mobile Status Row */}
        <div className="flex items-center justify-between pt-1 text-[10px] text-stone-500 font-mono tracking-wider">
          <span>TAMIL NADU, INDIA // SURYA V M</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AVAILABLE
          </span>
        </div>
      </div>

      {/* ============================================================
          DESKTOP BOTTOM SECTION: VENTURE SELECTOR & REFINED METADATA
          ============================================================ */}
      <div className="hidden md:flex relative z-10 w-full flex-row items-end justify-between gap-8 pb-4">
        
        {/* Left: Oversized Stacked Project List */}
        <div className="flex flex-col space-y-0.5 z-10">
          {featuredProjects.map((project, idx) => {
            const isSelected = idx === activeProjectIndex;
            return (
              <button
                key={project.id}
                onMouseEnter={() => setActiveProjectIndex(idx)}
                onClick={() => {
                  setActiveProjectIndex(idx);
                  openProjectModal(project);
                }}
                className={`text-left text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight transition-all duration-200 select-none block leading-[1.08] ${
                  isSelected
                    ? 'text-white translate-x-2'
                    : 'text-stone-500/50 hover:text-stone-300'
                }`}
                title={`Click to inspect ${project.title} case study`}
              >
                <span>{project.title}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Selected Project Metadata, Status & Quick Action Button */}
        <div className="flex flex-col items-start md:items-end space-y-3.5 max-w-xs text-left md:text-right font-mono text-xs">
          
          {/* Active Project Detail */}
          <div className="space-y-1">
            <div className="text-amber-400/90 text-[11px] font-bold tracking-wider">
              {activeProject.category.toUpperCase()}
            </div>
            <div className="text-stone-300 text-xs font-sans line-clamp-1">
              {activeProject.tagline || activeProject.summary}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 pt-1">
            <button
              onClick={() => openProjectModal(activeProject)}
              className="px-5 py-2.5 rounded-full bg-white text-stone-950 hover:bg-stone-200 font-sans text-xs font-bold transition-all shadow-lg flex items-center gap-1.5"
            >
              <span>View Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveRoute('/lab')}
              className="px-3.5 py-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs transition-colors"
            >
              <span>Lab</span>
            </button>
          </div>

          {/* Location & Status Stamp */}
          <div className="text-[10px] text-stone-500 tracking-widest uppercase">
            TAMIL NADU, INDIA
          </div>
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
