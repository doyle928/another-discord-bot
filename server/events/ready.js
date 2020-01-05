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
    .then(msg => {
      //age
      msg.react("1️⃣");
      msg.react("2️⃣");
      msg.react("3️⃣");
      msg.react("4️⃣");
      msg.react("5️⃣");
    });
  await s.channels
    .get("561423217709940770")
    .fetchMessage("663150060904644608")
    .then(msg => {
      //personality
      msg.react("🤐");
      msg.react("🥳");
      msg.react("😜");
    });
  await s.channels
    .get("561423217709940770")
    .fetchMessage("663150398458167306")
    .then(msg => {
      //gaming
      msg.react("🅿");
      msg.react("❎");
      msg.react("🍄");
      msg.react("🖥");
      msg.react("📱");
    });
  await s.channels
    .get("561423217709940770")
    .fetchMessage("663150874184646713")
    .then(msg => {
      //relationship
      msg.react("💁‍♀️");
      msg.react("❤");
      msg.react("🙊");
    });
  await s.channels
    .get("561423217709940770")
    .fetchMessage("663151089054646315")
    .then(msg => {
      //dm
      msg.react("✅");
      msg.react("❌");
      msg.react("❓");
    });
  await s.channels
    .get("561423217709940770")
    .fetchMessage("663151396727554059")
    .then(msg => {
      //interests
      msg.react("🍲");
      msg.react("🐕");
      msg.react("🌄");
      msg.react("⚽");
      msg.react("🎵");
      msg.react("🚗");
      msg.react("📚");
      msg.react("📺");
      msg.react("💻");
      msg.react("🌺");
      msg.react("🖌️");
      msg.react("🎮");
      msg.react("👗");
    });
  await s.channels
    .get("561423217709940770")
    .fetchMessage("663153065565618190")
    .then(msg => {
      //voicechat
      msg.react("🎙️");
    });
};
