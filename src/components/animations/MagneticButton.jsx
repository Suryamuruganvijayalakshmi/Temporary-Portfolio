import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * React Bits — MagneticButton
 * Magnetically pulls the button toward the cursor with natural spring physics.
 */
export function MagneticButton({
  children,
  className = '',
  onClick,
  pullStrength = 0.35,
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const springConfig = { damping: 18, stiffness: 220, mass: 0.1 };
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    springX.set(middleX * pullStrength);
    springY.set(middleY * pullStrength);
  };

  const handleMouseLeave = () => {
    springX.set(0);
    springY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        x: springX,
        y: springY,
      }}
      className={`relative inline-flex items-center justify-center cursor-pointer transition-colors ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
