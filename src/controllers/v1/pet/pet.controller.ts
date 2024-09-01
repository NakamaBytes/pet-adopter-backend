import { catchAsync } from "@utils/catchAsync";
import { get as getPets, find as findPet, create as createPet, update as updatePet, remove as removePet } from "@services/v1/pet.service";
import { petCreateValidatorType } from "@validator/v1/pet.validator";
import { map } from "lodash";

export const get = catchAsync(async (c) => {

  const result = await getPets();
  const adoptions = map(result, ({ adoptions, shelter, ...item }) => ({ ...item, adoptions: { ...adoptions?.[0]?.user, isCurrentUser: adoptions?.[0]?.isCurrentUser, createdAt: adoptions?.[0]?.createdAt, updatedAt: adoptions?.[0]?.updatedAt }, shelter: { ...shelter?.[0]?.shelter, isCurrentShelter: shelter?.[0]?.isCurrentShelter, createdAt: shelter?.[0]?.createdAt, updatedAt: shelter?.[0]?.updatedAt } }));


  return c.json({ data: adoptions });
});

export const find = catchAsync(async (c) => {

  const petId = c.req.param("petId");
  const result = await findPet({ id: petId });
  const adoptions = map(result?.adoptions, ({ user, status, isCurrentUser, createdAt, updatedAt }) => ({ ...user, adoptionStatus: status, isCurrentUser, createdAt, updatedAt }));
  const shelter = map(result?.shelter, ({ shelter, status, isCurrentShelter, createdAt, updatedAt }) => ({ ...shelter, status: status, isCurrentShelter, createdAt, updatedAt }));


  return c.json({ data: { ...result, adoptions, shelter } });
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