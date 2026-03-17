import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(2, 'Nombre muy corto').max(50, 'Nombre muy largo'),
  slug: z.string().min(2).max(50).regex(/^[a-z0-9-]+$/, 'Slug inválido')
});