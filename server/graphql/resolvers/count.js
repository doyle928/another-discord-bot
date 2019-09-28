const Count = require("../models/count");

module.exports = {
  Query: {
    getCount: async () => {
      try {
        const counts = await Count.find();
        return counts;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    addCount: async (_, { guild_id, members, timestamp }) => {
      const newCount = new Count({
        guild_id,
        members,
        timestamp
      });

      //  Create the new user
      const res = await newCount.save();

      return res;
    }
  }
};
