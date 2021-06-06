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

import { User, UserInput } from "../model/user/User";
import { Context } from "../context";

@Resolver(User)
export class UserResolver {
  @Mutation((returns) => User)
  async signupUser(
    @Arg("data") data: UserInput,
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

  @Mutation((returns) => User, { nullable: true })
  async signinUser(
    @Arg("data") data: UserInput,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const existingUser = await ctx.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!existingUser || existingUser.password !== data.password) return null;

    console.log(ctx);

    ctx.res.setHeader("Authorization", "Bearer adasdsadsadasd");
    ctx.res.setHeader("bapp-v", "v1.0.0");

    return existingUser;
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
