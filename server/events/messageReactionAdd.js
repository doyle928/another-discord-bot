const Discord = require("discord.js");
const randomColor = require("../data/randomColor");

module.exports = async (client, messageReaction, user) => {
  if (messageReaction._emoji.name === "⭐") {
    if (messageReaction.message.author.id === user.id) {
      let oriMsg = await messageReaction.message.channel.fetchMessage(
        messageReaction.message.id
      );
      oriMsg.reactions.map(r => {
        r.message.reactions.forEach(reaction => reaction.remove(user.id));
      });
      return;
    }
    messageReaction.message.reactions.map(async r => {
      if (r._emoji.name === "⭐") {
        if (r.count >= 3) {
          const starChannel = messageReaction.message.channel.guild.channels.find(
            channel => channel.name == "starboard"
          );
          if (!starChannel)
            return messageReaction.message.channel.send(
              `you do not have a starboard channel ! please make a text channel and name it exactly « starboard »`
            );

          const fetch = await starChannel.fetchMessages({ limit: 100 });

          const stars = fetch.find(
            m =>
              m.embeds.length !== 0 &&
              "footer" in m.embeds[0] &&
              "text" in m.embeds[0].footer &&
              m.embeds[0].footer.text.startsWith("⭐") &&
              m.embeds[0].footer.text.endsWith(messageReaction.message.id)
          );
          if (stars) {
            const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(
              stars.embeds[0].footer.text
            );
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
                messageReaction.message.author.tag,
                messageReaction.message.author.displayAvatarURL
              )
              .setTimestamp()
              .setFooter(
                `⭐ ${parseInt(star[1]) + 1} | ${messageReaction.message.id}`
              )
              .setImage(image);
            const starMsg = await starChannel.fetchMessage(stars.id);
            await starMsg.edit({ embed });
          } else {
            console.log(messageReaction.message.attachments.array());

            const image =
              messageReaction.message.attachments.array().length > 0 &&
              messageReaction.message.attachments.array()[0].filesize > 0
                ? await extension(
                    messageReaction,
                    messageReaction.message.attachments.array()[0].url
                  )
                : "";
            if (image === "" && messageReaction.message.cleanContent.length < 1)
              return messageReaction.message.channel.send(
                `${user}, you cannot star an empty message.`
              );

            const embed = new Discord.RichEmbed()
              .setColor(randomColor())
              .setDescription(
                `**[Go to Message ->](https://discordapp.com/channels/${messageReaction.message.channel.guild.id}/${messageReaction.message.channel.id}/${messageReaction.message.id})**\n\n${messageReaction.message.cleanContent}`
              )
              .setAuthor(
                messageReaction.message.author.tag,
                messageReaction.message.author.displayAvatarURL
              )
              .setTimestamp(new Date())
              .setFooter(`⭐ 3 | ${messageReaction.message.id}`)
              .setImage(image);
            await starChannel.send({ embed });
          }
        }
      }
    });
  }
  function extension(messageReaction, attachment) {
    const imageLink = attachment.split(".");
    const typeOfImage = imageLink[imageLink.length - 1];
    const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
    if (!image) return "";
    return attachment;
  }
};
