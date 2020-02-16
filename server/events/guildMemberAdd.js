const { request } = require("graphql-request");
const moment = require("moment");
const Discord = require("discord.js");
const addedRecently = new Set();

function checkMembers(guild) {
  let memberCount = 0;
  guild.members.forEach(member => {
    if (!member.user.bot) memberCount++;
  });
  return memberCount;
}

module.exports = async (client, member, guild) => {
  let discordJoinDateDiff = moment.duration(
    moment(new Date().toISOString()).diff(
      moment(new Date(member.user.createdTimestamp).toISOString())
    )
  );
  moment.locale("fr");
  let discordJoinDate = moment(
    new Date(member.user.createdTimestamp).toISOString()
  ).format("D MMM YYYY [à] H:mm");

  let blank_avatar = false,
    join_age = false;
  let url = "https://lulu-discord-bot.herokuapp.com/api";

  let query = `query {
      getServers {
        guild_id blank_avatar join_age
      }
    }`;
  try {
    let res = await request(url, query);
    res.getServers.map(async s => {
      if (s.guild_id === member.guild.id) {
        blank_avatar = s.blank_avatar;
        join_age = s.join_age;
      }
    });
  } catch (err) {
    console.error(err);
  }
  let messageEmbed = new Discord.RichEmbed().setColor("#202225");

  if (join_age) {
    if (
      discordJoinDateDiff._data.days < 7 &&
      discordJoinDateDiff._data.months < 1 &&
      discordJoinDateDiff._data.years < 1
    ) {
      if (member.guild.id === "559560674246787087") {
        messageEmbed
          .setAuthor("Notice")
          .setDescription(
            `Thanks for joining Our Home !\nUnfortunately we require discord accounts that are 7 days or older.\n\nYour account is was created on ${discordJoinDate} !`
          )
          .setFooter(
            `${member.guild.name}`,
            "https://cdn.discordapp.com/avatars/601825955572350976/67cca6c8e018ae7f447e6f0e41cbfd3c.png?size=2048"
          )
          .setTimestamp();

        member.send(messageEmbed).then(() => {
          member.kick("account was too young !!");
        });
        return;
      } else if (member.guild.id === "664351758344257537") {
        messageEmbed
          .setAuthor("Notice")
          .setDescription(
            `Thanks for joining Losers Club !\nUnfortunately we require discord accounts that are 7 days or older.\n\nYour account is was created on ${discordJoinDate} !`
          )
          .setFooter(
            `${member.guild.name}`,
            "https://cdn.discordapp.com/avatars/601825955572350976/67cca6c8e018ae7f447e6f0e41cbfd3c.png?size=2048"
          )
          .setTimestamp();
        member.send(messageEmbed).then(() => {
          member.kick("account was too young !!");
        });
        return;
      }
    }
  }
  if (blank_avatar) {
    if (
      member.user.avatarURL === null ||
      member.user.displayAvatarURL.indexOf("assets") > -1
    ) {
      if (member.guild.id === "559560674246787087") {
        messageEmbed
          .setAuthor("Notice")
          .setDescription(
            `Thanks for joining **Our Home** !\nUnfortunately we require discord accounts to have an avatar photo, sorry it is just to help keep bots from joining !\n\nYou can get a photo and try again though !!`
          )
          .setFooter(
            `${member.guild.name}`,
            "https://cdn.discordapp.com/avatars/601825955572350976/67cca6c8e018ae7f447e6f0e41cbfd3c.png?size=2048"
          )
          .setTimestamp();

        member.send(messageEmbed).then(() => {
          member.kick("no avatar photo !!");
        });
        return;
      } else if (member.guild.id === "664351758344257537") {
        messageEmbed
          .setAuthor("Notice")
          .setDescription(
            `Thanks for joining **Losers Club** !\nUnfortunately we require discord accounts to have an avatar photo, sorry it is just to help keep bots from joining !\n\nYou can get a photo and try again though !!`
          )
          .setFooter(
            `${member.guild.name}`,
            "https://cdn.discordapp.com/avatars/601825955572350976/67cca6c8e018ae7f447e6f0e41cbfd3c.png?size=2048"
          )
          .setTimestamp();
        member.send(messageEmbed).then(() => {
          member.kick("no avatar photo !!");
        });
        return;
      } else if (member.guild.id === "634305104693952532") {
        messageEmbed
          .setAuthor("Notice")
          .setDescription(
            `Thanks for joining **Naughty Things** !\nUnfortunately we require discord accounts to have an avatar photo, sorry it is just to help keep bots from joining !\n\nYou can get a photo and try again though !!`
          )
          .setFooter(
            `${member.guild.name}`,
            "https://cdn.discordapp.com/avatars/601825955572350976/67cca6c8e018ae7f447e6f0e41cbfd3c.png?size=2048"
          )
          .setTimestamp();
        member.send(messageEmbed).then(() => {
          member.kick("no avatar photo !!");
        });
        return;
      }
    }
  }

  if (member.guild.id === "559560674246787087") {
    let c = await member.guild.channels.get("561372938474094603");
    messageEmbed
      .setAuthor("New member")
      .setDescription(
        `**${member.user.username}** joined !\n\n**Account created :** ${discordJoinDate}`
      )
      .setColor("#00ff00")
      .setThumbnail(member.user.displayAvatarURL)
      .setFooter(
        `${member.guild.name}`,
        "https://cdn.discordapp.com/avatars/601825955572350976/67cca6c8e018ae7f447e6f0e41cbfd3c.png?size=2048"
      )
      .setTimestamp();

    member
      .addRole("596016686331723785")
      .then(() => c.send(messageEmbed))
      .catch(() => {
        messageEmbed
          .setAuthor("New member")
          .setDescription(
            `**${member.user.username}** has joined the server but i failed to give them the welcome to serveur role !`
          )
          .setFooter(
            `${member.guild.name}`,
            "https://cdn.discordapp.com/avatars/601825955572350976/67cca6c8e018ae7f447e6f0e41cbfd3c.png?size=2048"
          )
          .setTimestamp();

        c.send(messageEmbed);
      });
    member.addRole("585353865575137281");
    member.addRole("592647213411336193");
  } else if (member.guild.id === "664351758344257537") {
    let c = await member.guild.channels.get("664364035386507274");

    if (addedRecently.has("raid-mode-on")) {
      member.addRole("664383601248305173");
      messageEmbed
        .setAuthor("Notice")
        .setDescription(
          `Thanks for joining Losers Club !\nUnfortunately we had a large amount of joins in a few secondes so raid mode was automatically activated ! If you are not a bot you can join again in 30-45 minutes !`
        );
      member.send(messageEmbed).then(() => member.kick("raid mode"));
    } else {
      if (addedRecently.has("raid-mode-check")) {
        if (!addedRecently.has("sent-raid-msg")) {
          messageEmbed
            .setAuthor("Raid mode")
            .setDescription(`Raid mode is turned on for 20 minutes`);
          c.send(messageEmbed);

          addedRecently.add("sent-raid-msg");
          addedRecently.add("raid-mode-on");
          if (addedRecently.has("raid-mode-check")) {
            addedRecently.delete("raid-mode-check");
          }

          setTimeout(() => {
            addedRecently.delete("sent-raid-msg");
            addedRecently.delete("raid-mode-on");
          }, 1200000);
        }
        member.addRole("664383601248305173");
        messageEmbed
          .setAuthor("Notice")
          .setDescription(
            `Thanks for joining Losers Club !\nUnfortunately we had a large amount of joins in a few secondes so raid mode was automatically activated ! If you are not a bot you can join again in 30-45 minutes !`
          )
          .setFooter(
            `${member.guild.name}`,
            "https://cdn.discordapp.com/avatars/601825955572350976/67cca6c8e018ae7f447e6f0e41cbfd3c.png?size=2048"
          )
          .setTimestamp();

        member.send(messageEmbed).then(() => member.kick("raid mode"));
      } else {
        messageEmbed
          .setAuthor("New member")
          .setDescription(
            `**${member.user.username}** joined !\n\n**Account created :** ${discordJoinDate}`
          )
          .setColor("#00ff00")
          .setThumbnail(member.user.displayAvatarURL)
          .setFooter(
            `${member.guild.name}`,
            "https://cdn.discordapp.com/avatars/601825955572350976/67cca6c8e018ae7f447e6f0e41cbfd3c.png?size=2048"
          )
          .setTimestamp();

        member.guild
          .fetchMember("157673412561469440")
          .then(m =>
            m.send(`**${member.user.username}** joined Losers Club !`)
          );

        member
          .addRole("664383363901030400")
          .then(() => c.send(messageEmbed))
          .catch(() => {
            messageEmbed
              .setAuthor("New member")
              .setDescription(
                `**${member.user.username}** has joined the server but i failed to give them the welcome to serveur role !`
              )
              .setFooter(
                `${member.guild.name}`,
                "https://cdn.discordapp.com/avatars/601825955572350976/67cca6c8e018ae7f447e6f0e41cbfd3c.png?size=2048"
              )
              .setTimestamp();

            c.send(messageEmbed);
          });
        addedRecently.add("raid-mode-check");
        setTimeout(() => {
          if (addedRecently.has("raid-mode-check")) {
            addedRecently.delete("raid-mode-check");
          }
        }, 15000);
      }
    }
  }

  query = `query {
            getUser(guild_id: "${member.guild.id}", user_id: "${member.user.id}") {
              guild_id user_id 
            }
          }`;

  try {
    let res = await request(url, query);
    if (res.getUser === null) {
      query = `mutation {
            addUser(guild_id: "${member.guild.id}", user_id: "${
        member.user.id
      }", join_date: "${
        member.joinedTimestamp
      }", strikes: ${0}, booster: false, welcome_points: ${0}) {
              guild_id user_id join_date strikes booster welcome_points
            }
          }`;

      try {
        await request(url, query);
      } catch (err) {
        console.error(err);
      }
    }
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
};
