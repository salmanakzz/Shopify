// chat routers

const express = require("express");
const verifyJWT = require("../middlewares/verifyJWT");
const router = express.Router();

const { createChat, userChats, findChat } = require('../controllers/chatController')


// create chat route 
router.post('/api/create-chat',createChat)

// fetch user chats route 
router.get('/api/fetch-chats/:userId',userChats)

// find user chats route 
router.get('/api/find-chat/:firstId/:secondId',findChat)

module.exports =  router