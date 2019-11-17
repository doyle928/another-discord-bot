const { request } = require("graphql-request");
const _ = require("lodash");

module.exports = async (client, guild) => {
  let url = "https://lulu-discord-bot.herokuapp.com/api";

  let members = await guild.fetchMembers();

  members.members.map(async mem => {
    let query = `mutation {
            addUser(guild_id: "${guild.id}", user_id: "${
      mem.user.id
    }", join_date: "${mem.joinedTimestamp}", strikes: ${0}) {
              guild_id user_id join_date strikes
            }
          }`;
    try {
      let res = await request(url, query);
    } catch (err) {
      console.error(err);
    }
  });

  let query = `mutation {
            addServer(guild_id: "${guild.id}") {
              guild_id
            }
          }`;
  try {
    let res = await request(url, query);
  } catch (err) {
    console.error(err);
  }
};
