// user collection shema

const mongoose = require("mongoose");
const { USER_COLLECTION } = require("../collections");

const user = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, unique: true },
    password: { type: String },
    profilePicture: { type: String},
    profilePictureUrl: { type: String},
    friends: { type: Array },
    followers: { type: Array },
    following: { type: Array },
    friendRequest: { type: Array },
    reports: { type: Array },
    blocked: { type: Boolean },
  },
  {
    collection: USER_COLLECTION,
  }
);

const model = mongoose.model("GoogleUserData", user);

module.exports = model;