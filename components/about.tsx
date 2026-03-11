'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollLetters } from './scroll-letters';
import { useDesignMode } from '@/context/design-mode';
import { DraggableSection } from '@/components/draggable-section';
import { ImagePlaceholder } from './image-placeholder';

const ABOUT_TEXT = 'Qarabagh Horses Square, müasir dizayn və mədəni irsin ahəngdə olduğu bir memarlıq incisi. Təbii daş detallarının istifadəsi ilə geniş açıq məkanlar yaradır, göy üzünə açılan hissiyat ilə sakinlərə rahatlıq gətirir. Burada həyat, təbiətlə iç-içə, zərif və dəbdəbəli bir atmosferdə keçir.';

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
          <h2
            id="about-heading"
            data-design-key="about.heading"
            className="font-heading mb-12 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl"
          >
            <ScrollLetters text={get('about.heading', 'Qarabagh Horses Square')} />
          </h2>
          <div className="grid gap-14 md:grid-cols-12 md:gap-20 md:items-start">
            <motion.div
              className="md:col-span-7"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p data-design-key="about.text" className="text-lg leading-relaxed text-white md:text-xl">
                <ScrollLetters text={get('about.text', ABOUT_TEXT)} />
              </p>
            </motion.div>
            <motion.div
              className="md:col-span-5"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <ImagePlaceholder
                src="/photos/about-intro.png"
                alt="Qarabagh Horses Square memarlıq"
                width={1200}
                height={800}
              />
            </motion.div>
          </div>
        </div>
      </DraggableSection>
    </section>
  );
}
