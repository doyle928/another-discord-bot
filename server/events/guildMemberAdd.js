const { request } = require("graphql-request");

function checkMembers(guild) {
  let memberCount = 0;
  guild.members.forEach(member => {
    if (!member.user.bot) memberCount++;
  });
  return memberCount;
}

module.exports = async (client, member, guild) => {
  let query = `mutation {
            addUser(guild_id: "${member.guild.id}", user_id: "${
    member.user.id
  }", join_date: "${member.joinedTimestamp}", strikes: ${0}) {
              guild_id user_id join_date strikes
            }
          }`;

  let url = "https://lulu-discord-bot.herokuapp.com/api";

  try {
    let res = await request(url, query);
  } catch (err) {
    console.error(err);
  }

  query = `mutation {
            addCount (guild_id: "${member.guild.id}", members: ${checkMembers(
    member.guild
  )}, timestamp: "${Date.now()}") {
              guild_id members timestamp
            }
          }`;

  try {
    await request(url, query);
  } catch (err) {
    console.error(err);
  }

  if (member.guild.id === "559560674246787087") {
    let c = await member.guild.channels.get("561372938474094603");
    member
      .addRole("596016686331723785")
      .then(() => c.send(`${member.user.username} has joined the server !`))
      .catch(() =>
        c.send(
          `${member.user.username} has joined the server but i failed to give them the welcome to serveur role !`
        )
      );
  }
};
