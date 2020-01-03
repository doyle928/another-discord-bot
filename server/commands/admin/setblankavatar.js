const { request } = require("graphql-request");

exports.run = async (client, message, args) => {
  if (message.member.hasPermission("BAN_MEMBERS")) {
    let url = "https://lulu-discord-bot.herokuapp.com/api";
    let query = `query {
            getServers {
                guild_id blank_avatar
            }
        }`;
    try {
      let res = await request(url, query);
      console.log(res);
      res.getServers.map(async s => {
        if (s.guild_id === message.guild.id) {
          if (s.blank_avatar === false) {
            message.channel.send(
              "current setting is **false** to kicking accounts without avatars, **changing it to true** !\nAccounts without avatars will now be kicked !!"
            );
          } else {
            message.channel.send(
              "current setting is **true** to kicking accounts without avatars, **changing it to false** !\nAccounts without avatars will not be kicked !!"
            );
          }
          query = `mutation{
                setBlankAvatar(guild_id: "${
                  message.guild.id
                }", blank_avatar: ${!s.blank_avatar}){
                    guild_id
                }
            }`;
          try {
            await request(url, query);
          } catch (err) {
            console.error(err);
          }
        }
      });
    } catch (err) {
      console.error(err);
    }
  }
};
