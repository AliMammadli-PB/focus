'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const MENZIL_OPTIONS = ['1 otaqlı', '2 otaqlı', '3 otaqlı', '4 otaqlı'];

export default function RegisterPage() {
  const searchParams = useSearchParams();
  // İlk state server ilə eyni olsun (hidrasiya #418), URL-dən menzil sonra useEffect-də
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [menzil, setMenzil] = useState(MENZIL_OPTIONS[0]);
  useEffect(() => {
    const fromUrl = searchParams.get('menzil') || '';
    if (fromUrl && MENZIL_OPTIONS.includes(fromUrl)) setMenzil(fromUrl);
  }, [searchParams]);
  const [parol, setParol] = useState('');
  const [parolTekrar, setParolTekrar] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (parol !== parolTekrar) {
      setError('Parollar uyğun gəlmir.');
      return;
    }
    if (parol.length < 4) {
      setError('Parol ən azı 4 simvol olmalıdır.');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ad: ad.trim(),
        soyad: soyad.trim(),
        parol,
        parol_tekrar: parolTekrar,
        menzil: menzil || undefined,
      };
      console.log('[Qeydiyyat] Göndərilir:', { ...payload, parol: '(gizli)', parol_tekrar: '(gizli)' });
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch((parseErr) => {
        console.error('[Qeydiyyat] Cavab JSON deyil:', parseErr);
        return {};
      });
      if (!res.ok) {
        console.error('[Qeydiyyat] API xətası:', res.status, data);
        if (data.debug) console.error('[Qeydiyyat] Server debug:', data.debug);
        if (data.hint) console.error('[Qeydiyyat] İpucu:', data.hint);
        setError(data.error || (data.code === 'DB_NOT_CONFIGURED' ? 'Veritabanı bağlı deyil. Vercel-də Postgres əlavə edin.' : 'Xəta baş verdi.'));
        return;
      }
      console.log('[Qeydiyyat] Uğurlu, yönləndirilir:', data.redirect);
      window.location.href = data.redirect || '/hesabim';
    } catch (err) {
      console.error('[Qeydiyyat] Şəbəkə/icra xətası:', err);
      setError('Xəta baş verdi.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/60 p-8 shadow-xl backdrop-blur-md">
        <h1 className="font-heading text-2xl font-bold text-white md:text-3xl">
          Qeydiyyat
        </h1>
        <form ref={formRef} onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="menzil" className="mb-1.5 block text-sm font-medium text-white/80">
              Mənzili seç
            </label>
            <select
              id="menzil"
              value={menzil}
              onChange={(e) => setMenzil(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/30 [&_option]:bg-black"
            >
              {MENZIL_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
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
              minLength={4}
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              placeholder="Parol"
            />
          </div>
          <div>
            <label htmlFor="parol_tekrar" className="mb-1.5 block text-sm font-medium text-white/80">
              Parol (təkrar)
            </label>
            <input
              id="parol_tekrar"
              type="password"
              value={parolTekrar}
              onChange={(e) => setParolTekrar(e.target.value)}
              required
              minLength={4}
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              placeholder="Parolu təkrar yazın"
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
            {loading ? 'Göndərilir…' : 'Qeydiyyatdan keç'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-white/60">
          Hesabınız var?{' '}
          <Link href="/login" className="text-amber-400/90 underline hover:text-amber-300">
            Daxil olun
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
