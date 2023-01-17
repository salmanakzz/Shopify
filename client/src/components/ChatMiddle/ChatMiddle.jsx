import React, { useContext, useEffect, useState } from "react";
import { fetchMessages } from "../../api/fetchMessages";
import { getUserData } from "../../api/getUserData";
import { searchAndFetchMessages } from "../../api/searchAndFetchMessages";
import { ContextUser } from "../../store/MainContext";
import MiddleHeader from "./MiddleHeader/MiddleHeader";
import MiddleSection from "./MiddleSection/MiddleSection";

function ChatMiddle({
  currentChat,
  setSendMessage,
  recieveMessage,
  checkOnlineStatus,
  setCurrentChat,
  page,
}) {
  const { currentUser } = useContext(ContextUser);
  const [chatUserData, setChatUserData] = useState(null);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    if (!currentChat?.members && currentChat?.firstname) {
      setChatUserData(currentChat);
      searchAndFetchMessages( currentChat._id, currentUser._id).then(
        ({ message }) => {
          setMessages(message && message);
        }
      );
      return;
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
    <div
      className={
        page === "chats"
          ? "mt-[5rem] chat-middle"
          : page === "home"
          ? "mt-[5rem] chat-middle !fixed !w-[20rem] !right-[12%]"
          : "chat-middle !w-[20rem]"
      }
      id={page === "profile" ? "profile-chat-box" : ""}
    >
      {currentChat ? (
        <>
          <MiddleHeader
            page={page}
            setCurrentChat={setCurrentChat}
            chatUserData={chatUserData}
            online={chatUserData && checkOnlineStatus(chatUserData, true)}
          />
          <MiddleSection
            page={page}
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
