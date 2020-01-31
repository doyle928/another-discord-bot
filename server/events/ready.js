const _ = require("lodash");

module.exports = async client => {
  console.log("started");

  client.user.setStatus("idle");

  client.user.setActivity("mon fils stp pas touche", {
    type: 3
  });

  const server1 = await client.guilds.get("559560674246787087");
  await server1.channels
    .get("559709338638352405")
    .fetchMessage("662982653074472960");

  //roles reaction messages below
  await server1.channels
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
  await server1.channels
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
  await server1.channels
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
  await server1.channels
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
  await server1.channels
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
  await server1.channels
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
  await server1.channels
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
  await server1.channels
    .get("561423217709940770")
    .fetchMessage("663889028315217935")
    .then(async msg => {
      //voicechat
      if (_.size(msg.reactions) === 0) {
        await msg.react("🎙️");
        await msg.react("👋");
      }
    });

  //-----------------------------------
  const server2 = await client.guilds.get("664351758344257537");
  await server2.channels
    .get("664356808428879882")
    .fetchMessage("664398194431754242");

  await server2.channels
    .get("664362973980000296")
    .fetchMessage("664779018481958943")
    .then(async msg => {
      //age
      if (_.size(msg.reactions) === 0) {
        await msg.react("1️⃣");
        await msg.react("2️⃣");
        await msg.react("3️⃣");
        await msg.react("4️⃣");
      }
    });
  await server2.channels
    .get("664362973980000296")
    .fetchMessage("664779140892983316")
    .then(async msg => {
      //gender
      if (_.size(msg.reactions) === 0) {
        await msg.react("❤️");
        await msg.react("💙");
        await msg.react("663877883453767680");
        await msg.react("663877938873106432");
      }
    });

  await server2.channels
    .get("664362973980000296")
    .fetchMessage("664779339035836417")
    .then(async msg => {
      //gaming
      if (_.size(msg.reactions) === 0) {
        await msg.react("1️⃣");
        await msg.react("2️⃣");
        await msg.react("3️⃣");
        await msg.react("4️⃣");
        await msg.react("5️⃣");
        await msg.react("6️⃣");
        await msg.react("7️⃣");
      }
    });
  await server2.channels
    .get("664362973980000296")
    .fetchMessage("664781016879333397")
    .then(async msg => {
      //relationship
      if (_.size(msg.reactions) === 0) {
        await msg.react("❤");
        await msg.react("💘");
        await msg.react("🖤");
      }
    });
  await server2.channels
    .get("664362973980000296")
    .fetchMessage("664781128594620416")
    .then(async msg => {
      //dm
      if (_.size(msg.reactions) === 0) {
        await msg.react("⭕");
        await msg.react("❌");
        await msg.react("🚫");
      }
    });
  await server2.channels
    .get("664362973980000296")
    .fetchMessage("664781295624126484")
    .then(async msg => {
      //interests
      if (_.size(msg.reactions) === 0) {
        await msg.react("💢");
        await msg.react("📚");
        await msg.react("🐶");
        await msg.react("🎨");
        await msg.react("🎥");
        await msg.react("💪");
        await msg.react("🎮");
        await msg.react("💤");
        await msg.react("👀");
        await msg.react("🎵");
        await msg.react("🌺");
        await msg.react("💾");
      }
    });
  await server2.channels
    .get("664362973980000296")
    .fetchMessage("664781416764014604")
    .then(async msg => {
      //voicechat
      if (_.size(msg.reactions) === 0) {
        await msg.react("🎙️");
      }
    });
  await server2.channels
    .get("664362973980000296")
    .fetchMessage("664781943019143172")
    .then(async msg => {
      //nsfw
      if (_.size(msg.reactions) === 0) {
        await msg.react("🔞");
      }
    });
};
