import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Sparkles, Terminal, Code2, Cpu, ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const videoRef = useRef(null);
  const [videoTime, setVideoTime] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Reveal intro when video hits ~1.8s (when developer turns/faces towards screen)
    // with a reliable 2s fallback timeout in case autoplay takes time
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      setVideoTime(current);
      if (current >= 1.6 && !revealed) {
        setRevealed(true);
      }
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
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-slate-900">
        <video
          ref={videoRef}
          src="/hero-developer.mp4"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover object-center sm:object-[center_top] filter contrast-[1.03] brightness-[0.98] transition-opacity duration-1000"
          style={{ opacity: videoLoaded ? 1 : 0.6 }}
        />

        {/* Sophisticated White / Iris Gradient Overlays:
            Ensures text readability on the left while keeping the developer's face on the right crisp & visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/20 sm:to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white z-1" />
        
        {/* Subtle Iris Ambient Glow */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-iris-500/10 rounded-full blur-3xl pointer-events-none z-1" />
      </div>

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="max-w-2xl lg:max-w-3xl">

          {/* Interactive Cinematic Overlay Triggered by Video Moment */}
          <div className="min-h-[140px] mb-4">
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-3"
                >
                  {/* Subtle Iris Pill Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-iris-200/90 shadow-iris-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-iris-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-iris-600"></span>
                    </span>
                    <span className="text-xs font-semibold tracking-wider text-iris-800 uppercase font-mono">
                      Hi, I'm Surya V M
                    </span>
                  </div>

                  {/* Personal Introduction Callout */}
                  <div className="text-sm sm:text-base font-semibold text-slate-700 tracking-wide">
                    <span>Software Developer</span>
                    <span className="mx-2 text-iris-400">•</span>
                    <span>AI/IoT Builder</span>
                    <span className="mx-2 text-iris-400">•</span>
                    <span>Startup Founder</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 max-w-lg font-medium leading-relaxed">
                    Building software, intelligent systems and products that solve real-world problems.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Main Hero Typography */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Small Label */}
            <div className="inline-block text-xs font-bold tracking-widest text-slate-500 uppercase font-mono">
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
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-xl">
              I build full-stack applications, AI-powered systems and IoT products — turning ambitious ideas into practical technology.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#works"
                onClick={scrollToWorks}
                className="px-6 sm:px-8 py-3.5 rounded-2xl bg-iris-600 hover:bg-iris-700 text-white font-semibold text-sm sm:text-base shadow-iris hover:shadow-iris-lg transition-all duration-300 transform hover:-translate-y-0.5 inline-flex items-center gap-2 group"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                onClick={scrollToContact}
                className="px-6 sm:px-8 py-3.5 rounded-2xl bg-white/90 hover:bg-white text-slate-800 hover:text-iris-700 font-semibold text-sm sm:text-base border border-slate-200 hover:border-iris-300 shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 inline-flex items-center gap-2 backdrop-blur-md"
              >
                <span>Let's Connect</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-iris-600 transition-colors" />
              </a>
            </div>

            {/* Status ticker pills */}
            <div className="pt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono">
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs">
                <Code2 className="w-3.5 h-3.5 text-iris-600" />
                <span>Full-Stack & APIs</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs">
                <Cpu className="w-3.5 h-3.5 text-iris-600" />
                <span>Edge AIoT & ESP32</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-iris-600" />
                <span>SignBridge Founder</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none"
      >
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-xs text-slate-500 font-mono text-[11px]">
          <span>Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
