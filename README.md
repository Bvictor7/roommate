# RoomMate

Plateforme de gestion de colocation : publication et recherche d'annonces de logement, puis gestion de la colocation une fois installé (colocataires, tâches, dépenses, courses).

## Stack technique

- **Frontend** : React 19, Vite, Tailwind CSS, React Router
- **Backend** : Node.js, Express 5, Prisma ORM
- **Base de données** : PostgreSQL
- **Authentification** : JWT + OAuth Google (Passport.js)
- **Conteneurisation** : Docker / Docker Compose

## Architecture

### Backend : routes → services → Prisma

Chaque ressource suit le même pattern à trois couches :

- **`routes/`** (ex. `colocations.js`) : déclare les endpoints Express, branche les middlewares (`auth` pour l'authentification JWT, `validate` pour la validation Zod), et délègue au service correspondant. Ne contient aucune logique métier.
- **`services/`** (ex. `colocation.service.js`) : logique métier, appels directs à Prisma. Lève des `Error` avec un champ `status` en cas d'erreur métier (ex. 404, 400), capturées et renvoyées en JSON par la route appelante.
- **Prisma** (`prisma/schema.prisma`) : définit le modèle de données et génère le client typé utilisé par les services.

Les entrées sont validées par des schémas Zod (`schemas/*.schema.js`) avant d'atteindre la route, via le middleware `validate`.

### Organisation des dossiers

```
backend/
├── src/
│   ├── routes/        # auth, listings, colocations, oauth
│   ├── services/       # logique métier + accès Prisma
│   ├── schemas/         # validation Zod
│   ├── middleware/      # auth (JWT), validate, checkRole, errorHandler
│   ├── config/           # stratégie Passport (Google OAuth)
│   └── index.js          # point d'entrée Express
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── Dockerfile

frontend/
├── src/
│   ├── pages/          # une page par route (Login, Listings, Dashboard, ColocationSetup...)
│   ├── components/      # composants partagés (TopNav...)
│   ├── context/          # AuthContext (session utilisateur en local)
│   └── services/         # api.js (client Axios, injecte le token JWT)
└── Dockerfile

docker-compose.yml
```

## Installation locale

### Prérequis

- Node.js 20+
- PostgreSQL (ou passer par Docker, voir plus bas)
- Un projet Google OAuth (Client ID/Secret) si tu veux tester la connexion Google

### Étapes

```bash
git clone <url-du-depot>
cd roomMate/code
```

**Backend** — créer `backend/.env` :

```env
DATABASE_URL="postgresql://user:password@localhost:5432/roommate"
PORT=3000
JWT_SECRET="une-valeur-secrete"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
FRONTEND_URL="http://localhost:5173"
```

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

**Frontend** — créer `frontend/.env` :

```env
VITE_API_URL="http://localhost:3000/api"
```

```bash
cd frontend
npm install
npm run dev
```

Le frontend tourne sur `http://localhost:5173`, le backend sur le port défini dans `PORT` (les deux `.env` doivent pointer sur le même port).

## Lancer avec Docker

```bash
docker compose up --build
```

Démarre 3 services définis dans `docker-compose.yml` :

- **`db`** : PostgreSQL, exposé sur `5432`
- **`backend`** : API Express, exposé sur `5000`, lit `DATABASE_URL`/`JWT_SECRET` depuis les variables d'environnement du service
- **`frontend`** : serveur Vite, exposé sur `5173`, configuré avec `VITE_API_URL=http://localhost:5000/api`

Les variables `JWT_SECRET` et `JWT_REFRESH_SECRET` attendues par `docker-compose.yml` doivent être définies dans un `.env` à la racine (voir `.env.example`).

## Choix techniques justifiés

- **Prisma** : client typé généré depuis `schema.prisma`, migrations versionnées (`prisma/migrations/`) plutôt que du SQL brut géré à la main. Les relations (`Colocation` ↔ `ColocationMember` ↔ `User`) se lisent directement dans le schéma.
- **Zod** : validation déclarative des données entrantes (`req.body`) avant qu'elles n'atteignent les services, avec des messages d'erreur structurés renvoyés tels quels au frontend (`middleware/validate.js`).
- **JWT** : authentification stateless — aucune session à stocker côté serveur, le token (`userId`, `role`) est vérifié à chaque requête protégée par le middleware `auth`. Adapté à une API consommée par un frontend séparé.
- **Architecture en couches (routes → services → Prisma)** : sépare le câblage HTTP (routes) de la logique métier (services), ce qui permet d'ajouter une ressource (ex. colocations) en suivant toujours le même pattern, sans dupliquer la gestion des erreurs ou de l'auth.

## Fonctionnalités principales

- **Authentification** : inscription/connexion par email + mot de passe (JWT, bcrypt), connexion via Google OAuth (Passport.js)
- **CRUD annonces** : création, liste paginée, détail, modification et suppression (réservées à l'auteur de l'annonce)
- **Gestion de colocation** : création d'une colocation (génère un code d'invitation), adhésion à une colocation existante via ce code, consultation de la colocation et de ses membres
- **RBAC** : rôle (`USER`/`ADMIN`) porté par l'utilisateur et embarqué dans le JWT, middleware `checkRole` disponible pour restreindre l'accès par rôle
