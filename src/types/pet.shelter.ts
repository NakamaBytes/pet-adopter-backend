import { PetShelter } from "@prisma/client";

export type PetShelterTypes = Partial<PetShelter>;
export type PetShelterPayload = Pick<PetShelter, "petId" | "status">;;