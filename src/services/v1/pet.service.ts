import { prisma } from '@bin/database';
import type { PetTypes } from 'types/pet';


export const find = ({ id, name }: PetTypes) => {
  return prisma.pet.findFirst({
    where: {
      OR: [
        { id: id },
        { name: name }
      ],
    },
  });
};