import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowDown, Sparkles, Code2, Cpu, ArrowUpRight, 
  RotateCcw, Volume2, VolumeX, FastForward, Play, Pause 
} from 'lucide-react';

export default function Hero({ onFaceRevealed }) {
  const videoRef = useRef(null);
  const [videoTime, setVideoTime] = useState(0);
  const [faceRevealed, setFaceRevealed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteractedSound, setHasInteractedSound] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showSoundPrompt, setShowSoundPrompt] = useState(false);

  // Initialize playback with audio; if browser autoplay policy blocks unmuted audio, fallback to muted
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false);
          setHasInteractedSound(true);
        })
        .catch(() => {
          // Browser prevented unmuted autoplay; mute and play, then prompt user to unmute
          video.muted = true;
          setIsMuted(true);
          setShowSoundPrompt(true);
          video.play().catch(() => {});
        });
    }

    // Safety fallback timer for 8 seconds: ensures video pauses at 8s and reveals even if timeupdate lags
    const timer = setTimeout(() => {
      triggerFaceReveal();
    }, 8200);

    return () => clearTimeout(timer);
  }, []);

  const triggerFaceReveal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setFaceRevealed(true);
    if (onFaceRevealed) onFaceRevealed(true);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      setVideoTime(current);

      // In 8 seconds, developer's face is visible -> pause video and reveal large name & details
      if (current >= 7.95 && !faceRevealed) {
        triggerFaceReveal();
      }
    }
  };

  const toggleSound = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      setHasInteractedSound(true);
      setShowSoundPrompt(false);
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setFaceRevealed(false);
      if (onFaceRevealed) onFaceRevealed(false);
    }
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 8.0;
      videoRef.current.pause();
    }
    triggerFaceReveal();
  };

  const scrollToWorks = (e) => {
    e.preventDefault();
    const el = document.getElementById('works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full flex items-center justify-start overflow-hidden pt-12 pb-16"
      onClick={() => {
        // If sound was muted due to browser policy, clicking anywhere enables sound
        if (isMuted && showSoundPrompt && videoRef.current) {
          videoRef.current.muted = false;
          setIsMuted(false);
          setShowSoundPrompt(false);
          setHasInteractedSound(true);
        }
      }}
    >
      {/* Cinematic Full-Screen Developer Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-slate-950">
        <video
          ref={videoRef}
          src="/hero-developer.mp4"
          autoPlay
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover object-center sm:object-[center_top] filter contrast-[1.05] brightness-[0.98] transition-opacity duration-700"
          style={{ opacity: videoLoaded ? 1 : 0.6 }}
        />

        {/* 40% Iris / 60% White Editorial Gradient Overlays:
            When in pure video mode (first 8s), overlay is minimal to let video shine.
            When face is locked at 8s, rich Iris gradient creates high-contrast backdrop for the large typography. */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 z-1 ${
            faceRevealed 
              ? 'bg-gradient-to-r from-white/95 via-white/85 to-transparent sm:via-white/80' 
              : 'bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30'
          }`} 
        />
        
        {faceRevealed && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent z-1" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white z-1" />
            {/* Rich Iris Ambient Glow Mesh */}
            <div className="absolute top-1/4 left-10 w-[550px] h-[550px] bg-iris-600/20 rounded-full blur-3xl pointer-events-none z-1" />
            <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none z-1" />
          </>
        )}
      </div>

      {/* Floating Audio Controls & Intro Status Bar (Top Right) */}
      <div className="fixed top-5 right-5 sm:right-8 z-50 flex items-center gap-2">
        {/* Unmute / Sound Toggle with Video Audio */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSound();
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md transition-all shadow-md font-mono text-xs font-semibold ${
            isMuted
              ? 'bg-amber-500/90 hover:bg-amber-500 text-white border border-amber-400 animate-pulse'
              : 'bg-iris-600/90 hover:bg-iris-700 text-white border border-iris-400 shadow-iris'
          }`}
          title={isMuted ? "Unmute Video Audio" : "Mute Video Audio"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span>{isMuted ? "Click for Sound" : "Audio Playing"}</span>
        </button>

        {/* Skip button visible only before 8s */}
        {!faceRevealed && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSkip();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/80 hover:bg-white text-slate-800 backdrop-blur-md border border-slate-300 shadow-sm font-mono text-xs transition-colors"
            title="Skip to face reveal"
          >
            <span>Skip</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Replay button visible after face is revealed */}
        {faceRevealed && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReplay();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/90 hover:bg-iris-50 text-iris-800 hover:text-iris-950 backdrop-blur-md border-2 border-iris-300 shadow-iris-sm font-mono text-xs font-semibold transition-all"
            title="Replay 8s cinematic video intro"
          >
            <RotateCcw className="w-3.5 h-3.5 text-iris-600" />
            <span>Replay Intro</span>
          </button>
        )}
      </div>

      {/* PHASE 1: Pure Video Mode (0s to 8s) — Minimal Cinematic Progress HUD */}
      {!faceRevealed && (
        <div className="absolute bottom-10 left-6 sm:left-12 z-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2 bg-slate-950/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-700/80 shadow-2xl max-w-md"
          >
            <div className="flex items-center justify-between font-mono text-xs text-slate-300 gap-4">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-iris-400 animate-ping" />
                <span className="font-bold text-iris-300 uppercase tracking-wider">Cinematic Intro</span>
              </span>
              <span className="text-slate-400 font-bold">
                0{Math.min(8, Math.floor(videoTime))}s / 08s
              </span>
            </div>

            {/* 8-second progress line */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-iris-500 to-indigo-400 transition-all duration-200"
                style={{ width: `${Math.min(100, (videoTime / 8) * 100)}%` }}
              />
            </div>

            <p className="text-[11px] font-sans text-slate-300">
              Developer in focus... Face reveal & platform lock at 08s.
            </p>
          </motion.div>
        </div>
      )}

      {/* PHASE 2: Face Revealed & Video Paused (At 8s) — Large Name & Details */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="max-w-3xl lg:max-w-4xl">
          <AnimatePresence>
            {faceRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 35, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 pt-6"
              >
                {/* Floating Face-Locked Status Pill */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-iris-100/95 backdrop-blur-md border-2 border-iris-300 shadow-iris-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-iris-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-iris-600"></span>
                  </span>
                  <span className="text-xs font-bold tracking-wider text-iris-950 uppercase font-mono">
                    Hi, I'm Surya V M
                  </span>
                  <span className="text-[10px] bg-iris-600 text-white font-mono px-2 py-0.5 rounded-full">
                    Face Locked @ 08s
                  </span>
                </div>

                {/* SOMEWHAT LARGE NAME: As requested ("my details surya vm need to be somewhat large") */}
                <div>
                  <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black text-slate-900 tracking-tight leading-[0.92] select-none">
                    SURYA{' '}
                    <span className="bg-gradient-to-r from-iris-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      V M
                    </span>
                  </h1>

                  {/* Personal Title Tags with 40% Iris Styling */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-sm sm:text-lg font-bold text-slate-800">
                    <span className="bg-iris-100/90 text-iris-900 px-3 py-1 rounded-xl border border-iris-300 shadow-xs">
                      Software Developer
                    </span>
                    <span className="text-iris-500 font-extrabold">•</span>
                    <span className="bg-iris-100/90 text-iris-900 px-3 py-1 rounded-xl border border-iris-300 shadow-xs">
                      AI/IoT Builder
                    </span>
                    <span className="text-iris-500 font-extrabold">•</span>
                    <span className="bg-purple-100/90 text-purple-900 px-3 py-1 rounded-xl border border-purple-300 shadow-xs">
                      Startup Founder
                    </span>
                  </div>
                </div>

                {/* Main Heading */}
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Building Ideas Into <br className="hidden sm:inline" />
                  <span className="text-iris-700 underline decoration-iris-300 underline-offset-8">
                    Real Technology.
                  </span>
                </h2>

                {/* Description */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-700 font-medium leading-relaxed max-w-2xl bg-white/70 backdrop-blur-md p-4 rounded-2xl border-2 border-iris-200/80 shadow-xs">
                  I build full-stack applications, AI-powered systems and IoT products — turning ambitious ideas into practical technology.
                </p>

                {/* CTA Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#works"
                    onClick={scrollToWorks}
                    className="px-7 sm:px-9 py-4 rounded-2xl bg-gradient-to-r from-iris-600 to-indigo-600 hover:from-iris-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base shadow-iris hover:shadow-iris-lg transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2.5 group border border-iris-400"
                  >
                    <span>Explore My Work</span>
                    <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  </a>

                  <a
                    href="#contact"
                    onClick={scrollToContact}
                    className="px-7 sm:px-9 py-4 rounded-2xl bg-white hover:bg-iris-50 text-iris-900 font-bold text-sm sm:text-base border-2 border-iris-300 hover:border-iris-500 shadow-iris-sm transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2 backdrop-blur-md"
                  >
                    <span>Let's Connect</span>
                    <ArrowUpRight className="w-5 h-5 text-iris-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>

                {/* Status Ticker Pills */}
                <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-700 font-mono">
                  <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border-2 border-iris-200 shadow-xs">
                    <Code2 className="w-4 h-4 text-iris-600" />
                    <span>Full-Stack & APIs</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border-2 border-iris-200 shadow-xs">
                    <Cpu className="w-4 h-4 text-iris-600" />
                    <span>Edge AIoT & ESP32</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border-2 border-purple-200 shadow-xs">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span>SignBridge Founder</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Animated Scroll Prompt visible after face is revealed */}
      {faceRevealed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none"
        >
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border-2 border-iris-300 shadow-iris-sm text-iris-900 font-mono text-xs font-bold">
            <span>Scroll down for portfolio details</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </div>
        </motion.div>
      )}
    </section>
  );
}
