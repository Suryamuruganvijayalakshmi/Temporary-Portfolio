import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Cpu, Layers, GitBranch, ArrowRight, Shield } from 'lucide-react';
import {
  EcoClampVisual,
  AgriFlowVisual,
  SignBridgeVisual,
  BeltSentinelVisual,
  SynthetixHRVisual,
  SentinelVisual
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
      case 'ecoclamp-iot':
        return <EcoClampVisual />;
      case 'agriflow':
        return <AgriFlowVisual />;
      case 'signbridge':
        return <SignBridgeVisual />;
      case 'beltsentinel':
        return <BeltSentinelVisual />;
      case 'synthetix-hr':
        return <SynthetixHRVisual />;
      case 'sentinel':
        return <SentinelVisual />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-y-auto z-10 font-sans"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-iris-50 text-iris-700 border border-iris-200">
                PROJECT {project.number}
              </span>
              <span className="text-xs font-medium text-slate-500 hidden sm:inline">
                {project.category}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Title & Headline */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {project.title}
              </h2>
              <p className="text-base text-slate-600 mt-2 font-normal">
                {project.description}
              </p>

              {/* Technologies Pill Grid */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-200/80"
                  >
                    {tech}
                  </span>
                ))}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-iris-600 text-white hover:bg-iris-700 transition-colors shadow-sm"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Embedded Live Simulation Visualizer */}
            <div className="border border-slate-200/80 rounded-2xl p-2 bg-slate-50/50">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider px-3 py-1">
                Interactive Architecture Simulation
              </div>
              {renderVisual()}
            </div>

            {/* Comprehensive Case Study Section */}
            <div className="space-y-6 pt-2">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-iris-600"></span>
                In-Depth Technical Case Study
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Problem */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider mb-2 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                    Problem Definition
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {project.caseStudy.problem}
                  </p>
                </div>

                {/* 2. Idea */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
                  <div className="flex items-center gap-2 text-xs font-bold text-iris-600 uppercase tracking-wider mb-2 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-iris-600"></span>
                    Architectural Idea
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {project.caseStudy.idea}
                  </p>
                </div>
              </div>

              {/* 3. Architecture */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 font-mono">
                  <Layers className="w-4 h-4 text-iris-600" />
                  System Architecture Pipeline
                </div>
                <div className="font-mono text-xs bg-slate-900 text-slate-100 p-3.5 rounded-xl border border-slate-800 leading-relaxed overflow-x-auto">
                  {project.caseStudy.architecture}
                </div>
              </div>

              {/* 4. Technology & Implementation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 font-mono">
                    <Cpu className="w-4 h-4 text-iris-600" />
                    Technology & Stacks
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {project.caseStudy.technology}
                  </p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 font-mono">
                    <GitBranch className="w-4 h-4 text-iris-600" />
                    Implementation Execution
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {project.caseStudy.implementation}
                  </p>
                </div>
              </div>

              {/* 5. Results & Future Scope */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200/60">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2 font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Observed Results & Impact
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {project.caseStudy.results}
                  </p>
                </div>

                <div className="bg-purple-50/40 p-5 rounded-2xl border border-iris-200/60">
                  <div className="flex items-center gap-2 text-xs font-bold text-iris-700 uppercase tracking-wider mb-2 font-mono">
                    <ArrowRight className="w-4 h-4 text-iris-600" />
                    Future Scope & Roadmap
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {project.caseStudy.futureScope}
                  </p>
                </div>
              </div>

              {/* Key Features List */}
              <div className="pt-2">
                <h4 className="text-sm font-bold text-slate-900 mb-3 font-mono uppercase tracking-wider">
                  Engineered Feature Capabilities:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-iris-500 mt-1.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">
              Designed & Built by Surya V M
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors"
            >
              Close Case Study
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
