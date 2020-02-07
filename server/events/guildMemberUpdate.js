const Discord = require("discord.js");
const { request } = require("graphql-request");

module.exports = async (client, memberOld, memberNew) => {
  let boosterRoleID = null;
  memberNew.guild.roles.map(r => {
    if (r.name === "Nitro Booster") boosterRoleID = r.id;
  });

  if (
    boosterRoleID &&
    (memberNew._roles.includes(boosterRoleID) ||
      memberOld._roles.includes(boosterRoleID))
  ) {
    let user = null;

    let url = "https://lulu-discord-bot.herokuapp.com/api";

    let query = `{
                getUser(guild_id: "${memberNew.guild.id}", user_id: "${memberNew.user.id}") {
                    guild_id user_id booster
                }
            }`;
    try {
      user = await request(url, query);
      console.log(user);
    } catch (err) {
      console.error(err);
    }

    if (
      //if booster role added
      boosterRoleID &&
      !memberOld._roles.includes(boosterRoleID) &&
      memberNew._roles.includes(boosterRoleID) &&
      user &&
      "getUser" in user &&
      user.getUser.booster === false
    ) {
      const messageEmbed = new Discord.RichEmbed()
        .setDescription(
          `🎉 **${memberNew.user.username}** vient de boost **${memberNew.guild.name}** !\n\nVous débloquez des avantages sur le Discord.\n\nMerci beaucoup pour votre soutien !`
        )
        .setColor("#f5acba")
        .setThumbnail(memberNew.user.avatarURL);

      if (memberNew.guild.id === "559560674246787087") {
        let s = client.guilds
          .get("559560674246787087")
          .channels.get("663920241990172692");

        s.send(messageEmbed).then(m => m.react("575053165804912652"));

        memberNew.send(
          `Thanks for boosting the serveur ! i can give you a custom role !\nfigure out a name a hex-code value like #fdd1ff !! once you are ready use the command **.setboosterrole** in here or in any of the **Our Home** channels !`
        );
      } else if (memberNew.guild.id === "664351758344257537") {
        let s = client.guilds
          .get("664351758344257537")
          .channels.get("664357218719629312");

        s.send(messageEmbed).then(m => m.react("575053165804912652"));
      }
      query = `mutation{
                setBooster(guild_id: "${memberNew.guild.id}", user_id: "${memberNew.user.id}", booster: true) {
                    guild_id user_id booster
                }
            }`;
      try {
        let res = await request(url, query);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    } else if (
      //if booster role remove
      boosterRoleID &&
      memberOld._roles.includes(boosterRoleID) &&
      !memberNew._roles.includes(boosterRoleID) &&
      user &&
      "getUser" in user &&
      user.getUser.booster === true
    ) {
      if (memberNew.guild.id === "559560674246787087") {
        let s = client.guilds
          .get("559560674246787087")
          .channels.get("561372938474094603");

        s.send(
          `**${memberNew.user.username}** is no longer boosting the serveur !`
        );
        query = `{
                getBoosterroles {
                    guild_id user_id role_id
                }
            }`;
        try {
          boosterRoles = await request(url, query);
          for (let i in boosterRoles) {
            if (boosterRoles[i].user_id === memberNew.user.id) {
              query = `{
                deleteBoosterroles(role_id: "${boosterRoles[i].role_id}") {
                  role_id
                }
              }`;
              try {
                let guildRole = await s.roles.get(boosterRoles[i].role_id);
                guildRole.delete();
                await request(url, query);
              } catch (err) {
                console.error(err);
              }
            }
          }
        } catch (err) {
          console.error(err);
        }
      } else if (memberNew.guild.id === "664351758344257537") {
        let s = client.guilds
          .get("664351758344257537")
          .channels.get("664364035386507274");

        s.send(
          `**${memberNew.user.username}** is no longer boosting the serveur !`
        );
      }

      query = `mutation{
                setBooster(guild_id: "${memberNew.guild.id}", user_id: "${memberNew.user.id}", booster: false) {
                    guild_id user_id booster
                }
            }`;
      try {
        let res = await request(url, query);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    }
  }
};
