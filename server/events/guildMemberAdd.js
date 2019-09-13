const { request } = require("graphql-request");
const _ = require("lodash");
const mongoose = require("mongoose");

module.exports = async (client, member, guild) => {
  let guildId = guild.id.toString();
  state = `server_${guildId}`;

  mongoose
    .connect(`${process.env.MONGODB_URI}${state}`, { useNewUrlParser: true })
    .then(() => console.log("DB connected"))
    .catch(error => console.log(error));

  let query = `mutation {
        addUser(user_id: "${member.user.id}", join_date: "${
    member.joinedTimestamp
  }", strikes: ${0}) {
          user_id join_date strikes
        }
      }`;
  let url = "https://lulu-discord-bot.herokuapp.com/api";
  try {
    let res = await request(url, query);
    console.log("chart", res);
  } catch (err) {
    console.error("chart error:", err);
  }

  mongoose.disconnect();
};
