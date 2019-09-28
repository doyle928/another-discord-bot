const Server = require("../models/server");

module.exports = {
  Query: {
    getServers: async () => {
      try {
        const servers = await Server.find();
        return servers;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    addServer: async (_, { guild_id }) => {
      const newServer = new Server({
        guild_id
      });

      //  Create the new server
      const res = await newServer.save();

      return res;
    }
  }
};
