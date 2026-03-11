# Test nəticələri və düzəlişlər

## Quraşdırılan alətlər

- **Playwright** — E2E testlər
- **@axe-core/playwright** — Erişilebilirlik (a11y) testləri
- **Lighthouse** — `npx lighthouse` (performance, accessibility, best-practices, seo)
- **Pa11y** — `npx pa11y` (CLI erişilebilirlik)

## Skriptlər (package.json)

| Skript | Təsvir |
|--------|--------|
| `npm run test:e2e` | Playwright bütün testlər (e2e + a11y). Server avtomatik işə düşür. |
| `npm run test:a11y` | Yalnız axe erişilebilirlik testləri. |
| `npm run test:lighthouse` | Lighthouse (server işləməlidir: əvvəlcə `npm run dev`). |
| `npm run test:pa11y` | Pa11y (server işləməlidir: əvvəlcə `npm run dev`). |

---

## Edilən testlər və nəticə

### 1. Axe (WCAG 2.1 AA)

- **Nəticə:** Keçdi — violasiya yoxdur.
- **Əmr:** `npm run test:a11y`

### 2. Playwright E2E

- **Nəticə:** Hamısı keçdi (5/5).
- **Tapılan problem:** Səhifədə **2 ədəd `<h1>`** var idi — biri loading komponentində, biri hero-da. Bu həm a11y (tək başlıq olmalıdır), həm də SEO üçün problemdir.

**Düzəliş:**

- `components/cinematic-loading.tsx`: Loading ekranındakı `<h1>` **`<p role="status" aria-label="...">`** ilə əvəz edildi. Beləliklə yalnız əsas səhifədə bir `<h1>` (hero) qalır.
- `tests/e2e/home.spec.ts`: Hero testi `#hero-heading` seçicisinə keçirildi ki, tək başlığa baxsın.

### 3. Lighthouse və Pa11y

Bu iki test **saytın işlədiyi halda** işləməlidir:

```bash
# Terminal 1
npm run dev

# Terminal 2 (server hazır olandan sonra)
npm run test:lighthouse   # Nəticə: lighthouse-report.html
npm run test:pa11y        # JSON report
```

Lighthouse report-u brauzerdə `lighthouse-report.html` açmaqla baxmaq olar.

---

## Xülasə

| Test | Nəticə | Qeyd |
|------|--------|------|
| Axe (a11y) | Keçdi | WCAG 2.1 AA uyğunluğu yoxlanıldı. |
| E2E (Playwright) | Keçdi | 2 h1 problemi aradan qaldırıldı. |
| Lighthouse | İstifadəçi işlədəcək | Server açıq ikən `npm run test:lighthouse`. |
| Pa11y | İstifadəçi işlədəcək | Server açıq ikən `npm run test:pa11y`. |

---

## Tövsiyələr

1. **Lighthouse** və **Pa11y**-ı tez-tez (məs. hər böyük dəyişiklikdən sonra) işə salın; nəticələri `lighthouse-report.html` və pa11y çıxışı ilə saxlayın.
2. CI-da `npm run test:e2e` (və ya `npm run test:a11y`) işlədin ki, a11y və E2E avtomatik yoxlansın.
