import { expect, test, type Page } from '@playwright/test'
import { worksheetIds, worksheets } from '../src/data/worksheets'

const SAMPLE = 'E2E-Testeintrag IWS'

async function openSheet(page: Page, id: string) {
  await page.goto(`/#/ab/${id}`)
  await expect(page.getByTestId(`worksheet-${id}`)).toBeVisible()
}

async function fillVisibleInputs(page: Page, value: string) {
  const filled: string[] = []

  const texts = page.locator('.worksheet-card input[type="text"]')
  const textCount = await texts.count()
  if (textCount > 0) {
    await texts.first().fill(value)
    filled.push('text')
  }

  const areas = page.locator('.worksheet-card textarea')
  const areaCount = await areas.count()
  if (areaCount > 0) {
    await areas.first().fill(`${value} Absatz`)
    filled.push('textarea')
  }

  const scale = page.locator('.scale-options input[type="radio"]').first()
  if (await scale.count()) {
    await scale.check()
    filled.push('scale')
  }

  const radio = page.locator('.radio-list input[type="radio"]').first()
  if (await radio.count()) {
    await radio.check()
    filled.push('radio')
  }

  const box = page.locator('.star-item input[type="checkbox"], .checkbox-row input[type="checkbox"]').first()
  if (await box.count()) {
    await box.check()
    filled.push('check')
  }

  return filled
}

test.describe('IWS Arbeitsblätter', () => {
  test('Startseite listet alle Arbeitsblätter', async ({ page }) => {
    await page.goto('/#/')
    await expect(page.getByRole('heading', { name: 'Digitale Arbeitsblätter' })).toBeVisible()
    for (const ws of worksheets) {
      await expect(page.getByTestId(`nav-${ws.id}`)).toBeVisible()
    }
    await expect(page.locator('.home-links button')).toHaveCount(worksheets.length)
  })

  test('Fachbegriffe und Rechtstexte sind erreichbar', async ({ page }) => {
    await page.goto('/#/glossar')
    await expect(page.getByRole('heading', { name: 'Fachbegriffe' })).toBeVisible()
    await page.goto('/#/datenschutz')
    await expect(page.getByRole('heading', { name: 'Datenschutzerklärung' })).toBeVisible()
    await page.goto('/#/nutzungsbedingungen')
    await expect(page.getByRole('heading', { name: 'Nutzungsbedingungen' })).toBeVisible()
    await page.goto('/#/support')
    await expect(page.getByRole('heading', { name: 'Support' })).toBeVisible()
  })

  for (const id of worksheetIds) {
    const ws = worksheets.find((item) => item.id === id)
    test(`AB ${ws?.number ?? id}: öffnen, ausfüllen, localStorage, Reload`, async ({ page }) => {
      await openSheet(page, id)
      await expect(page.locator('.worksheet-header h2')).toBeVisible()
      const filled = await fillVisibleInputs(page, SAMPLE)
      expect(filled.length, `Arbeitsblatt ${id} hat keine ausfüllbaren Felder`).toBeGreaterThan(0)
      await page.waitForTimeout(400)
      const stored = await page.evaluate(() => localStorage.getItem('iws-ab-v1'))
      expect(stored).toBeTruthy()
      expect(stored).toContain(id)

      await page.reload()
      await expect(page.getByTestId(`worksheet-${id}`)).toBeVisible()

      if (filled.includes('text')) {
        await expect(page.locator('.worksheet-card input[type="text"]').first()).toHaveValue(SAMPLE)
      }
      if (filled.includes('textarea')) {
        await expect(page.locator('.worksheet-card textarea').first()).toHaveValue(`${SAMPLE} Absatz`)
      }
      if (filled.includes('scale')) {
        await expect(page.locator('.scale-options input[type="radio"]').first()).toBeChecked()
      }
      if (filled.includes('radio')) {
        await expect(page.locator('.radio-list input[type="radio"]').first()).toBeChecked()
      }
    })
  }

  test('Zwei Arbeitsblätter speichern unabhängig', async ({ page }) => {
    await openSheet(page, '1-1')
    await page.locator('.worksheet-card textarea').first().fill('Nur Blatt 1.1')
    await page.waitForTimeout(400)

    await openSheet(page, '3-1')
    await page.locator('.worksheet-card input[type="text"]').first().fill('Nur Blatt 3.1')
    await page.waitForTimeout(400)

    await openSheet(page, '1-1')
    await expect(page.locator('.worksheet-card textarea').first()).toHaveValue('Nur Blatt 1.1')
    await openSheet(page, '3-1')
    await expect(page.locator('.worksheet-card input[type="text"]').first()).toHaveValue('Nur Blatt 3.1')
  })

  test('Dieses Blatt leeren entfernt nur ein Arbeitsblatt', async ({ page }) => {
    await openSheet(page, '2-2')
    await page.locator('#name').fill('Kerstin')
    await page.waitForTimeout(400)
    page.once('dialog', (dialog) => dialog.accept())
    await page.getByTestId('reset-sheet').click()
    await expect(page.locator('#name')).toHaveValue('')
  })

  test('A.2-Skalen erzeugen Summe und speisen A.4', async ({ page }) => {
    await openSheet(page, 'a-2')
    for (let i = 1; i <= 10; i += 1) {
      await page.locator(`[data-testid="field-q${i}"] input[value="4"]`).check()
    }
    await expect(page.getByTestId('field-kasten1')).toContainText('20')
    await expect(page.getByTestId('field-kasten2')).toContainText('20')
    await page.waitForTimeout(400)

    await openSheet(page, 'a-3')
    for (let i = 1; i <= 10; i += 1) {
      await page.locator(`[data-testid="field-q${i}"] input[value="5"]`).check()
    }
    await page.waitForTimeout(400)

    await openSheet(page, 'a-4')
    await expect(page.getByTestId('field-vergleich')).toContainText('25')
  })
})
