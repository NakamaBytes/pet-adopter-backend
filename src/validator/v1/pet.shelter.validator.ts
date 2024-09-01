import { ApprovalStatus } from '@prisma/client';
import { z } from 'zod';

const ApprovalStatusSchema = z.enum([ApprovalStatus.APPROVED, ApprovalStatus.PENDING, ApprovalStatus.REJECTED]);

export const petShelterCreateValidator = z.object({
  petId: z.string().uuid().min(1).optional(),
  status: ApprovalStatusSchema,
});

export type petShelterValidatorType = z.infer<typeof petShelterCreateValidator>;