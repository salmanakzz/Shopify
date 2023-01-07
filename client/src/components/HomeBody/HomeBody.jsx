import React from "react";
import FriendsSide from "../FriendsSide/FriendsSide";
import PostSide from "../PostSide/PostSide";
import RequestSide from "../RequestSide/RequestSide";
import "./HomeBody.css";

function HomeBody() {
  return (
    <div className="home-body">
      <RequestSide />
      <PostSide />
      <FriendsSide />
    </div>
  );
}

export default HomeBody;
