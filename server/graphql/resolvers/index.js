const usersResolvers = require("./users");
const countResolvers = require("./count");
const serverResolvers = require("./server");
const defaultResolvers = require("./default");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...countResolvers.Query,
    ...serverResolvers.Query,
    ...defaultResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...countResolvers.Mutation,
    ...serverResolvers.Mutation,
    ...defaultResolvers.Mutation
  }
};
