import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, ArrowUpRight, Terminal, Globe, Cpu, CheckCircle, Radio, Activity, ShieldCheck } from 'lucide-react';
import { AnimatedContent, GlareHover } from '../animations/InteractionEffects';
import { DecryptedText } from '../animations/DecryptedText';
import { MagneticButton } from '../animations/MagneticButton';
import { ShinyText } from '../animations/ShinyText';
import { BorderBeam } from '../animations/BorderBeam';
import SignBridgeInteractiveStage from '../ParticleGlobe/SignBridgeInteractiveStage';

export default function Section04SignBridge() {
  return (
    <section
      id="signbridge"
      className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#08090e] text-stone-100 relative overflow-hidden selection:bg-blue-600 selection:text-white"
    >
      {/* Background Cyber Glow & Radial Beams */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Cyber Grid Lines Overlay with subtle pulse */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none opacity-50" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header with Authentic SignBridge Logo */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-16 border-b border-stone-800/80 gap-6">
          <div className="flex items-center gap-5">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative group shrink-0"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-orange-500 opacity-60 blur-md group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="/sign-logo.png"
                alt="SignBridge Official Brand Logo"
                className="relative w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-2xl bg-black p-2 border border-white/20 shadow-2xl"
              />
            </motion.div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase">
                  Section 04 // Founder Venture
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30">
                  LIVE
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans flex items-center gap-2">
                <DecryptedText text="SignBridge" speed={35} maxIterations={12} className="text-white" />
              </h2>
              <p className="text-xs sm:text-sm font-medium text-stone-400">
                Connecting Ideas, Empowering Innovation
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-stone-400 max-w-xs space-y-1 bg-stone-900/60 p-3 rounded-xl border border-stone-800">
            <div className="flex items-center justify-between text-stone-300">
              <span>STATUS:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                OPERATIONAL
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>FOUNDER:</span>
              <span className="text-white font-semibold">Surya V M</span>
            </div>
            <div className="flex items-center justify-between">
              <span>DOMAINS:</span>
              <span className="text-blue-400">signbridge.click</span>
            </div>
          </div>
        </div>

        {/* Large Editorial Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Narrative, Mission, Founder Role */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatedContent delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-700/80 text-xs font-mono font-bold text-blue-300 shadow-[0_0_20px_rgba(37,99,235,0.25)]">
                <Radio className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span>FOUNDER &amp; PRODUCT ARCHITECT</span>
              </div>
            </AnimatedContent>

            <AnimatedContent delay={0.15}>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans">
                A digital product studio &amp; launchpad turning ambitious ideas into reality.
              </h3>
            </AnimatedContent>

            <AnimatedContent delay={0.25}>
              <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-normal">
                SignBridge is my startup and digital product engineering platform focused on turning ambitious ideas into scalable, high-impact software, web applications, and real-world technology solutions.
              </p>
            </AnimatedContent>

            <AnimatedContent delay={0.35}>
              <p className="text-stone-400 text-sm sm:text-base leading-relaxed font-normal">
                Every project under the SignBridge banner is architected with modern reactive frontends, resilient microservices, and continuous cloud deployment, acting as the incubator and launchpad for innovations such as EcoClamp and FarmCargo.
              </p>
            </AnimatedContent>

            {/* Core Values / Architectural Principles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 text-xs hover:border-blue-500 transition-colors group">
                <span className="font-bold text-white block group-hover:text-blue-400 transition-colors">Problem-First</span>
                <span className="text-stone-400 text-[11px] mt-0.5 block">Engineered for real operational friction</span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 text-xs hover:border-orange-500 transition-colors group">
                <span className="font-bold text-white block group-hover:text-orange-400 transition-colors">Production Speed</span>
                <span className="text-stone-400 text-[11px] mt-0.5 block">Rapid shipping with clean maintainable code</span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 text-xs hover:border-cyan-500 transition-colors group">
                <span className="font-bold text-white block group-hover:text-cyan-400 transition-colors">Full Ownership</span>
                <span className="text-stone-400 text-[11px] mt-0.5 block">From architectural design to edge deploy</span>
              </div>
            </div>

            {/* Action Link Button with MagneticButton */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="https://signbridge.click/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MagneticButton
                  pullStrength={0.4}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-sans text-sm font-bold tracking-tight shadow-xl shadow-blue-600/30 inline-flex items-center gap-2 group cursor-pointer border border-blue-400/20"
                >
                  <span>Explore SignBridge Live</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </MagneticButton>
              </a>

              <a
                href="https://signbridge.click/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-stone-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>signbridge.click</span>
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Artwork & Console featuring Original Logo */}
          <div className="lg:col-span-6">
            <AnimatedContent delay={0.2} yOffset={24}>
              <GlareHover maxTilt={6} className="rounded-3xl border border-stone-800/90 shadow-2xl p-2 bg-gradient-to-b from-stone-900/90 to-black/90 backdrop-blur-xl relative overflow-hidden">
                <BorderBeam size={280} duration={8} borderWidth={2} colorFrom="#2563eb" colorTo="#ea580c" />
                <div className="relative w-full rounded-2xl overflow-hidden bg-[#0c0e14] border border-white/5 p-6 sm:p-8 flex flex-col justify-between min-h-[380px]">
                  
                  {/* Top HUD Readouts */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-stone-300 font-bold">SIGNBRIDGE TELEMETRY</span>
                    </div>
                    <span className="text-stone-400">EDGE RUNTIME // V2.4</span>
                  </div>

                  {/* Centered 3D Interactive Particle Morphing Stage */}
                  <div className="py-2 flex flex-col items-center justify-center text-center relative">
                    {/* Glowing backlight aura matching bridge brand colors */}
                    <div className="absolute w-52 h-52 rounded-full bg-gradient-to-tr from-blue-600/30 to-orange-500/30 blur-3xl pointer-events-none" />

                    <div className="relative z-10 w-full rounded-2xl bg-black/60 border border-white/10 shadow-[0_0_50px_rgba(37,99,235,0.25)] backdrop-blur-md overflow-hidden">
                      <SignBridgeInteractiveStage compact={true} />
                    </div>

                    <p className="mt-3 text-[11px] font-mono text-stone-300 font-semibold tracking-wider uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" />
                      <span>Connecting Ideas · Empowering Innovation</span>
                    </p>
                  </div>

                  {/* Bottom Stats Footer */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center font-mono">
                    <div className="p-2 rounded-lg bg-white/[0.03]">
                      <span className="text-[10px] text-stone-400 block">DEPLOYMENT</span>
                      <span className="text-xs font-bold text-white">Edge CDN</span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/[0.03]">
                      <span className="text-[10px] text-stone-400 block">UPTIME</span>
                      <span className="text-xs font-bold text-emerald-400">99.98%</span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/[0.03]">
                      <span className="text-[10px] text-stone-400 block">FRAMEWORK</span>
                      <span className="text-xs font-bold text-blue-400">React + Vite</span>
                    </div>
                  </div>

                </div>
              </GlareHover>
            </AnimatedContent>
          </div>

        </div>

      </div>
    </section>
  );
}

