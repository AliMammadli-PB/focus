'use client';

import { useTheme } from '@/context/theme-context';
import { Header } from '@/components/header';
import { HeaderTheme2 } from '@/components/headers/header-theme2';
import { HeaderTheme3 } from '@/components/headers/header-theme3';
import { SiteBackground } from '@/components/site-background';
import { SiteBackgroundTheme2 } from '@/components/site-background-theme2';
import { SiteBackgroundTheme3 } from '@/components/site-background-theme3';

export function ThemeShell({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  const HeaderComponent = theme === '1' ? Header : theme === '2' ? HeaderTheme2 : HeaderTheme3;
  const BackgroundComponent = theme === '1' ? SiteBackground : theme === '2' ? SiteBackgroundTheme2 : SiteBackgroundTheme3;

  return (
    <>
      <HeaderComponent />
      <BackgroundComponent />
      <main className="relative z-10">{children}</main>
    </>
  );
}
