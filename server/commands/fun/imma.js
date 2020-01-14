const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let messageEmbed = new Discord.RichEmbed()
    .setColor("#202225")
    .setImage(
      "https://cdn.discordapp.com/attachments/660228695730028594/666765186975137830/testing.gif"
    );
  message.channel.send(messageEmbed);
};
