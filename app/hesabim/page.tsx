'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getMenzilImageUrl } from '@/lib/menzil-images';
import { CONTACT_PHONE_TEL, whatsAppUrlForMenzil } from '@/lib/contact';

type User = {
  id: number;
  ad: string;
  soyad: string;
  selected_menzil: string | null;
  created_at: string;
};

export default function HesabimPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        setUser(data.user ?? null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/';
  }

  if (loading) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center">
        <p className="text-white/70">Yüklənir…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 px-6">
        <p className="text-center text-white/80">Daxil olmalısınız.</p>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-white/95"
          >
            Daxil olun
          </Link>
          <Link
            href="/register"
            className="rounded-xl border border-white/30 bg-white/5 px-6 py-3 font-semibold text-white hover:bg-white/10"
          >
            Qeydiyyat
          </Link>
        </div>
        <Link href="/" className="text-sm text-white/50 hover:text-white/80">
          ← Ana səhifə
        </Link>
      </div>
    );
  }

  const menzilLabel = user.selected_menzil || '—';
  const menzilImageUrl = getMenzilImageUrl(user.selected_menzil || '');
  const whatsAppLink = whatsAppUrlForMenzil(user.selected_menzil);

  return (
    <div className="relative min-h-[100dvh] px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-white/10 bg-black/60 p-8 shadow-xl backdrop-blur-md">
          <h1 className="font-heading text-2xl font-bold text-white md:text-3xl">
            Hesabım
          </h1>
          <p className="mt-2 text-white/70">
            <span className="font-semibold text-white">{user.ad} {user.soyad}</span>
          </p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Çıxış
          </button>
        </div>

        <section className="mt-10 rounded-2xl border border-white/10 bg-black/60 p-8 shadow-xl backdrop-blur-md">
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl">
            Mənzil alış müraciəti
          </h2>
          <p className="mt-2 text-white/60">
            Seçdiyiniz mənzil növü və plan. Əlaqə üçün zəng və ya WhatsApp istifadə edin.
          </p>
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/50">Seçdiyiniz mənzil</p>
            <p className="mt-1 font-heading text-lg font-semibold text-amber-400/95">
              {menzilLabel}
            </p>
          </div>
          {menzilImageUrl && (
            <div className="relative mt-6 overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <div className="relative flex min-h-[200px] items-center justify-center p-4">
                <Image
                  src={menzilImageUrl}
                  alt={`${menzilLabel} plan`}
                  width={600}
                  height={400}
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={CONTACT_PHONE_TEL}
              className="inline-block rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-white/95"
            >
              Zəng edin (+994 55 440 10 30)
            </a>
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl border border-white/25 bg-[#25D366]/20 px-6 py-3 font-semibold text-white hover:bg-[#25D366]/30"
            >
              WhatsApp ilə yazın
            </a>
          </div>
        </section>

        <Link
          href="/"
          className="mt-10 inline-block text-sm text-white/50 hover:text-white/80"
        >
          ← Ana səhifə
        </Link>
      </div>
    </div>
  );
}
