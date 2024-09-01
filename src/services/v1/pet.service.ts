import { prisma } from '@bin/database';
import { has } from 'lodash';
import type { PetPayload, PetTypes } from 'types/pet';


export const find = ({ id, name }: PetTypes) => {
  return prisma.pet.findFirst({
    where: {
      OR: [
        { id: id },
        { name: name },
      ],
    },
  });
};

export const get = () => {
  return prisma.pet.findMany({
    where: {
      users: {
        every: {
          status: "AVAILABLE"
        }
      }
    },
    include: {
      species: true,
      pets: true,
      users: {
        select: {
          users: {
            select: {
              firstName: true,
              lastName: true,
            }
          }
        }
      },
    }
  });
};

export const create = ({ data, userId }: { data: PetPayload; userId: string; }) => {
  return prisma.pet.create({
    data: {
      age: data.age,
      color: data.color,
      description: data.description,
      name: data.name,
      pet_image: has(data, "pet_image") ? data?.pet_image as string : '',
      gender: data.gender,
      speciesId: data.speciesId,
      users: {
        create: {
          status: "NOT_AVAILABLE",
          userId: userId,
          isCurrentUser: true
        }
      }
    }
  });
};

export const update = ({ data, userId, petId }: { data: PetTypes; userId: string; petId: string; }) => {
  return prisma.pet.update({
    where: {
      id: petId,
      users: {
        every: {
          userId: userId,
          isCurrentUser: true,
        }
      }
    },
    data: {
      age: data.age,
      color: data.color,
      description: data.description,
      name: data.name,
      pet_image: data.pet_image || "",
      gender: data.gender,
      speciesId: data.speciesId,

    }
  });
};

export const remove = ({ userId, petId }: { userId: string; petId: string; }) => {
  return prisma.pet.delete({
    where: {
      id: petId,
      users: {
        every: {
          userId: userId,
          isCurrentUser: true
        }
      }
    },
  });
};