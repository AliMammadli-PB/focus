import { test, expect } from '@playwright/test';

test.describe('Ana səhifə', () => {
  test('səhifə açılır və başlıq görünür', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Qarabagh|Horses|Square|Mənzil/i);
  });

  test('hero bölməsi və əsas mətn görünür', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#hero-heading')).toBeVisible();
    await expect(page.getByText(/Qarabagh Horses Square|Xoş Gəlmisiniz/i).first()).toBeVisible();
  });

  test('nav linkləri işləyir', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /haqqımızda|about/i }).first().click();
    await expect(page.locator('#haqqimizda')).toBeInViewport();
  });
});
