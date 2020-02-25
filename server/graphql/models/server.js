const { model, Schema } = require("mongoose");

const serverSchema = new Schema({
  guild_id: String,
  muted_role: String,
  mod_channel: String,
  raid_mode: Boolean,
  raid_mode_active: Boolean,
  blank_avatar: Boolean,
  join_age: Boolean,
  new_member_roles: [String]
});

module.exports = model("Server", serverSchema);
