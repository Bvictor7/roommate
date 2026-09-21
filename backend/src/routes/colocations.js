import express from 'express'
import { PrismaClient } from '@prisma/client'
import auth from '../middleware/auth.js'

const router = express.Router()
const prisma = new PrismaClient()

// Créer une colocation
router.post('/', auth, async (req, res, next) => {
  try {
    const { name } = req.body
    if (!name) return res.status(400).json({ message: 'Nom requis' })

    const colocation = await prisma.colocation.create({
      data: {
        name,
        members: {
          create: { userId: req.user.userId, role: 'admin' }
        }
      },
      include: { members: { include: { user: { select: { id: true, username: true, avatar: true } } } } }
    })
    res.status(201).json(colocation)
  } catch (err) { next(err) }
})

// Rejoindre une colocation via code
router.post('/join', auth, async (req, res, next) => {
  try {
    const { inviteCode } = req.body
    const colocation = await prisma.colocation.findUnique({ where: { inviteCode } })
    if (!colocation) return res.status(404).json({ message: 'Code invalide' })

    const existing = await prisma.colocationMember.findFirst({
      where: { userId: req.user.userId, colocationId: colocation.id }
    })
    if (existing) return res.status(400).json({ message: 'Déjà membre' })

    await prisma.colocationMember.create({
      data: { userId: req.user.userId, colocationId: colocation.id }
    })
    res.json(colocation)
  } catch (err) { next(err) }
})

// Récupérer ma colocation
router.get('/me', auth, async (req, res, next) => {
  try {
    const member = await prisma.colocationMember.findFirst({
      where: { userId: req.user.userId },
      include: {
        colocation: {
          include: {
            members: { include: { user: { select: { id: true, username: true, avatar: true } } } },
            tasks: { orderBy: { createdAt: 'desc' } },
            expenses: { orderBy: { createdAt: 'desc' } },
            groceries: { orderBy: { createdAt: 'desc' } }
          }
        }
      }
    })
    if (!member) return res.status(404).json({ message: 'Aucune colocation' })
    res.json(member.colocation)
  } catch (err) { next(err) }
})

// --- TASKS ---
router.post('/:id/tasks', auth, async (req, res, next) => {
  try {
    const { title, assignedTo, dueDate } = req.body
    const task = await prisma.task.create({
      data: { title, assignedTo, dueDate: dueDate ? new Date(dueDate) : null, colocationId: req.params.id }
    })
    res.status(201).json(task)
  } catch (err) { next(err) }
})

router.patch('/tasks/:taskId', auth, async (req, res, next) => {
  try {
    const task = await prisma.task.update({
      where: { id: req.params.taskId },
      data: req.body
    })
    res.json(task)
  } catch (err) { next(err) }
})

router.delete('/tasks/:taskId', auth, async (req, res, next) => {
  try {
    await prisma.task.delete({ where: { id: req.params.taskId } })
    res.json({ message: 'Tâche supprimée' })
  } catch (err) { next(err) }
})

// --- EXPENSES ---
router.post('/:id/expenses', auth, async (req, res, next) => {
  try {
    const { amount, category, description, paidBy } = req.body
    const expense = await prisma.expense.create({
      data: { amount: parseFloat(amount), category, description, paidBy, colocationId: req.params.id }
    })
    res.status(201).json(expense)
  } catch (err) { next(err) }
})

router.delete('/expenses/:expenseId', auth, async (req, res, next) => {
  try {
    await prisma.expense.delete({ where: { id: req.params.expenseId } })
    res.json({ message: 'Dépense supprimée' })
  } catch (err) { next(err) }
})

// --- GROCERIES ---
router.post('/:id/groceries', auth, async (req, res, next) => {
  try {
    const { name } = req.body
    const item = await prisma.groceryItem.create({
      data: { name, addedBy: req.user.userId, colocationId: req.params.id }
    })
    res.status(201).json(item)
  } catch (err) { next(err) }
})

router.patch('/groceries/:itemId', auth, async (req, res, next) => {
  try {
    const item = await prisma.groceryItem.update({
      where: { id: req.params.itemId },
      data: req.body
    })
    res.json(item)
  } catch (err) { next(err) }
})

router.delete('/groceries/:itemId', auth, async (req, res, next) => {
  try {
    await prisma.groceryItem.delete({ where: { id: req.params.itemId } })
    res.json({ message: 'Article supprimé' })
  } catch (err) { next(err) }
})

export default router