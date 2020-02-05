const Discord = require("discord.js");
const randomColor = require("../../data/randomColor");
const { request } = require("graphql-request");

exports.run = async (client, message, args) => {
  let url = "https://lulu-discord-bot.herokuapp.com/api";

  if (message.mentions.members.first()) {
    if (args.includes("give")) {
      if (args.includes("all")) {
        return addPoints(
          message.author,
          message.mentions.members.first().user,
          "all"
        );
      } else if (args[2].indexOf("<") === -1 && Number(args[2])) {
        return addPoints(
          message.author,
          message.mentions.members.first().user,
          Number(args[2])
        );
      } else if (
        args.length >= 4 &&
        args[3].indexOf("<") === -1 &&
        Number(args[3])
      ) {
        return addPoints(
          message.author,
          message.mentions.members.first().user,
          Number(args[3])
        );
      }
    } else {
      let query = `query {
            getUser(guild_id: "${message.guild.id}", user_id: "${
        message.mentions.members.first().user.id
      }") {
              guild_id user_id welcome_points
            }
          }`;
      try {
        if (
          message.channel.id === "561401129296986112" &&
          message.author.id !== "157673412561469440"
        ) {
          let res = await request(url, query);
          const embed = new Discord.RichEmbed()
            .setAuthor(
              message.mentions.members.first().user.username,
              message.mentions.members.first().user.displayAvatarURL
            )
            .setDescription(`**Points :** ${res.getUser.welcome_points}`)
            .setColor(randomColor());
          return message.channel.send(embed);
        } else {
          message.channel.send("sorry but i'm not allowed in here anymore !");
          return message.channel.send("<a:crying:661358360091688980>");
        }
      } catch (err) {
        console.error(err);
      }
    }
  } else {
    let query = `query {
            getUser(guild_id: "${message.guild.id}", user_id: "${message.author.id}") {
              guild_id user_id welcome_points
            }
          }`;
    try {
      let res = await request(url, query);
      const embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setDescription(`**Points :** ${res.getUser.welcome_points}`)
        .setColor(randomColor());
      return message.channel.send(embed);
    } catch (err) {
      console.error(err);
    }
  }

  async function addPoints(user1, user2, pointsGiven) {
    let query = `query {
            getUser(guild_id: "${message.guild.id}", user_id: "${user1.id}") {
              guild_id user_id welcome_points
            }
          }`;
    try {
      let giver = await request(url, query);
      let points = pointsGiven;
      if (pointsGiven === "all") points = giver.getUser.welcome_points;
      if (giver.getUser.welcome_points - points < 0) {
        message.channel.send(
          `you dont have that many points to give, i am giving them all that i can !`
        );
        points = giver.getUser.welcome_points;
      }
      query = `mutation {
                              addWelcomePoints(guild_id: "${
                                message.guild.id
                              }", user_id: "${
        user1.id
      }", welcome_points: ${giver.getUser.welcome_points - points}) {
                                guild_id user_id welcome_points
                              }
                            }`;
      try {
        await request(url, query);
        query = `query {
            getUser(guild_id: "${message.guild.id}", user_id: "${user2.id}") {
              guild_id user_id welcome_points
            }
          }`;
        try {
          let recipient = await request(url, query);
          let newPoints = points + recipient.getUser.welcome_points;
          query = `mutation {
                              addWelcomePoints(guild_id: "${message.guild.id}", user_id: "${user2.id}", welcome_points: ${newPoints}) {
                                guild_id user_id welcome_points
                              }
                            }`;
          try {
            await request(url, query);
            return message.channel.send(
              `okay done ! you have given ${user2.username} ${points} points !`
            );
          } catch (err) {
            console.error(err);
            return message.channel.send(`sorry i broke something !`);
          }
        } catch (err) {
          console.error(err);
          return message.channel.send(`sorry i broke something !`);
        }
      } catch (err) {
        console.error(err);
        return message.channel.send(`sorry i broke something !`);
      }
    } catch (err) {
      console.error(err);
      return message.channel.send(`sorry i broke something !`);
    }
  }
};
