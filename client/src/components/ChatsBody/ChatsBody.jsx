import { useContext, useEffect, useRef, useState } from "react";
import { userChats } from "../../api/userChats";
import { ContextUser } from "../../store/MainContext";
import ChatLeftSide from "../ChatLeftSide/ChatLeftSide";
import ChatMiddle from "../ChatMiddle/ChatMiddle";
import { io } from "socket.io-client";
import "./ChatsBody.css";

function ChatsBody() {
  const { currentUser } = useContext(ContextUser);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);

  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", currentUser._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [currentUser]);

  // sending message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // recieve message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setRecieveMessage(data);
    });
  }, []);

  useEffect(() => {
    userChats(currentUser._id).then(({ chats }) => {
      setChats(chats);
    });
  }, [currentChat]);

  const checkOnlineStatus = (chat, chatbox) => {
    const chatMember = chatbox
      ? chat._id
      : chat?.members.find((member) => member !== currentUser._id);
    const online = onlineUsers?.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="chats-body">
      <ChatLeftSide
        chats={chats}
        setCurrentChat={setCurrentChat}
        checkOnlineStatus={checkOnlineStatus}
      />
      <ChatMiddle
        page={"chats"}
        currentChat={currentChat}
        setSendMessage={setSendMessage}
        recieveMessage={recieveMessage}
        checkOnlineStatus={checkOnlineStatus}
        setCurrentChat={setCurrentChat}
      />
    </div>
  );
}

export default ChatsBody;
