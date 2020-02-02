const Discord = require("discord.js");
const randomColor = require("../../data/randomColor");
const { request } = require("graphql-request");

exports.run = async (client, message, args) => {
  let url = "https://lulu-discord-bot.herokuapp.com/api";

  if (message.mentions.members.first()) {
    let query = `query {
            getUser(guild_id: "${message.guild.id}", user_id: "${
      message.mentions.members.first().user.id
    }") {
              guild_id user_id welcome_points
            }
          }`;
    try {
      let res = await request(url, query);
      const embed = new Discord.RichEmbed()
        .setAuthor(
          message.mentions.members.first().user.username,
          message.mentions.members.first().user.displayAvatarURL
        )
        .setDescription(`**Points :** ${res.getUser.welcome_points}`)
        .setColor(randomColor());
      return message.channel.send(embed);
    } catch (err) {
      console.error(err);
    }
  } else {
    let query = `query {
            getUser(guild_id: "${message.guild.id}", user_id: "${message.author.id}") {
              guild_id user_id welcome_points
            }
          }`;
    try {
      let res = await request(url, query);
      const embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setDescription(`**Points :** ${res.getUser.welcome_points}`)
        .setColor(randomColor());
      return message.channel.send(embed);
    } catch (err) {
      console.error(err);
    }
  }
};
