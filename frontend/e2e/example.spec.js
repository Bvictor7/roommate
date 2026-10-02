// @ts-check
import { test, expect } from '@playwright/test'

const BASE_URL = 'https://roommate-cda.netlify.app'
const timestamp = Date.now()
const testEmail = `e2e_${timestamp}@test.com`
const testPassword = 'password123'
const testUsername = `e2euser${timestamp}`.slice(0, 20)

// Par défaut on se connecte avec le compte e2e créé par le test 2 (garanti d'exister,
// contrairement à un compte "test1@test.com" codé en dur qui peut ne pas exister/avoir
// le bon mot de passe en prod).
async function login(page, email = testEmail, password = testPassword) {
  await page.goto(`${BASE_URL}/login`)
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Mot de passe').fill(password)
  await page.getByRole('button', { name: /Se connecter/i }).click()
  // Attendre que la réponse arrive (Render cold start peut être lent)
  await page.waitForResponse(res => res.url().includes('/api/auth/login'), { timeout: 30000 })
  // Vérifier l'URL plutôt que waitForURL : plus robuste si la navigation est retardée
  // par le check de colocation qui suit immédiatement le login
  await expect(page).toHaveURL(/dashboard|coloc-setup/, { timeout: 30000 })
}

test.describe('RoomMate — Parcours principal', () => {

  test('1. La page d\'accueil se charge correctement', async ({ page }) => {
    await page.goto(BASE_URL)
    await expect(page).toHaveTitle(/RoomMate/)
    await expect(page.getByRole('link', { name: 'RoomMate', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Annonces', exact: true })).toBeVisible()
  })

  test('2. Inscription d\'un nouvel utilisateur', async ({ page }) => {
    await page.goto(`${BASE_URL}/register`)
    await page.getByLabel("Nom d'utilisateur").fill(testUsername)
    await page.getByLabel('Email').fill(testEmail)
    await page.getByLabel('Mot de passe').fill(testPassword)
    await page.getByRole('button', { name: /S'inscrire/i }).click()
    await page.waitForResponse(res => res.url().includes('/api/auth/register'), { timeout: 30000 })
    await expect(page).toHaveURL(/dashboard|coloc-setup/, { timeout: 30000 })
  })

  test('3. Connexion avec un compte existant', async ({ page }) => {
    await login(page)
    expect(page.url()).toMatch(/dashboard|coloc-setup/)
  })

  test('4. La page Annonces charge et affiche la carte', async ({ page }) => {
    await page.goto(`${BASE_URL}/listings`)
    await expect(page.getByText(/Chambres libres/i)).toBeVisible()
    await expect(page.locator('.leaflet-container')).toBeVisible({ timeout: 15000 })
  })

  test('5. Création d\'une annonce (connecté)', async ({ page }) => {
    await login(page)

    await page.goto(`${BASE_URL}/create-listing`)
    await expect(page.getByText(/Publier une annonce/i)).toBeVisible()

    await page.getByLabel(/Titre/i).fill('Chambre E2E test automatisé')
    await page.getByLabel(/Description/i).fill('Chambre de test pour les tests E2E Playwright automatisés.')
    await page.getByLabel(/Ville/i).fill('Paris')
    await page.getByLabel(/Code postal/i).fill('75011')
    await page.getByLabel(/Loyer/i).fill('650')
    await page.getByLabel(/Disponible/i).fill('2026-12-01')
    await page.getByRole('button', { name: /Mettre en ligne/i }).click()
    await page.waitForResponse(res => res.url().includes('/api/listings') && res.request().method() === 'POST', { timeout: 30000 })
    await expect(page).toHaveURL(`${BASE_URL}/listings`, { timeout: 30000 })
  })

  test('6. Navigation entre les pages', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.getByRole('link', { name: 'Annonces', exact: true }).click()
    await expect(page).toHaveURL(/listings/)
    await page.getByRole('link', { name: 'Accueil', exact: true }).click()
    await expect(page).toHaveURL(BASE_URL + '/')
  })

  test('7. Accès au dashboard sans connexion redirige', async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard`)
    await expect(page).toHaveURL(/login|coloc-setup/, { timeout: 15000 })
  })

})