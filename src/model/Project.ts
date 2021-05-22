import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Project {
  @Field((type) => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  image: string;

  @Field((type) => [String])
  description: string[] | [];

  @Field((type) => String, { nullable: true })
  link: string | null;

  @Field((type) => [String])
  tools: string[] | [];

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}
