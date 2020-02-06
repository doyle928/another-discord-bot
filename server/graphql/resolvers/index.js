const usersResolvers = require("./users");
const countResolvers = require("./count");
const serverResolvers = require("./server");
const defaultResolvers = require("./default");
const messageResolvers = require("./message");
const shipResolvers = require("./ship");
const schedulesResolvers = require("./schedules");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...countResolvers.Query,
    ...serverResolvers.Query,
    ...defaultResolvers.Query,
    ...messageResolvers.Query,
    ...shipResolvers.Query,
    ...schedulesResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...countResolvers.Mutation,
    ...serverResolvers.Mutation,
    ...defaultResolvers.Mutation,
    ...messageResolvers.Mutation,
    ...shipResolvers.Mutation,
    ...schedulesResolvers.Mutation
  }
};
