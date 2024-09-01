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
    include: {
      species: true,
      shelter: {
        include: {
          shelter: {
            select: {
              name: true,
              description: true,
              lat: true,
              lon: true
            }
          }
        }
      },
      adoptions: {
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true
            }
          }
        }
      }
    }
  });
};

export const get = () => {
  return prisma.pet.findMany({
    where: {
      OR: [
        {
          adoptions: {
            every: {
              status: "AVAILABLE",
              isCurrentUser: true
            },
          },
          shelter: {
            none: {}
          },
        },
        {
          shelter: {
            every: {
              status: "APPROVED",
              isCurrentShelter: true
            },
          },
          adoptions: {
            every: {
              status: "AVAILABLE",
              isCurrentUser: true
            },
          },
        }
      ],
    },
    include: {
      species: true,
      shelter: {
        include: {
          shelter: {
            select: {
              name: true,
              description: true,
              lat: true,
              lon: true
            }
          }
        }
      },
      adoptions: {
        include: {
          user: {
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
      adoptions: {
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
      adoptions: {
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
      adoptions: {
        every: {
          userId: userId,
          isCurrentUser: true
        }
      }
    },
  });
};