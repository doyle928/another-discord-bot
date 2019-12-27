const Discord = require("discord.js");
const randomColor = require("../data/randomColor");
const _ = require("lodash");
const Canvas = require("canvas");
const path = require("path");
const request = require("snekfetch");
const GIFEncoder = require("gif-encoder-2");
const { writeFile } = require("fs");

module.exports = async (client, messageReaction, user) => {
  if (messageReaction._emoji.name === "⭐") {
    if (messageReaction.message.author.id === user.id) {
      let oriMsg = await messageReaction.message.channel.fetchMessage(
        messageReaction.message.id
      );
      oriMsg.reactions.map(r => {
        r.message.reactions.forEach(reaction => reaction.remove(user.id));
      });
      return;
    }
    messageReaction.message.reactions.map(async r => {
      if (r._emoji.name === "⭐") {
        if (r.count >= 3) {
          let starChannel = messageReaction.message.channel.guild.channels.find(
            channel => channel.name == "starboard"
          );
          if (!starChannel) {
            starChannel = messageReaction.message.channel.guild.channels.find(
              channel => channel.name == "memories"
            );
            if (!starChannel) {
              return messageReaction.message.channel.send(
                `you do not have a starboard channel ! please make a channel and name it exactly « starboard » ou « memories »`
              );
            }
          }
          const fetch = await starChannel.fetchMessages({ limit: 100 });

          const stars = fetch.find(
            m =>
              m.embeds.length !== 0 &&
              "footer" in m.embeds[0] &&
              "text" in m.embeds[0].footer &&
              m.embeds[0].footer.text.startsWith("⭐") &&
              m.embeds[0].footer.text.endsWith(messageReaction.message.id)
          );
          if (stars) {
            const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(
              stars.embeds[0].footer.text
            );
            const foundStar = stars.embeds[0];
            const image =
              messageReaction.message.attachments.array().length > 0 &&
              messageReaction.message.attachments.array()[0].filesize > 0
                ? await extension(
                    messageReaction,
                    messageReaction.message.attachments.array()[0].url
                  )
                : "";

            const embed = new Discord.RichEmbed()
              .setColor(foundStar.color)
              .setDescription(foundStar.description)
              .setAuthor(
                `${messageReaction.message.author.username} (${messageReaction.message.channel.name})`,
                messageReaction.message.author.displayAvatarURL
              )
              .setTimestamp()
              .setFooter(
                `⭐ ${parseInt(star[1]) + 1} | ${messageReaction.message.id}`
              )
              .setImage(image);
            const starMsg = await starChannel.fetchMessage(stars.id);
            await starMsg.edit({ embed });
          } else {
            console.log(messageReaction.message.attachments.array());

            const image =
              messageReaction.message.attachments.array().length > 0 &&
              messageReaction.message.attachments.array()[0].filesize > 0
                ? await extension(
                    messageReaction,
                    messageReaction.message.attachments.array()[0].url
                  )
                : "";
            if (image === "" && messageReaction.message.content.length < 1)
              return messageReaction.message.channel.send(
                `${user}, you cannot star an empty message.`
              );

            const embed = new Discord.RichEmbed()
              .setColor(randomColor())
              .setDescription(
                `**[► Original Message](https://discordapp.com/channels/${messageReaction.message.channel.guild.id}/${messageReaction.message.channel.id}/${messageReaction.message.id})**\n${messageReaction.message.content}`
              )
              .setAuthor(
                `${messageReaction.message.author.username} (${messageReaction.message.channel.name})`,
                messageReaction.message.author.displayAvatarURL
              )
              .setTimestamp(new Date())
              .setFooter(`⭐ 3 | ${messageReaction.message.id}`)
              .setImage(image);
            await starChannel.send({ embed });
          }
        }
      }
    });
  } else if (messageReaction._emoji.name === "✅") {
    if (messageReaction.message.id === "596040210559664139") {
      let memberRolesIdArray = [];
      let mem = await messageReaction.message.guild.fetchMember(user.id);
      if (mem) {
        mem.roles.map(r => {
          memberRolesIdArray.push(r.id);
        });

        for (let i = 0; i < memberRolesIdArray.length; i++) {
          if (memberRolesIdArray[i] === "596016686331723785") {
            memberRolesIdArray.splice(i, 1);
            memberRolesIdArray.push("561302712470208513");
            mem.setRoles(memberRolesIdArray).then(async () => {
              let c = await client.guilds
                .get("559560674246787087")
                .channels.get("561453542741901322");

              const encoder = new GIFEncoder(600, 335, "octree", false);
              // encoder
              //   .createReadStream()
              //   .pipe(fs.createWriteStream("myanimated.gif"));

              encoder.start();
              encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
              encoder.setDelay(600); // frame delay in ms
              encoder.setQuality(1); // image quality. 10 is default.

              const canvasFrame1 = Canvas.createCanvas(600, 335);

              const ctxFrame1 = canvasFrame1.getContext("2d");

              let reqPathFrame1 = path.join(
                __dirname,
                "../images/our_home_testing_frame1.png"
              );
              const backgroundFrame1 = await Canvas.loadImage(reqPathFrame1);
              ctxFrame1.drawImage(
                backgroundFrame1,
                0,
                0,
                canvasFrame1.width,
                canvasFrame1.height
              );

              // Pick up the pen
              ctxFrame1.beginPath();
              // Start the arc to form a circle
              ctxFrame1.arc(300, 85, 65, 0, Math.PI * 2, true);
              // Put the pen down
              ctxFrame1.closePath();
              // Clip off the region you drew on
              ctxFrame1.clip();

              const { body: bufferFrame1 } = await request.get(
                mem.user.displayAvatarURL
              );
              const avatarFrame1 = await Canvas.loadImage(bufferFrame1);
              await ctxFrame1.drawImage(avatarFrame1, 235, 20, 130, 130); //115

              encoder.addFrame(ctxFrame1);
              //--------------------------------------------------------- frame 1
              const canvasFrame2 = Canvas.createCanvas(600, 335);

              const ctxFrame2 = canvasFrame2.getContext("2d");

              let reqPathFrame2 = path.join(
                __dirname,
                "../images/our_home_testing_frame2.png"
              );
              const backgroundFrame2 = await Canvas.loadImage(reqPathFrame2);
              ctxFrame2.drawImage(
                backgroundFrame2,
                0,
                0,
                canvasFrame2.width,
                canvasFrame2.height
              );

              // Pick up the pen
              ctxFrame2.beginPath();
              // Start the arc to form a circle
              ctxFrame2.arc(300, 85, 65, 0, Math.PI * 2, true);
              // Put the pen down
              ctxFrame2.closePath();
              // Clip off the region you drew on
              ctxFrame2.clip();

              const { body: bufferFrame2 } = await request.get(
                mem.user.displayAvatarURL
              );
              const avatarFrame2 = await Canvas.loadImage(bufferFrame2);
              await ctxFrame2.drawImage(avatarFrame2, 235, 20, 130, 130); //115

              encoder.addFrame(ctxFrame2);
              //--------------------------------------------------------- frame 2
              encoder.finish();
              const buffer = encoder.out.getData();
              writeFile(
                path.join(__dirname, "output", "welcome.gif"),
                buffer,
                error => {
                  const attachment = new Discord.Attachment(
                    buffer,
                    "welcome-image.gif"
                  );
                                let rolesC = await client.guilds
                .get("559560674246787087")
                .channels.get("561423217709940770");
                                                let introC = await client.guilds
                .get("559560674246787087")
                .channels.get("559576694235725825");


                  c.send(attachment);
                                    c.send(
                                      `~ ${mem} ~\nWelcome to the **Our Home** !\nMake sure you to get some roles in ${rolesC} and tell us a little about yourself in ${introC} !\n<:softheart:575053165804912652>`
                                    ).catch(err=>console.error(err))

                  // gif drawn or error
                }
              );
            });
          }
        }
      } else {
        let s = await client.guilds.get("559560674246787087");
        s.fetchMember("157673412561469440").then(m =>
          m.send(
            `${user.username} reacted but i failed to give them the new role`
          )
        ).catch((err)=>console.error(err));
      }
    }
  }
  function extension(messageReaction, attachment) {
    const imageLink = attachment.split(".");
    const typeOfImage = imageLink[imageLink.length - 1];
    const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
    if (!image) return "";
    return attachment;
  }
};
