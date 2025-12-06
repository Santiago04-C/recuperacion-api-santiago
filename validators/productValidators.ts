// Validadores Zod para productos
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  price: z.number().positive('El precio debe ser positivo'),
  stock: z.number().int().nonnegative('El stock debe ser un número entero no negativo').default(0),
});

export const updateProductSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').optional(),
  description: z.string().optional(),
  price: z.number().positive('El precio debe ser positivo').optional(),
  stock: z.number().int().nonnegative('El stock debe ser un número entero no negativo').optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
