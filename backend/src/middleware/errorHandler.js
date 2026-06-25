const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ${err.stack || err.message}`)

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token invalide ou expiré' })
  }

  if (err.code === 'P2002') {
    return res.status(400).json({ message: 'Une ressource avec ces données existe déjà' })
  }

  if (err.code === 'P2025') {
    return res.status(404).json({ message: 'Ressource non trouvée' })
  }

  const status = err.status || err.statusCode || 500
  const message = err.message || 'Erreur interne du serveur'

  res.status(status).json({ message })
}

export default errorHandler
