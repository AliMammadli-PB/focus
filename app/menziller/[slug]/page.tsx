'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getMenzilBySlug, formatPrice } from '@/lib/menziller-data';
import { getMenzilImageUrl } from '@/lib/menzil-images';
import { whatsAppUrlForMenzil } from '@/lib/contact';

export default function MenzilDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const menzil = getMenzilBySlug(slug);

  if (!menzil) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 px-6">
        <p className="text-white/80">Mənzil tapılmadı.</p>
        <Link href="/#menziller" className="text-amber-400 hover:underline">
          ← Mənzillərə qayıt
        </Link>
      </div>
    );
  }

  const imageUrl = getMenzilImageUrl(menzil.label);

  return (
    <div className="relative min-h-[100dvh] px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <Link href="/#menziller" className="mb-8 inline-block text-sm text-white/60 hover:text-white">
          ← Mənzillərə qayıt
        </Link>
        <div className="rounded-2xl border border-white/10 bg-black/50 p-8 backdrop-blur-md">
          <h1 className="font-heading text-2xl font-bold text-white md:text-3xl">
            {menzil.label}
          </h1>
          <p className="mt-2 text-2xl font-bold text-amber-400/95">
            {formatPrice(menzil.price)} ₼
          </p>
          <p className="mt-1 text-white/65">{menzil.area}</p>
          <p className="mt-4 text-white/80">{menzil.desc}</p>
          {imageUrl && (
            <div className="relative mt-8 min-h-[280px] overflow-hidden rounded-xl bg-transparent">
              <Image
                src={imageUrl}
                alt={`${menzil.label} plan`}
                width={700}
                height={400}
                className="object-contain bg-transparent"
                unoptimized
                style={{ background: 'transparent' }}
              />
            </div>
          )}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={`/register?menzil=${encodeURIComponent(menzil.label)}`}
              className="inline-block rounded-xl bg-white px-8 py-3.5 font-semibold text-black hover:bg-white/95"
            >
              Müraciət et / Qeydiyyat
            </Link>
            <a
              href={whatsAppUrlForMenzil(menzil.label)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl border border-white/25 bg-[#25D366]/20 px-8 py-3.5 font-semibold text-white hover:bg-[#25D366]/30"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
