const Discord = require("discord.js");

module.exports = async (client, messageOld, messageNew) => {
  if (
    messageOld.channel.guild &&
    messageOld.channel.guild.id === "664351758344257537" &&
    messageOld.embeds.length === 0
  ) {
    if (messageOld.channel.id !== "664363921196580874") {
      let messageEmbed = new Discord.RichEmbed()
        .setColor("#ffff00")
        .setAuthor("Message edited")
        .setDescription(
          `${messageOld.author.username}#${messageOld.author.discriminator} in ${messageOld.channel.name}\n\n${messageOld.content}\n- to -\n${messageNew.content}`
        )
        .setTimestamp();
      let c = await messageOld.channel.guild.channels.get("664363921196580874");
      c.send(messageEmbed);
    }
  }
};
