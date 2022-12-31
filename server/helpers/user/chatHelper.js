// user chat operations

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const chatModel = require("../../config/models/chatModel");

module.exports = {
  //create chat operations
  createUserChat: (senderId, recieverId) => {
    return new Promise(async (resolve, reject) => {
      console.log(senderId,recieverId);
      try {
        const chat = await chatModel.findOne({
          members: { $all: [ObjectId(senderId), ObjectId(recieverId)] },
        });

        if (!chat) {
          const memberss = new chatModel({
            members: [ObjectId(senderId), ObjectId(recieverId)],
          });
          const newChat = await memberss.save();
          resolve({ status: "ok", chatCreated: true, newChat });
        } else {
          resolve({ status: "alreadyExists", chatCreated: false });
        }
      } catch (error) {
        reject({ status: "error", chatCreated: false, error });
      }
      // const members = [ObjectId(senderId), ObjectId(recieverId)];
      // chatModel
      //   .create({ members })
      //   .then(() => {
      //     resolve({ status: "ok", chatCreated: true });
      //   })
      //   .catch((error) => {
      //     reject({ status: "error", chatCreated: false, error });
      //   });
    });
  },
  // fetch user chats operations
  fetchUserChats: ({ userId }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const chats = await chatModel.find({
          members: { $in: [ObjectId(userId)] },
        });
        resolve({ status: "ok", fetchChats: true, chats });
      } catch (error) {
        reject({ status: "error", fetchChats: false, error });
      }
    });
  },
  // find user chat operations
  findUserChat: (firstId, secondId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const chat = await chatModel.find({
          members: { $all: [ObjectId(firstId), ObjectId(secondId)] },
        });
        resolve({ status: "ok", findChat: true, chat });
      } catch (error) {
        reject({ status: "error", findChat: false, error });
      }
    });
  },
};
