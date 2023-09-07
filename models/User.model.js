const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  login: {
    type: String,
  },
  password: String,
  AvatarURL: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
