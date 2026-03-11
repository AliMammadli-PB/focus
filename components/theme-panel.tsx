'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/theme-context';
import type { ThemeId } from '@/context/theme-context';

export function ThemePanel() {
  const { theme, setTheme, themePanelOpen, setThemePanelOpen } = useTheme();

  useEffect(() => {
    if (themePanelOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [themePanelOpen]);

  return (
    <AnimatePresence>
      {themePanelOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={() => setThemePanelOpen(false)}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-label="Tema seçimi"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 z-[201] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/20 bg-neutral-900/95 p-6 shadow-2xl backdrop-blur-md"
          >
            <p className="mb-4 text-center text-sm font-medium uppercase tracking-widest text-white/80">
              Tema (Ctrl+Shift+D)
            </p>
            <div className="flex flex-col gap-3">
              {(['1', '2', '3'] as ThemeId[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setTheme(id);
                    setThemePanelOpen(false);
                  }}
                  className={`rounded-xl px-6 py-4 text-left font-semibold transition ${
                    theme === id
                      ? 'bg-amber-500 text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Theme {id}
                </button>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-white/50">
              Hər tema tamamilə fərqli dizayn, yazı və header təqdim edir.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
