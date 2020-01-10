const { request } = require("graphql-request");

exports.run = async (client, message, args) => {
  if (message.member.hasPermission("BAN_MEMBERS")) {
    let url = "https://lulu-discord-bot.herokuapp.com/api";
    let query = `query {
            getServers {
                guild_id join_age
            }
        }`;
    try {
      let res = await request(url, query);
      console.log(res);
      res.getServers.map(async s => {
        if (s.guild_id === message.guild.id) {
          if (s.join_age === false) {
            message.channel.send(
              "current setting is false to kicking accounts under 7 days old, changing it to true !\nAccounts under 7 days old will now be kicked !!"
            );
          } else {
            message.channel.send(
              "current setting is true to kicking accounts under 7 days old, changing it to false !\nAccounts under 7 days old will not be kicked !!"
            );
          }
          query = `mutation{
                setJoinAge(guild_id: "${
                  message.guild.id
                }", join_age: ${!s.join_age}){
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
