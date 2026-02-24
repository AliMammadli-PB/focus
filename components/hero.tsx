'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useDesignMode } from '@/context/design-mode';
import { DraggableSection } from '@/components/draggable-section';

export function Hero() {
  const { get } = useDesignMode();
  const pos = get('hero.pos', '0,0').split(',').map(Number);
  const [x, y] = [isNaN(pos[0]) ? 0 : pos[0], isNaN(pos[1]) ? 0 : pos[1]];

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col justify-end pb-32 pt-28 md:justify-center md:pb-40 md:pt-32"
      aria-labelledby="hero-heading"
    >
      <DraggableSection storageKey="hero.pos">
        <div
          className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-14"
          style={{ transform: `translate(${x}px, ${y}px)` }}
        >
          <div className="max-w-2xl px-6 py-8 md:px-8 md:py-10">
            <motion.p
              data-design-key="hero.subtitle"
              className="mb-4 text-xs font-medium uppercase tracking-[0.25em] md:text-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]"
              style={{ color: get('hero.subtitleColor', 'rgba(255,255,255,0.85)') }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {get('hero.subtitle', 'Ağ Şəhər · Premium Rezidenslər')}
            </motion.p>
            <motion.h1
              id="hero-heading"
              data-design-key="hero.title"
              className="font-heading text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl xl:text-7xl [text-shadow:0_2px_12px_rgba(0,0,0,0.9),0_0_1px_rgba(0,0,0,0.9)]"
              style={{ color: get('hero.titleColor', '#ffffff') }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {get('hero.title', 'Qarabağ Atları Meydanı')}
            </motion.h1>
            <motion.p
              data-design-key="hero.description"
              className="mt-6 max-w-md text-base leading-relaxed md:text-lg [text-shadow:0_1px_4px_rgba(0,0,0,0.8)]"
              style={{ color: get('hero.descriptionColor', 'rgba(255,255,255,0.9)') }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {get('hero.description', 'Smart mənzillər, tam təhlükəsizlik. Ağ Şəhərdə yaşayışın ən yaxşı ünvanı.')}
            </motion.p>
            <motion.div
              className="mt-12 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="#menziller"
                data-design-key="hero.cta1"
                className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-white/95 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                {get('hero.cta1', 'Menzillerimizi kəşf et')}
              </Link>
              <Link
                href="#elaqe"
                data-design-key="hero.cta2"
                className="rounded-full border border-white/30 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                {get('hero.cta2', 'Əlaqə')}
              </Link>
            </motion.div>
          </div>
        </div>
      </DraggableSection>
      <motion.div
        data-design-key="hero.scrollLabel"
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]"
        style={{ color: 'rgba(255,255,255,0.7)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="text-[10px] uppercase tracking-widest">{get('hero.scrollLabel', 'Aşağı')}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-5 w-px bg-white/40"
        />
      </motion.div>
    </section>
  );
}
