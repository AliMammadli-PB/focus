'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CinematicLoading } from './cinematic-loading';

const LOADING_DONE_KEY = 'focus_loading_done';

function getLoadingDone(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(LOADING_DONE_KEY) === '1';
}

export function LoadingGate({ children }: { children: React.ReactNode }) {
  // Həmişə server ilə eyni başla (false) — hidrasiya uyğunsuzluğunu (React #418) aradan qaldırır
  const [introDone, setIntroDone] = useState(false);
  useEffect(() => {
    if (getLoadingDone()) setIntroDone(true);
  }, []);

  const handleComplete = () => {
    if (typeof window !== 'undefined') sessionStorage.setItem(LOADING_DONE_KEY, '1');
    setIntroDone(true);
  };

  const showLoading = !introDone;

  return (
    <>
      {showLoading && (
        <CinematicLoading
          onComplete={handleComplete}
        />
      )}
      <motion.div
        className="min-h-screen"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: introDone ? 1 : 0,
          y: introDone ? 0 : 20,
          pointerEvents: introDone ? 'auto' : 'none',
        }}
        transition={{
          duration: 1.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
