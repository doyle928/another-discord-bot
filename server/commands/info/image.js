const gis = require("g-i-s");
const Discord = require("discord.js");
const randomColor = require("../../data/randomColor");
const randomNumber = require("../../data/randomNumber");

exports.run = async (client, message, args) => {
  if (!args[1]) {
    message.channel.send("there's no search term specified!!!");
    message.channel.send("<a:02upset:538273249306345476>");
  } else {
    let query = "";
    for (let k = 1; k < args.length; k++) {
      query += args[k] + " ";
    }
    gis(query, logResults);

    async function logResults(error, results) {
      if (error) {
        console.log(error);
        message.channel.send("i was not able to ");
        message.channel.send("<:deadinside:606350795881054216>");
      } else {
        let randomImg;
        if (results.length < 9) {
          randomImg = results[randomNumber(0, results.length - 1)];
        } else {
          randomImg = results[randomNumber(0, 9)];
        }
        let format;
        if (
          randomImg.url.indexOf(".jpg") > 0 ||
          randomImg.url.indexOf(".jpeg") > 0
        ) {
          format = "JPEG";
        } else if (randomImg.url.indexOf(".png") > 0) {
          format = "PNG";
        } else if (randomImg.url.indexOf(".gif") > 0) {
          format = "GIF";
        } else if (randomImg.url.indexOf(".webp") > 0) {
          format = "WEBP";
        } else if (randomImg.url.indexOf(".bmp") > 0) {
          format = "BMP";
        } else {
          format = "UNKOWN";
        }
        console.log(randomImg);
        let messageEmbed = new Discord.RichEmbed()
          .setColor(randomColor())
          .setTitle(`Résultat pour la recherche: ${query}`)
          .setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setImage(randomImg.url)
          .setFooter(
            `Résolution: ${randomImg.width} x ${randomImg.height} | Format: ${format}`
          )
          .setTimestamp();

        message.channel.send(messageEmbed);
      }
    }
  }
};
