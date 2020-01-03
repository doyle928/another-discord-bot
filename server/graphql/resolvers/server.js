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
    },
    setJoinAge: async (_, { guild_id, join_age }) => {
      const res = await Server.findOneAndUpdate(
        {
          guild_id: guild_id
        },
        {
          join_age: join_age
        },
        {
          new: true
        }
      );

      return res;
    },
    setBlankAvatar: async (_, { guild_id, blank_avatar }) => {
      const res = await Server.findOneAndUpdate(
        {
          guild_id: guild_id
        },
        {
          blank_avatar: blank_avatar
        },
        {
          new: true
        }
      );

      return res;
    }
  }
};
