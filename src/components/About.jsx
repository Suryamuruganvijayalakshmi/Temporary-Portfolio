import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, PenTool, Code, CheckSquare, Rocket, RefreshCw, Cpu, Layers, Sparkles, Globe } from 'lucide-react';

const pipelineStages = [
  { stage: 'IDEA', icon: Lightbulb, label: 'Concept Validation', desc: 'Isolating root bottlenecks & formulating technical hypotheses.' },
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
    color: 'iris',
  },
  {
    title: 'AI & ML',
    category: 'Applied Intelligence',
    desc: 'Predictive forecasting, explainable resume intelligence, and LLM integrations that solve operational bottlenecks.',
    metric: 'Applied Models',
    icon: Sparkles,
    color: 'indigo',
  },
  {
    title: 'IoT & Embedded Systems',
    category: 'Hardware & Edge',
    desc: 'Custom firmware on ESP32, multi-sensor telemetry (CT, MPU6050, Temp), and industrial anomaly detection.',
    metric: 'Edge AIoT',
    icon: Cpu,
    color: 'sky',
  },
  {
    title: 'Product Development',
    category: 'Startup Execution',
    desc: 'Taking ambitious visions from whiteboard to live startup ventures like SignBridge (signbridge.click).',
    metric: 'Founder Led',
    icon: Globe,
    color: 'purple',
  },
];

export default function About() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="about" className="py-24 sm:py-32 bg-surface-subtle border-y border-slate-200/60 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-iris-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="space-y-3 mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-iris-200 shadow-xs text-xs font-mono font-semibold text-iris-700">
            <span className="w-1.5 h-1.5 rounded-full bg-iris-600"></span>
            ABOUT SURYA
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Who I Am
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-iris-600 to-indigo-500 rounded-full" />
        </div>

        {/* Narrative & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          <div className="lg:col-span-7 space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
            <p className="font-medium text-slate-900 text-lg sm:text-xl leading-relaxed">
              I'm Surya V M, a software developer and startup builder focused on creating practical technology across software, AI and IoT.
            </p>
            <p className="text-slate-600">
              I enjoy taking an idea from <span className="font-semibold text-iris-700">concept → architecture → development → deployment</span>. I don't stop at theoretical prototypes; I build complete systems engineered for real-world resilience.
            </p>
            <p className="text-slate-600">
              My work spans full-stack development, AI-powered applications, intelligent IoT systems and product development. Whether it's training an anomaly detector for electric motor currents, streaming high-frequency sensor telemetry to the cloud, or launching user-facing web platforms, I bridge the physical and digital domains with clean architecture.
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
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-iris-300 hover:shadow-iris-sm transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-iris-50 border border-iris-100 flex items-center justify-center text-iris-600 mb-3 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-[11px] font-mono text-iris-600 font-semibold uppercase tracking-wider mb-1">
                    {item.metric}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-normal">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Animated Visual Pipeline: IDEA ↓ DESIGN ↓ BUILD ↓ TEST ↓ DEPLOY ↓ IMPROVE */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono font-semibold text-iris-600 uppercase tracking-widest">
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
            {/* Connecting Bar */}
            <div className="absolute top-7 left-12 right-12 h-0.5 bg-gradient-to-r from-iris-200 via-indigo-300 to-purple-400 -z-0" />

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
                      ? 'bg-iris-50/90 border-2 border-iris-600 shadow-iris-sm'
                      : 'bg-white border border-slate-200 hover:border-iris-300'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold mb-3 transition-colors ${
                      isActive
                        ? 'bg-iris-600 text-white shadow-md shadow-iris-600/30'
                        : 'bg-slate-100 text-slate-700 hover:bg-iris-100 hover:text-iris-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold font-mono text-slate-900 tracking-wider">
                    {stage.stage}
                  </div>
                  <div className="text-[11px] text-iris-600 font-medium mt-1">
                    {stage.label}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Active Stage Deep Dive Callout */}
          <div className="hidden md:block mt-8 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center font-mono text-xs text-slate-600">
            <span className="font-bold text-iris-700 mr-2">STAGE {activeStage + 1} ({pipelineStages[activeStage].stage}):</span>
            {pipelineStages[activeStage].desc}
          </div>

          {/* Mobile Vertical Pipeline */}
          <div className="md:hidden space-y-4">
            {pipelineStages.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.stage}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-iris-600 text-white flex items-center justify-center flex-shrink-0 font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-mono text-slate-900 tracking-wider">
                        {stage.stage}
                      </span>
                      <span className="text-[10px] text-iris-600 font-mono font-medium">
                        STAGE 0{idx + 1}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-800 mt-0.5">
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
