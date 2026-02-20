import { z } from 'zod';

export const createPatientSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  notes: z.string().optional()
});
