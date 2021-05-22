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

import { Project } from "../model/Project";
import { Context } from "../context";

@InputType()
export class ProjectCreateInput {
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
}

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
  async createProject(
    @Arg("data") data: ProjectCreateInput,
    @Ctx() ctx: Context
  ) {
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
