const Discord = require("discord.js");

module.exports = async (client, message) => {
  if (message.guild.id === "664351758344257537") {
    // console.log(message);
    let messageEmbed = new Discord.RichEmbed()
      .setColor("#ff0000")
      .setAuthor("Message deleted")
      .setDescription(
        `${message.author.username}#${message.author.discriminator} in ${message.channel.name}\n\n${message.content}`
      );
    let c = await message.guild.channels.get("664363921196580874");
    c.send(messageEmbed);
  }
};
