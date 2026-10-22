import React from 'react';

/**
 * High-fidelity visual artworks & logos for all 6 projects,
 * reproducing the exact composition, lighting, and aesthetic from the reference screenshots.
 */

// 1. Featured Project Photographic Compositions
export function ProjectPhoto({ projectId, className = "" }) {
  switch (projectId) {
    case 'signbridge':
      return (
        <div className={`relative w-full h-full rounded-2xl overflow-hidden bg-[#0d0f17] shadow-2xl flex items-center justify-center select-none ${className}`}>
          {/* Hardware & Cloud Console High-Contrast Illustration */}
          <svg className="w-full h-full p-2" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="sbGlowVivid" cx="50%" cy="50%" r="55%">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.6" />
                <stop offset="60%" stopColor="#818cf8" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0d0f17" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="sbPillar" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#312e81" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="sbBeamVivid" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>

            {/* Background Glow */}
            <rect width="600" height="400" fill="#0d0f17" />
            <circle cx="300" cy="200" r="220" fill="url(#sbGlowVivid)" />

            {/* Perspective Light Grid */}
            <g opacity="0.6" stroke="#6366f1" strokeWidth="1.5">
              <line x1="30" y1="360" x2="570" y2="360" />
              <line x1="80" y1="310" x2="520" y2="310" />
              <line x1="140" y1="270" x2="460" y2="270" />
              <line x1="190" y1="240" x2="410" y2="240" />
              <line x1="300" y1="200" x2="30" y2="360" />
              <line x1="300" y1="200" x2="160" y2="360" />
              <line x1="300" y1="200" x2="300" y2="360" stroke="#06b6d4" strokeWidth="2" />
              <line x1="300" y1="200" x2="440" y2="360" />
              <line x1="300" y1="200" x2="570" y2="360" />
            </g>

            {/* Central Hardware Server / Terminal Console */}
            <rect x="210" y="70" width="180" height="210" rx="16" fill="url(#sbPillar)" stroke="#818cf8" strokeWidth="2.5" />
            
            {/* Illuminated Glass Display Screen */}
            <rect x="226" y="90" width="148" height="95" rx="8" fill="#030712" stroke="#4338ca" strokeWidth="2" />
            
            {/* Glowing Terminal Line Readouts */}
            <line x1="242" y1="112" x2="315" y2="112" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
            <line x1="242" y1="126" x2="350" y2="126" stroke="#e0e7ff" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="242" y1="140" x2="295" y2="140" stroke="#a5b4fc" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="242" y1="154" x2="335" y2="154" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="352" cy="112" r="3" fill="#38bdf8" />

            {/* Central Energy Reactor Ring */}
            <circle cx="300" cy="225" r="32" fill="#1e1b4b" stroke="#818cf8" strokeWidth="3" strokeDasharray="6 4" />
            <circle cx="300" cy="225" r="20" fill="#312e81" stroke="#06b6d4" strokeWidth="2" />
            <circle cx="300" cy="225" r="8" fill="#ffffff" />
            
            {/* High-Tech Circuit Traces & External Nodes */}
            <path d="M210 135 L120 135 L80 180" stroke="url(#sbBeamVivid)" strokeWidth="3" strokeLinecap="round" />
            <circle cx="80" cy="180" r="14" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2.5" />
            <circle cx="80" cy="180" r="5" fill="#ffffff" />

            <path d="M390 135 L480 135 L520 180" stroke="url(#sbBeamVivid)" strokeWidth="3" strokeLinecap="round" />
            <circle cx="520" cy="180" r="14" fill="#500724" stroke="#f43f5e" strokeWidth="2.5" />
            <circle cx="520" cy="180" r="5" fill="#ffffff" />

            {/* Top & Bottom Status Readouts */}
            <rect x="24" y="24" width="240" height="28" rx="6" fill="#1e1b4b" stroke="#4338ca" />
            <text x="36" y="43" fill="#c7d2fe" fontFamily="monospace" fontSize="12" fontWeight="bold" letterSpacing="1">
              SIGNBRIDGE :: VENTURE 01
            </text>

            <text x="36" y="380" fill="#38bdf8" fontFamily="monospace" fontSize="11" fontWeight="bold">
              PLATFORM // ACTIVE CLOUD EDGE
            </text>
            <text x="564" y="380" textAnchor="end" fill="#c7d2fe" fontFamily="monospace" fontSize="11">
              LATENCY: 8ms · 60 FPS
            </text>
          </svg>
        </div>
      );

    case 'ecoclamp-iot':
    case 'ecoclamp':
      // Matches the EXACT high-tech radial coil / reactor from Screenshot 1 & 2!
      return (
        <div className={`relative w-full h-full rounded-2xl overflow-hidden bg-black shadow-2xl flex items-center justify-center select-none ${className}`}>
          <svg className="w-full h-full p-2" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="coilGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#d97706" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="metalBlock" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>

            <rect width="600" height="400" fill="#08090c" />
            <circle cx="300" cy="200" r="160" fill="url(#coilGlow)" />

            {/* Central Torus Ring Coils */}
            <circle cx="300" cy="200" r="75" stroke="#f59e0b" strokeWidth="8" opacity="0.8" />
            <circle cx="300" cy="200" r="65" stroke="#b45309" strokeWidth="6" />
            <circle cx="300" cy="200" r="55" stroke="#d97706" strokeWidth="5" />
            <circle cx="300" cy="200" r="45" stroke="#78350f" strokeWidth="4" />
            <circle cx="300" cy="200" r="32" fill="#0c0d12" stroke="#f59e0b" strokeWidth="2" />

            {/* Radial Core Blocks (6 Radial Clamp Units matching the screenshot) */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 300 + Math.cos(rad) * 115;
              const y = 200 + Math.sin(rad) * 115;
              return (
                <g key={i} transform={`translate(${x}, ${y}) rotate(${angle + 90})`}>
                  {/* Metal core block */}
                  <rect x="-24" y="-35" width="48" height="70" rx="4" fill="url(#metalBlock)" stroke="#e2e8f0" strokeWidth="1" />
                  {/* Copper wiring wraps */}
                  <rect x="-20" y="-20" width="40" height="40" rx="2" fill="#92400e" stroke="#f59e0b" strokeWidth="1.5" />
                  <line x1="-20" y1="-10" x2="20" y2="-10" stroke="#fbbf24" strokeWidth="1" />
                  <line x1="-20" y1="0" x2="20" y2="0" stroke="#fbbf24" strokeWidth="1" />
                  <line x1="-20" y1="10" x2="20" y2="10" stroke="#fbbf24" strokeWidth="1" />
                  {/* Outer mounting tab */}
                  <rect x="-14" y="35" width="28" height="12" rx="2" fill="#475569" />
                  <circle cx="0" cy="41" r="3" fill="#cbd5e1" />
                </g>
              );
            })}

            {/* Fiber / Sensor cables */}
            <path d="M300 200 Q200 350 120 380" stroke="#ef4444" strokeWidth="3" opacity="0.8" />
            <path d="M300 200 Q400 350 480 380" stroke="#3b82f6" strokeWidth="3" opacity="0.8" />
            <path d="M300 200 Q310 360 300 400" stroke="#10b981" strokeWidth="2.5" opacity="0.8" />

            {/* Telemetry Labels */}
            <text x="25" y="35" fill="#f59e0b" fontFamily="monospace" fontSize="11" letterSpacing="1.5">ECOCLAMP // AIoT HARMONIC MONITOR</text>
            <text x="25" y="375" fill="#94a3b8" fontFamily="monospace" fontSize="10">SAMPLE: 10 kHz • SCT-013</text>
            <text x="475" y="375" fill="#10b981" fontFamily="monospace" fontSize="10">STATUS: NOMINAL</text>
          </svg>
        </div>
      );

    case 'farmcargo':
      return (
        <div className={`relative w-full h-full rounded-2xl overflow-hidden bg-zinc-950 shadow-2xl flex items-center justify-center select-none ${className}`}>
          <svg className="w-full h-full p-2" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="farmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#064e3b" />
                <stop offset="60%" stopColor="#022c22" />
                <stop offset="100%" stopColor="#000" />
              </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#farmGrad)" />
            
            {/* Topographical contours */}
            <g opacity="0.25" stroke="#10b981" strokeWidth="1.2" fill="none">
              <ellipse cx="300" cy="200" rx="240" ry="140" />
              <ellipse cx="300" cy="200" rx="190" ry="105" />
              <ellipse cx="300" cy="200" rx="140" ry="75" />
              <ellipse cx="300" cy="200" rx="80" ry="40" />
            </g>

            {/* Procurement Center Hub */}
            <circle cx="300" cy="200" r="32" fill="#047857" stroke="#34d399" strokeWidth="2.5" />
            <polygon points="300,185 315,210 285,210" fill="#ffffff" />

            {/* Inbound Cargo Flow Routes */}
            <path d="M100 80 Q200 120 270 190" stroke="#34d399" strokeWidth="2.5" strokeDasharray="6 4" />
            <circle cx="100" cy="80" r="10" fill="#065f46" stroke="#34d399" strokeWidth="2" />
            <text x="70" y="65" fill="#a7f3d0" fontFamily="monospace" fontSize="9">CENTRE A (94%)</text>

            <path d="M500 90 Q400 130 330 190" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6 4" />
            <circle cx="500" cy="90" r="10" fill="#78350f" stroke="#f59e0b" strokeWidth="2" />
            <text x="460" y="75" fill="#fde68a" fontFamily="monospace" fontSize="9">CENTRE B (42%)</text>

            <path d="M120 320 Q210 270 275 210" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" />
            <circle cx="120" cy="320" r="9" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />

            {/* Forecast Window Overlay */}
            <rect x="200" y="270" width="200" height="55" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1" opacity="0.9" />
            <text x="215" y="292" fill="#6ee7b7" fontFamily="monospace" fontSize="10" fontWeight="bold">ARRIVAL LOOKAHEAD</text>
            <text x="215" y="310" fill="#e2e8f0" fontFamily="monospace" fontSize="9">+420 TONS EXPECTED // 72H</text>

            <text x="25" y="35" fill="#34d399" fontFamily="monospace" fontSize="11" letterSpacing="1.5">FARMCARGO // LOGISTICS COORDINATION</text>
            <text x="25" y="375" fill="#6ee7b7" fontFamily="monospace" fontSize="10">STORAGE DISPATCH: OPTIMAL</text>
          </svg>
        </div>
      );

    case 'sentinel':
      return (
        <div className={`relative w-full h-full rounded-2xl overflow-hidden bg-black shadow-2xl flex items-center justify-center select-none ${className}`}>
          <svg className="w-full h-full p-2" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="earthGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="45%" stopColor="#0369a1" />
                <stop offset="85%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#020617" />
              </radialGradient>
            </defs>
            <rect width="600" height="400" fill="#05070e" />

            {/* Stars background */}
            <g fill="#ffffff" opacity="0.6">
              <circle cx="80" cy="60" r="1" />
              <circle cx="150" cy="180" r="1.5" />
              <circle cx="240" cy="40" r="1" />
              <circle cx="480" cy="70" r="1" />
              <circle cx="530" cy="210" r="1.5" />
              <circle cx="420" cy="330" r="1" />
              <circle cx="90" cy="340" r="1" />
            </g>

            {/* Earth Planet Sphere */}
            <circle cx="300" cy="200" r="90" fill="url(#earthGrad)" />
            <circle cx="300" cy="200" r="90" stroke="#38bdf8" strokeWidth="1.5" opacity="0.5" />

            {/* Orbital Trajectory Lines (LEO Ellipses) */}
            <g fill="none">
              <ellipse cx="300" cy="200" rx="170" ry="60" stroke="#818cf8" strokeWidth="1.5" transform="rotate(-25 300 200)" />
              <ellipse cx="300" cy="200" rx="200" ry="75" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="5 5" transform="rotate(20 300 200)" />
              <ellipse cx="300" cy="200" rx="230" ry="90" stroke="#38bdf8" strokeWidth="1" opacity="0.6" transform="rotate(-5 300 200)" />
            </g>

            {/* Target Satellite Node */}
            <circle cx="380" cy="140" r="6" fill="#ec4899" />
            <rect x="365" y="137" width="30" height="6" fill="#38bdf8" rx="1" />
            <circle cx="380" cy="140" r="14" stroke="#ec4899" strokeWidth="1" strokeDasharray="3 3" />

            {/* Interceptor Vector Beam */}
            <line x1="220" y1="260" x2="380" y2="140" stroke="#34d399" strokeWidth="2" strokeDasharray="4 2" />
            <circle cx="220" cy="260" r="7" fill="#10b981" />

            <text x="25" y="35" fill="#818cf8" fontFamily="monospace" fontSize="11" letterSpacing="1.5">SENTINEL // ORBITAL RESCUE SIMULATOR</text>
            <text x="25" y="375" fill="#38bdf8" fontFamily="monospace" fontSize="10">ORBIT: 420 km LEO • CLOHESSY-WILTSHIRE</text>
            <text x="475" y="375" fill="#34d399" fontFamily="monospace" fontSize="10">INTERCEPT: LOCKED</text>
          </svg>
        </div>
      );

    case 'merryberry':
      return (
        <div className={`relative w-full h-full rounded-2xl overflow-hidden bg-zinc-950 shadow-2xl flex items-center justify-center select-none ${className}`}>
          <svg className="w-full h-full p-2" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="mbGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="swirlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="50%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#3b0764" />
              </linearGradient>
            </defs>
            <rect width="600" height="400" fill="#0e0717" />
            <circle cx="300" cy="200" r="160" fill="url(#mbGlow)" />

            {/* Stylized Ice Cream Sundae Glass & Swirl */}
            <path d="M220 310 L380 310 L340 220 L260 220 Z" fill="#2e1065" stroke="#c084fc" strokeWidth="2" opacity="0.7" />
            <line x1="300" y1="310" x2="300" y2="350" stroke="#c084fc" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="300" cy="355" rx="55" ry="12" fill="#3b0764" stroke="#c084fc" strokeWidth="2" />

            {/* Artisanal Ice Cream Scoops */}
            <circle cx="300" cy="180" r="65" fill="url(#swirlGrad)" stroke="#f472b6" strokeWidth="2" />
            <circle cx="260" cy="155" r="45" fill="#10b981" stroke="#34d399" strokeWidth="2" opacity="0.9" />
            <circle cx="340" cy="155" r="45" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2" opacity="0.9" />

            {/* Berry Garnish & Shimmer */}
            <circle cx="300" cy="105" r="14" fill="#e11d48" stroke="#f43f5e" strokeWidth="2" />
            <path d="M300 95 Q315 80 325 85" stroke="#10b981" strokeWidth="3" fill="none" strokeLinecap="round" />

            <text x="25" y="35" fill="#c084fc" fontFamily="monospace" fontSize="11" letterSpacing="1.5">MERRY BERRY // INTERACTIVE MENU</text>
            <text x="25" y="375" fill="#f472b6" fontFamily="monospace" fontSize="10">PALETTE: WILD BOYSENBERRY • KINETIC PARALLAX</text>
          </svg>
        </div>
      );

    case 'esim-visa-alert':
      return (
        <div className={`relative w-full h-full rounded-2xl overflow-hidden bg-zinc-950 shadow-2xl flex items-center justify-center select-none ${className}`}>
          <svg className="w-full h-full p-2" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="simGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="600" height="400" fill="#040b11" />
            <circle cx="300" cy="200" r="160" fill="url(#simGlow)" />

            {/* eSIM Gold Contact Matrix */}
            <rect x="200" y="110" width="200" height="180" rx="16" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
            
            {/* Notch on SIM */}
            <polygon points="370,110 400,140 400,110" fill="#040b11" stroke="#10b981" strokeWidth="2" />

            {/* Gold Circuit Grid */}
            <rect x="230" y="140" width="60" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.5" />
            <rect x="310" y="140" width="60" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.5" />
            <rect x="230" y="210" width="60" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.5" />
            <rect x="310" y="210" width="60" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.5" />

            {/* Central Privacy Shield Icon */}
            <circle cx="300" cy="200" r="28" fill="#0f172a" stroke="#34d399" strokeWidth="2" />
            <path d="M300 185 L314 193 V208 C314 218 300 223 300 223 C300 223 286 218 286 208 V193 Z" fill="#059669" stroke="#34d399" strokeWidth="1.5" />

            {/* International Roaming Wave Pulses */}
            <path d="M140 200 Q200 160 200 200" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <path d="M460 200 Q400 160 400 200" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" fill="none" />

            <text x="25" y="35" fill="#34d399" fontFamily="monospace" fontSize="11" letterSpacing="1.5">eSIM INTELLIGENCE // ZERO-KNOWLEDGE</text>
            <text x="25" y="375" fill="#6ee7b7" fontFamily="monospace" fontSize="10">MCC/MNC: 214-07 • PROTOCOL: ANONYMIZED</text>
            <text x="470" y="375" fill="#10b981" fontFamily="monospace" fontSize="10">ENCRYPTED</text>
          </svg>
        </div>
      );

    default:
      return null;
  }
}

