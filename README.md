<div align="center">

# RoomMate

**Application web de colocation** — Trouvez un logement, un colocataire, et gérez votre vie en coloc.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Status](https://img.shields.io/badge/status-MVP%20en%20ligne-success)]()

**[Démo live](https://roommate-cda.netlify.app)** · **[API backend](https://roommate-y4n7.onrender.com)**

</div>

---

## Sommaire

- [À propos](#à-propos)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
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
- Interface responsive (mobile + desktop)
- API REST structurée avec middlewares d'authentification

### En cours de développement

- Upload de photos pour les annonces (1 à 5 images WebP)
- Filtres avancés (ville, prix, type, disponibilité)
- Système de favoris et likes
- Messagerie interne entre utilisateurs
- Espace colocation (tâches, courses, dépenses partagées)
- Version mobile (React Native + Expo)

---

## Stack technique

| Couche | Technologies |
|--------|--------------|
| **Frontend** | React 19, Vite 6, Tailwind CSS 4, React Router, Axios |
| **Backend** | Node.js 20, Express, Prisma ORM |
| **Base de données** | PostgreSQL 16 |
| **Authentification** | JSON Web Tokens (JWT), bcrypt |
| **Validation** | Zod (schémas partagés front/back) |
| **Conteneurisation** | Docker, Docker Compose |
| **CI/CD** | GitHub + déploiement automatique |
| **Hébergement** | Netlify (front) + Render (back + BDD) |

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
2. Axios envoie des requêtes HTTP vers l'API Express
3. Express valide (Zod), authentifie (JWT) et appelle Prisma
4. Prisma lit/écrit dans PostgreSQL et renvoie du JSON

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
# Ouvrir un shell dans le conteneur backend
docker exec -it roommate-backend-1 sh

# Créer une migration après modification du schéma Prisma
npx prisma migrate dev --name nom_de_la_migration

# Regénérer le client Prisma
npx prisma generate

# Explorer la base via une UI
npx prisma studio

# Réinitialiser la base (attention : destructif)
npx prisma migrate reset
```

### Frontend

```bash
cd frontend
npm install
npm run dev      # Serveur de dev
npm run build    # Build de production
npm run preview  # Prévisualiser le build
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
│   │   ├── middleware/      # Authentification JWT, gestion d'erreurs
│   │   ├── schemas/         # Schémas de validation Zod
│   │   └── server.js        # Point d'entrée Express
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

Ce projet est distribué sous licence MIT. Voir [LICENSE](LICENSE) pour plus d'informations.