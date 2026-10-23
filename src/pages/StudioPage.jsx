import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../lib/store';
import { profileConfig, studioServices, featuredProjects } from '../data/portfolioData';
import ProjectModal from '../components/ProjectModal';
import Lanyard from '../components/Lanyard';
import { 
  Layers, 
  Cpu, 
  ExternalLink, 
  CheckCircle2, 
  ChevronRight, 
  Briefcase, 
  Code2, 
  Sparkles, 
  ShieldCheck,
  Award
} from 'lucide-react';

export default function StudioPage() {
  const { openProjectModal, activeProjectModal, closeProjectModal, setActiveRoute } = useStore();
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full pt-24 sm:pt-28 pb-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
      {/* Background Micro-Grid */}
      <div className="absolute inset-0 technical-grid opacity-25 pointer-events-none" />

      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <div className="flex items-center gap-2 font-mono text-xs text-muted">
          <span className="w-2 h-2 rounded-full bg-iris-500" />
          <span>STUDIO // 3D LANYARD BADGE & SERVICES</span>
        </div>
        <h1 className="editorial-title text-4xl sm:text-5xl font-extrabold text-primary">
          Studio & Engineering
        </h1>
        <p className="text-base sm:text-lg text-secondary font-sans leading-relaxed">
          Specialized technical capabilities, engineering services, and verifiable case studies across software, AI, and physical IoT hardware.
        </p>
      </div>

      {/* Interactive 3D Hanging Lanyard ID Badge from React Bits */}
      <div className="relative w-full flex flex-col items-center justify-center py-2 overflow-hidden select-none">
        {/* Halftone surrounding ring aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[680px] sm:h-[680px] pointer-events-none opacity-35 dark:opacity-20 select-none">
          <svg viewBox="0 0 400 400" className="w-full h-full animate-[spin_120s_linear_infinite]">
            <circle cx="200" cy="200" r="185" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 9" className="text-stone-400 dark:text-stone-600" />
            <circle cx="200" cy="200" r="160" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 6" className="text-stone-500 dark:text-stone-500" />
            <circle cx="200" cy="200" r="135" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 8" className="text-stone-400 dark:text-stone-700" />
            <circle cx="200" cy="200" r="110" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 5" className="text-stone-400 dark:text-stone-800" />
          </svg>
        </div>

        {/* 3D Lanyard Canvas Container */}
        <div className="w-full h-[360px] xs:h-[420px] sm:h-[660px] lg:h-[760px] relative z-10 flex items-center justify-center">
          <Lanyard 
            frontImage="/card-front.svg"
            backImage="/card-back.svg"
            strapImage="/strap.svg"
            finish="glossy"
            metal="silver"
            size={isMobile ? 0.48 : 0.62}
            strapLength={isMobile ? 0.36 : 0.34}
            strapWidth={0.65}
            breeze={0.25}
            damping={0.45}
            elasticity={0.65}
          />
        </div>

        {/* Telemetry & Controls Annotation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 font-mono text-xs text-muted text-center z-10 mt-3 px-4">
          <span className="rubber-stamp">PHYSICS::ACTIVE</span>
          <span className="text-[11px] sm:text-xs">
            DRAG TO SWING · CLICK CARD TO FLIP · BREEZE SIMULATION
          </span>
        </div>
      </div>

      {/* Services Section */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="font-mono text-xs text-iris-400 uppercase tracking-wider block">
            OFFERED CAPABILITIES
          </span>
          <h2 className="editorial-title text-2xl sm:text-3xl font-bold text-primary">
            Engineering Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studioServices.map((svc) => (
            <div
              key={svc.id}
              className="bg-card rounded-2xl border-2 border-strong p-6 shadow-lg space-y-4 font-mono text-xs"
            >
              <div className="flex items-center justify-between border-b border-subtle pb-3">
                <span className="rubber-stamp">{svc.number}</span>
                <span className="text-[10px] text-muted uppercase">CAPABILITY</span>
              </div>
              <h3 className="editorial-title text-lg font-bold text-primary font-sans">
                {svc.title}
              </h3>
              <p className="font-sans text-xs text-secondary leading-relaxed">
                {svc.description}
              </p>
              <div className="pt-3 border-t border-subtle space-y-1.5 text-muted">
                {svc.deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies Deep Dive */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="font-mono text-xs text-iris-400 uppercase tracking-wider block">
            VERIFIED INITIATIVES
          </span>
          <h2 className="editorial-title text-2xl sm:text-3xl font-bold text-primary">
            Six Featured Systems &amp; Case Studies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => openProjectModal(p)}
              className="bg-card rounded-2xl border-2 border-strong hover:border-iris-500/40 p-6 shadow-xl cursor-pointer transition-all space-y-4 group"
            >
              <div className="flex items-center justify-between border-b border-subtle pb-3 font-mono text-xs">
                <span className="rubber-stamp">Nº {p.index}</span>
                <span className="text-muted">{p.year}</span>
              </div>
              <div>
                <h3 className="editorial-title text-xl font-bold text-primary group-hover:text-iris-400 transition-colors">
                  {p.title}
                </h3>
                <p className="font-mono text-xs text-secondary mt-1">
                  {p.category}
                </p>
              </div>
              <p className="text-xs text-secondary font-sans leading-relaxed line-clamp-3">
                {p.summary}
              </p>
              <div className="pt-3 border-t border-subtle flex items-center justify-between font-mono text-xs text-primary font-semibold">
                <span>View Full Architectural Study</span>
                <ChevronRight className="w-4 h-4 text-muted group-hover:text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {activeProjectModal && (
        <ProjectModal
          project={activeProjectModal}
          onClose={closeProjectModal}
        />
      )}
    </div>
  );
}
