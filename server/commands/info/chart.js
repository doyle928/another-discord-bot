const Nightmare = require("nightmare");

exports.run = async (client, message, args) => {
  const nightmare = Nightmare();

  await nightmare
    .goto("https://lulu-discord-bot.herokuapp.com/")
    .wait("svg")
    .evaluate(getBounds, "svg")
    .then(function(rects) {
      console.log(rects);

      function getScreenshot(rects, index) {
        if (index == rects.length) return;
        nightmare
          .wait(`.server-${message.guild.id}`)
          .click(`.server-${message.guild.id}`)
          .wait("svg")
          .scrollTo(rects[index].y, 0)
          .screenshot({
            //109 is height of the top element which remains
            x: rects[index].x - 10,
            y: 109,
            width: rects[index].width + 30,
            height: rects[index].height + 40
          })
          .end()
          .then(buffer => {
            message.channel.send({
              files: [buffer]
            });
          })
          .catch(function(err) {
            console.log(err);
          });
      }

      getScreenshot(rects, 0);
    })
    .catch(function(err) {
      console.log(err);
    });

  function getBounds(selector) {
    var elements = document.querySelectorAll(selector);
    if (elements && elements.length > 0) {
      var arr = [];
      const r = Math.round;
      for (var ii = 0; ii < elements.length; ii++) {
        var rect = elements[ii].getBoundingClientRect();
        arr.push({
          x: r(rect.left),
          y: r(rect.top),
          width: r(rect.width),
          height: r(rect.height)
        });
      }
      console.log("Elements found: ", arr.length);
      console.log(arr);
      return arr;
    }
    return null;
  }
};
