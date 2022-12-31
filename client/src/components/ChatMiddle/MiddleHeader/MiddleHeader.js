import { Container, Skeleton, Typography } from "@mui/material";
import Online from "@mui/icons-material/FiberManualRecord";
import DefaultProfile from "../../../assets/images/DefaultProfile.png";
import VideocamIcon from "@mui/icons-material/Videocam";
import React from "react";
import "./MiddleHeader.css";

function MiddleHeader({ chatUserData, online }) {
  return (
    <div className="middle-header">
      <Container
        component="main"
        maxWidth="xs"
        id="chat-card-id"
        className="custom-main"
      >
        {chatUserData ? (
          <div className="flex justify-between items-center !p-[.35rem] !ml-[5px]">
            <div className="flex justify-start items-center">
              {online && (
                <div className="online-dot absolute mb-[28px]">
                  <Online className="!fill-[#36bf2d] !w-[.8rem]" />
                </div>
              )}
              <img
                src={
                  chatUserData?.profilePictureUrl
                    ? chatUserData.profilePictureUrl
                    : DefaultProfile
                }
                className="w-[2.5rem] h-[2.5rem] rounded-full"
                alt=""
              />
              <div className="ml-[10px] flex flex-col items-start justify-center">
                <span className="">
                  {chatUserData?.firstname} {chatUserData?.lastname}
                </span>
              </div>
            </div>
            <div>
              <div className="mr-[5px] hover:bg-[#1976d221] rounded-lg cursor-pointer">
                <VideocamIcon
                  className="hover:fill-[#005bd1]  m-2"
                  sx={{ fill: "#0066ed" }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            <Typography
              component="div"
              key="h2"
              variant={"h2"}
              className="justify-between items-center flex !leading-[.86] "
            >
              <div className="flex items-center !ml-[10px] w-[100%]">
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton width={"30%"} className="ml-[10px]" />
              </div>
              <div className="flex items-center w-[6%]">
                <Skeleton width={"73%"} className="mr-[10px]" />
              </div>
            </Typography>
          </div>
        )}
      </Container>
    </div>
  );
}

export default MiddleHeader;
