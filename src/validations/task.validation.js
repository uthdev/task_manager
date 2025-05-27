import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['pending', 'in-progress', 'completed']).optional(),
});

export const taskQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.enum(['pending', 'in-progress', 'completed']).optional(),
  taskId: z.coerce.number().int().positive('Task ID must be a positive integer').optional(),
  userId: z.coerce.number().int().positive('User ID must be a positive integer').optional(),
});

export const taskUpdateSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional(),
  status: z.enum(['pending', 'in-progress', 'completed']).optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be updated',
});

export const taskIdSchema = z.object({
  id: z.coerce.number().int().positive('ID must be a positive integer'),
});
