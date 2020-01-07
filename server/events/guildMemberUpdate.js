const Discord = require("discord.js");

module.exports = async (client, memberOld, memberNew) => {
  console.log(memberOld.guild.id, memberNew._roles);
  if (memberNew.guild.id === "559560674246787087") {
    if (memberOld._roles.indexOf("594325820172926977") === -1) {
      if (memberNew._roles.indexOf("594325820172926977") > -1) {
        let s = client.guilds
          .get("559560674246787087")
          .channels.get("663920241990172692");
        let messageEmbed = new Discord.RichEmbed()
          .setDescription(
            `🎉 **${memberNew.user.username}** vient de boost **Our Home** !\n\nVous débloquez des avantages sur le Discord.\n\nMerci beaucoup pour votre soutien `
          )
          .setColor("#f5acba")
          .setThumbnail(memberNew.user.avatarURL);
        s.send(messageEmbed).then(m => m.react("575053165804912652"));
      }
    }
  }
};
