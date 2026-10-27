import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Server, Database, Sparkles, Cpu, Wrench, CheckCircle2 } from 'lucide-react';
import { AnimatedContent } from '../animations/InteractionEffects';
import { SpotlightCard } from '../animations/SpotlightCard';
import { DecryptedText } from '../animations/DecryptedText';
import { playChime } from '../../lib/soundFx';

const skillGroups = [
  {
    category: 'Programming Languages',
    icon: Code2,
    accent: 'text-blue-600 bg-blue-50 border-blue-200',
    skills: [
      { name: 'C', note: 'Low-level systems & memory', level: 90 },
      { name: 'Python', note: 'AI/ML, analytics & automation', level: 95 },
      { name: 'Java', note: 'Object-oriented architecture', level: 88 },
      { name: 'JavaScript (ES6+)', note: 'Modern asynchronous web', level: 96 },
      { name: 'TypeScript', note: 'Typed interfaces & schemas', level: 90 },
    ],
  },
  {
    category: 'Frontend Engineering',
    icon: Code2,
    accent: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    skills: [
      { name: 'React.js (React 19)', note: 'Concurrent mode & hooks', level: 98 },
      { name: 'Next.js', note: 'SSR & edge rendering', level: 92 },
      { name: 'Tailwind CSS', note: 'Modern utility styling', level: 95 },
      { name: 'HTML5 & CSS3', note: 'Semantic accessibility & grid', level: 98 },
      { name: 'Framer Motion', note: 'Micro-interactions & transitions', level: 92 },
      { name: 'Vite', note: 'Rapid HMR & build optimization', level: 95 },
    ],
  },
  {
    category: 'Backend & APIs',
    icon: Server,
    accent: 'text-purple-600 bg-purple-50 border-purple-200',
    skills: [
      { name: 'Node.js', note: 'Event-driven runtime & streams', level: 94 },
      { name: 'Express.js', note: 'RESTful API pipelines', level: 92 },
      { name: 'Python FastAPI', note: 'High-speed async endpoints', level: 89 },
      { name: 'REST Architecture', note: 'Resource modeling & idempotency', level: 95 },
      { name: 'JWT & Security', note: 'Stateless auth & authorization', level: 90 },
    ],
  },
  {
    category: 'AI / ML & Intelligence',
    icon: Sparkles,
    accent: 'text-amber-600 bg-amber-50 border-amber-200',
    skills: [
      { name: 'Machine Learning', note: 'Supervised & unsupervised models', level: 90 },
      { name: 'Predictive Analytics', note: 'Time-series arrival forecasting', level: 92 },
      { name: 'TinyML (Planned)', note: 'Quantized edge inference on MCUs', level: 84 },
      { name: 'AI APIs & LLMs', note: 'Prompt architecture & embeddings', level: 94 },
      { name: 'Anomaly Detection', note: 'Harmonic distortion & baseline profiling', level: 91 },
    ],
  },
  {
    category: 'IoT & Embedded Systems',
    icon: Cpu,
    accent: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    skills: [
      { name: 'ESP32 Microcontrollers', note: 'Dual-core FreeRTOS firmware', level: 95 },
      { name: 'CT Current Sensors (SCT-013)', note: 'Non-invasive power analysis', level: 92 },
      { name: 'MPU6050 (6-DoF)', note: '3-axis vibration FFT & I2C bus', level: 93 },
      { name: 'DS18B20 & Thermistors', note: '1-Wire digital temperature monitoring', level: 90 },
      { name: 'Hardware Telemetry', note: 'MQTT & edge-to-cloud streams', level: 92 },
    ],
  },
  {
    category: 'Database & Cloud Tools',
    icon: Database,
    accent: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    skills: [
      { name: 'PostgreSQL', note: 'Relational modeling & ACID integrity', level: 92 },
      { name: 'Supabase', note: 'Postgres backend & realtime streams', level: 94 },
      { name: 'MongoDB', note: 'Document schema design', level: 88 },
      { name: 'Git & GitHub', note: 'Version control & CI/CD workflows', level: 96 },
      { name: 'Vercel & Cloudflare', note: 'Serverless edge hosting & DNS', level: 95 },
    ],
  },
];

export default function Section06Skills() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleFilterChange = (id) => {
    setSelectedFilter(id);
    playChime(620, 'sine', 0.08, 0.02);
  };

  const displayedGroups = selectedFilter === 'all'
    ? skillGroups
    : skillGroups.filter(g => g.category.toLowerCase().includes(selectedFilter));

  return (
    <section
      id="skills"
      className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#fbfbf9] border-t border-stone-200/80 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-16 border-b border-stone-200/80 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">
              Section 06 // Capabilities
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-950 tracking-tight font-sans">
              <DecryptedText text="Technical Skills" speed={30} maxIterations={10} />
            </h2>
          </div>
          <p className="text-xs font-mono text-stone-500 max-w-xs">
            TYPOGRAPHY-LED ARSENAL · VERIFIED PRACTICAL COMPETENCIES
          </p>
        </div>

        {/* Filter Badges with Spring Motion - Scrollable on mobile */}
        <div className="flex gap-2 mb-8 sm:mb-12 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap -mx-6 px-6 sm:mx-0 sm:px-0">
          {[
            { id: 'all', label: 'All Disciplines' },
            { id: 'programming', label: 'Languages' },
            { id: 'frontend', label: 'Frontend' },
            { id: 'backend', label: 'Backend' },
            { id: 'intelligence', label: 'AI / ML' },
            { id: 'embedded', label: 'IoT & Hardware' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => handleFilterChange(f.id)}
              className={`relative px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer shrink-0 whitespace-nowrap active:scale-95 ${
                selectedFilter === f.id
                  ? 'text-white'
                  : 'text-stone-700 hover:text-stone-950 border border-stone-200/80 hover:border-stone-300 bg-white'
              }`}
            >
              {selectedFilter === f.id && (
                <motion.div
                  layoutId="activeSkillFilter"
                  className="absolute inset-0 bg-stone-950 rounded-full -z-10 shadow-sm"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              {f.label}
            </button>
          ))}
        </div>

        {/* Skills Grid with SpotlightCard & Fluid Layout Transitions */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {displayedGroups.map((group, idx) => {
              const Icon = group.icon;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  key={group.category}
                >
                  <SpotlightCard
                    spotlightColor="rgba(0, 102, 255, 0.12)"
                    borderColor="rgba(0, 102, 255, 0.4)"
                    className="h-full p-6 sm:p-7 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:border-blue-300"
                  >
                    <div>
                      {/* Category Title */}
                      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-stone-100">
                        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${group.accent}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-stone-900 text-base tracking-tight font-sans">
                          {group.category}
                        </h3>
                      </div>

                      {/* Skill List with Context Notes & Micro Progress Line */}
                      <div className="space-y-3.5">
                        {group.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className="group/item flex flex-col p-2.5 rounded-xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-200/60"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono text-xs font-bold text-stone-900 group-hover/item:text-blue-600 transition-colors">
                                {skill.name}
                              </span>
                              <span className="text-[10px] font-mono font-semibold text-stone-400 group-hover/item:text-blue-600 transition-colors">
                                {skill.level}%
                              </span>
                            </div>
                            <span className="text-[11px] text-stone-500 font-sans">
                              {skill.note}
                            </span>
                            {/* Subtle Animated Progress Track */}
                            <div className="w-full h-1 bg-stone-100 rounded-full mt-2 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-400">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        {group.skills.length} VERIFIED SKILLS
                      </span>
                      <span className="text-blue-600 font-bold">PROFICIENT</span>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
