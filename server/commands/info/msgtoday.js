const Nightmare = require("nightmare");
const Discord = require("discord.js");
const randomColor = require("../../data/randomColor");

exports.run = async (client, message, args) => {
  const nightmare = Nightmare();

  await nightmare
    .goto("https://yagpdb.xyz/public/559560674246787087/stats")
    .wait("#messages-24h")
    .wait(1000)
    .evaluate(getInnerHTML, "messages-24h")
    .then(value => {
      console.log(`${value} messages in the last 24 hours !!`);
      // message.channel.send(`${value} messages in the last 24 hours !!`);
      let messageEmbed = new Discord.RichEmbed()
        .setColor(randomColor())
        .setAuthor("Message count")
        .setDescription(`${value} messages in the last 24 hours !`);
      message.channel.send(messageEmbed);
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
