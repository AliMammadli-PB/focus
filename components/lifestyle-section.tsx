'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollLetters } from './scroll-letters';
import { ImagePlaceholder } from './image-placeholder';

const CARDS = [
  {
    title: 'Premium',
    subtitle: 'Experience luxury living in a tranquil environment.',
    img: '/photos/lifestyle-premium.png',
    width: 800,
    height: 600,
  },
  {
    title: 'Panoramic',
    subtitle: 'Enjoy breathtaking views of the surrounding nature.',
    img: '/photos/lifestyle-panoramic.png',
    width: 800,
    height: 600,
  },
  {
    title: 'Exclusive',
    subtitle: "Access to top-notch amenities for residents' comfort.",
    img: '/photos/lifestyle-exclusive.png',
    width: 800,
    height: 600,
  },
];

export function LifestyleSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <section
      ref={ref}
      id="yasam-terzi"
      className="relative px-6 py-24 md:py-32"
      aria-labelledby="lifestyle-heading"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-16 max-w-2xl md:mb-20">
          <h2
            id="lifestyle-heading"
            className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            <ScrollLetters text="Yaşam Tərzi" />
          </h2>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-white/10 bg-white/[0.05] overflow-hidden backdrop-blur-sm transition hover:bg-white/[0.08]"
            >
              <ImagePlaceholder
                src={card.img}
                alt={card.title}
                width={card.width}
                height={card.height}
                className="rounded-t-2xl border-0 rounded-b-none"
              />
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white">{card.subtitle}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
