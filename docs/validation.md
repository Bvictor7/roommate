# Validation — RoomMate

La validation des données entrantes est gérée côté backend via **Zod** et un middleware Express dédié.

## Architecture

```
Requête HTTP → middleware validate(schema) → route handler
                      ↓ si invalide
              400 Bad Request + { errors }
```

## Middleware

`backend/src/middleware/validate.js`

```js
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten().fieldErrors })
  }
  req.body = result.data
  next()
}
```

Les erreurs sont retournées par champ :

```json
{
  "errors": {
    "email": ["Invalid email"],
    "password": ["String must contain at least 6 character(s)"]
  }
}
```

## Schemas

### Auth — `schemas/auth.schema.js`

| Champ | Règle |
|---|---|
| email | format email valide |
| password (register) | min 6 caractères |
| username | 2–30 caractères |

### Listings — `schemas/listing.schema.js`

| Champ | Règle |
|---|---|
| title | 5–100 caractères |
| description | min 20 caractères |
| type | enum : `chambre`, `appartement`, `maison` |
| city | min 2 caractères |
| postalCode | regex 5 chiffres |
| price | nombre positif |
| charges | optionnel |
| availableDate | format ISO 8601 |

## Usage

```js
// Dans les routes
router.post('/', auth, validate(listingSchema), async (req, res) => { ... })
router.post('/register', validate(registerSchema), async (req, res) => { ... })
```