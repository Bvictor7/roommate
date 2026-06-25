# Gestion des erreurs — RoomMate

## Middleware centralisé

`backend/src/middleware/errorHandler.js`

Toutes les erreurs non gérées dans les routes remontent automatiquement au middleware `errorHandler` via `next(err)`.

## Flux

```
Route → next(err) → errorHandler → réponse JSON { message }
```

## Cas gérés

| Erreur | Code HTTP | Message |
|---|---|---|
| JWT invalide / expiré | 401 | Token invalide ou expiré |
| Prisma P2002 (duplicate) | 400 | Une ressource avec ces données existe déjà |
| Prisma P2025 (not found) | 404 | Ressource non trouvée |
| Erreur custom (`err.status`) | err.status | err.message |
| Fallback | 500 | Erreur interne du serveur |

## Route 404

```js
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' })
})
```

## Branchement dans index.js

```js
import errorHandler from './middleware/errorHandler.js'

// ... routes ...

app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' })
})

app.use(errorHandler) // doit être en dernier
```
