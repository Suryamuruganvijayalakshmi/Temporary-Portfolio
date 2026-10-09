import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../data/skillsData';
import { 
  Code2, Server, Database, Sparkles, Cpu, Wrench, 
  Zap, ArrowRight, CheckCircle2
} from 'lucide-react';

const categoryIcons = {
  frontend: Code2,
  backend: Server,
  database: Database,
  'ai-ml': Sparkles,
  iot: Cpu,
  tools: Wrench,
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCategories = selectedCategory === 'all'
    ? skillCategories
    : skillCategories.filter(cat => cat.id === selectedCategory);

  return (
    <section id="skills" className="py-28 sm:py-36 bg-slate-50/50 border-t border-slate-200/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-indigo-500/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-200 text-xs font-mono font-bold text-indigo-700 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              CORE COMPETENCIES
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Technical Arsenal
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              A comprehensive toolkit spanning full-stack development, applied machine learning, and hardware telemetry.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-xs'
              }`}
            >
              All Skills ({skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)})
            </button>
            {skillCategories.map((cat) => {
              const Icon = categoryIcons[cat.id] || Code2;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-500/20'
                      : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-xs'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories & Skills Display */}
        <div className="space-y-12">
          {filteredCategories.map((cat, catIdx) => {
            const CatIcon = categoryIcons[cat.id] || Code2;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.05, duration: 0.5 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.03)]"
              >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-5 mb-6">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-50 to-cyan-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold shadow-xs">
                      <CatIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-normal">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-indigo-600 font-bold px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 self-start sm:self-auto">
                    {cat.skills.length} TECHNOLOGIES
                  </span>
                </div>

                {/* Skill Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group relative bg-slate-50/70 hover:bg-white rounded-2xl p-4 border border-slate-200/80 hover:border-indigo-400 shadow-xs hover:shadow-[0_15px_30px_rgba(99,102,241,0.1)] transition-all duration-300 hover:-translate-y-1 cursor-default overflow-hidden"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                          {skill.name}
                        </span>
                        <div className="w-5 h-5 rounded-lg bg-white text-slate-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:rotate-12 shadow-xs">
                          <Zap className="w-3 h-3" />
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {skill.desc}
                      </p>

                      <div className="mt-3.5 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-slate-400">LEVEL</span>
                        <span className="text-indigo-600 font-bold">{skill.level}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
