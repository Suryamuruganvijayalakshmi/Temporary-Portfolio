import React from 'react';
import { motion } from 'framer-motion';

/**
 * React Bits inspired SplitText
 * Splits text into animated words or characters with customizable staggered reveal.
 */
export function SplitText({
  text = '',
  className = '',
  delay = 0,
  stagger = 0.03,
  splitBy = 'words', // 'words' | 'chars'
}) {
  if (!text) return null;

  const items = splitBy === 'chars' ? Array.from(text) : text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 18,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20px' }}
      className={`inline-block ${className}`}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className="inline-block"
        >
          {item}
          {splitBy === 'words' && index < items.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.span>
  );
}

/**
 * React Bits inspired BlurText
 * Smooth blur-to-sharpness fade for editorial headings and quotes.
 */
export function BlurText({
  text = '',
  className = '',
  delay = 0,
  duration = 0.7,
}) {
  return (
    <motion.span
      initial={{ opacity: 0, filter: 'blur(12px)', y: 12 }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`inline-block ${className}`}
    >
      {text}
    </motion.span>
  );
}

/**
 * React Bits inspired TextLoop
 * Subtle cycling through key roles or focus areas.
 */
export function TextLoop({
  items = [],
  interval = 3200,
  className = '',
}) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!items.length) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [items, interval]);

  if (!items.length) return null;

  return (
    <span className={`relative inline-flex items-center overflow-hidden h-[1.3em] align-middle ${className}`}>
      <motion.span
        key={index}
        initial={{ y: '100%', opacity: 0, filter: 'blur(4px)' }}
        animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
        exit={{ y: '-100%', opacity: 0, filter: 'blur(4px)' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block whitespace-nowrap text-blue-600 font-semibold"
      >
        {items[index]}
      </motion.span>
    </span>
  );
}
