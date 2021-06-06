import "reflect-metadata";
import express from "express";
import { json } from "body-parser";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema, registerEnumType } from "type-graphql";
import { DateTimeResolver } from "graphql-scalars";
import { GraphQLScalarType } from "graphql";

import { ProjectResolver, ArticleResolver, UserResolver } from "./resolvers";
import { SortOrder } from "./types";
import { context } from "./context";

const startApolloServer = async () => {
  const app = express();

  app.use(cors());
  app.use(json());

  registerEnumType(SortOrder, {
    name: "SortOrder",
  });

  const schema = await buildSchema({
    resolvers: [ProjectResolver, ArticleResolver, UserResolver],
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: (args) => context(args),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(
      "🚀 Graphql Server is now running on http://localhost:4000/graphql"
    );
  });
};

const main = () => {
  startApolloServer();
};

main();
