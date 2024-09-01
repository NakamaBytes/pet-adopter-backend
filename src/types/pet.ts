import { Pet } from "@prisma/client";

export type PetTypes = Partial<Pet>;
export type PetPayload = Pick<Pet, "age" | "color" | "description" | "gender" | "name" | "speciesId">;;
