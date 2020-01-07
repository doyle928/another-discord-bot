const { request } = require("graphql-request");
const Discord = require("discord.js");
const mongoose = require("mongoose");
const Nightmare = require("nightmare");
const vo = require("vo");
const screenshotSelector = require("nightmare-screenshot-selector");
const fs = require("fs");

exports.run = async (client, message, args) => {
  const nightmare = Nightmare({ width: 1080, height: 800 });

  await nightmare
    .goto("https://yagpdb.xyz/public/559560674246787087/stats")
    .wait("#channels-chart-24h")
    .wait(1000)
    .scrollTo(380, 0)
    .evaluate(getBounds, "channels-chart-24h")
    .then(function(rects) {
      console.log(rects);

      function getScreenshot(rects) {
        nightmare
          //   .scrollTo(380, 0)
          .wait(2000)
          .screenshot({
            //109 is height of the top element which remains
            x: 320,
            y: 115,
            width: 720,
            height: 433
          })
          .end()
          .then(buffer => {
            const attachment = new Discord.Attachment(
              buffer,
              "channels_graph.jpg"
            );
            message.channel.send(attachment);
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