// 2. Square Project Logo / Emblem Cards (matching the right-side card in Screenshot 1 & 2!)
export function ProjectLogoCard({ projectId, className = "" }) {
  const getLogoContent = () => {
    switch (projectId) {
      case 'signbridge':
        return (
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-rose-500 p-0.5 shadow-xl flex items-center justify-center">
            <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center font-bold text-2xl sm:text-3xl text-indigo-600 dark:text-indigo-400 font-mono tracking-tighter shadow-inner">
              SB
            </div>
          </div>
        );

      case 'ecoclamp-iot':
      case 'ecoclamp':
        // Reproduces the exact glowing circular logo from Screenshot 1 & 2!
        return (
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center">
            {/* Outer dark ring with metallic rim */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 dark:from-zinc-800 dark:to-zinc-950 p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-white dark:bg-black p-1 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                  {/* Glowing stylized emblem */}
                  <circle cx="50" cy="50" r="42" stroke="url(#logoGrad)" strokeWidth="6" />
                  <path d="M35 30 V70" stroke="url(#logoGrad)" strokeWidth="8" strokeLinecap="round" />
                  <path d="M48 50 H65" stroke="url(#logoGrad)" strokeWidth="8" strokeLinecap="round" />
                  <path d="M56 38 V62" stroke="url(#logoGrad)" strokeWidth="8" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="logoGrad" x1="0" y1="0" x2="100" y2="100">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        );

      case 'farmcargo':
        return (
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500 shadow-xl flex items-center justify-center">
            <div className="text-3xl sm:text-4xl text-emerald-600 dark:text-emerald-400">
              🌱
            </div>
          </div>
        );

      case 'sentinel':
        return (
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border-2 border-indigo-500 shadow-xl flex items-center justify-center">
            <div className="text-3xl sm:text-4xl text-indigo-500">
              🛰️
            </div>
          </div>
        );

      case 'merryberry':
        return (
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-purple-50 dark:bg-purple-950/60 border-2 border-purple-500 shadow-xl flex items-center justify-center">
            <div className="text-3xl sm:text-4xl">
              🍨
            </div>
          </div>
        );

      case 'esim-visa-alert':
        return (
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-teal-50 dark:bg-teal-950/60 border-2 border-teal-500 shadow-xl flex items-center justify-center">
            <div className="text-3xl sm:text-4xl text-teal-500">
              🛡️
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.12)] flex items-center justify-center select-none ${className}`}>
      {getLogoContent()}
    </div>
  );
}
