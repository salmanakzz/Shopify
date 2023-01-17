import React, { useContext, useEffect, useState } from "react";
import { fetchFriends } from "../../api/fetchFriends";
import { ContextUser } from "../../store/MainContext";
import ProfileBodySection from "../ProfileBodySection/ProfileBodySection";
import ProfileHeadSection from "../ProfileHeadSection/ProfileHeadSection";
import "./ProfileBody.css";

function ProfileBody() {
  const { currentUser, profileUser } = useContext(ContextUser);
  const [friends, setFriends] = useState(null);
  useEffect(() => {
    fetchFriends(profileUser ? profileUser._id : currentUser._id).then(
      ({ friendsArr }) => {
        setFriends(friendsArr);
      }
    );
  },[profileUser]);
  return (
    <div className="profile-body">
      <ProfileHeadSection />
      <ProfileBodySection friends={friends} />
    </div>
  );
}

export default ProfileBody;
