import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Lightbulb, Compass, Zap } from 'lucide-react';
import { AnimatedContent } from '../animations/InteractionEffects';
import { BlurText } from '../animations/TypographyEffects';
import { ShinyText } from '../animations/ShinyText';
import { MagneticButton } from '../animations/MagneticButton';
import { SpotlightCard } from '../animations/SpotlightCard';
import { playHoverSound } from '../../lib/soundFx';

export default function Section08Vision() {
  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="vision"
      className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#fafaf8] border-t border-stone-200/80 relative overflow-hidden"
    >
      {/* Subtle Warm Gradient Backdrops with Fluid Float */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-blue-500/10 via-amber-500/10 to-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-float-slow" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        
        {/* Section Pill */}
        <AnimatedContent delay={0.05}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200/90 text-xs font-mono font-bold text-stone-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <span>SECTION 08 // FORWARD HORIZON</span>
          </div>
        </AnimatedContent>

        {/* Oversized Quote Heading with ShinyText */}
        <AnimatedContent delay={0.15}>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-950 tracking-tight leading-[1.08] font-sans">
            <ShinyText className="text-stone-950">
              “I'm interested in what we can build next.”
            </ShinyText>
          </h2>
        </AnimatedContent>

        {/* Vision Narrative */}
        <AnimatedContent delay={0.25}>
          <div className="space-y-4 max-w-2xl mx-auto text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
            <p>
              Technology creates enduring impact when engineering rigor meets entrepreneurial conviction. I am drawn to solving genuine operational bottlenecks, engineering edge telemetry systems that make industrial machines intelligent, and deploying software tools that streamline critical workflows.
            </p>
            <p className="text-stone-800 font-medium">
              Whether building autonomous predictive models, innovating hardware prototypes, or launching ventures under SignBridge, my compass remains constant: ship pragmatic products that work reliably in the real world.
            </p>
          </div>
        </AnimatedContent>

        {/* Three Horizon Pillars wrapped in SpotlightCard */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-left">
          <SpotlightCard
            spotlightColor="rgba(0, 102, 255, 0.12)"
            borderColor="rgba(0, 102, 255, 0.35)"
            className="p-5 hover:-translate-y-1 transition-transform"
          >
            <div className="text-xs font-mono font-bold text-blue-600 mb-1">01. INTELLIGENT SYSTEMS</div>
            <div className="text-sm font-bold text-stone-900 mb-1">Autonomous Edge AI</div>
            <div className="text-xs text-stone-500">Quantized on-chip models running predictive inference directly on low-power microcontrollers.</div>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.12)"
            borderColor="rgba(245, 158, 11, 0.35)"
            className="p-5 hover:-translate-y-1 transition-transform"
          >
            <div className="text-xs font-mono font-bold text-amber-600 mb-1">02. INDUSTRIAL RESILIENCE</div>
            <div className="text-sm font-bold text-stone-900 mb-1">Real-World Telemetry</div>
            <div className="text-xs text-stone-500">Non-invasive sensor frameworks preventing physical equipment failure across production lines.</div>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.12)"
            borderColor="rgba(16, 185, 129, 0.35)"
            className="p-5 hover:-translate-y-1 transition-transform"
          >
            <div className="text-xs font-mono font-bold text-emerald-600 mb-1">03. VENTURE CREATION</div>
            <div className="text-sm font-bold text-stone-900 mb-1">SignBridge Initiatives</div>
            <div className="text-xs text-stone-500">Incubating accessible, high-velocity digital products solving tangible problems for real users.</div>
          </SpotlightCard>
        </div>

        {/* CTA to Contact with MagneticButton */}
        <AnimatedContent delay={0.35}>
          <div className="pt-4 flex justify-center">
            <MagneticButton
              onClick={handleScrollToContact}
              pullStrength={0.4}
              className="px-8 py-3.5 rounded-full bg-stone-950 hover:bg-blue-600 text-white font-sans text-sm font-bold tracking-tight inline-flex items-center gap-2 shadow-lg hover:shadow-blue-500/30 cursor-pointer transition-all"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </AnimatedContent>

      </div>
    </section>
  );
}
