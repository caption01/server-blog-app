import "reflect-metadata";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { IsEmail } from "class-validator";

@ObjectType()
export class User {
  @Field((type) => ID)
  id: number;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;

  @Field((type) => String, { nullable: true })
  name?: string | null;
}

@InputType()
export class UserInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  password: string;
}
