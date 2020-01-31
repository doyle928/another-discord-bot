const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  guild_id: String,
  user_id: String,
  join_date: String,
  strikes: Number,
  booster: Boolean
});

module.exports = model("User", userSchema);
