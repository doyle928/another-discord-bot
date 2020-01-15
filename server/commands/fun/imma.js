const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (message.channel.id === "561453542741901322") {
    message.channel.send("sorry but i'm not allowed in here anymore !");
    message.channel.send("<a:crying:661358360091688980>");
  } else {
    let messageEmbed = new Discord.RichEmbed()
      .setColor("#202225")
      .setImage(
        "https://cdn.discordapp.com/attachments/660228695730028594/666765186975137830/testing.gif"
      );
    message.channel.send(messageEmbed);
  }
};
