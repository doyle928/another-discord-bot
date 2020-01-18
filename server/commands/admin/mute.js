const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (
    !message.member.hasPermission("KICK_MEMBERS") &&
    message.author.id !== "274056145856102402"
  ) {
    message.channel.send(
      `How dare you ${message.author.username} !! You don't have the permissions to use this command !`
    );
    message.channel.send("<:natsukiMad:646210751417286656>");
  } else {
    if (!args[1]) {
      message.channel.send("there's no user specified!!!");
      message.channel.send("<:natsukiMad:646210751417286656>");
    } else {
      let member = null;

      if (!message.mentions.members.first()) {
        let id = args[1].replace(/([<>@,#!&])/g, "");
        try {
          member = await message.guild.fetchMember(id);
        } catch {
          message.channel.send("I don't think this member exists in the guild");
          message.channel.send("<:kanna_confused:607077674099277828>");
        }
      } else {
        member =
          message.mentions.members.first() ||
          message.guild.members.get(args[1]);
      }

      if (message.guild.id === "559560674246787087") {
        member.addRole("586122632479375370");
      } else if (message.guild.id === "664351758344257537") {
        member.addRole("664383601248305173");
      }
    }
  }
};
