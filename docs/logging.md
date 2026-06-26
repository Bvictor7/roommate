# Logs — RoomMate

## Stack

- **morgan** : logs des requêtes HTTP
- **console.error** dans `errorHandler.js` : logs des erreurs serveur

## Configuration

`backend/src/index.js`

```js
import morgan from 'morgan'

const format = process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
app.use(morgan(format))
```

- En **développement** : format `dev` (coloré, concis)
- En **production** : format `combined` (Apache-like, complet)

## Exemple de log HTTP (dev)

```
GET /api/listings 200 12.345 ms - 1024
POST /api/auth/login 401 5.123 ms - 42
DELETE /api/listings/clx123 403 3.456 ms - 38
```

## Logs d'erreurs

Dans `errorHandler.js`, chaque erreur non gérée est loggée avec timestamp et stack trace :

```js
console.error(`[${new Date().toISOString()}] ${err.stack || err.message}`)
```

## Démarrage serveur

```
[2026-06-24T12:00:00.000Z] Server running on port 3000
```
