const { request } = require("graphql-request");
const _ = require("lodash");
const mongoose = require("mongoose");
const axios = require("axios");

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

  mongoose
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
    .then(() => mongoose.disconnect())
    .catch(error => console.log(error));
};
