// message routers

const express = require("express");
const { addMessage, fetchMessage } = require("../controllers/messageController");
const verifyJWT = require("../middlewares/verifyJWT");
const router = express.Router();

// add message route
router.post('/api/add-message',addMessage)

// fetch message route
router.get('/api/fetch-message/:chatId',fetchMessage)

module.exports = router