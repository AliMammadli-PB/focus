'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  type DesignOverrideKey,
  type DesignOverrides,
  loadDesignOverrides,
  saveDesignOverrides,
} from '@/lib/design-store';

type DesignModeContextValue = {
  isDesignMode: boolean;
  toggleDesignMode: () => void;
  overrides: DesignOverrides;
  setOverride: (key: DesignOverrideKey, value: string) => void;
  clearOverride: (key: DesignOverrideKey) => void;
  get: (key: DesignOverrideKey, fallback: string) => string;
  isPickingElement: boolean;
  setPickingElement: (v: boolean) => void;
  selectedKey: DesignOverrideKey | null;
  setSelectedKey: (key: DesignOverrideKey | null) => void;
};

const DesignModeContext = createContext<DesignModeContextValue | null>(null);

const DESIGN_MODE_KEY = 'Ctrl+Shift+D';

export function DesignModeProvider({ children }: { children: React.ReactNode }) {
  const [isDesignMode, setIsDesignMode] = useState(false);
  const [overrides, setOverrides] = useState<DesignOverrides>({});
  const [isPickingElement, setPickingElement] = useState(false);
  const [selectedKey, setSelectedKey] = useState<DesignOverrideKey | null>(null);

  useEffect(() => {
    setOverrides(loadDesignOverrides());
  }, []);

  const setOverride = useCallback((key: DesignOverrideKey, value: string) => {
    setOverrides((prev) => {
      const next = { ...prev, [key]: value };
      saveDesignOverrides(next);
      return next;
    });
  }, []);

  const clearOverride = useCallback((key: DesignOverrideKey) => {
    setOverrides((prev) => {
      const { [key]: _, ...rest } = prev;
      const next = rest as DesignOverrides;
      saveDesignOverrides(next);
      return next;
    });
  }, []);

  const get = useCallback(
    (key: DesignOverrideKey, fallback: string) => {
      return overrides[key] ?? fallback;
    },
    [overrides]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setIsDesignMode((v) => !v);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isDesignMode || !isPickingElement) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest('[data-design-key]') as HTMLElement | null;
      if (el) {
        e.preventDefault();
        e.stopPropagation();
        const key = el.getAttribute('data-design-key') as DesignOverrideKey | null;
        if (key) setSelectedKey(key);
        setPickingElement(false);
      }
    };
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [isDesignMode, isPickingElement]);

  const value = useMemo<DesignModeContextValue>(
    () => ({
      isDesignMode,
      toggleDesignMode: () => setIsDesignMode((v) => !v),
      overrides,
      setOverride,
      clearOverride,
      get,
      isPickingElement,
      setPickingElement,
      selectedKey,
      setSelectedKey,
    }),
    [isDesignMode, overrides, setOverride, clearOverride, get, isPickingElement, selectedKey]
  );

  return (
    <DesignModeContext.Provider value={value}>{children}</DesignModeContext.Provider>
  );
}

export function useDesignMode() {
  const ctx = useContext(DesignModeContext);
  if (!ctx) throw new Error('useDesignMode must be used within DesignModeProvider');
  return ctx;
}

export function useDesignModeSafe() {
  return useContext(DesignModeContext);
}

export { DESIGN_MODE_KEY };
