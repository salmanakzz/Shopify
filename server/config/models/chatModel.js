// chat collection shema

const mongoose = require("mongoose");
const { CHAT_COLLECTION } = require("../collections");

const chatModel = new mongoose.Schema(
  {
    members: { type: Array },
  },
  {
    timestamps: true,
    collection: CHAT_COLLECTION,
  }
);

const model = mongoose.model("ChatData", chatModel);

module.exports = model;
