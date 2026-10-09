import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projectsData';
import ProjectModal from './ProjectModal';
import { 
  ArrowRight, ExternalLink, Cpu, Activity, Sparkles, Layers, 
  Satellite, Wheat, ShieldAlert, FileText, ChevronRight 
} from 'lucide-react';
import {
  EcoClampVisual,
  AgriFlowVisual,
  SignBridgeVisual,
  BeltSentinelVisual,
  SynthetixHRVisual,
  SentinelVisual
} from './ProjectVisuals';

export default function Works() {
  const [activeProject, setActiveProject] = useState(null);

  const renderCardVisualPreview = (id) => {
    switch (id) {
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
    <section id="works" className="py-24 sm:py-32 bg-surface-subtle border-t border-slate-200/60 relative overflow-hidden">
      {/* Anchor for Projects */}
      <div id="projects" className="absolute -top-20" />

      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-iris-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-iris-200 text-xs font-mono font-semibold text-iris-700 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-iris-600"></span>
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
            [ 06 PRODUCTION ARCHITECTURES ]
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="space-y-12">
          {projects.map((project, idx) => {
            const isFounderCard = project.id === 'signbridge';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative bg-white rounded-3xl border-2 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden ${
                  isFounderCard
                    ? 'border-iris-400 shadow-iris hover:border-iris-600 hover:shadow-iris-lg ring-2 ring-iris-300'
                    : 'border-iris-200/90 shadow-iris-sm hover:border-iris-500 hover:shadow-iris-lg'
                }`}
              >
                {/* Subtle Iris Gradient Overlay on Hover */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-iris-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left Column: Details & Tech */}
                    <div className="lg:col-span-6 space-y-5">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-xs font-bold text-iris-600 bg-iris-50 px-3 py-1 rounded-full border border-iris-200">
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
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-iris-700 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-iris-600 mt-1">
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
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 border border-slate-200/60"
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
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-iris-600 to-indigo-600 hover:from-iris-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2 shadow-iris-sm group-hover:shadow-iris"
                        >
                          <span>Explore Case Study</span>
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </button>

                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 rounded-xl bg-iris-50 hover:bg-iris-100 text-iris-700 text-xs sm:text-sm font-semibold border border-iris-200 transition-colors inline-flex items-center gap-1.5"
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
                        <span>Click visual to expand full architecture</span>
                        <span className="text-iris-600 font-sans font-medium flex items-center gap-0.5">
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
