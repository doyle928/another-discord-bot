const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (
    !message.member.hasPermission("KICK_MEMBERS") &&
    message.author.id !== "283061927121256449" &&
    message.author.id !== "538026019681075220"
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
      let roleArray = [];
      await member.roles.map(r => roleArray.push(r.id));

      if (message.guild.id === "559560674246787087") {
        roleArray.splice(roleArray.indexOf("586122632479375370"), 1);
        member
          .setRoles(roleArray)
          .then(() => message.channel.send("okay i unmuted them !"));
      } else if (message.guild.id === "664351758344257537") {
        roleArray.splice(roleArray.indexOf("664383601248305173"), 1);
        member
          .setRoles(roleArray)
          .then(() => message.channel.send("okay i unmuted them !"));
      }
    }
  }
};
