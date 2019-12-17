const Discord = require("discord.js");
const randomColor = require("../data/randomColor");

module.exports = async (client, messageReaction, user) => {
  if (messageReaction._emoji.name === "⭐") {
    let starChannel = messageReaction.message.channel.guild.channels.find(
      channel => channel.name == "starboard"
    );
    if (!starChannel) {
      starChannel = messageReaction.message.channel.guild.channels.find(
        channel => channel.name == "memories"
      );
      if (!starChannel) {
        return messageReaction.message.channel.send(
          `you do not have a starboard channel ! please make a channel and name it exactly « starboard » ou « memories »`
        );
      }
    }

    const fetch = await starChannel.fetchMessages({ limit: 100 });
    const stars = fetch.find(
      m =>
        m.embeds[0].footer.text.startsWith("⭐") &&
        m.embeds[0].footer.text.endsWith(messageReaction.message.id)
    );
    if (stars) {
      const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(
        stars.embeds[0].footer.text
      );
      console.log(star[1]);
      const foundStar = stars.embeds[0];
      const image =
        messageReaction.message.attachments.array().length > 0 &&
        messageReaction.message.attachments.array()[0].filesize > 0
          ? await extension(
              messageReaction,
              messageReaction.message.attachments.array()[0].url
            )
          : "";
      const embed = new Discord.RichEmbed()
        .setColor(foundStar.color)
        .setDescription(foundStar.description)
        .setAuthor(
          `${messageReaction.message.author.username} (${messageReaction.message.channel.name})`,
          messageReaction.message.author.displayAvatarURL
        )
        .setTimestamp()
        .setFooter(
          `⭐ ${parseInt(star[1]) - 1} | ${messageReaction.message.id}`
        )
        .setImage(image);
      const starMsg = await starChannel.fetchMessage(stars.id);
      await starMsg.edit({ embed });
      if (parseInt(star[1]) - 1 <= 3) return starMsg.delete(250);
    }
  }
  function extension(messageReaction, attachment) {
    const imageLink = attachment.split(".");
    const typeOfImage = imageLink[imageLink.length - 1];
    const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
    if (!image) return "";
    return attachment;
  }
};
