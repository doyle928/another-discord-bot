const usersResolvers = require("./users");
const countResolvers = require("./count");
const serverResolvers = require("./server");
const defaultResolvers = require("./default");
const messageResolvers = require("./message");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...countResolvers.Query,
    ...serverResolvers.Query,
    ...defaultResolvers.Query,
    ...messageResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...countResolvers.Mutation,
    ...serverResolvers.Mutation,
    ...defaultResolvers.Mutation,
    ...messageResolvers.Mutation
  }
};
