import { Box, Container } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { userChats } from "../../../api/userChats";
import { ContextUser } from "../../../store/MainContext";
import Conversation from "../../Conversation/Conversation";
import Searchbar from "../../Searchbar/Searchbar";
import "./LeftSection.css";

function LeftSection({ chats, setCurrentChat, checkOnlineStatus }) {
  const { currentUser } = useContext(ContextUser);
  const [searchChatUsers, setSearchChatUsers] = useState(null)
  return (
    <div className="left-section">
      <Container
        component="main"
        maxWidth="xs"
        id="chat-card-id"
        className="custom-main"
      >
        <p
          style={{
            fontSize: "1.02rem",
            marginTop: ".9rem",
            marginBottom: "8px",
          }}
        >
          <div className="justify-center">
            <Searchbar className="" setSearchChatUsers={setSearchChatUsers} page={"chats"}/>
          </div>
        </p>
        <hr />
        <Box
          sx={{
            padding: "12px",
          }}
        >
          <div>
            {searchChatUsers? searchChatUsers.map((user, idx) => (
              <div onClick={() => setCurrentChat(user)} key={idx}>
                <Conversation searchUser={user} currentUserId={currentUser._id} online={checkOnlineStatus(user,true)}/>
              </div>
            )):chats.map((chat, idx) => (
              <div onClick={() => setCurrentChat(chat)} key={idx}>
                <Conversation data={chat} currentUserId={currentUser._id} online={checkOnlineStatus(chat)}/>
              </div>
            ))}
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default LeftSection;
