import type { Metadata, Viewport } from 'next';
import { Outfit, Syne, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { SiteBackground } from '@/components/site-background';
import { LoadingGate } from '@/components/loading-gate';
import { ThemeProvider } from '@/components/theme-provider';
import { LangProvider } from '@/context/language';
import { DesignModeProvider } from '@/context/design-mode';
import { DesignModePanel } from '@/components/design-mode-panel';
import { FloatingContact } from '@/components/floating-contact';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'Qarabağ Atları Meydanı · Ağ Şəhər — Mənzil Satışı',
  description: 'Ağ Şəhərdə premium smart mənzillər. Qarabağ Atları Meydanı rezidenslərində mənzilləri kəşf edin.',
  icons: { icon: '/icon.svg', shortcut: '/icon.svg', apple: '/icon.svg' },
  openGraph: {
    title: 'Qarabağ Atları Meydanı · Ağ Şəhər — Mənzil Satışı',
    description: 'Ağ Şəhərdə premium smart mənzillər. Smart sistemlər, 24/7 təhlükəsizlik.',
    type: 'website',
  },
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
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LangProvider>
            <LoadingGate>
              <DesignModeProvider>
                <Header />
                <SiteBackground />
                <main className="relative z-10">{children}</main>
                <DesignModePanel />
                <FloatingContact />
              </DesignModeProvider>
            </LoadingGate>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
