import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../lib/store';
import { featuredProjects } from '../data/portfolioData';
import { ProjectPhoto, ProjectLogoCard } from '../components/ProjectArtworks';
import ProjectModal from '../components/ProjectModal';
import { 
  Sparkles, 
  List, 
  Disc, 
  Grid, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  ExternalLink,
  Sliders,
  Layers,
  Activity,
  Cpu,
  Radio,
  Satellite,
  Compass,
  Zap,
  Terminal,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

/* ====================================================================
 * PROJECT LAB 1: ECOCLAMP AIoT HARMONIC & VIBRATION INTELLIGENCE
 * ==================================================================== */
function EcoClampLabStage() {
  const [motorLoad, setMotorLoad] = useState(45); // Amperes
  const [vibrationSeverity, setVibrationSeverity] = useState(1.4); // mm/s RMS
  const [temperature, setTemperature] = useState(48); // °C

  const healthScore = Math.max(15, Math.min(99, Math.round(100 - (motorLoad > 70 ? (motorLoad - 70) * 1.5 : 0) - (vibrationSeverity > 2.5 ? (vibrationSeverity - 2.5) * 18 : 0) - (temperature > 65 ? (temperature - 65) * 1.2 : 0))));
  const isWarning = healthScore < 75 && healthScore >= 50;
  const isCritical = healthScore < 50;

  return (
    <div className="w-full flex flex-col p-4 sm:p-6 space-y-6 select-none font-mono">
      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-surface border border-subtle">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isCritical ? 'bg-rose-500 animate-ping' : isWarning ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
          <span className="font-bold text-xs text-primary">ECOCLAMP // SCT-013 + MPU6050 FIRMWARE SIMULATOR</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted">MACHINE STATUS:</span>
          <span className={`font-bold ${isCritical ? 'text-rose-500' : isWarning ? 'text-amber-500' : 'text-emerald-500'}`}>
            {isCritical ? 'CRITICAL ANOMALY' : isWarning ? 'HARMONIC WARNING' : 'NOMINAL (OPTIMAL)'}
          </span>
          <span className="px-2 py-0.5 rounded bg-card border border-subtle font-bold text-primary">
            HEALTH: {healthScore}%
          </span>
        </div>
      </div>

      {/* Main Dual Oscilloscope Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Current Sine & Harmonic Distortion Waveform */}
        <div className="p-4 rounded-xl bg-card border border-subtle space-y-3">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>CURRENT WAVEFORM (SCT-013)</span>
            <span className="text-primary font-bold">{motorLoad}A RMS · 50 Hz</span>
          </div>
          <div className="h-32 w-full bg-zinc-950 rounded-lg p-2 relative overflow-hidden flex items-center justify-center border border-zinc-800">
            <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
              {/* Background Grid Lines */}
              <line x1="0" y1="50" x2="400" y2="50" stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="100" y1="0" x2="100" y2="100" stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="200" y1="0" x2="200" y2="100" stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="300" y1="0" x2="300" y2="100" stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" />
              
              {/* Generated Dynamic Sine with Harmonics */}
              <path
                d={Array.from({ length: 40 }).map((_, i) => {
                  const x = i * 10;
                  const phase = (x / 400) * Math.PI * 6;
                  const amp = (motorLoad / 100) * 36;
                  const harmonic = (motorLoad > 65 ? Math.sin(phase * 3) * 8 : 0);
                  const y = 50 - (Math.sin(phase) * amp + harmonic);
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`;
                }).join(' ')}
                fill="none"
                stroke={isCritical ? '#f43f5e' : isWarning ? '#f59e0b' : '#38bdf8'}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="flex justify-between text-[11px] text-muted">
            <span>SAMPLE: 10 kHz ADC</span>
            <span>THD: {(motorLoad * 0.08).toFixed(1)}%</span>
          </div>
        </div>

        {/* 3-Axis Vibration FFT Spectrum */}
        <div className="p-4 rounded-xl bg-card border border-subtle space-y-3">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>VIBRATION FFT SPECTRUM (MPU6050)</span>
            <span className="text-primary font-bold">{vibrationSeverity} mm/s RMS</span>
          </div>
          <div className="h-32 w-full bg-zinc-950 rounded-lg p-3 relative flex items-end justify-between gap-1 border border-zinc-800">
            {[18, 42, 28, 65, 84, 30, 22, 54, 92, 40, 25, 15].map((h, i) => {
              const adjustedHeight = Math.min(100, Math.round(h * (vibrationSeverity / 1.5)));
              const isPeak = adjustedHeight > 75;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div 
                    className={`w-full rounded-xs transition-all duration-300 ${isPeak ? 'bg-rose-500' : 'bg-emerald-500/80'}`}
                    style={{ height: `${adjustedHeight}%` }}
                  />
                  <span className="text-[8px] text-zinc-500">{i * 20}Hz</span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[11px] text-muted">
            <span>I2C 400kHz · FILTER: 50Hz LPF</span>
            <span>TEMP: {temperature}°C (DS18B20)</span>
          </div>
        </div>
      </div>

      {/* Interactive Hardware Parameter Sliders */}
      <div className="p-4 rounded-xl bg-surface/60 border border-subtle grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted">MOTOR CURRENT:</span>
            <span className="font-bold text-primary">{motorLoad} A</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={motorLoad}
            onChange={(e) => setMotorLoad(Number(e.target.value))}
            className="w-full accent-iris-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted">VIBRATION SEVERITY:</span>
            <span className="font-bold text-primary">{vibrationSeverity} mm/s</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="4.5"
            step="0.1"
            value={vibrationSeverity}
            onChange={(e) => setVibrationSeverity(Number(e.target.value))}
            className="w-full accent-iris-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted">BEARING TEMP:</span>
            <span className="font-bold text-primary">{temperature} °C</span>
          </div>
          <input
            type="range"
            min="25"
            max="95"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full accent-iris-500"
          />
        </div>
      </div>
    </div>
  );
}

/* ====================================================================
 * PROJECT LAB 2: FARMCARGO PREDICTIVE AGRITECH LOGISTICS
 * ==================================================================== */
function FarmCargoLabStage() {
  const [harvestInflux, setHarvestInflux] = useState(65); // Tons / day
  const [procurementCentres, setProcurementCentres] = useState(4);
  const [transitEfficiency, setTransitEfficiency] = useState(88); // %

  const queueLatencyHours = Math.max(0.5, ((harvestInflux / (procurementCentres * 18)) * (100 / transitEfficiency)).toFixed(1));
  const capacityUtilization = Math.min(100, Math.round((harvestInflux / (procurementCentres * 22)) * 100));

  return (
    <div className="w-full flex flex-col p-4 sm:p-6 space-y-6 select-none font-mono">
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-surface border border-subtle">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-xs text-primary">FARMCARGO // PREDICTIVE HARVEST INTAKE ROUTER</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-muted">QUEUE ESTIMATE:</span>
          <span className={`font-bold ${queueLatencyHours > 3 ? 'text-rose-500' : 'text-emerald-500'}`}>
            ~{queueLatencyHours} HOURS WAIT
          </span>
          <span className="px-2 py-0.5 rounded bg-card border border-subtle text-primary font-bold">
            CAPACITY: {capacityUtilization}%
          </span>
        </div>
      </div>

      {/* Grid of Intake Centers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => {
          const isActive = i < procurementCentres;
          const centreLoad = isActive ? Math.min(100, Math.round((harvestInflux / procurementCentres) * (1.1 - i * 0.08))) : 0;
          return (
            <div 
              key={i} 
              className={`p-4 rounded-xl border transition-all ${
                isActive 
                  ? 'bg-card border-subtle shadow-xs' 
                  : 'bg-surface/40 border-dashed border-subtle opacity-50'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] text-muted mb-2">
                <span>HUB-0{i + 1}</span>
                <span className={`w-2 h-2 rounded-full ${isActive ? (centreLoad > 85 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-zinc-600'}`} />
              </div>
              <div className="text-sm font-bold text-primary mb-1">
                {isActive ? `${centreLoad}% INTAKE` : 'OFFLINE'}
              </div>
              <div className="w-full bg-surface rounded-full h-1.5 overflow-hidden border border-subtle mt-2">
                <div 
                  className={`h-full rounded-full ${centreLoad > 85 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${centreLoad}%` }}
                />
              </div>
              <div className="mt-2 text-[10px] text-muted">
                {isActive ? `Silo cap: ${(centreLoad * 0.45).toFixed(1)} MT` : 'Standby'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="p-4 rounded-xl bg-surface/60 border border-subtle grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted">HARVEST INFLUX:</span>
            <span className="font-bold text-primary">{harvestInflux} MT/day</span>
          </div>
          <input
            type="range"
            min="20"
            max="120"
            value={harvestInflux}
            onChange={(e) => setHarvestInflux(Number(e.target.value))}
            className="w-full accent-iris-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted">ACTIVE CENTRES:</span>
            <span className="font-bold text-primary">{procurementCentres} / 4 HUBS</span>
          </div>
          <input
            type="range"
            min="1"
            max="4"
            value={procurementCentres}
            onChange={(e) => setProcurementCentres(Number(e.target.value))}
            className="w-full accent-iris-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted">TRANSIT EFFICIENCY:</span>
            <span className="font-bold text-primary">{transitEfficiency}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="100"
            value={transitEfficiency}
            onChange={(e) => setTransitEfficiency(Number(e.target.value))}
            className="w-full accent-iris-500"
          />
        </div>
      </div>
    </div>
  );
}

/* ====================================================================
 * PROJECT LAB 3: SENTINEL AUTONOMOUS ORBITAL SAFETY SIMULATOR
 * ==================================================================== */
function SentinelLabStage() {
  const [orbitAltitude, setOrbitAltitude] = useState(420); // km
  const [debrisDistance, setDebrisDistance] = useState(14.8); // km
  const [interceptBurn, setInterceptBurn] = useState(false);

  const deltaV = (debrisDistance * 0.18 + (420 / orbitAltitude) * 0.4).toFixed(2);
  const timeToCollision = (debrisDistance / 7.66).toFixed(1);

  return (
    <div className="w-full flex flex-col p-4 sm:p-6 space-y-6 select-none font-mono">
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-surface border border-subtle">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
          <span className="font-bold text-xs text-primary">SENTINEL // CLOHESSY-WILTSHIRE ORBITAL RENDEZVOUS</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-muted">LEO ALT:</span>
          <span className="font-bold text-primary">{orbitAltitude} km</span>
          <span className="text-muted">DELTA-V REQ:</span>
          <span className="px-2 py-0.5 rounded bg-card border border-subtle text-cyan-400 font-bold">
            {deltaV} m/s
          </span>
        </div>
      </div>

      {/* Radar Scope */}
      <div className="relative w-full h-48 bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden flex items-center justify-center p-4">
        {/* Radar concentric circles */}
        <div className="absolute w-40 h-40 rounded-full border border-cyan-500/20" />
        <div className="absolute w-28 h-28 rounded-full border border-cyan-500/30" />
        <div className="absolute w-16 h-16 rounded-full border border-cyan-500/40" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(6,182,212,0.15)" />
        
        {/* Sweep line */}
        <div className="absolute w-40 h-40 rounded-full border-r border-cyan-400/40 animate-spin [animation-duration:4s]" />

        {/* Central Satellite */}
        <div className="relative z-10 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_15px_#06b6d4] flex items-center justify-center text-[8px] text-zinc-950 font-bold">
          S
        </div>

        {/* Target Debris Blip */}
        <motion.div 
          animate={{
            x: [debrisDistance * 5, debrisDistance * 5 - (interceptBurn ? 40 : 0)],
            y: [-debrisDistance * 3, -debrisDistance * 3 + (interceptBurn ? 25 : 0)]
          }}
          transition={{ duration: 0.5 }}
          className="absolute w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_12px_#f43f5e] flex items-center justify-center"
        >
          <div className="absolute -top-4 whitespace-nowrap text-[8px] text-rose-400 font-mono">
            LEO-FRAG {debrisDistance}km
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="p-4 rounded-xl bg-surface/60 border border-subtle grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs items-center">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted">DEBRIS PROXIMITY:</span>
            <span className="font-bold text-primary">{debrisDistance} km</span>
          </div>
          <input
            type="range"
            min="2"
            max="30"
            step="0.5"
            value={debrisDistance}
            onChange={(e) => setDebrisDistance(Number(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted">ORBIT ALTITUDE:</span>
            <span className="font-bold text-primary">{orbitAltitude} km</span>
          </div>
          <input
            type="range"
            min="300"
            max="600"
            value={orbitAltitude}
            onChange={(e) => setOrbitAltitude(Number(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <div className="flex items-center justify-center pt-2">
          <button
            onClick={() => setInterceptBurn(!interceptBurn)}
            className={`w-full py-2.5 px-4 rounded-lg font-bold text-xs transition-all ${
              interceptBurn 
                ? 'bg-rose-500 text-white shadow-md' 
                : 'bg-card hover:bg-surface border border-subtle text-primary'
            }`}
          >
            {interceptBurn ? '🔥 THRUSTERS ENGAGED' : 'EXECUTE INTERCEPT BURN'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ====================================================================
 * PROJECT LAB 4: SIGNBRIDGE CLOUD & EDGE NETWORK LAB
 * ==================================================================== */
function SignBridgeLabStage() {
  const [latency, setLatency] = useState(8);
  const [activeEdgeNode, setActiveEdgeNode] = useState('BOM1 (Mumbai)');

  return (
    <div className="w-full flex flex-col p-4 sm:p-6 space-y-6 select-none font-mono">
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-surface border border-subtle">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
          <span className="font-bold text-xs text-primary">SIGNBRIDGE // GLOBAL CLOUD EDGE TELEMETRY</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-muted">EDGE POP:</span>
          <span className="font-bold text-indigo-400">{activeEdgeNode}</span>
          <span className="px-2 py-0.5 rounded bg-card border border-subtle text-primary font-bold">
            {latency}ms RTT
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: 'EDGE RUNTIME', tech: 'Cloudflare Pages Functions', status: 'HEALTHY // 99.98%' },
          { title: 'DATABASE', tech: 'Supabase PostgreSQL + RLS', status: 'SYNCHRONIZED' },
          { title: 'APPLICATION', tech: 'React 19 + Vite Rollup', status: 'OPTIMIZED // 60 FPS' }
        ].map((node, i) => (
          <div key={i} className="p-4 rounded-xl bg-card border border-subtle space-y-2">
            <div className="text-[10px] text-muted">{node.title}</div>
            <div className="text-sm font-bold text-primary font-sans">{node.tech}</div>
            <div className="text-xs text-emerald-500 font-bold">{node.status}</div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-surface/60 border border-subtle flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-muted">SELECT EDGE NODE:</span>
          {['BOM1 (Mumbai)', 'SIN1 (Singapore)', 'FRA1 (Frankfurt)', 'SFO1 (California)'].map((node) => (
            <button
              key={node}
              onClick={() => {
                setActiveEdgeNode(node);
                setLatency(node.includes('Mumbai') ? 8 : node.includes('Singapore') ? 34 : 110);
              }}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                activeEdgeNode === node ? 'bg-primary text-canvas font-bold' : 'bg-card hover:bg-surface border border-subtle text-secondary'
              }`}
            >
              {node.split(' ')[0]}
            </button>
          ))}
        </div>
        <a 
          href="https://signbridge.click" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-iris-400 hover:underline flex items-center gap-1 font-bold"
        >
          <span>Visit Production Domain</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

/* ====================================================================
 * PROJECT LAB 5: MERRY BERRY KINETIC FLAVOR MATRIX
 * ==================================================================== */
function MerryBerryLabStage() {
  const [sweetness, setSweetness] = useState(70);
  const [fruitNotes, setFruitNotes] = useState('Wild Boysenberry');

  return (
    <div className="w-full flex flex-col p-4 sm:p-6 space-y-6 select-none font-mono">
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-surface border border-subtle">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
          <span className="font-bold text-xs text-primary">MERRY BERRY // KINETIC FLAVOR MATRIX & PARALLAX</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-muted">ACTIVE PROFILE:</span>
          <span className="font-bold text-purple-400">{fruitNotes}</span>
        </div>
      </div>

      <div className="h-44 rounded-xl bg-gradient-to-tr from-purple-950 via-zinc-950 to-pink-950 border border-purple-900/40 p-6 flex flex-col items-center justify-center relative overflow-hidden text-center">
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 4, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-5xl mb-2"
        >
          🍨
        </motion.div>
        <div className="font-sans font-bold text-lg text-white">
          Handcrafted Artisanal Gelato Experience
        </div>
        <div className="text-xs text-purple-300 font-mono mt-1">
          Sweetness index: {sweetness}% · Kinetic Micro-Animations Active
        </div>
      </div>

      <div className="p-4 rounded-xl bg-surface/60 border border-subtle flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-muted">FLAVOR ESSENCE:</span>
          {['Wild Boysenberry', 'Sicilian Pistachio', 'Madagascar Vanilla'].map(f => (
            <button
              key={f}
              onClick={() => setFruitNotes(f)}
              className={`px-3 py-1 rounded text-[11px] transition-colors ${
                fruitNotes === f ? 'bg-purple-600 text-white font-bold' : 'bg-card hover:bg-surface border border-subtle text-secondary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted">SWEETNESS:</span>
          <input
            type="range"
            min="30"
            max="100"
            value={sweetness}
            onChange={(e) => setSweetness(Number(e.target.value))}
            className="w-28 accent-purple-500"
          />
        </div>
      </div>
    </div>
  );
}

/* ====================================================================
 * MAIN LAB PAGE COMPONENT
 * ==================================================================== */
export default function LabPage() {
  const { openProjectModal, activeProjectModal, closeProjectModal } = useStore();
  const [labIndex, setLabIndex] = useState(0);
  const [labViewMode, setLabViewMode] = useState('wheel'); // 'wheel' | 'grid' | 'list'
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const activeProject = featuredProjects[labIndex] || featuredProjects[0];

  const handleNext = () => {
    setLabIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const handlePrev = () => {
    setLabIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  return (
    <div className="relative w-full pt-20 sm:pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
      {/* Background Micro-Grid */}
      <div className="absolute inset-0 technical-grid opacity-25 pointer-events-none" />

      {/* Header and View Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-subtle">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 font-mono text-xs text-muted">
            <span className="w-2 h-2 rounded-full bg-iris-500 animate-pulse" />
            <span>ENGINEERING LABS &amp; PROJECT EXPERIMENTS</span>
          </div>
          <h1 className="editorial-title text-4xl sm:text-5xl font-extrabold text-primary">
            Interactive Project Labs
          </h1>
          <p className="text-sm sm:text-base text-secondary font-sans leading-relaxed">
            Live interactive simulations, hardware telemetry consoles, and architectural deep-dives for Surya's engineering initiatives.
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-surface border border-subtle font-mono text-xs select-none shadow-xs">
          <button
            onClick={() => setLabViewMode('wheel')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
              labViewMode === 'wheel' ? 'bg-primary text-canvas font-bold shadow-xs' : 'text-muted hover:text-primary'
            }`}
          >
            <Disc className="w-3.5 h-3.5" />
            <span>WHEEL</span>
          </button>
          <button
            onClick={() => setLabViewMode('grid')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
              labViewMode === 'grid' ? 'bg-primary text-canvas font-bold shadow-xs' : 'text-muted hover:text-primary'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>GRID</span>
          </button>
          <button
            onClick={() => setLabViewMode('list')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
              labViewMode === 'list' ? 'bg-primary text-canvas font-bold shadow-xs' : 'text-muted hover:text-primary'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>LIST</span>
          </button>
        </div>
      </div>

      {/* WHEEL View: Rotary Project Dial */}
      {labViewMode === 'wheel' && (
        <div className="p-4 sm:p-10 rounded-2xl bg-card border-2 border-strong shadow-2xl relative overflow-hidden space-y-6 sm:space-y-8">
          <div className="text-xs font-mono text-muted flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-subtle pb-3 sm:pb-4">
            <span className="font-bold">ROTARY PROJECT WHEEL</span>
            <span className="text-[11px] text-zinc-500">SELECT PROJECT TO LAUNCH CONSOLE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* The Curved Wheel Menu */}
            <div className="lg:col-span-6 space-y-2 py-1">
              {featuredProjects.map((p, idx) => {
                const isSelected = idx === labIndex;

                return (
                  <motion.div
                    key={p.id}
                    onClick={() => setLabIndex(idx)}
                    className={`cursor-pointer transition-all flex items-center gap-3 sm:gap-4 py-2.5 px-3 sm:px-4 rounded-xl ${
                      isSelected 
                        ? 'bg-surface border-l-4 border-iris-500 text-primary translate-x-2 sm:translate-x-3 shadow-md' 
                        : 'text-muted hover:text-secondary hover:translate-x-1'
                    }`}
                  >
                    <span className="font-mono text-xs font-bold w-7 sm:w-8">
                      0{idx + 1}
                    </span>
                    <h2 className={`font-mono transition-all ${
                      isSelected 
                        ? 'text-lg sm:text-2xl font-extrabold text-primary' 
                        : 'text-sm sm:text-lg'
                    }`}>
                      {p.title}
                    </h2>
                    <span className="font-mono text-[10px] sm:text-[11px] text-muted hidden xs:inline ml-auto">
                      // {p.tag}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Preview Stage */}
            <div className="lg:col-span-6 bg-surface/80 rounded-xl border border-subtle p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-inner">
              <div className="flex items-center justify-between font-mono text-xs text-muted">
                <span className="rubber-stamp">{activeProject.tag}</span>
                <span className="text-[11px]">PROJECT {activeProject.index} / {activeProject.totalCount}</span>
              </div>
              <h3 className="editorial-title text-xl sm:text-2xl font-extrabold text-primary font-sans">
                {activeProject.title}
              </h3>
              <p className="text-xs text-secondary font-sans leading-relaxed">
                {activeProject.summary}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeProject.technologies?.slice(0, 4).map((tech, tIdx) => (
                  <span key={tIdx} className="technical-label text-[10px]">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="pt-3 sm:pt-4 border-t border-subtle flex flex-col xs:flex-row justify-between xs:items-center gap-2.5 font-mono text-xs">
                <button
                  onClick={() => openProjectModal(activeProject)}
                  className="px-3.5 py-2 rounded-lg bg-card hover:bg-surface border border-subtle text-primary font-bold flex items-center justify-center gap-1.5 transition-colors active:scale-95 min-h-[40px]"
                >
                  <span>Open Full Case Study</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <span className="text-iris-400 font-bold text-[11px]">Interactive Lab Active ↓</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Interactive Lab Canvas */}
      <div className="bg-card rounded-2xl border-2 border-strong shadow-2xl p-4 sm:p-6 space-y-4">
        {/* Lab Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-subtle pb-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="rubber-stamp">
              LAB 0{labIndex + 1}
            </span>
            <span className="text-primary font-bold text-base font-sans">
              {activeProject.title} Interactive Engineering Station
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-surface hover:bg-card border border-subtle text-primary transition-colors"
              title="Previous Lab Station"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-bold text-muted">
              0{labIndex + 1} / 0{featuredProjects.length}
            </span>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-surface hover:bg-card border border-subtle text-primary transition-colors"
              title="Next Lab Station"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Project Stage */}
        <div className="relative min-h-[360px] rounded-xl bg-surface/70 border border-subtle overflow-hidden flex items-center justify-center">
          {activeProject.id === 'signbridge' && <SignBridgeLabStage />}
          {activeProject.id === 'ecoclamp-iot' && <EcoClampLabStage />}
          {activeProject.id === 'farmcargo' && <FarmCargoLabStage />}
          {activeProject.id === 'sentinel' && <SentinelLabStage />}
          {activeProject.id === 'merryberry' && <MerryBerryLabStage />}
        </div>
      </div>

      {/* Grid View */}
      {labViewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProjects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setLabIndex(idx)}
              className={`p-5 rounded-xl border-2 text-left font-mono transition-all ${
                idx === labIndex ? 'bg-card border-iris-500 shadow-xl ring-2 ring-iris-500/20' : 'bg-surface hover:bg-card border-subtle text-secondary'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-muted mb-2">
                <span className="font-bold">0{idx + 1} / 0{featuredProjects.length}</span>
                <span className="text-[10px] uppercase font-bold text-iris-400">{p.tag}</span>
              </div>
              <div className="text-base font-bold text-primary mb-1 font-sans">
                {p.title}
              </div>
              <div className="text-xs text-muted font-sans line-clamp-2">
                {p.summary}
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {p.technologies?.slice(0, 3).map((tech, tIdx) => (
                  <span key={tIdx} className="technical-label text-[9px]">
                    {tech}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* List View */}
      {labViewMode === 'list' && (
        <div className="divide-y divide-subtle border-y-2 border-subtle font-mono text-xs">
          {featuredProjects.map((p, idx) => (
            <div
              key={p.id}
              onClick={() => setLabIndex(idx)}
              className={`py-4 px-4 flex items-center justify-between cursor-pointer transition-colors ${
                idx === labIndex ? 'bg-surface text-primary font-bold border-l-4 border-iris-500' : 'text-secondary hover:text-primary hover:bg-surface/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-muted font-bold">0{idx + 1}</span>
                <span className="text-sm font-semibold font-sans">{p.title}</span>
                <span className="text-muted hidden md:inline">// {p.category}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-muted text-[11px] hidden sm:inline">{p.technologies?.[0]}</span>
                <span className="px-2 py-0.5 rounded bg-card border border-subtle text-primary font-bold text-[10px]">
                  {p.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Case Study Modal Window */}
      {activeProjectModal && (
        <ProjectModal
          project={activeProjectModal}
          onClose={closeProjectModal}
        />
      )}
    </div>
  );
}
