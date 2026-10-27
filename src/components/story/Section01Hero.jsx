import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Sparkles, Send, Compass, Cpu, Zap, Activity } from 'lucide-react';
import { SplitText, BlurText, TextLoop } from '../animations/TypographyEffects';
import { AnimatedContent } from '../animations/InteractionEffects';
import { DecryptedText } from '../animations/DecryptedText';
import { ShinyText } from '../animations/ShinyText';
import { MagneticButton } from '../animations/MagneticButton';
import { NumberTicker } from '../animations/NumberTicker';
import { InteractiveGridBackground } from '../animations/InteractiveGridBackground';
import { VelocityMarquee } from '../animations/VelocityMarquee';
import { BorderBeam } from '../animations/BorderBeam';
import { playHoverSound } from '../../lib/soundFx';

export default function Section01Hero() {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const marqueeKeywords = [
    'AI & ML ENGINEER',
    'FULL-STACK ARCHITECT',
    'ESP32 AIoT HARDWARE',
    'STARTUP FOUNDER (SIGNBRIDGE)',
    'REACT 19 & NEXT.JS',
    'PREDICTIVE PROCUREMENT',
    'INDUSTRIAL VIBRATION FFT',
    'NODE.JS & PYTHON',
    'AUTONOMOUS EDGE SYSTEMS',
  ];

  return (
    <div className="flex flex-col w-full">
      <section
        id="hero"
        className="relative min-h-[92vh] pt-24 pb-14 sm:pb-20 px-6 sm:px-10 lg:px-16 flex flex-col justify-between overflow-hidden bg-[#fafaf8]"
      >
        {/* 1. FreeFrontend Interactive Canvas Particle Grid */}
        <InteractiveGridBackground dotColor="rgba(0, 102, 255, 0.28)" lineColor="rgba(0, 102, 255, 0.14)" particleCount={48} />

        {/* Ambient Animated Fluid Aurora Blobs */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/15 to-cyan-400/15 rounded-full blur-[130px] pointer-events-none animate-float-slow" />
        <div className="absolute bottom-1/4 -right-20 w-[550px] h-[550px] bg-gradient-to-tr from-amber-500/12 to-orange-400/10 rounded-full blur-[130px] pointer-events-none animate-float-slow" style={{ animationDelay: '-7s' }} />

        {/* Main Content Container */}
        <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center relative z-10 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Editorial Headline & Manifesto */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              
              {/* Top Pill Status Badge */}
              <AnimatedContent delay={0.05} yOffset={12}>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/90 text-xs font-mono font-medium text-stone-800 shadow-xs hover:border-blue-400 transition-colors">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                  </span>
                  <span className="tracking-wide text-stone-700 font-semibold">
                    TAMIL NADU, INDIA · <span className="text-blue-600">OPEN FOR PROJECTS</span>
                  </span>
                </div>
              </AnimatedContent>

              {/* Oversized Editorial Name with DecryptedText Scramble Animation! */}
              <div className="space-y-3">
                <div className="text-4xl sm:text-7xl lg:text-8xl font-black text-stone-950 tracking-tighter leading-[0.95] font-sans">
                  <DecryptedText
                    text="SURYA V M"
                    speed={35}
                    maxIterations={12}
                    className="font-black text-stone-950 font-sans tracking-tighter hover:text-blue-600 transition-colors"
                  />
                </div>

                {/* Roles Subtitle with ShinyText & TextLoop */}
                <div className="text-base sm:text-xl font-medium text-stone-600 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <ShinyText className="font-semibold text-stone-900">
                    Creative Developer ·
                  </ShinyText>
                  <TextLoop
                    items={[
                      'AI & ML Engineer',
                      'Startup Founder',
                      'AIoT Systems Builder',
                      'Full-Stack Developer'
                    ]}
                    interval={2800}
                  />
                </div>
              </div>

              {/* Core Manifesto Quote with BlurText */}
              <div className="border-l-3 border-blue-600 pl-5 sm:pl-6 space-y-2 bg-gradient-to-r from-blue-50/40 to-transparent py-2 rounded-r-2xl">
                <blockquote className="text-xl sm:text-2xl font-medium text-stone-900 tracking-tight leading-snug">
                  <BlurText
                    text="“I turn ideas into meaningful products through code, experimentation, and entrepreneurship.”"
                    duration={0.7}
                  />
                </blockquote>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal pt-1">
                  Engineering full-stack software, machine learning predictive models, and physical AIoT hardware prototypes from Tamil Nadu, India. Founder of SignBridge.
                </p>
              </div>

              {/* Magnetic Action Buttons (React Bits) with tactile micro sound */}
              <AnimatedContent delay={0.25} yOffset={15}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div onMouseEnter={() => playHoverSound()}>
                    <MagneticButton
                      onClick={() => handleScrollTo('projects')}
                      pullStrength={0.4}
                      className="px-7 py-3.5 rounded-full bg-stone-950 hover:bg-blue-600 text-white font-sans text-sm font-bold tracking-tight shadow-lg shadow-stone-900/15 hover:shadow-blue-500/30 flex items-center gap-2 group cursor-pointer"
                    >
                      <span>Explore My Work</span>
                      <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                    </MagneticButton>
                  </div>

                  <div onMouseEnter={() => playHoverSound()}>
                    <MagneticButton
                      onClick={() => handleScrollTo('contact')}
                      pullStrength={0.35}
                      className="px-7 py-3.5 rounded-full bg-white hover:bg-stone-50 text-stone-900 border border-stone-200/90 font-sans text-sm font-bold tracking-tight shadow-xs hover:border-blue-400 flex items-center gap-2 group cursor-pointer"
                    >
                      <span>Let's Connect</span>
                      <Send className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </MagneticButton>
                  </div>
                </div>
              </AnimatedContent>

              {/* Interactive Telemetry Counters (NumberTicker) */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200/70 max-w-lg font-mono text-xs">
                <div className="p-2.5 rounded-xl bg-white/70 backdrop-blur-sm border border-stone-200/60 hover:border-blue-400 transition-colors">
                  <span className="block text-stone-400 text-[10px] uppercase tracking-wider font-semibold">EDUCATION</span>
                  <div className="text-sm font-bold text-stone-900 mt-0.5">
                    MKCE '<NumberTicker value={29} duration={1.5} />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/70 backdrop-blur-sm border border-stone-200/60 hover:border-blue-400 transition-colors">
                  <span className="block text-stone-400 text-[10px] uppercase tracking-wider font-semibold">EDGE SAMPLING</span>
                  <div className="text-sm font-bold text-blue-600 mt-0.5">
                    <NumberTicker value={10} duration={1.2} suffix=" kHz" />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/70 backdrop-blur-sm border border-stone-200/60 hover:border-blue-400 transition-colors">
                  <span className="block text-stone-400 text-[10px] uppercase tracking-wider font-semibold">ANOMALY EARLY</span>
                  <div className="text-sm font-bold text-amber-600 mt-0.5">
                    <NumberTicker value={48} duration={1.3} suffix="h Alert" />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Editorial Portrait Showcase with Laser BorderBeam */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[340px] sm:max-w-[380px]"
              >
                {/* Glowing border ring with animated continuous laser */}
                <div className="relative rounded-3xl overflow-hidden bg-white border border-stone-200/90 shadow-2xl p-2.5 group">
                  <BorderBeam size={220} duration={9} borderWidth={2} colorFrom="#2563eb" colorTo="#06b6d4" />
                  
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-950">
                    <img
                      src="/surya.jpeg"
                      alt="Surya V M — Creative Developer & Founder"
                      className="w-full h-full object-cover object-center filter contrast-[1.08] saturate-[1.05] group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Scrim with telemetry readout */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-stone-950/95 via-stone-950/50 to-transparent flex flex-col justify-end p-5 text-white">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-amber-400 font-bold uppercase mb-0.5">
                        <Activity className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                        <span>BUILDER TELEMETRY</span>
                      </div>
                      <span className="text-sm font-semibold tracking-tight text-white/95">
                        Surya V M · Tamil Nadu
                      </span>
                    </div>
                  </div>

                  {/* Floating Micro Status Pill */}
                  <div className="absolute -bottom-3 -right-3 bg-white border border-stone-200/90 rounded-2xl py-2 px-3.5 shadow-xl flex items-center gap-2 text-stone-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
                    <span className="text-xs font-mono font-bold tracking-tight">CLASS OF 2029</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Bottom Section Jump Link */}
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between text-xs font-mono text-stone-400 pt-6 border-t border-stone-200/60 mt-auto">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="font-semibold text-stone-600">ONE CONTINUOUS STORY · SCROLL DOWN</span>
          </div>
          <button
            onClick={() => handleScrollTo('about')}
            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer font-bold"
          >
            <span>Section 02 — About Me</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </section>

      {/* Kinetic Technology Marquee Ribbon (React Bits Velocity Marquee) */}
      <div className="w-full bg-stone-100/80 border-y border-stone-200/80">
        <VelocityMarquee items={marqueeKeywords} speed={25} direction="left" />
      </div>
    </div>
  );
}
