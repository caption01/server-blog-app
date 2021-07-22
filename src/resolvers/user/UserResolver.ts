import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  Int,
  FieldResolver,
  Root,
  UseMiddleware,
} from "type-graphql";

import { User, UserSignupInput, UserSigninInput } from "../../model/user/User";
import { Context } from "../../context";
import { bcrypt, jwt } from "../../utility";
import { CheckAuth } from "./checkAuth";

const dataUserToToken = (user: User): User => ({
  id: user.id,
  email: user.email,
});

@Resolver(User)
export class UserResolver {
  @Mutation((returns) => User)
  async signupUser(
    @Arg("data") data: UserSignupInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    const hashPassword = bcrypt.generateHash(data.password);

    const newUser = await ctx.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashPassword,
      },
    });

    const tokenData = dataUserToToken(newUser);
    const token = jwt.generateJWT(tokenData);

    ctx.res.status(201);
    ctx.res.setHeader("Authorization", `Bearer ${token}`);

    return newUser;
  }

  @Mutation((returns) => User, { nullable: true })
  async signinUser(
    @Arg("data") data: UserSigninInput,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const existingUser = await ctx.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!existingUser) {
      return {
        msg: "error",
      };
    }

    const isValid = bcrypt.compareHash(data.password, existingUser.password);

    if (!isValid) {
      return {
        msg: "error",
      };
    }

    const tokenData = dataUserToToken(existingUser);
    const token = jwt.generateJWT(tokenData);

    ctx.res.setHeader("Authorization", `Bearer ${token}`);

    return {
      msg: "success",
      ...existingUser,
    };
  }

  @Query(() => [User])
  async getAllUsers(@Ctx() ctx: Context) {
    return await ctx.prisma.user.findMany();
  }

  @Query(() => [User])
  @UseMiddleware(CheckAuth)
  async me(@Ctx() ctx: Context): Promise<User | []> {
    console.log("pass");
    return [];
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

  @FieldResolver()
  async welcomeMsg(@Root() parent: User): Promise<string> {
    return `welcome ${parent.name}`;
  }
}
