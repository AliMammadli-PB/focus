import { Hero } from '@/components/hero';
import { MenzillerSection } from '@/components/menziller-section';
import { About } from '@/components/about';
import { Features } from '@/components/features';
import { Quote } from '@/components/quote';
import { CTA } from '@/components/cta';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <Hero />
      <MenzillerSection />
      <About />
      <Features />
      <Quote />
      <CTA />
      <Footer />
    </>
  );
}
