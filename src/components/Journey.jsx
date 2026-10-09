import React from 'react';
import { motion } from 'framer-motion';
import { journeyMilestones } from '../data/journeyData';
import { Calendar, Rocket, Cpu, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Journey() {
  return (
    <section id="experience" className="py-28 sm:py-36 bg-white border-t border-slate-200/80 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-mono font-bold text-indigo-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            EXPERIENCE & MILESTONES
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Building My Journey
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            A milestone-driven record of systems built, ventures founded, and hardware-software architectures deployed.
          </p>
        </div>

        {/* Modern Vertical Timeline */}
        <div className="relative border-l-2 border-indigo-200 ml-4 sm:ml-32 pl-6 sm:pl-10 space-y-12">
          {journeyMilestones.map((item, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="relative group"
              >
                {/* Timeline node dot */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-white border-4 border-indigo-600 shadow-sm group-hover:scale-125 transition-transform" />

                {/* Left Year Badge for desktop */}
                <div className="sm:absolute sm:-left-36 sm:top-1 font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 group-hover:border-indigo-300 transition-colors mb-2 sm:mb-0">
                  [{item.year}]
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_4px_25px_rgba(15,23,42,0.03)] hover:border-indigo-400 hover:shadow-[0_15px_35px_rgba(99,102,241,0.1)] transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                      {item.highlight}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 font-mono">
                      {item.role}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
                    {item.initiative}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-[11px] font-mono rounded bg-slate-50 text-slate-600 border border-slate-200/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
