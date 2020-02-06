const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  const embed = new Discord.RichEmbed()
    .setAuthor("Commands")
    .setDescription(
      `**Info**

.help (this)
.userinfo - or - .userinfo @user (info for your account or another user)
.serverinfo (server info)
.image query (searches google images and pulls a random image)
.avatar - or - .avatar @user (shows your avatar or another users avatar)
.channels (chart of amt of messages in channels)
.chart (chart of server member count)
.msgcount (chart of total messages over several days)
.msgtoday (total messages sent in the server in 24 hours)
.getroles @user (list the roles of a user)
.memberlist (list all members in the server by join date)
.msguser - or - .msguser @user (gets total amount of messages sent by you or another user)
.see :emote: (the emote but bigger)
.points - or - .points @user (get your point count or another users point count)
.pointlist (leaderboard of points)

**Fun**

.react query - or - .react query @user (gif reaction based on the query)
.qotd (gets a random question for #questions-for-discussion )
.setnickname nickname (changes your nickname on the server)
.poll (walks you through making a poll)
.fbi - or - .fbi @user (sends the fbi)
.imma (just disappointment)
.setcolour #hex-code - or - .setcolor #hex-code (change the colour of your custom role)
.setrolename name (change the name of your custom role)
.buy (buy a custom role with points)

**Shipping**

.ship - or - .ship list (list of current ships in the server)
.ship @user (see if user is shipped to anyone or not)
.ship @user1 @user2 (ships the 2 users)
.ship leave/end/breakup (ends your current ship)`
    )
    .setColor("#202225");
  message.channel.send(embed);
};
