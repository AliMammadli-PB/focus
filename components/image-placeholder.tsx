'use client';

import { useState } from 'react';

/** Şəkil: public/photos/ altında eyni adla fayl. Ölçü üstündə heç bir yazı göstərilmir. */
export function ImagePlaceholder({
  src,
  alt,
  width,
  height,
  className = '',
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div className={`relative overflow-hidden rounded-xl border border-white/10 bg-transparent ${className}`}>
      <div className="relative isolate" style={{ aspectRatio: `${width}/${height}` }}>
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover brightness-[1.02] contrast-[1.02]"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
        {(!loaded || error) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <span className="text-sm text-white/70">{error ? 'Şəkil yüklənmədi' : '…'}</span>
          </div>
        )}
      </div>
    </div>
  );
}
