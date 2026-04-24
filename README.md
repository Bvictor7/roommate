<div align="center">

# RoomMate

**Application web de colocation** — Trouvez un logement, un colocataire, et gérez votre vie en coloc.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-ISC-green)](LICENSE)
[![Status](https://img.shields.io/badge/status-MVP%20en%20ligne-success)]()

**[Démo live](https://roommate-cda.netlify.app)** · **[API backend](https://roommate-y4n7.onrender.com)**

</div>

---

## Sommaire

- [À propos](#à-propos)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Dépendances détaillées](#dépendances-détaillées)
- [Architecture](#architecture)
- [Installation locale](#installation-locale)
- [Scripts utiles](#scripts-utiles)
- [Structure du projet](#structure-du-projet)
- [Modèle de données](#modèle-de-données)
- [Variables d'environnement](#variables-denvironnement)
- [Déploiement](#déploiement)
- [Roadmap](#roadmap)
- [Auteur](#auteur)

---

## À propos

RoomMate répond à un constat simple : la colocation explose, mais les outils n'ont pas suivi. Les annonces sont éparpillées sur des sites généralistes, et une fois installés, les colocataires s'organisent sur WhatsApp et Excel.

**RoomMate centralise tout :**

- **Trouver** un logement ou un colocataire via des annonces spécialisées
- **Vivre** la colocation grâce à un espace collaboratif (tâches, courses, dépenses, messagerie)

Projet personnel développé dans le cadre du **titre professionnel CDA** (Concepteur Développeur d'Applications).

---

## Fonctionnalités

### Disponibles

- Inscription et connexion sécurisées (JWT + bcrypt)
- Publication d'annonces (CRUD complet)
- Consultation des annonces avec recherche textuelle
- Validation des données avec Zod côté backend
- Rate limiting pour protéger l'authentification
- Interface responsive (mobile + desktop)
- API REST structurée avec middlewares d'authentification

### En cours de développement

- Upload de photos pour les annonces (Multer + Sharp → WebP)
- Filtres avancés (ville, prix, type, disponibilité)
- Système de favoris et likes
- Messagerie interne entre utilisateurs
- Espace colocation (tâches, courses, dépenses partagées)
- Version mobile (React Native + Expo)

---

## Stack technique

| Couche | Technologies |
|--------|--------------|
| **Frontend** | React 19, Vite 8, Tailwind CSS 4, React Router 7 |
| **Gestion d'état** | Zustand (global) + React Query (serveur) |
| **Formulaires** | React Hook Form + Zod |
| **Backend** | Node.js 20, Express 5, Prisma ORM 5 |
| **Base de données** | PostgreSQL 16 |
| **Authentification** | JSON Web Tokens (JWT), bcrypt |
| **Upload & images** | Multer (upload) + Sharp (compression WebP) |
| **Sécurité** | Rate limiting, CORS configuré, variables d'env |
| **Conteneurisation** | Docker + Docker Compose |
| **Hébergement** | Netlify (front) + Render (back + BDD) |

---

## Dépendances détaillées

### Backend — `backend/package.json`

#### Dépendances de production

| Package | Rôle dans le projet |
|---------|---------------------|
| `express` | Framework HTTP minimaliste — gère les routes, les middlewares et le cycle requête/réponse |
| `@prisma/client` | ORM pour interagir avec PostgreSQL en JavaScript (au lieu d'écrire du SQL brut) |
| `prisma` | CLI Prisma pour gérer les migrations et générer le client typé |
| `bcrypt` | Hashage sécurisé des mots de passe avec salt avant stockage en base |
| `jsonwebtoken` | Génération et vérification des tokens JWT pour l'authentification stateless |
| `zod` | Validation stricte des données entrantes (body, params, query) avec schémas typés |
| `cors` | Configuration des origines autorisées — essentiel entre Netlify et Render |
| `dotenv` | Chargement des variables d'environnement depuis le fichier `.env` |
| `express-rate-limit` | Limite le nombre de requêtes par IP — protège l'authentification contre le brute force |
| `multer` | Middleware pour gérer l'upload de fichiers (photos d'annonces) |
| `sharp` | Compression et conversion d'images en WebP pour optimiser les performances |
| `tsx` | Exécution directe de fichiers TypeScript en développement sans build |

#### Dépendances de développement

| Package | Rôle dans le projet |
|---------|---------------------|
| `nodemon` | Redémarre automatiquement le serveur à chaque modification de fichier |

### Frontend — `frontend/package.json`

#### Dépendances de production

| Package | Rôle dans le projet |
|---------|---------------------|
| `react` + `react-dom` | Bibliothèque de rendu UI par composants |
| `react-router-dom` | Routing côté client — gestion des pages (`/`, `/listings`, `/login`…) |
| `@tanstack/react-query` | Gestion des données serveur — cache, refetch auto, états de chargement |
| `zustand` | Store global léger — gère l'état d'authentification et les préférences |
| `axios` | Client HTTP — envoie les requêtes vers l'API Express |
| `react-hook-form` | Gestion performante des formulaires avec validation |
| `zod` | Schémas de validation partagés avec le backend (mêmes règles côté client) |
| `lucide-react` | Bibliothèque d'icônes SVG modernes et légères |

#### Dépendances de développement

| Package | Rôle dans le projet |
|---------|---------------------|
| `vite` | Build tool ultra-rapide (Hot Module Replacement quasi instantané) |
| `@vitejs/plugin-react` | Plugin Vite pour compiler JSX/TSX |
| `tailwindcss` + `@tailwindcss/postcss` | Framework CSS utility-first pour un styling rapide |
| `autoprefixer` + `postcss` | Ajoute automatiquement les préfixes navigateurs aux CSS |
| `eslint` + plugins | Linter pour garder un code propre et cohérent |
| `@types/react` + `@types/react-dom` | Types TypeScript pour l'auto-complétion dans l'IDE |
| `globals` | Définitions des variables globales pour ESLint |

### Racine — `package.json`

Les dépendances à la racine (`autoprefixer`, `postcss`, `tailwindcss`) servent à la configuration de Tailwind au niveau monorepo.

---

## Architecture

```
┌─────────────┐      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│ Utilisateur │ ───▶ │   Frontend   │ ───▶ │  Backend API │ ───▶ │  PostgreSQL  │
│ (navigateur)│      │  React/Vite  │      │ Node/Express │      │  Prisma ORM  │
└─────────────┘      └──────────────┘      └──────────────┘      └──────────────┘
                          Netlify               Render                Render
```

**Flux d'une requête :**

1. L'utilisateur interagit avec l'interface React
2. React Query ou Axios envoie une requête HTTP vers l'API Express
3. Express vérifie le rate limit, valide avec Zod et authentifie via JWT
4. Prisma lit/écrit dans PostgreSQL et renvoie du JSON
5. Le frontend affiche les données (avec cache React Query)

---

## Installation locale

### Prérequis

- [Docker](https://docs.docker.com/get-docker/) et Docker Compose
- [Node.js](https://nodejs.org/) v20 ou supérieur
- Git

### Lancement

```bash
# 1. Cloner le dépôt
git clone https://github.com/Bvictor7/roommate.git
cd roommate

# 2. Configurer les variables d'environnement
cp .env.example .env

# 3. Lancer les conteneurs
docker compose up --build -d

# 4. Appliquer les migrations Prisma
docker exec -it roommate-backend-1 npx prisma migrate dev
```

### Accès

| Service | URL |
|---------|-----|
| Frontend | [http://localhost:5173](http://localhost:5173) |
| Backend API | [http://localhost:3000](http://localhost:3000) |
| PostgreSQL | `localhost:5432` |
| Prisma Studio | `npx prisma studio` → [http://localhost:5555](http://localhost:5555) |

---

## Scripts utiles

### Backend

```bash
npm run dev              # Serveur en mode dev (nodemon)
npm start                # Serveur en mode production
npm run prisma:generate  # Regénérer le client Prisma
npm run prisma:migrate   # Créer/appliquer une migration
```

Dans le conteneur Docker :

```bash
docker exec -it roommate-backend-1 sh
npx prisma migrate dev --name nom_de_la_migration
npx prisma studio        # UI pour explorer la base
npx prisma migrate reset # Réinitialiser (destructif)
```

### Frontend

```bash
cd frontend
npm install
npm run dev      # Serveur de dev Vite
npm run build    # Build de production
npm run preview  # Prévisualiser le build
npm run lint     # Vérifier le code avec ESLint
```

### Docker

```bash
docker compose up -d              # Démarrer en arrière-plan
docker compose down               # Arrêter les conteneurs
docker compose logs -f backend    # Suivre les logs du backend
docker compose restart backend    # Redémarrer un service
```

---

## Structure du projet

```
roommate/
├── backend/
│   ├── src/
│   │   ├── routes/          # Endpoints Express (auth, listings, users…)
│   │   ├── middleware/      # Auth JWT, gestion d'erreurs, rate limit
│   │   ├── schemas/         # Schémas de validation Zod
│   │   └── index.js         # Point d'entrée Express
│   ├── prisma/
│   │   ├── schema.prisma    # Modèle de données
│   │   └── migrations/      # Historique des migrations
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── pages/           # Pages (Home, Login, Listings, CreateListing…)
│   │   ├── components/      # Navbar, Footer, Layout
│   │   ├── context/         # AuthContext (gestion de session)
│   │   └── services/        # api.js (client Axios configuré)
│   └── vite.config.js
├── docker-compose.yml
└── README.md
```

---

## Modèle de données

Le schéma Prisma contient **7 modèles** organisés autour de deux axes :

**Axe annonces**
- `User` — utilisateurs de la plateforme
- `Listing` — annonces publiées

**Axe colocation**
- `Colocation` — groupe de colocataires avec code d'invitation
- `ColocationMember` — relation User ↔ Colocation avec rôle (admin/membre)
- `Task` — tâches ménagères assignables
- `Expense` — dépenses partagées
- `GroceryItem` — liste de courses collaborative

Voir [`backend/prisma/schema.prisma`](backend/prisma/schema.prisma) pour le détail complet.

---

## Variables d'environnement

Un fichier `.env.example` est fourni à la racine. Les variables essentielles :

```env
# Base de données
DATABASE_URL="postgresql://user:password@db:5432/roommate"

# Authentification
JWT_SECRET="change-moi-en-prod"
JWT_EXPIRES_IN="7d"

# Serveur
PORT=3000
NODE_ENV="development"

# Frontend (fichier .env.local dans /frontend)
VITE_API_URL="http://localhost:3000"
```

---

## Déploiement

| Service | Hébergeur | Déclenchement |
|---------|-----------|---------------|
| Frontend | [Netlify](https://www.netlify.com/) | Push sur `main` → build + deploy auto |
| Backend | [Render](https://render.com/) | Push sur `main` → rebuild du service |
| Base de données | Render (PostgreSQL managé) | Persistante, sauvegarde auto |

**Configuration Netlify :** le `VITE_API_URL` pointe vers l'URL de production du backend Render.

**Configuration Render :** les migrations Prisma sont exécutées automatiquement au démarrage via le script `start`.

---

## Roadmap

| Période | Étape | Statut |
|---------|-------|--------|
| Nov. 2025 | Cahier des charges + maquettes | Terminé |
| Déc. 2025 | Frontend MVP | Terminé |
| Jan. 2026 | Backend + base de données | Terminé |
| Fév. 2026 | Liaison front/back + déploiement | Terminé |
| Mars 2026 | CRUD annonces + authentification | Terminé |
| **Avril 2026** | **Refonte UI + pages manquantes** | **En cours** |
| Mai – Oct. 2026 | Features colocation + version mobile | À venir |
| Nov. 2026 | Livraison finale | À venir |

---

## Auteur

**Victor Belahcene**

Projet personnel réalisé dans le cadre du titre professionnel **Concepteur Développeur d'Applications (CDA)**.

- GitHub : [@Bvictor7](https://github.com/Bvictor7)

---

## Licence

Ce projet est distribué sous licence ISC.
