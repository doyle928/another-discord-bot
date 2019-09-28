const usersResolvers = require("./users");
const countResolvers = require("./count");
const serverResolvers = require("./server");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...countResolvers.Query,
    ...serverResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...countResolvers.Mutation,
    ...serverResolvers.Mutation
  }
};
