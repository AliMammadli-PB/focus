'use client';

import { useRef, useEffect } from 'react';
import { useDesignMode } from '@/context/design-mode';
import type { DesignOverrideKey } from '@/lib/design-store';

const PICKER_BODY_CLASS = 'design-mode-picking';

type EditableItem = {
  key: DesignOverrideKey;
  label: string;
  type: 'text' | 'color' | 'number';
  defaultText?: string;
};

const ITEMS: EditableItem[] = [
  { key: 'hero.subtitle', label: 'Hero — alt başlıq', type: 'text', defaultText: 'Ağ Şəhər · Premium Rezidenslər' },
  { key: 'hero.subtitleColor', label: 'Hero — alt başlıq rəngi', type: 'color' },
  { key: 'hero.title', label: 'Hero — başlıq', type: 'text', defaultText: 'Qarabağ Atları Meydanı' },
  { key: 'hero.titleColor', label: 'Hero — başlıq rəngi', type: 'color' },
  { key: 'hero.description', label: 'Hero — təsvir', type: 'text', defaultText: 'Smart mənzillər, tam təhlükəsizlik. Ağ Şəhərdə yaşayışın ən yaxşı ünvanı.' },
  { key: 'hero.descriptionColor', label: 'Hero — təsvir rəngi', type: 'color' },
  { key: 'hero.cta1', label: 'Hero — düymə 1', type: 'text', defaultText: 'Menzillerimizi kəşf et' },
  { key: 'hero.cta2', label: 'Hero — düymə 2', type: 'text', defaultText: 'Əlaqə' },
  { key: 'hero.scrollLabel', label: 'Hero — aşağı yazısı', type: 'text', defaultText: 'Aşağı' },
  { key: 'hero.pos', label: 'Hero — yer (sürüklə)', type: 'text', defaultText: '0,0' },
  { key: 'cta.heading', label: 'CTA — başlıq', type: 'text', defaultText: 'Ağıllı mənzil, sakit ürək' },
  { key: 'cta.headingColor', label: 'CTA — başlıq rəngi', type: 'color' },
  { key: 'cta.description', label: 'CTA — təsvir', type: 'text', defaultText: 'Qarabağ Atları meydanında rezidenslərdə smart mənzillər və tam təhlükəsizlik ilə yaşayın.' },
  { key: 'cta.descriptionColor', label: 'CTA — təsvir rəngi', type: 'color' },
  { key: 'cta.btn1', label: 'CTA — düymə 1', type: 'text', defaultText: 'Zəng edin' },
  { key: 'cta.btn2', label: 'CTA — düymə 2', type: 'text', defaultText: 'Email' },
  { key: 'cta.pos', label: 'CTA — yer (sürüklə)', type: 'text', defaultText: '0,0' },
  { key: 'menziller.heading', label: 'Mənzillər — başlıq', type: 'text', defaultText: 'Mənzillər və qiymətlər' },
  { key: 'menziller.subtitle', label: 'Mənzillər — alt yazı', type: 'text', defaultText: 'Ağ Şəhər · Smart mənzillər · 24/7 təhlükəsizlik' },
  { key: 'menziller.price1', label: 'Mənzillər — 1 otaqlı qiymət (₼)', type: 'number', defaultText: '220000' },
  { key: 'menziller.price2', label: 'Mənzillər — 2 otaqlı qiymət (₼)', type: 'number', defaultText: '380000' },
  { key: 'menziller.price3', label: 'Mənzillər — 3 otaqlı qiymət (₼)', type: 'number', defaultText: '520000' },
  { key: 'menziller.price4', label: 'Mənzillər — 4 otaqlı qiymət (₼)', type: 'number', defaultText: '680000' },
  { key: 'menziller.pos', label: 'Mənzillər — yer (sürüklə)', type: 'text', defaultText: '0,0' },
  { key: 'about.heading', label: 'Haqqımızda — başlıq', type: 'text', defaultText: 'Bu binada mənzil satışı — fərqimiz nədir?' },
  { key: 'about.text', label: 'Haqqımızda — mətn', type: 'text', defaultText: 'Birbaşa binada xəbərdarlıq olanda FHN göstərilir, su və qaz sızması anında aşkar olunur, oğru girdikdə polisə bildiriş gedir. Ağıllı mənzillər və tam təhlükəsizlik — sizin üçün.' },
  { key: 'about.pos', label: 'Haqqımızda — yer (sürüklə)', type: 'text', defaultText: '0,0' },
  { key: 'footer.brand', label: 'Footer — brend', type: 'text', defaultText: 'Qarabağ Atları Meydanı' },
  { key: 'footer.tagline', label: 'Footer — tagline', type: 'text', defaultText: 'Ağ Şəhər · Smart mənzillər · 24/7 monitorinq' },
  { key: 'footer.pos', label: 'Footer — yer (sürüklə)', type: 'text', defaultText: '0,0' },
];

