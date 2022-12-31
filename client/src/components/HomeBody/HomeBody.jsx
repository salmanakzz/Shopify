import React from "react";
import ChatSide from "../ChatSide/ChatSide";
import PostSide from "../PostSide/PostSide";
import RequestSide from "../RequestSide/RequestSide";
import "./HomeBody.css";

function HomeBody() {
  return (
    <div className="home-body">
      <RequestSide />
      <PostSide />
      <ChatSide />
    </div>
  );
}

export default HomeBody;
