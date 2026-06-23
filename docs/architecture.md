# Architecture — RoomMate

## Vue générale

```
Utilisateur
    │
    ▼
Frontend (React / Vite)          ← Netlify
    │  HTTP / REST
    ▼
Backend (Node.js / Express)      ← Render
    │  Prisma Client
    ▼
PostgreSQL                        ← Render (managed)
```

---

## Architecture en couches (backend)

```
routes/          ← Controller : HTTP, validation, délégation
services/        ← Métier : règles, logique, gestion erreurs
prisma/          ← Données : schéma, migrations, ORM
PostgreSQL       ← Persistance
```

Règle de dépendance : chaque couche ne connaît que la couche immédiatement en dessous.  
Les routes ne parlent jamais directement à Prisma.

### Fichiers

| Couche | Fichiers |
|--------|----------|
| Routes | `src/routes/auth.js`, `src/routes/listings.js` |
| Services | `src/services/auth.service.js`, `src/services/listing.service.js` |
| Middleware | `src/middleware/auth.js`, `src/middleware/validate.js` |
| Schémas | `src/schemas/auth.schema.js`, `src/schemas/listing.schema.js` |
| ORM | `prisma/schema.prisma` |

---

## ADR — Architecture Decision Records

### ADR-001 — PostgreSQL

**Décision** : PostgreSQL comme base de données principale.  
**Alternatives** : MongoDB (pas adapté aux données relationnelles), MySQL (moins performant sur jointures complexes).  
**Raison** : données fortement relationnelles, intégrité référentielle, support JSON natif.

### ADR-002 — Prisma ORM

**Décision** : Prisma comme ORM.  
**Alternatives** : Sequelize (verbeux), SQL brut (pas de migrations), TypeORM (surcharge pour projet solo).  
**Raison** : migrations versionnées, client typé généré, Prisma Studio intégré.

### ADR-003 — JWT

**Décision** : JSON Web Tokens pour l'authentification, expiration 24h.  
**Alternatives** : Sessions serveur (nécessite Redis, pas stateless), OAuth2 (trop complexe pour MVP).  
**Raison** : architecture stateless compatible avec frontend/backend séparés.

### ADR-004 — Netlify + Render

**Décision** : Netlify (frontend) + Render (backend + BDD).  
**Alternatives** : Vercel (exclu par préférence), Railway (tier gratuit limité), VPS (trop de config pour MVP solo).  
**Raison** : déploiement automatique sur push, gratuit, simple à configurer.

---

## Sécurité

- Authentification JWT avec middleware `auth.js`
- Hashage bcrypt (salt 12) sur les mots de passe
- Validation des inputs avec Zod (schémas partagés front/back)
- Rate limiting (100 req / 15 min par IP)
- CORS configuré
- Variables d'environnement pour les secrets

## Déploiement

| Service | Hébergeur | Déclenchement |
|---------|-----------|---------------|
| Frontend | Netlify | Push sur `main` |
| Backend | Render | Push sur `main` |
| PostgreSQL | Render (managed) | Persistant |
