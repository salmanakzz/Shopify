import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import FriendsCard from "../FriendsCard/FriendsCard";
import ClearIcon from "@mui/icons-material/Clear";
import DefaultProfile from "../../assets/images/DefaultProfile.png";

import "./FriendsSide.css";

function FriendsSide() {
  const [friendUser, setFriendUser] = useState(null);
  console.log(friendUser);
  return (
    <div className="chat-side" style={{ marginTop: "4rem" }}>
      <FriendsCard setFriendUser={setFriendUser} />
      {friendUser && (
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

export default FriendsSide;
