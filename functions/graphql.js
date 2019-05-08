const {
   ApolloServer,
   gql
 } = require('apollo-server-express');
const express = require("express");
const serverless = require("serverless-http");
const expressPlayground = require('graphql-playground-middleware-express')
  .default

const app = express();
const router = express.Router();

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
  resolvers
})
router.get("/playground", expressPlayground({ endpoint: "/graphql" }));

apollo.applyMiddleware({ app });

app.use('/.netlify/functions/graphql', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);