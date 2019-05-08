const {
   ApolloServer,
   gql
 } = require('apollo-server-express');
const express = require("express");
const serverless = require("serverless-http");

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

app.use('/.netlify/functions/graphql', router);  // path must route to lambda

apollo.applyMiddleware({ app , path: '/.netlify/functions/graphql' });

module.exports.handler = serverless(app);