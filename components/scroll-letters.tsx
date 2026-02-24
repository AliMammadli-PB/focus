'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const STAGGER = 0.028;
const X_OFF = 32;
const HOVER_RESET_MS = 3000;

function Letter({ char, index, inView }: { char: string; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setHovered(false), HOVER_RESET_MS);
  }, []);

  const fromRight = index % 2 === 1;
  if (char === ' ') return <span className="inline-block" aria-hidden>&nbsp;</span>;

  return (
    <motion.span
      className="inline-block cursor-default transition-colors duration-300"
      style={{ color: hovered ? 'rgb(251 191 36)' : 'inherit' }}
      initial={{ opacity: 0, x: fromRight ? X_OFF : -X_OFF }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * STAGGER, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {char}
    </motion.span>
  );
}

export function ScrollLetters({
  text,
  className = '',
}: {
  text: string;
  progress?: unknown;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`.trim()}>
      {text.split('').map((char, i) => (
        <Letter key={i} char={char} index={i} inView={inView} />
      ))}
    </span>
  );
}

export function useSectionScroll(_ref: React.RefObject<HTMLElement | null>) {
  return null;
}
