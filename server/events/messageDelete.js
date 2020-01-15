const Discord = require("discord.js");

module.exports = async (client, message) => {
  if (message.guild && message.guild.id === "664351758344257537") {
    let messageEmbed = new Discord.RichEmbed()
      .setColor("#ff0000")
      .setAuthor("Message deleted")
      .setTimestamp();
    let c = await message.guild.channels.get("664363921196580874");

    if (
      message.content === "" &&
      message.embeds.length > 0 &&
      message.embeds[0].url !== undefined
    ) {
      messageEmbed.setDescription(
        `${message.author.username}#${message.author.discriminator} in ${message.channel.name}\n\n${message.embeds[0].url}`
      );
      c.send(messageEmbed);
    } else if (message.content.length > 0) {
      messageEmbed.setDescription(
        `${message.author.username}#${message.author.discriminator} in ${message.channel.name}\n\n${message.content}`
      );
      c.send(messageEmbed);
    }
  }
};
