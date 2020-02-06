const Nightmare = require("nightmare");
const Discord = require("discord.js");
const randomColor = require("../../data/randomColor");
const randomNum = require("../../data/randomNumber");
const talkedRecently = new Set();

exports.run = async (client, message, args) => {
  if (
    message.channel.id === "561453542741901322" &&
    message.author.id !== "157673412561469440"
  ) {
    message.channel.send("sorry but i'm not allowed in here anymore !");
    message.channel.send("<a:crying:661358360091688980>");
  } else {
    if (
      talkedRecently.has("image-called") &&
      message.author.id !== "157673412561469440"
    ) {
      message.channel.send("please not so fast please !!");
      message.channel.send("<a:crying:661358360091688980>");
    } else {
      const nightmare = Nightmare({
        show: false
      });

      let query = message.content.replace(".image ", "").trim();
      query = query.replace(/[\s]/g, "%20");
      console.log(query);
      await nightmare
        .goto(`https://www.qwant.com/?q=${query}&t=images`)
        .wait(".results-column")
        .wait(500)
        .evaluate(async () => {
          return await Array.from(
            document.querySelectorAll(".result__thumb-container__image"),
            element =>
              (element = {
                src: element.dataset.original,
                resolution: `Résolution: ${element.dataset.naturalwidth} x ${element.dataset.naturalheight}`
              })
          );
        })
        .end()
        .then(imgs => {
          let format = link => {
            let str = "Format: ";
            if (link.toLowerCase().indexOf(".jpg") >= 0) {
              return str + "JPG";
            } else if (link.toLowerCase().indexOf(".jpeg") >= 0) {
              return str + "JPEG";
            } else if (link.toLowerCase().indexOf(".bmp") >= 0) {
              return str + "BMP";
            } else if (link.toLowerCase().indexOf(".gif") >= 0) {
              return str + "GIF";
            } else if (link.toLowerCase().indexOf(".png") >= 0) {
              return str + "PNG";
            } else if (link.toLowerCase().indexOf(".tiff") >= 0) {
              return str + "TIFF";
            } else if (link.toLowerCase().indexOf(".svg") >= 0) {
              return str + "SVG";
            } else {
              return str + "???";
            }
          };

          console.log(imgs);
          if (imgs.length === 0) {
            message.channel.send(
              `sorry but i looked everywhere and could not find anything for ${message.content
                .replace(".image ", "")
                .trim()}`
            );
            message.channel.send("<:confusedKanna:665372884402962432>");
            talkedRecently.add("image-called");
            setTimeout(() => {
              talkedRecently.delete("image-called");
            }, 45000);
          } else {
            let img =
              imgs.length > 10
                ? imgs[randomNum(0, 9)]
                : imgs[randomNum(0, imgs.length - 1)];
            let embed = new Discord.RichEmbed()
              .setAuthor(
                message.author.username,
                message.author.displayAvatarURL
              )
              .setColor(randomColor())
              .setTitle(
                `Résultat pour la recherche: ${message.content
                  .replace(".image ", "")
                  .trim()}`
              )
              .setImage(img.src)
              .setFooter(`${img.resolution} | ${format(img.src)}`)
              .setTimestamp();
            message.channel.send(embed);
            talkedRecently.add("image-called");
            setTimeout(() => {
              talkedRecently.delete("image-called");
            }, 45000);
          }
        })
        .catch(function(err) {
          console.log(err);
          message.channel.send("i broke something");
          message.channel.send("<:deadinside:606350795881054216>");
          talkedRecently.add("image-called");
          setTimeout(() => {
            talkedRecently.delete("image-called");
          }, 30000);
        });
    }
  }
};
