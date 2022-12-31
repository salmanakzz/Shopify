import React from "react";
import Body from "../../components/Body/Body";
import Navbar from "../../components/Navbar/Navbar";

function ProfilePage() {
  return (
    <div className="profile-page" style={{ marginTop: "-27px" }}>
      <Navbar />
      <Body page={"profile"} />
    </div>
  );
}

export default ProfilePage;
