const { request } = require("graphql-request");
const _ = require("lodash");
const mongoose = require("mongoose");

module.exports = async (client, guild) => {
  let guildId = guild.id.toString();
  state = `${guildId}`;

  mongoose
    .connect(`${process.env.MONGODB_URI}server_${state}`, {
      useNewUrlParser: true
    })
    .then(async () => {
      console.log("DB connected");

      let members = await guild.fetchMembers();

      members.members.map(async mem => {
        let query = `mutation {
            addUser(user_id: "${mem.user.id}", join_date: "${
          mem.joinedTimestamp
        }", strikes: ${0}) {
              user_id join_date strikes
            }
          }`;
        let url = "https://lulu-discord-bot.herokuapp.com/api";
        try {
          let res = await request(url, query);
          console.log(res);
        } catch (err) {
          console.error(err);
        }
      });
    })
    .then(() => mongoose.connection.close().then(console.log("disconnected")))
    .catch(error => console.log(error));
};
