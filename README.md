# RoomMate 🏠

![CI](https://github.com/Bvictor7/roommate/actions/workflows/ci.yml/badge.svg)
![Netlify](https://img.shields.io/badge/netlify-deployed-brightgreen)
![Docker](https://img.shields.io/badge/docker-distroless%20281MB-blue)
![License](https://img.shields.io/badge/license-ISC-blue)
![Coverage](https://img.shields.io/badge/coverage-76.66%25-yellowgreen)

Plateforme de gestion de colocation : recherche d'annonces de logement partagé, puis gestion quotidienne de la colocation (colocataires, tâches, dépenses communes, liste de courses).

## 🌐 Démo

| Service | URL |
|---|---|
| **Frontend** | https://roommate-cda.netlify.app |
| **Backend API** | https://roommate-y4n7.onrender.com |
| **Health check** | https://roommate-y4n7.onrender.com/health |

---

## 🛠 Stack technique

| Couche | Technologie |
|---|---|
| Frontend | React 19, Vite 6, React Router 7, Leaflet |
| Backend | Node.js 22, Express 5, Prisma ORM |
| Base de données | PostgreSQL 18 |
| Auth | JWT (access + refresh) + OAuth Google (Passport.js) |
| Tests | Vitest (31 tests), Playwright (11 E2E) — 42/42 ✅ |
| CI/CD | GitHub Actions (5 jobs : Lint → Tests → Build → Staging → Prod) |
| Conteneurisation | Docker distroless gcr.io/distroless/nodejs20-debian12 (281 MB) |
| Monitoring | Grafana Cloud Synthetic, Sentry (frontend + backend), UptimeRobot |
| Hébergement | Netlify (frontend) · Render (backend + DB) |

---

## 🚀 Démarrage rapide (Docker)

```bash
git clone https://github.com/Bvictor7/roommate
cd roommate
cp .env.example .env
# Éditer .env avec vos valeurs
docker compose up --build
```

| Service | URL locale |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3000 |
| PostgreSQL | localhost:5432 |

---

## 🔧 Installation locale (sans Docker)

### Prérequis
- Node.js 22+
- PostgreSQL 18+

### Backend

```bash
cd backend
npm install
cp .env.example .env   # remplir DATABASE_URL, JWT_SECRET, etc.
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # remplir VITE_API_URL
npm run dev
```

---

## 🧪 Tests

```bash
# Tests unitaires + API (15 + 16 = 31 tests)
cd backend && npm test

# Couverture de code (76.66%)
cd backend && npx vitest run --coverage src/test/

# Tests E2E Playwright (11 tests)
cd frontend && npx playwright test --project=chromium
```

### Résultats

| Suite | Résultat |
|---|---|
| Tests unitaires (auth) | 15/15 ✅ |
| Tests API (listings) | 16/16 ✅ |
| Tests E2E | 11/11 ✅ |
| Couverture totale | 76.66% ✅ |

---

## 📦 CI/CD Pipeline

```
git push origin main
↓
[1] Lint (ESLint)
↓
[2] Tests unitaires (Vitest)
↓
[3] Build Docker (distroless)
↓
[4] Deploy staging (Render webhook auto)
↓
[5] Deploy production (approbation manuelle Bvictor7)
```

Le deploy prod est protégé par un **GitHub Environment** avec reviewer obligatoire.

---

## 🔒 Sécurité

| Mesure | Statut |
|---|---|
| HTTPS (Netlify + Render) | ✅ |
| Helmet headers | ✅ |
| Rate limiting (100 req/15 min) | ✅ |
| JWT (access + refresh tokens) | ✅ |
| bcrypt (12 rounds) | ✅ |
| Validation Zod | ✅ |
| OWASP ZAP scan | 0 FAIL, 55 PASS ✅ |
| npm audit | 0 vulnérabilité prod ✅ |
| Trivy image scan | 2 CRITICAL non-exploitables ⚠️ |
| Dependabot | Actif ✅ |
| CSP Headers (netlify.toml) | ✅ |

---

## 📊 Qualité & Performance

| Métrique | Score |
|---|---|
| Lighthouse Performance | 100/100 |
| Lighthouse Accessibility | 96/100 |
| Lighthouse Best Practices | 100/100 |
| Couverture de code | 76.66% |
| Tests passants | 42/42 |

---

## 📁 Structure du projet

```
roommate/
├── .github/
│   └── workflows/
│       └── ci.yml              # Pipeline CI/CD (5 jobs)
├── backend/
│   ├── src/
│   │   ├── routes/             # Express routes (auth, listings, users…)
│   │   ├── middleware/         # JWT, RBAC, rate-limit, error handler
│   │   ├── test/               # Tests unitaires Vitest
│   │   └── index.js            # Entry point + Sentry init
│   ├── prisma/
│   │   └── schema.prisma       # Schéma DB (User, Listing, Colocation…)
│   └── Dockerfile              # distroless nodejs20-debian12
├── frontend/
│   ├── src/
│   │   ├── components/         # Composants React réutilisables
│   │   ├── pages/              # Pages (Login, Dashboard, Annonces…)
│   │   └── main.jsx            # Entry point + Sentry init
│   ├── e2e/
│   │   └── example.spec.js     # Tests E2E Playwright (11 tests)
│   ├── netlify.toml            # Headers sécurité + redirects SPA
│   └── Dockerfile              # nginx:alpine multi-stage
├── docker-compose.yml          # Dev (avec healthcheck DB)
├── docker-compose.prod.yml     # Prod (réseau interne/public)
└── .env.example                # Variables d'environnement documentées
```

---

## ⚙️ Variables d'environnement

Voir [`.env.example`](.env.example) pour la liste complète.

### Backend (Render)

| Variable | Description |
|---|---|
| `DATABASE_URL` | URL PostgreSQL (Internal Render) |
| `JWT_SECRET` | Secret JWT access token |
| `JWT_REFRESH_SECRET` | Secret JWT refresh token |
| `GOOGLE_CLIENT_ID` | OAuth Google App |
| `GOOGLE_CLIENT_SECRET` | OAuth Google App |
| `FRONTEND_URL` | URL Netlify (CORS) |
| `NODE_ENV` | `production` |
| `SENTRY_DSN` | DSN Sentry backend |

### Frontend (Netlify)

| Variable | Description |
|---|---|
| `VITE_API_URL` | URL backend Render |
| `VITE_SENTRY_DSN` | DSN Sentry frontend |

---

## 🔄 Rollback

En cas de problème en production :

```bash
# Lister les commits récents
git log --oneline -10

# Revenir à un commit stable
git revert HEAD
git push origin main
# → déclenche automatiquement le pipeline CI/CD
```

Ou via Render Dashboard → **Manual Deploy** → choisir un déploiement précédent.

---

## 📈 Monitoring

| Outil | Usage |
|---|---|
| [Grafana Cloud](https://grafana.com) | Synthetic monitoring, uptime, SSL |
| [Sentry](https://sentry.io) | Error tracking frontend + backend |
| [UptimeRobot](https://uptimerobot.com) | Alertes email toutes les 5 min |

Dashboard Grafana : 100% uptime · 0 probe failing · SSL valide 10+ semaines

---

## 👤 Auteur

**Victor Belahcene Terdjemane**  
Formation CDA (Concepteur Développeur d'Applications) — AFEC Bayonne  
2025–2026

---

## 📄 Licence

ISC