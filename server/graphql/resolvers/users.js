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
        "guild_id user_id join_date strikes"
      );
      console.log("resolver", user[0]);
      return user[0];
      // try {
      //   //  Find a user
      //   await User.find(
      //     {
      //       user_id: user_id
      //     },
      //     (err, user) => {
      //       if (err) return handleError(err);
      //       console.log("resolver", user);
      //       return user;
      //     }
      // //   );
      // } catch (err) {
      //   throw new Error(err);
      // }
    }
  },
  Mutation: {
    addUser: async (_, { guild_id, user_id, join_date, strikes }) => {
      const newUser = new User({
        guild_id,
        user_id,
        join_date,
        strikes
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

      console.log("resolver", res);
      return res;
    }
  }
};
