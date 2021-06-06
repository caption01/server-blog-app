import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  FieldResolver,
  Root,
  Int,
  InputType,
  Field,
} from "type-graphql";

import { Project, ProjectInput } from "../model/project/Project";
import { Context } from "../context";

@Resolver(Project)
export class ProjectResolver {
  @Query((returns) => Project)
  async projectById(@Arg("id") id: number, @Ctx() ctx: Context) {
    return await ctx.prisma.project.findUnique({
      where: { id },
    });
  }

  @Query((returns) => [Project])
  async getAllProjects(@Ctx() ctx: Context) {
    return await ctx.prisma.project.findMany();
  }

  @Mutation((returns) => Project)
  async createProject(@Arg("data") data: ProjectInput, @Ctx() ctx: Context) {
    return ctx.prisma.project.create({
      data: {
        title: data.title,
        image: data.image,
        description: data.description,
        link: data.link,
        tools: data.tools,
      },
    });
  }

  @Mutation((returns) => Project, { nullable: true })
  async deletePost(@Arg("id", (type) => Int) id: number, @Ctx() ctx: Context) {
    return ctx.prisma.project.delete({
      where: {
        id,
      },
    });
  }
}
