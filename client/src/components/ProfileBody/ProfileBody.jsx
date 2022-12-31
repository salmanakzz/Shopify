import React from "react";
import ProfileBodySection from "../ProfileBodySection/ProfileBodySection";
import ProfileHeadSection from "../ProfileHeadSection/ProfileHeadSection";
import "./ProfileBody.css";

function ProfileBody() {
  return (
    <div className="profile-body">
      <ProfileHeadSection />
      <ProfileBodySection />
    </div>
  );
}

export default ProfileBody;
