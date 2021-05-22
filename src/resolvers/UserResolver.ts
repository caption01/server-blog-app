import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  InputType,
  Field,
  Int,
} from "type-graphql";

import { User } from "../model/User";
import { Context } from "../context";
@InputType()
export class UserCreateInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  password: string;
}

@Resolver(User)
export class UserResolver {
  @Mutation((returns) => User)
  async signupUser(
    @Arg("data") data: UserCreateInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    return await ctx.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
      },
    });
  }

  @Query(() => [User])
  async getAllUsers(@Ctx() ctx: Context) {
    return await ctx.prisma.user.findMany();
  }

  @Mutation((returns) => User)
  async deleteUser(
    @Arg("id", (type) => Int) id: number,
    @Ctx() ctx: Context
  ): Promise<User> {
    return await ctx.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
