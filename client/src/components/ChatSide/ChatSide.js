import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import ChatCard from "../ChatCard/ChatCard";
import ClearIcon from "@mui/icons-material/Clear";
import DefaultProfile from "../../assets/images/DefaultProfile.png";

import "./ChatSide.css";

function ChatSide() {
  const [chatUser, setChatUser] = useState(null);
  console.log(chatUser);
  return (
    <div className="chat-side" style={{ marginTop: "4rem" }}>
      <ChatCard setChatUser={setChatUser} />
      {/* <Container fixed className="fixed !w-[21%] pr-4 !pt-[9rem]">
        <Box
          className="rounded-md shadow-lg"
          sx={{ bgcolor: "#fff", height: "50vh" }}
        />
      </Container> */}
      {chatUser && (
        <Container
          className="custom-main-chatbox !p-0"
          component="main"
          maxWidth="xs"
          id="chat-card-id"
        >
          <div className="flex items-center justify-between px-3 py-2" >
            <div className="flex items-center gap-2" >
            <img src={DefaultProfile} alt="" className="w-[2rem] h-[2rem] rounded-full" />
            <p
              style={{
                fontSize: ".95rem",
              }}
            >
              Arshad Roshan
            </p>
            </div>
            <ClearIcon className="cursor-pointer !fill-[#0066ed]"/>
          </div>
          <hr />
          <Box
            sx={{
              padding: "12px",
            }}
          >
            dcdc
          </Box>
        </Container>
      )}
    </div>
  );
}

export default ChatSide;
