const Discord = require("discord.js");
const randomNumber = require("../../data/randomNumber");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    if (
      message.guild.id === "559560674246787087" &&
      message.channel.id !== "561453542741901322"
    ) {
      let randomNum = randomNumber(1, 300);
      if (randomNum === 300) {
        let member = null;
        message.channel.send("lucky number 300 !");

        if (!message.mentions.members.first()) {
          message.channel.send("you did not mention anyone !!!");
          message.channel.send("<a:02upset:538273249306345476>");
          return;
        }

        if (!member.bannable) {
          message.channel.send("I cannot ban this user!");
          message.channel.send("<a:sataniacrying:575078717911597077>");
          return;
        }

        message.channel.send(
          `lucky number 300 !! you are getting banned ${member}!\nyou have 10 secondes until you get banned !`
        );
        message.channel.send("<:oh_my:606353903558066176>");
        setTimeout(() => {
          member.send(
            `${message.author.username} has banned you, here is a invite link`
          );
          member.send("https://discord.gg/TTVdzRE");
          let memberId = member.user.id;
          member
            .ban("they lost the roulette")
            .then(() => {
              let messageEmbed = new Discord.RichEmbed()
                .setColor("#fe6860")
                .setTitle(
                  `${member.user.tag} has been banned by ${message.author.tag}`
                )
                .addField("Reason", "they lost the roulette")
                .setTimestamp();

              message.channel.send(messageEmbed);
              message.guild.unban(memberId);
            })
            .catch(error => {
              message.channel.send(
                `Sorry ${message.author} I couldn't ban the user`
              );
              message.channel.send("<:deadinside:606350795881054216>");
            });
        }, 10000);
      } else if (randomNum === 1) {
        message.channel.send(
          `unlucky number 1 !! you are getting banned ${message.author.username}! you have 10 secondes until you get banned !`
        );
        message.channel.send("<:oh_my:606353903558066176>");
        setTimeout(() => {
          member.send("you banned youself, here is a invite link");
          member.send("https://discord.gg/TTVdzRE");
          let memberId = message.author.id;

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
              message.guild.unban(memberId);
            })
            .catch(error => {
              message.channel.send(
                `Sorry ${message.author} I couldn't ban the user`
              );
              message.channel.send("<:deadinside:606350795881054216>");
            });
        }, 10000);
      } else {
        message.channel.send(`you got ${randomNum} ! how lame !`);
        // message.channel.send(
        //   `How dare you ${message.author.username} !! You don't have the permissions to use this command!`
        // );
        message.channel.send("<:natsukiMad:646210751417286656>");
      }
    } else {
      if (message.channel.id === "561453542741901322") {
        message.channel.send(`please use me in a different channel !`);
        message.channel.send("<:natsukiMad:646210751417286656>").then(msg => {
          message.channel
            .awaitMessages(res => res.author.id === message.author.id, {
              max: 2,
              time: 20000,
              errors: ["time"]
            })
            .then(collected => {
              let foundNo = false;
              collected.map(msg => {
                let msgSplit = msg.toLowerCase().split(" ");
                for (let i = 0; i < msgSplit.length; i++) {
                  if (
                    msgSplit[i].replace(/([^a-z])/g).replace(/([o])/g, "") ===
                      "n" ||
                    msgSplit[i].replace(/([^a-z])/g).replace(/([o])/g, "") ===
                      "npe"
                  ) {
                    foundNo = true;
                  }
                }
              });
              if (foundNo) {
                message.channel.send(
                  `do you want to get banned ${message.author.tag} ??`
                );
              }
            })
            .catch(err => console.error(err));
        });
      } else {
        message.channel.send(
          `How dare you ${message.author.username} !! You don't have the permissions to use this command!`
        );
        message.channel.send("<a:02upset:538273249306345476>");
      }
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
            .addField("Reason", `${message.author.tag}: ${reason}`)
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
