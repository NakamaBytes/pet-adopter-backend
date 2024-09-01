import { Gender } from '@prisma/client';
import { isValidNumber } from '@utils/IsValidNumber';
import { z } from 'zod';

const GenderSchema = z.enum([Gender.Male, Gender.Female]);

export const petCreateValidator = z.object({
  speciesId: z.string().uuid().min(1),
  name: z.string().min(1),
  gender: GenderSchema,
  age: isValidNumber,
  color: z.string().min(1),
  description: z.string().min(1),
});

export type petCreateValidatorType = z.infer<typeof petCreateValidator>;