import { test, expect } from '@playwright/test'

const BASE_URL = 'https://roommate-cda.netlify.app'
const timestamp = Date.now()
const testEmail = `e2e_${timestamp}@test.com`
const testPassword = 'password123'
const testUsername = `e2euser${timestamp}`.slice(0, 20)

// Marqueur visible de la page "créer/rejoindre un foyer"
const colocSetupHeading = (page) => page.getByRole('heading', { name: /Votre colocation/i })
// Marqueur visible du Dashboard une fois qu'un foyer existe
const dashboardHeading = (page) => page.getByText(/mur de la cuisine/i)

async function login(page, email = testEmail, password = testPassword) {
  await page.goto(`${BASE_URL}/login`)
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Mot de passe').fill(password)
  await page.getByRole('button', { name: /Se connecter/i }).click()
  await page.waitForResponse(res => res.url().includes('/api/auth/login'), { timeout: 30000 })
  // Après le login, navigate('/dashboard') est synchrone mais le guard de
  // colocation fait ensuite un check async qui peut rediriger vers
  // /coloc-setup : attendre juste l'URL /dashboard|coloc-setup se fait piéger
  // par cet état transitoire. On attend un élément réellement visible de
  // l'état final à la place.
  await expect(colocSetupHeading(page).or(dashboardHeading(page))).toBeVisible({ timeout: 30000 })
}

// Garantit que le compte a un foyer avant de tester une fonctionnalité qui en
// dépend (idempotent : si un foyer existe déjà, ne fait rien).
async function ensureColocation(page) {
  if (!(await colocSetupHeading(page).isVisible())) return
  await page.getByLabel(/Nom/i).fill('Coloc E2E Test')
  // "Créer" (onglet) et "Créer ma colocation" (soumission) correspondent tous
  // les deux à /Créer/i : il faut viser le bouton de soumission précisément.
  await page.getByRole('button', { name: 'Créer ma colocation' }).click()
  await page.waitForResponse(res => res.url().includes('/api/colocation'), { timeout: 30000 })
  // La création n'enchaîne pas automatiquement vers le dashboard : elle
  // affiche l'écran "Foyer créé !" avec le code d'invitation et un bouton
  // dédié pour continuer.
  await page.getByRole('button', { name: /Accéder au foyer/i }).click()
  await expect(dashboardHeading(page)).toBeVisible({ timeout: 15000 })
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

test.describe('RoomMate — Flux critiques foyer', () => {

  test('8. Création d\'une colocation', async ({ page }) => {
    await login(page)
    await ensureColocation(page)
    await expect(dashboardHeading(page)).toBeVisible({ timeout: 10000 })
  })

  test('9. Ajout d\'une tâche dans le foyer', async ({ page }) => {
    await login(page)
    await ensureColocation(page)

    const taskInput = page.locator('input[placeholder*="tâche"]')
    await taskInput.fill('Tâche E2E automatisée')
    await taskInput.press('Enter')
    await expect(page.getByText('Tâche E2E automatisée')).toBeVisible({ timeout: 10000 })
  })

  test('10. Ajout d\'une dépense dans le foyer', async ({ page }) => {
    await login(page)
    await ensureColocation(page)

    await page.getByRole('button', { name: /\+ AJOUTER/i }).click()
    await page.locator('input[placeholder*="Catégorie"]').fill('Courses E2E')
    await page.locator('input[placeholder*="Montant"]').fill('42')
    await page.getByRole('button', { name: /VALIDER/i }).click()
    await expect(page.getByText('Courses E2E')).toBeVisible({ timeout: 10000 })
  })

  test('11. Déconnexion', async ({ page }) => {
    await login(page)
    await page.getByRole('button', { name: 'Déco', exact: true }).click()
    // Depuis une route protégée (/dashboard), le logout peut atterrir sur /
    // ou /login selon l'ordre de résolution entre le guard de colocation et
    // la navigation déclenchée par TopNav — dans les deux cas l'utilisateur
    // est bien déconnecté, ce qu'on vérifie via le lien "Connexion".
    await expect(page.getByRole('link', { name: 'Connexion' })).toBeVisible({ timeout: 10000 })
    expect(page.url()).toMatch(new RegExp(`^${BASE_URL}/(login)?$`))
  })

})