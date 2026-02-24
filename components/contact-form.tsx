'use client';

import { useState } from 'react';

type Tip = 'elaqe' | 'melumat';

export function ContactForm({ tip = 'elaqe' }: { tip?: Tip }) {
  const [ad, setAd] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [mesaj, setMesaj] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ad, email, telefon, mesaj, tip }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Xəta baş verdi.');
        return;
      }
      setDone(true);
      setAd('');
      setEmail('');
      setTelefon('');
      setMesaj('');
    } catch {
      setError('Göndərilərkən xəta baş verdi.');
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <p className="rounded-xl bg-white/10 p-6 text-center text-white">
        Göndərildi. Tezliklə sizinlə əlaqə saxlayacağıq.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="contact-ad" className="mb-1.5 block text-sm font-medium text-white/80">Ad Soyad</label>
        <input
          id="contact-ad"
          type="text"
          value={ad}
          onChange={(e) => setAd(e.target.value)}
          required
          className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          placeholder="Adınız"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-white/80">E-poçt</label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          placeholder="email@example.com"
        />
      </div>
      <div>
        <label htmlFor="contact-telefon" className="mb-1.5 block text-sm font-medium text-white/80">Telefon</label>
        <input
          id="contact-telefon"
          type="tel"
          value={telefon}
          onChange={(e) => setTelefon(e.target.value)}
          className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          placeholder="+994..."
        />
      </div>
      <div>
        <label htmlFor="contact-mesaj" className="mb-1.5 block text-sm font-medium text-white/80">Mesaj</label>
        <textarea
          id="contact-mesaj"
          value={mesaj}
          onChange={(e) => setMesaj(e.target.value)}
          rows={4}
          className="w-full resize-none rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          placeholder={tip === 'melumat' ? 'Mənzillər haqqında məlumat istəyirəm' : 'Sual və ya təklifiniz'}
        />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-white py-3.5 font-semibold text-black transition hover:bg-white/95 disabled:opacity-60"
      >
        {loading ? 'Göndərilir…' : tip === 'melumat' ? 'Məlumat al' : 'Göndər'}
      </button>
    </form>
  );
}
