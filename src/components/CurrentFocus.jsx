import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Sparkles, Cpu, Layers, ArrowRight } from 'lucide-react';

export default function CurrentFocus() {
  const cards = [
    {
      id: 'software',
      title: 'SOFTWARE',
      tag: 'Full-Stack Ecosystems',
      description: 'Building modern full-stack web applications and digital products.',
      deepDive: 'React 19, high-throughput Node.js microservices, structured RESTful interfaces, and reactive real-time database layers.',
      icon: Code2,
      gradient: 'from-blue-600 via-indigo-600 to-indigo-700',
      bgGlow: 'from-blue-500/10 to-transparent',
    },
    {
      id: 'ai',
      title: 'AI',
      tag: 'Applied Intelligence',
      description: 'Exploring AI-powered applications, predictive systems and intelligent automation.',
      deepDive: 'Machine learning for anomaly detection, harvest time-series forecasting, explainable resume intelligence, and LLM reasoning pipelines.',
      icon: Sparkles,
      gradient: 'from-indigo-600 via-purple-600 to-pink-600',
      bgGlow: 'from-purple-500/10 to-transparent',
    },
    {
      id: 'iot',
      title: 'IoT',
      tag: 'Edge Hardware & AIoT',
      description: 'Building real-world connected systems using ESP32, sensors and AIoT technologies.',
      deepDive: 'ESP32 microcontrollers, non-invasive CT current sensors, 3-axis MPU6050 vibration analysis, and edge baseline learning.',
      icon: Cpu,
      gradient: 'from-cyan-600 via-teal-600 to-emerald-600',
      bgGlow: 'from-cyan-500/10 to-transparent',
    },
  ];

  return (
    <section className="py-28 sm:py-36 bg-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-mono font-bold text-indigo-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            ACTIVE CONVERGENCE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            What I'm Building
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Where software architecture, machine intelligence, and physical sensor systems intersect into unified solutions.
          </p>
        </div>

        {/* 3 Animated Cards with Connecting SVG Flow Lines */}
        <div className="relative">
          {/* Subtle animated connector line across cards on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 -translate-y-1/2 pointer-events-none z-0">
            <svg className="w-full h-12 overflow-visible" fill="none">
              <path
                d="M 50 6 C 250 6, 350 6, 500 6 C 650 6, 750 6, 950 6"
                stroke="url(#pulse-gradient)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <defs>
                <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
            {cards.map((card, idx) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  className="group relative bg-white rounded-3xl p-8 border border-slate-200/90 shadow-[0_10px_35px_rgba(15,23,42,0.04)] hover:border-indigo-400 hover:shadow-[0_20px_50px_rgba(99,102,241,0.12)] transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle top accent gradient */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${card.gradient}`} />
                  <div className={`absolute top-0 right-0 w-44 h-44 bg-gradient-to-br ${card.bgGlow} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-md transform group-hover:scale-105 transition-all`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400">
                        PILLAR 0{idx + 1}
                      </span>
                    </div>

                    <div className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider mb-1">
                      {card.tag}
                    </div>

                    <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
                      {card.title}
                    </h3>

                    <p className="text-slate-700 font-semibold text-sm sm:text-base leading-relaxed mb-4">
                      {card.description}
                    </p>

                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {card.deepDive}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>STATUS: ACTIVE FOCUS</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
