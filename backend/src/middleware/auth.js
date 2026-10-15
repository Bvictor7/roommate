import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Non autorisé' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide ou expiré' })
  }
}

export default auth
export const requireAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Non autorisé' })
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Accès réservé aux administrateurs' })
  }
  next()
}
