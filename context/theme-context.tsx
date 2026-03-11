'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type ThemeId = '1' | '2' | '3' | '4' | '5' | '6';

const STORAGE_KEY = 'qarabag-theme';

const VALID_THEMES: ThemeId[] = ['1', '2', '3', '4', '5', '6'];

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
  themePanelOpen: boolean;
  setThemePanelOpen: (open: boolean) => void;
  toggleThemePanel: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function loadTheme(): ThemeId {
  if (typeof window === 'undefined') return '1';
  const s = localStorage.getItem(STORAGE_KEY);
  if (VALID_THEMES.includes(s as ThemeId)) return s as ThemeId;
  return '1';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>('1');
  const [themePanelOpen, setThemePanelOpen] = useState(false);

  useEffect(() => {
    const saved = loadTheme();
    setThemeState(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, id);
    document.documentElement.setAttribute('data-theme', id);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleThemePanel = useCallback(() => {
    setThemePanelOpen((o) => !o);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setThemePanelOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      themePanelOpen,
      setThemePanelOpen,
      toggleThemePanel,
    }),
    [theme, setTheme, themePanelOpen, toggleThemePanel]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export function useThemeSafe() {
  return useContext(ThemeContext);
}
