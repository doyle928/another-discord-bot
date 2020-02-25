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
    },
    setMutedRole: async (_, { guild_id, muted_role }) => {
      const res = await Server.findOneAndUpdate(
        {
          guild_id: guild_id
        },
        {
          muted_role: muted_role
        },
        {
          new: true
        }
      );
      return res;
    },
    setRaidMode: async (_, { guild_id, raid_mode }) => {
      const res = await Server.findOneAndUpdate(
        {
          guild_id: guild_id
        },
        {
          raid_mode: raid_mode
        },
        {
          new: true
        }
      );
      return res;
    },
    setRaidModeActive: async (_, { guild_id, raid_mode_active }) => {
      const res = await Server.findOneAndUpdate(
        {
          guild_id: guild_id
        },
        {
          raid_mode_active: raid_mode_active
        },
        {
          new: true
        }
      );
      return res;
    },
    setNewMemberRoles: async (_, { guild_id, new_member_roles }) => {
      const res = await Server.findOneAndUpdate(
        {
          guild_id: guild_id
        },
        {
          new_member_roles: new_member_roles
        },
        {
          new: true
        }
      );
      return res;
    },
    setModChannel: async (_, { guild_id, mod_channel }) => {
      const res = await Server.findOneAndUpdate(
        {
          guild_id: guild_id
        },
        {
          mod_channel: mod_channel
        },
        {
          new: true
        }
      );
      return res;
    }
  }
};
