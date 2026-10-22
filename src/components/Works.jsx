import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projectsData';
import ProjectModal from './ProjectModal';
import { 
  ArrowRight, ExternalLink, ChevronRight, Layers, Sparkles 
} from 'lucide-react';
import {
  EcoClampVisual,
  AgriFlowVisual,
  SignBridgeVisual,
  SentinelVisual
} from './ProjectVisuals';

export default function Works() {
  const [activeProject, setActiveProject] = useState(null);

  const renderCardVisualPreview = (id) => {
    switch (id) {
      case 'signbridge':
        return <SignBridgeVisual />;
      case 'ecoclamp-iot':
        return <EcoClampVisual />;
      case 'farmcargo':
      case 'agriflow':
        return <AgriFlowVisual />;
      case 'sentinel':
        return <SentinelVisual />;
      default:
        return null;
    }
  };

  return (
    <section id="works" className="py-28 sm:py-36 bg-white relative overflow-hidden">
      {/* Anchor for Projects */}
      <div id="projects" className="absolute -top-20" />

      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-mono font-bold text-indigo-700 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              PORTFOLIO SHOWCASE
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Selected Works
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Production systems, intelligent IoT architectures, and venture platforms engineered from concept to deployment. Click any card to read the complete technical case study.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400 hidden sm:block">
            [ 04 PRODUCTION ARCHITECTURES ]
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="space-y-14">
          {projects.map((project, idx) => {
            const isFounderCard = project.id === 'signbridge';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative bg-white rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 overflow-hidden ${
                  isFounderCard
                    ? 'border-indigo-300 shadow-[0_20px_50px_rgba(99,102,241,0.12)] hover:border-indigo-500 ring-2 ring-indigo-100'
                    : 'border-slate-200/90 shadow-[0_10px_35px_rgba(15,23,42,0.04)] hover:border-indigo-400 hover:shadow-[0_25px_60px_rgba(15,23,42,0.08)]'
                }`}
              >
                {/* Subtle Gradient Glow on Hover */}
                <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-br from-indigo-500/8 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left Column: Details & Tech */}
                    <div className="lg:col-span-6 space-y-5">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                          PROJECT {project.number}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {project.category}
                        </span>
                        {isFounderCard && (
                          <span className="text-[10px] font-mono bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full border border-purple-200">
                            FOUNDER VENTURE
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-indigo-600 mt-1">
                          {project.tagline}
                        </p>
                      </div>

                      <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technologies Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.technologies.slice(0, 6).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 border border-slate-200/60"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 6 && (
                          <span className="px-2.5 py-1 text-xs font-mono text-slate-500 bg-slate-50 rounded-lg border border-slate-200/60">
                            +{project.technologies.length - 6} more
                          </span>
                        )}
                      </div>

                      {/* Action Triggers */}
                      <div className="flex flex-wrap items-center gap-3 pt-3">
                        <button
                          onClick={() => setActiveProject(project)}
                          className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-500/25 transition-all inline-flex items-center gap-2 group-hover:shadow-lg"
                        >
                          <span>Explore Case Study</span>
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </button>

                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-semibold border border-indigo-200 transition-colors inline-flex items-center gap-1.5"
                          >
                            <span>Live Site</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Interactive Visual Preview */}
                    <div className="lg:col-span-6">
                      <div className="cursor-pointer" onClick={() => setActiveProject(project)}>
                        {renderCardVisualPreview(project.id)}
                      </div>
                      <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 mt-2 px-1">
                        <span>Interactive live telemetry simulation</span>
                        <span className="text-indigo-600 font-sans font-medium flex items-center gap-0.5">
                          Deep Dive <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal Window */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}
