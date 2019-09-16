const axios = require("axios");

function checkMembers(guild) {
  let memberCount = 0;
  guild.members.forEach(member => {
    if (!member.user.bot) memberCount++;
  });
  return memberCount;
}

module.exports = async (client, member, guild) => {
  let newMember = [
    {
      members: checkMembers(member.guild),
      timestamp: Date.now()
    }
  ];

  axios({
    url: "https://github.com/doyle928/member-tracker-json",
    method: "get"
  }).then(res => {
    let json = JSON.parse(res);
    json.push(...newMember);
    axios({
      url: "https://github.com/doyle928/member-tracker-json",
      method: "post",
      data: json
    });
  });
};
