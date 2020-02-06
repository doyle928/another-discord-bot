const Schedules = require(`../models/schedules`);

module.exports = {
  Query: {
    getSchedules: async () => {
      try {
        //  Find all users
        const schedules = await Schedules.find();
        return schedules;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    addSchedules: async (_, { guild_id, channel_id, message, date }) => {
      const newSchedules = new Schedules({
        guild_id,
        channel_id,
        message,
        date
      });
      try {
        //  Create the new user
        const res = await newSchedules.save();
        console.log(res);

        return res;
      } catch (err) {
        console.error(err);
      }
    },
    deleteSchedules: async (_, { guild_id, channel_id, message, date }) => {
      const res = await Schedules.deleteOne({
        guild_id: guild_id,
        channel_id: channel_id,
        message: message,
        date: date
      });

      console.log("resolver", res);
      return res;
    }
  }
};
