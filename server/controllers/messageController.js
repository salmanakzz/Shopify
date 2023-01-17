// message routes controlling

const messageHelper = require("../helpers/user/messageHelper");

//add message route controlling
const addMessage = async (req, res) => {
  try {
    const { chatId, senderId, text } = req.body;
    const response = await messageHelper.addUserMessage(chatId, senderId, text);
    res.json(response);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

//fetch message route controlling
const fetchMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const response = await messageHelper.fetchUserMessage(chatId);
    res.json(response);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

// search and fetch message route controlling
const searchAndFetchMessage = async (req, res) => {
  try {
    const { chatterId, currentUserId } = req.query;
    const response = await messageHelper.searchAndFetchMessage(
      chatterId,
      currentUserId
    );
    res.json(response);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};
module.exports = {
  addMessage,
  fetchMessage,
  searchAndFetchMessage,
};
