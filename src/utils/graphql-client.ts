import { GraphQLClient, RequestMiddleware } from "graphql-request"

const graphqlClient = new GraphQLClient(
  process.env.HASURA_ENDPOINT || "http://localhost:8080",
  {
    headers: {
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET!,
    },
  },
)

export default graphqlClient
