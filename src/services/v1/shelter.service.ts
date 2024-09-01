import { prisma } from '@bin/database';
import { ShelterPayload, ShelterTypes } from 'types/shelter';


export const find = ({ id, name }: ShelterTypes) => {
  return prisma.shelter.findFirst({
    where: {
      OR: [
        { id: id },
        { name: name },
      ],
    },
  });
};

export const get = () => {
  return prisma.shelter.findMany({
    include: {
      PetShelter: {
        select: {
          Pets: true
        }
      }
    }
  });
};

export const create = ({ data, userId }: { data: ShelterPayload; userId: string; }) => {
  return prisma.shelter.create({
    data: {
      ...data,
      UserShelter: {
        create: {
          userId,
          role: "OWNER"
        }
      }
    }
  });
};

export const update = ({ data, userId, shelterId }: { data: ShelterPayload; userId: string; shelterId: string; }) => {
  return prisma.shelter.update({
    where: {
      id: shelterId,
      UserShelter: {
        every: {
          userId: userId,
          role: "OWNER",
        }
      }
    },
    data: {
      ...data,
    }
  });
};

export const remove = ({ userId, shelterId }: { userId: string; shelterId: string; }) => {
  return prisma.shelter.delete({
    where: {
      id: shelterId,
      UserShelter: {
        every: {
          userId: userId,
          role: "OWNER"
        }
      }
    },
  });
};