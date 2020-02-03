const Discord = require("discord.js");
const randomColor = require("../../data/randomColor");
const { request } = require("graphql-request");

exports.run = async (client, message, args) => {
  let url = "https://lulu-discord-bot.herokuapp.com/api";

  let query = `query {
            getUser(guild_id: "${message.guild.id}", user_id: "${message.author.id}") {
              guild_id user_id welcome_points
            }
          }`;
  try {
    let res = await request(url, query);
    if (res.getUser.welcome_points >= 10000) {
      message.channel
        .send(
          `What would you like to buy ?\n\n1 : 10.000 - 1 month custom role\n2 : 50.000 - permanent custom role\n\nplease respond with 1 or 2`
        )
        .then(() => {
          message.channel
            .awaitMessages(res => res.author.id === message.author.id, {
              maxMatches: 1,
              time: 60000,
              errors: ["time"]
            })
            .then(async collected => {
              if (collected.first().content === 1) {
                message.channel
                  .send(
                    `so you want to by the 1 month role for 10.000 !\nwhat do you want the name of it to be ??`
                  )
                  .then(() => {
                    message.channel
                      .awaitMessages(
                        res => res.author.id === message.author.id,
                        {
                          maxMatches: 1,
                          time: 60000,
                          errors: ["time"]
                        }
                      )
                      .then(async collected => {
                        let roleName = collected.first().content;
                        message.channel
                          .send(
                            `what colour do you want it to be ?\ni prefer hex values like #fdd1ff !!`
                          )
                          .then(() => {
                            message.channel
                              .awaitMessages(
                                res => res.author.id === message.author.id,
                                {
                                  maxMatches: 1,
                                  time: 60000,
                                  errors: ["time"]
                                }
                              )
                              .then(async collected => {
                                let roleColour = collected.first().content;
                                message.guild
                                  .createRole({
                                    name: roleName,
                                    color: roleColour,
                                    hoist: true,
                                    position: 75
                                  })
                                  .then(async role => {
                                    await message.member.addRole(role.id);
                                    await message.channel.send(
                                      `done ! enjoy your new role !\nyou have ${res
                                        .getUser.welcome_points -
                                        10000} points left now !`
                                    );
                                    let c = await client.channels.get(
                                      "561372938474094603"
                                    );
                                    let embed = new Discord.RichEmbed()
                                      .setDescription(
                                        `**${message.author.username}** just bought a 1 month custom role !\n\nRole : ${roleName}`
                                      )
                                      .setColor(randomColor());
                                    c.send(embed);
                                    query = `mutation {
                              addWelcomePoints(guild_id: "${
                                message.guild
                              }", user_id: "${
                                      message.author.id
                                    }", welcome_points: ${res.getUser
                                      .welcome_points - 10000}) {
                                guild_id user_id welcome_points
                              }
                            }`;
                                    try {
                                      await request(url, query);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  })
                                  .catch(console.error);
                              });
                          });
                      });
                  });
              } else if (collected.first().content === 2) {
                if (res.getUser.welcome_points >= 50000) {
                  message.channel
                    .send(
                      `so you want to by the permanent role for 50.000 !\nwhat do you want the name of it to be ??`
                    )
                    .then(() => {
                      message.channel
                        .awaitMessages(
                          res => res.author.id === message.author.id,
                          {
                            maxMatches: 1,
                            time: 60000,
                            errors: ["time"]
                          }
                        )
                        .then(async collected => {
                          let roleName = collected.first().content;
                          message.channel
                            .send(
                              `what colour do you want it to be ?\ni prefer hex values like #fdd1ff !!`
                            )
                            .then(() => {
                              message.channel
                                .awaitMessages(
                                  res => res.author.id === message.author.id,
                                  {
                                    maxMatches: 1,
                                    time: 60000,
                                    errors: ["time"]
                                  }
                                )
                                .then(async collected => {
                                  let roleColour = collected.first().content;
                                  message.guild
                                    .createRole({
                                      name: roleName,
                                      color: roleColour,
                                      hoist: true,
                                      position: 75
                                    })
                                    .then(async role => {
                                      await message.member.addRole(role.id);
                                      await message.channel.send(
                                        `done ! enjoy your new role !\nyou have ${res
                                          .getUser.welcome_points -
                                          10000} points left !`
                                      );
                                      let c = await client.channels.get(
                                        "561372938474094603"
                                      );
                                      let embed = new Discord.RichEmbed()
                                        .setDescription(
                                          `**${message.author.username}** just bought a permanent custom role !\n\nRole : ${roleName}`
                                        )
                                        .setColor(randomColor());
                                      c.send(embed);

                                      query = `mutation {
                              addWelcomePoints(guild_id: "${
                                message.guild
                              }", user_id: "${
                                        message.author.id
                                      }", welcome_points: ${res.getUser
                                        .welcome_points - 50000}) {
                                guild_id user_id welcome_points
                              }
                            }`;
                                      try {
                                        await request(url, query);
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    })
                                    .catch(console.error);
                                });
                            });
                        });
                    });
                } else {
                  message.channel.send(
                    `you dont have enough points ! you need 50.000 ! you need **${50000 -
                      res.getUser.welcome_points} more** !`
                  );
                }
              }
            });
        });
    }
  } catch (err) {
    console.error(err);
  }
};
