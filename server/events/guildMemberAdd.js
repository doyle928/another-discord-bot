const { request } = require("graphql-request");
const _ = require("lodash");
const mongoose = require("mongoose");

function checkMembers(guild) {
  let memberCount = 0;
  guild.members.forEach(member => {
    if (!member.user.bot) memberCount++;
  });
  return memberCount;
}

module.exports = async (client, member, guild) => {

  let guildId = member.guild.id.toString();
  state = `${guildId}`;

  await mongoose
    .connect(`${process.env.MONGODB_URI}server_${state}`, {
      useNewUrlParser: true
    })
    .then(async () => {
      console.log("DB connected");
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
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    })
    .then(() => mongoose.connection.close().then(console.log("disconnected")))
    .catch(error => console.log(error));

  await mongoose
    .connect(`${process.env.MONGODB_URI}stats_${state}`, {
      useNewUrlParser: true
    })
    .then(async () => {
      console.log("DB connected");

      let query = `mutation {
            addCount (members: ${checkMembers(
              member.guild
            )}, timestamp: "${Date.now()}") {
              members timestamp
            }
          }`;
      let url = "https://lulu-discord-bot.herokuapp.com/api";
      try {
        let res = await request(url, query);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    })
    .then(() => mongoose.connection.close().then(console.log("disconnected")))
    .catch(error => console.log(error));
};
