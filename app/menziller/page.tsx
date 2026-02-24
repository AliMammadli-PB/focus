import Link from 'next/link';
import { MenzillerContent } from './menziller-content';

export const metadata = {
  title: 'Mənzillər və qiymətlər · Qarabağ Atları Meydanı',
  description: 'Qarabağ Atları Meydanı rezidenslərində mənzil qiymətləri. 1, 2, 3 və 4 otaqlı smart mənzillər.',
};

export default function MenzillerPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa]">
      <MenzillerContent />
    </div>
  );
}
