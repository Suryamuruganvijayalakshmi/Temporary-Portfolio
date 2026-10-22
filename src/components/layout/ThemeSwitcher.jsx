import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../lib/store';
import { Sun, Moon } from 'lucide-react';

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useStore();
  const isDark = resolvedTheme === 'dark';

  return (
    <div
      role="group"
      aria-label="Theme switcher"
      className="inline-flex items-center p-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.06)] select-none"
    >
      {/* Light Button */}
      <button
        onClick={() => setTheme('light')}
        aria-label="Switch to light theme"
        className={`relative p-1.5 rounded-full transition-colors ${
          !isDark ? 'text-zinc-950 font-bold' : 'text-zinc-400 hover:text-zinc-600'
        }`}
      >
        {!isDark && (
          <motion.div
            layoutId="themePill"
            className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 rounded-full"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
        <Sun className="relative z-10 w-3.5 h-3.5" />
      </button>

      {/* Dark Button */}
      <button
        onClick={() => setTheme('dark')}
        aria-label="Switch to dark theme"
        className={`relative p-1.5 rounded-full transition-colors ${
          isDark ? 'text-white font-bold' : 'text-zinc-400 hover:text-zinc-600'
        }`}
      >
        {isDark && (
          <motion.div
            layoutId="themePill"
            className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 rounded-full"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
        <Moon className="relative z-10 w-3.5 h-3.5" />
      </button>
    </div>
  );
}
