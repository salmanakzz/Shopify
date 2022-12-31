import React from "react";
import ChatCard from "../ChatCard/ChatCard";
import "./ProfileLeftSide.css";

function ProfileLeftSide() {
  return (
    <div className="profile-left-side">
      <ChatCard page={"profile"} />
    </div>
  );
}

export default ProfileLeftSide;
