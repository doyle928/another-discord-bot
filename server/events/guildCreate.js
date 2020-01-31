const { request } = require("graphql-request");
const _ = require("lodash");

module.exports = async (client, guild) => {
  let url = "https://lulu-discord-bot.herokuapp.com/api";

  let members = await guild.fetchMembers();
  let boosterRoleID = null;
  guild.roles.map(r => {
    if (r.name === "Nitro Booster") boosterRoleID = r.id;
  });

  members.members.map(async mem => {
    let booster = false;

    await Promise.all(
      mem.roles.map(r => {
        if ((r.name = "Nitro Booster")) booster = true;
      })
    );
    let query = `mutation {
            addUser(guild_id: "${guild.id}", user_id: "${
      mem.user.id
    }", join_date: "${
      mem.joinedTimestamp
    }", strikes: ${0}, booster: ${booster}) {
              guild_id user_id join_date strikes booster
            }
          }`;
    try {
      let res = await request(url, query);
    } catch (err) {
      console.error(err);
    }
  });

  let query = `mutation {
            addServer(guild_id: "${
              guild.id
            }", blank_avatar: ${false}, join_age: ${false}) {
              guild_id
            }
          }`;
  try {
    let res = await request(url, query);
  } catch (err) {
    console.error(err);
  }
};
