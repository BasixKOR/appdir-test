import { GraphQLClient } from "graphql-request";
import { getSdk } from "../generated/graphql";

export const sdk = getSdk(
  new GraphQLClient("https://graphql.anilist.co/", {
    fetch,
    cache: "force-cache",
  })
);
