import { z } from 'zod'

export const createColocationSchema = z.object({
  name: z.string().min(2).max(50),
})

export const joinColocationSchema = z.object({
  inviteCode: z.string().min(1),
})
