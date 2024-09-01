import { catchAsync } from "@utils/catchAsync";
import { get as getPets, find as findPet, create as createPet, update as updatePet, remove as removePet } from "@services/v1/pet.service";
import { petCreateValidatorType } from "@validator/v1/pet.validator";

export const get = catchAsync(async (c) => {

  console.log("pet");

  const result = await getPets();

  return c.json({ data: result });
});

export const find = catchAsync(async (c) => {

  const petId = c.req.param("petId");
  const result = await findPet({ id: petId });

  return c.json({ data: result });
});

export const create = catchAsync(async (c) => {

  const { id } = c.get("jwtPayload");
  const body = await c.req.parseBody() as unknown as petCreateValidatorType;

  const result = await createPet({ data: { ...body, age: Number(body.age) }, userId: id });

  return c.json({ data: result });
});

export const update = catchAsync(async (c) => {
  const { id } = c.get("jwtPayload");
  const petId = c.req.param("petId");

  const body = await c.req.parseBody() as unknown as petCreateValidatorType;

  const result = await updatePet({ data: { ...body, age: Number(body.age) }, userId: id, petId });

  return c.json({ data: result });
});

export const remove = catchAsync(async (c) => {
  const { id } = c.get("jwtPayload");
  const petId = c.req.param("petId");

  const result = await removePet({ userId: id, petId });

  return c.json({ data: result });
});