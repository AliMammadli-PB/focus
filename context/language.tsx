'use client';

import { createContext, useContext, useState, useCallback } from 'react';

export type Lang = 'az' | 'en' | 'ru';

const translations: Record<Lang, Record<string, string>> = {
  az: {
    nav_haqqimizda: 'Haqqımızda',
    nav_yasam_terzi: 'Yaşam Tərzi',
    nav_menziller: 'Mənzil Seçimləri',
    nav_yerlesme: 'Yerləşmə',
    nav_odenis: 'Ödəniş',
    nav_investisiya: 'Investisiya',
    nav_xususiyyetler: 'Xüsusiyyətlər',
    nav_sitat: 'Sitat',
    nav_elaqe: 'Əlaqə',
    nav_faq: 'FAQ',
    nav_qalereya: 'Qalereya',
    nav_xerite: 'Xəritə',
    broshur: 'Broşür yüklə',
  },
  en: {
    nav_haqqimizda: 'About',
    nav_yasam_terzi: 'Lifestyle',
    nav_menziller: 'Apartments',
    nav_yerlesme: 'Location',
    nav_odenis: 'Payment',
    nav_investisiya: 'Investment',
    nav_xususiyyetler: 'Features',
    nav_sitat: 'Testimonials',
    nav_elaqe: 'Contact',
    nav_faq: 'FAQ',
    nav_qalereya: 'Gallery',
    nav_xerite: 'Map',
    broshur: 'Download brochure',
  },
  ru: {
    nav_haqqimizda: 'О нас',
    nav_yasam_terzi: 'Образ жизни',
    nav_menziller: 'Квартиры',
    nav_yerlesme: 'Расположение',
    nav_odenis: 'Оплата',
    nav_investisiya: 'Инвестиции',
    nav_xususiyyetler: 'Особенности',
    nav_sitat: 'Отзывы',
    nav_elaqe: 'Контакты',
    nav_faq: 'FAQ',
    nav_qalereya: 'Галерея',
    nav_xerite: 'Карта',
    broshur: 'Скачать брошюру',
  },
};

type LangContextValue = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string };

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('az');
  const t = useCallback((key: string) => translations[lang][key] ?? key, [lang]);
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  return ctx ?? { lang: 'az' as Lang, setLang: () => {}, t: (k: string) => k };
}
