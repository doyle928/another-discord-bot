const { request } = require("graphql-request");
const _ = require("lodash");

exports.run = async (client, message, args) => {
  if (message.author.id == "157673412561469440") {
    let members = await message.guild.fetchMembers();

    members.members.map(async mem => {
      let query = `mutation {
            addUser(guild_id: "${message.guild.id}", user_id: "${
        mem.user.id
      }", join_date: "${mem.joinedTimestamp}", strikes: ${0}) {
              guild_id user_id join_date strikes
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
  }
};
