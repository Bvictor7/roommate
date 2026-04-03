# RoomMate

Application web de colocation permettant de trouver un logement, un colocataire, et de gérer sa vie en colocation.

## Stack technique

- **Frontend** : React + Vite + Tailwind CSS
- **Backend** : Node.js + Express
- **Base de données** : PostgreSQL + Prisma ORM
- **Authentification** : JWT + bcrypt
- **Conteneurisation** : Docker + Docker Compose

## Liens

- Frontend : https://roommate-cda.netlify.app
- Backend : https://roommate-y4n7.onrender.com

## Installation locale

### Prérequis

- Docker
- Node.js v20+

### Lancer le projet
```bash
git clone https://github.com/Bvictor7/roommate.git
cd roommate
cp .env.example .env
sudo docker compose up --build -d
```

### Accès

- Frontend : http://localhost:5173
- Backend : http://localhost:3000

### Migration base de données
```bash
sudo docker exec -it roommate-backend-1 sh
npx prisma migrate dev
```

## Fonctionnalités

- Inscription et connexion sécurisée (JWT)
- Publication et consultation d'annonces de colocation
- Filtres de recherche avancés
- Gestion de colocation (tâches, dépenses, courses)
- Validation des données (Zod)
- API REST sécurisée

## Structure du projet
```
roommate/
├── backend/          # API REST Node.js
│   ├── src/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── schemas/
│   └── prisma/
├── frontend/         # Application React
│   └── src/
│       ├── pages/
│       └── services/
└── docker-compose.yml
```