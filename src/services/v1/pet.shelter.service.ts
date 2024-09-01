import { prisma } from '@bin/database';
import { PetShelterPayload } from 'types/pet.shelter';

export const find = ({ petId, shelterId }: { petId: string; shelterId: string; }) => {
  return prisma.petShelter.findFirst({
    where: {
      petId: petId,
      shelterId: shelterId!,
    }
  });
};

export const create = ({ data, shelterId }: { data: PetShelterPayload; shelterId: string; }) => {
  return prisma.petShelter.create({
    data: {
      petId: data.petId!,
      shelterId: shelterId!,
    }
  });
};

export const update = ({ data, shelterId, id }: { data: PetShelterPayload; shelterId: string; id: string; }) => {
  return prisma.petShelter.update({
    where: {
      id,
      shelterId,
    },
    data: {
      ...data
    }
  });
};

export const remove = ({ id }: { id: string; }) => {
  return prisma.pet.delete({
    where: {
      id: id,
    },
  });
};