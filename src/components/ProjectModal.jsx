import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Cpu, Layers, GitBranch, ArrowRight, Shield, ShieldCheck } from 'lucide-react';
import {
  EcoClampVisual,
  AgriFlowVisual,
  SignBridgeVisual,
  SentinelVisual,
  MerryBerryVisual,
  EsimVisaVisual
} from './ProjectVisuals';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  const renderVisual = () => {
    switch (project.id) {
      case 'signbridge':
        return <SignBridgeVisual />;
      case 'ecoclamp-iot':
      case 'ecoclamp':
        return <EcoClampVisual />;
      case 'farmcargo':
      case 'agriflow':
        return <AgriFlowVisual />;
      case 'sentinel':
        return <SentinelVisual />;
      case 'merryberry':
        return <MerryBerryVisual />;
      case 'esim-visa-alert':
        return <EsimVisaVisual />;
      default:
        return null;
    }
  };

  const problem = project.problem || project.caseStudy?.problem || project.summary;
  const solution = project.solution || project.caseStudy?.idea || project.tagline;
  const techApproach = project.technicalApproach || project.caseStudy?.architecture || '';
  const contribution = project.contribution || project.caseStudy?.implementation || '';
  const status = project.status || project.caseStudy?.results || '';

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} Case Study`}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-card text-primary rounded-3xl shadow-2xl border border-medium overflow-y-auto z-10 font-sans"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-card/95 backdrop-blur-md border-b border-subtle">
            <div className="flex items-center space-x-3">
              <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-surface text-iris-400 border border-subtle">
                Nº {project.index || '01'} / {project.totalCount || '06'}
              </span>
              <span className="text-xs font-medium text-secondary hidden sm:inline">
                {project.category}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-secondary hover:text-primary hover:bg-surface transition-colors"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Title & Headline */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="rubber-stamp text-[10px]">
                  {project.tag || 'SYSTEM // CASE STUDY'}
                </span>
                <span className="technical-label text-[10px]">
                  {project.year || '2026'}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight editorial-title">
                {project.title}
              </h2>
              <p className="text-base text-secondary mt-2 font-normal leading-relaxed">
                {project.summary || project.tagline}
              </p>

              {/* Technologies Pill Grid */}
              <div className="flex flex-wrap gap-2 mt-4">
                {(project.technologies || []).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-surface text-secondary border border-subtle"
                  >
                    {tech}
                  </span>
                ))}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-semibold rounded-full bg-primary text-canvas hover:opacity-90 transition-all shadow-sm"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Embedded Live Simulation Visualizer */}
            <div className="border border-subtle rounded-2xl p-2 bg-surface">
              <div className="text-[11px] font-mono text-muted uppercase tracking-wider px-3 py-1">
                Interactive Architecture Simulation
              </div>
              {renderVisual()}
            </div>

            {/* Comprehensive Case Study Section */}
            <div className="space-y-6 pt-2">
              <h3 className="text-lg font-bold text-primary border-b border-subtle pb-2 flex items-center gap-2 font-mono">
                <span className="w-2 h-2 rounded-full bg-iris-500"></span>
                In-Depth Technical Case Study
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Problem */}
                <div className="bg-surface p-5 rounded-2xl border border-subtle">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-500 uppercase tracking-wider mb-2 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    Problem Definition
                  </div>
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                    {problem}
                  </p>
                </div>

                {/* 2. Solution */}
                <div className="bg-surface p-5 rounded-2xl border border-subtle">
                  <div className="flex items-center gap-2 text-xs font-bold text-iris-400 uppercase tracking-wider mb-2 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-iris-400"></span>
                    Proposed Solution
                  </div>
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                    {solution}
                  </p>
                </div>
              </div>

              {/* 3. Technical Approach */}
              {techApproach && (
                <div className="bg-surface p-5 rounded-2xl border border-subtle shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-2 font-mono">
                    <Layers className="w-4 h-4 text-iris-400" />
                    Technical Approach & Architecture
                  </div>
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans">
                    {techApproach}
                  </p>
                </div>
              )}

              {/* 4. Contribution & Current Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contribution && (
                  <div className="bg-surface p-5 rounded-2xl border border-subtle">
                    <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-2 font-mono">
                      <Cpu className="w-4 h-4 text-iris-400" />
                      Engineering Contribution
                    </div>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                      {contribution}
                    </p>
                  </div>
                )}

                {status && (
                  <div className="bg-surface p-5 rounded-2xl border border-subtle">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Implementation Status
                    </div>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                      {status}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="sticky bottom-0 bg-card/95 backdrop-blur-md px-6 py-4 border-t border-subtle flex items-center justify-between">
            <span className="text-xs text-muted font-mono">
              Surya V M // SignBridge Studio
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono font-bold rounded-xl bg-primary text-canvas hover:opacity-90 transition-opacity"
            >
              Close Case Study
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

