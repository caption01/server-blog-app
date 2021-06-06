import "reflect-metadata";
import { buildSchema, registerEnumType } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { DateTimeResolver } from "graphql-scalars";
import { GraphQLScalarType } from "graphql";

import { ProjectResolver, ArticleResolver, UserResolver } from "./resolvers";
import { SortOrder } from "./types";
import { context } from "./context";

const app = async () => {
  registerEnumType(SortOrder, {
    name: "SortOrder",
  });

  const schema = await buildSchema({
    resolvers: [ProjectResolver, ArticleResolver, UserResolver],
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
  });

  new ApolloServer({
    schema,
    context: (args) => context(args),
  }).listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at: http://localhost:4000 ⭐️`)
  );
};

app();
