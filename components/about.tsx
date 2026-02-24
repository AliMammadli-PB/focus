'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollLetters } from './scroll-letters';
import { useDesignMode } from '@/context/design-mode';
import { DraggableSection } from '@/components/draggable-section';

export function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const { get } = useDesignMode();
  const pos = get('about.pos', '0,0').split(',').map(Number);
  const [ax, ay] = [isNaN(pos[0]) ? 0 : pos[0], isNaN(pos[1]) ? 0 : pos[1]];

  return (
    <section
      ref={ref}
      id="haqqimizda"
      className="relative px-6 py-24 md:py-32"
      aria-labelledby="about-heading"
    >
      <DraggableSection storageKey="about.pos">
        <div className="mx-auto max-w-6xl" style={{ transform: `translate(${ax}px, ${ay}px)` }}>
          <div className="grid gap-14 md:grid-cols-12 md:gap-20 md:items-start">
            <motion.div
              className="md:col-span-5"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2
                id="about-heading"
                data-design-key="about.heading"
                className="font-heading text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl"
              >
                <ScrollLetters text={get('about.heading', 'Bu binada mənzil satışı — fərqimiz nədir?')} />
              </h2>
            </motion.div>
            <motion.div
              className="md:col-span-7"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <p data-design-key="about.text" className="text-lg leading-relaxed text-white/72 md:text-xl">
                <ScrollLetters text={get('about.text', 'Birbaşa binada xəbərdarlıq olanda FHN göstərilir, su və qaz sızması anında aşkar olunur, oğru girdikdə polisə bildiriş gedir. Ağıllı mənzillər və tam təhlükəsizlik — sizin üçün.')} />
              </p>
            </motion.div>
          </div>
        </div>
      </DraggableSection>
    </section>
  );
}
