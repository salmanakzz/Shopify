// user message operations

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const messageModel = require("../../config/models/messageModel");

module.exports = {
  //add message operations
  addUserMessage: (chatId, senderId, text) => {
    return new Promise(async (resolve, reject) => {
      try {
        const message = new messageModel ({
          chatId,
          senderId,
          text,
        });
        const savedMessage = await message.save()
        resolve({ staus: "ok", addmessage: true ,savedMessage});
      } catch (error) {
        reject({ staus: "error", addmessage: false, error });
      }
    });
  },

  //fetch message operations
  fetchUserMessage: (chatId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const message = await messageModel.find({ chatId: ObjectId(chatId) });
        resolve({ staus: "ok", fetchMessage: true, message });
      } catch (error) {
        reject({ staus: "error", fetchMessage: false, error });
      }
    });
  },
};
