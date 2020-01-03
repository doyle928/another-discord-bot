const { request } = require("graphql-request");
const mongoose = require("mongoose");
const Nightmare = require("nightmare");
const vo = require("vo");
const screenshotSelector = require("nightmare-screenshot-selector");
const fs = require("fs");

exports.run = async (client, message, args) => {
  const nightmare = Nightmare();

  await nightmare
    .goto("https://yagpdb.xyz/public/559560674246787087/stats")
    .wait("#messages-24h")
    .wait(1000)
    .evaluate(getInnerHTML, "messages-24h")
    .then(value => {
      console.log(`${value} messages in the last 24 hours !!`);
      message.channel.send(`${value} messages in the last 24 hours !!`);
    })
    .end()
    .catch(function(err) {
      console.log(err);
      message.channel.send("i broke something");
      message.channel.send("<:deadinside:606350795881054216>");
    });

  function getInnerHTML(selector) {
    let el = document.getElementById(selector);
    return el.innerHTML;
  }
};
