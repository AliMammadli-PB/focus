# Qarabağ Atları Meydanı — Smart Rezidenslər

**Ağ Şəhər**də yerləşən Qarabağ Atları Meydanı rezidenslərinin təqdimat saytı. Smart mənzillər, tam təhlükəsizlik sistemləri və mənzil satışı üçün hazırlanmış, premium və müasir veb tətbiq.

---

## Məzmun

- [Texnologiyalar](#texnologiyalar)
- [Layihə quruluşu](#layihə-quruluşu)
- [Quraşdırma və işə salma](#quraşdırma-və-işə-salma)
- [Əsas səhifə bölmələri](#əsas-səhifə-bölmələri)
- [Statik fayllar və assetlər](#statik-fayllar-və-assetlər)
- [Dizayn sistemi](#dizayn-sistemi)
- [Konfiqurasiya faylları](#konfiqurasiya-faylları)
- [Skriptlər](#skriptlər)
- [Erişilebilirlik və responsivlik](#erişilebilirlik-və-responsivlik)
- [Qeydlər və problem həlli](#qeydlər-və-problem-həlli)

---

## Texnologiyalar

| Texnologiya | Təyinat |
|-------------|----------|
| **Next.js 15** | App Router, SSR, routing |
| **React 19** | UI komponentləri |
| **TypeScript** | Tip təhlükəsi |
| **TailwindCSS 3.4** | Utility-first CSS, tema dəyişənləri |
| **Framer Motion 11** | Scroll animasiyaları, parallax, hərflə animasiya |
| **next-themes** | Tema (işıqlı/qaranlıq) idarəetməsi |
| **clsx + tailwind-merge** | Şərti class birləşdirmə (`lib/utils.ts`) |
| **GSAP** | (layihədə quraşdırılıb, əsas animasiyalar Framer Motion ilə) |

---

## Layihə quruluşu

```
next-app/
├── app/
│   ├── layout.tsx       # Kök layout: fontlar, ThemeProvider, Header, ScrollProgress, SiteBackground, main
│   ├── page.tsx         # Ana səhifə — bütün bölmələrin birləşməsi
│   ├── loading.tsx      # Yüklənmə UI (brend adı + progress bar)
│   └── globals.css      # Tailwind, :root CSS dəyişənləri, reduced-motion
├── components/
│   ├── site-background.tsx   # Tam səhifə arxa plan şəkli (parallax scroll)
│   ├── header.tsx           # Sabit nav: logo, Haqqımızda, Xüsusiyyətlər, Sitat, Əlaqə; mobil hamburger
│   ├── scroll-progress.tsx  # Yuxarıda incə scroll progress xətti
│   ├── hero.tsx             # Hero: video fon + hərflə animasiya (başlıq, alt mətn, CTA)
│   ├── about.tsx            # Haqqımızda bölməsi
│   ├── features.tsx         # Smart mənzil xüsusiyyətləri (4 kart)
│   ├── image-text.tsx       # Mətn + video/şəkil bölməsi
│   ├── quote.tsx            # Sitat / testimonial
│   ├── cta.tsx              # Əlaqə CTA
│   ├── footer.tsx           # Alt hissə, linklər
│   └── theme-provider.tsx   # next-themes provider
├── lib/
│   └── utils.ts         # cn() — clsx + tailwind-merge
├── public/
│   ├── photos/
│   │   └── bg_v1.webp   # Tam səhifə arxa plan şəkli (parallax)
│   └── videos/
│       └── qarabag atlar meydani.mp4   # Hero bölməsində video fon
├── photos/              # (mənbə şəkillər; servis üçün public/photos istifadə olunur)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── package.json
└── README.md
```

---

## Quraşdırma və işə salma

### Vacib: işə salma qovluğu

**Bütün əmrlər yalnız `next-app` qovluğundan işlədilməlidir.** Parent qovluqda ("inqilab ev") `package.json` və `node_modules` olmamalıdır — yalnız `next-app` içində olsun. Əgər parent qovluqda köhnə `node_modules` qalıbsa, onu silin ki, çakışma olmasın.

```bash
cd next-app
npm install
npm run dev
```

Brauzerdə: **http://localhost:3000**

- **Production build:** `npm run build` → `npm run start`
- **Lint:** `npm run lint`

---

## Əsas səhifə bölmələri

| Bölmə | ID / Rol | Təsvir |
|-------|----------|--------|
| **Hero** | `#hero` | Tam ekran video fon (qarabag atlar meydani.mp4), başlıq "Qarabağ Atları Meydanı" hərflə soldan/sağdan animasiya, alt mətn, "Xüsusiyyətlər" / "Əlaqə" düymələri, aşağı scroll işarəsi |
| **About** | `#haqqimizda` | Haqqımızda: sol sütun başlıq, sağ sütun mətn; scroll-da fade/slide |
| **Features** | `#xususiyyetler` | 4 kart: Binada xəbərdarlıq (FHN), Su sızması sensoru, Qaz sızması sensoru, Polisə bildiriş; scroll-da stagger animasiya |
| **ImageText** | — | Mətn + video/şəkil bölməsi (parallax/scale) |
| **Quote** | `#sitat` | Sitat / testimonial bloku |
| **CTA** | `#elaqe` | Əlaqə çağırışı, düymələr |
| **Footer** | — | Minimal footer, nav linkləri |

**Header** nav linkləri: Haqqımızda, Xüsusiyyətlər, Sitat, Əlaqə (anchor `#...`).

---

## Statik fayllar və assetlər

### Arxa plan şəkli

- **Yol:** `public/photos/bg_v1.webp`
- **Rol:** Bütün səhifə üçün sabit arxa plan; scroll zamanı parallax (aşağı sürüşdürmə ilə şəkil aşağı hərəkət edir).
- **Qeyd:** Əgər fayl yoxdursa, `next-app/photos/bg_v1.webp`-ı `next-app/public/photos/`-ə kopyalayın.

### Hero videosu

- **Yol:** `public/videos/qarabag atlar meydani.mp4`
- **Rol:** Hero bölməsində tam ekran fon videosu (autoplay, loop, muted).
- **Qeyd:** Parent qovluqda `videos/qarabag atlar meydani.mp4` varsa, onu `next-app/public/videos/`-ə kopyalayın.

---

## Dizayn sistemi

### Fontlar (next/font)

- **Body:** Inter (`--font-body`)
- **Başlıq:** Plus Jakarta Sans (`--font-heading`)

### Rənglər (CSS dəyişənləri — `app/globals.css`)

- `--bg`: `#FAFAFA` (əsas fon)
- `--bg-card`: `#FFFFFF`
- `--text`: `#111111` (əsas mətn)
- `--text-muted`: `#555555`
- `--border`: `rgba(0,0,0,0.08)`

### Tema

- **Default:** işıqlı rejim (`light`); `ThemeProvider` — `defaultTheme="light"`, `enableSystem={false}`.
- Body fonu sayt arxa planı üçün `bg-transparent`; arxa plan `SiteBackground` komponenti ilə (şəkil + yüngül ağ örtük) verilir.

### Tailwind əlavələri (`tailwind.config.ts`)

- **Rənglər:** `bg`, `bg-card`, `text-primary`, `text-muted` (CSS var)
- **Font:** `font-sans`, `font-heading`
- **Border radius:** `rounded-4xl` (2rem)
- **Kölgə:** `shadow-soft`, `shadow-soft-lg`
- **Animasiya:** `animate-loading-bar` (loading.tsx üçün)
- **Spacing:** `18`, `22`, `30`

### Animasiyalar

- **Hero:** Hərflə giriş (soldan/sağdan stagger), Framer Motion spring.
- **Scroll:** Bölmələr və kartlar üçün `useInView` + fade/slide; `SiteBackground` üçün `useScroll` + `useTransform` (parallax).
- **Azaldılmış hərəkət:** `prefers-reduced-motion: reduce` üçün animasiya müddətləri minimuma endirilir (`globals.css`).

---

## Konfiqurasiya faylları

| Fayl | Təyinat |
|------|----------|
| **next.config.ts** | `reactStrictMode: true`, `images.remotePatterns` (https) |
| **tailwind.config.ts** | Content (app, components), rənglər, font, radius, kölgə, keyframes |
| **tsconfig.json** | Next.js əsaslı TypeScript (paths: `@/*`) |
| **postcss.config.mjs** | TailwindCSS + autoprefixer |
| **next-env.d.ts** | Next.js TypeScript referansları |

---

## Skriptlər

| Skript | Əmr | Təyinat |
|--------|------|----------|
| **dev** | `next dev` | İnkişaf serveri (localhost:3000) |
| **build** | `next build` | Production build |
| **start** | `next start` | Production serveri |
| **lint** | `next lint` | ESLint |

---

## Erişilebilirlik və responsivlik

- **Dil:** `<html lang="az">`
- **ARIA:** Bölmələr üçün `aria-labelledby` / `aria-label`; nav `aria-label="Əsas menyu"`; mobil menyu `aria-expanded`, `aria-controls`.
- **Fokus:** Düymə/linklərdə `focus-visible:ring-*`.
- **Responsiv:** Breakpointlər (sm, md, lg) ilə grid və tipografiya; header-da mobil hamburger menyu.

---

## Qeydlər və problem həlli

1. **İki node_modules / çakışma:**  
   Əmrləri həmişə `next-app` içindən işlədin. Parent qovluqda `node_modules` və ya `package-lock.json` varsa, onları silin.

2. **Arxa plan şəkli görünmür:**  
   `public/photos/bg_v1.webp` olduğundan əmin olun; lazım gəlsə `photos/bg_v1.webp`-ı `public/photos/`-ə kopyalayın.

3. **Hero-da video yoxdur:**  
   `public/videos/qarabag atlar meydani.mp4` yerləşdirin (boşluq adında fayl üçün URL-də `%20` istifadə olunur).

4. **Build xəbərdarlığı (çoxlu package-lock):**  
   Yalnız `next-app`-də `npm install` edin; parent qovluqda `package.json` saxlamayın.

---

**Layihə:** Qarabağ Atları Meydanı · Ağ Şəhər — Smart Rezidenslər  
**Meta:** `layout.tsx` — title və description SEO üçün təyin olunub; viewport themeColor `#FAFAFA`.
