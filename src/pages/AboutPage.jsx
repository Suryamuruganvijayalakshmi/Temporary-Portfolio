import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../lib/store';
import { profileConfig } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../components/SocialIcons';
import { Play, Pause, ExternalLink, X, MapPin, Award, GraduationCap, ChevronRight, Check, Sparkles, RotateCw } from 'lucide-react';

export default function AboutPage() {
  const { 
    isPlayingAudio, 
    toggleAudio, 
    listeningTrack,
    setActiveRoute 
  } = useStore();

  const [bioExpanded, setBioExpanded] = useState(false);
  const [isPlayingLocal, setIsPlayingLocal] = useState(false);
  const audioRef = useRef(null);

  // Initialize and manage sounddelicious-portfolio-harmony audio playback
  useEffect(() => {
    const audio = new Audio('/portfolio-harmony.mp3');
    audio.loop = true;
    audio.volume = 0.65;
    audioRef.current = audio;

    const handleEnded = () => setIsPlayingLocal(false);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      try {
        audio.pause();
        audio.src = '';
      } catch (e) {}
    };
  }, []);

  // Sync with global store isPlayingAudio if toggled externally (e.g. Command Palette)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlayingAudio && !isPlayingLocal) {
      audio.play().then(() => setIsPlayingLocal(true)).catch(() => {});
    } else if (!isPlayingAudio && isPlayingLocal) {
      audio.pause();
      setIsPlayingLocal(false);
    }
  }, [isPlayingAudio]);

  const handlePlayToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlayingLocal) {
      audio.pause();
      setIsPlayingLocal(false);
      if (isPlayingAudio) toggleAudio();
    } else {
      audio.play()
        .then(() => {
          setIsPlayingLocal(true);
          if (!isPlayingAudio) toggleAudio();
        })
        .catch((err) => {
          console.warn('Audio play prevented or interrupted:', err);
        });
    }
  };

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
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-14 my-auto">
        
        {/* LEFT COLUMN: IDENTITY POSTCARD + OVERLAPPING TELEMETRY PANEL */}
        <div className="relative w-full lg:w-7/12 flex flex-col items-center">
          
          {/* ============================================================
              OBJECT A: THE ARCHIVAL IDENTITY POSTCARD
              ============================================================ */}
          <motion.div
                key="postcard-card"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="relative w-full max-w-xl rounded-2xl bg-[#fbf9f4] dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.12)] p-5 sm:p-8 transform rotate-0 sm:-rotate-1 sm:hover:rotate-0 transition-transform duration-300"
              >
                {/* Protruding Metallic Silver Paper Clip on Top-Left */}
                <div className="absolute -top-4 sm:-top-5 left-6 sm:left-8 w-5 sm:w-6 h-10 sm:h-12 border-2 border-zinc-400 dark:border-zinc-500 rounded-full bg-transparent shadow-sm pointer-events-none z-20" />
                <div className="absolute -top-2 sm:-top-3 left-7 sm:left-9 w-3.5 sm:w-4 h-7 sm:h-8 border-2 border-zinc-400 dark:border-zinc-500 rounded-full bg-transparent pointer-events-none z-20" />

                <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-center sm:items-start text-center sm:text-left">
                  
                  {/* Postage Stamp on Left of Postcard */}
                  <div className="relative shrink-0 flex flex-col items-center">
                    {/* Scalloped Perforated Stamp Edge Container */}
                    <div className="relative p-2 rounded-sm bg-white dark:bg-zinc-950 border-2 border-dashed border-zinc-400 dark:border-zinc-700 shadow-md">
                      {/* High-Contrast Grayscale Portrait (Silhouette/Engraving Style) */}
                      <div className="w-24 h-32 sm:w-28 sm:h-36 bg-zinc-900 rounded-xs overflow-hidden relative flex items-center justify-center">
                        {/* Real Portrait of Surya V M as Archival Postage Stamp */}
                        <img 
                          src="/surya-portrait.jpg" 
                          alt="Surya V M" 
                          className="w-full h-full object-cover grayscale contrast-110" 
                        />
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
        </div>

        {/* RIGHT COLUMN: OBJECT C — THE VINYL TURNTABLE (Matching Screenshot 3!) */}
        <div className="w-full lg:w-5/12 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="relative w-full max-w-xs xs:max-w-sm sm:max-w-md rounded-2xl bg-[#14161f] text-zinc-100 p-4 sm:p-6 border border-zinc-800 shadow-[0_24px_50px_-10px_rgba(0,0,0,0.4)] flex flex-col justify-between transform rotate-0 sm:rotate-1 sm:hover:rotate-0 transition-transform duration-300 select-none"
          >
            {/* Turntable Platter Deck & Tone Arm */}
            <div className="relative w-full aspect-square bg-[#0f1118] rounded-xl border border-zinc-800/90 shadow-inner flex items-center justify-center p-3 sm:p-4 overflow-hidden">
              
              {/* Turntable Metallic Controls on Top Right */}
              <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
                <div className="w-3.5 h-3.5 rounded-full bg-zinc-600 border border-zinc-400 shadow-sm" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 border border-zinc-500" />
              </div>

              {/* The Rotating Vinyl Record (Micro-Grooves + Center Label) */}
              <div 
                className={`relative w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 rounded-full bg-black border-4 border-zinc-900 shadow-2xl flex items-center justify-center cursor-pointer ${
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
                  <div className="text-[6px] font-mono text-zinc-600 truncate max-w-[70px]">
                    PORTFOLIO HARMONY
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
                  <span className="text-zinc-500 text-[10px] hidden sm:inline">• MASTER AUDIO</span>
                </div>
                <div className="text-zinc-200 text-xs font-semibold truncate max-w-[170px] sm:max-w-[200px]" title="Sounddelicious — Portfolio Harmony">
                  Sounddelicious // Portfolio Harmony
                </div>
                <div className="text-zinc-500 text-[10px]">
                  Surya V M Studio Master
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
    </div>
  );
}
