const Discord = require("discord.js");
const Nightmare = require("nightmare");
const randColour = require("../../data/randomColor");

exports.run = async (client, message, args) => {
  const nightmare = Nightmare({
    show: false,
    width: 1080,
    height: 1080
  });

  await nightmare
    .useragent(
      "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36"
    )
    .goto("https://www.thiswaifudoesnotexist.net/")
    .wait("img")
    .evaluate(getBounds, "img")
    .end()
    .then(async el => {
      console.log(el);
      if (el.indexOf("https:") === -1) {
        el = `https:${el}`;
      }
      const embed = new Discord.RichEmbed()
        .setDescription(
          `**${message.author.username}** here is your deep learning generated waifu <:softheart:575053165804912652>`
        )
        .setImage(el)
        .setColor(randColour())
        .setTimestamp();
      message.channel.send(embed);
    })
    .catch(function(err) {
      console.log(err);
    });
};
