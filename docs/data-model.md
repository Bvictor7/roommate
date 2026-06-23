# Modèle de données — RoomMate

Base de données : PostgreSQL  
ORM : Prisma

---

## Entités

### User

| Champ | Type | Description |
|-------|------|-------------|
| id | UUID | Identifiant unique |
| email | String (unique) | Adresse email |
| password | String | Hash bcrypt |
| username | String | Nom d'affichage |
| avatar | String? | URL photo de profil |
| bio | String? | Biographie courte |
| tags | String[] | Tags de personnalité |
| createdAt | DateTime | Date de création |

---

### Listing

| Champ | Type | Description |
|-------|------|-------------|
| id | UUID | Identifiant unique |
| userId | UUID (FK) | Auteur de l'annonce |
| title | String | Titre de l'annonce |
| description | String | Description longue |
| type | String | chambre / appartement / maison |
| city | String | Ville |
| postalCode | String | Code postal |
| price | Float | Loyer mensuel |
| charges | Float? | Charges (optionnel) |
| availableDate | DateTime | Date de disponibilité |
| photos | String[] | URLs des photos |
| status | String | active / inactive / closed |
| createdAt | DateTime | Date de création |

---

### Colocation

| Champ | Type | Description |
|-------|------|-------------|
| id | UUID | Identifiant unique |
| name | String | Nom du groupe |
| inviteCode | UUID (unique) | Code d'invitation |
| createdAt | DateTime | Date de création |

---

### ColocationMember

| Champ | Type | Description |
|-------|------|-------------|
| id | UUID | Identifiant unique |
| userId | UUID (FK) | Référence User |
| colocationId | UUID (FK) | Référence Colocation |
| role | String | admin / member |

---

### Task

| Champ | Type | Description |
|-------|------|-------------|
| id | UUID | Identifiant unique |
| colocationId | UUID (FK) | Référence Colocation |
| title | String | Titre de la tâche |
| assignedTo | String? | userId assigné |
| dueDate | DateTime? | Date limite |
| status | String | todo / done |
| createdAt | DateTime | Date de création |

---

### Expense

| Champ | Type | Description |
|-------|------|-------------|
| id | UUID | Identifiant unique |
| colocationId | UUID (FK) | Référence Colocation |
| amount | Float | Montant |
| category | String | Catégorie |
| description | String? | Description |
| paidBy | String | userId du payeur |
| createdAt | DateTime | Date de création |

---

### GroceryItem

| Champ | Type | Description |
|-------|------|-------------|
| id | UUID | Identifiant unique |
| colocationId | UUID (FK) | Référence Colocation |
| name | String | Nom de l'article |
| isBought | Boolean | Coché / non coché |
| addedBy | String | userId de l'ajouteur |
| createdAt | DateTime | Date de création |

---

## Relations

```
User          1 ──── * Listing
User          * ──── * Colocation  (via ColocationMember)
Colocation    1 ──── * ColocationMember
Colocation    1 ──── * Task
Colocation    1 ──── * Expense
Colocation    1 ──── * GroceryItem
```
