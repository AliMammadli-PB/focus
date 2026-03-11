import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility (axe)', () => {
  test('ana səhifə axe violasiyasız olmalıdır', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('ana səhifə axe nəticələrini göstər (report)', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    if (results.violations.length > 0) {
      // eslint-disable-next-line no-console
      console.log('Axe violasiyalar:', JSON.stringify(results.violations, null, 2));
    }
    expect(results.violations.length).toBe(0);
  });
});
