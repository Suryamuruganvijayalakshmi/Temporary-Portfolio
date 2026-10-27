import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress - Pinned top multi-color laser beam with glow
 * React Bits / Modern UI Scroll Indicator
 */
export function ScrollProgress({ className = '' }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className={`fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none ${className}`}>
      {/* Background track line */}
      <div className="absolute inset-0 bg-stone-200/20 backdrop-blur-xs" />

      {/* Animated active gradient laser beam */}
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-blue-600 via-cyan-400 to-orange-500 shadow-[0_0_12px_rgba(37,99,235,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
}
