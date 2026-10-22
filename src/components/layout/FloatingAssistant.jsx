import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../lib/store';
import { featuredProjects, profileConfig } from '../../data/portfolioData';
import { 
  Bot, 
  X, 
  Compass, 
  Sparkles, 
  Mail, 
  Cpu, 
  Radio, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function FloatingAssistant() {
  const { 
    isAssistantOpen, 
    toggleAssistant, 
    closeAssistant, 
    setActiveRoute,
    openProjectModal,
    openCommandPalette
  } = useStore();

  return (
    <>
      {/* Floating Bottom-Right Circular Trigger */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        <motion.button
          onClick={toggleAssistant}
          className="relative w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center text-zinc-900 dark:text-zinc-100 group transition-transform focus-visible:ring-2 focus-visible:ring-zinc-400"
          aria-expanded={isAssistantOpen}
          aria-label="Toggle portfolio navigation assistant"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          {isAssistantOpen ? (
            <X className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
          ) : (
            <div className="relative flex items-center justify-center">
              {/* Colorful gradient assistant emblem matching screenshot */}
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-xs flex items-center justify-center">
                <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-full flex items-center justify-center text-[11px]">
                  ✨
                </div>
              </div>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          )}
        </motion.button>
      </div>

      {/* Assistant Flyout Panel */}
      <AnimatePresence>
        {isAssistantOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-20 right-6 z-40 w-80 sm:w-96 rounded-2xl bg-card border border-strong shadow-2xl p-4 flex flex-col gap-3 font-mono"
            role="region"
            aria-label="Portfolio Navigator Assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-subtle pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold tracking-tight text-primary">
                  STUDIO NAVIGATOR
                </span>
              </div>
              <span className="text-[10px] text-muted uppercase bg-surface px-1.5 py-0.5 rounded border border-subtle">
                LOCAL CLIENT
              </span>
            </div>

            {/* Quick Greeting */}
            <p className="text-xs text-secondary leading-relaxed font-sans">
              Welcome. This local navigator gives you fast access to Surya V M's projects, experiments, and contact channels.
            </p>

            {/* Fast Project Jump */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider text-muted font-bold">
                Direct Project Inspection:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {featuredProjects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      openProjectModal(proj);
                      closeAssistant();
                    }}
                    className="flex items-center justify-between p-2 rounded-lg bg-surface hover:bg-card-hover border border-subtle text-left transition-colors group"
                  >
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold text-primary truncate">
                        {proj.title}
                      </div>
                      <div className="text-[9px] text-muted truncate">
                        {proj.category.split('•')[0]}
                      </div>
                    </div>
                    <ChevronRight className="w-3 h-3 text-muted group-hover:text-primary transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Shortcuts */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-muted font-bold">
                Quick Shortcuts:
              </span>
              <div className="flex flex-wrap gap-1.5 text-xs">
                <button
                  onClick={() => {
                    setActiveRoute('/lab');
                    closeAssistant();
                  }}
                  className="px-2.5 py-1 rounded bg-surface hover:bg-surface/80 border border-subtle text-secondary hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-iris-400" />
                  <span>Lab (9 Experiments)</span>
                </button>
                <button
                  onClick={() => {
                    setActiveRoute('/contact');
                    closeAssistant();
                  }}
                  className="px-2.5 py-1 rounded bg-surface hover:bg-surface/80 border border-subtle text-secondary hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3 h-3 text-emerald-400" />
                  <span>Send Inquiry Letter</span>
                </button>
                <button
                  onClick={() => {
                    closeAssistant();
                    openCommandPalette();
                  }}
                  className="px-2.5 py-1 rounded bg-surface hover:bg-surface/80 border border-subtle text-secondary hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span>Command OS (⌘K)</span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-2 border-t border-subtle flex items-center justify-between text-[10px] text-muted">
              <span>{profileConfig.email}</span>
              <span>{profileConfig.location}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
