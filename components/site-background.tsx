'use client';

const VIDEO_SRC = '/videos/qarabag%20atlar%20meydani.mp4';

export function SiteBackground() {
  return (
    <div
      className="fixed inset-0 z-0 h-[100dvh] w-full min-h-[100dvh] max-h-[100dvh] min-w-full max-w-full"
      aria-hidden
    >
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <video
          className="h-full w-full object-cover object-center"
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}
