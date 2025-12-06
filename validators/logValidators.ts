// Validadores Zod para logs
import { z } from 'zod';

export const createLogSchema = z.object({
  action: z.string().min(1, 'La acción es requerida'),
  userId: z.string().optional(),
  details: z.string().optional(),
  ipAddress: z.string().optional(),
});

export type CreateLogInput = z.infer<typeof createLogSchema>;
