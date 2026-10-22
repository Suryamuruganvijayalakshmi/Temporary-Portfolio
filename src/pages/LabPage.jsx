import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../lib/store';
import { labExperiments } from '../data/portfolioData';
import { 
  Sparkles, 
  List, 
  Disc, 
  Grid, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  ExternalLink,
  Users,
  Mic,
  Maximize2,
  Volume2,
  Sliders,
  Move,
  Layers,
  Heart,
  Globe
} from 'lucide-react';

/* -------------------------------------------------------------
 * Experiment 1: Dynamic Scroll Kinematics Simulator
 * ------------------------------------------------------------- */
function DynamicScrollCanvas() {
  const [velocity, setVelocity] = useState(25);
  const [damping, setDamping] = useState(0.85);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let animId;
    let currentPos = 0;
    const loop = () => {
      currentPos = (currentPos + velocity * 0.08) % 360;
      setScrollY(currentPos);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [velocity]);

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 space-y-6">
      <div className="relative w-64 h-48 rounded-2xl bg-card border-2 border-strong shadow-2xl p-6 flex flex-col items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-iris-500/10 via-transparent to-iris-500/20 pointer-events-none"
          style={{ transform: `translateY(${(scrollY % 40) - 20}px)` }}
        />
        <motion.div
          style={{
            rotateX: (scrollY % 30) - 15,
            rotateY: (scrollY % 20) - 10
          }}
          className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-iris-600 to-indigo-500 flex items-center justify-center text-white font-mono font-bold text-xs shadow-xl"
        >
          VELOCITY
        </motion.div>
        <div className="mt-4 font-mono text-[11px] text-muted">
          POS: {Math.round(scrollY)}px · DAMP: {damping}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="text-muted">VELOCITY:</span>
          <input
            type="range"
            min="0"
            max="100"
            value={velocity}
            onChange={(e) => setVelocity(Number(e.target.value))}
            className="w-28 accent-iris-500"
          />
          <span className="text-primary font-bold">{velocity}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted">DAMPING:</span>
          <input
            type="range"
            min="0.5"
            max="0.99"
            step="0.01"
            value={damping}
            onChange={(e) => setDamping(Number(e.target.value))}
            className="w-24 accent-iris-500"
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * Experiment 2: Rotating 3D Gallery Carousel
 * ------------------------------------------------------------- */
function RotatingGalleryCanvas() {
  const [angle, setAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 1) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [autoRotate]);

  const cards = [
    { title: 'CARD 01', color: 'from-amber-500 to-orange-600', meta: 'EDITORIAL ARCHIVE' },
    { title: 'CARD 02', color: 'from-blue-500 to-cyan-600', meta: 'AIOT CLUSTERS' },
    { title: 'CARD 03', color: 'from-purple-500 to-pink-600', meta: 'TACTILE PAPER' },
    { title: 'CARD 04', color: 'from-emerald-500 to-teal-600', meta: 'ORBITAL MESH' }
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 space-y-6">
      <div className="relative w-80 h-56 flex items-center justify-center [perspective:800px]">
        {cards.map((card, idx) => {
          const cardAngle = angle + (idx * 360) / cards.length;
          const rad = (cardAngle * Math.PI) / 180;
          const x = Math.sin(rad) * 110;
          const z = Math.cos(rad) * 110;
          const scale = (z + 160) / 270;
          const opacity = (z + 110) / 220;

          return (
            <motion.div
              key={card.title}
              style={{
                transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
                zIndex: Math.round(z + 200),
                opacity: Math.max(0.3, opacity)
              }}
              className={`absolute w-36 h-48 rounded-xl bg-gradient-to-br ${card.color} p-4 shadow-2xl text-white flex flex-col justify-between cursor-pointer border border-white/20`}
              onClick={() => setAngle(idx * -90)}
            >
              <span className="font-mono text-[10px] opacity-80">{card.meta}</span>
              <div className="font-bold text-sm tracking-wider">{card.title}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 font-mono text-xs">
        <button
          onClick={() => setAngle((prev) => prev - 45)}
          className="px-3 py-1.5 rounded-lg bg-surface hover:bg-card border border-subtle text-primary"
        >
          ← ROTATE
        </button>
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-3 py-1.5 rounded-lg border text-xs font-bold ${
            autoRotate ? 'bg-iris-500 text-white border-transparent' : 'bg-surface text-secondary border-subtle'
          }`}
        >
          {autoRotate ? 'AUTO-SPIN ON' : 'PAUSED'}
        </button>
        <button
          onClick={() => setAngle((prev) => prev + 45)}
          className="px-3 py-1.5 rounded-lg bg-surface hover:bg-card border border-subtle text-primary"
        >
          ROTATE →
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * Experiment 3: Paste-Up Draggable Layered Desk
 * ------------------------------------------------------------- */
function PasteUpCanvas() {
  const [items, setItems] = useState([
    { id: 'item-1', title: 'FIELD SPEC Nº04', type: 'POSTCARD', x: -80, y: -20, rotate: -4, color: 'bg-card' },
    { id: 'item-2', title: 'PASS/ACCEPT TICKET', type: 'STAMP', x: 60, y: -40, rotate: 6, color: 'bg-iris-600 text-white' },
    { id: 'item-3', title: 'TELEMETRY NOTE', type: 'PAPER', x: 10, y: 50, rotate: 2, color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200' }
  ]);

  const bringToFront = (id) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === id);
      if (idx === -1) return prev;
      const copy = [...prev];
      const [item] = copy.splice(idx, 1);
      copy.push(item);
      return copy;
    });
  };

  return (
    <div className="relative w-full h-[320px] rounded-xl bg-surface/50 border border-subtle overflow-hidden flex items-center justify-center p-4">
      <div className="absolute top-3 left-3 font-mono text-[10px] text-muted">
        DRAG TACTILE SHEETS · CLICK TO BRING TO FRONT
      </div>

      {items.map((item, idx) => (
        <motion.div
          key={item.id}
          drag
          dragConstraints={{ left: -140, right: 140, top: -100, bottom: 100 }}
          onPointerDown={() => bringToFront(item.id)}
          initial={{ x: item.x, y: item.y, rotate: item.rotate }}
          style={{ zIndex: 10 + idx }}
          className={`absolute p-5 rounded-xl border-2 border-strong shadow-xl cursor-grab active:cursor-grabbing font-mono select-none w-48 ${item.color}`}
        >
          <div className="flex items-center justify-between text-[9px] opacity-75 border-b border-current/20 pb-1 mb-2">
            <span>{item.type}</span>
            <span>::2026</span>
          </div>
          <div className="font-bold text-xs">{item.title}</div>
          <div className="text-[10px] opacity-70 mt-1 font-sans">
            Tactile draggable object with momentum damping.
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------
 * Experiment 4: Vocal Orb Audio-Reactive Visualizer
 * ------------------------------------------------------------- */
function VocalOrbCanvas() {
  const [micActive, setMicActive] = useState(false);
  const [micVolume, setMicVolume] = useState(0.4);
  const audioContextRef = useRef(null);
  const streamRef = useRef(null);

  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      setMicActive(true);

      const checkVolume = () => {
        if (!streamRef.current) return;
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
        setMicVolume(Math.max(0.2, avg / 128));
        requestAnimationFrame(checkVolume);
      };
      checkVolume();
    } catch (err) {
      alert('Microphone permission not granted. Running in procedural audio mode.');
      setMicActive(false);
    }
  };

  const stopMic = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setMicActive(false);
  };

  useEffect(() => {
    return () => stopMic();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 space-y-6">
      <div className="relative w-52 h-52 flex items-center justify-center">
        {/* Glow rings */}
        <motion.div
          animate={{
            scale: [1, 1 + micVolume * 0.4, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-iris-500/20 blur-xl"
        />

        {/* Dynamic Sphere */}
        <motion.div
          animate={{
            scale: 0.9 + micVolume * 0.4,
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-400 via-iris-500 to-purple-600 shadow-2xl flex items-center justify-center text-white font-mono text-xs font-bold border-2 border-white/30"
        >
          {micActive ? 'AUDIO LIVE' : 'SYNTH ORB'}
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-2 font-mono text-xs">
        <button
          onClick={micActive ? stopMic : startMic}
          className={`px-4 py-2 rounded-full flex items-center gap-2 font-bold transition-all ${
            micActive 
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25' 
              : 'bg-primary text-canvas hover:opacity-90'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>{micActive ? 'Disconnect Microphone' : 'Enable Microphone (Gesture Required)'}</span>
        </button>
        <span className="text-[10px] text-muted text-center max-w-sm font-sans">
          Audio is processed entirely locally via Web Audio API. Audio is never recorded or transmitted.
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * Experiment 5: Live Cursors Multi-Client Presence
 * ------------------------------------------------------------- */
function LiveCursorsCanvas() {
  const { presenceEnabled, togglePresence } = useStore();
  const [peerCursors, setPeerCursors] = useState([
    { id: 'peer-1', name: 'Keen Lynx', x: 25, y: 35, color: '#6366f1' },
    { id: 'peer-2', name: 'Swift Otter', x: 65, y: 70, color: '#10b981' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPeerCursors((prev) =>
        prev.map((peer) => ({
          ...peer,
          x: Math.min(85, Math.max(15, peer.x + (Math.random() * 20 - 10))),
          y: Math.min(80, Math.max(20, peer.y + (Math.random() * 20 - 10)))
        }))
      );
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[320px] rounded-xl bg-surface/60 border border-subtle overflow-hidden p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-iris-500" />
          <span className="text-primary font-bold">PRESENCE PIPELINE</span>
        </div>
        <span className="rubber-stamp">
          {presenceEnabled ? 'BROADCASTING' : 'MUTED'}
        </span>
      </div>

      {/* Simulated Peer Cursors */}
      {peerCursors.map((peer) => (
        <motion.div
          key={peer.id}
          animate={{ left: `${peer.x}%`, top: `${peer.y}%` }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          className="absolute pointer-events-none flex items-start gap-1 z-20"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill={peer.color}>
            <path d="M4 0l16 12-7 2-4 9-5-23z" />
          </svg>
          <span 
            className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white shadow-md whitespace-nowrap"
            style={{ backgroundColor: peer.color }}
          >
            {peer.name}
          </span>
        </motion.div>
      ))}

      <div className="text-center space-y-2">
        <button
          onClick={togglePresence}
          className="px-4 py-2 rounded-lg bg-card hover:bg-surface border border-strong font-mono text-xs text-primary shadow-sm"
        >
          {presenceEnabled ? 'Broadcast Active · Click to Pause' : 'Click to Enable Live Presence Broadcast'}
        </button>
        <p className="font-mono text-[10px] text-muted">
          Multi-tab broadcast synchronized via LocalChannel & Supabase Realtime channels.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * Experiment 6: Tactile Rotary Dial
 * ------------------------------------------------------------- */
function RotaryDialCanvas() {
  const [angle, setAngle] = useState(135);

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 space-y-6">
      <div 
        className="relative w-40 h-40 rounded-full bg-stone-900 border-4 border-stone-700 shadow-2xl flex items-center justify-center select-none"
      >
        {/* Ticks ring */}
        <div className="absolute inset-0 rounded-full border border-stone-600/50" />
        
        {/* Rotating Knob */}
        <div 
          className="w-28 h-28 rounded-full bg-gradient-to-b from-stone-800 to-stone-950 border border-stone-700 shadow-inner flex items-center justify-center relative transition-transform duration-75"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          {/* Indicator Dot */}
          <div className="absolute top-2 w-2.5 h-2.5 rounded-full bg-iris-400 shadow-md shadow-iris-400/50" />
          <div className="font-mono text-xs font-bold text-stone-400">
            {Math.round((angle / 300) * 100)}%
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 font-mono text-xs">
        <input
          type="range"
          min="0"
          max="300"
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="w-56 accent-iris-500"
        />
        <div className="text-muted">
          POTENTIOMETER READOUT: <strong className="text-primary">{angle}°</strong> / 300°
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * Experiment 7: Polka Dots Cursor Halftone Matrix
 * ------------------------------------------------------------- */
function PolkaDotsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = 300);

    let mouse = { x: -100, y: -100 };
    const spacing = 24;
    const rows = Math.floor(height / spacing);
    const cols = Math.floor(width / spacing);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouse = { x: -100, y: -100 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing + spacing / 2;
          const y = r * spacing + spacing / 2;
          const dist = Math.hypot(x - mouse.x, y - mouse.y);
          const maxDist = 80;

          let radius = 2.5;
          let offsetX = 0;
          let offsetY = 0;

          if (dist < maxDist) {
            const factor = (1 - dist / maxDist);
            radius = 2.5 + factor * 4.5;
            const angle = Math.atan2(y - mouse.y, x - mouse.x);
            offsetX = Math.cos(angle) * factor * 10;
            offsetY = Math.sin(angle) * factor * 10;
          }

          ctx.beginPath();
          ctx.arc(x + offsetX, y + offsetY, radius, 0, Math.PI * 2);
          ctx.fillStyle = dist < maxDist ? '#6366f1' : 'rgba(150, 150, 150, 0.45)';
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full h-[300px] flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
      <div className="absolute bottom-3 left-4 font-mono text-[10px] text-muted pointer-events-none">
        HOVER CURSOR OVER MATRIX TO DISPLACE HALFTONE GRID
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * Experiment 8: Parametric Kinetic Heart
 * ------------------------------------------------------------- */
function KineticHeartCanvas() {
  const [pulseSpeed, setPulseSpeed] = useState(1.2);
  const [intensity, setIntensity] = useState(1);

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 space-y-6">
      <div 
        onClick={() => setIntensity((prev) => (prev >= 1.6 ? 1 : prev + 0.2))}
        className="cursor-pointer select-none"
      >
        <motion.div
          animate={{ scale: [1, 1.25 * intensity, 1, 1.15 * intensity, 1] }}
          transition={{ duration: pulseSpeed, repeat: Infinity, ease: 'easeInOut' }}
          className="text-7xl drop-shadow-xl"
        >
          ❤️
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-2 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="text-muted">PULSE FREQUENCY:</span>
          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.1"
            value={pulseSpeed}
            onChange={(e) => setPulseSpeed(Number(e.target.value))}
            className="w-32 accent-rose-500"
          />
        </div>
        <span className="text-[11px] text-muted">
          Parametric cardiod equation: click heart to surge amplitude (current: {intensity.toFixed(1)}x)
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * Experiment 9: Procedural Three.js / WebGL Node Mesh
 * ------------------------------------------------------------- */
function ThreeOrbitCanvas() {
  const [rotationSpeed, setRotationSpeed] = useState(1);

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 space-y-6">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Outer Orbit */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18 / rotationSpeed, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-dashed border-iris-500/40"
        >
          <div className="w-3.5 h-3.5 rounded-full bg-iris-400 absolute -top-1.5 left-1/2 -translate-x-1/2 shadow-lg shadow-iris-400/50" />
        </motion.div>

        {/* Inner Counter Orbit */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 10 / rotationSpeed, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-8 rounded-full border border-subtle"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -bottom-1 left-1/2 -translate-x-1/2 shadow-md shadow-emerald-400/50" />
        </motion.div>

        {/* Central Core Node */}
        <motion.div
          animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
          transition={{ duration: 12 / rotationSpeed, repeat: Infinity, ease: 'linear' }}
          className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-stone-900 to-stone-700 border border-stone-600 shadow-2xl flex items-center justify-center text-white font-mono text-[10px] font-bold"
        >
          GPU::NODE
        </motion.div>
      </div>

      <div className="flex items-center gap-3 font-mono text-xs">
        <span className="text-muted">ORBIT VELOCITY:</span>
        <button
          onClick={() => setRotationSpeed((prev) => (prev >= 3 ? 0.5 : prev + 0.5))}
          className="px-3 py-1.5 rounded-lg bg-surface hover:bg-card border border-subtle text-primary font-bold"
        >
          {rotationSpeed}x SPEED
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * Main Lab Page Component
 * ------------------------------------------------------------- */
export default function LabPage() {
  const { labIndex, setLabIndex, labViewMode, setLabViewMode } = useStore();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const activeExp = labExperiments[labIndex] || labExperiments[0];

  const handleNext = () => {
    setLabIndex((labIndex + 1) % labExperiments.length);
  };

  const handlePrev = () => {
    setLabIndex((labIndex - 1 + labExperiments.length) % labExperiments.length);
  };

  return (
    <div className="relative w-full pt-24 sm:pt-28 pb-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
      {/* Background Micro-Grid */}
      <div className="absolute inset-0 technical-grid opacity-25 pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 font-mono text-xs text-muted">
            <span className="w-2 h-2 rounded-full bg-iris-500" />
            <span>LABORATORY // EXPERIMENTAL GRAPHICS & PHYSICS</span>
          </div>
          <h1 className="editorial-title text-4xl sm:text-5xl font-extrabold text-primary">
            Lab Playground
          </h1>
          <p className="text-base sm:text-lg text-secondary font-sans leading-relaxed">
            Nine working experiments spanning scroll kinematics, 3D spatial rotation, audio-reactive shaders, multi-user cursors, and tactile physics.
          </p>
        </div>

        {/* View Mode Switcher: LIST | WHEEL | GRID */}
        <div className="inline-flex items-center p-1 rounded-full bg-surface border border-subtle font-mono text-xs">
          <button
            onClick={() => setLabViewMode('wheel')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
              labViewMode === 'wheel' ? 'bg-card text-primary font-bold shadow-xs' : 'text-muted hover:text-secondary'
            }`}
          >
            <Disc className="w-3.5 h-3.5" />
            <span>WHEEL</span>
          </button>
          <button
            onClick={() => setLabViewMode('list')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
              labViewMode === 'list' ? 'bg-card text-primary font-bold shadow-xs' : 'text-muted hover:text-secondary'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>LIST</span>
          </button>
          <button
            onClick={() => setLabViewMode('grid')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
              labViewMode === 'grid' ? 'bg-card text-primary font-bold shadow-xs' : 'text-muted hover:text-secondary'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>GRID</span>
          </button>
        </div>
      </div>

      {/* WHEEL View: Curved Interactive Dial / Wheel with Active Typography */}
      {labViewMode === 'wheel' && (
        <div className="p-8 sm:p-12 rounded-2xl bg-card border-2 border-strong shadow-2xl relative overflow-hidden space-y-8">
          <div className="text-xs font-mono text-muted flex items-center justify-between border-b border-subtle pb-4">
            <span>ROTARY EXPERIMENT WHEEL</span>
            <span>USE MOUSE WHEEL OR CLICK ITEMS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* The Curved Experiment Wheel Menu */}
            <div className="lg:col-span-7 space-y-2 py-4">
              {labExperiments.map((exp, idx) => {
                const isSelected = idx === labIndex;
                const isHovered = idx === hoveredIndex;

                return (
                  <motion.div
                    key={exp.id}
                    onClick={() => setLabIndex(idx)}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`cursor-pointer transition-all flex items-center gap-4 py-2 px-4 rounded-xl ${
                      isSelected 
                        ? 'bg-surface border-l-4 border-iris-500 text-primary translate-x-3 shadow-md' 
                        : 'text-muted hover:text-secondary hover:translate-x-1'
                    }`}
                  >
                    <span className="font-mono text-xs font-bold w-8">
                      0{idx + 1}
                    </span>
                    <h2 className={`font-mono transition-all ${
                      isSelected 
                        ? 'text-xl sm:text-2xl font-extrabold text-primary' 
                        : isHovered 
                        ? 'text-lg sm:text-xl text-secondary' 
                        : 'text-base sm:text-lg'
                    }`}>
                      {exp.name}
                    </h2>
                    <span className="font-mono text-[11px] text-muted hidden sm:inline ml-auto">
                      // {exp.category}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Preview & Switch Stage */}
            <div className="lg:col-span-5 bg-surface/80 rounded-xl border border-subtle p-6 space-y-4 shadow-inner">
              <div className="flex items-center justify-between font-mono text-xs text-muted">
                <span className="rubber-stamp">SELECTED</span>
                <span>EXP {activeExp.number} / {activeExp.totalCount}</span>
              </div>
              <h3 className="editorial-title text-2xl font-extrabold text-primary">
                {activeExp.name}
              </h3>
              <p className="text-xs text-secondary font-sans leading-relaxed">
                {activeExp.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {activeExp.technologies?.map((tech, tIdx) => (
                  <span key={tIdx} className="technical-label text-[10px]">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="pt-4 border-t border-subtle flex justify-between items-center font-mono text-xs">
                <span className="text-muted">{activeExp.status}</span>
                <span className="text-iris-500 font-bold">Interactive Stage Active ↓</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Experiment Display Stage (Canvas for all 9 experiments) */}
      <div className="bg-card rounded-2xl border-2 border-strong shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Experiment Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-subtle pb-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="rubber-stamp">
              EXP {activeExp.number}
            </span>
            <span className="text-primary font-bold text-base">
              {activeExp.name}
            </span>
            <span className="text-muted hidden sm:inline">
              // {activeExp.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-muted font-bold">
              {activeExp.number} / {activeExp.totalCount}
            </span>
          </div>
        </div>

        {/* Interactive Experiment Stage */}
        <div className="relative min-h-[360px] rounded-xl bg-surface/70 border border-subtle overflow-hidden flex items-center justify-center">
          {/* Subtle grid in canvas */}
          <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />

          {/* Render Active Experiment Visual Canvas */}
          {activeExp.id === 'dynamic-scroll' && <DynamicScrollCanvas />}
          {activeExp.id === 'rotating-gallery' && <RotatingGalleryCanvas />}
          {activeExp.id === 'paste-up' && <PasteUpCanvas />}
          {activeExp.id === 'vocal-orb' && <VocalOrbCanvas />}
          {activeExp.id === 'live-cursors' && <LiveCursorsCanvas />}
          {activeExp.id === 'rotary-dial' && <RotaryDialCanvas />}
          {activeExp.id === 'polka-dots' && <PolkaDotsCanvas />}
          {activeExp.id === 'kinetic-heart' && <KineticHeartCanvas />}
          {activeExp.id === 'three-orbit' && <ThreeOrbitCanvas />}
        </div>

        {/* Description & Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <p className="text-xs text-secondary font-sans max-w-md leading-relaxed">
            {activeExp.description}
          </p>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded-lg bg-surface hover:bg-card border border-subtle text-primary transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-iris-400"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>PREV</span>
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-lg bg-surface hover:bg-card border border-subtle text-primary transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-iris-400"
            >
              <span>NEXT</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid Catalog View */}
      {labViewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {labExperiments.map((exp, idx) => (
            <button
              key={exp.id}
              onClick={() => setLabIndex(idx)}
              className={`p-5 rounded-xl border-2 text-left font-mono transition-all ${
                idx === labIndex ? 'bg-card border-iris-500 shadow-xl ring-2 ring-iris-500/20' : 'bg-surface hover:bg-card border-subtle text-secondary'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-muted mb-2">
                <span className="font-bold">0{idx + 1} / 09</span>
                <span className="text-[10px]">{exp.status}</span>
              </div>
              <div className="text-base font-bold text-primary mb-1">
                {exp.name}
              </div>
              <div className="text-xs text-muted font-sans line-clamp-2">
                {exp.description}
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {exp.technologies?.slice(0, 2).map((tech, tIdx) => (
                  <span key={tIdx} className="technical-label text-[9px]">
                    {tech}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* List Catalog View */}
      {labViewMode === 'list' && (
        <div className="divide-y divide-subtle border-y-2 border-subtle font-mono text-xs">
          {labExperiments.map((exp, idx) => (
            <div
              key={exp.id}
              onClick={() => setLabIndex(idx)}
              className={`py-4 px-4 flex items-center justify-between cursor-pointer transition-colors ${
                idx === labIndex ? 'bg-surface text-primary font-bold border-l-4 border-iris-500' : 'text-secondary hover:text-primary hover:bg-surface/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-muted font-bold">0{idx + 1}</span>
                <span className="text-sm font-semibold">{exp.name}</span>
                <span className="text-muted hidden md:inline">// {exp.category}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-muted text-[11px] hidden sm:inline">{exp.technologies?.[0]}</span>
                <span className="text-muted text-[11px]">{exp.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
