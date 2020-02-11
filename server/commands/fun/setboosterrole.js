const { request } = require("graphql-request");

exports.run = async (client, message, args) => {
  let s = await client.guilds.get("559560674246787087");

  if (s.members.has(message.author.id)) {
    let mem = await s.fetchMember(message.author.id);
    if (mem._roles.includes("594325820172926977")) {
      let url = "https://lulu-discord-bot.herokuapp.com/api";
      let query = `{
                getBoosterRoles(guild_id: "${s.id}", booster: ${true}) {
                    guild_id user_id booster_role
                }
            }`;
      try {
        boosterRoles = await request(url, query);
        let haveRoleBool = false;
        for (let i in boosterRoles.getBoosterroles) {
          if (boosterRoles.getBoosterroles[i].user_id === message.author.id) {
            haveRoleBool = true;
          }
        }
        if (!haveRoleBool) {
          message.channel
            .send(
              `thank you again for boosting !!\nwhat would you like the name of your custom role to be ?`
            )
            .then(() => {
              message.channel
                .awaitMessages(res => res.author.id === message.author.id, {
                  maxMatches: 1,
                  time: 120000,
                  errors: ["time"]
                })
                .then(async collected => {
                  let roleName = collected.first().content.trim();
                  message.channel
                    .send(
                      `okay you want the role to be named **${roleName}** !\nwhat colour would you like it ? please use a hex code value like #fdd1ff !!`
                    )
                    .then(async () => {
                      message.channel
                        .awaitMessages(
                          res => res.author.id === message.author.id,
                          {
                            maxMatches: 1,
                            time: 120000,
                            errors: ["time"]
                          }
                        )
                        .then(async collected => {
                          let roleColor = collected.first().content.trim();
                          s.createRole({
                            name: `${roleName}`,
                            color: `${roleColor}`,
                            hoist: true,
                            position: 80
                          }).then(async role => {
                            await mem.addRole(role.id);
                            await message.channel.send(
                              `okay i gave you the role !\n\nsome useful commands\n**.setcolour #hex-code** - will change the colour of this role\n**.setrolename name** - will change the name of this role`
                            );

                            let url =
                              "https://lulu-discord-bot.herokuapp.com/api";
                            let query = `mutation{
                                                        setBoosterRole(guild_id: "${s.id}", user_id: "${message.author.id}", booster_role: "${role.id}") {
                                                            guild_id user_id
                                                        }
                                                    }`;
                            try {
                              await request(url, query);
                              let memRoles = [];
                              await Promise.all(
                                mem.roles.map(r => {
                                  if (r.id !== "676580960955007001") {
                                    memRoles.push(r.id);
                                  }
                                })
                              );
                              mem.setRoles(memRoles);
                            } catch (err) {
                              console.error(err);
                            }
                          });
                        });
                    });
                });
            });
        } else {
          return message.channel.send(
            "you already have your boosted role weirdo !"
          );
        }
        console.log(user);
      } catch (err) {
        console.error(err);
      }
    }
  }
};
