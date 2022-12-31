import PostSide from "../PostSide/PostSide";
import ProfileLeftSide from "../ProfileLeftSide/ProfileLeftSide";
import "./ProfileBodySection.css";

function ProfileBodySection() {

  return (
    <div className="profile-body-inner">
      <ProfileLeftSide />
      <PostSide page={"profile"}/>
      
    </div>
  );
}

export default ProfileBodySection;
