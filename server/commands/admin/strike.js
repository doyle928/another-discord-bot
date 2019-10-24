const { request } = require("graphql-request");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    message.channel.send(
      `How dare you ${message.author.username} !! You don't have the permissions to use this command!`
    );
    message.channel.send("<a:02upset:538273249306345476>");
  } else {
    let url = "https://lulu-discord-bot.herokuapp.com/api";

    let argsInt = 1;
    let strikes = 1;

    if (args[1] === "remove") {
      strikes = -1;
      argsInt = 2;
      if (args[2].length === 1) {
        strikes = -parseInt(args[2]);
        if (isNaN(strikes)) {
          message.channel.send(
            `Excuse me ${message.author}! where you put "**${
              args[2]
            }**", it should be a number not whatever you put there!`
          );
          message.channel.send("<a:02upset:538273249306345476>");

          return;
        }
        argsInt = 3;
      }
    }
    let member = null;

    if (!message.mentions.members.first()) {
      let id = args[argsInt].replace(/([<>@,#!&])/g, "");
      try {
        member = await message.guild.fetchMember(id);
      } catch {
        message.channel.send("I don't think this member exists in the guild");
        message.channel.send("<:kanna_confused:607077674099277828>");
      }
    } else {
      member =
        message.mentions.members.first() ||
        message.guild.members.get(args[argsInt]);
    }

    let query = `{
                getUser(guild_id: "${message.guild.id}", user_id: "${member.id}") {
                    strikes
                }
            }`;
    try {
      let res = await request(url, query);
      let currentStrikes = parseInt(res.getUser.strikes);
      if (currentStrikes === 0 && args[1] === "remove") {
        message.channel.send(
          `Excuse me ${message.author}! ${member.user.tag} has 0 strikes, what are you doing!?`
        );
        message.channel.send("<a:02upset:538273249306345476>");
      } else {
        if (currentStrikes + strikes >= 5) {
          member
            .ban("too many strikes")
            .then(() => {
              let messageEmbed = new Discord.RichEmbed()
                .setColor("#fe6860")
                .setTitle(
                  `${member.user.tag} has been banned by ${message.author.tag}`
                )
                .addField("Reason", "too many strikes");
              message.channel.send(messageEmbed);
            })
            .catch(error => {
              message.channel.send(
                `Sorry ${message.author} the user has 5 strikes but I was unable to ban them`
              );
              message.channel.send("<:deadinside:606350795881054216>");
              console.error(error);
            });
        } else {
          if (currentStrikes + strikes < 0) {
            strikes = 0;
          }
          if (parseInt(args[2])) {
            if (currentStrikes < parseInt(args[2])) {
              currentStrikes = 0;
              strikes = 0;
            }
          }
          query = `mutation{
                addStrike(guild_id: "${message.guild.id}", user_id: "${
            member.id
          }", strikes: ${currentStrikes + strikes}) {
                    strikes
                }
            }`;
          try {
            res = await request(url, query);
            if (args[1] === "remove") {
              strikes = -1;
              if (args[2].length === 1) {
                strikes = -parseInt(args[2]);
              }
              message.channel.send(
                `${-strikes} strikes removed from ${
                  member.user
                }! you now have ${
                  currentStrikes + strikes < 0 ? 0 : currentStrikes + strikes
                } strikes!`
              );
              message.channel.send("<:SataniaThumbsUp:575052610063695873>");
            } else {
              message.channel.send(
                `Strike given to ${member.user}! you now have ${
                  currentStrikes + strikes < 0 ? 0 : currentStrikes + strikes
                } strikes!\nwatch your self buckaroo!`
              );
              message.channel.send("<:nicoSIPP:606364812561219594>");
            }
          } catch (err) {
            console.error(err);
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
};
