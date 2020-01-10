const { request } = require("graphql-request");

function checkMembers(guild) {
  let memberCount = 0;
  guild.members.forEach(member => {
    if (!member.user.bot) memberCount++;
  });
  return memberCount;
}

module.exports = async (client, member) => {
  if (member.guild.id === "664351758344257537") {
    let c = await client.channels.get("664364035386507274");
    messageEmbed
      .setAuthor("Member left")
      .setDescription(`**${member.user.username}** just left :(`);
    c.send(messageEmbed);
  }

  let query = `mutation {
            addCount (guild_id: "${member.guild.id}", members: ${checkMembers(
    member.guild
  )}, timestamp: "${Date.now()}") {
              guild_id members timestamp
            }
          }`;

  let url = "https://lulu-discord-bot.herokuapp.com/api";

  try {
    await request(url, query);
  } catch (err) {
    console.error(err);
  }

  query = `{
            getShip(guild_id: "${member.guild.id}", user_id: "${member.user.id}") {
              user_id ship_id timestamp
            }
          }`;
  try {
    let res = await request(url, query);
    if (res.getShip !== null) {
      query = `mutation{
            deleteShip(guild_id: "${member.guild.id}", user_id: "${member.user.id}") {
              guild_id
            }
          }`;
      try {
        await request(url, query);
        query = `mutation{
            deleteShip(guild_id: "${member.guild.id}", user_id: "${res.getShip.ship_id}") {
              guild_id
            }
          }`;
        try {
          await request(url, query);
        } catch (err) {
          return console.error(err);
        }
      } catch (err) {
        return console.error(err);
      }
    }
  } catch (err) {
    return console.error(err);
  }
};
