import { z } from 'zod';

export const makeAdminSchema = z.object({
  email: z.string().email('Email inválido')
});