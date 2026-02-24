import type { Metadata, Viewport } from 'next';
import { Outfit, Syne, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { SiteBackground } from '@/components/site-background';
import { LoadingGate } from '@/components/loading-gate';
import { DesignModeProvider } from '@/context/design-mode';
import { DesignModePanel } from '@/components/design-mode-panel';

export const metadata: Metadata = {
  title: 'Qarabağ Atları Meydanı · Ağ Şəhər — Mənzil Satışı',
  description: 'Ağ Şəhərdə premium smart mənzillər. Qarabağ Atları Meydanı rezidenslərində mənzilləri kəşf edin.',
  icons: { icon: '/icon.svg', shortcut: '/icon.svg', apple: '/icon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
};

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-loading',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" suppressHydrationWarning className="dark">
      <body className={`${outfit.variable} ${syne.variable} ${cormorant.variable} font-sans min-h-screen bg-transparent text-[var(--text)] antialiased`} suppressHydrationWarning>
        <LoadingGate>
          <DesignModeProvider>
            <SiteBackground />
            <main className="relative z-10">{children}</main>
            <DesignModePanel />
          </DesignModeProvider>
        </LoadingGate>
      </body>
    </html>
  );
}
