import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Sparkles, Code2, Cpu, ArrowUpRight, RotateCcw, Pause, Play } from 'lucide-react';

export default function Hero() {
  const videoRef = useRef(null);
  const [videoTime, setVideoTime] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [isPausedAtFace, setIsPausedAtFace] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // If timeupdate doesn't trigger in some browsers, fallback to pause at 6s
    const timer = setTimeout(() => {
      if (!isPausedAtFace && videoRef.current) {
        videoRef.current.pause();
        setIsPausedAtFace(true);
        setRevealed(true);
      }
    }, 6200);

    return () => clearTimeout(timer);
  }, [isPausedAtFace]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      setVideoTime(current);

      // Stop video at 6 seconds when face is viewing and reveal name
      if (current >= 5.95 && !isPausedAtFace) {
        videoRef.current.pause();
        setIsPausedAtFace(true);
        setRevealed(true);
      }
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPausedAtFace(false);
      setRevealed(false);
    }
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
    <section id="home" className="relative min-h-screen w-full flex items-center justify-start overflow-hidden pt-20 pb-16">
      {/* Cinematic Developer Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-slate-950">
        <video
          ref={videoRef}
          src="/hero-developer.mp4"
          autoPlay
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover object-center sm:object-[center_top] filter contrast-[1.04] brightness-[0.98] transition-opacity duration-1000"
          style={{ opacity: videoLoaded ? 1 : 0.6 }}
        />

        {/* 40% Iris / 60% White Editorial Gradient Overlays:
            Creates rich Iris violet aura while keeping white clarity and developer's face visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent sm:via-white/75 z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white z-1" />
        
        {/* Rich Iris Ambient Glow Mesh */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-iris-600/15 rounded-full blur-3xl pointer-events-none z-1" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-iris-500/12 rounded-full blur-3xl pointer-events-none z-1" />
      </div>

      {/* Top Floating Video Status Pill */}
      <div className="absolute top-24 right-6 sm:right-12 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-iris-300 shadow-iris-sm font-mono text-[11px] text-iris-800">
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isPausedAtFace ? 'bg-iris-500' : 'bg-emerald-400'}`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${isPausedAtFace ? 'bg-iris-700' : 'bg-emerald-500'}`}></span>
        </span>
        <span>
          {isPausedAtFace ? 'Face Locked @ 06s' : `Cinematic Intro (0${Math.min(6, Math.floor(videoTime))}s / 06s)`}
        </span>
        {isPausedAtFace && (
          <button
            onClick={handleReplay}
            className="ml-1 text-iris-600 hover:text-iris-900 transition-colors flex items-center gap-1 font-sans font-semibold underline text-[10px]"
            title="Replay 6s cinematic video intro"
          >
            <RotateCcw className="w-3 h-3" /> Replay
          </button>
        )}
      </div>

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="max-w-2xl lg:max-w-3xl">

          {/* Interactive Personal Introduction Overlay:
              Appears exactly at 6 seconds when face is viewing & video pauses */}
          <div className="min-h-[140px] mb-4">
            <AnimatePresence>
              {revealed ? (
                <motion.div
                  initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-3"
                >
                  {/* Glowing Iris Pill Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-iris-50/95 backdrop-blur-md border border-iris-300 shadow-iris-sm">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-iris-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-iris-600"></span>
                    </span>
                    <span className="text-xs font-bold tracking-wider text-iris-900 uppercase font-mono">
                      Hi, I'm Surya V M
                    </span>
                  </div>

                  {/* Personal Title Tags */}
                  <div className="text-sm sm:text-base font-bold text-slate-800 tracking-wide flex flex-wrap items-center gap-2">
                    <span className="bg-iris-100/70 text-iris-900 px-2.5 py-0.5 rounded-md border border-iris-200">
                      Software Developer
                    </span>
                    <span className="text-iris-500">•</span>
                    <span className="bg-iris-100/70 text-iris-900 px-2.5 py-0.5 rounded-md border border-iris-200">
                      AI/IoT Builder
                    </span>
                    <span className="text-iris-500">•</span>
                    <span className="bg-purple-100/70 text-purple-900 px-2.5 py-0.5 rounded-md border border-purple-200">
                      Startup Founder
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 max-w-lg font-medium leading-relaxed bg-white/60 backdrop-blur-sm p-2 rounded-xl border border-iris-100">
                    Building software, intelligent systems and products that solve real-world problems.
                  </p>
                </motion.div>
              ) : (
                /* Sleek placeholder while video plays its first 6s */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-iris-200 text-xs font-mono text-iris-700"
                >
                  <span className="w-2 h-2 rounded-full bg-iris-600 animate-ping" />
                  <span>Cinematic Introduction Playing... Face reveal at 06s</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Main Hero Typography: Revealed along with Name */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Small Label with rich Iris accent */}
                <div className="inline-block text-xs font-bold tracking-widest text-iris-800 uppercase font-mono bg-iris-50 px-3 py-1 rounded-md border border-iris-200">
                  SOFTWARE DEVELOPER • BUILDER • FOUNDER
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
                  Building Ideas Into <br />
                  <span className="bg-gradient-to-r from-iris-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Real Technology.
                  </span>
                </h1>

                {/* Description */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-700 font-normal leading-relaxed max-w-xl">
                  I build full-stack applications, AI-powered systems and IoT products — turning ambitious ideas into practical technology.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#works"
                    onClick={scrollToWorks}
                    className="px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-iris-600 to-indigo-600 hover:from-iris-700 hover:to-indigo-700 text-white font-semibold text-sm sm:text-base shadow-iris hover:shadow-iris-lg transition-all duration-300 transform hover:-translate-y-0.5 inline-flex items-center gap-2 group border border-iris-400"
                  >
                    <span>Explore My Work</span>
                    <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  </a>

                  <a
                    href="#contact"
                    onClick={scrollToContact}
                    className="px-6 sm:px-8 py-3.5 rounded-2xl bg-white hover:bg-iris-50 text-iris-800 hover:text-iris-900 font-semibold text-sm sm:text-base border-2 border-iris-300 hover:border-iris-500 shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 inline-flex items-center gap-2 backdrop-blur-md"
                  >
                    <span>Let's Connect</span>
                    <ArrowUpRight className="w-4 h-4 text-iris-600 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <button
                    onClick={handleReplay}
                    className="sm:hidden px-4 py-3 rounded-2xl bg-iris-100 text-iris-800 text-xs font-semibold inline-flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Replay Intro</span>
                  </button>
                </div>

                {/* Status ticker pills */}
                <div className="pt-4 flex flex-wrap items-center gap-3 text-xs text-slate-600 font-mono">
                  <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-iris-200 shadow-xs">
                    <Code2 className="w-3.5 h-3.5 text-iris-600" />
                    <span>Full-Stack & APIs</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-iris-200 shadow-xs">
                    <Cpu className="w-3.5 h-3.5 text-iris-600" />
                    <span>Edge AIoT & ESP32</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-purple-200 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>SignBridge Founder</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none"
      >
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-iris-300 shadow-iris-sm text-iris-800 font-mono text-[11px] font-semibold">
          <span>Scroll to explore details</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
