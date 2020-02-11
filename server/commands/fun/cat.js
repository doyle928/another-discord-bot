const Discord = require("discord.js");
const Nightmare = require("nightmare");
const randColour = require("../../data/randomColor");
const talkedRecently = new Set();

exports.run = async (client, message, args) => {
  if (
    talkedRecently.has("cat-called") &&
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
              talkedRecently.add("cat-called");
              setTimeout(() => {
                talkedRecently.delete("cat-called");
              }, 5000);
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
  }
};
