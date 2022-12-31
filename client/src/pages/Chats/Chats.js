import React from "react";
import Body from "../../components/Body/Body";
import Navbar from "../../components/Navbar/Navbar";

function ChatsPage() {
  return (
    <div className="chats-page">
      <Navbar />
      <Body page={"chats"} />
    </div>
  );
}

export default ChatsPage;
