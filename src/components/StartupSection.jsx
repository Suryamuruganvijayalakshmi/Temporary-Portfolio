import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, ArrowRight, ShieldCheck, Globe, Rocket, CheckCircle } from 'lucide-react';

export default function StartupSection() {
  return (
    <section className="py-28 sm:py-36 bg-slate-50/50 border-t border-slate-200/80 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] relative overflow-hidden">
          {/* Subtle decorative gradient blur */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-8 max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-mono font-bold text-indigo-700 shadow-xs">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>STARTUP VENTURE & PRODUCT VISION</span>
            </div>

            {/* Core Philosophy Heading */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Building Beyond Code.
              </h2>
              <div className="space-y-2 text-slate-700 text-lg sm:text-xl font-medium leading-relaxed">
                <p>
                  "I'm not interested in writing code just for the sake of writing code.
                </p>
                <p className="text-indigo-600 font-bold">
                  I want to build products that solve meaningful problems."
                </p>
              </div>
            </div>

            {/* SignBridge Feature Card */}
            <div className="bg-slate-50/70 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      SIGNBRIDGE
                    </h3>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  </div>
                  <div className="text-xs font-mono font-semibold text-slate-500 mt-0.5">
                    Software • Innovation • Products
                  </div>
                </div>

                <div className="flex flex-col sm:items-end">
                  <span className="text-xs font-mono font-bold text-indigo-700 bg-white px-3.5 py-1.5 rounded-full border border-indigo-200 shadow-xs">
                    Founder & CEO — SignBridge
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1 font-mono">
                    Bootstrapped Platform
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                SignBridge is my primary technology venture designed to build and incubate pragmatic software solutions, digital accessibility innovations, and high-impact web products. Everything engineered under SignBridge focuses on user empowerment, frictionless design, and modern system architectures.
              </p>

              {/* Founder Credo / Values */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 bg-white rounded-xl border border-slate-200/70 shadow-xs">
                  <div className="text-xs font-bold text-slate-900">Problem-First</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Driven by actual friction points</div>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-slate-200/70 shadow-xs">
                  <div className="text-xs font-bold text-slate-900">Production Velocity</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Rapid iteration with zero bloat</div>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-slate-200/70 shadow-xs">
                  <div className="text-xs font-bold text-slate-900">Full Autonomy</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Concept to live server deployment</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="https://signbridge.click/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold text-sm sm:text-base shadow-md shadow-indigo-500/25 transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  <span>Visit SignBridge</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <span className="text-xs font-mono text-slate-500">
                  Live platform: <a href="https://signbridge.click/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-semibold">https://signbridge.click/</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
