// message routers

const express = require("express");
const { addMessage, fetchMessage, searchAndFetchMessage } = require("../controllers/messageController");
const verifyJWT = require("../middlewares/verifyJWT");
const router = express.Router();

// add message route
router.post('/api/add-message',addMessage)

// fetch message route
router.get('/api/fetch-message/:chatId',fetchMessage)

// search and fetch message route
router.get('/api/search-fetch-message',searchAndFetchMessage)

module.exports = router