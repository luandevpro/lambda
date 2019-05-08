const {
   ApolloServer,
   gql
 } = require('apollo-server-express');
const express = require("express");
const serverless = require("serverless-http");
const expressPlayground = require('graphql-playground-middleware-express')
  .default

const app = express();

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return `Hello from Netlify function. https://bit.ly/2UXh0fD`
    }
  }
}

const apollo = new ApolloServer({ 
   typeDefs,
   resolvers,
   tracing: true,
   introspection: true,
})

app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

apollo.applyMiddleware({ app });

// app.listen({ port: 4000 }, () =>
//   console.log(`🚀 Server ready at http://localhost:4000${apollo.graphqlPath}`)
// );

exports.handler = serverless(app);