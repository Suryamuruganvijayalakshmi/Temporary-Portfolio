import React from 'react';

/**
 * React Bits — ShinyText
 * Creates an animated radiant light sheen traveling continuously across text.
 */
export function ShinyText({
  children,
  className = '',
  shimmerColor = '#0066ff',
  speed = '4s',
}) {
  return (
    <span
      className={`relative inline-block font-bold tracking-tight bg-clip-text text-transparent bg-[linear-gradient(110deg,#1c1917_35%,#0066ff_50%,#f97316_58%,#1c1917_70%)] bg-[length:250%_100%] animate-shine ${className}`}
      style={{
        animationDuration: speed,
      }}
    >
      {children}
    </span>
  );
}
