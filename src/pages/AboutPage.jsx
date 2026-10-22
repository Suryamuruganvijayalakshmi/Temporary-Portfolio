import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../lib/store';
import { profileConfig } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../components/SocialIcons';
import { Play, Pause, ExternalLink, X, MapPin, Award, GraduationCap, ChevronRight, Check, Maximize2, Sparkles, RotateCw } from 'lucide-react';
import Lanyard from '../components/Lanyard';

export default function AboutPage() {
  const { 
    currentTime, 
    onlineCount, 
    presenceStatus, 
    isPlayingAudio, 
    toggleAudio, 
    listeningTrack,
    setActiveRoute 
  } = useStore();

  const [bioExpanded, setBioExpanded] = useState(false);
  const [cardMode, setCardMode] = useState('lanyard'); // 'lanyard' (3D Lanyard Pass) | 'postcard' (Archival Postcard)
  const [cardFinish, setCardFinish] = useState('glossy');
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isPlayingLocal, setIsPlayingLocal] = useState(false);
  const audioCtxRef = useRef(null);
  const synthNodesRef = useRef([]);

  // Synthesize gentle lo-fi analog workspace ambiance upon user interaction
  const handlePlayToggle = () => {
    if (isPlayingLocal) {
      // Stop audio
      synthNodesRef.current.forEach(node => {
        try { node.stop(); } catch(e) {}
      });
      synthNodesRef.current = [];
      setIsPlayingLocal(false);
      if (isPlayingAudio) toggleAudio();
    } else {
      // Start audio after user gesture
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContext();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        const ctx = audioCtxRef.current;
        const now = ctx.currentTime;

        // Ambient chord oscillators (Warm F# Maj7)
        const freqs = [185.00, 233.08, 277.18, 369.99]; // F#3, A#3, C#4, F4
        const gainMaster = ctx.createGain();
        gainMaster.gain.setValueAtTime(0.08, now);
        gainMaster.connect(ctx.destination);

        const newNodes = [];

        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          
          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq + (Math.random() * 0.4 - 0.2), now);

          // Subtle LFO vibrato
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.2 + idx * 0.05, now);
          lfoGain.gain.setValueAtTime(0.8, now);
          lfo.connect(osc.frequency);
          lfo.start(now);
          newNodes.push(lfo);

          oscGain.gain.setValueAtTime(0.06, now);
          osc.connect(oscGain);
          oscGain.connect(gainMaster);
          osc.start(now);
          newNodes.push(osc);
        });

        synthNodesRef.current = newNodes;
        setIsPlayingLocal(true);
        if (!isPlayingAudio) toggleAudio();
      } catch (err) {
        console.warn('Audio synthesis fallback active');
        setIsPlayingLocal(!isPlayingLocal);
      }
    }
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      synthNodesRef.current.forEach(node => {
        try { node.stop(); } catch(e) {}
      });
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try { audioCtxRef.current.close(); } catch(e) {}
      }
    };
  }, []);

  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] px-4 sm:px-8 pt-20 sm:pt-24 pb-16 flex items-center justify-center select-none overflow-x-hidden">
      {/* Background Halftone Paper Noise Grid (Matching Screenshot 3) */}
      <div className="absolute inset-0 halftone-grid opacity-35 pointer-events-none" />
      <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />

      {/* ============================================================
          VERTICAL RIGHT EDGE FILING TABS (Matching Screenshot 3!)
          ============================================================ */}
      <aside aria-label="Quick Section Tabs" className="fixed right-0 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-2">
        {/* FILE::WRITING */}
        <button
          onClick={() => setActiveRoute('/writing')}
          className="group relative flex items-center justify-center py-4 px-2.5 rounded-l-xl bg-zinc-200/90 dark:bg-zinc-800 border-l border-y border-zinc-300 dark:border-zinc-700 shadow-md hover:bg-white dark:hover:bg-zinc-700 transition-all text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
          title="Open Writing Notebook"
        >
          <span className="font-mono text-[10px] tracking-widest font-bold rotate-90 whitespace-nowrap block">
            FILE::WRITING
          </span>
        </button>

        {/* FILE::LAB */}
        <button
          onClick={() => setActiveRoute('/lab')}
          className="group relative flex items-center justify-center py-4 px-2.5 rounded-l-xl bg-zinc-200/90 dark:bg-zinc-800 border-l border-y border-zinc-300 dark:border-zinc-700 shadow-md hover:bg-white dark:hover:bg-zinc-700 transition-all text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
          title="Open Lab Playground"
        >
          <span className="font-mono text-[10px] tracking-widest font-bold rotate-90 whitespace-nowrap block">
            FILE::LAB
          </span>
        </button>
      </aside>

      {/* ============================================================
          MAIN DESK COMPOSITION (Matching Screenshot 3!)
          ============================================================ */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 lg:gap-14 my-auto">
        
        {/* LEFT COLUMN: IDENTITY POSTCARD + OVERLAPPING TELEMETRY PANEL */}
        <div className="relative w-full lg:w-7/12 flex flex-col items-center">
          
          {/* ============================================================
              IDENTITY CARD SWITCHER TABS & ACTIONS
              ============================================================ */}
          <div className="w-full max-w-xl flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-zinc-200/80 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700 text-[11px] sm:text-xs font-mono shadow-xs">
              <button
                onClick={() => setCardMode('lanyard')}
                className={`px-2.5 sm:px-3 py-1 rounded-full font-bold transition-all ${
                  cardMode === 'lanyard'
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                ★ 3D LANYARD PASS
              </button>
              <button
                onClick={() => setCardMode('postcard')}
                className={`px-2.5 sm:px-3 py-1 rounded-full font-bold transition-all ${
                  cardMode === 'postcard'
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                ✉ ARCHIVAL POSTCARD
              </button>
            </div>

            {cardMode === 'lanyard' && (
              <button
                onClick={() => setIsInspectorOpen(true)}
                className="flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 border border-zinc-300/80 dark:border-zinc-700/80 text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-colors"
                title="Open Fullscreen 3D Pass Inspector"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">FULLSCREEN</span>
              </button>
            )}
          </div>

          {/* OBJECT A: THE IDENTITY CARD (3D LANYARD OR ARCHIVAL POSTCARD) */}
          <AnimatePresence mode="wait">
            {cardMode === 'lanyard' ? (
              <motion.div
                key="lanyard-card"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="relative w-full max-w-xl rounded-2xl bg-[#fbf9f4] dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.12)] p-4 sm:p-6"
              >
                {/* 3D Physics Lanyard Canvas Container */}
                <div className="relative w-full h-[460px] sm:h-[520px] rounded-xl overflow-hidden bg-gradient-to-b from-stone-100/70 to-stone-200/30 dark:from-zinc-950/70 dark:to-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70 flex items-center justify-center">
                  {/* Halftone constellation circular aura behind hanging card */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] pointer-events-none opacity-25 dark:opacity-15 select-none">
                    <svg viewBox="0 0 400 400" className="w-full h-full animate-[spin_120s_linear_infinite]">
                      <circle cx="200" cy="200" r="185" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 9" className="text-stone-400 dark:text-stone-600" />
                      <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 6" className="text-stone-500 dark:text-stone-500" />
                      <circle cx="200" cy="200" r="115" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 8" className="text-stone-400 dark:text-stone-700" />
                    </svg>
                  </div>

                  {/* 3D Lanyard component */}
                  <div className="w-full h-full">
                    <Lanyard 
                      frontImage="/card-front.svg"
                      backImage="/card-back.svg"
                      strapImage="/strap.svg"
                      finish={cardFinish}
                      metal="silver"
                      size={0.68}
                      strapLength={0.46}
                      strapWidth={0.7}
                      breeze={0.4}
                      damping={0.45}
                      elasticity={0.55}
                    />
                  </div>

                  {/* Bottom Overlay Pill Toolbar */}
                  <div className="absolute bottom-2.5 inset-x-2.5 flex flex-wrap items-center justify-between gap-1.5 px-3 py-1.5 rounded-xl bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 text-[10px] sm:text-[11px] font-mono shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-bold text-zinc-800 dark:text-zinc-200">PHYSICS::ACTIVE</span>
                      <span className="hidden sm:inline text-zinc-400">· DRAG / FLIP</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="text-zinc-400 text-[10px] hidden md:inline">SURFACE:</span>
                      {['glossy', 'holographic', 'metallic', 'matte'].map(f => (
                        <button
                          key={f}
                          onClick={() => setCardFinish(f)}
                          className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-all ${
                            cardFinish === f
                              ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-2xs'
                              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Identity Card Summary & Social Info */}
                <div className="mt-4 space-y-3 font-sans">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight font-sans">
                        Surya V M
                      </h2>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                        FOUNDER // SIGNBRIDGE · AIoT INNOVATOR
                      </p>
                    </div>

                    {/* Social Media Icon Row */}
                    <div className="flex items-center gap-2">
                      <a
                        href="https://x.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full hover:bg-zinc-200/60 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
                        title="X Profile"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full hover:bg-zinc-200/60 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
                        title="Instagram Profile"
                      >
                        <InstagramIcon className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={profileConfig.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full hover:bg-zinc-200/60 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
                        title="GitHub Profile"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={profileConfig.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full hover:bg-zinc-200/60 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
                        title="SignBridge Website"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Bottom Row: About Me Button & Route Label */}
                  <div className="pt-2 border-t border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between">
                    <button
                      onClick={() => setBioExpanded(!bioExpanded)}
                      className="px-4 py-1.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-sans text-xs font-semibold shadow-xs hover:opacity-90 transition-opacity select-none"
                    >
                      {bioExpanded ? 'Close Bio' : 'About me'}
                    </button>

                    <div className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">
                      TAMIL NADU → GLOBAL
                    </div>
                  </div>

                  {/* Expandable Biography Drawer */}
                  <AnimatePresence>
                    {bioExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4 font-sans text-xs text-zinc-700 dark:text-zinc-300"
                      >
                        <p className="leading-relaxed">
                          {profileConfig.bio}
                        </p>
                        <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 space-y-1 font-mono text-[11px]">
                          <div className="font-bold text-zinc-900 dark:text-zinc-100">{profileConfig.education.degree}</div>
                          <div className="text-zinc-500">{profileConfig.education.institution} • Class of {profileConfig.education.expectedYear}</div>
                        </div>
                        <div>
                          <div className="font-bold text-zinc-900 dark:text-zinc-100 font-mono text-[11px] mb-1.5 uppercase">
                            Recognitions & Milestones:
                          </div>
                          <ul className="space-y-1 list-disc list-inside text-zinc-600 dark:text-zinc-400">
                            {profileConfig.achievements.map((a, i) => (
                              <li key={i}><span className="font-semibold text-zinc-900 dark:text-zinc-200">{a.title}</span> — {a.detail} ({a.year})</li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="postcard-card"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="relative w-full max-w-xl rounded-2xl bg-[#fbf9f4] dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.12)] p-6 sm:p-8 transform -rotate-1 hover:rotate-0 transition-transform duration-300"
              >
                {/* Protruding Metallic Silver Paper Clip on Top-Left (Exact as in Screenshot 3!) */}
                <div className="absolute -top-5 left-8 w-6 h-12 border-2 border-zinc-400 dark:border-zinc-500 rounded-full bg-transparent shadow-sm pointer-events-none z-20" />
                <div className="absolute -top-3 left-9 w-4 h-8 border-2 border-zinc-400 dark:border-zinc-500 rounded-full bg-transparent pointer-events-none z-20" />

                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  
                  {/* Postage Stamp on Left of Postcard */}
                  <div className="relative shrink-0 flex flex-col items-center">
                    {/* Scalloped Perforated Stamp Edge Container */}
                    <div className="relative p-2 rounded-sm bg-white dark:bg-zinc-950 border-2 border-dashed border-zinc-400 dark:border-zinc-700 shadow-md">
                      {/* High-Contrast Grayscale Portrait (Silhouette/Engraving Style) */}
                      <div className="w-28 h-36 bg-zinc-900 rounded-xs overflow-hidden relative flex items-center justify-center">
                        {/* SVG Engraved Halftone Silhouette Portrait */}
                        <svg className="w-full h-full" viewBox="0 0 100 130" fill="none">
                          <rect width="100" height="130" fill="#18181b" />
                          <path 
                            d="M50 25 C40 25 32 34 32 46 C32 58 38 66 45 70 C40 76 25 84 20 115 H80 C75 84 60 76 55 70 C62 66 68 58 68 46 C68 34 60 25 50 25 Z" 
                            fill="#f4f4f5" 
                          />
                          <g stroke="#18181b" strokeWidth="1" opacity="0.6">
                            <line x1="20" y1="90" x2="80" y2="90" />
                            <line x1="20" y1="96" x2="80" y2="96" />
                            <line x1="20" y1="102" x2="80" y2="102" />
                            <line x1="20" y1="108" x2="80" y2="108" />
                            <line x1="34" y1="42" x2="66" y2="42" />
                            <line x1="34" y1="48" x2="66" y2="48" />
                            <line x1="34" y1="54" x2="66" y2="54" />
                          </g>
                        </svg>

                        {/* Circular Postmark Ink Stamp */}
                        <div className="absolute top-2 -right-4 w-16 h-16 rounded-full border border-zinc-500/60 flex items-center justify-center transform rotate-12 pointer-events-none">
                          <div className="text-[7px] font-mono text-zinc-400 text-center uppercase tracking-tighter">
                            ERODE • 2026<br />SVM POST
                          </div>
                        </div>

                        {/* Wavy Ink Cancellation Lines */}
                        <svg className="absolute -top-1 -right-8 w-16 h-12 opacity-60 pointer-events-none" viewBox="0 0 80 40">
                          <path d="M0 10 Q10 5 20 10 T40 10 T60 10 T80 10" stroke="#71717a" strokeWidth="1" fill="none" />
                          <path d="M0 18 Q10 13 20 18 T40 18 T60 18 T80 18" stroke="#71717a" strokeWidth="1" fill="none" />
                          <path d="M0 26 Q10 21 20 26 T40 26 T60 26 T80 26" stroke="#71717a" strokeWidth="1" fill="none" />
                        </svg>
                      </div>

                      {/* Stamp Label */}
                      <div className="text-center font-mono text-[9px] font-bold text-zinc-800 dark:text-zinc-200 mt-1 uppercase tracking-wider">
                        SURYA V M
                      </div>
                    </div>
                  </div>

                  {/* Right Side of Postcard: Metadata, Stamps, Social Icons & About Me */}
                  <div className="flex-1 flex flex-col justify-between space-y-4 pt-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl opacity-75">⛵</span>
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                          TRANSIT // INSP
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 opacity-60 text-zinc-500">
                        <span className="text-xs">💼</span>
                        <span className="text-xs">🏆</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed">
                      Developer, technology innovator, and founder of SignBridge. Engineering scalable software systems, practical AI models, and physical AIoT prototypes like EcoClamp.
                    </p>

                    <div className="flex items-center gap-3 pt-1">
                      <a
                        href="https://x.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full hover:bg-zinc-200/60 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
                        title="X Profile"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>

                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full hover:bg-zinc-200/60 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
                        title="Instagram Profile"
                      >
                        <InstagramIcon className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href={profileConfig.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full hover:bg-zinc-200/60 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
                        title="GitHub Profile"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href={profileConfig.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full hover:bg-zinc-200/60 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
                        title="SignBridge Website"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="pt-2 border-t border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between">
                      <button
                        onClick={() => setBioExpanded(!bioExpanded)}
                        className="px-4 py-1.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-sans text-xs font-semibold shadow-xs hover:opacity-90 transition-opacity select-none"
                      >
                        {bioExpanded ? 'Close Bio' : 'About me'}
                      </button>

                      <div className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">
                        TAMIL NADU → GLOBAL
                      </div>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {bioExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-4 font-sans text-xs text-zinc-700 dark:text-zinc-300"
                    >
                      <p className="leading-relaxed">
                        {profileConfig.bio}
                      </p>
                      <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 space-y-1 font-mono text-[11px]">
                        <div className="font-bold text-zinc-900 dark:text-zinc-100">{profileConfig.education.degree}</div>
                        <div className="text-zinc-500">{profileConfig.education.institution} • Class of {profileConfig.education.expectedYear}</div>
                      </div>
                      <div>
                        <div className="font-bold text-zinc-900 dark:text-zinc-100 font-mono text-[11px] mb-1.5 uppercase">
                          Recognitions & Milestones:
                        </div>
                        <ul className="space-y-1 list-disc list-inside text-zinc-600 dark:text-zinc-400">
                          {profileConfig.achievements.map((a, i) => (
                            <li key={i}><span className="font-semibold text-zinc-900 dark:text-zinc-200">{a.title}</span> — {a.detail} ({a.year})</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* OBJECT B: OVERLAPPING TELEMETRY::LIVE PANEL (Matching Screenshot 3!) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="w-full max-w-sm sm:max-w-md rounded-2xl bg-[#12141a] text-zinc-100 p-5 border border-zinc-800 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.35)] -mt-10 sm:-mt-14 z-20 self-start sm:ml-4 font-mono text-xs space-y-3.5 select-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-wider text-zinc-100">
                  TELEMETRY::LIVE
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Metrics Rows */}
            <div className="space-y-1.5 text-[11px] text-zinc-300">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">LOCAL::</span>
                <span className="font-bold text-zinc-100">{currentTime || '20:05IST'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">POS::</span>
                <span className="font-bold text-zinc-100">11°21'N / 77°44'E</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">ONLINE::</span>
                <span className="font-bold text-zinc-100">0{onlineCount || 1}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">COMMITS::</span>
                <span className="font-bold text-zinc-100">6,165/YR</span>
              </div>
            </div>

            {/* Grayscale GitHub Activity Heatmap Grid (Matching Screenshot 3!) */}
            <div className="pt-2 border-t border-zinc-800/80">
              <div className="grid grid-cols-12 sm:grid-cols-20 gap-1 opacity-90 overflow-hidden">
                {Array.from({ length: 60 }).map((_, i) => {
                  const level = (i * 7 + 13) % 5;
                  const bgClass =
                    level === 0 ? 'bg-zinc-800/50' :
                    level === 1 ? 'bg-zinc-700' :
                    level === 2 ? 'bg-zinc-500' :
                    level === 3 ? 'bg-zinc-300' : 'bg-white';
                  return (
                    <div 
                      key={i} 
                      className={`w-2.5 h-2.5 rounded-xs ${bgClass} transition-colors hover:scale-125`}
                      title={`Week ${i + 1} Activity`}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: OBJECT C — THE VINYL TURNTABLE (Matching Screenshot 3!) */}
        <div className="w-full lg:w-5/12 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="relative w-full max-w-sm sm:max-w-md rounded-2xl bg-[#14161f] text-zinc-100 p-5 sm:p-6 border border-zinc-800 shadow-[0_24px_50px_-10px_rgba(0,0,0,0.4)] flex flex-col justify-between transform rotate-1 hover:rotate-0 transition-transform duration-300 select-none"
          >
            {/* Turntable Platter Deck & Tone Arm */}
            <div className="relative w-full aspect-square bg-[#0f1118] rounded-xl border border-zinc-800/90 shadow-inner flex items-center justify-center p-4 overflow-hidden">
              
              {/* Turntable Metallic Controls on Top Right */}
              <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
                <div className="w-3.5 h-3.5 rounded-full bg-zinc-600 border border-zinc-400 shadow-sm" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 border border-zinc-500" />
              </div>

              {/* The Rotating Vinyl Record (Micro-Grooves + Center Label) */}
              <div 
                className={`relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-black border-4 border-zinc-900 shadow-2xl flex items-center justify-center cursor-pointer ${
                  isPlayingLocal ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '4s' }}
                onClick={handlePlayToggle}
                title="Click record to Play / Pause"
              >
                {/* Vinyl Grooves (Concentric Circles) */}
                <div className="absolute inset-2 rounded-full border border-zinc-800/80 pointer-events-none" />
                <div className="absolute inset-5 rounded-full border border-zinc-800/60 pointer-events-none" />
                <div className="absolute inset-8 rounded-full border border-zinc-800/80 pointer-events-none" />
                <div className="absolute inset-12 rounded-full border border-zinc-800/60 pointer-events-none" />
                <div className="absolute inset-16 rounded-full border border-zinc-800/80 pointer-events-none" />
                
                {/* Vinyl Radial Sheen Reflection */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

                {/* Center Paper Record Label */}
                <div className="relative w-20 h-20 rounded-full bg-white text-zinc-950 p-2 flex flex-col items-center justify-center text-center shadow-md">
                  <div className="text-[7px] font-mono font-bold uppercase tracking-wider">
                    SURYA V M
                  </div>
                  <div className="w-2 h-2 rounded-full bg-zinc-900 my-1" />
                  <div className="text-[6px] font-mono text-zinc-600">
                    ANALOG DESK
                  </div>
                </div>
              </div>

              {/* Metallic Silver Tone Arm (Angled onto record) */}
              <div 
                className={`absolute top-4 right-8 w-1.5 h-44 bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-600 rounded-full shadow-lg origin-top transition-transform duration-700 pointer-events-none z-20 ${
                  isPlayingLocal ? 'rotate-[28deg]' : 'rotate-[14deg]'
                }`}
              >
                {/* Tone arm head / stylus */}
                <div className="absolute -bottom-1 -left-1.5 w-4 h-3 bg-zinc-800 rounded-xs border border-zinc-600" />
                {/* Pivot base */}
                <div className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-zinc-400 border border-zinc-200 shadow-sm" />
              </div>

              {/* Play / Pause Interactive Overlay Trigger */}
              <button
                onClick={handlePlayToggle}
                className="absolute bottom-3 left-3 z-30 p-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white border border-zinc-700 shadow-md transition-transform hover:scale-110"
                aria-label={isPlayingLocal ? 'Pause vinyl player' : 'Play vinyl player'}
              >
                {isPlayingLocal ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
            </div>

            {/* Bottom Turntable Information Bar (Matching Screenshot 3!) */}
            <div className="mt-4 pt-3 border-t border-zinc-800/80 font-mono text-xs flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isPlayingLocal ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'}`} />
                  <span className="font-bold text-zinc-100 text-[11px] tracking-wider">
                    {isPlayingLocal ? 'RADIO::LIVE' : 'RADIO::OFF-AIR'}
                  </span>
                  <span className="text-zinc-500 text-[10px] hidden sm:inline">• 5H AGO</span>
                </div>
                <div className="text-zinc-200 text-xs font-semibold truncate max-w-[170px] sm:max-w-[200px]">
                  Analog Desk // Low-Fi Synth
                </div>
                <div className="text-zinc-500 text-[10px]">
                  Surya V M Studio
                </div>
              </div>

              {/* Side Rotation & Time Metadata (Matching Screenshot 3!) */}
              <div className="text-right space-y-0.5 text-[10px]">
                <div className="text-zinc-400">
                  ROTATION:: <span className="font-bold text-zinc-200">{isPlayingLocal ? '33 RPM' : 'IDLE'}</span>
                </div>
                <div className="text-zinc-400">
                  TODAY:: <span className="font-bold text-zinc-200">2H 31M</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============================================================
          FULLSCREEN 3D LANYARD INSPECTOR MODAL
          ============================================================ */}
      <AnimatePresence>
        {isInspectorOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setIsInspectorOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[85vh] max-h-[820px] rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-white tracking-widest">
                    SURYA V M // 3D IDENTITY PASS INSPECTOR
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-1">
                    <span className="text-zinc-500 text-[10px]">SURFACE:</span>
                    {['glossy', 'holographic', 'metallic', 'matte'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setCardFinish(f)}
                        className={`px-2.5 py-1 rounded text-[10px] uppercase font-bold transition-all ${
                          cardFinish === f
                            ? 'bg-white text-zinc-900 shadow-xs'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsInspectorOpen(false)}
                    className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    title="Close Inspector (Esc)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal 3D Canvas Area */}
              <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
                <Lanyard
                  frontImage="/card-front.svg"
                  backImage="/card-back.svg"
                  strapImage="/strap.svg"
                  finish={cardFinish}
                  metal="silver"
                  size={0.65}
                  strapLength={0.48}
                  strapWidth={0.7}
                  breeze={0.35}
                  damping={0.45}
                  elasticity={0.55}
                />
              </div>

              {/* Modal Bottom Hints */}
              <div className="px-6 py-3 border-t border-zinc-800/80 bg-zinc-900/60 font-mono text-[11px] text-zinc-400 flex items-center justify-between">
                <div>
                  <span className="text-zinc-200 font-bold">CLICK CARD</span> TO FLIP FRONT/BACK · <span className="text-zinc-200 font-bold">DRAG &amp; THROW</span> FOR PHYSICS
                </div>
                <div className="hidden sm:block text-zinc-500">
                  PRESS ESC TO CLOSE
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
