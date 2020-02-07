const { request } = require("graphql-request");

exports.run = async (client, message, args) => {
  let s = await client.guilds.get("559560674246787087");

  if (s.members.has(message.author.id)) {
    let url = "https://lulu-discord-bot.herokuapp.com/api";
    let query = `{
                getBoosterroles {
                    guild_id user_id role_id
                }
            }`;
    try {
      boosterRoles = await request(url, query);
      let haveRoleBool = false;
      let roleId = "";
      for (let i in boosterRoles.getBoosterroles) {
        if (boosterRoles.getBoosterroles[i].user_id === message.author.id) {
          haveRoleBool = true;
          roleId = boosterRoles.getBoosterroles[i].role_id;
        }
      }
      if (haveRoleBool) {
        let name = message.content.replace(".setname ", "").trim();
        if (name.length < 32) {
          let role = await s.roles.get(roleId);
          role.setName(name).then(() => {
            message.channel.send(
              `okay i changed the name of the role to ${name} !!`
            );
          });
        } else {
          return message.channel.send(
            `the role name has to be under 32 characters ! not ${name.length} !!`
          );
        }
      } else {
        message.channel.send("you dont have a boosted role !!");
        return message.channel.send("<:natsukiMad:646210751417286656>");
      }
    } catch (err) {
      console.error(err);
    }
  }
};
