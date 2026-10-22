import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../lib/store';

const routeLabels = {
  '/': 'Home',
  '/about': 'About',
  '/lab': 'Lab',
  '/writing': 'Writing',
  '/studio': 'Studio',
  '/contact': 'Contact'
};

export default function IdentityPill() {
  const { activeRoute, setActiveRoute } = useStore();
  const currentLabel = routeLabels[activeRoute] || 'Home';

  return (
    <div className="relative inline-flex items-center">
      <motion.button
        onClick={() => setActiveRoute('/')}
        className="group relative flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-zinc-400 select-none text-left"
        aria-label={`Current location: ${currentLabel}. Click to return to Home`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Monogram Badge (Double-circle outline as in screenshots) */}
        <div className="w-5 h-5 rounded-full border border-zinc-800 dark:border-zinc-200 flex items-center justify-center p-0.5">
          <div className="w-full h-full rounded-full border border-zinc-500/50 flex items-center justify-center text-zinc-900 dark:text-zinc-100 font-mono font-bold text-[10px]">
            S
          </div>
        </div>

        {/* Dynamic Route Indicator */}
        <AnimatePresence mode="wait">
          <motion.span
            key={activeRoute}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 4 }}
            transition={{ duration: 0.15 }}
            className="text-zinc-900 dark:text-zinc-100 font-sans text-xs font-semibold tracking-tight pr-1"
          >
            {currentLabel}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
