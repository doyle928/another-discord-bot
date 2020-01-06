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
    .fetchMessage("663887669939535903")
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
    .fetchMessage("663887880153989181")
    .then(async msg => {
      //gender
      if (_.size(msg.reactions) === 0) {
        await msg.react("❤️");
        await msg.react("💙");
        await msg.react("663877883453767680");
        await msg.react("663877938873106432");
        await msg.react("593245255583924239");
        await msg.react("🍓");
      }
    });
  await s.channels
    .get("561423217709940770")
    .fetchMessage("663888106998464544")
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
    .fetchMessage("663888254017470483")
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
    .fetchMessage("663888532959657988")
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
    .fetchMessage("663888692573765634")
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
    .fetchMessage("663888853203157004")
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
    .fetchMessage("663889028315217935")
    .then(async msg => {
      //voicechat
      if (_.size(msg.reactions) === 0) {
        await msg.react("🎙️");
      }
    });
};
