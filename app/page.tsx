'use client';

import { useTheme } from '@/context/theme-context';
import { Theme1View } from '@/components/themes/theme1-view';
import { Theme2View } from '@/components/themes/theme2-view';
import { Theme3View } from '@/components/themes/theme3-view';

export default function Home() {
  const { theme } = useTheme();

  if (theme === '2') return <Theme2View />;
  if (theme === '3') return <Theme3View />;
  return <Theme1View />;
}
