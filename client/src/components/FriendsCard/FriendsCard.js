import React, { useContext, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./FriendsCard.css";
import DefaultProfile from "../../assets/images/DefaultProfile.png";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import ChatMiddle from "../ChatMiddle/ChatMiddle";
import { ContextUser } from "../../store/MainContext";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Online from "@mui/icons-material/FiberManualRecord";

function FriendsCard({ page, friends }) {
  const { currentUser, setProfileUser } = useContext(ContextUser);

  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);

  const navigate = useNavigate();

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
      console.log(data);
      setRecieveMessage(data);
      
    });
  }, []);

  const checkOnlineStatus = (chat, chatbox) => {
    const chatMember = chatbox
      ? chat._id
      : chat?.members.find((member) => member !== currentUser._id);
    const online = onlineUsers?.find((user) => user.userId === chatMember);
    return online ? true : false;
  };
  useEffect(() => {
    if (page === "profile") {
      window.onscroll = function () {
        myFunction();
      };

      var header = document.getElementById("chat-card-id");
      function myFunction() {
        if (window.pageYOffset > 460) {
          header.classList.add("scroll-fix");
        } else {
          header.classList.remove("scroll-fix");
        }
      }
    }
  }, []);

  const navigateProfile = (friend) => {
    setProfileUser(friend);
    navigate("/profile");
  };

  return (
    <div className="friends-card">
      <Container
        component="main"
        maxWidth="xs"
        id="chat-card-id"
        className={page === "profile" ? "profile-custom-main" : "custom-main"}
      >
        <p
          style={{
            fontSize: "1.02rem",
            marginLeft: "20px",
            marginTop: "1rem",
            marginBottom: "8px",
          }}
        >
          Friends
        </p>
        <hr />
        <Box
          sx={{
            padding: "12px",
          }}
        >
          {friends?.length > 0 ? (
            friends.map((friend, idx) => (
              <div className="friend" key={idx}>
                <div className="flex justify-start items-center">
                {checkOnlineStatus(friend,true) && (
                <div className="online-dot absolute mb-[28px]">
                  <Online className="!fill-[#36bf2d] !w-[.8rem]" />
                </div>
              )}
                  <img
                    onClick={() => navigateProfile(friend)}
                    src={
                      friend.profilePictureUrl
                        ? friend.profilePictureUrl
                        : DefaultProfile
                    }
                    alt=""
                    className="friend-img"
                  />
                  <div className="friend-name">
                    <span onClick={() => setCurrentChat(friend)}>
                      {friend.firstname} {friend.lastname}
                    </span>
                  </div>
                </div>
                <MapsUgcIcon
                  className="co-btn"
                  onClick={() => setCurrentChat(friend)}
                />
              </div>
            ))
          ) : (
            <span>
              <div class="flex justify-center align-center">
                <span>No Friends</span>
              </div>
            </span>
          )}
        </Box>
      </Container>
      {currentChat && (
        <ChatMiddle
          page={page}
          currentChat={currentChat}
          setSendMessage={setSendMessage}
          recieveMessage={recieveMessage}
          checkOnlineStatus={checkOnlineStatus}
          setCurrentChat={setCurrentChat}
        />
      )}
    </div>
  );
}

export default FriendsCard;
