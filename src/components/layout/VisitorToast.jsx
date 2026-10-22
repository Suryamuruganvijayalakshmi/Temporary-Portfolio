import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../lib/store';

export default function VisitorToast() {
  const { onlineCount, presenceEnabled } = useStore();
  const [toastMessage, setToastMessage] = useState({
    action: 'Someone joined',
    count: onlineCount || 1,
    visible: true
  });

  useEffect(() => {
    // Subtle presence events simulator if standalone
    const interval = setInterval(() => {
      const actions = ['Someone joined', 'Someone left', 'Visitor active'];
      const action = actions[Math.floor(Math.random() * actions.length)];
      setToastMessage({
        action,
        count: Math.max(1, onlineCount + (action === 'Someone joined' ? 1 : 0)),
        visible: true
      });
    }, 28000);

    return () => clearInterval(interval);
  }, [onlineCount]);

  if (!presenceEnabled) return null;

  return (
    <div id="visitor-toast" className="fixed bottom-6 left-6 z-40 select-none pointer-events-none">
      <AnimatePresence>
        {toastMessage.visible && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto px-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-[0_8px_30px_rgba(0,0,0,0.08)] font-mono text-xs flex flex-col gap-0.5 min-w-[140px]"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-zinc-900 dark:text-zinc-100 font-medium">
                {toastMessage.action}
              </span>
            </div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 pl-3.5">
              0{toastMessage.count} online
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
