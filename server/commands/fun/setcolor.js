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
      for (let i in boosterRoles) {
        if (boosterRoles[i].user_id === message.author.id) {
          haveRoleBool = true;
          roleId = boosterRoles[i].role_id;
        }
      }
      if (haveRoleBool) {
        let color = args[1];
        let role = await s.roles.get(roleId);
        role.setColor(color).then(() => {
          message.channel.send(`okay i changed the color of the role !!`);
        });
      } else {
        message.channel.send("you dont have a boosted role !!");
      }
    } catch (err) {
      console.error(err);
    }
  }
};
