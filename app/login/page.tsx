'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [parol, setParol] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ad: ad.trim(), soyad: soyad.trim(), parol }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Xəta baş verdi.');
        return;
      }
      window.location.href = data.redirect || '/hesabim';
    } catch {
      setError('Xəta baş verdi.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/60 p-8 shadow-xl backdrop-blur-md">
        <h1 className="font-heading text-2xl font-bold text-white md:text-3xl">
          Daxil olun
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="ad" className="mb-1.5 block text-sm font-medium text-white/80">
              Ad
            </label>
            <input
              id="ad"
              type="text"
              value={ad}
              onChange={(e) => setAd(e.target.value)}
              required
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              placeholder="Adınız"
            />
          </div>
          <div>
            <label htmlFor="soyad" className="mb-1.5 block text-sm font-medium text-white/80">
              Soyad
            </label>
            <input
              id="soyad"
              type="text"
              value={soyad}
              onChange={(e) => setSoyad(e.target.value)}
              required
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              placeholder="Soyadınız"
            />
          </div>
          <div>
            <label htmlFor="parol" className="mb-1.5 block text-sm font-medium text-white/80">
              Parol
            </label>
            <input
              id="parol"
              type="password"
              value={parol}
              onChange={(e) => setParol(e.target.value)}
              required
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              placeholder="Parol"
            />
          </div>
          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white py-3.5 font-semibold text-black transition hover:bg-white/95 disabled:opacity-60"
          >
            {loading ? 'Yoxlanılır…' : 'Daxil ol'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-white/60">
          Hesabınız yoxdur?{' '}
          <Link href="/register" className="text-amber-400/90 underline hover:text-amber-300">
            Qeydiyyatdan keçin
          </Link>
        </p>
      </div>
      <Link
        href="/"
        className="mt-8 text-sm text-white/50 hover:text-white/80"
      >
        ← Ana səhifə
      </Link>
    </div>
  );
}
