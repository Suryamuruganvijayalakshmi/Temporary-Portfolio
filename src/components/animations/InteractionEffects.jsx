import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * React Bits inspired GlareHover
 * Adds dynamic glare reflection and subtle perspective tilt on hover without 3D WebGL.
 */
export function GlareHover({
  children,
  className = '',
  glareColor = 'rgba(255, 255, 255, 0.18)',
  maxTilt = 6,
}) {
  const cardRef = useRef(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e) => {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    const tiltX = ((y / rect.height) - 0.5) * -maxTilt;
    const tiltY = ((x / rect.width) - 0.5) * maxTilt;

    setGlarePos({ x: percentX, y: percentY, opacity: 1 });
    setTilt({ rotateX: tiltX, rotateY: tiltY });
  };

  const handleMouseLeave = () => {
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: prefersReduced ? 'none' : `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}

      {/* Glare Sheen Overlay */}
      {!prefersReduced && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle 380px at ${glarePos.x}% ${glarePos.y}%, ${glareColor}, transparent 80%)`,
          }}
        />
      )}
    </div>
  );
}

/**
 * React Bits inspired AnimatedContent
 * Viewport scroll-triggered entrance wrapper with staggered reveal.
 */
export function AnimatedContent({
  children,
  className = '',
  delay = 0,
  yOffset = 24,
  direction = 'vertical', // 'vertical' | 'horizontal'
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: direction === 'vertical' ? yOffset : 0,
        x: direction === 'horizontal' ? -yOffset : 0,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
