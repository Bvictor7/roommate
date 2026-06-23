# API Reference — RoomMate

Base URL production : `https://roommate-y4n7.onrender.com`  
Base URL local : `http://localhost:3000`

Toutes les routes protégées nécessitent un header `Authorization: Bearer <token>`.

---

## Auth

### POST /api/auth/register

Crée un nouveau compte utilisateur.

**Body**
```json
{
  "email": "user@example.com",
  "password": "motdepasse",
  "username": "victor"
}
```

| Champ | Type | Contraintes |
|-------|------|-------------|
| email | string | format email valide |
| password | string | min 6 caractères |
| username | string | 2–30 caractères |

**Réponses**
- `201` — Compte créé + token JWT
- `400` — Email déjà utilisé ou données invalides

---

### POST /api/auth/login

Authentifie un utilisateur existant.

**Body**
```json
{
  "email": "user@example.com",
  "password": "motdepasse"
}
```

**Réponses**
- `200` — Token JWT + infos utilisateur
- `401` — Email ou mot de passe incorrect

---

### GET /api/auth/me

Retourne le profil de l'utilisateur connecté.

**Auth** : requise

**Réponses**
- `200` — `{ id, email, username }`
- `401` — Token invalide ou expiré

---

## Listings

### GET /api/listings

Retourne la liste des annonces actives avec filtres optionnels.

**Query params**
| Paramètre | Type | Description |
|-----------|------|-------------|
| city | string | Filtre par ville (insensible à la casse) |
| type | string | `chambre` / `appartement` / `maison` |
| minPrice | number | Prix minimum |
| maxPrice | number | Prix maximum |

**Réponses**
- `200` — Tableau d'annonces

---

### GET /api/listings/:id

Retourne le détail d'une annonce.

**Réponses**
- `200` — Annonce complète avec infos auteur
- `404` — Annonce non trouvée

---

### POST /api/listings

Crée une nouvelle annonce.

**Auth** : requise

**Body**
```json
{
  "title": "Chambre lumineuse Paris 11e",
  "description": "Grande chambre dans appartement calme...",
  "type": "chambre",
  "city": "Paris",
  "postalCode": "75011",
  "price": 650,
  "charges": 50,
  "availableDate": "2026-07-01T00:00:00.000Z"
}
```

| Champ | Type | Contraintes |
|-------|------|-------------|
| title | string | 5–100 caractères |
| description | string | min 20 caractères |
| type | string | `chambre` / `appartement` / `maison` |
| city | string | min 2 caractères |
| postalCode | string | 5 chiffres |
| price | number | positif |
| charges | number | optionnel |
| availableDate | string | format ISO 8601 |

**Réponses**
- `201` — Annonce créée
- `400` — Données invalides
- `401` — Non authentifié

---

### PUT /api/listings/:id

Modifie une annonce existante. Réservé à l'auteur.

**Auth** : requise

**Body** : identique à POST

**Réponses**
- `200` — Annonce mise à jour
- `400` — Données invalides
- `401` — Non authentifié
- `403` — Non autorisé (pas l'auteur)
- `404` — Annonce non trouvée

---

### DELETE /api/listings/:id

Supprime une annonce. Réservé à l'auteur.

**Auth** : requise

**Réponses**
- `200` — `{ message: "Annonce supprimée avec succès" }`
- `401` — Non authentifié
- `403` — Non autorisé (pas l'auteur)
- `404` — Annonce non trouvée
