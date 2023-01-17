import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import FriendsCard from "../FriendsCard/FriendsCard";
import "./FriendsSide.css";

function FriendsSide({friends}) {
  return (
    <div className="chat-side" style={{ marginTop: "4rem" }}>
      <FriendsCard page={"home"} friends={friends}/>
    </div>
  );
}

export default FriendsSide;
