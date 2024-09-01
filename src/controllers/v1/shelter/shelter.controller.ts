import { catchAsync } from "@utils/catchAsync";
import { get as getShelters, find as findShelter, create as createShelter, update as updateShelter, remove as removeShelter } from "@services/v1/shelter.service";
import { shelterCreateValidatorType } from "@validator/v1/shelter.validator";
import { map } from "lodash";

export const get = catchAsync(async (c) => {

  const result = await getShelters();

  return c.json({ data: result });
});

export const find = catchAsync(async (c) => {

  const shelterId = c.req.param("shelterId");
  const shelters = await findShelter({ id: shelterId });
  const pets = map(shelters?.pets, ({ pets: pet, status }) => ({ ...pet, status }));

  return c.json({ data: { ...shelters, pets } });
});

export const create = catchAsync(async (c) => {

  const { id } = c.get("jwtPayload");
  const body = await c.req.parseBody() as unknown as shelterCreateValidatorType;

  const result = await createShelter({ data: { ...body }, userId: id });

  return c.json({ data: result });
});

export const update = catchAsync(async (c) => {
  const { id } = c.get("jwtPayload");
  const shelterId = c.req.param("shelterId");

  const body = await c.req.parseBody() as unknown as shelterCreateValidatorType;

  const result = await updateShelter({ data: { ...body }, userId: id, shelterId });

  return c.json({ data: result });
});

export const remove = catchAsync(async (c) => {
  const { id } = c.get("jwtPayload");
  const shelterId = c.req.param("shelterId");

  const result = await removeShelter({ userId: id, shelterId });

  return c.json({ data: result });
});