import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * React Bits — SpotlightCard with Animated BorderBeam
 * Features a dynamic mouse flashlight and moving laser border beam.
 */
export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(0, 102, 255, 0.12)',
  borderColor = 'rgba(0, 102, 255, 0.4)',
  showBorderBeam = true,
}) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl border border-stone-200/90 bg-white transition-all duration-300 hover:shadow-xl ${className}`}
    >
      {/* 1. Dynamic Mouse Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(550px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 75%)`,
        }}
      />

      {/* 2. Moving Laser Border Beam */}
      {showBorderBeam && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            opacity: opacity ? 0.9 : 0,
            background: `radial-gradient(280px circle at ${position.x}px ${position.y}px, ${borderColor}, transparent 60%)`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1.5px',
          }}
        />
      )}

      {/* 3. Card Inner Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
