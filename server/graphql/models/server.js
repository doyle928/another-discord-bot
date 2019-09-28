const { model, Schema } = require("mongoose");

const serverSchema = new Schema({
  guild_id: String
});

module.exports = model("Server", serverSchema);
