import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(3, 'Nombre muy corto').max(100),
  description: z.string().min(10, 'Descripción muy corta').max(500),
  price: z.number().positive('Precio debe ser positivo'),
  stock: z.number().int().min(0, 'Stock no puede ser negativo'),
  category: z.string().min(2, 'Categoría muy corta'),
  image: z.string().url('URL inválida').optional().or(z.literal('')),
});