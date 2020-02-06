const Discord = require("discord.js");
const { request } = require("graphql-request");
const moment = require("moment");
const schedule = require("node-schedule");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    message.channel.send("You don't have the permissions to use this command!");
    message.channel.send("<a:02upset:538273249306345476>");
  } else {
    let embed = new Discord.RichEmbed()
      .setAuthor("Reminder help")
      .setDescription(
        `**Command**\n.remind #channel xd message\n\nx : integer\nd : s/m/h/d (secondes/minutes/heures/days)\n\nE.g.\n.remind ${message.channel} 10m hii !`
      )
      .setColor("#202225");
    if (args[1] && args[1].toLowerCase() === "help") {
      message.channel.send(embed);
    } else if (args[1]) {
      let channelId = args[1].replace(/([^0-9])/g, "");
      if (channelId.length === 18 || (channelId.length === 19 && args[2])) {
        let timeDelay = args[2];
        let timeUnit = timeDelay.toLowerCase().replace(/([^a-z])/g, "");
        if (
          timeUnit === "s" ||
          timeUnit === "m" ||
          timeUnit === "h" ||
          timeUnit === "d"
        ) {
          let date = new Date();
          let newDateObj = moment(date)
            .add(timeDelay.replace(/([^0-9])/g, ""), timeUnit)
            .toDate();

          if (args[3]) {
            let msg = "";

            for (let i = 3; i < args.length; i++) {
              msg += `${args[i]} `;
            }

            let url = "https://lulu-discord-bot.herokuapp.com/api";

            let query = `mutation {
                      addSchedules(guild_id: "${
                        message.guild.id
                      }", channel_id: "${channelId}", message: "${msg}", date: "${moment(
              newDateObj
            )}") {
                          message
                      }
                    }`;
            try {
              await request(url, query);
              message.channel.send(`okay reminder set !`);
              schedule.scheduleJob(newDateObj, async () => {
                let c = await message.guild.channels.get(channelId);
                c.send(msg);
              });
            } catch (err) {
              console.error(err);
            }
          } else {
            return message.channel.send(embed);
          }
        } else {
          return message.channel.send(embed);
        }
      } else {
        return message.channel.send(embed);
      }
    } else {
      return message.channel.send(embed);
    }
  }
};
