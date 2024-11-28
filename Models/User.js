const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["User", "Admin", "Moderator"],
    default: "User",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

//create and exporting a user model

const User = mongoose.model("users", userSchema);
module.exports = User;
