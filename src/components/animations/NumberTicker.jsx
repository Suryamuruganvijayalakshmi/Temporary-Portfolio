import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * React Bits — NumberTicker
 * Counts up smoothly from 0 to the target number when in viewport.
 */
export function NumberTicker({
  value = 100,
  duration = 1.8,
  prefix = '',
  suffix = '',
  className = '',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const target = Number(value) || 0;

    const animateNumber = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(easeProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      } else {
        setDisplayValue(target);
      }
    };

    requestAnimationFrame(animateNumber);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={`font-mono font-bold tracking-tight ${className}`}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
