const usersResolvers = require("./users");
const countResolvers = require("./count");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...countResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...countResolvers.Mutation
  }
};
