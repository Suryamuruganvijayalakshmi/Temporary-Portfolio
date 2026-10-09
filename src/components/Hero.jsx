import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowDown, Sparkles, Code2, Cpu, ArrowUpRight, 
  RotateCcw, Play, Layers, Compass, CheckCircle2 
} from 'lucide-react';

export default function Hero({ onFaceRevealed }) {
  const videoRef = useRef(null);
  const [isPlayingFullVideo, setIsPlayingFullVideo] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Play video with audio
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {})
        .catch(() => {
          // If browser policy prevents unmuted autoplay before interaction, play muted first
          video.muted = true;
          video.play().catch(() => {});
        });
    }
  }, []);

  const handleVideoEnded = () => {
    // When the full video finishes playing, unlock the grand site view
    completeVideoIntro();
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.currentTime >= 9.6 && isPlayingFullVideo) {
      // Transition as the full video wraps up
      completeVideoIntro();
    }
  };

  const completeVideoIntro = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlayingFullVideo(false);
    if (onFaceRevealed) onFaceRevealed(true);
  };

  const handleReplay = (e) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {
        videoRef.current.muted = true;
        videoRef.current.play();
      });
      setIsPlayingFullVideo(true);
      if (onFaceRevealed) onFaceRevealed(false);
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
    <section 
      id="home" 
      className="relative min-h-screen w-full flex items-center justify-start overflow-hidden bg-white"
    >
      {/* 
        ====================================================================
        STATE 1: THE BEGINNING — PURE FULL-SCREEN VIDEO ONLY (ZERO ELEMENTS)
        As requested: "at the beginning only the video need to be ther no elemtn should be there"
        ====================================================================
      */}
      {isPlayingFullVideo ? (
        <div 
          onClick={() => {
            // Unmute on tap/click if muted by browser autoplay policy, or skip on second tap
            if (videoRef.current) {
              if (videoRef.current.muted) {
                videoRef.current.muted = false;
              } else {
                completeVideoIntro();
              }
            }
          }}
          className="fixed inset-0 w-full h-full z-50 bg-black cursor-pointer overflow-hidden flex items-center justify-center select-none"
        >
          {/* Edge-to-edge pure video, ZERO elements on top */}
          <video
            ref={videoRef}
            src="/hero-developer.mp4"
            autoPlay
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            onEnded={handleVideoEnded}
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[1.02]"
          />
        </div>
      ) : (
        /* 
          ====================================================================
          STATE 2: VIBRANT WHITE REDESIGN — LARGE "SURYA V M" & GRAND PORTFOLIO
          Reveals after the full video completes
          ====================================================================
        */
        <>
          {/* Luminous Ambient Mesh Background */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-[650px] h-[650px] bg-gradient-to-br from-indigo-500/12 via-purple-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-500/10 via-indigo-500/8 to-transparent rounded-full blur-3xl" />
            <div className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl" />
            {/* Subtle micro grid pattern for high-end editorial feel */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-28 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Grand Display Typography & Bio */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Luminous pill badge */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-indigo-200/80 shadow-[0_4px_20px_rgba(99,102,241,0.1)]"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
                  </span>
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-indigo-900">
                    Software Developer • AI/IoT Builder • Founder
                  </span>
                </motion.div>

                {/* SOMEWHAT LARGE "SURYA V M" DISPLAY TYPOGRAPHY */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                >
                  <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black text-slate-900 tracking-tight leading-[0.9] select-none">
                    SURYA{' '}
                    <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                      V M
                    </span>
                  </h1>

                  <div className="mt-4 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-700">
                    <span className="bg-slate-100/90 text-slate-900 px-3.5 py-1 rounded-xl border border-slate-200 shadow-xs">
                      Full-Stack Web
                    </span>
                    <span className="text-indigo-400">•</span>
                    <span className="bg-slate-100/90 text-slate-900 px-3.5 py-1 rounded-xl border border-slate-200 shadow-xs">
                      Applied AI & ML
                    </span>
                    <span className="text-indigo-400">•</span>
                    <span className="bg-slate-100/90 text-slate-900 px-3.5 py-1 rounded-xl border border-slate-200 shadow-xs">
                      Industrial AIoT (ESP32)
                    </span>
                    <span className="text-indigo-400">•</span>
                    <span className="bg-indigo-50 text-indigo-700 px-3.5 py-1 rounded-xl border border-indigo-200 shadow-xs">
                      SignBridge Founder
                    </span>
                  </div>
                </motion.div>

                {/* Main Hero Statement */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="space-y-4 max-w-2xl"
                >
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Building Ideas Into <br />
                    <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                      Real Technology.
                    </span>
                  </h2>

                  <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                    I build modern full-stack applications, intelligent AI-powered systems and IoT products — taking ambitious visions from initial concept to architecture, development, and production deployment.
                  </p>
                </motion.div>

                {/* Vibrant Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.45 }}
                  className="flex flex-wrap items-center gap-4 pt-2"
                >
                  <a
                    href="#works"
                    onClick={scrollToWorks}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold text-sm sm:text-base shadow-[0_10px_30px_rgba(79,70,229,0.35)] hover:shadow-[0_15px_40px_rgba(79,70,229,0.5)] transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2.5 group"
                  >
                    <span>Explore Selected Works</span>
                    <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  </a>

                  <a
                    href="#contact"
                    onClick={scrollToContact}
                    className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm sm:text-base border border-slate-300 hover:border-indigo-400 shadow-sm transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2"
                  >
                    <span>Let's Connect</span>
                    <ArrowUpRight className="w-5 h-5 text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <button
                    onClick={handleReplay}
                    className="px-4 py-4 rounded-2xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-semibold inline-flex items-center gap-2 border border-slate-200 transition-colors"
                    title="Watch the full cinematic video intro again"
                  >
                    <RotateCcw className="w-4 h-4 text-indigo-600" />
                    <span>Replay Video</span>
                  </button>
                </motion.div>
              </div>

              {/* Right Column: Interactive Video Snapshot & Live Architecture Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="lg:col-span-4"
              >
                <div className="relative group">
                  {/* Glowing ambient ring */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-700" />

                  <div className="relative bg-white rounded-3xl p-5 border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] overflow-hidden space-y-4">
                    {/* Video mini preview with replay overlay */}
                    <div 
                      onClick={handleReplay}
                      className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 cursor-pointer group/video"
                    >
                      <video
                        src="/hero-developer.mp4"
                        muted
                        loop
                        playsInline
                        autoPlay
                        className="w-full h-full object-cover filter contrast-[1.05]"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 group-hover/video:bg-slate-950/20 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-indigo-600 shadow-lg transform group-hover/video:scale-110 transition-transform">
                          <Play className="w-5 h-5 ml-0.5 fill-current" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center text-[11px] font-mono text-white/90">
                        <span>DEVELOPER INTRO</span>
                        <span className="bg-black/60 px-2 py-0.5 rounded">REPLAY ↺</span>
                      </div>
                    </div>

                    {/* Quick Core Architecture Highlights */}
                    <div className="space-y-2.5 pt-1">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                        <span>Platform Architectures</span>
                        <span className="font-mono text-indigo-600">6 Production Systems</span>
                      </div>

                      <div className="space-y-2 text-xs font-mono text-slate-600">
                        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between">
                          <span>EcoClamp AIoT</span>
                          <span className="text-emerald-600 font-bold">ESP32 • 98.4% Health</span>
                        </div>
                        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between">
                          <span>SignBridge Venture</span>
                          <span className="text-indigo-600 font-bold">signbridge.click ↗</span>
                        </div>
                        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between">
                          <span>AgriFlow Engine</span>
                          <span className="text-cyan-600 font-bold">ML Procurement</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </>
      )}
    </section>
  );
}
