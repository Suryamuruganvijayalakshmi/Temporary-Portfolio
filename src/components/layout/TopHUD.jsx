import React from 'react';
import { useStore } from '../../lib/store';
import { useTelemetryMonitor } from '../../lib/telemetry';

export default function TopHUD() {
  useTelemetryMonitor();

  const {
    fps,
    lcp,
    currentTime,
    onlineCount,
    presenceStatus,
    presenceEnabled,
    availability
  } = useStore();

  return (
    <header 
      aria-label="System Telemetry HUD" 
      className="sticky top-0 z-40 w-full select-none px-4 sm:px-8 py-1.5 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar text-[10px] sm:text-[11px] font-mono whitespace-nowrap">
        {/* Left Telemetry Badges */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Universal Time */}
          <div className="px-2 py-0.5 rounded border border-zinc-300/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 text-zinc-600 dark:text-zinc-400 shadow-2xs">
            <span className="text-zinc-400 dark:text-zinc-500 font-semibold">UT:: </span>
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">{currentTime || '20:04IST'}</span>
          </div>

          {/* Measured FPS */}
          <div className="px-2 py-0.5 rounded border border-zinc-300/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 text-zinc-600 dark:text-zinc-400 shadow-2xs">
            <span className="text-zinc-400 dark:text-zinc-500 font-semibold">FPS:: </span>
            <span className={`font-bold ${fps >= 50 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`}>
              {fps || 60}
            </span>
          </div>

          {/* Online Presence Count */}
          <div className="px-2 py-0.5 rounded border border-zinc-300/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 text-zinc-600 dark:text-zinc-400 shadow-2xs">
            <span className="text-zinc-400 dark:text-zinc-500 font-semibold">ONLINE:: </span>
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">0{onlineCount || 1}</span>
          </div>

          {/* LCP Measurement */}
          <div className="hidden sm:inline-block px-2 py-0.5 rounded border border-zinc-300/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 text-zinc-600 dark:text-zinc-400 shadow-2xs">
            <span className="text-zinc-400 dark:text-zinc-500 font-semibold">LCP:: </span>
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">{lcp || '1.4s'}</span>
          </div>

          {/* Presence Status */}
          <div className="hidden md:inline-block px-2 py-0.5 rounded border border-zinc-300/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 text-zinc-600 dark:text-zinc-400 shadow-2xs">
            <span className="text-zinc-400 dark:text-zinc-500 font-semibold">PRESENCE:: </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {presenceEnabled ? 'ON' : 'MUTED'}
            </span>
          </div>
        </div>

        {/* Right Availability Badge */}
        <div className="flex items-center gap-1.5">
          <div className="px-2 py-0.5 rounded border border-zinc-300/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 text-zinc-600 dark:text-zinc-400 shadow-2xs">
            <span className="text-zinc-400 dark:text-zinc-500 font-semibold">Availability:: </span>
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">NOV'26</span>
          </div>
        </div>
      </div>
    </header>
  );
}
