const puppeteer = require("puppeteer");
const Discord = require("discord.js");
const randomColor = require("../../data/randomColor");

exports.run = async (client, message) => {
  function delay(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });
  const page = await browser.newPage();
  await page.goto(`https://mee6.xyz/leaderboard/${message.guild.id}`);
  await page.waitForSelector(".leaderboardPlayerStatValue");
  await delay(1000);

  const users = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(".leaderboardPlayer"),
      element =>
      (element = {
        username: element.children[0].children[2].innerText,
        messages: element.children[1].children[0].children[1].innerText,
        experience: element.children[1].children[1].children[1].innerText,
        level: element.children[1].children[2].children[0].children[1].innerText
      })
    )
  );
  await browser.close();

  let username = message.author.username;
  let member = message.author;
  if (message.mentions.members.first()) {
    username = message.mentions.members.first().user.username;
    member = message.mentions.members.first().user;
  }

  for (let user in users) {
    if (users[user].username === username) {
      let embed = new Discord.RichEmbed()
        .setAuthor(member.username, member.displayAvatarURL)
        .setColor(randomColor())
        .setDescription(
          `**Messages :** ${users[user].messages}\n**Experience :** ${users[user].experience}\n**Level :** ${users[user].level}`
        );
      return message.channel.send(embed);
      // return message.channel.send(
      //   `**${username}** has sent a total of **${users[user].messages} messages** for a total of **${users[user].experience} experience** ! They are **level ${users[user].level}** !!`
      // );
    }
  }
  return message.channel.send(
    `sorry but **${username}** is not in the top 100 and i do not feel like going and finding them !`
  );
};