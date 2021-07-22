import { MiddlewareFn } from "type-graphql";

import { User } from "../../model/user/User";
import { Context } from "../../context";
import { jwt } from "../../utility";

const getTokenFromHeader = (header: string): string => {
  const values = header.split(/\s+/);
  const [_, token] = values;
  return token;
};

export const CheckAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  const header = context?.req.headers?.authorization;

  if (!header) {
    throw new Error("authentication fail");
  }

  const token = getTokenFromHeader(header);
  const validate = jwt.checkValidationJWT(token);

  if (!validate) {
    throw new Error("authentication fail");
  }

  return await next();
};
