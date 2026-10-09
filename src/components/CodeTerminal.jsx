import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ExternalLink, Play, Copy, Check, Code2 } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

const techBadges = [
  { name: 'React', desc: 'Modern component architecture' },
  { name: 'Node.js', desc: 'Event-driven backend services' },
  { name: 'Python', desc: 'Data modeling & ML inference' },
  { name: 'FastAPI', desc: 'High-speed async APIs' },
  { name: 'MongoDB', desc: 'Document schemas' },
  { name: 'PostgreSQL', desc: 'Relational ACID models' },
  { name: 'Supabase', desc: 'Realtime edge databases' },
  { name: 'ESP32', desc: 'C++ & FreeRTOS edge firmware' },
  { name: 'GitHub', desc: 'Version control & CI pipelines' },
];

export default function CodeTerminal() {
  const [copied, setCopied] = useState(false);
  const [terminalLines, setTerminalLines] = useState([
    '$ git status --short',
    'M  src/components/Hero.jsx',
    'M  src/components/ProjectVisuals.jsx',
    '$ npm run build',
    '✓ 16 modules transformed.',
    '✓ production bundle generated in 620ms',
    '$ node server/server.js',
    '> [API Gateway] Listening on port 5000',
    '> [AIoT Stream] ESP32 Telemetry ingestion active (SCT-013, MPU6050, Temp)',
    '> [Platform] SignBridge ecosystem operational (https://signbridge.click)',
    '✨ System status: ALL SYSTEMS HEALTHY',
  ]);

  const copyCommand = () => {
    navigator.clipboard?.writeText('git clone https://github.com/suryavm/portfolio.git');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-28 sm:py-36 bg-slate-50/50 border-t border-slate-200/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-200 text-xs font-mono font-bold text-indigo-700 shadow-xs">
            <Terminal className="w-3.5 h-3.5 text-indigo-600" />
            <span>DEVELOPER WORKSPACE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Built With Code.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Clean code, automated build pipelines, and production-tested systems running on modern runtimes.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm text-slate-200 mb-14">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs text-slate-400 font-mono ml-2">surya@builder-station: ~/workspace</span>
            </div>
            <button
              onClick={copyCommand}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-colors"
              title="Copy clone command"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="text-[11px]">{copied ? 'Copied' : 'Clone'}</span>
            </button>
          </div>

          {/* Terminal Output */}
          <div className="p-6 space-y-2 bg-slate-950/95 overflow-x-auto min-h-[220px]">
            {terminalLines.map((line, idx) => {
              const isCommand = line.startsWith('$');
              const isSuccess = line.startsWith('✓') || line.startsWith('✨');
              const isInfo = line.startsWith('>');

              return (
                <div
                  key={idx}
                  className={`leading-relaxed ${
                    isCommand
                      ? 'text-slate-300 font-bold'
                      : isSuccess
                      ? 'text-emerald-400'
                      : isInfo
                      ? 'text-cyan-400'
                      : 'text-slate-400'
                  }`}
                >
                  {line}
                </div>
              );
            })}
            <div className="flex items-center text-indigo-400 pt-1">
              <span>$ </span>
              <span className="inline-block w-2.5 h-4 bg-indigo-500 ml-1 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Technology Badges Grid */}
        <div className="mb-12">
          <div className="text-center text-xs font-mono text-slate-400 uppercase tracking-widest mb-6">
            Core Technology Stack Badges
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {techBadges.map((badge) => (
              <div
                key={badge.name}
                className="bg-white hover:bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-400 hover:shadow-sm transition-all duration-300 flex items-center gap-2 group cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 group-hover:scale-125 transition-transform" />
                <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {badge.name}
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  • {badge.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* View GitHub Button */}
        <div className="text-center">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-300 inline-flex items-center gap-2.5 group"
          >
            <GithubIcon className="w-4 h-4" />
            <span>View GitHub Profile</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
