const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const randomColor = require("../../data/randomColor");

exports.run = async (client, message, args) => {
  if (!args[1]) {
    message.channel.send(
      `see what ?? you need to tell me what you want to see !`
    );
    message.channel.send("<:natsukiMad:646210751417286656>");
  } else {
    if (args[1].indexOf("<") >= 0) {
      let emoteID = args[1].split(":");
      emoteID = emoteID[2].replace(/([^0-9])/g, "");

      if (args[1].indexOf("<a:") >= 0) {
        const embed = new Discord.RichEmbed()
          .setImage(`https://cdn.discordapp.com/emojis/${emoteID}.gif`)
          .setColor(randomColor());
        message.channel.send(embed);
      } else if (args[1].indexOf("<:") >= 0) {
        const { body: buffer } = await snekfetch.get(
          `https://cdn.discordapp.com/emojis/${emoteID}.png`
        );
        const attachment = new Discord.Attachment(buffer, "image.png");
        message.channel.send(attachment);
      }
    } else {
      message.channel.send(
        "sorry but i have no idea what you are trying to see ! this is for emotes !"
      );
    }
  }
};
