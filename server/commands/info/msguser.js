const puppeteer = require("puppeteer");

exports.run = async (client, message) => {
  function delay(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const browser = await puppeteer.launch({
    headless: true
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
        level: element.children[1].children[2].children[1].children[1].innerText
      })
    )
  );
  console.log(users);
  await browser.close();

  let username = message.author.username;
  if (message.mentions.members.first())
    username = message.mentions.members.first().user.username;
  console.log(username);

  for (let user in users) {
    console.log(users[user]);
    if (users[user].username === username) {
      return message.channel.send(
        `**${username}** has sent a total of **${users[user].messages} messages** for a total of **${users[user].experience} experience** ! They are **level ${users[user].level}** !!`
      );
    }
  }
  return message.channel.send(
    `sorry but ${username} is not in the top 100 and i do not feel like going and finding them !`
  );
};