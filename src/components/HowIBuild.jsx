import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { buildProcess } from '../data/journeyData';
import { Search, Compass, Code, Cpu, ShieldCheck, Rocket, RefreshCw, ArrowRight } from 'lucide-react';

const stepIcons = [Search, Compass, Code, Cpu, ShieldCheck, Rocket, RefreshCw];

export default function HowIBuild() {
  const [selectedStep, setSelectedStep] = useState(0);

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-iris-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-iris-50 border border-iris-200 text-xs font-mono font-semibold text-iris-700 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-iris-600"></span>
            HOW I BUILD
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            From Idea to Product
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            A methodical, end-to-end framework transforming high-level requirements into scalable, battle-tested software and hardware systems.
          </p>
        </div>

        {/* Process Stepper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3 mb-10">
          {buildProcess.map((item, idx) => {
            const Icon = stepIcons[idx] || Code;
            const isSelected = selectedStep === idx;

            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                onClick={() => setSelectedStep(idx)}
                className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-iris-500 shadow-iris ring-1 ring-iris-300'
                    : 'bg-surface-subtle border-slate-200/80 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      {item.step}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-iris-600 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono">
                  <span className={isSelected ? 'text-iris-600 font-semibold' : 'text-slate-400'}>
                    {isSelected ? 'ACTIVE VIEW' : 'STAGE ' + item.step}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Expanded Active Stage Detail Banner */}
        <motion.div
          key={selectedStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-surface-subtle rounded-3xl p-6 sm:p-8 border border-iris-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-iris-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm shadow-iris-600/30">
              {buildProcess[selectedStep].step}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-iris-600 uppercase">
                  Stage Milestone:
                </span>
                <h4 className="text-lg font-bold text-slate-900">
                  {buildProcess[selectedStep].title} — {buildProcess[selectedStep].summary}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                {buildProcess[selectedStep].description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto font-mono text-xs text-slate-400">
            <span>Progress: {selectedStep + 1} / 7</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