const DEFAULT_COLORS: Partial<Record<DesignOverrideKey, string>> = {
  'hero.subtitleColor': '#e5e5e5',
  'hero.titleColor': '#ffffff',
  'hero.descriptionColor': '#e5e5e5',
  'cta.headingColor': '#ffffff',
  'cta.descriptionColor': '#b3b3b3',
};

export function DesignModePanel() {
  const {
    isDesignMode,
    toggleDesignMode,
    setOverride,
    clearOverride,
    get,
    isPickingElement,
    setPickingElement,
    selectedKey,
    setSelectedKey,
  } = useDesignMode();
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedKey && itemRefs.current[selectedKey]) {
      itemRefs.current[selectedKey]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedKey]);

  useEffect(() => {
    if (isPickingElement) {
      document.body.classList.add(PICKER_BODY_CLASS);
      return () => document.body.classList.remove(PICKER_BODY_CLASS);
    }
  }, [isPickingElement]);

  if (!isDesignMode) {
    return (
      <button
        type="button"
        onClick={toggleDesignMode}
        className="fixed bottom-4 left-4 z-[199] rounded-full bg-white/10 px-3 py-2 text-xs font-medium text-white/80 backdrop-blur-sm transition hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
        title="Tasarım rejimi (Ctrl+Shift+D)"
      >
        Ctrl+Shift+D — Tasarım rejimi
      </button>
    );
  }

  return (
    <>
      {isPickingElement && (
        <div
          className="fixed inset-0 z-[198] cursor-crosshair bg-black/20"
          style={{ pointerEvents: 'none' }}
          aria-hidden
        >
          <div className="fixed left-1/2 top-8 -translate-x-1/2 rounded-lg bg-amber-500/95 px-4 py-2 text-sm font-medium text-black shadow-lg">
            Səhifədə dəyişmək istədiyiniz elementə klik edin
          </div>
        </div>
      )}
      <div className="fixed right-0 top-0 z-[200] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-black/95 shadow-2xl backdrop-blur-md md:w-[380px]">
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-4 py-3">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
            Tasarım rejimi
          </h2>
          <button
            type="button"
            onClick={() => {
              setPickingElement(!isPickingElement);
              if (isPickingElement) setSelectedKey(null);
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              isPickingElement
                ? 'bg-amber-500 text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isPickingElement ? 'Ləğv et' : 'Element seç'}
          </button>
          <button
            type="button"
            onClick={toggleDesignMode}
            className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/20"
          >
            Bağla (Ctrl+Shift+D)
          </button>
        </div>
        <p className="border-b border-white/10 px-4 py-2 text-xs text-white/50">
          Mətn, rəng və qiyməti dəyişin. &quot;Element seç&quot; ilə səhifədə klik edib sahəni seçin. Blokları sürükləyib yerini dəyişin.
        </p>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {ITEMS.map((item) => (
            <div
              key={item.key}
              ref={(el) => { itemRefs.current[item.key] = el; }}
              className={`space-y-1.5 rounded-lg p-2 transition ${
                selectedKey === item.key ? 'ring-2 ring-amber-500 bg-amber-500/10' : ''
              }`}
            >
              <label className="block text-xs font-medium text-white/70">{item.label}</label>
              {item.type === 'number' ? (
                <div className="flex gap-2">
                  <input
                    type="number"
                    min={0}
                    step={1000}
                    value={get(item.key, item.defaultText ?? '0')}
                    onChange={(e) => setOverride(item.key, e.target.value.replace(/\D/g, '').slice(0, 12))}
                    className="flex-1 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                    placeholder={item.defaultText}
                  />
                  <button
                    type="button"
                    onClick={() => clearOverride(item.key)}
                    className="rounded-lg bg-white/10 px-2 py-1 text-xs text-white/70 hover:bg-white/20 hover:text-white"
                    title="Varsayılana qaytar"
                  >
                    ↺
                  </button>
                </div>
              ) : item.type === 'text' ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={get(item.key, item.defaultText ?? '')}
                    onChange={(e) => setOverride(item.key, e.target.value)}
                    className="flex-1 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                    placeholder={item.defaultText}
                  />
                  <button
                    type="button"
                    onClick={() => clearOverride(item.key)}
                    className="rounded-lg bg-white/10 px-2 py-1 text-xs text-white/70 hover:bg-white/20 hover:text-white"
                    title="Varsayılana qaytar"
                  >
                    ↺
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={get(item.key, DEFAULT_COLORS[item.key] ?? '#ffffff')}
                    onChange={(e) => setOverride(item.key, e.target.value)}
                    className="h-9 w-14 cursor-pointer rounded border border-white/20 bg-white/5"
                  />
                  <input
                    type="text"
                    value={get(item.key, DEFAULT_COLORS[item.key] ?? '#ffffff')}
                    onChange={(e) => setOverride(item.key, e.target.value)}
                    className="flex-1 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
                  />
                  <button
                    type="button"
                    onClick={() => clearOverride(item.key)}
                    className="rounded-lg bg-white/10 px-2 py-1 text-xs text-white/70 hover:bg-white/20"
                  >
                    ↺
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
