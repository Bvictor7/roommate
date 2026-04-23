import { z } from 'zod'

export const listingSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20),
  type: z.enum(['chambre', 'appartement', 'maison']),
  city: z.string().min(2),
  postalCode: z.string().regex(/^[0-9]{5}$/),
  price: z.number().positive(),
  charges: z.number().optional(),
  availableDate: z.string().datetime(),
})