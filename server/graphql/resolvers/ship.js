const Ship = require(`../models/ship`);

module.exports = {
  Query: {
    getShips: async (_, { guild_id }) => {
      const ships = await Ship.find(
        { guild_id: guild_id },
        "user_id ship_id timestamp"
      );
      console.log("resolver", ships);
      return ships;
    },
    getShip: async (_, { guild_id, user_id }) => {
      const ship = await Ship.find(
        { guild_id: guild_id, user_id: user_id },
        "user_id ship_id timestamp"
      );
      console.log("resolver", ship[0]);
      return ship[0];
    }
  },
  Mutation: {
    addShip: async (_, { guild_id, user_id, ship_id, timestamp }) => {
      const newShip = new Ship({
        guild_id,
        user_id,
        ship_id,
        timestamp
      });
      try {
        //  Create the new user
        const res = await newShip.save();
        console.log(res);

        return res;
      } catch (err) {
        console.error(err);
      }
    },
    deleteShip: async (_, { guild_id, user_id }) => {
      try {
        const res = await Ship.findOneAndRemove({
          guild_id: guild_id,
          user_id: user_id
        });

        console.log("resolver", res);
        return res;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
