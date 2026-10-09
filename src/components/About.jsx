import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, PenTool, Code, CheckSquare, Rocket, RefreshCw, Cpu, Layers, Sparkles, Globe } from 'lucide-react';

const pipelineStages = [
  { stage: 'IDEA', icon: Lightbulb, label: 'Concept Discovery', desc: 'Isolating root bottlenecks & formulating technical hypotheses.' },
  { stage: 'DESIGN', icon: PenTool, label: 'System Blueprint', desc: 'Architecting schemas, circuit pinouts & user workflows.' },
  { stage: 'BUILD', icon: Code, label: 'Core Engineering', desc: 'Crafting performant React frontends, robust APIs & firmware.' },
  { stage: 'TEST', icon: CheckSquare, label: 'Stress Validation', desc: 'Telemetry noise filters, edge latency & security verification.' },
  { stage: 'DEPLOY', icon: Rocket, label: 'Production Launch', desc: 'Zero-downtime cloud infrastructure & physical deployment.' },
  { stage: 'IMPROVE', icon: RefreshCw, label: 'Telemetry & Iteration', desc: 'Refining models & features based on real-world telemetry.' },
];

const pillars = [
  {
    title: 'Full-Stack Development',
    category: 'Software Engineering',
    desc: 'High-performance web apps with modern React, Node.js, Express, and resilient relational databases.',
    metric: 'Production Ready',
    icon: Layers,
    color: 'from-blue-600 to-indigo-600',
  },
  {
    title: 'AI & ML',
    category: 'Applied Intelligence',
    desc: 'Predictive forecasting, explainable resume intelligence, and LLM integrations that solve operational bottlenecks.',
    metric: 'Applied Models',
    icon: Sparkles,
    color: 'from-indigo-600 to-purple-600',
  },
  {
    title: 'IoT & Embedded Systems',
    category: 'Hardware & Edge',
    desc: 'Custom firmware on ESP32, multi-sensor telemetry (CT, MPU6050, Temp), and industrial anomaly detection.',
    metric: 'Edge AIoT',
    icon: Cpu,
    color: 'from-cyan-600 to-teal-600',
  },
  {
    title: 'Product Development',
    category: 'Startup Execution',
    desc: 'Taking ambitious visions from whiteboard to live startup ventures like SignBridge (signbridge.click).',
    metric: 'Founder Led',
    icon: Globe,
    color: 'from-purple-600 to-pink-600',
  },
];

export default function About() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="about" className="py-28 sm:py-36 bg-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="space-y-3 mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-mono font-bold text-indigo-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            WHO I AM
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Architect of Ideas & Systems
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 rounded-full" />
        </div>

        {/* Narrative & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          <div className="lg:col-span-7 space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
            <p className="font-semibold text-slate-900 text-xl sm:text-2xl leading-snug">
              I'm Surya V M, a software developer and startup builder focused on creating practical technology across software, AI and IoT.
            </p>
            <p className="text-slate-600">
              I enjoy taking an idea from <span className="font-bold text-indigo-600">concept → architecture → development → deployment</span>. I don't stop at theoretical prototypes; I build complete systems engineered for real-world resilience.
            </p>
            <p className="text-slate-600">
              My work spans full-stack development, AI-powered applications, intelligent IoT systems and product development. Whether it's training an anomaly detector for electric motor currents, streaming high-frequency sensor telemetry to the cloud, or launching user-facing web platforms, I bridge physical hardware and digital platforms with clean architecture.
            </p>
          </div>

          {/* Core Focus Statistics Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:border-indigo-400 hover:shadow-[0_15px_30px_rgba(99,102,241,0.12)] transition-all duration-300 group"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-3 group-hover:scale-105 transition-transform shadow-xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-[11px] font-mono text-indigo-600 font-bold uppercase tracking-wider mb-1">
                    {item.metric}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-normal font-normal">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Animated Visual Pipeline: IDEA ↓ DESIGN ↓ BUILD ↓ TEST ↓ DEPLOY ↓ IMPROVE */}
        <div className="bg-gradient-to-b from-slate-50/70 to-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest">
              ENGINEERING METHODOLOGY
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              From Concept to Production
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Every system I build follows an intentional, battle-tested execution loop:
            </p>
          </div>

          {/* Desktop Horizontal Interactive Pipeline */}
          <div className="hidden md:grid grid-cols-6 gap-3 relative">
            <div className="absolute top-7 left-12 right-12 h-0.5 bg-gradient-to-r from-indigo-200 via-purple-300 to-cyan-300 -z-0" />

            {pipelineStages.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeStage === idx;
              return (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  onClick={() => setActiveStage(idx)}
                  className={`cursor-pointer rounded-2xl p-4 flex flex-col items-center text-center transition-all duration-300 relative z-10 ${
                    isActive
                      ? 'bg-white border-2 border-indigo-600 shadow-md ring-4 ring-indigo-50'
                      : 'bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-xs'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold mb-3 transition-colors ${
                      isActive
                        ? 'bg-gradient-to-br from-indigo-600 to-cyan-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold font-mono text-slate-900 tracking-wider">
                    {stage.stage}
                  </div>
                  <div className="text-[11px] text-indigo-600 font-semibold mt-1">
                    {stage.label}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Active Stage Deep Dive Callout */}
          <div className="hidden md:block mt-8 p-4 rounded-2xl bg-white border border-slate-200 text-center font-mono text-xs text-slate-700 shadow-xs">
            <span className="font-bold text-indigo-600 mr-2">STAGE {activeStage + 1} ({pipelineStages[activeStage].stage}):</span>
            {pipelineStages[activeStage].desc}
          </div>

          {/* Mobile Vertical Pipeline */}
          <div className="md:hidden space-y-4">
            {pipelineStages.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.stage}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 text-white flex items-center justify-center flex-shrink-0 font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-mono text-slate-900 tracking-wider">
                        {stage.stage}
                      </span>
                      <span className="text-[10px] text-indigo-600 font-mono font-bold">
                        STAGE 0{idx + 1}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-800 mt-0.5">
                      {stage.label}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
