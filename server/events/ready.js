module.exports = async client => {
  console.log("started");

  client.user.setStatus("idle");

  client.user.setActivity("mon fils stp pas touche", {
    type: 3
  });

  let s = client.guilds.get("559560674246787087");
  await s.channels.get("559709338638352405").fetchMessage("596040210559664139");
};
