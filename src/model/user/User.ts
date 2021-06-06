import "reflect-metadata";
import { ObjectType, Field, ID, InputType, Root } from "type-graphql";
import { IsEmail, Length } from "class-validator";

import { IsEmailExist } from "./isEmailExist";

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => String || null)
  name?: string | null;

  @Field()
  welcomeMsg?: string;
}

@InputType()
export class UserInput {
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
