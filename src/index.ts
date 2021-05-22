import "reflect-metadata";
import * as tq from "type-graphql";
import { ApolloServer } from "apollo-server";
import { DateTimeResolver } from "graphql-scalars";
import { GraphQLScalarType } from "graphql";

import {
  ProjectCreateInput,
  ProjectResolver,
  ArticleCreateInput,
  ArticleResolver,
  UserCreateInput,
  UserResolver,
} from "./resolvers";
import { SortOrder } from "./types";
import { context } from "./context";

const app = async () => {
  tq.registerEnumType(SortOrder, {
    name: "SortOrder",
  });

  const schema = await tq.buildSchema({
    resolvers: [
      ProjectCreateInput,
      ProjectResolver,
      ArticleCreateInput,
      ArticleResolver,
      UserCreateInput,
      UserResolver,
    ],
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
  });

  new ApolloServer({ schema, context }).listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at: http://localhost:4000 ⭐️`)
  );
};

app();
