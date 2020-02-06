const { model, Schema } = require("mongoose");

const schedulesSchema = new Schema({
  guild_id: String,
  channel_id: String,
  message: String,
  date: String
});

module.exports = model("Schedules", schedulesSchema);
