const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    message.channel.send(
      `How dare you ${message.author.username} !! You don't have the permissions to use this command !`
    );
    message.channel.send("<:natsukiMad:646210751417286656>");
  } else {
    message.guild
      .createEmoji(args[1], args[2])
      .then(() => message.channel.send("done !"))
      .catch(err => {
        message.channel.send("i was not able to");
        message.channel.send("<:deadinside:665371578359611412>");
        console.error(err);
      });
  }
};
