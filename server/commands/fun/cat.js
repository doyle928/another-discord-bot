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
    .goto("https://thiscatdoesnotexist.com/")
    .wait("img")
    .cookies.clearAll()
    .evaluate(getBounds, "img")
    .then(async rects => {
      console.log(rects);

      function getScreenshot(rect) {
        nightmare
          .screenshot({
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height
          })
          .end()
          .then(buffer => {
            const embed = new Discord.RichEmbed()
              .setDescription(
                `**${message.author.username}** here is your deep learning generated cat !\nMake sure to take good care of it !! <:softheart:575053165804912652>`
              )
              .attachFiles([{ name: "cat.png", attachment: buffer }])
              .setImage("attachment://cat.png")
              .setColor(randColour())
              .setTimestamp();
            message.channel.send(embed);
          })
          .catch(function(err) {
            console.log(err);
          });
      }

      getScreenshot(rects);
    })
    .catch(function(err) {
      console.log(err);
    });

  async function getBounds(selector) {
    let obj = {
      top: document.querySelector(selector).offsetTop,
      left: document.querySelector(selector).offsetLeft,
      width: document.querySelector(selector).offsetWidth,
      height: document.querySelector(selector).offsetHeight
    };
    return obj;
  }
};
