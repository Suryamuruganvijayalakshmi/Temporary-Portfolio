import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Sparkles, Cpu, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { AnimatedContent } from '../animations/InteractionEffects';
import { BlurText } from '../animations/TypographyEffects';
import { SpotlightCard } from '../animations/SpotlightCard';
import { DecryptedText } from '../animations/DecryptedText';

const pillars = [
  {
    icon: Layers,
    title: 'Full-Stack Software',
    desc: 'Engineering reactive React frontends, robust Node.js microservices, and reliable relational databases designed for production velocity.',
    accent: 'text-blue-600',
    bg: 'bg-blue-50',
    spotlight: 'rgba(0, 102, 255, 0.14)',
  },
  {
    icon: Sparkles,
    title: 'AI & Predictive Systems',
    desc: 'Translating mathematical models into practical tools: machinery anomaly forecasting, arrival intelligence, and LLM integrations.',
    accent: 'text-purple-600',
    bg: 'bg-purple-50',
    spotlight: 'rgba(147, 51, 234, 0.14)',
  },
  {
    icon: Cpu,
    title: 'AIoT & Edge Hardware',
    desc: 'Designing non-invasive sensor pods on dual-core ESP32 microcontrollers with real-time CT current analysis and vibration FFTs.',
    accent: 'text-emerald-600',
    bg: 'bg-emerald-50',
    spotlight: 'rgba(16, 185, 129, 0.14)',
  },
  {
    icon: Globe,
    title: 'Venture Engineering',
    desc: 'Founding SignBridge (signbridge.click) to build practical, field-deployable products that solve real friction rather than theoretical prototypes.',
    accent: 'text-amber-600',
    bg: 'bg-amber-50',
    spotlight: 'rgba(245, 158, 11, 0.14)',
  },
];

export default function Section02About() {
  return (
    <section
      id="about"
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-white border-t border-stone-200/80 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Index Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-16 border-b border-stone-200/80 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">
              Section 02 // Identity
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-950 tracking-tight font-sans">
              <DecryptedText text="About Surya V M" speed={30} maxIterations={10} />
            </h2>
          </div>
          <p className="text-sm font-mono text-stone-500 max-w-xs">
            CREATIVE DEVELOPER · AI &amp; ML SPECIALIST · FOUNDER
          </p>
        </div>

        {/* Spacious Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Natural Narrative */}
          <div className="lg:col-span-7 space-y-6 text-stone-700 text-base sm:text-lg leading-relaxed">
            <AnimatedContent delay={0.05}>
              <p className="text-2xl sm:text-3xl font-semibold text-stone-950 tracking-tight leading-snug">
                I build at the intersection of full-stack software, machine intelligence, and physical hardware.
              </p>
            </AnimatedContent>

            <AnimatedContent delay={0.15}>
              <p>
                Based in Tamil Nadu, India, I am currently pursuing my B.E. in Computer Science and Engineering (Artificial Intelligence and Machine Learning) at <span className="font-semibold text-stone-950">M. Kumarasamy College of Engineering</span> (Class of 2029).
              </p>
            </AnimatedContent>

            <AnimatedContent delay={0.25}>
              <p>
                My passion began with understanding computers at the bare metal: writing low-level code in C, debugging circuits, and controlling microcontrollers. As I expanded into full-stack web architectures and machine learning, I recognized that software creates the greatest value when it steps out of the abstract and operates reliably in the real world.
              </p>
            </AnimatedContent>

            <AnimatedContent delay={0.35}>
              <p>
                To me, engineering is not about accumulating buzzwords or stopping at theoretical research papers. Whether it's architecting <span className="font-semibold text-stone-950">EcoClamp</span> (a non-invasive AIoT clamp monitoring industrial motor health), conceptualizing <span className="font-semibold text-stone-950">FarmCargo</span> (predictive agricultural procurement), or founding <span className="font-semibold text-blue-600">SignBridge</span>, I take complete responsibility from initial concept and system architecture to live production deployment.
              </p>
            </AnimatedContent>

            {/* Core Verification Pill Box */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center gap-2.5 hover:border-emerald-500 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>MKCE AI &amp; ML (2025–2029)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center gap-2.5 hover:border-emerald-500 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Founder of SignBridge</span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center gap-2.5 hover:border-emerald-500 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>AIoT Hardware &amp; ESP32</span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center gap-2.5 hover:border-emerald-500 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Author &amp; Published Researcher</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Telemetry & Four Spotlight Cards */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono font-bold tracking-wider text-stone-400 uppercase block mb-2">
              CORE DISCIPLINES (INTERACTIVE SPOTLIGHT)
            </span>

            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <AnimatedContent key={pillar.title} delay={idx * 0.08} yOffset={16}>
                  <SpotlightCard
                    spotlightColor={pillar.spotlight}
                    borderColor="rgba(0, 102, 255, 0.45)"
                    className="p-5 hover:-translate-y-1 transition-transform"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-9 h-9 rounded-xl ${pillar.bg} ${pillar.accent} flex items-center justify-center font-bold shadow-xs`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-stone-900 text-base tracking-tight font-sans">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </SpotlightCard>
                </AnimatedContent>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
