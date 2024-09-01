import { z } from 'zod';

export const shelterCreateValidator = z.object({
  name: z.string(),
  description: z.string().optional(),
  address: z.string().optional(),
  lon: z.string().optional(),
  lat: z.string().optional(),
});

export type shelterCreateValidatorType = z.infer<typeof shelterCreateValidator>;