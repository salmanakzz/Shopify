import { Box, Container } from "@mui/material";
import React from "react";
import LeftHeader from "./LeftHeader/LeftHeader";
import LeftSection from "./LeftSection/LeftSection";

function ChatLeftSide({ chats, setCurrentChat, checkOnlineStatus }) {
  return (
    <div className="mt-[57px] chat-left-side">
      <LeftHeader />
      <LeftSection chats={chats} setCurrentChat={setCurrentChat} checkOnlineStatus={checkOnlineStatus}/>
    </div>
  );
}

export default ChatLeftSide;
