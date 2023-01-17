import React, { useEffect, useState } from "react";
import Online from "@mui/icons-material/FiberManualRecord";
import DefaultProfile from "../../assets/images/DefaultProfile.png";
import { getUserData } from "../../api/getUserData";
import Skeleton from "@mui/material/Skeleton";
import "./Conversation.css";
import { Typography } from "@mui/material";

function Conversation({ data, currentUserId, online, searchUser }) {
  const [chatUserData, setChatUserData] = useState(null);
  useEffect(() => {
    const chatUserId = data?.members?.find((id) => id !== currentUserId);
    getUserData(chatUserId).then(({ userData }) => {
      setChatUserData(userData);
    });
  }, []);
  return (
    <div className="conversation ml-1 mb-2">
      {searchUser ? (
        <div className="flex justify-start items-center overflow-hidden">
          {online && (
            <div className="online-dot absolute mb-[32px]">
              <Online className="!fill-[#36bf2d] !w-[.9rem]" />
            </div>
          )}
          <img
            src={
              searchUser?.profilePictureUrl
                ? searchUser.profilePictureUrl
                : DefaultProfile
            }
            className="w-[3.2rem] h-[3.2rem] rounded-full"
            alt=""
          />
          <div className="ml-[10px] flex flex-col items-start justify-center chat-profile-name">
            <span>
              {searchUser?.firstname} {searchUser?.lastname}
            </span>
            <span className="text-[12px]">{online ? "Online" : "Offline"}</span>
          </div>
        </div>
      ) : chatUserData ? (
        <div className="flex justify-start items-center overflow-hidden">
          {online && (
            <div className="online-dot absolute mb-[32px]">
              <Online className="!fill-[#36bf2d] !w-[.9rem]" />
            </div>
          )}
          <img
            src={
              chatUserData?.profilePictureUrl
                ? chatUserData.profilePictureUrl
                : DefaultProfile
            }
            className="w-[3.2rem] h-[3.2rem] rounded-full"
            alt=""
          />
          <div className="ml-[10px] flex flex-col items-start justify-center chat-profile-name">
            <span>
              {chatUserData?.firstname} {chatUserData?.lastname}
            </span>
            <span className="text-[12px]">{online ? "Online" : "Offline"}</span>
          </div>
        </div>
      ) : (
        <Typography
          component="div"
          key="h2"
          variant={"h2"}
          className="justify-start items-center flex !leading-[.9]"
        >
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton width={"84%"} className="ml-[10px]" />
        </Typography>
      )}
    </div>
  );
}

export default Conversation;
