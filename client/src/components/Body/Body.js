import React from "react";
import "./Body.css";
import HomeBody from "../HomeBody/HomeBody";
import ProfileBody from "../ProfileBody/ProfileBody";
import ChatsBody from "../ChatsBody/ChatsBody";

function Body({ page }) {
  return (
    <>
      {page === "home" ? (
        <HomeBody />
      ) : page === "profile" ? (
        <ProfileBody />
      ) : page === "chats" ? (
        <ChatsBody />
      ) : (
        ""
      )}
    </>
  );
}

export default Body;
