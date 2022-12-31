import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./RequestCard.css";
import { Requests } from "../../api/RequestData";
import ClearIcon from "@mui/icons-material/Clear";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { ContextUser } from "../../store/MainContext";
import DefaultProfile from "../../assets/images/DefaultProfile.png";
import { useNavigate } from "react-router-dom";
import { RemoveFriendRequest } from "../../api/RemoveFriendRequest";
import { AddFriend } from "../../api/AddFriend";

function RequestCard() {
  const navigate = useNavigate();

  const { currentUser, setProfileUser } = useContext(ContextUser);

  const [FriendRequests, setFriendRequests] = useState(null);

  useEffect(() => {
    Requests(currentUser._id).then((result) => {
      setFriendRequests(result);
    });
  }, []);

  const navigateProfile = (requestUser) => {
    setProfileUser(requestUser);
    navigate("/profile");
  };

  const handleRemoveFriendRequest = (currentUserId, requesterId) => {
    RemoveFriendRequest(currentUserId, requesterId).then((result) => {
      setFriendRequests(
        FriendRequests.filter((obj) => obj._id !== requesterId)
      );
      console.log(result);
    });
  };

  const addToFriends = (currentUserId, requesterId) => {
    AddFriend(currentUserId, requesterId).then((result)=>{
      setFriendRequests(
        FriendRequests.filter((obj) => obj._id !== requesterId)
      );
      console.log(result);
    })
  };

  return (
    <div className="request-card">
      <Container component="main" maxWidth="xs" className="custom-main">
        <p
          style={{
            fontSize: "1.02rem",
            marginLeft: "20px",
            marginTop: "1rem",
            marginBottom: "8px",
          }}
        >
          Friend Requests
        </p>
        <hr />
        <Box
          sx={{
            padding: "12px",
          }}
        >
          {FriendRequests && FriendRequests.length > 0 ? (
            FriendRequests?.map((requester, idx) => (
              <div className="requester" key={idx}>
                <div className="left">
                  <img
                    onClick={() => navigateProfile(requester)}
                    src={requester?.profilePictureUrl ? requester.profilePictureUrl : DefaultProfile}
                    alt=""
                    className="requester-img"
                  />
                  <div className="requester-name">
                    <span onClick={() => navigateProfile(requester)}>
                      {requester.firstname + " " + requester.lastname}
                    </span>
                    <span style={{ fontSize: "12px" }}>
                      {requester.followers.length} followers
                    </span>
                  </div>
                </div>
                <div className="right">
                  <PersonAddAlt1Icon
                    className="request-add-btn"
                    style={{ fill: "#0066ed" }}
                    onClick={() => addToFriends(currentUser._id, requester._id)}
                  />
                  <ClearIcon
                    onClick={() =>
                      handleRemoveFriendRequest(currentUser._id, requester._id)
                    }
                    className="request-close"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center align-center">
              <span>No Requests</span>
            </div>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default RequestCard;
