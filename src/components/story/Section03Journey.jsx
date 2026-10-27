import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Rocket, Cpu, Layers, Sparkles, Terminal } from 'lucide-react';
import { AnimatedContent } from '../animations/InteractionEffects';
import { SpotlightCard } from '../animations/SpotlightCard';
import { DecryptedText } from '../animations/DecryptedText';

const milestones = [
  {
    year: '2026',
    role: 'Founder & Venture Architect',
    initiative: 'SignBridge Ecosystem & Digital Products',
    summary: 'Directing the technical vision, product architecture, and deployment of SignBridge (signbridge.click) as an agile startup platform incubating practical software and IoT initiatives.',
    tags: ['Startup Founder', 'Product Architecture', 'React', 'Node.js', 'Cloudflare'],
    icon: Rocket,
    color: 'bg-blue-500',
    spotlight: 'rgba(0, 102, 255, 0.12)',
  },
  {
    year: '2026',
    role: 'AIoT & Edge Hardware Engineer',
    initiative: 'EcoClamp — Machine Energy & Harmonic Intelligence',
    summary: 'Engineered non-invasive current transformer (SCT-013) and 3-axis vibration (MPU6050) edge telemetry on dual-core ESP32 to compute mechanical baselines and forecast industrial motor failure.',
    tags: ['ESP32', 'C++ / FreeRTOS', 'TinyML', 'Vibration FFT', 'Supabase'],
    icon: Cpu,
    color: 'bg-amber-500',
    spotlight: 'rgba(245, 158, 11, 0.12)',
  },
  {
    year: '2026',
    role: 'Predictive Systems Developer',
    initiative: 'FarmCargo — Agricultural Intake Operations',
    summary: 'Designed an agricultural procurement operations platform forecasting crop arrival windows and balancing intake across regional receiving centres with offline-first PWA synchronization.',
    tags: ['Python Analytics', 'Time-Series', 'Offline IndexedDB', 'Logistics AI'],
    icon: Sparkles,
    color: 'bg-emerald-500',
    spotlight: 'rgba(16, 185, 129, 0.12)',
  },
  {
    year: 'Foundations',
    role: 'Self-Driven Systems Explorer',
    initiative: 'Core Programming, Hardware & Algorithms',
    summary: 'Mastered low-level programming in C, object-oriented systems in Java, algorithmic scripting in Python, modern web frontends, and microcontroller circuit design through relentless hands-on building.',
    tags: ['C', 'Java', 'Python', 'Microcontrollers', 'Algorithms'],
    icon: Terminal,
    color: 'bg-purple-500',
    spotlight: 'rgba(147, 51, 234, 0.12)',
  },
];

export default function Section03Journey() {
  return (
    <section
      id="journey"
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#fbfbf9] border-t border-stone-200/80 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-16 border-b border-stone-200/80 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">
              Section 03 // Progression
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-950 tracking-tight font-sans">
              <DecryptedText text="My Journey" speed={30} maxIterations={10} />
            </h2>
          </div>
          <p className="text-sm font-mono text-stone-500 max-w-xs">
            FROM CORE CODE TO FIELD-DEPLOYED ARCHITECTURES
          </p>
        </div>

        {/* Vertical Timeline with animated glowing line & traveling laser pulse */}
        <div className="relative pl-6 sm:pl-10 space-y-12">
          {/* Base track */}
          <div className="absolute left-3 sm:left-5 top-2 bottom-2 w-0.5 bg-stone-200" />
          {/* Glowing gradient track */}
          <div className="absolute left-3 sm:left-5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-600 via-amber-500 to-purple-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
          {/* Continuous Traveling Laser Runner */}
          <motion.div
            animate={{ top: ['0%', '90%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="absolute left-[11px] sm:left-[19px] w-1 h-20 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_14px_#06b6d4] pointer-events-none rounded-full z-0"
          />

          {milestones.map((milestone, idx) => {
            const Icon = milestone.icon;

            return (
              <AnimatedContent key={milestone.initiative} delay={idx * 0.12} yOffset={20}>
                <div className="relative group">
                  {/* Glowing Node Icon Indicator with Radar Wave */}
                  <div className="absolute -left-[30px] sm:-left-[46px] top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border-2 border-stone-300 group-hover:border-blue-600 flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-125 z-10">
                    <span className={`w-2 h-2 rounded-full ${milestone.color} animate-pulse`} />
                    <span className={`absolute -inset-1.5 rounded-full ${milestone.color} opacity-25 animate-ping`} />
                  </div>

                  {/* Main Card with SpotlightCard Effect */}
                  <SpotlightCard
                    spotlightColor={milestone.spotlight}
                    borderColor="rgba(0, 102, 255, 0.4)"
                    className="p-6 sm:p-8 hover:-translate-y-1.5 transition-all duration-300 shadow-xs hover:shadow-xl hover:border-blue-300"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-stone-900 bg-stone-100 px-3 py-1 rounded-full border border-stone-200/80">
                          {milestone.year}
                        </span>
                        <span className="text-xs font-mono font-semibold text-blue-600">
                          {milestone.role}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-2.5">
                      {milestone.initiative.includes('SignBridge') && (
                        <img
                          src="/sign-logo.png"
                          alt="SignBridge Logo"
                          className="w-7 h-7 sm:w-8 sm:h-8 object-contain rounded-lg bg-black p-1 shadow-sm shrink-0 border border-stone-200"
                        />
                      )}
                      <h3 className="text-xl sm:text-2xl font-bold text-stone-950 tracking-tight font-sans">
                        {milestone.initiative}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal mb-5">
                      {milestone.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-100">
                      {milestone.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-mono text-stone-600 bg-stone-50 rounded-lg border border-stone-200/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                </div>
              </AnimatedContent>
            );
          })}
        </div>

      </div>
    </section>
  );
}
