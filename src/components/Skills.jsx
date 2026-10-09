import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../data/skillsData';
import { 
  Code2, Server, Database, Sparkles, Cpu, Wrench, 
  Layers, Terminal, Shield, Zap, Globe, HardDrive, CheckCircle2
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
    <section id="skills" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-iris-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-iris-100/80 border border-iris-300 text-xs font-mono font-bold text-iris-900 shadow-iris-sm">
              <span className="w-2 h-2 rounded-full bg-iris-600"></span>
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
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-iris-600 to-indigo-600 text-white shadow-iris'
                  : 'bg-iris-50 text-iris-800 hover:bg-iris-100 border border-iris-200'
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
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-1.5 transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-iris-600 text-white shadow-iris-sm font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
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
                className="bg-surface-subtle rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs"
              >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-iris-100/70 text-iris-700 flex items-center justify-center font-bold">
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
                  <span className="text-[11px] font-mono text-iris-600 font-semibold px-2.5 py-1 rounded bg-white border border-iris-200 self-start sm:self-auto">
                    {cat.skills.length} TECHNOLOGIES
                  </span>
                </div>

                {/* Skill Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group relative bg-white rounded-2xl p-4 border-2 border-iris-200/80 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-iris-500 hover:shadow-iris cursor-default overflow-hidden"
                    >
                      {/* Subtle Iris hover glow background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-iris-100/60 via-iris-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      <div className="flex items-start justify-between mb-2">
                        <span className="font-bold text-slate-900 text-sm group-hover:text-iris-800 transition-colors">
                          {skill.name}
                        </span>
                        <div className="w-5 h-5 rounded-lg bg-iris-50 text-iris-500 flex items-center justify-center group-hover:bg-iris-600 group-hover:text-white transition-all transform group-hover:rotate-12">
                          <Zap className="w-3 h-3" />
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                        {skill.desc}
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-iris-100 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-slate-400">LEVEL</span>
                        <span className="text-iris-700 font-bold">{skill.level}</span>
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
