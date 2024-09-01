import { Shelter } from "@prisma/client";

export type ShelterTypes = Partial<Shelter>;
export type ShelterPayload = Pick<Shelter, "name">;;
