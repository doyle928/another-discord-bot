const { model, Schema } = require("mongoose");

const serverSchema = new Schema({
  guild_id: String,
  blank_avatar: Boolean,
  join_age: Boolean
});

module.exports = model("Server", serverSchema);
