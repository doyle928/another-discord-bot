const _ = require("lodash");

module.exports = async client => {
  console.log("started");

  client.user.setStatus("idle");

  client.user.setActivity("mon fils stp pas touche", {
    type: 3
  });

  let s = client.guilds.get("559560674246787087");
  await s.channels.get("559709338638352405").fetchMessage("662982653074472960");

  //roles reaction messages below
  await s.channels
    .get("561423217709940770")
    .fetchMessage("663149701687672862")
    .then(async msg => {
      //age
      if (_.size(msg.reactions) === 0) {
        await msg.react("1️⃣");
        await msg.react("2️⃣");
        await msg.react("3️⃣");
        await msg.react("4️⃣");
        await msg.react("5️⃣");
      }
    });
  await s.channels
    .get("561423217709940770")
    .fetchMessage("663150060904644608")
    .then(async msg => {
      //personality
      if (_.size(msg.reactions) === 0) {
        await msg.react("🤐");
        await msg.react("🥳");
        await msg.react("😜");
      }
    });
  await s.channels
    .get("561423217709940770")
    .fetchMessage("663150398458167306")
    .then(async msg => {
      //gaming
      if (_.size(msg.reactions) === 0) {
        await msg.react("🅿");
        await msg.react("❎");
        await msg.react("🍄");
        await msg.react("🖥");
        await msg.react("📱");
      }
    });
  await s.channels
    .get("561423217709940770")
    .fetchMessage("663150874184646713")
    .then(async msg => {
      //relationship
      if (_.size(msg.reactions) === 0) {
        await msg.react("💁‍♀️");
        await msg.react("❤");
        await msg.react("🙊");
      }
    });
  await s.channels
    .get("561423217709940770")
    .fetchMessage("663151089054646315")
    .then(async msg => {
      //dm
      if (_.size(msg.reactions) === 0) {
        await msg.react("✅");
        await msg.react("❌");
        await msg.react("❓");
      }
    });
  await s.channels
    .get("561423217709940770")
    .fetchMessage("663151396727554059")
    .then(async msg => {
      //interests
      if (_.size(msg.reactions) === 0) {
        await msg.react("🍲");
        await msg.react("🐕");
        await msg.react("🌄");
        await msg.react("⚽");
        await msg.react("🎵");
        await msg.react("🚗");
        await msg.react("📚");
        await msg.react("📺");
        await msg.react("💻");
        await msg.react("🌺");
        await msg.react("🖌️");
        await msg.react("🎮");
        await msg.react("👗");
      }
    });
  await s.channels
    .get("561423217709940770")
    .fetchMessage("663153065565618190")
    .then(async msg => {
      //voicechat
      if (_.size(msg.reactions) === 0) {
        await msg.react("🎙️");
      }
    });
};
