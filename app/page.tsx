'use client';

import { useTheme } from '@/context/theme-context';
import type { ThemeId } from '@/context/theme-context';
import { Theme1View } from '@/components/themes/theme1-view';
import { Theme2View } from '@/components/themes/theme2-view';
import { Theme3View } from '@/components/themes/theme3-view';
import { Theme4View } from '@/components/themes/theme4-view';
import { Theme5View } from '@/components/themes/theme5-view';
import { Theme6View } from '@/components/themes/theme6-view';

const VIEWS: Record<ThemeId, React.ComponentType> = {
  '1': Theme1View,
  '2': Theme2View,
  '3': Theme3View,
  '4': Theme4View,
  '5': Theme5View,
  '6': Theme6View,
};

export default function Home() {
  const { theme } = useTheme();
  const View = VIEWS[theme];
  return <View />;
}
