const mongoose = require("mongoose");
const { Schema } = require("mongoose");

//creating a schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//creating a model
const User = mongoose.model("user", userSchema);
module.exports = User;