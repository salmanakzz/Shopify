import { Box, Container } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CollectionsIcon from "@mui/icons-material/Collections";
import MicIcon from "@mui/icons-material/Mic";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import "./MiddleSection.css";
import { addMessage } from "../../../api/addMessage";
import { createChat } from "../../../api/createChat";

function MiddleSection({
  messages,
  currentUserId,
  currentChat,
  setMessages,
  setSendMessage,
  recieveMessage,
  setCurrentChat,
}) {
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage) {
      if (currentChat?.members) {
        const message = {
          senderId: currentUserId,
          text: newMessage,
          chatId: currentChat._id,
        };
        addMessage(message).then(({ savedMessage }) => {
          setMessages([...messages, savedMessage]);
          setNewMessage("");
        });

        //send message to socket server
        const recieverId = currentChat?.members?.find(
          (id) => id !== currentUserId
        );
        setSendMessage({ ...message, recieverId });
      } else {
        createChat(currentUserId, currentChat._id).then(({ newChat }) => {
          if (newChat) {
            setCurrentChat(newChat);
            const message = {
              senderId: currentUserId,
              text: newMessage,
              chatId: newChat._id,
            };
            addMessage(message).then(({ savedMessage }) => {
              setMessages([...messages, savedMessage]);
              setNewMessage("");
            });

            //send message to socket server
            const recieverId = currentChat._id;
            setSendMessage({ ...message, recieverId });
          }
        });
      }
    }
  };

  useEffect(() => {
    if (recieveMessage !== null && recieveMessage.chatId === currentChat._id) {
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage]);

  // always scroll to the last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="middle-section">
      <Container
        component="main"
        maxWidth="xs"
        id="chat-card-id"
        className="custom-main"
      >
        <Box
          className="!pt-0"
          sx={{
            padding: "12px",
          }}
        >
          <div className="chat-messages">
            {messages?.map((message) => (
              <>
                <div
                  ref={scroll}
                  className={
                    message.senderId === currentUserId
                      ? "chatbox-message own-message"
                      : "chatbox-message"
                  }
                >
                  <span>{message.text}</span>
                </div>
                <span
                  className={message.senderId === currentUserId && "self-end"}
                >
                  {format(message.createdAt)}
                </span>
              </>
            ))}
          </div>
        </Box>
      </Container>
      <Container
        component="main"
        maxWidth="xs"
        id="chat-card-id"
        className="message-bar"
      >
        <Box
          sx={{
            padding: "12px",
          }}
        >
          <div className="flex justify-center">
            <div className="m-left w-[14%] flex justify-evenly items-center">
              <div className="hover:bg-[#1976d221] rounded-lg cursor-pointer ">
                <AddCircleIcon
                  className="hover:fill-[#005bd1] m-2"
                  sx={{ fill: "#0066ed" }}
                />
              </div>
              <div className="hover:bg-[#1976d221] rounded-lg cursor-pointer max-[850px]:hidden">
                <CollectionsIcon
                  className="hover:fill-[#005bd1] m-2"
                  sx={{ fill: "#0066ed" }}
                />
              </div>
            </div>
            <div className="m-middle w-[80%]">
              <InputEmoji
                className="chat-input"
                value={newMessage}
                onChange={handleChange}
              />
            </div>
            <div className="m-right w-[7%] flex justify-center items-center">
              <div className="hover:bg-[#1976d221] rounded-lg cursor-pointer">
                {newMessage ? (
                  <SendIcon
                    className="hover:fill-[#005bd1] m-2"
                    sx={{ fill: "#0066ed" }}
                    onClick={handleSend}
                  />
                ) : (
                  <MicIcon
                    className="hover:fill-[#005bd1] m-2"
                    sx={{ fill: "#0066ed" }}
                  />
                )}
              </div>
            </div>
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default MiddleSection;
