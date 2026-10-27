import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight, CheckCircle2, ChevronRight, Layers, Cpu, Compass } from 'lucide-react';
import { GithubIcon } from '../SocialIcons';
import { AnimatedContent, GlareHover } from '../animations/InteractionEffects';
import { DecryptedText } from '../animations/DecryptedText';
import { MagneticButton } from '../animations/MagneticButton';
import { BorderBeam } from '../animations/BorderBeam';
import { ProjectPhoto } from '../ProjectArtworks';
import ProjectModal from '../ProjectModal';
import { projects } from '../../data/projectsData';

export default function Section05Projects() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  // Workflow steps for EcoClamp
  const ecoClampSteps = [
    { title: 'Monitor', desc: 'Continuous CT current & vibration sampling' },
    { title: 'Predict', desc: 'Adaptive baseline anomaly algorithms' },
    { title: 'Conserve', desc: 'Identify idle leakage & motor stress' },
    { title: 'Act', desc: 'Early-warning dispatch before downtime' },
  ];

  // Concept workflow for SENTINEL
  const sentinelSteps = ['Detect', 'Track', 'Predict', 'Assess', 'Decide', 'Maneuver', 'Verify'];

  return (
    <section
      id="projects"
      className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 bg-white border-t border-stone-200/80 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-20 border-b border-stone-200/80 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">
              Section 05 // Engineering
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-950 tracking-tight font-sans">
              <DecryptedText text="Featured Projects" speed={30} maxIterations={10} />
            </h2>
          </div>
          <p className="text-xs font-mono text-stone-500 max-w-xs">
            LARGE EDITORIAL SHOWCASES · VERIFIED PRODUCTION ARCHITECTURES
          </p>
        </div>

        {/* Vertically Stacked Editorial Projects */}
        <div className="space-y-28 sm:space-y-36">

          {/* ========================================================
              PROJECT 01: ECOCLAMP
              Layout: Text Left, Visual Right
              ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Project Details Left */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  PROJECT Nº 01
                </span>
                <span className="text-xs font-mono font-semibold text-stone-500 uppercase">
                  AIoT · Industrial Intelligence
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight font-sans">
                EcoClamp
              </h3>

              <p className="text-base sm:text-lg text-stone-700 font-medium leading-snug">
                AIoT Smart Resource Conservation &amp; Industrial Energy Intelligence Platform.
              </p>

              {/* Four-step Workflow */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider block">
                  INTELLIGENCE WORKFLOW:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {ecoClampSteps.map((step, idx) => (
                    <div key={step.title} className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-xs">
                      <div className="font-mono font-bold text-blue-600">0{idx + 1}. {step.title}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5 leading-tight">{step.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Problem & Contribution */}
              <div className="space-y-3 text-sm text-stone-600 leading-relaxed">
                <p>
                  <strong className="text-stone-900 font-semibold">The Problem:</strong> Industrial electric motors suffer from unexpected mechanical breakdown due to bearing wear and thermal overloading. Existing vibration tools require invasive installation and expensive manual inspection.
                </p>
                <p>
                  <strong className="text-stone-900 font-semibold">What I Built:</strong> A non-invasive clamp pod on ESP32 sampling SCT-013 current transformers and MPU6050 3-axis vibration FFTs. Adaptive baseline algorithms calculate early harmonic anomalies before catastrophic failure.
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['ESP32', 'SCT-013', 'MPU6050', 'DS18B20', 'React 19', 'Node.js', 'Supabase', 'C++/FreeRTOS'].map((tech) => (
                  <span key={tech} className="px-2.5 py-1 text-xs font-mono bg-stone-100 text-stone-700 rounded-lg border border-stone-200/80">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://ecoclamp.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-stone-950 hover:bg-blue-600 text-white font-sans text-xs font-bold inline-flex items-center gap-2 transition-all shadow-sm"
                >
                  <span>Launch Live Platform</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://github.com/Suryamuruganvijayalakshmi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-mono text-xs font-bold inline-flex items-center gap-1.5 transition-all border border-stone-200"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Project Artwork Right */}
            <div className="lg:col-span-6">
              <AnimatedContent delay={0.15}>
                <GlareHover className="rounded-3xl border border-stone-200/90 shadow-2xl p-2 bg-stone-50 relative overflow-hidden">
                  <BorderBeam size={220} duration={8} borderWidth={1.5} colorFrom="#f59e0b" colorTo="#10b981" />
                  <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black">
                    <ProjectPhoto projectId="ecoclamp-iot" />
                  </div>
                </GlareHover>
              </AnimatedContent>
            </div>

          </div>

          {/* ========================================================
              PROJECT 02: FARMCARGO
              Layout: Visual Left, Text Right (Alternating!)
              ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Project Artwork Left */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <AnimatedContent delay={0.15}>
                <GlareHover className="rounded-3xl border border-stone-200/90 shadow-2xl p-2 bg-stone-50 relative overflow-hidden">
                  <BorderBeam size={220} duration={8} borderWidth={1.5} colorFrom="#10b981" colorTo="#3b82f6" />
                  <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black">
                    <ProjectPhoto projectId="farmcargo" />
                  </div>
                </GlareHover>
              </AnimatedContent>
            </div>

            {/* Project Details Right */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  PROJECT Nº 02
                </span>
                <span className="text-xs font-mono font-semibold text-stone-500 uppercase">
                  AgriTech · Predictive Procurement
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight font-sans">
                FarmCargo
              </h3>

              <p className="text-base sm:text-lg text-stone-700 font-medium leading-snug">
                Agricultural Procurement Operations &amp; Control-Tower Logistics Platform.
              </p>

              {/* Key Highlights */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                  <span className="text-emerald-600 font-bold block">Arrival Prediction</span>
                  <span className="text-stone-500 text-[11px] mt-0.5 block">Forecasting harvest delivery windows</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                  <span className="text-emerald-600 font-bold block">Capacity Balancing</span>
                  <span className="text-stone-500 text-[11px] mt-0.5 block">Receiving depot vs. mill operations</span>
                </div>
              </div>

              {/* Problem & Contribution */}
              <div className="space-y-3 text-sm text-stone-600 leading-relaxed">
                <p>
                  <strong className="text-stone-900 font-semibold">The Problem:</strong> Agricultural procurement experiences severe harvest influx volatility. Static registration tools fail to foresee arrival timing, causing receiving yard gridlock and crop spoilage.
                </p>
                <p>
                  <strong className="text-stone-900 font-semibold">What I Built:</strong> A control-tower operations system that anticipates arrival volumes, allocates regional receiving capacity, and incorporates an offline-first data model for rural collection points.
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['React.js', 'Node.js', 'Python Analytics', 'PostgreSQL', 'Supabase', 'Offline IndexedDB'].map((tech) => (
                  <span key={tech} className="px-2.5 py-1 text-xs font-mono bg-stone-100 text-stone-700 rounded-lg border border-stone-200/80">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://signbridge.click"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-stone-950 hover:bg-emerald-600 text-white font-sans text-xs font-bold inline-flex items-center gap-2 transition-all shadow-sm"
                >
                  <span>Explore on SignBridge</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://github.com/Suryamuruganvijayalakshmi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-mono text-xs font-bold inline-flex items-center gap-1.5 transition-all border border-stone-200"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

          </div>

          {/* ========================================================
              PROJECT 03: SENTINEL
              Layout: Text Left, Visual Right
              ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Project Details Left */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                  PROJECT Nº 03
                </span>
                <span className="text-xs font-mono font-semibold text-stone-500 uppercase">
                  Space Tech · Orbital Simulation
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight font-sans">
                SENTINEL
              </h3>

              <p className="text-base sm:text-lg text-stone-700 font-medium leading-snug">
                Autonomous Orbital Safety, Satellite Rescue &amp; Debris Mitigation System.
              </p>

              {/* 7-Step Mission Concept Workflow */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider block">
                  CONCEPT MISSION PIPELINE:
                </span>
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                  {sentinelSteps.map((step, idx) => (
                    <React.Fragment key={step}>
                      <span className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 font-semibold border border-stone-200/80">
                        {step}
                      </span>
                      {idx < sentinelSteps.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-stone-400" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Problem & Contribution */}
              <div className="space-y-3 text-sm text-stone-600 leading-relaxed">
                <p>
                  <strong className="text-stone-900 font-semibold">The Problem:</strong> Low Earth Orbit debris density is exponentially increasing, threatening global communication constellations and active space assets.
                </p>
                <p>
                  <strong className="text-stone-900 font-semibold">What I Built:</strong> A conceptual mission architecture and orbital kinematic simulation environment modeling Clohessy-Wiltshire proximity rendezvous and collision probability assessment.
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['Python Orbital Simulators', 'WebGL Visualizer', 'Kinematic Solvers', 'Orbital Mechanics', 'React UI'].map((tech) => (
                  <span key={tech} className="px-2.5 py-1 text-xs font-mono bg-stone-100 text-stone-700 rounded-lg border border-stone-200/80">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://github.com/Suryamuruganvijayalakshmi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-stone-950 hover:bg-purple-600 text-white font-sans text-xs font-bold inline-flex items-center gap-2 transition-all shadow-sm"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Inspect Simulation Repository</span>
                </a>
              </div>
            </div>

            {/* Project Artwork Right */}
            <div className="lg:col-span-6">
              <AnimatedContent delay={0.15}>
                <GlareHover className="rounded-3xl border border-stone-200/90 shadow-2xl p-2 bg-stone-50 relative overflow-hidden">
                  <BorderBeam size={220} duration={8} borderWidth={1.5} colorFrom="#8b5cf6" colorTo="#ec4899" />
                  <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black">
                    <ProjectPhoto projectId="sentinel" />
                  </div>
                </GlareHover>
              </AnimatedContent>
            </div>

          </div>

          {/* ========================================================
              PROJECT 04: MERRY BERRY
              Layout: Visual Left, Text Right
              ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Visual Left */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <AnimatedContent delay={0.15}>
                <GlareHover className="rounded-3xl border border-stone-200/90 shadow-2xl p-2 bg-stone-50 relative overflow-hidden">
                  <BorderBeam size={220} duration={8} borderWidth={1.5} colorFrom="#ec4899" colorTo="#f59e0b" />
                  <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black">
                    <ProjectPhoto projectId="merryberry" />
                  </div>
                </GlareHover>
              </AnimatedContent>
            </div>

            {/* Text Right */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-pink-700 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
                  PROJECT Nº 04
                </span>
                <span className="text-xs font-mono font-semibold text-stone-500 uppercase">
                  Digital Commerce · Creative Web
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight font-sans">
                Merry Berry
              </h3>

              <p className="text-base sm:text-lg text-stone-700 font-medium leading-snug">
                Cinematic Culinary Brand Experience &amp; Digital Storefront Concept.
              </p>

              <div className="space-y-3 text-sm text-stone-600 leading-relaxed">
                <p>
                  <strong className="text-stone-900 font-semibold">The Concept:</strong> An interactive cafe website featuring vibrant fruit-inspired palettes, playful typography, and scroll-controlled storytelling that turns menu discovery into a kinetic culinary adventure.
                </p>
                <p>
                  <strong className="text-stone-900 font-semibold">What I Built:</strong> Responsive frontend architecture engineered with smooth kinetic transitions, tactile product interactions, and high-performance layout choreography.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {['React.js', 'Framer Motion', 'Tailwind CSS', 'Responsive UI', 'Interactive Menus'].map((tech) => (
                  <span key={tech} className="px-2.5 py-1 text-xs font-mono bg-stone-100 text-stone-700 rounded-lg border border-stone-200/80">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://merry-berry.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-stone-950 hover:bg-pink-600 text-white font-sans text-xs font-bold inline-flex items-center gap-2 transition-all shadow-sm"
                >
                  <span>Launch Live Concept</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://github.com/Suryamuruganvijayalakshmi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-mono text-xs font-bold inline-flex items-center gap-1.5 transition-all border border-stone-200"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

          </div>

          {/* ========================================================
              PROJECT 05: PERSONAL PORTFOLIO REPOSITORY
              ======================================================== */}
          <div className="rounded-3xl p-8 sm:p-12 bg-stone-50 border border-stone-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-mono font-bold text-blue-600 uppercase">
                PROJECT Nº 05 · OPEN REPOSITORY
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight font-sans">
                Personal Portfolio Source
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Showcasing clean frontend architecture, custom motion design, accessible editorial typography, and zero-bloat build performance.
              </p>
            </div>

            <a
              href="https://github.com/Suryamuruganvijayalakshmi/Surya-Portfolio.git"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-stone-950 hover:bg-blue-600 text-white font-mono text-xs font-bold inline-flex items-center gap-2 transition-all shadow-sm shrink-0"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Inspect Source Repository</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

      {/* Case Study Modal Dialog */}
      {selectedCaseStudy && (
        <ProjectModal
          project={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
        />
      )}
    </section>
  );
}
