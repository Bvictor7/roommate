import { z } from 'zod'

export const createColocationSchema = z.object({
  name: z.string().min(2).max(50),
})

export const joinColocationSchema = z.object({
  inviteCode: z.string().min(1),
})

export const createTaskSchema = z.object({
  title: z.string().min(1).max(200),
  assignedTo: z.string().optional(),
  dueDate: z.string().datetime().optional(),
})

// Seuls ces champs peuvent être modifiés : les clés inconnues sont retirées par Zod
export const updateTaskSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  assignedTo: z.string().nullable().optional(),
  dueDate: z.string().datetime().nullable().optional(),
  status: z.enum(['todo', 'done']).optional(),
})

export const createExpenseSchema = z.object({
  amount: z.coerce.number().positive(),
  category: z.string().min(1),
  description: z.string().optional(),
  paidBy: z.string().min(1),
})

export const createGrocerySchema = z.object({
  name: z.string().min(1).max(100),
})

export const updateGrocerySchema = z.object({
  name: z.string().min(1).max(100).optional(),
  isBought: z.boolean().optional(),
})
