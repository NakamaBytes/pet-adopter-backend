import { catchAsync } from "@utils/catchAsync";
import { create as createPetShelter, update as updatePetShelter, remove as removePetShelter, find as findPetShelter } from "@services/v1/pet.shelter.service";
import { petShelterValidatorType } from "@validator/v1/pet.shelter.validator";
import { isEmpty } from "lodash";
import httpStatus from "http-status";
import ApiError from "@utils/ApiError";

export const create = catchAsync(async (c) => {
  const shelterId = c.req.param("shelterId");
  const petId = c.req.param("petId");
  const body = await c.req.parseBody() as unknown as petShelterValidatorType;

  const result = await createPetShelter({ data: { ...body, petId }, shelterId: shelterId });

  return c.json({ data: result });
});

export const update = catchAsync(async (c) => {
  const shelterId = c.req.param("shelterId");
  const petId = c.req.param("petId");

  const body = await c.req.parseBody() as unknown as petShelterValidatorType;

  const petShelter = await findPetShelter({ petId, shelterId });

  if (isEmpty(petShelter)) {
    throw new ApiError(httpStatus.NOT_FOUND, { message: "Pet shelter not found" });
  }

  const result = await updatePetShelter({ data: { petId: body.petId!, status: body.status }, id: petShelter.id, shelterId });

  return c.json({ data: result });
});

export const remove = catchAsync(async (c) => {
  const shelterId = c.req.param("shelterId");
  const petId = c.req.param("petId");

  const petShelter = await findPetShelter({ petId: petId, shelterId });

  if (isEmpty(petShelter)) {
    throw new ApiError(httpStatus.NOT_FOUND, { message: "Pet shelter not found" });
  }

  const result = await removePetShelter({ id: petShelter.id });

  return c.json({ data: result });
});