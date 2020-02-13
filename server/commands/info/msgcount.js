const Discord = require("discord.js");
const Nightmare = require("nightmare");

exports.run = async (client, message, args) => {
  message.channel.startTyping();

  const nightmare = Nightmare({ width: 1080, height: 800 });

  await nightmare
    .goto(`https://yagpdb.xyz/public/${message.guild.id}/stats`)
    .wait("#chart-message-counts")
    .wait(1103)
    .scrollTo(1503, 0)
    .evaluate(getBounds, "chart-message-counts")
    .then(function(rects) {
      console.log(rects);

      function getScreenshot(rects) {
        nightmare
          //   .scrollTo(380, 0)
          .wait(2000)
          .screenshot({
            //109 is height of the top element which remains
            x: 320,
            y: 315,
            width: 720,
            height: 433
          })
          .end()
          .then(buffer => {
            const attachment = new Discord.Attachment(
              buffer,
              "channels_graph.jpg"
            );
            message.channel
              .send(attachment)
              .then(() => message.channel.stopTyping(true));
          })
          .catch(function(err) {
            console.log(err);
          });
      }

      getScreenshot(rects);
    })
    .catch(function(err) {
      console.log(err);
      message.channel.stopTyping(true);
    });

  function getBounds(selector) {
    var element = document.getElementById(selector);
    console.log(element);
    if (element) {
      var obj = {};
      const r = Math.round;

      var rect = element.getBoundingClientRect();
      console.log(rect);
      obj = {
        x: r(rect.left),
        y: r(rect.top),
        width: r(rect.width),
        height: r(rect.height)
      };

      console.log("Element found: ", obj);
      return obj;
    }
    return null;
  }
};
