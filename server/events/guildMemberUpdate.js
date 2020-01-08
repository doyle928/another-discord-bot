const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = async (client, memberOld, memberNew) => {
  let reqPath = path.join(__dirname, "../json/boosterList.json");
  let rawdata = fs.readFileSync(reqPath, "utf8");
  let boosterList = JSON.parse(rawdata);

  if (memberNew.guild.id === "559560674246787087") {
    if (
      !memberOld._roles.includes("594325820172926977") &&
      memberNew._roles.includes("594325820172926977") &&
      !boosterList.includes(memberNew.id)
    ) {
      let s = client.guilds
        .get("559560674246787087")
        .channels.get("663920241990172692");
      let messageEmbed = new Discord.RichEmbed()
        .setDescription(
          `🎉 **${memberNew.user.username}** vient de boost **Our Home** !\n\nVous débloquez des avantages sur le Discord.\n\nMerci beaucoup pour votre soutien !`
        )
        .setColor("#f5acba")
        .setThumbnail(memberNew.user.avatarURL);
      s.send(messageEmbed).then(m => m.react("575053165804912652"));
      boosterList.push(memberNew.id);
      let data = JSON.stringify(boosterList);
      fs.writeFileSync(reqPath, data);
    } else if (
      memberOld._roles.includes("594325820172926977") &&
      !memberNew._roles.includes("594325820172926977") &&
      boosterList.includes(memberNew.id)
    ) {
      boosterList.splice(boosterList.indexOf(memberNew.id), 1);
      let data = JSON.stringify(boosterList);
      fs.writeFileSync(reqPath, data);
    }
  }
};
