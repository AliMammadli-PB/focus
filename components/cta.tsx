'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ScrollLetters } from './scroll-letters';
import { useDesignMode } from '@/context/design-mode';
import { DraggableSection } from '@/components/draggable-section';

export function CTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const { get } = useDesignMode();
  const pos = get('cta.pos', '0,0').split(',').map(Number);
  const [cx, cy] = [isNaN(pos[0]) ? 0 : pos[0], isNaN(pos[1]) ? 0 : pos[1]];

  const heading = get('cta.heading', 'Ağıllı mənzil, sakit ürək');
  const description = get('cta.description', 'Qarabağ Atları meydanında rezidenslərdə smart mənzillər və tam təhlükəsizlik ilə yaşayın.');

  return (
    <section
      ref={ref}
      id="elaqe"
      className="relative px-6 py-24 md:py-32"
      aria-labelledby="cta-heading"
    >
      <DraggableSection storageKey="cta.pos">
        <div className="mx-auto max-w-2xl text-center" style={{ transform: `translate(${cx}px, ${cy}px)` }}>
          <motion.h2
            id="cta-heading"
            data-design-key="cta.heading"
            className="font-heading text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
            style={{ color: get('cta.headingColor', '#ffffff') }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <ScrollLetters text={heading} />
          </motion.h2>
          <motion.p
            data-design-key="cta.description"
            className="mt-5 text-lg"
            style={{ color: get('cta.descriptionColor', 'rgba(255,255,255,0.7)') }}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <ScrollLetters text={description} />
          </motion.p>
          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="tel:+994123456789"
              data-design-key="cta.btn1"
              className="inline-block rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-white/95 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {get('cta.btn1', 'Zəng edin')}
            </Link>
            <Link
              href="mailto:info@example.az"
              data-design-key="cta.btn2"
              className="inline-block rounded-full border border-white/25 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {get('cta.btn2', 'Email')}
            </Link>
          </motion.div>
        </div>
      </DraggableSection>
    </section>
  );
}
