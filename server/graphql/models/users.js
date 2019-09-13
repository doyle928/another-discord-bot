const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  user_id: String,
  join_date: String,
  strikes: Number
});

module.exports = model("User", userSchema);
