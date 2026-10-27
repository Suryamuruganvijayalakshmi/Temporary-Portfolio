import React from 'react';
import { motion } from 'framer-motion';

/**
 * React Bits — VelocityMarquee
 * Smooth, infinite horizontal ticker ribbon with subtle hover pause.
 */
export function VelocityMarquee({
  items = [],
  speed = 28,
  direction = 'left',
  className = '',
}) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap flex select-none py-3 relative ${className}`}>
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#fafaf8] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#fafaf8] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
        className="flex items-center gap-6 shrink-0"
      >
        {repeated.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-6 font-mono text-xs sm:text-sm font-semibold tracking-wider text-stone-700 hover:text-blue-600 transition-colors"
          >
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600/60" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
