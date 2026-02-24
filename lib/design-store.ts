const STORAGE_KEY = 'inqilab-design-overrides';

export type DesignOverrideKey =
  | 'hero.subtitle'
  | 'hero.subtitleColor'
  | 'hero.title'
  | 'hero.titleColor'
  | 'hero.description'
  | 'hero.descriptionColor'
  | 'hero.cta1'
  | 'hero.cta2'
  | 'hero.scrollLabel'
  | 'hero.pos'
  | 'cta.heading'
  | 'cta.headingColor'
  | 'cta.description'
  | 'cta.descriptionColor'
  | 'cta.btn1'
  | 'cta.btn2'
  | 'cta.pos'
  | 'menziller.heading'
  | 'menziller.subtitle'
  | 'menziller.price1'
  | 'menziller.price2'
  | 'menziller.price3'
  | 'menziller.price4'
  | 'menziller.pos'
  | 'about.heading'
  | 'about.text'
  | 'about.pos'
  | 'footer.brand'
  | 'footer.tagline'
  | 'footer.pos';

export type DesignOverrides = Partial<Record<DesignOverrideKey, string>>;

export function loadDesignOverrides(): DesignOverrides {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as DesignOverrides;
  } catch {
    return {};
  }
}

export function saveDesignOverrides(overrides: DesignOverrides): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch {
    // ignore
  }
}
