const Discord = require("discord.js");
const randomColor = require("../data/randomColor");

module.exports = async (client, messageReaction, user) => {
  if (messageReaction._emoji.name === "⭐") {
    let starChannel = messageReaction.message.channel.guild.channels.find(
      channel => channel.name == "starboard"
    );
    if (!starChannel) {
      starChannel = messageReaction.message.channel.guild.channels.find(
        channel => channel.name == "memories"
      );
      if (!starChannel) {
        return messageReaction.message.channel.send(
          `you do not have a starboard channel ! please make a channel and name it exactly « starboard » ou « memories »`
        );
      }
    }

    const fetch = await starChannel.fetchMessages({ limit: 100 });
    const stars = fetch.find(
      m =>
        m.embeds[0].footer.text.startsWith("⭐") &&
        m.embeds[0].footer.text.endsWith(messageReaction.message.id)
    );
    if (stars) {
      const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(
        stars.embeds[0].footer.text
      );
      console.log(star[1]);
      const foundStar = stars.embeds[0];
      const image =
        messageReaction.message.attachments.array().length > 0 &&
        messageReaction.message.attachments.array()[0].filesize > 0
          ? await extension(
              messageReaction,
              messageReaction.message.attachments.array()[0].url
            )
          : "";
      const embed = new Discord.RichEmbed()
        .setColor(foundStar.color)
        .setDescription(foundStar.description)
        .setAuthor(
          `${messageReaction.message.author.username} (${messageReaction.message.channel.name})`,
          messageReaction.message.author.displayAvatarURL
        )
        .setTimestamp()
        .setFooter(
          `⭐ ${parseInt(star[1]) - 1} | ${messageReaction.message.id}`
        )
        .setImage(image);
      const starMsg = await starChannel.fetchMessage(stars.id);
      await starMsg.edit({ embed });
      if (parseInt(star[1]) - 1 <= 3) return starMsg.delete(250);
    }
  } else if (messageReaction.message.id === "663149701687672862") {
    if (messageReaction._emoji.name === "1️⃣") {
      removeRole("561441866525048842");
    } else if (messageReaction._emoji.name === "2️⃣") {
      removeRole("561441985236434945");
    } else if (messageReaction._emoji.name === "3️⃣") {
      removeRole("561442059567890442");
    } else if (messageReaction._emoji.name === "4️⃣") {
      removeRole("561442124592054292");
    } else if (messageReaction._emoji.name === "5️⃣") {
      removeRole("561442214572589077");
    }
  } else if (messageReaction.message.id === "663150060904644608") {
    if (messageReaction._emoji.name === "🤐") {
      removeRole("561443343842934806");
    } else if (messageReaction._emoji.name === "🥳") {
      removeRole("561443427107995660");
    } else if (messageReaction._emoji.name === "😜") {
      removeRole("561443500491800578");
    }
  } else if (messageReaction.message.id === "663150398458167306") {
    if (messageReaction._emoji.name === "🅿") {
      removeRole("561443526617989129");
    } else if (messageReaction._emoji.name === "❎") {
      removeRole("561443723330846722");
    } else if (messageReaction._emoji.name === "🍄") {
      removeRole("561443758487371776");
    } else if (messageReaction._emoji.name === "🖥") {
      removeRole("561443809712537625");
    } else if (messageReaction._emoji.name === "📱") {
      removeRole("561443842688155658");
    }
  } else if (messageReaction.message.id === "663150874184646713") {
    if (messageReaction._emoji.name === "💁‍♀️") {
      removeRole("561444125476651009");
    } else if (messageReaction._emoji.name === "❤") {
      removeRole("561444242778750978");
    } else if (messageReaction._emoji.name === "🙊") {
      removeRole("561444283400454146");
    }
  } else if (messageReaction.message.id === "663151089054646315") {
    if (messageReaction._emoji.name === "✅") {
      removeRole("561443898266746893");
    } else if (messageReaction._emoji.name === "❌") {
      removeRole("561444015472377876");
    } else if (messageReaction._emoji.name === "❓") {
      removeRole("561444049828184074");
    }
  } else if (messageReaction.message.id === "663151396727554059") {
    if (messageReaction._emoji.name === "🍲") {
      removeRole("561442784272318485");
    } else if (messageReaction._emoji.name === "🐕") {
      removeRole("561442865457135626");
    } else if (messageReaction._emoji.name === "🌄") {
      removeRole("561442912211042309");
    } else if (messageReaction._emoji.name === "⚽") {
      removeRole("561442956532514826");
    } else if (messageReaction._emoji.name === "🎵") {
      removeRole("561443003617509396");
    } else if (messageReaction._emoji.name === "🚗") {
      removeRole("561443031983587331");
    } else if (messageReaction._emoji.name === "📚") {
      removeRole("561443068927148034");
    } else if (messageReaction._emoji.name === "📺") {
      removeRole("561443115869798423");
    } else if (messageReaction._emoji.name === "💻") {
      removeRole("561443156642627611");
    } else if (messageReaction._emoji.name === "🌺") {
      removeRole("561443189123448842");
    } else if (messageReaction._emoji.name === "🖌️") {
      removeRole("561443216528769024");
    } else if (messageReaction._emoji.name === "🎮") {
      removeRole("561443255821271040");
    } else if (messageReaction._emoji.name === "👗") {
      removeRole("561443309667745805");
    }
  } else if (messageReaction.message.id === "663153065565618190") {
    if (messageReaction._emoji.name === "🎙️") {
      removeRole("663148896046022707");
    }
  }

  function extension(messageReaction, attachment) {
    const imageLink = attachment.split(".");
    const typeOfImage = imageLink[imageLink.length - 1];
    const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
    if (!image) return "";
    return attachment;
  }

  async function removeRole(role) {
    let memberRolesIdArray = [];
    let mem = await messageReaction.message.guild.fetchMember(user.id);
    if (mem) {
      mem.roles.map(r => {
        memberRolesIdArray.push(r.id);
      });
      for (let i = 0; i < memberRolesIdArray.length; i++) {
        if (memberRolesIdArray[i] === role) {
          memberRolesIdArray.splice(i, 1);
        }
      }
      mem.setRoles(memberRolesIdArray);
    }
  }
};
