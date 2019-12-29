const randomNumber = require("../../data/randomNumber");
const randomColor = require("../../data/randomColor");
const Discord = require("discord.js");
const _ = require("lodash");
const { request } = require("graphql-request");
let messageShipId = require("../../data/messageShipId");
const Canvas = require("canvas");
const path = require("path");
const snekfetch = require("snekfetch");

exports.run = async (client, message, args) => {
  console.log(message.content, _.size(message.mentions.members));
  let url = "https://lulu-discord-bot.herokuapp.com/api";

  if (args.length === 1) {
    let query = `{
            getShips(guild_id: "${message.guild.id}") {
              user_id ship_id timestamp
            }
          }`;
    try {
      let res = await request(url, query);
      if (res.getShips === null || res.getShips === []) {
        message.channel.send("there are no ships in the serveur !");
      } else {
        console.log(res.getShips);
      }
    } catch (err) {
      console.error(err);
      message.channel.send("i broke something");
      return message.channel.send("<:deadinside:606350795881054216>");
    }
  } else if (_.size(message.mentions.members) === 1) {
    console.log(message.mentions.members.first().user.username);
    //get ship status
    if (message.mentions.members.first().user.id === "601825955572350976") {
      message.channel.send("i'm a bot, i dont need a boy");
      return message.channel.send("<:scared:658963912099758080>");
    }
    let query = `{
            getShip(guild_id: "${message.guild.id}", user_id: "${
      message.mentions.members.first().id
    }") {
              user_id ship_id timestamp
            }
          }`;
    try {
      let res = await request(url, query);
      console.log(res);
      if (res.getShip === null) {
        message.channel.send(
          `${
            message.mentions.members.first().user.username
          } is not shipped with anyone ! `
        );
        setTimeout(() => {
          message.channel.send(`maybe you should ask them ! `);
          message.channel.send("<:winkNue:660603639542579232>");
        }, 800);
        // message.channel
        //   .send(`${message.mentions.members.first().user.username} is not shipped with anyone !\ndo you want to ship them with someone ?`)
        //   .then(m => {
        //     message.channel.awaitMessages(res => res.author.id === message.author.id, {
        //         max: 1,
        //         time: 60000,
        //         errors: ["time"]
        //       })
        //       .then(collected => {
        //         if (collected.first().content.toLowerCase().replace(/\s/g, "") === "y" ||
        //           collected.first().content.toLowerCase().replace(/\s/g, "").indexOf("yes") >= -1 ||
        //           collected.first().content.toLowerCase().replace(/\s/g, "").indexOf("yeah") >= -1 ||
        //           collected.first().content.toLowerCase().replace(/\s/g, "").indexOf("yep") >= -1
        //         ) {
        //           message.channel.send("who do you want to ship them with ??")
        //             .then(m => {
        //               message.channel.awaitMessages(res => res.author.id === message.author.id,
        //                   {
        //                     max: 1,
        //                     time: 60000,
        //                     errors: ["time"]
        //                   }
        //                 )
        //                 .then(async collected => {
        //                   if (collected.first().author.id === message.author.id) {
        //                     return message.channel.send("you cannot ship you with yourself weirdo !");
        //                   } else {
        //                     query = `{
        //                             getShip(guild_id: "${
        //                               message.guild.id
        //                             }", user_id: "${
        //                       collected.first().author.id
        //                     }") {
        //                                 user_id ship_id timestamp
        //                             }
        //                         }`;
        //                     try {
        //                       res = await request(url, query);
        //                       console.log(res);
        //                       if (res.getShip === null) {
        //                         message.channel
        //                           .send(
        //                             `${memberOne.user.username} x ${
        //                               collected.first().author.username
        //                             }`
        //                           )
        //                           .then(m => {
        //                             m.react("575053165804912652");
        //                             messageShipId.addMessageId(m.id);
        //                           });
        //                       } else {
        //                         message.channel.send(`${collected.first().author.username} is already shipped with ${res.getShip.ship_id}`);
        //                         console.log(res.getShip);
        //                       }
        //                     } catch (err) {
        //                       console.error(err);
        //                       message.channel.send("i broke something");
        //                       return message.channel.send("<:deadinside:606350795881054216>");
        //                     }
        //                   }
        //                 });
        //             });
        //         }
        //       });
        //   });
      } else {
        return message.channel.send(
          `sorry but ${
            message.mentions.members.first().user.username
          } is already shipped with someone else !`
        );
        console.log(res.getShip);
      }
    } catch (err) {
      console.error(err);
      message.channel.send("i broke something");
      return message.channel.send("<:deadinside:606350795881054216>");
    }
  } else if (_.size(message.mentions.members) === 2) {
    let memberArray = [];
    message.mentions.members.map(m => memberArray.push(m));
    if (
      memberArray[0].user.id === "601825955572350976" ||
      memberArray[1].user.id === "601825955572350976"
    ) {
      if (
        message.author.id === memberArray[0].user.id ||
        message.author.id === memberArray[1].user.id
      ) {
        message.channel.send(
          "i'm not a real boy, you cannot be shipped with me weirdo"
        );
        message.channel.send("<:scared:658963912099758080>");
        return setTimeout(() => {
          message.author.send("<:yes:660599155378618371>");
        }, 1500);
      }
    } else {
      //check if both can be shipped
      let query = `{
            getShip(guild_id: "${message.guild.id}", user_id: "${memberArray[0].user.id}") {
              user_id ship_id timestamp
            }
          }`;
      try {
        let res = await request(url, query);
        console.log(res);
        if (res.getShip === null) {
          let query = `{
            getShip(guild_id: "${message.guild.id}", user_id: "${memberArray[1].user.id}") {
              user_id ship_id timestamp
            }
          }`;
          try {
            res = await request(url, query);
            console.log(res);
            if (res.getShip === null) {
              if (memberArray.length === 2) {
                let img = await makeCanvasImage(
                  memberArray[0].user.avatarURL,
                  memberArray[1].user.avatarURL
                );
                const attachment = new Discord.Attachment(img, "ship.png");
                message.channel
                  .send(
                    `__**New Ship**__ 🚢\n\n**${memberArray[0]}** <:softheart:575053165804912652> **${memberArray[1]}**\n\nBoth people please click the heart reaction below to confirm ship\n- or -\n5 people in the server can react with the heart to confirm ship`,
                    attachment
                  )
                  .then(m => {
                    m.react("575053165804912652");
                    messageShipId.addMessageId(
                      m.id,
                      memberArray[0].user.id,
                      memberArray[1].user.id
                    );
                  });
              }
            } else {
              //list current ship status, like with who and when
              console.log(res.getShip);
              return message.channel.send(
                `sorry but ${memberArray[1].user.username} is already shipped with someone else !`
              );
            }
          } catch (err) {
            console.error(err);
            message.channel.send("i broke something");
            return message.channel.send("<:deadinside:606350795881054216>");
          }
        } else {
          //list current ship status, like with who and when
          console.log(res.getShip);
          return message.channel.send(
            `sorry but ${memberArray[0].user.username} is already shipped with someone else !`
          );
        }
      } catch (err) {
        console.error(err);
        message.channel.send("i broke something");
        return message.channel.send("<:deadinside:606350795881054216>");
      }
    }
  } else if (_.size(message.mentions.members) > 2) {
    message.channel.send("you cannot ship more than 2 people weirdo !");
    return message.channel.send("<:nicoSIPP:606364812561219594>");
  } else if (
    args[1].toLowerCase() === "leave" ||
    args[1].toLowerCase() === "breakup" ||
    args[1].toLowerCase() === "end"
  ) {
    //remove ship
    let url = "https://lulu-discord-bot.herokuapp.com/api";
    let query = `{
            getShip(guild_id: "${message.guild.id}", user_id: "${message.author.id}") {
              user_id ship_id timestamp
            }
          }`;
    try {
      let res = await request(url, query);
      if (res.getShip !== null) {
        let query = `mutation{
            deleteShip(guild_id: "${message.guild.id}", user_id: "${message.author.id}") {
              user_id
            }
          }`;
        try {
          await request(url, query);
          query = `mutation{
            deleteShip(guild_id: "${message.guild.id}", user_id: "${res.getShip.ship_id}") {
              user_id
            }
          }`;
          try {
            await request(url, query);
            messageShipId.deleteMessageIds(message.author.id);
            message.channel.send(`${message.author} you are free !`);
            console.log(res);
          } catch (err) {
            console.error(err);
            message.channel.send("i broke something");
            return message.channel.send("<:deadinside:606350795881054216>");
          }
        } catch (err) {
          console.error(err);
          message.channel.send("i broke something");
          return message.channel.send("<:deadinside:606350795881054216>");
        }
      } else {
        message.channel.send(
          `${message.author} you are not even shipped with anyone weirdo !`
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function makeCanvasImage(avatarURL1, avatarURL2) {
    const canvas = Canvas.createCanvas(600, 338);

    const ctx = canvas.getContext("2d");

    let reqPath = path.join(__dirname, "../../images/ship.png");
    const background = await Canvas.loadImage(reqPath);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(146, 120, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.arc(437, 222, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const { body: buffer1 } = await snekfetch.get(avatarURL1);
    const avatar1 = await Canvas.loadImage(buffer1);
    await ctx.drawImage(avatar1, 46, 20, 200, 200);

    const { body: buffer2 } = await snekfetch.get(avatarURL2);
    const avatar2 = await Canvas.loadImage(buffer2);
    await ctx.drawImage(avatar2, 337, 122, 200, 200);

    return canvas.toBuffer();
  }
};
