const { request } = require("graphql-request");
const mongoose = require("mongoose");
const Nightmare = require("nightmare");
const vo = require("vo");
const screenshotSelector = require("nightmare-screenshot-selector");
const fs = require("fs");

exports.run = async (client, message, args) => {
  // const outputImagePath = "./test.png";

  // const nightmare = new Nightmare(); // Create the Nightmare instance.
  // return nightmare
  //   .goto("http://localhost:8080/") // Point the browser at the web server we just started.
  //   .wait("svg") // Wait until the chart appears on screen.
  //   .scrollTo(150, 0)
  //   .screenshot(outputImagePath) // Capture a screenshot to an image file.
  //   .end() // End the Nightmare session. Any queued operations are completed and the headless browser is terminated.
  //   .then(() => console.log("done"));
  //----------------------
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
          .scrollTo(rects[index].y, 0)
          .screenshot({
            //109 is height of the top element which remains
            x: rects[index].x - 10,
            y: 109,
            width: rects[index].width + 30,
            height: rects[index].height + 60
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

  //----------------------------
  // function* run() {
  //   const nightmare = new Nightmare({
  //     show: false,
  //     frame: false,
  //     maxHeight: 16384,
  //     maxWidth: 16384,
  //     width: 1200,
  //     height: 1024
  //   });
  //   const dimensions = yield nightmare
  //     .goto("http://localhost:8080/")
  //     .wait(".rv-xy-plot ")
  //     .evaluate(function() {
  //       let body = document.querySelector(".rv-xy-plot");
  //       return {
  //         width: body.scrollWidth,
  //         height: body.scrollHeight
  //       };
  //     });

  //   console.log(dimensions);
  //   yield nightmare
  //     .viewport(dimensions.width, dimensions.height)
  //     .wait(1000)
  //     .screenshot("sample.png");
  //   yield nightmare.end();
  // }

  // vo(run)(function() {
  //   console.log("done");
  // });
};
