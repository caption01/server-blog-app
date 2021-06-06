import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from "class-validator";

import { prisma } from "../../context";

@ValidatorConstraint({ name: "customText", async: false })
export class IsEmailExistConstraint implements ValidatorConstraintInterface {
  async validate(email: string, args: ValidationArguments) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return "User already exist.";
  }
}

export function IsEmailExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsEmailExistConstraint,
    });
  };
}
