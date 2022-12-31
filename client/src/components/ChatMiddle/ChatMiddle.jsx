import React, { useContext, useEffect, useState } from "react";
import { fetchMessages } from "../../api/fetchMessages";
import { getUserData } from "../../api/getUserData";
import { ContextUser } from "../../store/MainContext";
import MiddleHeader from "./MiddleHeader/MiddleHeader";
import MiddleSection from "./MiddleSection/MiddleSection";

function ChatMiddle({ currentChat, setSendMessage, recieveMessage, checkOnlineStatus ,setCurrentChat}) {
  const { currentUser } = useContext(ContextUser);

  const [chatUserData, setChatUserData] = useState(null);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    if(!currentChat?.members){
      setChatUserData(currentChat);
      return
    }
    const chatUserId = currentChat?.members?.find(
      (id) => id !== currentUser._id
    );
    if (currentChat !== null) {
      getUserData(chatUserId).then(({ userData }) => {
        setChatUserData(userData);
      });
    }
  }, [currentChat, currentUser._id]);

  useEffect(() => {
    if (currentChat !== null && currentChat.members) {
      fetchMessages(currentChat._id).then(({ message }) => {
        setMessages(message);
      });
    }
  }, [currentChat]);


  return (
    <div className="mt-[5rem] chat-middle">
      {currentChat ? (
        <>
          <MiddleHeader chatUserData={chatUserData} online={chatUserData && checkOnlineStatus(chatUserData,true)}/>
          <MiddleSection
            messages={messages}
            setMessages={setMessages}
            currentUserId={currentUser._id}
            currentChat={currentChat}
            setSendMessage={setSendMessage}
            recieveMessage={recieveMessage}
            setCurrentChat={setCurrentChat}
          />
        </>
      ) : (
        "Tap to Start a chat"
      )}
    </div>
  );
}

export default ChatMiddle;
