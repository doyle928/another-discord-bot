module.exports = client => {
  console.log("started");

  client.user.setStatus("idle");

  client.user.setActivity("mon fils stp pas touche", {
    type: 3
  });
};
