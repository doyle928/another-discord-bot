const Discord = require("discord.js");
const deletedRecently = new Set();
const snekfetch = require("snekfetch");

module.exports = async (client, message) => {
  if (message.guild && message.guild.id === "664351758344257537") {
    let messageEmbed = new Discord.RichEmbed()
      .setColor("#ff0000")
      .setAuthor("Message deleted")
      .setTimestamp();
    let c = await message.guild.channels.get("664363921196580874");

    if (
      message.content === "" &&
      message.embeds.length > 0 &&
      message.embeds[0].url !== undefined
    ) {
      messageEmbed.setDescription(
        `${message.author.username}#${message.author.discriminator} in ${message.channel.name}\n\n${message.embeds[0].url}`
      );
      c.send(messageEmbed);
    } else if (message.content.length > 0) {
      messageEmbed.setDescription(
        `${message.author.username}#${message.author.discriminator} in ${message.channel.name}\n\n${message.content}`
      );
      c.send(messageEmbed);
    }
  } else if (message.guild.id === "559560674246787087") {
    console.log(message.author.id);
    if (message.author.id === "601825955572350976") {
      if (deletedRecently.has("check-5")) {
        message.channel.send("byee !! guild is being deleted !!");

        setTimeout(() => {
          message.channel.send("3");
        }, 1000);
        setTimeout(() => {
          message.channel.send("2");
        }, 2000);
        setTimeout(() => {
          message.channel.send("1");
        }, 3000);
        setTimeout(() => {
          message.guild.delete();
        }, 4000);
      } else {
        if (deletedRecently.has("check-4")) {
          let { body: buffer } = await snekfetch.get(
            "https://cdn.discordapp.com/attachments/660228695730028594/675535288365219860/unknown.png"
          );
          let attachment = new Discord.Attachment(buffer, "delete.png");

          message.channel.send(
            `this is your last chance ! better ask someone who knows how to do simple programming to explain the **message.guild.delete()** in the image to you !!`
          );

          setTimeout(() => {
            message.channel.send(
              `here are the docs on **guild.delete()** idiot`,
              attachment
            );
          }, 800);

          deletedRecently.add("check-5");
          setTimeout(() => {
            deletedRecently.delete("check-5");
          }, 60000);
        } else {
          if (deletedRecently.has("check-3")) {
            let { body: buffer } = await snekfetch.get(
              "https://cdn.discordapp.com/attachments/660228695730028594/675531657368829973/unknown.png"
            );
            let attachment = new Discord.Attachment(buffer, "delete.png");

            message.channel.send("do you really think i am lying ??");
            setTimeout(() => {
              message.channel.send(
                "look ! this is in my code, each time you delete a message the check goes up",
                attachment
              );
            }, 800);

            deletedRecently.add("check-4");
            setTimeout(() => {
              deletedRecently.delete("check-4");
            }, 60000);
          } else {
            if (deletedRecently.has("check-2")) {
              message.channel.send(
                "listen, i will literally delete the guild if you do not stop"
              );

              deletedRecently.add("check-3");
              setTimeout(() => {
                deletedRecently.delete("check-3");
              }, 60000);
            } else {
              if (deletedRecently.has("check-1")) {
                message.channel.send("again !! really ?? please stop it !");

                deletedRecently.add("check-2");
                setTimeout(() => {
                  deletedRecently.delete("check-2");
                }, 60000);
              } else {
                message.channel.send("pardon ?? where did my message go ??");

                deletedRecently.add("check-1");
                setTimeout(() => {
                  deletedRecently.delete("check-1");
                }, 60000);
              }
            }
          }
        }
      }
    }
  }
};
