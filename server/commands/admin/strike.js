const { request } = require("graphql-request");
const mongoose = require("mongoose");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    message.channel.send("You don't have the permissions to use this command!");
    message.channel.send("<a:02upset:538273249306345476>");
  } else {
    let guildId = message.guild.id.toString();
    state = `${guildId}`;

    mongoose
      .connect(`${process.env.MONGODB_URI}server_${state}`, {
        useNewUrlParser: true
      })
      .then(async () => {
        console.log("DB connected");

        let url = "https://lulu-discord-bot.herokuapp.com/api";

        let argsInt = 1;
        let strikes = 1;

        if (args[1] === "remove") {
          strikes = -1;
          argsInt = 2;
          if (args[2].length === 1) {
            strikes -= parseInt(args[2]) + 1;
            argsInt = 3;
          }
        }
        let member = null;

        if (!message.mentions.members.first()) {
          let id = args[argsInt].replace(/([<>@,#!&])/g, "");
          try {
            member = await message.guild.fetchMember(id);
          } catch {
            message.channel.send(
              "I don't think this member exists in the guild"
            );
            message.channel.send("<:kanna_confused:607077674099277828>");
          }
        } else {
          member =
            message.mentions.members.first() ||
            message.guild.members.get(args[1]);
        }

        let query = `{
                getUser(user_id: "${member.id}") {
                    strikes
                }
            }`;
        try {
          let res = await request(url, query);
          if (res.strikes + strikes >= 5) {
            member
              .ban("too many strikes")
              .then(() => {
                let messageEmbed = new Discord.RichEmbed()
                  .setColor("#fe6860")
                  .setTitle(
                    `${member.user.tag} has been banned by ${message.author.tag} because: too many strikes`
                  )
                  .addField("Reason", "too many strikes");
                message.channel.send(messageEmbed);
              })
              .catch(error => {
                message.channel.send(
                  `Sorry ${message.author} the user has 5 strikes but I was unable to ban them`
                );
                message.channel.send("<:deadinside:606350795881054216>");
              });
          } else {
            if (res.strikes + strikes < 0) {
              strikes = 0;
            }
            query = `{
                addStrike(user_id: "${member.id}", strikes: ${res.strikes +
              strikes}) {
                    strikes
                }
            }`;
            try {
              res = await request(url, query);
              console.log(res);
              message.channel.send(`Strike given to ${member.user}`);
              message.channel.send("<:oh_my:606353903558066176>");
            } catch (err) {
              console.error(err);
            }
          }
        } catch (err) {
          console.error(err);
        }
      })
      .then(() => mongoose.disconnect())
      .catch(error => console.log(error));
  }
};
