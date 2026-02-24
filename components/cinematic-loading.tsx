'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, useMotionValueEvent } from 'framer-motion';

const TITLE = 'Qarabağ Atları Meydanı';

const PHRASES = ['Initializing', 'Preparing space', 'Entering…'];

const BAR_DURATION = 5;
const EXIT_AT = 5.9;
const EXIT_DURATION = 1.1;
const LETTER_DELAY = 0.09;

/** Hərəkətli alov / qığılcım — yuxarı qalxan, titrəyən */
function MovingFlame({ delay, left, top }: { delay: number; left: string; top: string }) {
  return (
    <motion.div
      className="pointer-events-none absolute h-2 w-2 rounded-full bg-amber-400"
      style={{
        left,
        top,
        boxShadow: '0 0 10px 3px rgba(251,191,36,0.7)',
      }}
      initial={{ opacity: 0, y: 0, scale: 0.5 }}
      animate={{
        opacity: [0, 0.95, 0.3, 0],
        y: [0, -8, -18, -28],
        x: [0, 2, -1, 0],
        scale: [0.5, 1.2, 1, 0.8],
      }}
      transition={{
        duration: 1.5,
        delay,
        repeat: Infinity,
        repeatDelay: 0.3,
      }}
      aria-hidden
    />
  );
}

/** Titrəyən qığılcım (hərflərin yanırmış hissi) */
function SparkDot({ delay, style }: { delay: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      className="absolute h-1.5 w-1.5 rounded-full bg-amber-300"
      style={{
        boxShadow: '0 0 8px 2px rgba(251,191,36,0.8)',
        ...style,
      }}
      animate={{
        opacity: [0.5, 1, 0.5],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 0.5,
        delay,
        repeat: Infinity,
      }}
      aria-hidden
    />
  );
}

export function CinematicLoading({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'intro' | 'exit'>('intro');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayPercent, setDisplayPercent] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  useMotionValueEvent(rounded, 'change', setDisplayPercent);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: BAR_DURATION,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [count]);

  useEffect(() => {
    if (phase !== 'intro') return;
    const t = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % PHRASES.length);
    }, 2200);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    const t = setTimeout(() => setPhase('exit'), EXIT_AT * 1000);
    return () => clearTimeout(t);
  }, []);

  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Hərəkətli alovlar: başlığın ətrafında yuxarı qalxan qığılcımlar */
  const flamePositions = [
    { left: '5%', top: '55%' },
    { left: '15%', top: '48%' },
    { left: '25%', top: '52%' },
    { left: '35%', top: '50%' },
    { left: '45%', top: '54%' },
    { left: '55%', top: '49%' },
    { left: '65%', top: '51%' },
    { left: '75%', top: '53%' },
    { left: '85%', top: '50%' },
    { left: '92%', top: '52%' },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      initial={false}
      animate={{ opacity: phase === 'exit' ? 0 : 1 }}
      transition={{ duration: reducedMotion ? 0.2 : EXIT_DURATION, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={phase === 'exit' ? onComplete : undefined}
    >
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-6">
        <div className="relative flex w-full max-w-4xl items-center justify-center min-h-[4rem]">
          {/* Hərəkətli alov / qığılcım partikulları — hərflər yanırmış kimi */}
          {!reducedMotion && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {flamePositions.map((pos, i) => (
                <MovingFlame
                  key={i}
                  delay={i * 0.15 + (i % 3) * 0.2}
                  left={pos.left}
                  top={pos.top}
                />
              ))}
            </div>
          )}

          <h1
            className="font-loading relative z-10 text-center text-4xl font-semibold tracking-tight text-amber-400/95 sm:text-5xl md:text-6xl lg:text-7xl"
            aria-label={TITLE}
          >
            {TITLE.split('').map((char, i) => (
              <motion.span
                key={i}
                className="relative inline-block font-loading text-amber-400/95"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reducedMotion ? 0.05 : 1.1,
                  delay: reducedMotion ? 0 : LETTER_DELAY * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char === ' ' ? '\u00A0' : char}
                {/* Hər hərfin üstündə kiçik titrəyən qığılcım */}
                {char !== ' ' && !reducedMotion && (
                  <>
                    <SparkDot
                      delay={LETTER_DELAY * i}
                      style={{ left: '50%', top: '-4px', transform: 'translateX(-50%)' }}
                    />
                    <SparkDot
                      delay={LETTER_DELAY * i + 0.2}
                      style={{ right: '-2px', top: '20%' }}
                    />
                  </>
                )}
              </motion.span>
            ))}
          </h1>
        </div>

        <motion.p
          className="mt-6 font-loading text-sm font-medium uppercase tracking-[0.3em] text-amber-500/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reducedMotion ? 0.1 : 2.2, duration: 1.2 }}
        >
          Ağ Şəhər · Premium Rezidenslər
        </motion.p>

        <div className="mt-20 flex flex-col items-center gap-6">
          <motion.p
            className="font-loading text-xs font-medium uppercase tracking-widest text-amber-600/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 1 }}
          >
            {PHRASES[phraseIndex]}
          </motion.p>

          <div className="relative flex flex-col items-center gap-4">
            <span className="font-mono text-2xl tabular-nums tracking-wider text-amber-400/95">
              {String(displayPercent).padStart(2, '0')}
            </span>
            <div className="h-px w-48 overflow-hidden rounded-full bg-amber-900/40">
              <motion.div
                className="relative h-full bg-amber-500/90"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: reducedMotion ? 0.3 : BAR_DURATION, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.8)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1] }}
                  transition={{ duration: BAR_DURATION, ease: 'easeOut' }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
