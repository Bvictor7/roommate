# Conception — RoomMate

## Acteurs du système

| Acteur | Description | Droits |
|--------|-------------|--------|
| Visiteur | Non connecté | Consulter annonces, s'inscrire |
| Utilisateur connecté | Authentifié via JWT | Publier annonces, rejoindre une colocation |
| Membre de colocation | A rejoint un groupe | Tâches, courses, dépenses, messagerie |
| Admin de colocation | Créateur ou promu admin | Gérer membres, inviter, configurer |

---

## Flux principal

```
Visiteur
  │
  ├─ Consulte les annonces (sans connexion)
  │
  ├─ S'inscrit / Se connecte
  │
  └─ Utilisateur connecté
       │
       ├─ Publie une annonce
       │
       └─ Rejoint / Crée une colocation
              │
              └─ Espace colocation (tâches, courses, dépenses)
```

---

## Flux alternatifs

### Inscription
| Cas | Réponse |
|-----|---------|
| Email déjà utilisé | 400 |
| Données invalides | 400 |
| Nominal | 201 + token |

### Connexion
| Cas | Réponse |
|-----|---------|
| Utilisateur inconnu | 401 |
| Mot de passe incorrect | 401 |
| Token expiré | 401 |
| Nominal | 200 + token |

### Publication annonce
| Cas | Réponse |
|-----|---------|
| Non authentifié | 401 |
| Données invalides | 400 |
| Non autorisé (pas l'auteur) | 403 |
| Annonce introuvable | 404 |
| Nominal | 201 |

---

## Cas d'utilisation principaux

- Visiteur : consulter annonces, filtrer, s'inscrire
- Utilisateur connecté : publier / modifier / supprimer annonce, gérer profil, rejoindre colocation
- Membre : accéder à l'espace collaboratif
- Admin : gérer membres, inviter, configurer la colocation

---

## Diagrammes

Les diagrammes UML (cas d'utilisation, classes, séquence) et les diagrammes de flux sont disponibles dans le cahier des charges Notion.
