const Discord = require("discord.js");
const randomNumber = require("../../data/randomNumber");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    if (message.guild.id === "559560674246787087") {
      let randomNum = randomNumber(0, 500);
      if (randomNum === 500) {
        if (!args[1]) {
          message.channel.send("there's no user specified!!!");
          message.channel.send("<a:02upset:538273249306345476>");
        } else {
          let member = null;
          message.channel.send("lucky number 500 !");

          if (!message.mentions.members.first()) {
            let id = args[1].replace(/([<>@,#!&])/g, "");
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

          if (!member.bannable) {
            message.channel.send("I cannot ban this user!");
            message.channel.send("<a:sataniacrying:575078717911597077>");
            return;
          }
          member
            .ban(reason)
            .then(() => {
              let messageEmbed = new Discord.RichEmbed()
                .setColor("#fe6860")
                .setTitle(
                  `${member.user.tag} has been banned by ${message.author.tag}`
                )
                .addField("Reason", "they lost the roulette")
                .setTimestamp();

              message.channel.send(messageEmbed);
            })
            .catch(error => {
              message.channel.send(
                `Sorry ${message.author} I couldn't ban the user`
              );
              message.channel.send("<:deadinside:606350795881054216>");
            });
        }
      } else if (randomNum === 1) {
        message.channel.send(
          `unlucky number 1 !! you are getting banned ! byee !`
        );
        message.author
          .ban("they lost the roulette")
          .then(() => {
            let messageEmbed = new Discord.RichEmbed()
              .setColor("#fe6860")
              .setTitle(
                `${message.author.tag} has been banned by ${message.author.tag}`
              )
              .addField("Reason", "they lost the roulette")
              .setTimestamp();

            message.channel.send(messageEmbed);
          })
          .catch(error => {
            message.channel.send(
              `Sorry ${message.author} I couldn't ban the user`
            );
            message.channel.send("<:deadinside:606350795881054216>");
          });
      } else {
        message.channel.send(`you got ${randomNum} ! so sad !`);
        // message.channel.send(
        //   `How dare you ${message.author.username} !! You don't have the permissions to use this command!`
        // );
        message.channel.send("<a:02upset:538273249306345476>");
      }
    } else {
      message.channel.send(
        `How dare you ${message.author.username} !! You don't have the permissions to use this command!`
      );
      message.channel.send("<a:02upset:538273249306345476>");
    }
  } else {
    if (!args[1]) {
      message.channel.send("there's no user specified!!!");
      message.channel.send("<a:02upset:538273249306345476>");
    } else {
      let member = null;

      if (!message.mentions.members.first()) {
        let id = args[1].replace(/([<>@,#!&])/g, "");
        try {
          member = await message.guild.fetchMember(id);
        } catch {
          message.channel.send("I don't think this member exists in the guild");
          message.channel.send("<:kanna_confused:607077674099277828>");
        }
      } else {
        member =
          message.mentions.members.first() ||
          message.guild.members.get(args[1]);
      }

      if (!member.bannable) {
        message.channel.send("I cannot ban this user!");
        message.channel.send("<a:sataniacrying:575078717911597077>");
        return;
      }
      let reason = args.slice(2).join(" ");
      if (!reason) reason = "No reason provided";
      member
        .ban(reason)
        .then(() => {
          let messageEmbed = new Discord.RichEmbed()
            .setColor("#fe6860")
            .setTitle(
              `${member.user.tag} has been banned by ${message.author.tag}`
            )
            .addField("Reason", `${member.user.tag}: ${reason}`)
            .setTimestamp();

          message.channel.send(messageEmbed);
        })
        .catch(error => {
          message.channel.send(
            `Sorry ${message.author} I couldn't ban the user`
          );
          message.channel.send("<:deadinside:606350795881054216>");
        });
    }
  }
};
