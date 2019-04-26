const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./__generated__/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Project = require('./resolvers/Project');
const Favorite = require('./resolvers/Favorite');
const Subscription = require('./resolvers/Subscription');

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Favorite,
  Project
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    prisma
  })
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
