const { model, Schema } = require("mongoose");

const countSchema = new Schema({
  members: Number,
  timestamp: String
});

module.exports = model("Count", countSchema);
