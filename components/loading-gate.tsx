'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CinematicLoading } from './cinematic-loading';

export function LoadingGate({ children }: { children: React.ReactNode }) {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && (
        <CinematicLoading
          onComplete={() => {
            setIntroDone(true);
          }}
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
