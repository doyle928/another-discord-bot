const { request } = require("graphql-request");
const Discord = require("discord.js");

function checkMembers(guild) {
  let memberCount = 0;
  guild.members.forEach(member => {
    if (!member.user.bot) memberCount++;
  });
  return memberCount;
}

module.exports = async (client, member) => {
  let audit = await member.guild.fetchAuditLogs();

  let messageEmbed = new Discord.RichEmbed();
  let reason = audit.entries.first().reason;
  reason = reason ? reason : `- no reason provided -`;

  if (audit.entries.first().action === "MEMBER_KICK") {
    messageEmbed
      .setAuthor("Member kicked")
      .setDescription(
        `**${audit.entries.first().executor.username}**#${
          audit.entries.first().executor.discriminator
        } kicked **${member.user.username}**#${member.user.discriminator} (ID:${
          member.user.id
        })\n\n**Reason :** ${reason}`
      );
  } else if (audit.entries.first().action === "MEMBER_BAN_ADD") {
    messageEmbed
      .setAuthor("Member kicked")
      .setDescription(
        `**${audit.entries.first().executor.username}**#${
          audit.entries.first().executor.discriminator
        } banned **${member.user.username}**#${member.user.discriminator} (ID:${
          member.user.id
        })\n\n**Reason :** ${reason}`
      );
  } else {
    messageEmbed
      .setAuthor("Member left")
      .setDescription(
        `**${member.user.username}**#${member.user.discriminator} (ID:${member.user.id}) just left`
      );
  }

  messageEmbed.setColor("#ff0000").setThumbnail(member.user.displayAvatarURL);

  if (member.guild.id === "664351758344257537") {
    let c = await client.channels.get("664364035386507274");
    c.send(messageEmbed);
  } else if (member.guild.id === "559560674246787087") {
    let c = await client.channels.get("561372938474094603");
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
