import prisma from '../lib/prisma.js'

// Vérifie que l'utilisateur authentifié est membre de la colocation visée.
// Sans option : la colocation est lue dans req.params.colocationId.
// Avec { model, param } : la colocation est celle de l'élément req.params[param] (tâche, dépense, article).
// En cas de succès, l'id de la colocation est exposé dans req.colocationId.
const requireColocationMember = ({ model, param } = {}) => async (req, res, next) => {
  try {
    let colocationId = req.params.colocationId

    if (model) {
      const resource = await prisma[model].findUnique({
        where: { id: req.params[param] },
        select: { colocationId: true }
      })
      if (!resource) return res.status(404).json({ message: 'Ressource non trouvée' })
      colocationId = resource.colocationId
    }

    const member = await prisma.colocationMember.findFirst({
      where: { userId: req.user.userId, colocationId },
      select: { id: true }
    })
    if (!member) return res.status(403).json({ message: "Accès refusé : vous n'êtes pas membre de cette colocation" })

    req.colocationId = colocationId
    next()
  } catch (err) { next(err) }
}

export default requireColocationMember
