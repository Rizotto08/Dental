import { z } from 'zod';

export const registerClinicSchema = z.object({
  clinicName: z.string().min(2),
  clinicEmail: z.string().email(),
  adminFirstName: z.string().min(2),
  adminLastName: z.string().min(2),
  adminEmail: z.string().email(),
  password: z.string().min(8)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});
