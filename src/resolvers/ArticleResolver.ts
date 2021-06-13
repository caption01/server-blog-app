import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  Int,
  InputType,
  Field,
} from "type-graphql";

import { Article, ArticleInput } from "../model/article/Article";
import { Context } from "../context";

@Resolver(Article)
export class ArticleResolver {
  @Query((returns) => Article)
  async getArticleById(@Arg("id") id: number, @Ctx() ctx: Context) {
    return await ctx.prisma.article.findUnique({
      where: { id },
    });
  }

  @Query((returns) => [Article])
  async getAllArticles(@Ctx() ctx: Context) {
    return await ctx.prisma.article.findMany();
  }

  @Mutation((returns) => Article)
  async createArticle(@Arg("data") data: ArticleInput, @Ctx() ctx: Context) {
    return await ctx.prisma.article.create({
      data: {
        title: data.title,
        image: data.image,
        description: data.description,
        link: data.link,
      },
    });
  }

  @Mutation((returns) => Article, { nullable: true })
  async deleteArticle(
    @Arg("id", (type) => Int) id: number,
    @Ctx() ctx: Context
  ) {
    return await ctx.prisma.article.delete({
      where: {
        id,
      },
    });
  }
}
