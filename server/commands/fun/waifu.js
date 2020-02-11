const Discord = require("discord.js");
const Nightmare = require("nightmare");
const randColour = require("../../data/randomColor");
const talkedRecently = new Set();

exports.run = async (client, message, args) => {
  if (
    talkedRecently.has("waifu-called") &&
    message.author.id !== "157673412561469440" &&
    message.author.id !== "630573404352937996"
  ) {
    message.channel.send(
      "please not so fast !! I just need 5 secondes since the last one !!"
    );
    message.channel.send("<a:crying:661358360091688980>");
  } else {
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
        //   await nightmare.end();
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
        talkedRecently.add("waifu-called");
        setTimeout(() => {
          talkedRecently.delete("waifu-called");
        }, 5000);
      })
      .catch(function(err) {
        console.log(err);
      });

    function getBounds(selector) {
      let el = document.querySelector(selector).getAttribute("src");
      return el;
    }
  }
};
