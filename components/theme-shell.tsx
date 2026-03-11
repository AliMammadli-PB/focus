'use client';

import { useTheme } from '@/context/theme-context';
import type { ThemeId } from '@/context/theme-context';
import { Header } from '@/components/header';
import { HeaderTheme2 } from '@/components/headers/header-theme2';
import { HeaderTheme3 } from '@/components/headers/header-theme3';
import { HeaderTheme4 } from '@/components/headers/header-theme4';
import { HeaderTheme5 } from '@/components/headers/header-theme5';
import { HeaderTheme6 } from '@/components/headers/header-theme6';
import { SiteBackground } from '@/components/site-background';
import { SiteBackgroundTheme2 } from '@/components/site-background-theme2';
import { SiteBackgroundTheme3 } from '@/components/site-background-theme3';
import { SiteBackgroundTheme4 } from '@/components/site-background-theme4';
import { SiteBackgroundTheme5 } from '@/components/site-background-theme5';
import { SiteBackgroundTheme6 } from '@/components/site-background-theme6';

const HEADERS: Record<ThemeId, React.ComponentType> = {
  '1': Header,
  '2': HeaderTheme2,
  '3': HeaderTheme3,
  '4': HeaderTheme4,
  '5': HeaderTheme5,
  '6': HeaderTheme6,
};

const BACKGROUNDS: Record<ThemeId, React.ComponentType> = {
  '1': SiteBackground,
  '2': SiteBackgroundTheme2,
  '3': SiteBackgroundTheme3,
  '4': SiteBackgroundTheme4,
  '5': SiteBackgroundTheme5,
  '6': SiteBackgroundTheme6,
};

export function ThemeShell({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const HeaderComponent = HEADERS[theme];
  const BackgroundComponent = BACKGROUNDS[theme];

  return (
    <>
      <HeaderComponent />
      <BackgroundComponent />
      <main className="relative z-10">{children}</main>
    </>
  );
}
