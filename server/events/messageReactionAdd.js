const Discord = require("discord.js");
const randomColor = require("../data/randomColor");
const _ = require("lodash");
const Canvas = require("canvas");
const path = require("path");
const snekfetch = require("snekfetch");
const GIFEncoder = require("gif-encoder-2");
const { writeFile } = require("fs");
let messageShipId = require("../data/messageShipId");
const { request } = require("graphql-request");

module.exports = async (client, messageReaction, user) => {
  console.log(messageReaction._emoji.name, messageReaction.message.id);
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
          const fetch = await starChannel.fetchMessages({
            limit: 100
          });

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
            await starMsg.edit({
              embed
            });
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
            await starChannel.send({
              embed
            });
          }
        }
      }
    });
  } else if (messageReaction._emoji.name === "check") {
    if (messageReaction.message.id === "662982653074472960") {
      console.log("checked rules");
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

              const { body: bufferFrame1 } = await snekfetch.get(
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

              const { body: bufferFrame2 } = await snekfetch.get(
                mem.user.displayAvatarURL
              );
              const avatarFrame2 = await Canvas.loadImage(bufferFrame2);
              await ctxFrame2.drawImage(avatarFrame2, 235, 20, 130, 130); //115

              encoder.addFrame(ctxFrame2);
              //--------------------------------------------------------- frame 2
              encoder.finish();
              const buffer = encoder.out.getData();
              let rolesC = await client.guilds
                .get("559560674246787087")
                .channels.get("561423217709940770");
              let introC = await client.guilds
                .get("559560674246787087")
                .channels.get("559576694235725825");
              writeFile(
                path.join(__dirname, "output", "welcome.gif"),
                buffer,
                error => {
                  const attachment = new Discord.Attachment(
                    buffer,
                    "welcome-image.gif"
                  );

                  c.send(attachment).then(() => {
                    c.send(
                      `~ ${mem} ~\nWelcome to the **Our Home** !\nMake sure you to get some roles in ${rolesC} and tell us a little about yourself in ${introC} ! <:softheart:575053165804912652>`
                    ).catch(err => console.error(err));
                  });
                  // gif drawn or error
                }
              );
            });
          }
        }
      } else {
        let s = await client.guilds.get("559560674246787087");
        s.fetchMember("157673412561469440")
          .then(m =>
            m.send(
              `${user.username} reacted but i failed to give them the new role`
            )
          )
          .catch(err => console.error(err));
      }
    }
  } else if (messageReaction._emoji.name === "softheart") {
    messageShipId.messageIds.map(msg => {
      if (messageReaction.message.id === msg.message_id) {
        messageReaction.message.reactions.map(async r => {
          if (r._emoji.name === "softheart") {
            if (r.count >= 5) {
              let url = "https://lulu-discord-bot.herokuapp.com/api";

              let query = `mutation {
                    addShip(guild_id: "${
                      messageReaction.message.guild.id
                    }", user_id: "${msg.member_one_id}", ship_id: "${
                msg.member_two_id
              }", timestamp: "${Date.now()}") {
                      user_id ship_id timestamp
                    }
                  }`;
              try {
                let res = await request(url, query);
                query = `mutation {
                    addShip(guild_id: "${
                      messageReaction.message.guild.id
                    }", user_id: "${msg.member_two_id}", ship_id: "${
                  msg.member_one_id
                }", timestamp: "${Date.now()}") {
                      user_id ship_id timestamp
                    }
                  }`;
                try {
                  res = await request(url, query);
                  let m1 = await messageReaction.message.guild.fetchMember(
                    msg.member_one_id
                  );
                  let m2 = await messageReaction.message.guild.fetchMember(
                    msg.member_two_id
                  );
                  // message.channel.send(
                  //   `congrats ${m1} and ${m2} you are now shipped ! <:softheart:575053165804912652>`
                  // );
                  let img = await makeCanvasImage(
                    m1.user.avatarURL,
                    m2.user.avatarURL,
                    m1.user.username,
                    m2.user.username
                  );
                  const attachment = new Discord.Attachment(img, "ship.png");
                  messageReaction.message.channel
                    .send(attachment)
                    .then(() => {
                      messageReaction.message.channel.send(
                        `<a:star:662881975530422274>  **Congrats**  <a:star:662881975530422274>\n\n${m1} and ${m2} you are now shipped !`
                      );
                      messageShipId.deleteMessageIds(m1.id);
                    })
                    .catch(err => {
                      console.error(err);
                      return message.channel.send("help i broke something !!");
                    });
                } catch (err) {
                  console.error(err);
                }
                console.log(res);
              } catch (err) {
                console.error(err);
              }
            } else if (r.count >= 3) {
              let userArray = [];
              r.users.map(u => userArray.push(u.id));
              if (
                _.includes(userArray, msg.member_one_id) &&
                _.includes(userArray, msg.member_two_id)
              ) {
                let url = "https://lulu-discord-bot.herokuapp.com/api";

                let query = `mutation {
                    addShip(guild_id: "${
                      messageReaction.message.guild.id
                    }", user_id: "${msg.member_one_id}", ship_id: "${
                  msg.member_two_id
                }", timestamp: "${Date.now()}") {
                      user_id ship_id timestamp
                    }
                  }`;
                try {
                  let res = await request(url, query);
                  query = `mutation {
                    addShip(guild_id: "${
                      messageReaction.message.guild.id
                    }", user_id: "${msg.member_two_id}", ship_id: "${
                    msg.member_one_id
                  }", timestamp: "${Date.now()}") {
                      user_id ship_id timestamp
                    }
                  }`;
                  try {
                    res = await request(url, query);
                    let m1 = await messageReaction.message.guild.fetchMember(
                      msg.member_one_id
                    );
                    let m2 = await messageReaction.message.guild.fetchMember(
                      msg.member_two_id
                    );
                    // message.channel.send(
                    //   `congrats ${m1} and ${m2} you are now shipped ! <:softheart:575053165804912652>`
                    // );
                    let img = await makeCanvasImage(
                      m1.user.avatarURL,
                      m2.user.avatarURL,
                      m1.user.username,
                      m2.user.username
                    );
                    const attachment = new Discord.Attachment(img, "ship.png");
                    messageReaction.message.channel
                      .send(attachment)
                      .then(() => {
                        messageReaction.message.channel.send(
                          `<a:star:662881975530422274>  **Congrats**  <a:star:662881975530422274>\n\n${m1} and ${m2} you are now shipped !`
                        );
                        messageShipId.deleteMessageIds(m1.id);
                      })
                      .catch(err => {
                        console.error(err);
                        return message.channel.send(
                          "help i broke something !!"
                        );
                      });
                  } catch (err) {
                    console.error(error);
                  }
                  console.log(res);
                } catch (err) {
                  console.error(err);
                }
              }
            }
          }
        });
      }
    });
  } else if (messageReaction.message.id === "663149701687672862") {
    //age roles
    let removeArray = [
      {
        id: "561441866525048842",
        name: "regional_indicator_a"
      },
      {
        id: "561441985236434945",
        name: "regional_indicator_b"
      },
      {
        id: "561442059567890442",
        name: "regional_indicator_c"
      },
      {
        id: "561442124592054292",
        name: "regional_indicator_d"
      },
      {
        id: "561442214572589077",
        name: "regional_indicator_e"
      }
    ];
    if (messageReaction._emoji.name === "regional_indicator_a") {
      addRoleRemoveOthers(removeArray, "561441866525048842");
    } else if (messageReaction._emoji.name === "regional_indicator_b") {
      addRoleRemoveOthers(removeArray, "561441985236434945");
    } else if (messageReaction._emoji.name === "regional_indicator_c") {
      addRoleRemoveOthers(removeArray, "561442059567890442");
    } else if (messageReaction._emoji.name === "regional_indicator_d") {
      addRoleRemoveOthers(removeArray, "561442124592054292");
    } else if (messageReaction._emoji.name === "regional_indicator_e") {
      addRoleRemoveOthers(removeArray, "561442214572589077");
    }
  } else if (messageReaction.message.id === "663150060904644608") {
    //personality roles
    let removeArray = [
      {
        id: "561443343842934806",
        name: "regional_indicator_i"
      },
      {
        id: "561443427107995660",
        name: "regional_indicator_e"
      },
      {
        id: "561443500491800578",
        name: "regional_indicator_a"
      }
    ];
    if (messageReaction._emoji.name === "regional_indicator_i") {
      addRoleRemoveOthers(removeArray, "561443343842934806");
    } else if (messageReaction._emoji.name === "regional_indicator_r") {
      addRoleRemoveOthers(removeArray, "561443427107995660");
    } else if (messageReaction._emoji.name === "regional_indicator_a") {
      addRoleRemoveOthers(removeArray, "561443500491800578");
    }
  } else if (messageReaction.message.id === "663150398458167306") {
    //gaming
    if (messageReaction._emoji.name === "regional_indicator_p") {
      addRole("561443526617989129");
    } else if (messageReaction._emoji.name === "regional_indicator_x") {
      addRole("561443723330846722");
    } else if (messageReaction._emoji.name === "regional_indicator_s") {
      addRole("561443758487371776");
    } else if (
      messageReaction._emoji.name === "desktop" ||
      messageReaction._emoji.name === "desktop_computer"
    ) {
      addRole("561443809712537625");
    } else if (messageReaction._emoji.name === "iphone") {
      addRole("561443842688155658");
    }
  } else if (messageReaction.message.id === "663150874184646713") {
    //relationship roles
    let removeArray = [
      {
        id: "561444125476651009",
        name: "woman_tipping_hand"
      },
      {
        id: "561444242778750978",
        name: "heart"
      },
      {
        id: "561444283400454146",
        name: "speak_no_evil"
      }
    ];
    if (messageReaction._emoji.name === "woman_tipping_hand") {
      addRoleRemoveOthers(removeArray, "561444125476651009");
    } else if (messageReaction._emoji.name === "heart") {
      addRoleRemoveOthers(removeArray, "561444242778750978");
    } else if (messageReaction._emoji.name === "speak_no_evil") {
      addRoleRemoveOthers(removeArray, "561444283400454146");
    }
  } else if (messageReaction.message.id === "663151089054646315") {
    //dm roles
    let removeArray = [
      {
        id: "561443898266746893",
        name: "white_check_mark"
      },
      {
        id: "561444015472377876",
        name: "x"
      },
      {
        id: "561444049828184074",
        name: "question"
      }
    ];
    if (messageReaction._emoji.name === "white_check_mark") {
      addRoleRemoveOthers(removeArray, "561443898266746893");
    } else if (messageReaction._emoji.name === "x") {
      addRoleRemoveOthers(removeArray, "561444015472377876");
    } else if (messageReaction._emoji.name === "question") {
      addRoleRemoveOthers(removeArray, "561444049828184074");
    }
  } else if (messageReaction.message.id === "663151396727554059") {
    //interests
    if (messageReaction._emoji.name === "shallow_pan_of_food") {
      addRole("561442784272318485");
    } else if (messageReaction._emoji.name === "🐶") {
      addRole("561442865457135626");
    } else if (messageReaction._emoji.name === "sunrise_over_mountains") {
      addRole("561442912211042309");
    } else if (messageReaction._emoji.name === "soccer") {
      addRole("561442956532514826");
    } else if (messageReaction._emoji.name === "musical_note") {
      addRole("561443003617509396");
    } else if (messageReaction._emoji.name === "blue_car") {
      addRole("561443031983587331");
    } else if (messageReaction._emoji.name === "books") {
      addRole("561443068927148034");
    } else if (messageReaction._emoji.name === "tv") {
      addRole("561443115869798423");
    } else if (messageReaction._emoji.name === "computer") {
      addRole("561443156642627611");
    } else if (messageReaction._emoji.name === "hibiscus") {
      addRole("561443189123448842");
    } else if (messageReaction._emoji.name === "paintbrush") {
      addRole("561443216528769024");
    } else if (messageReaction._emoji.name === "video_game") {
      addRole("561443255821271040");
    } else if (messageReaction._emoji.name === "womans_clothes") {
      addRole("561443309667745805");
    }
  } else if (messageReaction.message.id === "663153065565618190") {
    //vc role
    if (messageReaction._emoji.name === "microphone2") {
      addRole("663148896046022707");
    }
  }

  function extension(messageReaction, attachment) {
    const imageLink = attachment.split(".");
    const typeOfImage = imageLink[imageLink.length - 1];
    const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
    if (!image) return "";
    return attachment;
  }

  async function makeCanvasImage(avatarURL1, avatarURL2, username1, username2) {
    const canvas = Canvas.createCanvas(450, 259);

    const ctx = canvas.getContext("2d");

    let txt = `${username1.replace(/([^A-Za-z])/g, "")}  &  ${username2.replace(
      /([^A-Za-z])/g,
      ""
    )}`;

    let ttfPath = path.join(__dirname, "../fonts/birds.ttf");

    Canvas.registerFont(ttfPath, { family: "birds" });
    ctx.textAlign = "center";

    ctx.font = "30px birds";
    ctx.lineWidth = 3;
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    let txtWidth = ctx.measureText(txt).width;
    console.log(txt, txtWidth, 225 - Number(txtWidth));
    console.log(txt);

    let reqPath = path.join(__dirname, "../images/ship_finish.png");
    const background = await Canvas.loadImage(reqPath);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(140, 79, 58, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.arc(259, 113, 58, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.strokeText(`${txt}`, 225, 245);
    ctx.fillText(`${txt}`, 225, 245);
    ctx.clip();

    // let shipFont = await opentype.loadSync(ttfPath);

    const { body: buffer1 } = await snekfetch.get(avatarURL1);
    const avatar1 = await Canvas.loadImage(buffer1);
    await ctx.drawImage(avatar1, 82, 21, 115, 115);

    const { body: buffer2 } = await snekfetch.get(avatarURL2);
    const avatar2 = await Canvas.loadImage(buffer2);
    await ctx.drawImage(avatar2, 201, 55, 115, 115);
    console.log(avatarURL1, avatarURL2);
    // let fontPath = shipFont.getPath(txt, 0, 200, 26);
    // fontPath.draw(ctx);

    return canvas.toBuffer();
  }

  async function removeReaction(base, messageId, emoteName) {
    let oriMsg = await messageReaction.message.channel.fetchMessage(messageId);
    oriMsg.reactions.map(r => {
      r.message.reactions.forEach(reaction => {
        if (reaction.name === emoteName) {
          reaction.remove(user.id);
        }
      });
    });
    return;
  }

  async function addRoleRemoveOthers(removeArray, roleToAdd) {
    let memberRolesIdArray = [];
    let mem = await messageReaction.message.guild.fetchMember(user.id);
    if (mem) {
      mem.roles.map(r => {
        memberRolesIdArray.push(r.id);
      });
      for (let i = 0; i < memberRolesIdArray.length; i++) {
        for (let j = 0; j < removeArray; j++) {
          if (memberRolesIdArray[i] === removeArray[j].id) {
            memberRolesIdArray.splice(i, 1);
            removeReaction(
              messageReaction,
              messageReaction.message.id,
              removeArray[j].name
            );
          }
        }
      }
      memberRolesIdArray.push(roleToAdd);
      mem.setRoles(memberRolesIdArray);
    }
  }
  async function addRole(roleToAdd) {
    let memberRolesIdArray = [];
    let mem = await messageReaction.message.guild.fetchMember(user.id);
    if (mem) {
      mem.roles.map(r => {
        memberRolesIdArray.push(r.id);
      });
      memberRolesIdArray.push(roleToAdd);
      mem.setRoles(memberRolesIdArray);
    }
  }
};
