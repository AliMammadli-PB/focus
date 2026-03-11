import type { Metadata, Viewport } from 'next';
import { Outfit, Syne, Cormorant_Garamond, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { LoadingGate } from '@/components/loading-gate';
import { LangProvider } from '@/context/language';
import { ThemeProvider } from '@/context/theme-context';
import { DesignModeProvider } from '@/context/design-mode';
import { DesignModePanel } from '@/components/design-mode-panel';
import { FloatingContact } from '@/components/floating-contact';
import { ThemeShell } from '@/components/theme-shell';
import { ThemePanel } from '@/components/theme-panel';

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

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-theme2',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-theme3',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" suppressHydrationWarning className="dark">
      <body className={`${outfit.variable} ${syne.variable} ${cormorant.variable} ${playfair.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-transparent text-[var(--text)] antialiased`} suppressHydrationWarning>
        <LangProvider>
          <ThemeProvider>
            <LoadingGate>
              <DesignModeProvider>
                <ThemeShell>{children}</ThemeShell>
                <ThemePanel />
                <DesignModePanel />
                <FloatingContact />
              </DesignModeProvider>
            </LoadingGate>
          </ThemeProvider>
        </LangProvider>
      </body>
    </html>
  );
}
