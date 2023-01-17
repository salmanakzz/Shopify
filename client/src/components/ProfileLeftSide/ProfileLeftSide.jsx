import React from "react";
import FriendsCard from "../FriendsCard/FriendsCard";
import "./ProfileLeftSide.css";

function ProfileLeftSide({ friends }) {
  return (
    <div className="profile-left-side">
      <FriendsCard page={"profile"} friends={friends} />
    </div>
  );
}

export default ProfileLeftSide;
