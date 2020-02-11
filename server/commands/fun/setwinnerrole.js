const { request } = require("graphql-request");

exports.run = async (client, message, args) => {
  let s = await client.guilds.get("542945080495833119");

  if (s.members.has(message.author.id)) {
    console.log("here");
    let mem = await s.fetchMember(message.author.id);
    if (mem._roles.includes("676580960955007001")) {
      message.channel
        .send(
          `Congrats on Winning again !!\nwhat would you like the name of your custom role to be ?`
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
                    .awaitMessages(res => res.author.id === message.author.id, {
                      maxMatches: 1,
                      time: 120000,
                      errors: ["time"]
                    })
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

                        let url = "https://lulu-discord-bot.herokuapp.com/api";
                        let query = `mutation{
                                                        setCustomRole(guild_id: "${s.id}", user_id: "${message.author.id}", custom_role: "${role.id}") {
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
    }
  }
};
