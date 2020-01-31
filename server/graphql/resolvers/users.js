const User = require(`../models/users`);

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        //  Find all users
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
    getUser: async (_, { guild_id, user_id }) => {
      const user = await User.find(
        { guild_id: guild_id, user_id: user_id },
        "guild_id user_id join_date strikes booster"
      );
      return user[0];
    }
  },
  Mutation: {
    addUser: async (_, { guild_id, user_id, join_date, strikes, booster }) => {
      const newUser = new User({
        guild_id,
        user_id,
        join_date,
        strikes,
        booster
      });

      //  Create the new user
      const res = await newUser.save();

      return res;
    },
    addStrike: async (_, { guild_id, user_id, strikes }) => {
      const res = await User.findOneAndUpdate(
        {
          guild_id: guild_id,
          user_id: user_id
        },
        {
          strikes: strikes
        },
        {
          new: true
        }
      );

      return res;
    },
    setBooster: async (_, { guild_id, user_id, booster }) => {
      const res = await User.findOneAndUpdate(
        {
          guild_id: guild_id,
          user_id: user_id
        },
        {
          booster: booster
        },
        {
          new: true
        }
      );

      return res;
    }
  }
};
