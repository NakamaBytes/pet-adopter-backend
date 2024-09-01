import { jwt } from "hono/jwt";
import { catchAsync } from "../utils/catchAsync";
import { getUserById } from "../services/v1/auth.service";
import { isEmpty } from "lodash";
import ApiError from "../utils/ApiError";
import * as HttpStatus from "http-status";
import * as _ from 'lodash';

export const authentication = jwt({ secret: process.env.JWT_SECRET || 'default', });

export const authenticationUserAdmin = catchAsync(async (c, next) => {
  const { id } = c.get("jwtPayload");
  return await next();
});

export const authenticationUser = catchAsync(async (c, next) => {
  const jwtPayload = c.get("jwtPayload");

  console.log(jwtPayload);


  if (!jwtPayload) throw new ApiError(HttpStatus.UNAUTHORIZED, { message: "unauthorize" });

  const { id } = jwtPayload;
  const findUser = await getUserById({ id });

  if (!isEmpty(findUser) && (_.find(findUser?.roles, (item) => item.role.name === "USER" || item.role.name === "ADMINISTRATOR"))) {
    return await next();
  } else {
    throw new ApiError(HttpStatus.UNAUTHORIZED, { message: "unauthorize" });
  }
});

export const authenticationAdministrator = catchAsync(async (c, next) => {
  const jwtPayload = c.get("jwtPayload");

  if (!jwtPayload) throw new ApiError(HttpStatus.UNAUTHORIZED, { message: "unauthorize" });

  const { id } = jwtPayload;
  const findUser = await getUserById({ id });

  if (!isEmpty(findUser) && (_.find(findUser?.roles, (item) => item.role.name === "ADMINISTRATOR"))) {
    return await next();
  } else {
    throw new ApiError(HttpStatus.UNAUTHORIZED, { message: "unauthorize" });
  }
});
