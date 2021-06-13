import "reflect-metadata";
import { ObjectType, Field, ID, InputType, Root } from "type-graphql";
import { IsEmail, Length } from "class-validator";

import { IsEmailExist } from "./isEmailExist";

@ObjectType()
export class User {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  email?: string;

  password?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field({ nullable: true })
  welcomeMsg?: string;

  @Field({ nullable: true })
  msg?: string;
}

@InputType()
export class UserSignupInput {
  @Field()
  @IsEmail()
  @IsEmailExist()
  email: string;

  @Field({ nullable: true })
  @Length(1, 255)
  name: string;

  @Field()
  password: string;
}

@InputType()
export class UserSigninInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
