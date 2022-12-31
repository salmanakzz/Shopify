// chat routes controlling
const chatHelper = require("../helpers/user/chatHelper");

// create chat route controlling
const createChat = async (req, res) => {
  const { senderId, recieverId } = req.body;
  try {
    const response = await chatHelper.createUserChat(senderId, recieverId);
    console.log(response);
    res.json(response);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

// fetch user chats route controlling
const userChats = async (req, res) => {
  try { 
    const userId = req.params
    const response = await chatHelper.fetchUserChats(userId);
    res.json(response);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

// find chat route controlling
const findChat = async (req, res) => {
  try { 
    const {firstId,secondId} = req.params
    const response = await chatHelper.findUserChat(firstId,secondId);
    res.json(response);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

module.exports = {
  createChat,
  userChats,
  findChat
};
