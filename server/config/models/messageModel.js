// message collection shema

const mongoose = require("mongoose");
const { MESSAGE_COLLECTION } = require("../collections");

const messageModel = new mongoose.Schema(
  {
    chatId: { type: mongoose.Schema.Types.ObjectId },
    senderId: { type: mongoose.Schema.Types.ObjectId },
    text: { type: String },
  },
  {
    timestamps: true,
    collection: MESSAGE_COLLECTION,
  }
);

const model = mongoose.model("MessageData", messageModel);

module.exports = model;
