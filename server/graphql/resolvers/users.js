const User = require("../models/users");

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
    getUser: async (_, { user_id }) => {
      try {
        //  Find a user by ID
        const user = await User.findById(user_id);
        if (user) {
          return user;
        } else {
          throw new Error("User not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    addUser: async (_, { user_id, join_date, strikes }) => {
      const newUser = new User({
        user_id,
        join_date,
        strikes
      });

      //  Create the new user
      const res = await newUser.save();

      return res;
    }
  }
};
