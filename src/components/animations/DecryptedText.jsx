import React, { useState, useEffect, useRef } from 'react';

const CHAR_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=~<>[]{}';

/**
 * React Bits — DecryptedText
 * Scrambles random cyber glyphs before smoothly resolving into the target string.
 */
export function DecryptedText({
  text = '',
  speed = 40,
  maxIterations = 14,
  sequential = true,
  revealDelay = 80,
  className = '',
  triggerOnHover = true,
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  const scramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsScrambling(true);

    let iteration = 0;
    const originalText = text;

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (sequential) {
              if (index < Math.floor(iteration / 2)) {
                return originalText[index];
              }
            } else {
              if (iteration > maxIterations) {
                return originalText[index];
              }
            }
            return CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)];
          })
          .join('');
      });

      iteration += 1;

      if (iteration > originalText.length * 2 + maxIterations) {
        clearInterval(intervalRef.current);
        setDisplayText(originalText);
        setIsScrambling(false);
      }
    }, speed);
  };

  useEffect(() => {
    // Initial trigger on mount after brief delay
    const timer = setTimeout(() => {
      scramble();
    }, revealDelay);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  const handleMouseEnter = () => {
    if (triggerOnHover && !isScrambling) {
      scramble();
    }
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      className={`inline-block cursor-default font-mono tracking-tight select-none transition-colors ${className}`}
    >
      {displayText}
    </span>
  );
}
